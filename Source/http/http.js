/**
 * req和res都是从socket来带，先监听socket大data事件，然后等事件发生的时候，解析出请求头对象，在创建请求对象，再根据请求对象创建响应对象
 */

 const http = require('http');
 const path = require('path');
 const fs = require('fs');

const rs = fs.createReadStream(path.join(__dirname, '1.txt'), {
  highWaterMark: 3
});
rs.on('readable', () => {
  const data = rs.read();
  console.log(data)
})

 const server = http.createServer();

 server.on('connection', socket => {
    socket.on('data', data => {
      console.log(data.toString())
    })
 });

 server.on('request', (req, res) => {
   const result = [];
   req.on('data', data => {
     result.push(data);
   })
   req.on('end', () => {
     let str = Buffer.concat(result).toString();
     let contentType = req.headers['content-type'];
     let body;
     if (contentType == 'application/x-form-utlencoded') {
       body = querystring.parse(str);
     } else if (contentType == 'application/json') {
       body = JSON.parse(str);
     } else {
      //  fs.cr
     }
   })
   res.end('hello')
 });
 
//  server.listen(8080, () => {
//    console.log('服务器创建成功');
//  })

/**
 * http写客户端
 */

 const options = {
   host: 'localhost',
   port: 8080,
   method: 'POST',
   headers: {
     "Content-Tyoe": 'application/x-form-urlencoded'
   }
 }

 // 请求并没有真正发出，req也是一个流对象，他是一个可写流
 const req = http.request(options);

 // 服务端把请求体发过来点时候，或者说客户端接收到服务端响应的时候触发。
 req.on('response', (res) => {
  res.statusCode;
  res.headers;
  let result = [];
  res.on('data', data => {
    result.push(data);
  })
  res.on('end', () => {
    console.log(Buffer.concat(result));
  })
 })

 // write向请求体里面写数据
 req.write('name=xiaoyu')

 // 是结束写入请求体，只有在调用end的时候才会真正的向服务器发请求
 req.end();