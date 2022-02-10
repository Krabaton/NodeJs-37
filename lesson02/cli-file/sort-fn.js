import fs from 'fs/promises'
import path from 'path'

const copyFile = async (file, dist) => {
  const nameTargetFolder = path.extname(file.name) // .png .svg
  const targetDir = path.join(dist, nameTargetFolder)
  await fs.mkdir(targetDir, { recursive: true })
  await fs.copyFile(file.path, path.join(targetDir, file.name))
}

const readFolder = async (base, dist) => {
  const items = await fs.readdir(base)

  for (const item of items) {
    const localBase = path.join(base, item)
    const state = await fs.stat(localBase)
    if (state.isFile()) {
      await copyFile({ name: item, path: localBase }, dist)
    } else {
      await readFolder(localBase, dist)
    }
  }
}

export default readFolder
