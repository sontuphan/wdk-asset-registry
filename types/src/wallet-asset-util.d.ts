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
export function getTokenBySymbol(symbol: string, chainId?: number): Promise<WdkAsset | undefined>;
/**
 * Alias of {@link getTokenBySymbol}.
 *
 * @param {string} ticker - The token symbol (e.g. "USDT", "ETH").
 * @param {number} [chainId] - Optional chain ID to filter tokens.
 * @returns {Promise<WdkAsset | undefined>} A list of matching tokens or undefined if not found.
 */
export function getTokenByTicker(ticker: string, chainId?: number): Promise<WdkAsset | undefined>;
/**
 * Fetch tokens by contract address.
 *
 * @param {string} address - The token address.
 * @param {number} [chainId] - Optional chain ID to filter tokens.
 * @returns {Promise<WdkAsset | undefined>} A list of matching tokens or undefined if not found.
 */
export function getTokenByAddress(address: string, chainId?: number): Promise<WdkAsset | undefined>;
/**
 * Fetches all tokens with pagination.
 *
 * @param {number} page - The page number to fetch (starting from 1).
 * @returns {{ result: WdkAsset[], pagination: WdkAssetPagination }} An object containing the list of tokens for the page and pagination info.
 */
export function getAllTokens(page: number): {
    result: WdkAsset[];
    pagination: WdkAssetPagination;
};
export type WdkAsset = import("./wallet-asset.js").WdkAsset;
export type WdkAssetPagination = {
    /**
     * - The current page number (starting from 1).
     */
    page: number;
    /**
     * - The maximum number of tokens per page.
     */
    limit: number;
    /**
     * - The total number of tokens available.
     */
    total: number;
};
