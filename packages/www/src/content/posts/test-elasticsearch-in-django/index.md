---
tags: post
title: Test Elasticsearch in Django without mocking
description:
  Tutorial on how to write automated unit tests against Elasticsearch with
  Django/Python without mocking.
date: 2021-07-31
published: true
---

> If want to skip ahead, here's
> [an example repo](https://github.com/yanglinz/django-pytest-elasticsearch-example)
> that implements the ideas discussed in the post.

## Intro

This should be a fairly short post - I've recently inherited a Django project at
work where Elasticsearch is a major component.

In the codebase, there are a good number of helper functions that constructs
Elasticsearch query DSLs like these the one below.

```python
def search_media(query):
    """Example helper method to get movies and shows based on a search query
    """
    client = Elasticsearch(settings.ELASTICSEARCH_HOST)
    body = {
        "query": {"multi_match": {"query": query, "fields": ["title", "description"]}}
    }
    response = client.search(index=["movie", "show"], body=body)
    return [h["_source"] for h in response["hits"]["hits"]]
```

While the above example seems simple enough, Elasticsearch queries JSON `body`
can become
[quite large and complex](https://www.elastic.co/guide/en/elasticsearch/reference/current/compound-queries.html).
Being a relative beginner in Elasticsearch, I had very little confidence
changing any code that involved these helper functions.

While there were pre-existing tests in the codebase, all of them had these
Elasticsearch helper functions mocked out.

```python
@mock.patch("path.to.some.elasticsearch_helper")
def test_with_mock(elasticsearch_helper_mock):
    elasticsearch_helper_mock.return_value = []
    results = get_search_results("Some query")
    assert results == []
```

## Problem with Mocking

Here are the problems with these mock based tests.

- When writing tests that interface with databases or distributed caches, I've
  found that mocking the database/caches out tends to produce tests that are
  brittle and offer very little value, because they usually fail to capture the
  subtle nuances in behavior of the system under tests.
- The types of changes we'd often make to these functions involve tweaking the
  Elasticsearch DSL query JSON, changing global Elasticsearch config, modifying
  field mapping, or upgrading the Elasticsearch version. In all these cases,
  mock based tests don't really offer any guard against bugs, because they (by
  design) bypass all Elasticsearch related code execution paths.

If the goal of writing tests is to increase confidence when we make changes to
our code, I think these tests failed that mark.

> Note: I think mocking is useful and has its place. It's particularly good at
> tests that need to verify "plumbing". I just personally think it's generally
> not suitable for tests that require database/cache access.

## Writing Ideal Tests

So if mocking isn't the approach, what can we do? What we really want are the
following properties out of our tests.

1. Tests that run against the real ElasticSearch.
2. Tests that are independent and isolated from each other.

The solution to 1 seems to be self explanatory, we need to run tests against a
running Elasticsearch cluster. But the other important property is that our
tests are independent; test A passing should never affect the execution or
output of test B. In other words, we don't want Elasticsearch state to persist
between runs and affect each other. Practically, I wasn't sure how to achieve
this.

## Mirroring Existing Patterns

One thing I quickly realized was that this is actually a solved problem for
databases, because In Django, there are built-in support for
[writing tests against databases](https://docs.djangoproject.com/en/3.0/topics/testing/overview/#the-test-database).

```python
import pytest

@pytest.mark.django_db(transaction=True)
def test_user():
    me = User.objects.get(username='me')
    assert me.is_superuser
```

With our tests marked by the `pytest.mark.django_db` decorator, `pytest` will
run extra setup and tear down logic before and after the test body. At a high
level, it will:

1. Setup a temporary `test` database and run migration on it.
2. Run the test.
3. Tear down the temporary `test` database.

So mirroring those high level steps, what we need to do for our Elasticsearch
tests is the following high level steps:

1. Setup a `test` Elasticsearce cluster and create relevant indices.
2. Run the test.
3. Remove the relevant indices from the `test` cluster.

It turns out that we can implement exactly that using `pytest`'s fixture system
and just a few lines of code.

## Testing Elastisearch

### Infrastructure setup

The first step is to have separation of the test Elasticsearch cluster and the
actual Elasticsearch cluster. This is similar to Django's database tests, where
it creates a separate database prepended by `test_`. We can mimic something
similar by running two separate instances with `docker-compose`.

```yaml
# docker-compose.yml

version: "3"

services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.8.0
    environment:
      - cluster.name=docker-cluster
      - discovery.type=single-node
      - bootstrap.memory_lock=true
      - xpack.security.enabled=false
      - ES_JAVA_OPTS=-Xms256m -Xmx256m
    ulimits:
      memlock:
        soft: -1
        hard: -1
  elasticsearch_test:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.8.0
    environment:
      - cluster.name=docker-testing-cluster
      - discovery.type=single-node
      - bootstrap.memory_lock=true
      - xpack.security.enabled=false
      - ES_JAVA_OPTS=-Xms128m -Xmx128m
    ulimits:
      memlock:
        soft: -1
        hard: -1
  web:
    build: .
    command: poetry run python manage.py runserver 0.0.0.0:8000
    volumes:
      - .:/app/
    ports:
      - "8000:8000"
    depends_on:
      - elasticsearch
      - elasticsearch_test
```

This is accomplished by running the same
`docker.elastic.co/elasticsearch/elasticsearch:7.8.0` docker image as 2 distinct
services, one called `elasticsearch` that will be used by the application, and
the other called `elasticsearch_test` that will be used exclusively for tests.

While it may seem a little wasteful to run 2 Elasticsearch cluster, keep in mind
that this is solely for local development, and can be alleviated by settings
such as `discovery.type=single-node` and `ES_JAVA_OPTS`.

Next, we can create the Elasticsearch `pytest` fixture by adding a
`conftest.py`.

```python
# conftest.py

import pytest
from django.conf import settings
from elasticsearch import Elasticsearch

from example.elasticsearch import MOVIE_MAPPING, SHOW_MAPPING

schemas = {
    "movie": MOVIE_MAPPING,
    "show": SHOW_MAPPING,
}

ELASTICSEARCH_TEST_HOST = "http://elasticsearch_test:9200"


def setup_elasticsearch():
    es = Elasticsearch(ELASTICSEARCH_TEST_HOST)
    for index_name, schema in schemas.items():
        body = {
            "settings": {
                "number_of_shards": 1,
                "number_of_replicas": 1,
                "index.store.type": "mmapfs",
            },
            "mappings": schema,
        }
        es.indices.create(index=index_name, body=body)


def teardown_elasticsearch():
    es = Elasticsearch(ELASTICSEARCH_TEST_HOST)
    for index_name in schemas.keys():
        es.indices.delete(index=index_name)


@pytest.fixture
def elasticsearch(settings):
    settings.ELASTICSEARCH_HOST = ELASTICSEARCH_TEST_HOST

    setup_elasticsearch()
    yield Elasticsearch(ELASTICSEARCH_TEST_HOST)
    teardown_elasticsearch()
```

If we take a look at the `elasticsearch` fixture function, we can see that it
mirrors the high level steps we described.

1. We call `setup_elasticsearch`, which creates the relevant indices with
   appropriate testings.
2. We `yield` to the test body.
3. We call `teardown_elasticsearch`, which tears down the relevant indices.

The extra line of `settings.ELASTICSEARCH_HOST = ELASTICSEARCH_TEST_HOST` is to
make sure that we point `settings.ELASTICSEARCH_HOST` to our test Elasticsearch
cluster during the execution of the test.

Also note that `setup_elasticsearch` will be specific to the application you
want to test. Here, you'll want to persist global Elasticsearch settings and
create indices that are relevant for your application.

### Write the test

And with the `docker-compose` configs and the `pytest` fixtures in place, we're
ready to write the tests!

So here's the `search_media` helper function we showed in the beginning.

```python
def search_media(query):
    """Example helper method to get movies and shows based on a search query
    """
    client = Elasticsearch(settings.ELASTICSEARCH_HOST)
    body = {
        "query": {"multi_match": {"query": query, "fields": ["title", "description"]}}
    }
    response = client.search(index=["movie", "show"], body=body)
    return [h["_source"] for h in response["hits"]["hits"]]
```

And here's an example test we can write by using the `elasticsearch` fixture.

```python
from example.elasticsearch import search_media


def index_test_fixtures(es, index_name, data):
    created = es.index(index=index_name, body=data)
    assert created["result"] == "created"
    es.indices.refresh(index_name)


class TestElasticsearch:
    def test_elasticsearch(self, elasticsearch):
        # Setup test fixtures
        index_test_fixtures(
            elasticsearch,
            "movie",
            {
                "slug": "episode-5",
                "title": "Star Wars: Episode V - The Empire Strikes Back",
                "description": "After the Rebels are brutally overpowered by the Empire on the ice planet Hoth, Luke Skywalker begins Jedi training with Yoda, while his friends are pursued by Darth Vader and a bounty hunter named Boba Fett all over the galaxy.",
            },
        )
        index_test_fixtures(
            elasticsearch,
            "movie",
            {
                "slug": "episode-3",
                "title": "Star Wars: Episode III - Revenge of the Sith",
                "description": "Three years into the Clone Wars, the Jedi rescue Palpatine from Count Dooku. As Obi-Wan pursues a new threat, Anakin acts as a double agent between the Jedi Council and Palpatine and is lured into a sinister plan to rule the galaxy.",
            },
        )
        index_test_fixtures(
            elasticsearch,
            "movie",
            {
                "slug": "rouge-one",
                "title": "Rogue One: A Star Wars Story",
                "description": "The daughter of an Imperial scientist joins the Rebel Alliance in a risky move to steal the Death Star plans.",
            },
        )

        index_test_fixtures(
            elasticsearch,
            "show",
            {
                "slug": "clone-wars",
                "title": "Star Wars: The Clone Wars",
                "description": "Jedi Knights lead the Grand Army of the Republic against the droid army of the Separatists.",
            },
        )
        index_test_fixtures(
            elasticsearch,
            "show",
            {
                "slug": "the-mandalorian",
                "title": "The Mandalorian",
                "description": "The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.",
            },
        )

        # Test search helper
        results = search_media("Star Wars")
        results = {r["slug"] for r in results}
        assert results == {"episode-5", "episode-3", "rouge-one", "clone-wars"}

        results = search_media("Jedi")
        results = {r["slug"] for r in results}
        assert results == {"episode-5", "episode-3", "clone-wars"}

        results = search_media("Galaxy")
        results = {r["slug"] for r in results}
        assert results == {"episode-5", "episode-3", "the-mandalorian"}
```

The most important bit is the `elasticsearch` argument in the test function
signature: `def test_elasticsearch(self, elasticsearch):`. This is the hint to
`pytest` that we want this particular test to execute the `elasticsearch`
fixture we defined earlier.

Like most tests, we need to first setup some test data. With the `elasticsearch`
object available, we can call `.index` to persist some resources to our
`elasticsearch_test` cluster. In this particular example, we'll indexed some
Star Wars movies and shows.

Then finally, we can call and make assertion on the return values of
`search_media`, our helper function under test. The beauty here is that this
test meets our original objective: It runs against a real Elasticsearch cluster,
and is isolated from other tests!

## Conclusion

I hope that this helps those who have Elasticsearch in their tech stack. Note
that while I've used Django and pytest to implement this example, the ideas and
patterns discussed in this post can be readily extended to your web-framework /
language of choice.

Happy testing!
