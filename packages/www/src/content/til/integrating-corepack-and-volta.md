---
title: How to integrate Corepack and Volta
date: 2025-04-17
---

[Volta](https://volta.sh/) has been my go-to tool for managing multiple versions of Node.js. While it's lesser known than say [`nvm`](https://github.com/nvm-sh/nvm), I've found Volta to be generally performant and reliable.

```
cd my-project
volta pin node@20.19.0 # adds volta.node field to package.json
node --version  # will output v20.19.0
```

One feature of Volta I've relied on is its package manager pinning, which I'd used to ensure a particular version of `npm` or `yarn` is used for a project. 

However, Volta's package manager pinning seems to be stagnating in its support for alternative, modern package managers. I discovered this when I was trying to migrate from `yarn` classic to `pnpm`, and found that the [support for pnpm](https://docs.volta.sh/advanced/pnpm) remains experimental in Volta, despite the feature being introduced a couple of years ago.

Luckily, there's a Node.js official tool called [Corepack](https://nodejs.org/api/corepack.html) that handles pinning a specific version of package manager for a project, which includes first class support for `pnpm`. While there's no official way of integrating Volta with Corepack, I've found that installing Corepack's shims in the Volta `bin` directory seems to do the trick.

```
volta install corepack
corepack enable --install-directory ~/.volta/bin
```

With Volta and Corepack setup together, you can pin your project via:

```
volta pin node@22 # adds volta.node field to package.json
corepack use pnpm@10 # adds packageManager field
```

For those who are using Volta to pin Node.js versions, and want to delegate the package manager pinning to Corepack for first class `pnpm` support, I recommend giving this approach a try!