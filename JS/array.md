### 数组的方法

```js
  let newArr = arr.concat([]);
```
> 拷贝一个数组吧

```js
  let bool = some(item => item == 1);
```
> 遍历数组，有一个符合条件的就直接停止执行，返回一个布尔值**true**或者**false**
```js
  let bool = every(item => item == 1);
```
> 遍历数组，所有都符合条件才返回一个布尔值

```js
  let arr = [1, 2, 3, 4, 5]
  arr.splice(index, num, add)
  console.log(arr.splice(0, 3)) //[1, 2, 3]
```
- index: 删除从位置
- num: 删除的数量
- add: 需要添加的元素
> 原数组概念了 **返回的是你所删除的元素组成的数组**

 