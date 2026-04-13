/** @typedef {import("./wdk-asset-schema.js").TokenAsset} TokenAsset */
/**
 * @extends {WdkBaseAssetRegistry<TokenAsset>}
 */
export class WdkTokenAssetRegistry extends WdkBaseAssetRegistry<{
    address: string;
    chainId: number;
    symbol: string;
    name: string;
    decimals: number;
    isNative: boolean;
    logoURI: string;
    tags?: (string | {
        name: string;
        description: string;
    })[] | undefined;
    extensions?: Record<string, unknown> | undefined;
}> {
    constructor(...assets: {
        address: string;
        chainId: number;
        symbol: string;
        name: string;
        decimals: number;
        isNative: boolean;
        logoURI: string;
        tags?: (string | {
            name: string;
            description: string;
        })[] | undefined;
        extensions?: Record<string, unknown> | undefined;
    }[][]);
    _assertAsset(asset: any): {
        address: string;
        chainId: number;
        symbol: string;
        name: string;
        decimals: number;
        isNative: boolean;
        logoURI: string;
        tags?: (string | {
            name: string;
            description: string;
        })[] | undefined;
        extensions?: Record<string, unknown> | undefined;
    };
    /**
     * Fetch all tokens.
     *
     * @public
     * @returns {TokenAsset[]} A list of all registered tokens.
     */
    public getAllTokens(): TokenAsset[];
    /**
     * Fetch tokens by contract address.
     *
     * @public
     * @param {string} address - The token address.
     * @param {BaseAssetFilter} [filter] - Optional lookup filters such as `chainId` and `caseSensitive`.
     * @returns {TokenAsset[]} A list of matching tokens.
     */
    public getTokenByAddress(address: string, filter?: BaseAssetFilter): TokenAsset[];
    /**
     * Fetch tokens by symbol.
     *
     * @public
     * @param {string} symbol - The token symbol (e.g. "USDT", "ETH").
     * @param {BaseAssetFilter} [filter] - Optional lookup filters such as `chainId` and `caseSensitive`.
     * @returns {TokenAsset[]} A list of matching tokens.
     */
    public getTokenBySymbol(symbol: string, filter?: BaseAssetFilter): TokenAsset[];
    /**
     * Alias of {@link getTokenBySymbol}.
     *
     * @public
     * @param {string} ticker - The token symbol (e.g. "USDT", "ETH").
     * @param {BaseAssetFilter} [filter] - Optional lookup filters such as `chainId` and `caseSensitive`.
     * @returns {TokenAsset[]} A list of matching tokens.
     */
    public getTokenByTicker(ticker: string, filter?: BaseAssetFilter): TokenAsset[];
}
export type TokenAsset = import("./wdk-asset-schema.js").TokenAsset;
import { WdkBaseAssetRegistry } from './wdk-base-asset-registry.js';
