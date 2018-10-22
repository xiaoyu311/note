const fs = require('fs');
const path = require('path');
/**
 * 异步深度优先遍历
 */

const preDeep = (dir, callback) => {
  fs.readdir(dir, (err, files) => {
    console.log(dir)
    !function next(i) {
      if (i >= files.length) return callback();
      fs.stat(path.resolve(dir, files[i]), (err, stat) => {
        if (stat.isDirectory()) {
          preDeep(path.resolve(dir, files[i]), () => next(++i));
        } else {
          console.log(path.resolve(dir, files[i]))
          next(++i);
        }
      })
    }(0);
  })
}
// preDeep(path.resolve(__dirname, 'a'), () => {
//   console.log('wanchng')
// });

// 同步广度优先遍历 (广度优先 一般就会维护一个数组)
const wide = dir => {
  const arr = [dir];
  while (arr.length > 0) {
    const current = arr.shift();
    console.log(current)
    const stat = fs.statSync(current);
    if (stat.isDirectory()) {
      const files = fs.readdirSync(current);
      files.forEach(item => arr.push(path.join(current, item)));
    }
  }
}
wide(path.resolve(__dirname, 'a'));