const fs = require('fs');
const path = require('path');
/*
 * fs核心模块来读写文件
 * r: 表示读
 * w: 表示清空并写入
 * a: 表示追加
 * 
 * linux权限项
 * r: 4 // 可读
 * w: 2 // 可写
 * x: 1 // 可执行
 * 0o666（表示文件所有者可读可写， 文件所属组可读可写， 其他用户可读可写）
 */



// // flag表明 你想对文件进行何种操作
// fs.readFile(`${__dirname}/1.txt`, { encoding: 'utf8', flag: 'r' }, (err, data) => {
//   if (err) {
//     console.error(err);
//   } else {
//     // console.log(data)
//   }
// })



// fs.writeFile(`${__dirname}/2.txt`, 'writeFile', { encoding: 'utf8', flag: 'w' }, err => {
//   if (err) return console.error(err);
// });


// fs.writeFile(`${__dirname}/2.txt`, 'writeFile', { encoding: 'utf8', flag: 'a', mode: 0o666 }, err => {
//   if (err) return console.error(err);
// });

// 追加
// fs.appendFile(`${__dirname}/2.txt`, 'appendFole', err => {
//   if (err) return console.error(err);
// })

// 上面这些方法， 他们把文件作为一个整体来操作
// 当文件过大，大于内存是无法执行这样的操作的
// 我们需要精确控制读取文件的字节

/**
 * @param fd （file, descriptor）
 * 0: 标准输入
 * 1: 标准输出
 * 2: 错误输出
 * 
 * console.log 对应 process.stdout.wirte()
 * console.error 对应 process.stderr.write()
 * @param read 参数
 * fd文件描述符
 * buffer 读取定buffer
 * offset 读取时候进入buffer偏移量
 * length 读取长度
 * position 读取文件中偏移量(不传表示当前位置 上一次读第3个 下一次读第4个)
 * callback
 * bytesRead 读到的字节数
 */
// 文件不管读写 都需要打开文件
// fs.open(`${__dirname}/1.txt`, 'r', 0o666, (err, fd) => {
//   if (err) return console.error(err);
//   let buffer = Buffer.alloc(4);
//   fs.read(fd, buffer, 1, 3, 1, (err, bytesRead) => {
//     console.log(buffer.toString())
//   })
// })

// fs.open(`${__dirname}/2.txt`, 'r+', 0o666, (err, fd) => {
//   if (err) return console.error(err);
//   fs.write(fd, Buffer.from('小雨'), 3, 3, 0, (err, bytes) => {
//     console.log(bytes)
//   })
// })

// process.stdin.on('data', data => {
//   console.log(data.toString())
// })

// const BUFFER_SIZE = 3;
// const copy = (src, target) => {
//   fs.open(`${__dirname}/${src}`, 'r', 0o666, (err, readFd) => {
//     if (err) console.error(err);
//     fs.open(`${__dirname}/${target}`, 'w', 0o666, (err, writFd) => {
//       const buf = Buffer.alloc(BUFFER_SIZE);
//       !function next() {
//         fs.read(readFd, buf, 0, BUFFER_SIZE, null, (err, bytesRead) => {
//           if (err) {
//             console.log(err);
//           } else if (bytesRead > 0) {
//             fs.write(writFd, buf, 0, bytesRead, null, next);
//           } else {
//             // 强行吧 缓存区的数据写入文件， 并且关闭
//             fs.fsync(readFd, err => {
//               fs.close(readFd, () => {
//                 console.log('文件关闭');
//               })
//             })
//           }
//         })
//       }()

//     })
//   })
// }
// copy('1.txt', '2.txt');

// 异步创建一个文件目录
// const mkdirp = (path) => {
//   const paths = path.split('/');
//   !function next(index) {
//     if (index > paths.length) return;
//     const current = paths.slice(0, index).join('/');
//     // 判断文件是否有可读权限
//     fs.access(`${__dirname}/${current}`, fs.constants.R_OK, err => {
//       if (err) {
//         fs.mkdir(`${__dirname}/${current}`, 0o777, next.bind(null, ++index));
//       } else {
//         next(++index);
//       }
//     })
//   }(1)
// }
// mkdirp('a/b/c');

// 递归异步删除一个非空目录
/**
 * @param 获取文件下的所有目录或者文件
 * readdir
 * 
 * @param 删除一个文件
 * unlink
 * 
 * @param 删除一个空目录
 * rmdir
 */

// const rmmkdirP = dir => {
//   return new Promise((resolve, reject) => {
//     fs.readdir(dir, (err, files) => {
//       fs.stat(dir, (err, stat) => {
//         if (stat.isDirectory()) {
//           Promise.all(files.map(item => rmmkdirP(path.join(dir, item)))).then(() => fs.rmdir(dir, resolve));
//         } else {
//           fs.unlink(dir, resolve);
//         }
//       })
//     })
//   })
// }
// rmmkdirP(`${__dirname}/a`)
