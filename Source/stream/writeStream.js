const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '1.txt')
/**
 * @param 可写流
 * 当你往可写流写数据的时候，不会立刻写入文件， 会先写入缓存区，
 * 缓存区大小就是highWaterMark(默认是64K)
 * 等缓存区满后在真正的写入文件
 * 
 * 
 */
const ws = fs.createWriteStream(dir, {
  flags: 'w', // 表明对文件进行何种操作
  highWaterMark: 3, // 设置缓存区大小默认是64K
  start: 3, // 从索引为3 的位置开始读
  // end是唯一一个 包括结束索引的
  mode: 0o666,
})
/**
 * 按理说如果返回false， 就不能在往里面写了，但是如果写了，
 * 数据也不会丢失，会缓存在内存中。等缓存区清空之后再从内存中读出来
 */
const flag = ws.write('x')
// 如果缓存区已满，返回false，缓存区未满，返回true
// 能接着写就返回复true， 不能接着写的时候fan 返回false
console.log(flag)