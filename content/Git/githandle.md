# 简单的git命令是程序员的必不可少的知识。

### 首先就是安装gitbash

打开命令行当前显示的 <code>~</code> 表示用户主目录。

git基本命令如下：

* <code>cd</code> 就是直接跳转到用户主目录。

* <code>ls</code> 查看当前目录下的内容。

* <code>ls -s</code> 查看对应文件的命令权限

* <code>cd ../</code> 或 <code>cd ..</code> 回到上一级

* <code>cd/</code> 回到顶级目录

* <code>cd D:</code> 跳到D盘

* <code>cd .test</code> 跳到test文件

* <code>mkdir test text</code> 当前目录下创建文件夹test 和 text

* <code>mkdir test/text</code> 在文件夹test下创建text文件夹，test文件夹不存在的时候需要加参数 p 如下：

* <code>mkdir -p test/text</code>

* <code>touch index.html</code> 创建一个index.html文件

* <code>rm index.html</code> 删除文件   

* <code>rm test -r</code> 删除文件夹

* <code>rm test -rf</code> 强制删除文件夹

* <code>rm test/* -r</code> 删除test文件夹下的所有文件夹

* <code>cp text test -r</code> 把text复制到test文件夹下

* <code>mv index.html text</code> 把index.html剪切到text文件夹中

* <code>mv text test</code> 将text文件夹命名为test

* <code>cat index.html</code> 预览index.html文件

* <code>du -sh index.html</code> 查看test文件夹的大小

* <code>vi index.html</code> 进入index.html文件

* <code>git clone git@github.com:xiaoyu311/xiaoyu311.github.io.git mygit</code> 克隆远端仓库到本地mygit文件夹下

* <code>git log</code> 查看版本历史

* <code>git status</code> 查看仓库状态

* <code>git add .</code> 跟踪所有修改

* <code>git commit -m 'my commit'</code> 版本留言

* <code>git push</code> 推送到远端仓库

> 在推送远端仓库时候，一般会<code>git pull</code> 来确保本地仓库已经是最新版本。

* <code>git diff</code> 查看修改

* <code>git checkout</code> 还原修改

* <code>git checkout .</code> 还原所有修改

* <code>git init</code> 初始化一个仓库，这时候会生成一个<code>.git</code> 隐藏文件夹。

* <code>ssh-keygen</code> 将会生成密钥文件和私钥文件，id_rsa,id_rsa.pub或id_dsa,id_dsa.pub。

这时候需要把生成的公钥，也就是id_dsa.pub文件中的字符拷贝到远端git仓库中，步骤如下：

* <code>settings=>SSH and GPG keys => New SSH key</code>
