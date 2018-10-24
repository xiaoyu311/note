const fs = require('fs');
const path = require('path');
const ReadStream = require('./readStream');
const WriteStream = require('./WriteStream');
const dir = path.resolve(__dirname, '1.txt');
const dest = path.resolve(__dirname, '2.txt');

/**
 * 可读流的默认是暂停模式 parsed 不是flowing模式
 * data， resume， pipe会触发流动模式
 * 流动模式跟缓存没关系，读取文件，然后直接发射data事件，然后读取下一次数据，如果数据不消费，数据直接白白丢失
 */

// const rs = fs.createReadStream(dir, {
//   highWaterMark: 3,
// });

/**
 * 当监听readable事件带时候，会进入暂停模式
 * 
 * 当监听readable事件的时候，可读流会马上向地层读取文件，调用fs.read
 * 方法，然后把读到的文件放到缓存区里
 * 
 * self.read(0); 只填充数据，但并不会触发data事件，但是会发射stream.emit('readable')事件
 */
// rs.on('readable', data => {
//   // 表示缓存区数据的大小
//   console.log(rs._readableState.length)
//   // read如果不家参数，表示读取整个缓存区大小
//   // 读取一个字节可读流如果发现你要读读取的字节小于缓存字节大小，则直接返回
//   let ch = rs.read(1)
//   // 当你读完指定的字节后，如果可读流发现剩下的字节小于最高水位线（highWaterMark）了，则立马在读取填充最高水位线个字节。
//   setTimeout(() => {
//     console.log(rs._readableState.length)
//   }, 200)
// })

const rs = new ReadStream(dir, {
  highWaterMark: 4,
  start: 3,
  end: 13,
});
const ws = new WriteStream(dest, {
  highWaterMark: 3,
});
rs.pipe(ws);
