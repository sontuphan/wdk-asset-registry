import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'fs'

/** @typedef {import('../types').WdkAssetList} WdkAssetList */

function loadOrCreateJSON (path, defaultObj = []) {
  try {
    const data = readFileSync(path, 'utf-8')
    return JSON.parse(data)
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err
    }

    writeFileSync(path, JSON.stringify(defaultObj, null, 2))
    return defaultObj
  }
}

const INPUT = 'assets'
const OUTPUT = 'cache'

// Clean the cache
rmSync(OUTPUT, { recursive: true, force: true })
mkdirSync(OUTPUT, { recursive: true })

const files = readdirSync(INPUT)

for (const file of files) {
  const source = `${INPUT}/${file}`

  const raw = readFileSync(source, 'utf-8')

  /** @type {WdkAssetList} */
  const input = JSON.parse(raw)

  for (const { address, symbol } of input) {
    const normalizedSymbol = symbol.toLowerCase()
    const normalizedAddress = address.toLowerCase()

    const destination = `${OUTPUT}/${normalizedAddress}.json`

    /** @type {string[]} */
    const output = loadOrCreateJSON(destination)

    if (!output.includes(normalizedSymbol)) {
      output.push(normalizedSymbol)
    }

    writeFileSync(destination, JSON.stringify(output, null, 2))
  }
}
