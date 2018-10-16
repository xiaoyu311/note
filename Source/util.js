const util = require('util');
const obj = {
  deep: {
    deep: {name: 1}
  },

}

console.log(util.inspect(obj, {depth: 1}));
util.isNumber