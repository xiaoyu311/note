// const MyPromise = require('./promise');

// let test = () => {
//   console.log('test')
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('first')
//     })
//   })
// }

// test().then(res => {
//   console.log(res, 'test first then')
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('second')
//     })
//   })
// }).then(res => {
//   console.log(res, 'test second then')
// })

const {EventEmitter} = require('events');
const event = new EventEmitter()
console.log(event)

event.on('test', () => {
  console.log(this)
});
event.emit('test', 'ds')
