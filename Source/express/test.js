// const express = require('express');
const express = require('./src');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/html;charse=utf8');
  // console.log(req.query)
  // console.log(11)
  next();
})
app.use('/hello', (req, res, next ) => {
  // console.log(22)
  next()
})
app.get('/hello/:name/:age', (req, res) => {
  console.log(req.params)
  res.end('hello')
})

app.use((err, req, res, next) => {
  console.log(err)
  res.end(err);
})

app.listen(8080, () => {
  console.log('服务器启动');
})