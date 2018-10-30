const { Readable, Writable } = require('stream');
// 自定义流

let i = 0;
const rs = Readable({
  highWaterMark: 2,
  read() {
    if (i < 10) { 
      this.push('' + i++);
    } else {
      this.push(null);
    }
  }
});

const ws = Writable({
  highWaterMark: 2,
  write(chunk, encoding, callback) {
    console.log(chunk.toString('utf8'));
    callback();
  }
});

rs.pipe(ws);

setTimeout(() => {
  console.log(rs._readableState.length)
  console.log(ws._writableState.length)
}, 200)