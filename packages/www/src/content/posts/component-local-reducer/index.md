---
tags: post
title: Component local reducers
date: 2018-11-01
published: true
thumbnailImage: "./thumbnail.png"
thumbnailImageAlt: React.js logo
---

The reducer pattern, popularized in the Javascript ecosystem by Redux, is
awesome!

Reducers let you restructure state transitions, which tends to be tricky bits of
your application, as pure functions that take state and return state. This has a
huge benefit in terms of making testing and reasoning about state a lot simpler,
despite some boilerplate.

```js
function someReducer(state, action) {
  switch (action.type) {
    case "SOME_ACTION": {
      return {
        ...state,
        someFlag: true,
      };
    }
    default:
      return state;
  }
}
```

Unfortunately, I think reducers have become synonymous with Redux. And I think
there is now the common misconception that the reducer pattern is _exclusive_ to
Redux. I want to dispel this, because I think it's a general pattern that's
useful outside of Redux, such as React's component local state.

If we decompose Redux into its essential parts, it consists of 3 separate parts:

1.  A `dispatch` method to drive state change through actions.
2.  A reducer function that models state changes as pure functions.
3.  Mechanism to subscribe a React component to state changes.

Note that the reducer is just an _independent_ sub-component of Redux.

Reducers are just regular Javascript functions! And by virtue of being just a
function, it readily cross framework and language boundaries.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">When people say “reducers” they hear Redux. But Redux API was intentionally designed so that you can take your reducers anywhere. Think about it: you don’t import Redux in your reducers.</p>&mdash; Dan Abramov (@dan_abramov) <a href="https://twitter.com/dan_abramov/status/1046147094099243008?ref_src=twsrc%5Etfw">September 29, 2018</a></blockquote>

The good news here is that there's a really easy way to take advantage of them
in regular React components.

```js
// Example reducer
function lightswitchReducer(state, action) {
  switch (action.type) {
    case "LIGHTSWITCH_OFF": {
      return { lightSwitchOff: true };
    }
    case "LIGHTSWITCH_ON": {
      return { lightSwitchOff: false };
    }
    case "LIGHTSWTICH_TOGGLE": {
      return { lightSwitchOff: !state.lightSwitchOff };
    }
    default: {
      return state;
    }
  }
}

class LightSwitch extends React.Component {
  state = {
    lightSwitchOff: true,
  };

  // Makeshift dispatch function
  dispatch = (action) => {
    this.setState((prevState) => localReducer(prevState, action));
  };

  render() {
    return (
      <div>
        Light switch is {this.state.lightSwitchOff ? "off" : "on"}
        <br />
        <button onClick={() => this.dispatch({ type: "LIGHTSWITCH_OFF" })}>
          Turn off
        </button>
        <button onClick={() => this.dispatch({ type: "LIGHTSWITCH_ON" })}>
          Turn on
        </button>
        <button onClick={() => this.dispatch({ type: "LIGHTSWTICH_TOGGLE" })}>
          Toggle
        </button>
      </div>
    );
  }
}
```

And component local reducers bring the same benefit that reducers in Redux does!
It lets you tease apart state transitions logic out of components by moving it
outside to a reducer function that can be tested and reasoned about
independently. And I think that's a huge win for component that may have complex
local state!

Note that I'm not advocating converting all your component local state from
regular `this.setState()` to this pattern tomorrow. But I think taking advantage
of the reducer pattern in a few select components is a good idea.

> Update: Looks like there will be a first class API for this with the upcoming
> hooks proposal in the form of `userReducer` 🎉.
