import { mkdir, readdir, readFile, rm, writeFile } from 'fs/promises'

/** @typedef {import('../types').WdkAssetList} WdkAssetList */

async function loadOrCreateJSON (path, defaultObj = []) {
  try {
    const data = await readFile(path, 'utf-8')
    return JSON.parse(data)
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err
    }

    await writeFile(path, JSON.stringify(defaultObj, null, 2))
    return defaultObj
  }
}

async function main () {
  const OUTPUT = 'cache'
  await rm(OUTPUT, { recursive: true, force: true })
  await mkdir(OUTPUT, { recursive: true })

  const files = await readdir('assets')

  for (const file of files) {
    const from = `assets/${file}`
    const raw = await readFile(from, 'utf-8')

    /** @type {WdkAssetList} */
    const input = JSON.parse(raw)

    for (const { address, symbol } of input) {
      const normalizedSymbol = symbol.toLowerCase()
      const to = `${OUTPUT}/${address}.json`

      /** @type {string[]} */
      const output = await loadOrCreateJSON(to)

      if (!output.includes(normalizedSymbol)) {
        output.push(normalizedSymbol)
      }

      await writeFile(to, JSON.stringify(output, null, 2))
    }
  }
}

// Execute
main()
