/**
 * @typedef {import('./wallet-asset.js').WdkAssetList} WdkAssetList
 */

const REPO = 'https://raw.githubusercontent.com/sontuphan/wdk-asset-registry'

/**
 * Fetch all tokens.
 *
 * @returns {Promise<WdkAssetList | undefined>} A list of all tokens or undefined if not found.
 */
export async function getAllTokens () {
  try {
    const res = await fetch(`${REPO}/refs/heads/public/cache/all.json`)

    if (!res.ok) {
      return undefined
    }

    /** @type {WdkAssetList} */
    const data = await res.json()

    return data || undefined
  } catch {
    return undefined
  }
}

/**
 * Fetch tokens by symbol.
 *
 * @param {string} symbol - The token symbol (e.g. "USDT", "ETH").
 * @param {number} [chainId] - Optional chain ID to filter tokens.
 * @returns {Promise<WdkAssetList | undefined>} A list of matching tokens or undefined if not found.
 */
export async function getTokenBySymbol (symbol, chainId) {
  try {
    const normalizedSymbol = symbol.toLowerCase()

    const res = await fetch(`${REPO}/refs/heads/public/assets/${normalizedSymbol}.json`)

    if (!res.ok) {
      return undefined
    }

    /** @type {WdkAssetList} */
    const data = await res.json()

    if (!data) {
      return undefined
    }

    return !chainId
      ? data
      : data.filter(token => token.chainId === chainId)
  } catch {
    return undefined
  }
}

/**
 * Alias of {@link getTokenBySymbol}.
 *
 * @param {string} ticker - The token symbol (e.g. "USDT", "ETH").
 * @param {number} [chainId] - Optional chain ID to filter tokens.
 * @returns {Promise<WdkAssetList | undefined>} A list of matching tokens or undefined if not found.
 */
export async function getTokenByTicker (ticker, chainId) {
  return await getTokenBySymbol(ticker, chainId)
}

/**
 * Fetch tokens by contract address.
 *
 * @param {string} address - The token address.
 * @param {number} [chainId] - Optional chain ID to filter tokens.
 * @returns {Promise<WdkAssetList | undefined>} A list of matching tokens or undefined if not found.
 */
export async function getTokenByAddress (address, chainId) {
  try {
    const normalizedAddress = address.toLowerCase()

    const res = await fetch(`${REPO}/refs/heads/public/cache/${normalizedAddress}.json`)

    if (!res.ok) {
      return undefined
    }

    /** @type {WdkAssetList[]} */
    const data = await res.json()

    return !chainId
      ? data
      : data.filter(token => token.chainId === chainId)
  } catch {
    return undefined
  }
}
