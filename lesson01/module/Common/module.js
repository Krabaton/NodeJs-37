const log = (msg) => {
  console.log(`Log CommonJS: ${msg}`)
}

const info = (msg) => {
  console.log(`Info: ${msg} - ${abc}`)
}

class Test {}

// exports

module.exports = { log, info } // Test
