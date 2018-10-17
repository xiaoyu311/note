### 对象

```js
let obj1 = {name: 'obj1'};
let obj2 = {};
Object.setPrototypeOf(obj2, obj1);
console.log(obj2); // {}
console.log(obj2.name) // obj1
Object.setPrototypeOf = obj2.__proto__ = obj1; // 设置原型
> 原型链是用proto去找，把proto作为链条，而不是prototype找的
```

#### ECMAScript中有两种属性

- 数据属性
  - [[Configurable]]: 表示能通过 `delete` 删除属性从而重新定义属性，能否修改属性的特性，或者能否能否把属性改为访问器属性。（默认对象此属性的值为 `true`）

  - [[Enumerable]]: 表示能否通过 `for-in` 循环返回属性，（默认对象此属性为 `true`）

  - [[Writable]]: 能否修改属性的值，(默认对象此属性为 `true`)

  - [[Value]]: 包含这个属性的值。（默认对象这个值是 `undefined`）

  > 要修改默认特性，必须使用 **Object.defineProperty(配置对象， 属性名， 配置参数)**
  > 但是要记住，`Object.defineProperty()` 方法一旦调用，但是不传入第三个参数，属性（``` configurable， enumerable， writable```）默认都是false。

- 访问器属性

  -  访问器属性不包含数据值；他包含一对 **getter** 和 **setter** 函数，**（这两个函数是必须的）**，在访问访问器属性时，会调用**getter**函数，这个函数负责返回有效的值。在写入访问器属性时，会调用**setter**函数写入新新值。这个函数负责如何处理数据。（访问器有如下属性）

     - [[Configurable]]: 表示能通过 `delete` 删除属性从而重新定义属性，能否修改属性的特性，或者能否能否把属性改为访问器属性。（默认对象此属性的值为 `true`）

     - [[Enumerable]]: 表示能否通过 `for-in` 循环返回属性，（默认对象此属性为 `true`）

     - [[Get]]: 在读取属性时调用的函数。默认值时**undefined**

     - [[Set]]: 在写入属性时调用的函数.默认值时**undefined**

  > 访问器属性不能直接定义，必须使用**Object.defineProperty**定义

- 