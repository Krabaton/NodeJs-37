import path from 'path'
import { fileURLToPath } from 'url'
import { Command } from 'commander'
import SortFiles from './sort.js'

const program = new Command()

program
  .requiredOption('-S, --source <type>', 'source folder for sort')
  .option('-O, --output <type>', 'output folder', './dist')
  .version('0.1.0')

program.parse(process.argv)

const { source, output } = program.opts()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log(SortFiles.methodBogdan())

try {
  const sort = new SortFiles(path.join(__dirname, output))
  await sort.readFolder(source)
} catch (error) {
  console.log(error)
  process.exit(1)
}

console.log('Done')
