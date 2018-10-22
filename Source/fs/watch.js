// 监控监视文件对变化，当文件发生变化的时候执行对应对回掉函数
const fs = require('fs');

fs.watchFile(`${__dirname}/a.txt`, (nextState, prevState) => {
  if (Date.parse(nextState.ctime) !== 0) {
    console.log('新增')
  }
})