import { readFile, writeFile } from 'fs/promises'

const argv = process.argv

let data = null
try {
  data = await readFile('data.json', 'utf8')
} catch (error) {
  data = '[]'
}
const content = JSON.parse(data)
const command = argv[2]
const age = argv[3]

if (command === '--list') {
  console.table(content)
} else if (!command) {
  // command === void 0
  console.log('Unknown command')
} else {
  content.push({ command, age })
  await writeFile('data.json', JSON.stringify(content, null, 2))
}
