const crypto = require('crypto');

// console.log(crypto.getHashes()) // 获取所有的加密方法
const md5 = crypto.createHash('md5');
md5.update('heoo'); // 指定加密的值

const sha1 = crypto.createHash('sha1');
sha1.update('he;;o');

const hmac = crypto.createHmac('sha1', 'sdf');
hmac.update('1234');
// hmac.digest('hex');

const str = 'xiaoyu';
const cipher = crypto.createCipher('blowfish', 'zheshimiyao');
cipher.update(str, 'utf8');
const result = cipher.final('hex');

const decipher = crypto.createDecipher('blowfish', 'zheshimiyao')
decipher.update(result, 'hex');
const r = decipher.final('utf8');
console.log(r)
console.log(hmac.digest('hex')) // 输出16进制的格式的值 hex