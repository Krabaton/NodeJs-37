const fs = require('fs/promises')

const filename = './main.js'

const copyFile = async (filename) => {
  const file = await fs.readFile(filename, 'utf8')
  await fs.mkdir('./temp', { recursive: true })
  await fs.writeFile('./temp/temp.js', `${file}console.log('Hello')`)
}

copyFile(filename).then(async () => {
  // await fs.unlink('./temp/temp.js')
  // await fs.rmdir('./temp')
})
