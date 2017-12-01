# 声明变量

### let

  对let来说{}是块级作用域，不会变量提升，但是同一作用域不能重复声明

  <code>const a = 10</code> 是声明常亮，只读，不能修改。const也有块级作用域，也不能变量提升。

  但是<code>const a= {name:222}</code> 是可以修改a对象下的属性的。

  <code>var/let[a,b] = [1,2]</code> 索引值相对应，也就是说1赋值给a，2赋值给b。

  <code>let [a,b,c,d,e] = 'hello'</code> 也是索引值相对应。

  <code>let {name,age} = {name:'xiaoyu', age:18}</code>是对象的变量赋值，相当于按属性名赋值。console.log({name,age}) => 'xiaoyu',18

  ```
    let obj = {
      name:'xiaoyu',
      age:18
    }
    let {name} = obj
  ```

  console.log(name) => 'xiaoyu'

  对象的简写

  ```
  let obj = {
    name:'xiaoyu',
    age:18,
    say:function(){
      console.log('xiaoyu')
    }
  }
```

可简写成：

```
  let obj = {
    name,
    age,
    say(){
      console.log('xiaoyu')
    }
  }
```
