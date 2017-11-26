# React有关的问题

react结合redux实现数据传递，流程图很重要（背过）

### state和props的区别
state和props主要的区别在于props是不可变的；而state可以根据与用户交互来改变
props只能从父组件修改，state可以在自身组件中修改

### 用户第二次登录是否需要出入账号密码

```js
var defauletime = 1000
var firsttime = new Date().getTime()//把第一次登陆时间存储起来
var secondtime = new Date().getTime()//第二次登录时获取一下时间,存起来 以便于和下一次登录时间比较
if (secondtime-firsttime>defauletime) {
  //重新登录
}else{
  //自动登录
}
```

### redux三大部分state store Reducer

Reducer函数的要求：
  - Reducer 函数最重要的特征是，它是一个纯函数。也就是说，只要是同样的输入，必定得到同样的输出。
  - 不得改写参数
  - 不能调用系统 I/O 的API
  - 不能调用Date.now()或者Math.random()等不纯的方法，因为每次会得到不一样的结果
  - 由于 Reducer 是纯函数，就可以保证同样的State，必定得到同样的 View。但也正因为这一点，Reducer 函数里面不能改变 State，必须返回一个全新的对象。保证试图和state相对应。

### react性能优化

一般在shouldComponentUpdate判断两次数据是否一样
```js
shouldComponentUpdate(nextProps,nextState){
  return this.props.value !== nextProps.value//简单数据判断值是否相等 不相等时才进行重新render
}
```

数据发杂情况下
Immutable 则提供了简洁高效的判断数据是否变化的方法，只需 === 和 is 比较就能知道是否需要执行 render()，而这个操作几乎 0 成本，所以可以极大提高性能。修改后的 shouldComponentUpdate 是这样的：

for in 方法是es6中的可参考（http://es6.ruanyifeng.com/#docs/intro）

```js
import { is } from 'immutable'

shouldComponentUpdate: (nextProps = {}, nextState = {}) => {
  const thisProps = this.props || {}, thisState = this.state || {};

  if (Object.keys(thisProps).length !== Object.keys(nextProps).length ||
      Object.keys(thisState).length !== Object.keys(nextState).length) {
    return true;
  }

  for (const key in nextProps) {
    if (!is(thisProps[key], nextProps[key])) {
      return true;
    }
  }

  for (const key in nextState) {
    if (thisState[key] !== nextState[key] || !is(thisState[key], nextState[key])) {
      return true;
    }
  }
  return false;
}

```

### 模块引用function和class区别

function方法定义的模块只能是纯模块，里面不能有state控制状态
class类中可以有自己的state来控制自己的状态
（表达不是很准确，你们懂的）


### 打包后优化

假如打包出的项目是50兆比较大怎么优化：
这方面应该是js分离，不同的页面加载不同的js。网上说的基本都是在webpack中配置很多东西，感觉比较复杂。我也没看懂。
