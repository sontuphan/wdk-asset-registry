import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'fs'

const INPUT = 'assets'
const OUTPUT = 'dist'

// Clean the cache
rmSync(OUTPUT, { recursive: true, force: true })
mkdirSync(OUTPUT, { recursive: true })

const assets = []
const files = readdirSync(INPUT).filter(file => file.endsWith('.json'))

for (const file of files) {
  const source = `${INPUT}/${file}`
  const raw = readFileSync(source, 'utf-8')
  const data = JSON.parse(raw)
  for (const [symbol, token] of Object.entries(data)) {
    for (const [chainId, address] of Object.entries(token.address)) {
      assets.push({
        id: `${chainId}/${address}`,
        address,
        symbol,
        name: token.name,
        decimals: token.decimals,
        chainId,
        isNative: token.isNativeCoin
      })
    }
  }
}

// Build the full list
writeFileSync(`${OUTPUT}/common-tokens.json`, JSON.stringify(assets, null, 2))
