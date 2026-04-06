/**
 * @typedef {import('./wallet-asset.js').WdkAsset} WdkAsset
 */
/**
 * todo
 * @param {string} ticker - todo
 * @param {number} [chainId] - todo
 * @returns { Promise<WdkAsset | undefined> } - todo
 */
export function getTokenByTicker(ticker: string, chainId?: number): Promise<WdkAsset | undefined>;
/**
 * Alias of {@link getTokenByTicker}.
 *
 * @param {string} symbol -
 * @param {number} [chainId] -
 * @returns
 */
export function getTokenBySymbol(symbol: string, chainId?: number): Promise<{
    address: string;
    symbol: string;
    name: string;
    decimals: number;
    chainId: number;
    logoURI: string;
    tags?: (string | {
        name: string;
        description: string;
    })[] | undefined;
    extensions?: Record<string, unknown> | undefined;
}[] | undefined>;
export type WdkAsset = import("./wallet-asset.js").WdkAsset;
