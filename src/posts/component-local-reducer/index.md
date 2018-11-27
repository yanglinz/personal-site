---
title: Component local reducer
date: "2018-11-01T00:00:00.000Z"
---

When you see this piece of code, what comes to your mind first?

```js
function reducer() {
    ...
}
```

If you'd been working long enough with Javascript and especially React, Redux
would probably be the first thing that pops into your mind.

As we have more redux vs `this.setState` debate, something that I think doesn't
get more discussion.

To be clear, I'm not advocating dropping redux and replacing all global reducers
with these component local reducers. Neither am I advocating for replacing all
`this.setState` logic with local reducers. In this community we have a real
issue with perceived mutual exlucivity of ideas and tools.

I do think this is a fantastic for hard to test state logic in a couple of your
React components in your codebase that might benefit from reducer.

Getting to de-couple events and state transition in a testable way is huge.
