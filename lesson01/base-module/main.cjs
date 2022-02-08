const os = require('os')
const path = require('path')

// console.log(os.cpus().length)

// console.log(path.resolve('/foo/bar', './baz'))
// console.log(path.resolve('/foo/bar', '/tmp/file/'))
// console.log(path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif'))

// console.log(path.join('/foo', 'bar', 'baz/asdf', 'quux', '..'))
// console.log(path.join(__dirname, 'foo', 'bar'))
// console.log(path.sep)

process.on('exit', (code) => {
  console.log(`Error: ${code}`)
})

console.log(process.pid)

process.exit(1001)

console.log(__dirname)
console.log(process.cwd())
