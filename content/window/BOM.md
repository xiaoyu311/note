### BOM对象及其兼容

 - 全局声明

 ```js
  var age = 29;
  window.color = 'red';
  // window 浏览器模式下
  //用var语句添加到window对象上的属性,[[Configurable]]为false

  // IE < 9 时抛出错误，在其他浏览器中返回false
  delete window.age; // 29

  // IE < 9 时抛出错误，在其他浏览器中返回true
  delete window.color; // undefined
 ```
 - 窗口位置
  
  ```js
  // screenX(screenLeft) 窗口到屏幕左边的距离
  // screenY(screenTop) 窗口到屏幕上边的距离
  // 在(IE, Safari, Opera, Chrome)取的是screenLeft， 在Firefox中没有screenLeft取得是screenX
  var leftPos = (typeof window.screenLeft == 'number') ? window.screenLeft : window.screenX;
  var topPos = (typeof window.screenTop == 'number') ? window.screenTop : window.screenY;

  // 注意：IE，Opera，Chrome中，screenLeft和screenTop保存从屏幕左边上边到由window对象表示到页面可见域到距离
  // 也就是在浏览器最大化的时候y坐标为0，screenLeft也就是浏览器工具栏高度
  // 在Firefox和Safair中，screenY或screenTop在浏览器最大化的时候，screenY或screenTop为0
  ```

  - 窗口大小

  > IE9+, Firefox, Safari, Opera, Chrome提供四个属性， `innerWidth, innerHeight, outerWidth, outerHeight`, 在IE9+、Safari、Firefox中，outerHeight、outerWidth返回浏览器窗口本身的尺寸，在Opera中表示单个标签页对应多浏览器，而innerWidth,innerHeightb表示该容器种页面试图区（减去边框宽度）。在Chrome中，innnerWidth和innerHeight与outerWidth和outerHeight返回值相同，即视口（viewport）大小而非浏览器窗口大小。

  > 在IE、Firefox、Opera、Safari、Chrome中，`document.documentElement.clientWidth`和 `document.documentElement.clientWidth`保存着视口信息，在标准模式下有效，在混杂模式下需要用`document.body.clientWidth`

  **最终无法确定浏览器窗口本身的大小，但却可以取得页面视口的大小**

  ```js
    var pageWidth = window.innerWidth,
        pageHeight = window.innerHeight;

    if (typeof pageWidth != 'number) {
      pageWidth = document.documentElement.clientWidth;
      pageHieght = document.documentElement.clientHeight;
    } else {
      pageWidth = document.body.clientWidth;
      pageHeight = document.body.clientHeight;
    }
  ```
  
  - ### location 对象
  
  > window.location === document.location //true

  ```js
    {
      hash: "#content", // 返回URL中的hash
      host: "www.wrox.com:80", // 返回服务器名称和端口号
      hostname: "www.wrox.com", // 返回不带端口的服务器名称
      href: "http://www.wrox.com", // 返回当前加载页面带完成带URL，而location对象的toString()方法也返回这个值
      pathname: "/WileyCDA/", // 返回URL带目录和文件名
      port: "8080", // 返回端口号
      portool: "http:", // 页面使用带协议
      search: "?q=javascript"， // URL的查询字符串， 以问号开头
    }
  ```




  

