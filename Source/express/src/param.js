const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
  console.log(req.query)
  console.log(req.path)
  console.log(req.hostname)
  res.end('hello')
})
app.listen(8080)