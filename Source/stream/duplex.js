
// process.stdin 标准输入流(键盘输入)
// process.stdout 标准输出流（控制台输出）

const { Duplex } = require('stream');
let index = 0;
const duplex = Duplex({
  read() {
    if (i++ < 3)
      this.push(i);
    else
      this.push(null);
  },
  write(chunk, encoding, callback) {
    console.log(chunk.toString().toUpperCase())
    // 此callback是写入下一次数据 并不是传入都callback
    callback();
  }
});

process.stdin.pipe(duplex).pipe(process.stdout)