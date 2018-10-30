const http = require('http');
let url = require('url');

// http服务器 继承自 tcp服务器的，http是应用层协议，是基于TCP的
// 对请求和响应进行了包装

// req 是可读流
// res 是可写流
const server = http.createServer();

// 当客户端连接上服务器之后执行回掉函数
server.on('connection', socket => {
  console.log('客户端连接');
  socket.on('end', () => {
    console.log('客户端断开')
  });
  socket.on('close', () => {
    console.log('客户端关闭')
  })
})

// 服务器监听客户端请求，当请求过来的时候 执行回掉函数
// 请求数据解析完后 会发射request方法
server.on('request', (req, res) => {
  // console.log(req.method)
  console.log(req.url)
  /**
   * @param url.parse
   * 第一个参数设为true  url对象的query就变为对象了
   */
  const urlObj = url.parse(req.url, true);
  console.log(urlObj)
  url.format(urlObj); // 还原url
  // console.log(req.protocal)
  // console.log(req.headers)
  const result = [];
  req.on('data', data => {
    result.push(data);
  })
  req.on('end', () => {
    // writeHead 或者 write 方法调用，会立刻向客户端发送
    res.writeHead(200, '成功啦', {
      "Content-Type": "text/html;charse=utf8"
    })
    res.statusCode = 200; // 设置响应吗
    res.sendDate = false; // Date响应头默认设置，如果不想要，可以设置为false
    res.setHeader('Content-Type', 'text/html;charse=utf8'); // 设置响应头
    // console.log()
    const r = Buffer.concat(result);
    res.write('hello');
    res.end()
  })
})

server.on('end', () => {
  console.log('end')
})

server.on('close', () => {
  console.log('close')
})

server.on('error', () => {

})
server.listen(8080, () => {
  console.log(`server started at http://localhost: 8080`)
})

