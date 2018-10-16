// let { EventEmitter } = require('events');
// let util = require('util'); // 继承模块
// console.log(EventEmitter)

// function Bell() { }

// // 进行原型继承
// //   Object.setPrototypeOf(ctor.prototype, superCtor.prototype); 
// // 源代码重点（设置子的prototype）等于 父的prototype
// util.inherits(Bell, EventEmitter);

class EventEmitter {
  constructor() {
    this.events = {};
    this._maxListeners = 1;
  }

  on(type, listener) {
    if (this.events[type]) {
      this.events[type].push(listener);
    } else {
      this.events[type] = [listener];
    }
  }

  addListener(type, listener) {
    this.on(type, listener);
  }

  emit(type, ...rest) {
    // console.log(this.events[type])
    if (this.events[type].length > this._maxListeners) {
      new Error(`事件监听超出设定的 ${this._maxListeners} 个`);
    }
    this.events && this.events[type].forEach(listener => listener.apply(this, rest));
  }

  once(type, listener) {
    const wrapper = (...rest) => {
      listener.apply(this, rest);
      this.events[type] = this.events[type].filter(l => l !== wrapper);
    };
    this.on(type, wrapper);
  }
}

module.exports = { EventEmitter };

