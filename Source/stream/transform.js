const { Transform } = require('stream');
const fs = require('fs');
const path = require('path');

// 转换流是实现数据转换都
const t = Transform({
  readableObjectMode: true, // 这样就可以向可读流里面放对象了
  transform(chunk, encoding, callback) {
    // console.log(JSON.parse(chunk.toString()));
    // 这是往可读流里面放（缓存区或者直接输出了）
    this.push(JSON.parse(chunk.toString()));
    // this.push(chunk.toString().toUpperCase())
    // callback();
  }
});

const out = Transform({
  writableObjectMode: true, // 就可以往可写流里面写入对象了
  transform(chunk, encoding, cb) {
    console.log(chunk)
    cb();
  }
});
// process.stdin.pipe(t).pipe(process.stdout);

const rs = fs.createReadStream(path.resolve(__dirname, 'test.json'));
// 普通流里面放的是Buffer， 对象流里面放的是对象
rs.pipe(t).pipe(out);

