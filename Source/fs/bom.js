const fs = require('fs');

fs.readFile(`${__dirname}/1.txt`, (err, data) => {
  console.log(data.toString())
})