const fs = require('fs');
// console.log(fs.Stats)
const net = require('net');
// pipe方法默认情况 是 可读流数据读完后 会关闭可写流
// pipe(ws, {end: false}) 就可以l了

// 创建一个服务器，监听客户端连接，当客户端连接上来执行监听函数
// socket是双工流 可读可写v代表跟客户端等连接
// crerateServer 回调函数可以不传
// 其实客户端连接接入会触发 
// server.on('connection', socket => {}); 和下面一样
const server = net.createServer({}, socket => {
  // 客户端连接等总数量最多为2个
  // server.maxConnections = 2;
  // 获取有多少客户端正在链接服务器
  server.getConnections((err, count) => {
    console.log(count)
  })
  socket.setTimeout(1000); // 设置客户端的超市时间
  socket.on('timeout', () => {}); // 用户超市触发函数
  console.log('链接成功')
  socket.setEncoding('utf8');
  console.log(server.address())
  socket.on('data', data => {
    console.log(data)
  });
  // 客户端向服务器发送关闭请求时，会出发end事件
  // 在这个地方客户端并没有真正对关闭，只是开始关闭，当真正关闭对时候还会触发一个close事件
  socket.on('end', () => {
    console.log('客户端开始关闭')
  });
  socket.on('close', haserr => {
    // haserr客户端超时关闭
    console.log('客户端关闭')
  })
  setTimeout(() => {
    // 服务器端等close方法，执行服务器就不在接受新的客户端连接，但是也不会断开现有等连接
    // 所有客户端都断开连接，则关闭服务器 跟server.unref差不多
    server.close();
  }, 5000)
  socket.on('close', () => {
    console.log('客户端关闭')
  })
});

server.listen(8080, () => {
  console.log(server.address());
  console.log('服务器链接成功')
})

/**
 * @param 客户端socket
 */
const net = require('net');

const socket = new net.Socket();

socket.conncet(8080, 'localhost', () => {
  socket.write('hello');
})
socket.setEncoding('utf8');
socket.on('data', data => {
  console.log(data)
})
setTimeout(() => {
  socket.end();
})

