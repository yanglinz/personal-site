---
tags: post
title: A Playground for the Lox Language from Crafting Interpreters
description:
  A demo of my implementation of the Lox language from the book Crafting
  Interpreters.
date: 2023-08-04
published: true
---

I've been reading a book called
[Crafting Interpreters](https://craftinginterpreters.com/) by
[Robert Nystrom](https://journal.stuffwithstuff.com/) recently, which walks you
through the implementation of a toy programming language called Lox from
scratch.

There's a
[reference implementation in Java](https://github.com/munificent/craftinginterpreters/tree/master),
with
[countless ports](https://github.com/munificent/craftinginterpreters/wiki/Lox-implementations)
to other languages. I wanted to follow along with the book and actually write
the interpreter as I read the chapters, and I arbitrarily chose Typescript as
the language for my implementation. One convenient side-effect from that choice
is that it's fairly trivial to run the interpreter in the browser, which makes
for a fun demo!

<div class="full-width flex border-stone-100 my-6 py-12 border-b border-t">
  <iframe src="https://lox-ts-playground.vercel.app?hideheader=true" width="100%" height="600">
  </iframe>
</div>

If you're interested in reading the source code or running the project locally,
you can find my [repo here](https://github.com/yanglinz/lox-ts)!

I'm still looking to finish the second half of the book, which will implement
the same language as a VM, at which point I'd love to revisit the playground and
make further improvements to the playground, like:

- Implementing more native functions for Web APIs.
- Making the interpreter async, to support continuously running Lox programs.
- Running the interpreter in a
  [WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers).

But so far, I've had a lot of fun with the project! I also have lots of positive
things I want to say about Crafting Interpreters that I'll spin off as a
separate post, but the gist is that it's a fantastic book for anyone interested
in programming language design and implementation!
