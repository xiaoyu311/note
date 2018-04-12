### React 语法编译到底是样的呢？

  - 标签编译
  当我们在jsx编写Dom标签的时候Babel会帮我们把相关的内容编译成浏览器认识的js语法。
  ```js
    <div className="xiao">yu</div>
  ```
  Babel就是帮我们编译成这个样子
  ```js
    React.createElement("div", {className: "xiao"}, "yu")
  ```
  也就是React这个类调用createElement方法，方法传递2个参数，一个是标签的名字，另一个就是一个对象，当还有行内样式或者其他属性的时候，一并添加到第二个参数对象中。第三个参数就是标签内的内容，假如没有Babel会自动不传此参数。

  - 编译component
  ```js
    <Button color={color}>xixi</Button>
  ```
  编译成：
  ```js
    React.createElement("Button", {color: color}, "xixi")
  ```
  component 编译跟标签类似。



