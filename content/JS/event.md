### event相关介绍

- addEventListener(ele, listener, [options])

 - options 可选参数
一个指定有关 listener 属性的可选参数对象。可用的选项如下：
  1. capture:  Boolean，表示 listener 会在该类型的事件捕获阶段传播到该 EventTarget 时触发。
  2. once:  Boolean，表示 listener 在添加之后最多只调用一次。如果是 true， listener 会在其被调用之后自动移除。
  3. passive: Boolean，表示 listener 永远不会调用 preventDefault()。如果 listener 仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告。
  4. mozSystemGroup: 只能在 XBL 或者是 Firefox' chrome 使用，这是个 Boolean，表示 listener 被添加到 system group。

可以添加事件
```js
 var div = document.getElementById('div');
 addEventListener('click', function() {
   console.log('我被添加了点击事件')
 }, false);

```

使用 passive 改善的滚屏性能
```js
var elem = document.getElementById('elem'); 
elem.addEventListener('touchmove', function listener() { /* do something */ }, { passive: true });
```

```js
  document.documentElement
```
> 获取到的事html标签，并且含有里面的所有元素
