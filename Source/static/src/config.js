const debug = require('debug')('static:config');
const path = require('path');

const config = {
  host: 'localhost',
  port: 8080,
  root: path.resolve(__dirname, '..', 'public'),
};

debug(config);

module.exports = config;
