import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'fs'

const INPUT = 'assets'
const OUTPUT = 'dist'

// Clean the cache
rmSync(OUTPUT, { recursive: true, force: true })
mkdirSync(OUTPUT, { recursive: true })

// Load data
const assets = []
const files = readdirSync(INPUT)

for (const file of files) {
  const source = `${INPUT}/${file}`
  const raw = readFileSync(source, 'utf-8')
  const data = JSON.parse(raw)
  for (const asset of data) {
    assets.push({ id: `${asset.chainId}/${asset.address}`, ...asset })
  }
}

// Build the full list
writeFileSync(`${OUTPUT}/common-tokens.json`, JSON.stringify(assets, null, 2))
