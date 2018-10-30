const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');
// const ReadStream = require('./readStream');
// const WriteStream = require('./WriteStream');
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

/**
 * @param 可读流  不管监听没监听 data readable 事件  都开始读数据  放在缓冲区中
 */

class ReadStream extends EventEmitter {
  constructor(path, options) {
    super();
    this.path = path;
    this.encoding = options.encoding || 'utf8';
    this.flags = options.flags || 'r';
    this.highWaterMark = options.highWaterMark || 64 * 1024;
    this.fd;
    this.autoClose = options.autoClose || true;
    this.mode = options.mode || 0o666;
    this.flowing = false;
    this.start = options.start || 0;
    this.end = null || options.end;
    this.pos = this.start;
    this.buffer = Buffer.alloc(this.highWaterMark); // 这个只是临时容器 并不是缓存
    this.buffers = []; // 这个才是真正的缓存
    this.length = 0;
    this.open();
  }
  // 暂停模式
  read(n) {
    // 传入读取的字节数
    let ret = Buffer.alloc(n);
    if (0 < n < this.length) {
      let index = 0;
      let b;
      while (null != (b = this.buffers.shift())) {
        for (let i = 0;i < b.length; i++) {
          ret[index++] = b[i];
          if (index == n) {
            b = b.slice(i);
            this.buffers.unshift(b);
            this.length -= n;
            break;
          }
        }
      }
    }
    if (this.length < this.highWaterMark) {
      fs.read(this.fd, this.buffer, 0, this.highWaterMark, null, (err, bytesRead) => {
        if (bytesRead) {
          const b = this.buffer.slice(0, bytesRead);
          this.buffers.push(b);
          // 让缓存区长度加上读到的实际字节数
          this.length += bytesRead;
          this.emit('readable');
        } else {
          this.emit('end');
        }
      })
    }
    return ret && this.encoding ? ret.toString() : ret;
  }
  open() {
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      if (err) {
        if (this.autoClose) {
          // this.destroy();
          return this.emit('error');
        }
      }
      this.fd = fd;
      this.emit('open', fd);
      this.read(0);
    })
  }
}
const rs = new ReadStream(dir, {
  highWaterMark: 3
})
rs.on('readable', () => {
  console.log(rs.length)
  console.log(rs.read(1))
  console.log(rs.length)
  setTimeout(() => {
    console.log(rs.length)
  }, 200)
})
// const rs = new ReadStream(dir, {
//   highWaterMark: 4,
//   start: 3,
//   end: 13,
// });
// const ws = new WriteStream(dest, {
//   highWaterMark: 3,
// });
// rs.pipe(ws);
