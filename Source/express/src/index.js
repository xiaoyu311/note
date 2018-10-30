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
        } else {
          if ((route.method == req.method.toLowerCase() || route.method == 'all') && (route.path == pathname || route.path == '*')) {
            return route.handler(req, res);
          } else {
            next();
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
      app.routes.push({
        method,
        path,
        handler
      });
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
  return app;
}

module.exports = createApplication;