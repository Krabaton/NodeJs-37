import fs from 'fs'

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
  process.nextTick(() => {
    console.log('process.nextTick in 1')
    process.nextTick(() => {
      console.log('process.nextTick in 2')
      process.nextTick(() => {
        console.log('process.nextTick in 3')
      })
    })
  })
})

queueMicrotask(() => {
  console.log('queueMicrotask happened')
  queueMicrotask(() => {
    console.log('queueMicrotask 1')
    queueMicrotask(() => {
      console.log('queueMicrotask 2')
      queueMicrotask(() => {
        console.log('queueMicrotask 3')
      })
    })
  })
})

fs.readFile('event-loop.mjs', () => {
  setTimeout(() => {
    console.log('setTimeout inner cb')
  }, 0)

  setImmediate(() => {
    console.log('setImmediate inner cb')
  })
})

console.log('End')
