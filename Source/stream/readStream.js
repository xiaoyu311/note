const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');
const dir = path.resolve(__dirname, '1.txt')

/**
 * @param 可读流 流动模式不走缓存
 * 流读取的时候 先把文件读到缓存区 然后在发射data事件
 */
// 创建一个可读流
// const rs = fs.createReadStream(dir, {
//   encoding: 'utf8',
//   flags: 'r', // 表明对文件进行何种操作
//   highWaterMark: 3, // 设置缓存区大小默认是64K
//   start: 3, // 从索引为3 的位置开始读
//   // end是唯一一个 包括结束索引的
//   end: 8,// 读到索引为8结束

//   mode: 0o666,
// });
// console.log(rs)

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
    this.buffer = Buffer.alloc(this.highWaterMark);
    this.open();
    this.on('newListener', (type, listener) => {
      if (type == 'data') {
        this.flowing = true;
        this.read();
      }
    });
  }
  // 流动模式
  read() {
    if (typeof this.fd != 'number') {
      return this.once('open', () => this.read());
    }
    // this.buffer 并不是缓存区
    let howMuchToRead = this.end ? Math.min((this.end - this.pos + 1), this.highWaterMark) : this.highWaterMark;
    fs.read(this.fd, this.buffer, 0, howMuchToRead, this.pos, (err, bytes) => {
      if (err) {
        if (this.autoClose)
          this.destroy();
        return this.emit('error', err);
      }
      if (bytes) {
        let data = this.buffer.slice(0, bytes);
        data = this.encoding ? data.toString(this.encoding) : data;
        this.pos += bytes;
        this.emit('data', data);
        if (this.end && this.pos > this.end) {
          this.emit('end');
        } else {
          console.log(this.flowing)
          if (this.flowing)
            this.read();
        }
      } else {
        this.emit('end');
      }
    })
  }
  open() {
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      this.fd = fd;
      if (err) {
        if (this.autoClose) {
          this.destroy();
          return this.emit('error');
        }
      }
      this.emit('open', fd);
    })
  }
  destroy() {
    fs.close(this.fd, () => this.emit('close'));
  }
  pipe(dest) {
    this.on('data', data => {
      const flag = dest.write(data);
      if (!flag) {
        this.pause();
      }
    });
    dest.on('drain', () => {
      this.resume();
    })
  }
  // 可读流 暂停
  pause() {
    this.flowing = false;
  }
  resume() {
    this.flowing = true;
    this.read();
  }
}

// const rs = new ReadStream(dir, {
//   encoding: 'utf8',
//   flags: 'r', // 表明对文件进行何种操作
//   highWaterMark: 3, // 设置缓存区大小默认是64K
//   // start: 3, // 从索引为3 的位置开始读
//   // end是唯一一个 包括结束索引的
//   // end: 8,// 读到索引为8结束
//   autoClose: true,
//   mode: 0o666,
// });

// rs.on('open', fd => {
//   console.log(fd, 'open')
// })
// // 监听data事件，当你一旦开始监听data事件，流就可以读文件的内容了并且发射data事件。
// rs.on('data', data => {
//   console.log(data)
//   // rs.pause(); // 暂停读取和发射data事件
//   // setTimeout(() => {
//   //   rs.resume(); // 恢复读取 并触发data事件
//   // }, 2000)
// })
// // 文件读 错误捕获
// rs.on('error', err => {
//   console.log(err)
// })
// // 文件读取完毕
// rs.on('end', () => {
//   console.log('wanshi')
// })
// rs.on('close', err => {
//   console.log(err)
// })
module.exports = ReadStream;