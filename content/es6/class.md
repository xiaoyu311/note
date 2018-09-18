### es6类用es5实现

#### es6实现
```js
class Parent {
  constructor() {
    this.age = 20;
  }
  getAge(){
    console.log(this.age);
  }
}
```

#### es5实现
```js
function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor || false;
        descriptor.configurable = true;
        if ('value' in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    var _createClass = function (params) {
      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps); // 公有属性 写到 构造函数的prototype属性上
      }
    }()

    // 检查类是否用new调用
    function _checkClass(instance, Constructor) {
      if (!instance instanceof Constructor) {
        throw new TypeError('构造函数必须用new调用');
      }
    }
    var Parent = function (params) {
      function Parent() {
        _checkClass(this, Parent);
        this.age = 20;
      }
      _createClass(Parent, [{
        key: 'getAge',
        value: function () {
          console.log(this.name)
        }
      }])
      return Parent;
    }()
```
