# 阿里云Linux服务器安装node

 1. 跳转到目录：/usr/src，这个文件夹通常用来存放软件源代码：
  ```
    cd usr/src
  ```

 2. node下载，我用的是淘宝镜像的node，明显的下载速度飞快啊。根本都追不上！！！[https://npm.taobao.org/mirrors/node/v8.9.3/node-v8.9.3.tar.gz](https://npm.taobao.org/mirrors/node/v8.9.3/node-v8.9.3.tar.gz)

  ```
    wget https://npm.taobao.org/mirrors/node/v8.9.3/node-v8.9.3.tar.gz
  ```
 3. 解压下载压缩包
  ```
    tar -xzvf  node-v8.9.3.tar.gz
  ```

4. 编译源代码，这个步骤花的时间会很长：
  ```
    make && make install
  ```
5. 编译完成后，查看是否安装成功
  ```
    node -v
  ```
  > 显示 v8.9.3 表示安装成功


