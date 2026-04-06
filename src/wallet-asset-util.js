/**
 * @typedef {import('./wallet-asset.js').WdkAsset} WdkAsset
 */

/**
 * todo
 * @param {string} ticker - todo
 * @param {number} [chainId] - todo
 * @returns { Promise<WdkAsset | undefined> } - todo
 */
export async function getTokenByTicker (ticker, chainId) {
  try {
    const res = await fetch(`https://raw.githubusercontent.com/sontuphan/wdk-asset-registry/refs/heads/main/assets/${ticker}.json`)

    if (!res.ok) {
      return undefined
    }

    const data = await res.json()

    return data
  } catch {
    return undefined
  }
}

/**
 * Alias of {@link getTokenByTicker}.
 *
 * @param {string} symbol -
 * @param {number} [chainId] -
 * @returns
 */
export async function getTokenBySymbol (symbol, chainId) {
  return await getTokenByTicker(symbol, chainId)
}
