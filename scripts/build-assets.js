import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'fs'

/** @typedef {import('../types').WdkAssetList} WdkAssetList */

const INPUT = 'assets'
const OUTPUT = 'dist'

// Clean the cache
rmSync(OUTPUT, { recursive: true, force: true })
mkdirSync(OUTPUT, { recursive: true })

/**
 * Load all predefined assets
 *
 * @returns {WdkAssetList} The list of assets
 */
function loadAllAssets () {
  const files = readdirSync(INPUT)

  let result = []
  for (const file of files) {
    const source = `${INPUT}/${file}`
    const raw = readFileSync(source, 'utf-8')
    const data = JSON.parse(raw)
    result = result.concat(data)
  }

  return result
}

/**
 * Load data
 */
const assets = loadAllAssets()

/**
 * Build the full list
 */
writeFileSync(`${OUTPUT}/common-tokens.json`, JSON.stringify(assets, null, 2))
