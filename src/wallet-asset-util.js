/**
 * @typedef {import('./wallet-asset.js').WdkAsset} WdkAsset
 */

/**
 * @typedef {object} WdkAssetPagination
 * @property {number} page - The current page number (starting from 1).
 * @property {number} limit - The maximum number of tokens per page.
 * @property {number} total - The total number of tokens available.
 */

/**
 * Fetch tokens by symbol.
 *
 * @param {string} symbol - The token symbol (e.g. "USDT", "ETH").
 * @param {number} [chainId] - Optional chain ID to filter tokens.
 * @returns {Promise<WdkAsset | undefined>} A list of matching tokens or undefined if not found.
 */
export async function getTokenBySymbol (symbol, chainId) {
  try {
    const normalizedSymbol = symbol.toLowerCase()

    const res = await fetch(`https://raw.githubusercontent.com/sontuphan/wdk-asset-registry/refs/heads/main/assets/${normalizedSymbol}.json`)

    if (!res.ok) {
      return undefined
    }

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
 * @returns {Promise<WdkAsset | undefined>} A list of matching tokens or undefined if not found.
 */
export async function getTokenByTicker (ticker, chainId) {
  return await getTokenBySymbol(ticker, chainId)
}

/**
 * Fetch tokens by contract address.
 *
 * @param {string} address - The token address.
 * @param {number} [chainId] - Optional chain ID to filter tokens.
 * @returns {Promise<WdkAsset | undefined>} A list of matching tokens or undefined if not found.
 */
export async function getTokenByAddress (address, chainId) {

}

/**
 * Fetches all tokens with pagination.
 *
 * @param {number} page - The page number to fetch (starting from 1).
 * @returns {{ result: WdkAsset[], pagination: WdkAssetPagination }} An object containing the list of tokens for the page and pagination info.
 */
export async function getAllTokens (page) {

}
