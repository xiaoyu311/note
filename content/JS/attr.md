### 原生获取css属性

  用document.getElementById(‘element').style.xxx可以获取元素的样式信息，但是那只是style样式

- 获取左边距
  ```js
  window.getComputedStyle.paddingLeft
  ```
  > 但是IE不支持getComputedStyle属性
  ```js
    return window.getComputedStyle? window.getComputedStyle(obj, null).paddingLeft : obj.currentStyle.paddingLeft
  ```
  封装一个方法尝试一下
  ```js
  var getStyle = function(obj, attr) {
    if(window.getComputedStyle) {
      return getComputedStyle(obj, false)[attr];
    } else {
      return obj.currentStyle[attr];
    }
  }

  window.onload=function() { 
    var Div=document.getElementById('div'); 
    alert(getStyle(Div,'width')); 
  }
  ```
