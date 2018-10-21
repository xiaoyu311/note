let buf1 = Buffer.alloc(6, 2); // <Buffer 02 02 02 02 02 02> 把内存清空 申请内存
let buf2 = Buffer.allocUnsafe(6); // <Buffer 11 4f 10 f3 56 2e> 申请内存 找一块内存
let buf3 = Buffer.from('xiaoyu'); // <Buffer 78 69 61 6f 79 75> 把字符串转化为 Buffer 

// 

/** 
 * @param 
 * 1、value（填充的值）
 * 2、start（number类型） 开始索引
 * 3、end（number类型） 结束索引
 */
let buf4 = Buffer.alloc(6);
buf4.fill(3, 1, 3); // <Buffer 00 03 03 00 00 00>

/**
 * @param 
 * 1、写入的值
 * 2、写入的开始索引
 * 3、写入的字节长度
 * 4、编码格式
 */
let buf5 = Buffer.alloc(6);
buf5.write('小雨', 0, 3, 'utf8'); // <Buffer e5 b0 8f 00 00 00>
buf5.toString(); // 小

/**
 * @param 
 * 浅拷贝截取
 */
let buf6 = Buffer.alloc(8);
let buf7 = buf6.slice(2,6);
buf7.fill(4); // <Buffer 04 04 04 04>
buf6 // <Buffer 00 00 04 04 04 04 00 00>

/**
 * string_decoder
 *  为了解决乱码问题
 */
let buf8 = Buffer.from('珠峰培训');
let buf9 = buf8.slice(0, 5); // 珠�
let buf10 = buf8.slice(5); // �培训
let { StringDecoder } = require('string_decoder');
const sd = new StringDecoder();
// write读取buffer内容，返回一个字符串
sd.write(buf9); // 珠
sd.write(buf10); // 峰培训

/**
 * concat
 * Buffer类上的函数
 */ 

let buf11 = Buffer.from('珠');
let buf12 = Buffer.from('峰');

Buffer.concat([buf11, buf12], 7); // <Buffer e7 8f a0 e5 b3 b0 00>