import fs from 'fs/promises'
import path from 'path'

class SortFiles {
  #dist

  constructor(dist) {
    this.#dist = dist
  }

  async #copyFile(file) {
    const nameTargetFolder = path.extname(file.name) // .png .svg
    const targetDir = path.join(this.#dist, nameTargetFolder)
    await fs.mkdir(targetDir, { recursive: true })
    await fs.copyFile(file.path, path.join(targetDir, file.name))
  }

  async readFolder(base) {
    const items = await fs.readdir(base)

    for (const item of items) {
      const localBase = path.join(base, item)
      const state = await fs.stat(localBase)
      if (state.isFile()) {
        await this.#copyFile({ name: item, path: localBase })
      } else {
        await this.readFolder(localBase)
      }
    }
  }
}

export default SortFiles
