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
preDeep(path.resolve(__dirname, 'a'), () => {
  console.log('wanchng')
});