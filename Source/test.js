const MyPromise = require('./promise');

let p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('11')
  }, 1000)
})
let p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('22')
  }, 2000)
})

console.time('test')
MyPromise.all([p, p1]).then(res => {
  console.log(res)
  console.timeEnd('test')
})