'use strict';

/**
 * Creates a Promise that resolves or rejects automatically after a certain
 * time, unless it already has been resolved or rejected.
 * @param {number} delay - The delay in ms when to resolve or reject the promise.
 * @param {"resolve"|"reject"} actionAfterTimeout - If "resolve", the promise will be resolved when the
 *   timeout expires; if "reject", it will be rejected.
 * @param {function} callback - The function that takes two arguments, `resolve`
 * and `reject`, same as when creating a normal Promise.
 * @returns {Promise}
 */
class TimeoutPromise {
  constructor(delay, actionAfterTimeout, callback) {
    let self = this;

    this.promise = new Promise((resolve, reject) => {
      self.resolveFunction = resolve;
      self.rejectFunction = reject;

      callback(resolve, reject);
    });

    if (actionAfterTimeout) {
      setTimeout(() => self.resolveFunction(`Timeout after ${delay} ms.`), delay);
    } else {
      setTimeout(() => self.rejectFunction(`Timeout after ${delay} ms.`), delay);
    }

    return this.promise;
  }
}

/**
 * Creates a Promise that resolves automatically after a certain
 * time, unless it already has been resolved or rejected.
 * @param {number} delay - The delay in ms when to resolve the promise.
 * @param {function} callback - The function that takes two arguments, `resolve`
 * and `reject`, same as when creating a normal Promise.
 * @returns {Promise}
 */
class TimeoutResolvePromise {
  constructor(delay, callback) {
    return new TimeoutPromise(delay, true, callback);
  }
}

/**
 * Creates a Promise that rejects automatically after a certain
 * time, unless it already has been resolved or rejected.
 * @param {number} delay - The delay in ms when to reject the promise.
 * @param {function} callback - The function that takes two arguments, `resolve`
 * and `reject`, same as when creating a normal Promise.
 * @returns {Promise}
 */
class TimeoutRejectPromise {
  constructor(delay, callback) {
    return new TimeoutPromise(delay, false, callback);
  }
}

/**
 * Set a timeout for an existing promise.
 * @param {number} delay - The delay in ms when to resolve or reject the promise.
 * @param {"resolve"|"reject"} actionAfterTimeout - "resolve" or "reject"
 * @param {Promise} promise - An existing promise.
 * @returns {Promise}
 */
TimeoutPromise.setTimeout = function (delay, actionAfterTimeout, promise) {
  let timeoutPromise = new Promise((resolve, reject) => {
    if (actionAfterTimeout === 'resolve') {
      setTimeout(() => resolve(`Timeout after ${delay} ms.`), delay);
    } else {
      setTimeout(() => reject(`Timeout after ${delay} ms.`), delay);
    }
  });

  return Promise.race([promise, timeoutPromise]);
};

/**
 * Set a timeout for an existing promise.
 * @param {number} delay - The delay in ms when to resolve the promise.
 * @param {Promise} promise - An existing promise.
 * @returns {Promise}
 */
TimeoutResolvePromise.setTimeout = function (delay, promise) {
  return TimeoutPromise.setTimeout(delay, 'resolve', promise);
}

/**
 * Set a timeout for an existing promise.
 * @param {number} delay - The delay in ms when to reject the promise.
 * @param {Promise} promise - An existing promise.
 * @returns {Promise}
 */
TimeoutRejectPromise.setTimeout = function (delay, promise) {
  return TimeoutPromise.setTimeout(delay, 'reject', promise);
}

module.exports = {
  TimeoutPromise,
  TimeoutResolvePromise,
  TimeoutRejectPromise,
};
