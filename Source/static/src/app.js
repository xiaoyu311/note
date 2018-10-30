const debug = require('debug')('static:app');
const url = require('url');
const chalk = require('chalk');
const path = require('path');
const http = require('http');
const mime = require('mime');
const fs = require('fs');
const handlebars = require('handlebars');
const { promisify, inspect } = require('util');

const config = require('./config');
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const list = () => {
  const tmpl = fs.readFileSync(path.resolve(__dirname, 'template', 'list.html'), 'utf8');
  return handlebars.compile(tmpl);
}

class Server {
  constructor(argv) {
    this.list = list();
    this.config = Object.assign({}, this.config, argv);
  }

  start() {
    const server = http.createServer();
    server.on('request', this.request.bind(this));
    server.listen(this.config.port, () => {
      const url = `服务器启动在http://${this.config.host}:${chalk(this.config.port)}`;
      console.log(url)
      debug(url)
    })
  }
  async request(req, res) {
    const { pathname } = url.parse(req.url, true);
    if (req.url === '/favicon') return this.sendError(req, res);
    const filepath = path.join(this.config.root, pathname);
    try {
      const statObj = await stat(filepath);
      if (statObj.isDirectory()) {
        let files = await readdir(filepath);
        console.log(files)
        files = files.map(file => ({
          name: file,
          url: path.resolve(pathname, file)
        }))
        // console.log(files)
        const html = this.list({title: pathname, files});
        res.setHeader('Content-Type', 'text/html');
        res.end(html);
      } else {
        this.sendFile(req, res, filepath, statObj);
      }
    } catch (error) {
      debug(inspect(error));
      this.sendError(req, res);
    }
  }

  sendError(req, res) {
    res.statusCode = 500;
    res.end('服务端错误');
  }

  sendFile(req, res, filepath, statObj) {
    res.setHeader('Content-Type', mime.getType(filepath));
    fs.createReadStream(filepath).pipe(res);
  }
}
// console.log(process.env)


module.exports = Server;