### 项目组织的结构目录(所说都在src文件下)

#### 全是自己的习惯目录仅供参考

 - components 文件下有common、footer、header文件，common一般是公共组件，公共功能代码。header、footer众所周知是头部底部公用组件。
 - config一般会有env.js、ajax.js、mUtils.js、rem.js。env中存放域名和router的模式。ajax是API请求的封装。mUtils缓存方法的封装。rem是计算不同屏幕大小的适配。
 - images当然就是公共的图片了
 - pages中就是各个页面的组件
 - plugins存放插件
 - router 当然就是所有路由了
 - service 一般都是发送API请求
 - store 用到vuex才会有这个文件的，这是用于组件间通信的数据存放的地方呦
 - style 存放是一般是公共的样式文件