# 使用Gitbook来做笔记

第一步，先安装

```
  npm install gitbook-cil -g
```

然后创建一个笔记文件夹

```
mkdir my-note
```

然后执行

```
  cd my-note
  gitbook init
```

这样，可以生成两个文件
  * README.md
  * SUMMARY.md

在SUMMARY.md 来添加书籍目录。

```
# Summary

* [Introduction](README.md)
* 第一章-Git相关操作
  - [第一小节：使用Gitbook来做笔记](./Git/gitbook.md)
  - [第二小结](./redux/state.md)
```

Markdown语法也是遵守缩进的。

下一步创建笔记文件，在my-note文件夹中创建Git和redux文件夹，在这俩个文件夹下分别创建gitbook.md和state.md文件。

### 现在就可以启动服务器查看书籍了。

```
  gitbook serve
```

运行 **gitbook serve** 命令后生成的临时文件夹_book不是我们写的，所以一定要放到.gitignore文件中，所以我们在 **my-note** 文件夹的顶级位置创建 **.gitignore** 文件，内容如下

```
_book
node_modules
.gitignore
```

这样就可以启动一个服务器，在localhost:4000端口，就可以看到自己的笔记了。

### 保存书稿到github远端仓库。

首先到github上创建 **xiaoyu-note** 仓库。

接下来就是把笔记上传到 **github.com/xiaoyu311/xiaoyu-note** 这个仓库的master分支保存起来。具体步骤如下：

```
cd my-note
git init
git add .
git commit -m 'first'
git remote add origin git@github.com:xiaoyu311/xiaoyu-note.git
git push -u origin master
```

最终达成的效果就是在 [https://github.com/xiaoyu311/xiaoyu-note](https://github.com/xiaoyu311/xiaoyu-note) 就可以看到书的原稿了。

新系统会遇到 ssh key 相关问题。运行以下代码生成密钥和公钥，把公钥复制到github上就可以了。

```
  ssh-keygen
```

将会生成密钥文件和私钥文件，id_rsa,id_rsa.pub或id_dsa,id_dsa.pub  

然后将id_rsa.pub 或 id_dsa.pub中的字符按如下步骤复制到github中。

```
  settings=>SSH and GPG keys => New SSH key
```

但是要非常注意空格不能多也不能少。

### 托管我的gitbook

为了方便部署，我的my-note的内容结构稍微调整一下，把原有的所有笔记都放到content文件夹中，也就是这样的目录结构。

```
  cd my-note
  cd content
  ls
  README.md SUMMARY.md Git redux
```

目的很明确，托管到github上的内容其实是一个编译后的内容，而不是原始的内容。现在把原始的内容都放到content文件夹中，未来会把编译后的内容放在my-note/gh-pages文件夹中。

### 添加自动化脚本

上面的操作之后，我们再去运行

```
gitbook serve
```

就会报错，明显文件路径不对，文件找不到了。需要修改一下命令。

```
  gitbook serve ./content ./gh-pages
```

这样我们就可以启动成功了，同时也会创建gh-pages文件夹。文件夹中的内容就是编译后的输出。

每次启动的时候，都要敲这么长的命令，不方便，一下方式把命令剪短话。就是写成npm脚本。步骤如下：

```
  cd my-note
  npm init -y
```

然后在生成的package.json中添加这些代码：

```json
  "scripts": {
    "start": "gitbook serve ./content ./gh-pages"
  }
```

然后运行：

```
  npm start
```

就可以成功预览了。

但是这时候多出来的gh-pages文件夹中的内容不是我们写的，所以到.gitignore文件中添加

```
  gh-pages
```

  然后进行git做版本的操作。

### 部署书籍到gh-pages

这一步，可以手动做：
  * 第一步：编译项目，来把md文件翻译成html放到gh-pages文件夹中
  * 第二步：拷贝gh-pages中的所有文件，到本地仓库gh-pages分支，然后上传
  * 第三步：以后每次都需要拷贝到gh-pages分支，这种步骤作为程序员每天无数次上传，很麻烦。

所以，采用一个npm包，辅助我们完成上面的步骤

```
  cd my-note
  npm i --save gh-pages
```

然后创建my-note/scripts/deploy-gh-pages.js

里面写

```
'use strict';

var ghpages = require('gh-pages');

main();

function main() {
  ghpages.publish('./gh-pages', console.error.bind(console));
}
```

上面脚本的作用，就是把当前文件夹下的gh-pages文件夹中的所有内容，push到仓库的gh-pages分支。

然后添加一个npm脚本  <code>deploy</code> (部署) ，如下：

```
"scripts": {
"start": "gitbook serve ./content ./gh-pages",
"deploy": "node ./scripts/deploy-gh-pages.js",
}
```

保证 <code>npm start</code> 运行状态中，在运行

```
  npm run deploy
```

> 如果返回undefined，表示没有出现错误，部署成功。
