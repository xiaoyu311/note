const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

const dir = path.resolve(__dirname, '1.txt')
/**
 * @param 可写流
 * 当你往可写流写数据的时候，不会立刻写入文件， 会先写入缓存区，
 * 缓存区大小就是highWaterMark(默认是64K)
 * 等缓存区满后在真正的写入文件
 * 
 * 
 */
// const ws1 = fs.createWriteStream(dir, {
//   flags: 'w', // 表明对文件进行何种操作
//   highWaterMark: 3, // 设置缓存区大小默认是64K
//   start: 3, // 从索引为3 的位置开始读
//   // end是唯一一个 包括结束索引的
//   autoClose: true, // 流写完后 自动关闭文件
//   mode: 0o666,
// })
/**
 * 按理说如果返回false， 就不能在往里面写了，但是如果写了，
 * 数据也不会丢失，会缓存在内存中。等缓存区清空之后再从内存中读出来
 */
// const flag = ws1.write('x')
// 如果缓存区已满，返回false，缓存区未满，返回true
// 能接着写就返回复true， 不能接着写的时候fan 返回false

// const ws = fs.createWriteStream(dir, {
//   highWaterMark: 3
// })


// write();

class WriteStream extends EventEmitter {
  constructor(path, options) {
    super(path, options);
    this.path = path;
    this.flags = options.flag || 'w';
    this.mode = options.mode || 0o666;
    this.start = options.start || 0;
    this.pos = this.start; // 写入位置
    this.encoding = options.encoding || 'utf8';
    this.autoClose = options;
    this.highWaterMark = options.highWaterMark || 64 * 1024;
    this.length = 0; // 缓存区字节长度
    this.writing = false; // 表示内部正在写入数据
    this.buffers = []; //   缓存区
    this.fd = null;
    this.open();
  }
  // 如果底层正在写入数据， 则必须把当前写入的数据放在缓存区中
  write(chunk, encoding, cb) {
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, this.encoding);
    let len = chunk.length;
    this.length += len;
    let ret = this.length < this.highWaterMark;
    // console.log(ret)
    if (this.writing) { // 底层正在写数据 把当前数据放在缓存区中
      this.buffers.push({
        chunk,
        encoding,
        cb
      });
    } else { // 直接调用底层写入方法进行写入
      this.writing = true;
      // 在底层写完当前数据时 要清空缓存区
      this._write(chunk, encoding, () => this.clearBuffer()); // 
    }
    return ret;
  }
  _write(chunk, encoding, clearBuffer) {
    if (typeof this.fd != 'number') {
      return this.once('open', () => this._write(chunk, encoding, clearBuffer));
    }
    fs.write(this.fd, chunk, 0, chunk.length, this.pos, (err, bytesWritten) => {
      if (err) {
        if (this.autoClose) {
          this.destroy();
        }
      }
      this.pos += bytesWritten;
      this.length -= bytesWritten;
      clearBuffer && clearBuffer();
    })
  }
  clearBuffer() {
    // console.log(this)
    let data = this.buffers.shift();
    if (data) {
      this._write(data.chunk, data.encoding, () => this.clearBuffer())
    } else {
      this.writing = false;
      this.emit('drain')
    }
  }
  open() {
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      this.fd = fd;
      this.emit('open');
      if (err) {
        if (this.autoClose) {
          this.destroy();
        }
        this.emit('error', err);
      }
    })
  }
  destroy() {
    fs.close(this.fd, () => {
      this.emit('close');
    })
  }
}

// let ws = new WriteStream(dir, {
//   flags: 'w'
//   , mode: 0o666
//   , start: 0
//   , encoding: 'utf8'
//   , autoClose: true //当流写完之后自动关闭文件
//   , highWaterMark: 3
// });
// let n = 9;
// ws.on('error', (err) => {
//   console.log(err)
// })
// function write() {
//   // 可以写  也就是缓存区没有满
//   let flag = true;
//   while (flag && n > 0) {
//     flag = ws.write(n + "", 'utf8', () => {
//       console.log('ok');
//     });
//     n--;
//     console.log('flag=', flag)
//   }
//   ws.once('drain', () => {
//     console.log('drain');
//     write();
//   })
// }
// ws.on('drain',()=>{
//   console.log('drain');
//   write();
// })
// write();
module.exports = WriteStream;