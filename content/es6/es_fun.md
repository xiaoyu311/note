# 函数

### reduce函数实现
```js
Array.prototype.reduce = function(reducer, initialVal) {
  for (let i = 0;i < this.length;i++) {
    initialVal = reducer(initialVal, this[i]);
  }
  return initialVal;
}
```

### filter实现

```js
Array.prototype.filter = function(fn) {
  let newArr = [];
  for (let i = 0;i < this.length; i++) {
    let flag = fn(this[i])
    flag&&newArr.push(this[i]);
  }
  return newArr;
}
```

### find函数实现

```js
Array.prototype.find = function(fn) {
  for (let i = 0;i < this.length;i++) {
    let flag = fn(this[i]);
    if (flag) {
      return this[i];
    }
  }
}
```

### 箭头函数

```js
let obj1 = {
  name: 'obj1',
  getName: () => {
    console.log(this.name);
  }
}

let obj2 = {
  name: 'obj2',
  getName: obj1.getName
}

obj1.getName() // 输出undefind
obj2.getName() // 输出undefind

> 箭头函数this指向外层this，因为js只有两种作用域，一种是全局作用域，另一种是全局作用域，对象的大括号并不是作用域，所以箭头函数中的this是指向的全局作用域。所以是undefind

let obj3 = {
  name: 'obj3',
  getName: function() {
    // this => 调用函数的对象
    setTimeout(() => {
      console.log(this.name);
    })
  }
}
obj3.getName() // 输出 obj3

> 因为getName中有自己的this，也就是obj3，而且是一个函数，所以箭头函数中的this就是getName函数中的this。

 
```
