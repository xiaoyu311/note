const http = require('http');
const url = require('url');

const createApplication = () => {
  // app 其实就是真正的 请求监听函数
  const app = (req, res) => {
    const { pathname } = url.parse(req.url, true);
    let index = 0;
    const next = err => {
      if (index > app.routes.length) return res.end(`Cannot ${req.method} ${pathname}`);
      const route = app.routes[index++];
      if (err) {
        if (route.method == 'middle') {
          if (route.path == '/' || pathname.startsWith(route.path + '/') || pathname.startsWith(route.path)) {
            if (route.handler.length == 4) {
              route.handler(err, req, res, next);
            } else {
              next(err);
            }
          } else {
            next(err);
          }
        } else {
          next(err);
        }
      } else {
        if (route.method == 'middle') {
          if (route.path == '/' || pathname.startsWith(route.path + '/') || pathname.startsWith(route.path)) {
            route.handler(req, res, next);
          } else {
            next();
          }
        } else { // 路由
          if (route.paramsNames) { // 有路径参数
            const matchers = pathname.match(route.path);
            if (matchers) {
              const params = {};
              for (let i = 0; i < route.paramsNames.length; i++) {
                params[route.paramsNames[i]] = matchers[i + 1];
              }
              req.params = params;
              route.handler(req, res);
            } else {
              next();
            }
          } else {
            if ((route.method == req.method.toLowerCase() || route.method == 'all') && (route.path == pathname || route.path == '*')) {
              return route.handler(req, res);
            } else {
              next();
            }
          }
        }
      }
    }
    next();
  }

  app.listen = (...rest) => {
    const server = http.createServer(app);
    server.listen(...rest);
  }

  // 此数组用来保存路由规则
  app.routes = [];
  const methods = [...http.METHODS, 'all'];
  methods.forEach(method => {
    method = method.toLowerCase();
    app[method] = (path, handler) => {
      // 一层
      const layer = { method, path, handler };
      if (path.includes(':')) {
        let paramsNames = [];
        // 1.replace 把原来点路径专成正则表达式
        // 2.提取变量名
        path = path.replace(/:([^\/]+)/g, (...rest) => {
          paramsNames.push(rest[1]);
          return '([^\/]+)';
        });
        // path = /user/([^/]+)/([^/]+)
        layer.path = new RegExp(path); // 路径变成正则表达式
        layer.paramsNames = paramsNames; // 变量名数组
        // console.log(layer.path)
      }
      // 普通layer有3个属性， 包含：的有四个属性
      app.routes.push(layer);
    }
  });

  app.use = (path, handler) => {
    if (typeof handler != 'function') {
      handler = path;
      path = '/';
    }
    app.routes.push({
      method: 'middle',
      path,
      handler,
    });
  }

  // 系统内置中间件
  app.use((req, res, next) => {
    const urlObj = url.parse(req.url, true);
    req.query = urlObj.query;
    req.path = urlObj.path;
    req.hostname = req.headers['host'].split(':')[0];
    next();
  })
  return app;
}

module.exports = createApplication;