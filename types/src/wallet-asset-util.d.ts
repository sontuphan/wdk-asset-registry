/**
 * Fetch tokens by symbol.
 *
 * @param {string} symbol - The token symbol (e.g. "USDT", "ETH").
 * @param {number} [chainId] - Optional chain ID to filter tokens.
 * @returns {Promise<WdkAssetList | undefined>} A list of matching tokens or undefined if not found.
 */
export function getTokenBySymbol(symbol: string, chainId?: number): Promise<WdkAssetList | undefined>;
/**
 * Alias of {@link getTokenBySymbol}.
 *
 * @param {string} ticker - The token symbol (e.g. "USDT", "ETH").
 * @param {number} [chainId] - Optional chain ID to filter tokens.
 * @returns {Promise<WdkAssetList | undefined>} A list of matching tokens or undefined if not found.
 */
export function getTokenByTicker(ticker: string, chainId?: number): Promise<WdkAssetList | undefined>;
/**
 * Fetch tokens by contract address.
 *
 * @param {string} address - The token address.
 * @param {number} [chainId] - Optional chain ID to filter tokens.
 * @returns {Promise<WdkAssetList | undefined>} A list of matching tokens or undefined if not found.
 */
export function getTokenByAddress(address: string, chainId?: number): Promise<WdkAssetList | undefined>;
export type WdkAssetList = import("./wallet-asset.js").WdkAssetList;
