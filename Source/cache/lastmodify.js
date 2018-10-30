const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const mime = require('mime');

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);
  const filepath = path.join(__dirname, pathname);
  fs.stat(filepath, (err, stat) => {
    if (err) {
      return sendError(req, res);
    } else {
      // console.log(stat)
      const ifModifySince = req.headers['if-modified-since'];
      if (ifModifySince == stat.ctime.toGMTString()) {
        res.statusCode = 304;
        res.end('');
      } else {
        res.setHeader('Content-Type', mime.getType(filepath));
        res.setHeader('Last-Modified', stat.ctime.toGMTString());
        fs.createReadStream(filepath).pipe(res);
      }
    }
  })
});

function sendError(req, res) {
  res.statusCode = 500;
  res.end('not found')
}

server.listen(8080, () => {
  console.log('服务器启动')
})