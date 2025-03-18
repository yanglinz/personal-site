---
title: Copy a file or directory from a Docker image
slug: copy-from-docker-image
date: 2025-03-17
---

Recently I needed to copy some files from a Docker image to trouble shoot some
CI build artifact. I learned that it can be done via the
[`docker cp`](https://docs.docker.com/reference/cli/docker/container/cp/)
command, which can be invoked like so:

```sh
id=$(docker create image-name)
docker cp $id:/path/inside-container /path/on-host
docker rm -v $id
```

We first run a container from a given image via `docker create`, which will run
a new container and return its id.

Then we run `docker cp`, and pass it the id of the new container we spun up, as
well as the path of the file/directory we want to copy _from_, as well the path
we want to copy the file _to_ on the host. Note that `docker cp` takes a
container _id_ and not a image, hence why we have to run the container via
`docker create` first.

Finally, we can remove the container via `docker rm` for clean up.

If you need something more robust to inspect the files within the image layers,
[dive](https://github.com/wagoodman/dive) may be worth a look.
