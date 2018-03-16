# linux下操作mongodb数据库

  1. 在刚安装完毕的时候MongoDB都默认有一个admin数据库,此时admin数据库是空的,没有记录权限相关的信息！当admin.system.users一个用户都没有时，即使mongod启动时添加了—auth参数,如果没有在admin数据库中添加用户,此时不进行任何认证还是可以做任何操作(不管是否是以—auth 参数启动),直到在admin.system.users中添加了一个用户。加固的核心是只有在admin.system.users中添加用户之后，mongodb的认证,授权服务才能生效。
  
      ![jincheng](images/one.png)
  > 此图说明出现权限问题。

  2. 进入admin数据库

  ```
    > use admin
  ```
  > 出现 switched to db admin 表示已经进入数据库中

  3. 添加一用户
  ```
    db.createUser({ user: "docdetection", pwd: "123456", roles: [ { role: "root", db: "admin" }]})
  ```
  > Successfully added user表示添加成功
  4. 给数据库权限
  ```
    > db.auth("docdetection", "123456")
  ```
  > 提示有关你的信息证明授权已经成功
  5. 假如你不是很放心，你就再一次查看一下你的信息
  ```
    > db.system.users.find()
  ```
  > 再一次显示你自己的相关信息，
  6. 这个时候你就可以查看你的数据库了
  ```
    > show dbs
  ```
  > 我的使提示有3个数据库
  ![jincheng](images/two.png)


