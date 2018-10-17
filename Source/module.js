/**
 * node.js通过require来加载模块
 * 这个加载是同步的
 * 
 * 1、找到这个文件
 * 2、读取此文件模块的内容
 * 3、把它封装到一个函数里立刻执行
 * 4、执行后把 module.exports 复制给 作为require返回值付给变量
 * 
*/

// !function (exports, require, module, __filename, __dirname) {
//   let a = 1;
//   let b = 2;
//   module.exports = { a, b };
//   return module.exports;
// }()
// this === exports === module.exports => true


const Module = { // module对象
  id: '.', // 当前模块id  入口模块的id永远为 .
  exports: {}, // 导出对象，默认是一个控对象
  parent: null, // 父摸快 谁调用的此模块
  filename: '/Users/liuchunyu/Desktop/project/note/Source/module.js', // 当前模块的绝对路径
  loaded: false, // 是否加载完成
  children: [], // 此模块加载来哪些模块
  paths: // 第三方模块的加载路径
    ['/Users/liuchunyu/Desktop/project/note/Source/node_modules',
      '/Users/liuchunyu/Desktop/project/note/node_modules',
      '/Users/liuchunyu/Desktop/project/node_modules',
      '/Users/liuchunyu/Desktop/node_modules',
      '/Users/liuchunyu/node_modules',
      '/Users/node_modules',
      '/node_modules']
}

// console.log(require)
/**
 * require => {
 *  resolve: funtion
 *  main: {} 入口模块
 *  extensions: { '.js': [Function], '.json': [Function], '.node': [Function] }
 *  cache: {}
 * }
 * json模块加载就是先找文件，然乎读取文件内容，在用JSON.parse专换成对象返回require(./test.json)
 * 
 */

/**
 * 当你想知道一个模块的绝对路径的时候，但你有不想加载这个模块的时候，用require.resolve方法
 */ // console.log(require.resolve('./debug.js')) => /Users/liuchunyu/Desktop/project/note/Source/debug.js

/**
 * node加载模块事同步的，效率比较低。
 * node同步加载模块的原因
 * 因为模块实现缓存，当第一次加载模块，node会缓存exports对象，再次加载的话，直接从缓存中读取，不需要在加载了
 * require.cache 可查看缓存
 * 缓存的key是被加载模块的绝对路径，其他模块再去加载次模块时，同样是加载缓存，全局只有一个require
 */

/**
 * 模块查找的时候
 * require('load') => 先去找module.paths(一个数组)，再去找 global module（全局安装的目录）
 */





