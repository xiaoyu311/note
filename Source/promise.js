
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

const resolvePromise = (newPromise, x, resolve, reject) => {
  if (newPromise === x) {
    return reject(new TypeError('循环引用'));
  }
  let called = false;
  if (x instanceof MyPromise) {
    if (x.status === PENDING) {
      x.then(y => {
        resolvePromise(newPromise, y, resolve, reject);
      })
    } else {
      x.then(resolve, reject);
    }
  } else if (x !== null && ((typeof x === 'object') || (x === 'function'))) {
    try {
      let then = x.then;
      if (typeof then === 'function') {
        // 喝别人promise 进行 交互
        then.call(x, y => {
          if (called) return;
          called = true;
          resolvePromise(newPromise, y, resolve, reject);
        }, e => {
          if (called) return;
          called = true;
          reject(e);
        });
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}

const gen = (times, callback) => {
  let result = [], count = 0;
  return (i, data) => {
    result[i] = data;
    if (++count === times) {
      callback(result);
    }
  }
}

module.exports = class MyPromise {
  static all(promises) {
    return new MyPromise((resolve, reject) => {
      const length = promises.length;
      const done = gen(length, resolve);
      for (let i = 0; i < length; i++) {
        promises[i].then(done.bind(null, i), reject);
      }
    })
  }
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(resolve, reject);
      }
    })
  }
  static resolve(value) {
    return new MyPromise((resolve) => {
      resolve(value);
    })
  }
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    })
  }
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.exception = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    const resolve = value => {
      if (value instanceof MyPromise) {
        return value.then(resolve, reject);
      }
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onResolvedCallbacks.forEach(cb => cb(this.value));
      }
    }
    const reject = reason => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach(cb => cb(this.reason));
      }
    }
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    let newPromise;
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };
    if (this.status === FULFILLED) {
      // resolve 同步都时候走这个分支 
      // x 就是 成功 返回值 
      return newPromise = new MyPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            if (x instanceof MyPromise) {
              resolvePromise(newPromise, x, resolve, reject);
            }
          } catch (e) {
            reject(e);
          }
        });
      })
    }
    if (this.status === REJECTED) {
      return newPromise = new MyPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(newPromise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      });
    }
    if (this.status === PENDING) {
      this.onResolvedCallbacks.push(() => {
        return newPromise = new MyPromise((resolve, reject) => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(newPromise, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
      });
      this.onRejectedCallbacks.push(() => {
        return newPromise = new MyPromise((resolve, reject) => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(newPromise, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        })
      });
    }
  }

  catch(onRejected) {
    this.then(null, onRejected);
  }
}

