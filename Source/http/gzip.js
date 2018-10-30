const fs = require('fs');
const zlib = require('zlib');
const path = require('path');
const http = require('http');
const { parse } = require('url');
const { promisify } = require('util');
const mime = require('mime');
const stat = promisify(fs.stat);

// 压缩 解压流都是transform流
// 用于实现压缩
const gzip = src => {
  fs.createReadStream(path.join(__dirname, src))
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream(path.join(__dirname, src) + '.gz'));
}
// gzip('./1.txt');

// 解压
const gunzip = src => {
  fs.createReadStream(path.join(__dirname, src))
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream(path.join(__dirname, src) + '.txt'));
}
// gunzip('1.txt.gz')

const server = http.createServer( async (req, res) => {
  const { pathname } = parse(req.url);
  const filepath = path.join(__dirname, pathname);
  console.log(filepath)
  try {
    // const statObj = await stat(filepath);
    console.log(mime.getType(filepath))
    // 可以根据不同对文件内容类型返回不同对Content-Type
    res.setHeader('Content-Type', mime.getType(filepath));
    // 为了兼容不同的浏览器，node把所有请求头全部转换为小写
    const acceptEncoding = req.headers['accept-encoding'];
    // 内容协商
    if (acceptEncoding) {
      if (acceptEncoding.match(/\bgzip\b/)) {
        res.setHeader('Content-Encoding', 'gzip');
        fs.createReadStream(filepath).pipe(zlib.createGzip()).pipe(res);
      } else if (acceptEncoding.match(/\bdeflate\b/)) {
        res.setHeader('Content-Encoding', 'deflate');
        fs.createReadStream(filepath).pipe(zlib.createDeflate()).pipe(res);
      }
    } else {
      fs.createReadStream(filepath).pipe(res);
    }
  } catch (error) {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(8080, () => {
  console.log('服务器启动在： 8080 端口');
})