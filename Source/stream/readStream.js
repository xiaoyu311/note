const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '1.txt')

/**
 * @param 可读流
 * 流读取的时候 先把文件读到缓存区 然后在发射data事件
 */
// 创建一个可读流
const rs = fs.createReadStream(dir, {
  encoding: 'utf8',
  flags: 'r', // 表明对文件进行何种操作
  highWaterMark: 3, // 设置缓存区大小默认是64K
  start: 3, // 从索引为3 的位置开始读
  // end是唯一一个 包括结束索引的
  end: 8,// 读到索引为8结束
  mode: 0o666,
});
// console.log(rs)
rs.on('open', fd => {
  console.log(fd, 'open')
})
// 监听data事件，当你一旦开始监听data事件，流就可以读文件的内容了并且发射data事件。
rs.on('data', data => {
  console.log(data)
  rs.pause(); // 暂停读取和发射data事件
  setTimeout(() => {
    rs.resume(); // 恢复读取 并触发data事件
  }, 2000)
})
// 文件读 错误捕获
rs.on('error', err => {
  console.log(err)
})
// 文件读取完毕
rs.on('end', () => {
  console.log('wanshi')
})
rs.on('close', err => {
  console.log(err)
})