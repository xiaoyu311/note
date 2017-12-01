#  react中state的使用

### 组件的渲染是由state控制的

我们的目的是页面渲染出两条评论。

首先定义state值，如下：

```
  state = {
    comments:[
      '第一条消息','第二条消息'
    ]
  }
```

>注意：用index作为key值是很不好的习惯，我们一般都是用的id。

第二步，添加form给表单元素定义事件。

```js
  handleSubmit = (e) =>{
    e.preventDefault()
    let comment = this.input.value
    let comments = [...this.state.comments, comment]
    this.setState({
      comments:comments
    })
    this.form.reset()
  }

  <form ref={value => this.form = value} onSubmit={this.handleSubmit}>
    <input ref={value => this.input = value } type="text" />
    <button type="submit">提交</button>
  </form>
```

### 不可写性 immutability

注意，不能直接使用下面的代码：

```js
  handleSubmit(e) {
    e.preventDefault()
    let content = this.refs.content.value
    let comments =   this.state.comments // 需要添加 .slice()
    comments.push(content)
    this.setState({ comments })
  }
```

因为这样会直接修改 state 值。可行的方式是用 slice() 或者用数组展开运算符。

这样就完成了state控制的页面渲染了。
