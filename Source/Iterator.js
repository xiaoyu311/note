// Iterator
const makeIterator = [1,2];

const createIterator = arr => {
  let nextIndex = 0;
  return {
    next() {
      return nextIndex >= arr.length ? { value: undefined, done: true } : {value: arr[nextIndex++], done: false}
    }
  }
}

const it = createIterator(makeIterator);
it.next();

let p = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功')
  })
})


