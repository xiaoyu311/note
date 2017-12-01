# js基础

### var fun = function(){}和function fun(){}区别

```js
b()
a()
function b(){
  console.log(1)
}
var a=function(){
  cosole.log(2)
}

```

这样再运行一下就有区别了
function b(){} 为函数声明，程序运行前就已存在；var a = function(){} 为函数表达式，属于按顺序执行，所以a为undefined

  函数表达式优点：在多人同时开发的情况下，可以保证自己运行的不会是其他人编写的同名函数

### setTimeout(() => {fun()},0) 和 fun() 区别

JavaScript 是单线程执行的，也就是无法同时执行多段代码，当某一段代码正在执行的时候，所有后续的任务都必须等待，形成一个队列，一旦当前任务执行完毕，再从队列中取出下一个任务。这也常被称为 “阻塞式执行”。
如果代码中设定了一个 setTimeout，那么浏览器便会在合适的时间，将代码插入任务队列，如果这个时间设为 0，就代表立即插入队列，但不是立即执行，仍然要等待前面代码执行完毕。所以 setTimeout 并不能保证执行的时间，是否及时执行取决于 JavaScript 线程是拥挤还是空闲。

### 这个东西出现率比较高
``` js
var a = 1
function fun(){
  //此时相当于这 var a 没有给a赋值
  console.log(a) //undefined
  var a = 2
  console.log(a) //2
}
console.log(a) //1
```

### ES6
```js
const obj = {name:'xiaoyu',age:24}
obj.name = 'zhang'
console.log(obj) //报错 const定义常量 不能修改
let newobj = obj
newobj.name = 'zhang'
console.log(newobj) //{name:'zhang',age:24}
```
