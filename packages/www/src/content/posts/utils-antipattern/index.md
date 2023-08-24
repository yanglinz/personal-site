---
tags: post
title: The utility module antipattern
description:
  Why naming a module or file utils is a bad idea and how to fix that problem.
date: 2020-05-20
published: true
featuredImage: "./www/posts/utils-antipattern/banner.jpg"
featuredImageAlt: Messy toolbox
thumbnailImage: "./thumbnail.jpg"
thumbnailImageAlt: Messy toolbox
---

# The Problem

Today, I want to talk about a problem that I think pervades a lot of codebases
that's relatively easy to fix. Chances are you've come across it in one form or
another. I'm talking about the catch-all, kitchen sink module that contains all
the reusable functions for a project. They are usually named `utils.py`,
`helpers.js`, or `common.rb` depending on the language.

While the intention of pulling commonly used logic into a helper/utility module
makes sense on paper, I will contend that having a `utils` module is generally a
bad idea.

## Growing without bounds

What I've personally observed is that the module starts off on the right track
with just a couple of functions. But given moderate amount of time and number of
engineers working on the codebase, you'll find that the `utils` module will
grows seemingly without bounds. It becomes a mish-mash of all sorts of one-off
functions. You start to get an uneasy feeling about adding any new functions to
the pile because you begin to lose sense and judgement of whether your new
function should even belong there. In its worst form, it may start to resemble
an software equivalent of an episode of hoarders.

I think the reason why the contents of these `utils` module grows out of bounds
is because of the name itself. `util` is just too loose of a name; it gives no
guidance about what should or should not belong in it.

We all know that naming is a difficult but vitally important aspect of
programming. It conveys our intentions to other programmers or our future
selves. If we look at utility modules from that lens, we can see that the naming
of `utils` does not really communicate _anything_ useful about what it should
contain.

Names should be narrow. It needs to give us programmers a sense of its domain
and communicate about things that it can and can't represent.

# Solutions

Fortunately, if you do happen to have this growing pile of `utils` module in
your project, we can apply some relatively easy and incrementally adoptable
fixes.

### Solution 1: Split the `utils` module up and give each submodule a good name.

If the problem is one of naming being too loose, the obvious solution is to come
up with a better names.

Chances are, if you have a large `utils` module, they can be separated into
logical groupings. For example, in a hypothetical web application codebase,
There may be a set of functions that deals with array manipulations, some that
handles structuring logging data, and some functions that handle input
validation. In this cases, the easy way out would be to just create sub-modules
within `util` with a name about its logical domain.

```js
// Before
import { flatten, getLogger, validateAddress } from "./utils.js";

// After
import { flatten } from "./utils/array.js";
import { getLogger } from "./utils/logging.js";
import { validateAddress } from "./utils/validation.js";
```

Seems simple and obvious enough, but I think just giving it a good name does
help everyone who works on the project implicitly understand what should or
shouldn't be in these sub-modules.

### Solution 2: Create a `unstable_temporary_utils` module.

As a supplement to solution 1, something that I've found helpful is to create a
`utils`-like module but a bit more verbosely named `unstable_temporary_utils`,
with the expectation that it is only a transient home for functions until we can
find a better module to place it in.

If I reflect on some of my own temptations to add a `utils` like catch-all
module, it happens when I'm exploring a new feature or domain and I just don't
know _where_ something belongs yet. Being able to come up with a good, narrow
name can very much be a chicken and egg problem of having to spend enough time
fleshing out code and fixed some corner case bugs for a new domain/feature.

Placing a strict policy of never have a kitchen sink modules and always needing
to properly name things may be setting ourselves up for failure. It may lead to
premature/wrong abstraction early on in the process. I've found that having a
given module designated as a "lost and found" of sorts can be a good mechanism
for the team to temporarily put logic and defer actually coming up with a good
name, as long as it's understood that we'll have to revisit and find a proper
home for it.

```js
// unstableTemporaryUtils.js

function parseAuthToken(request) {
  // ...
}
```

Given a contrived example above of a `parseAuthToken` function, we can give it
some time to settle into the codebase and realize that `utils/auth.js` maybe a
more suitable module for it.

```js
// utils/auth.js

function parseAuthToken(request) {
  // ...
}
```

## The unwieldy name is on purpose

I want to note that that long and awkward naming of `unstable_temporary_utils`
is very much intentional here. It lets us easily track its usage via `git grep`.
More importantly, it also subtly applies a certain sense of pressure and shame
whenever you import from `unstable_temporary_utils`. We want it to be a module
of a last resort, and give you a little bit of pause and thought on whether you
really want to put a new function in there.

Sometimes that pause may give you the opportunity to actually come up with a
good name. Or perhaps you realize that not creating an abstraction and living
with the duplication is perfectly ok.

## Prevent unchecked growth

If you do happen to adopt this approach, I also recommend adding a linting step
in CI that will fail the build if the `unstable_temporary_utils` module exceeds
a certain size. This will help us draws a line in the sand and prevent the
module from exceeding a certain size and avoid the same fate as an ever
expanding `utils` module.

# It's all about alignment

At the end of the day, programming is really just about communication to other
fellow humans. I really encourage you to look at how you name
function/modules/services and approach it from the lens of if your teammates or
future self can reasonably articulate if something should or shouldn't belong in
it.

And if you find that you've fallen into the `utils` module trap, you can fix it
but giving it better names/boundaries, which has the invaluable side-effect of
realigning your teammates on the purposes of certain module, which I've found to
be invaluable for the longevity of a project.
