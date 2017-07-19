### store 数据流管理工具

> 一切数据都保存到store中，组件自己不保存自己的state数据。

把所有的数据存放到store中，然后所有的组件都订阅了store数据，那么数据就有了唯一可信源。这样的好处是：
  * 各个组件都统一读取同一数据，组件间的通讯不成问题
  * 把数据存放到一起，代码简单明了不容易写乱

归根结底store的主题就是把数据放在store.js中

```
  state = {
    comments:[
      '第一条消息','第二条消息'
    ]
  }
```

但是需要一个包

```
  npm i --save redux
  npm i --save react-redux
```

到store.js中先导入

```
  import {createStore} from 'redux'
```

store.js 导出数据是这样导出的：

```
  let store = createStore(commentReducer)

  export default store
```

createStore这个方法可以接受三个参数

  * reducer 这一项是必须填写的，是一个函数，用来修改state中的数据
  * preloadedState 是欲加载state，这是可选项
  * enhancer 增强器，也是可选项

### reducer函数介绍

```js
  let comments = [
    '第一条','第二条'
  ]

  export default function commentReducer(state = comments, action) {
    switch (action.type) {
      case 'ADD_COMMENT':
        return [...state, action.comment]
      default:
        return state;
    }
  }
```
这就是reducer的基本格式

### 修改store中的数据

下面的代码实现了，数据存储到 store.js 同时组件内部读取 store.js 中的数据成功。

CommentBox组件中

```js
import React from 'react'
import store from './store'
import { connect } from 'react-redux'

class CommentBox extends React.Component{
  //渲染还是需要state改变才行，没有直接给state赋值，不违背redux思想
  handleSubmit = (e) =>{
    e.preventDefault();
    let comment = this.input.value
    store.dispatch({type:'ADD_COMMENT', comment:comment});
    //store.dispatch()修改数据  这个对象就是action
    this.form.reset();
  }
  render(){
    //let comments = store.getState()//获取数据
    console.log(store.getState());
    return(
      <div className="bottom">
        {
          this.props.comments.map(item =>
            <li key={Math.random()}>{item}</li>
          )
        }
        <form ref={value => this.form = value} onSubmit={this.handleSubmit}>
          <input className="input" ref={value => this.input = value } type="text" />
          <button type="submit" className="btn">提交</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  comments:state
})
//connect 完毕之后，CommentBox 之中就多了一个属性：this.props.comments, 这里就相当于修改state数据，用this.props.comments就可以拿到数据了。页面渲染是由state和props之一改变引起的。

export default connect(mapStateToProps)(CommentBox)
```

* connect 连接 store 和组件
* mapStateToProps：把 store 中的数据（一部分）映射为当前组件的 props
  * map 的意思是“映射”
  * State 指的是 store 状态树（ State Tree ），也就是 store 的实际数据
  * Porps 就是属性

Store 中数据很多，当前组件需要的只是一部分，那么选取工作是在 mapStateToProps 中完成的

导出时候用connect方法。可以理解为connect(mapStateToProps)执行完返回值还是一个函数，完事后返回函数执行

store.dispatch是修改数据给action一个类型（可以查找此类型数据）

我们的App组建中

```js
import React, { Component } from 'react';
import Postbody from './Postbody'
import CommentBox from './CommentBox'
import store from './store'
import { Provider } from 'react-redux'
import './App.css';

class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <div>
            <Postbody />
            <CommentBox />
          </div>
        </Provider>
    );
  }
}

export default App;
```

所有的组件必须包裹在<code> Provider 这个组件中 </code>中，但是所有的子组件必须包裹在一个<code> div </code> 中。这样就能顺利完成数据共用了。动态连接也就完成了。
