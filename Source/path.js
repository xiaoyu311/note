const path = require('path');

// 环境变量路径分隔符 (window操作系统下是; mac linux 下是:)
path.delimiter; 

// 文件路径分隔符(window操作系统下是\ mac linux 下是/)
path.sep;

// 获取两个路径下对相对路径
path.relative;

// 获取对文件名
path.basename;

path.basename('aa.jpg', '.jpg'); // => aa

// 文件扩展名
path.extname;
console.log(path.delimiter)