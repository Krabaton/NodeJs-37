const fs = require('fs')

console.log('Start')

setTimeout(() => {
  console.log('setTimeout happened')
}, 0)

setImmediate(() => {
  console.log('setImmediate happened')
})

new Promise((resolve) => {
  resolve('Promise happened')
  process.nextTick(() => {
    console.log('process.nextTick in Promise')
  })
}).then(console.log)

process.nextTick(() => {
  console.log('process.nextTick happened')
})

queueMicrotask(() => {
  console.log('queueMicrotask happened')
})

fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log('setTimeout inner cb')
  }, 0)

  setImmediate(() => {
    console.log('setImmediate inner cb')
  })
})

console.log('End')
