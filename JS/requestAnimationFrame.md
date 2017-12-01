### requestAnimationFrame的一些知识

- 用法介绍

```js
  var myDiv = parseInt(document.querySelector('div').style.width);

var timer = requestAnimationFrame(function fun() {
  if(myDiv < 500) {
    document.querySelector('div').style.width = myDiv + 10 + 'px';
  } else {
    cancelAnimationFrame(timer);
  }
})
```
> requestAnimationFrame类似于setTimeout 但是setTimeout会失贞,requestAnimationFrame函数自己调用自己,假如没有判断条件此函数只会执行一次，然后就自动停止，而且这个函数消耗的内存相对较小