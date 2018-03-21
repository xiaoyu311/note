### webapp兼容相关内容
  - IOS和Safari浏览器中，定义

  ```js
    console.log(new Date('1900-1-1'))
  ```
  > 报错：invalid。这其实是Safari不兼容的问题
  - 把上面的代码修改成下面
  ```js
    console.log(new Date('1900/1/1'))
  ```
  > 这样就能正常输出时间，并且在Android移动端也可以正常识别
  - 也可以把他封装成自己的方法
  ```js
    function GetDateDiff(startDiffTime, endDiffTime) {
            //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
            startTime = startDiffTime.replace(/\-/g, "/");
            endTime = endDiffTime.replace(/\-/g, "/");
    }; 
  ```
  > 这样兼容问题完美解决
      