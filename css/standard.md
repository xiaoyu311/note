### CSS书写规范

> 我觉得不同的规范都有各自的长处和缺陷，对待所谓的规范最好的方式不是人云亦云，拿来就用，而是应该结合自己的实际情况级需求，取长补短，吸取精华去其糟粕。

#### 下面是自我感觉比较好的一套CSS书写规范

#### 命名空间规范

- 布局：以g为命名空间，例如g-wrap、g-header、g-contant。
- 状态：以s为命名空间，表示状态的、具有交互性质的状态，例如：s-current、s-selected。
- 工具：以u为命名空间，表示不耦合义务逻辑的、可复用的工具。例如：u-clearfix、u-ellipsis。
- 组件：以m为命名空间，表示复用、移植的组件模式。例如：m-slider、m-dropMenu。
- 钩子：以j为命名空间，表示特定给Javascript调用的类名，例如j-request、j-open。

#### 规则生命块

  - 当规则声明块中有多个样式声明时，每条样式独占一行。
  - 在规则声明的做大括号 { 前加一个空格。
  - 在样式声明的：后面加一个空格，前面不加空格。
  - 规则声明块右大括号 } 独占一行。
  - 每个规则声明间用空行分割。
  - 所有最外层引号使用单引号'。
  - 当一个属性有多个属性值时候，以逗号分割属性，每个逗号后添加一个空格，当单个属性值过长时，每个属性独占一行。

#### 数值与单位

  - 当属性值或颜色参数为0-1之间的数时，省略小数点前面的0.
  - 当长度值为0时，省略单位。
  - 十六进制的颜色属性值使用小写或尽量简写。

#### 样式属性顺序

  单个样式规则属性在书写时，应该按功能进行分组，以Position Model > Box Model > Typographic > Visual 的书写顺序，提高代码可读性。

  - 如果包含content属性，应放在最前面。
  - Position Model布局方式、 位置、相关属性包括：position / top / right / bottom / left / z-index / display / float ...
  - Box Model相关属性包括： width / height / padding / margin / border / overflow...
  - Typographic文本排版相关属性包括：font / line-height / text-align / word-wrap ...
  - Visual视觉外观：color / background / list-style / transform / animation / transtion ...
  