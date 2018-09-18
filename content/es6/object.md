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