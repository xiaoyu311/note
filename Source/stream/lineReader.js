const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');
const dir = path.resolve(__dirname, '1.txt');

// fs.readFile(dir, (err, data) => {
//   console.log(data)
// })
// 行读取器
class lineReader extends EventEmitter {
  constructor(path) {
    super();
    this.path = path;
    this.NEW_LINE = 0x0a; // /n
    this.RETURN = 0x0d; // /r
    this._reader = fs.createReadStream(this.path);
    this.on('newListener', (type, listener) => {
      if (type == 'newLine') {
        const buffers = [];
        this._reader.on('readable', () => {
          let betys;
          while (null != (betys = this._reader.read(1))) {
            let ch = betys[0];
            switch (ch) {
              case this.NEW_LINE:
                this.emit('newLine', Buffer.from(buffers).toString());
                buffers.length = 0;
                break;
              case this.RETURN:
                this.emit('newLine', Buffer.from(buffers).toString());
                const nextBetys = this._reader.read(1);
                buffers.length = 0;
                if (nextBetys[0] != this.NEW_LINE) {
                  buffers.push(nextBetys[0]);
                }
                break;
              default:
                buffers.push(ch);
                break;
            }
          }
          this._reader.on('end', () => {
            this.emit('newLine', Buffer.from(buffers).toString());
            this.emit('end');
          })
        })
      }
    })
  }
}

const line = new lineReader(dir);
line.on('newLine', data => {
  console.log(data)
})
line.on('end', () => {
  console.log('读取完成')
})
