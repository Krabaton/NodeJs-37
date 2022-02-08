const { log } = require('./module')

global.abc = 123

log('Hello')

// import('../ES/module.mjs').then((result) => {
//   const { info } = result
//   info('Hi')
// })

// IIFE
;(async () => {
  const result = await import('../ES/module.mjs')
  const { info } = result
  info('Hi')
})()
