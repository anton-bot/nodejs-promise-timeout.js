# Node.js Promise Timeout #

## Resolve or reject a promise automatically when the timeout expires ##

With this module, you can create a Promise that resolve or rejects automatically
after a certain time, unless it has already resolved or rejected.

You can also add a timeout to any existing promise.

## Examples ##

### Create a new Promise ###

To create a new Promise that times out automatically if it hasn't completed in
sufficient time, use the constructor of `TimeoutResolvePromise` or `TimeoutRejectPromise`.

The constructor takes the timeout in milliseconds and a function that accepts
the `resolve` and `reject` parameters, which are functions.

```js
const { TimeoutResolvePromise, TimeoutRejectPromise } = require('nodejs-promise-timeout');
const TIMEOUT_DELAY = 2000;

// This promise will reject after 2 seconds:
let promise1 = new TimeoutRejectPromise(TIMEOUT_DELAY, (resolve, reject) => {
  // Do something useful here, then call resolve() or reject()
});


// This promise will resolve after 2 seconds:
let promise2 = new TimeoutResolvePromise(TIMEOUT_DELAY, (resolve, reject) => {
  // Do something useful here, then call resolve() or reject()
});
```

### Add a timeout to an existing Promise ###

To add a timeout to an existing Promise, use the static `setTimeout` method
of either `TimeoutResolvePromise` or `TimeoutRejectPromise`.

When you do that, save a reference to the newly created promise because the
original existing promise will not be modified.

```js
const { TimeoutResolvePromise, TimeoutRejectPromise } = require('nodejs-promise-timeout');
const TIMEOUT_DELAY = 2000;

// Create some Promise that takes a long time to resolve. In real life, that
// would be your long-running API query, database query and so on.
let existingPromise = new Promise(resolve => setTimeout(resolve, 10 * 1000));

// Add a timeout to that existing Promise:
let autoResolvedPromise = TimeoutResolvePromise.setTimeout(TIMEOUT_DELAY, existingPromise);
let autoRejectedPromise = TimeoutResolvePromise.setTimeout(TIMEOUT_DELAY, existingPromise);
```

# Questions #

Questions and feedback welcome in the linked Github repository.
