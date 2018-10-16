/** 
 * process.chdir('..') 改变当前的工作目录 // /Users/liuchunyu/Desktop/project
 * process.cwd() 当前工作目录 // /Users/liuchunyu/Desktop/project/note
 * process.memoryUsage() => {
 *  rss: 21245952, 常驻内存
    heapTotal: 7159808, 堆内存的总申请量
    heapUsed: 4415440, 堆内存以使用的量
    external: 8224  外部内存使用量
 * }
*/

console.log(process.memoryUsage())