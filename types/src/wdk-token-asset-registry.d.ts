/** @typedef {import("./wdk-asset-schema.js").TokenAsset} TokenAsset */
/** @typedef {import("./wdk-base-asset-registry.js").BaseAssetOptions} BaseAssetOptions */
/**
 * @extends {WdkBaseAssetRegistry<TokenAsset>}
 */
export class WdkTokenAssetRegistry extends WdkBaseAssetRegistry<{
    id: string;
    chainId: string;
    address: string;
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
    constructor(...preload: {
        id: string;
        chainId: string;
        address: string;
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
        id: string;
        chainId: string;
        address: string;
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
     * todo
     *
     * @public
     * @param {string} address - todo
     * @param {BaseAssetOptions} [opts] - todo
     * @returns {TokenAsset} todo
     */
    public getTokenByAddress(id: any, opts?: BaseAssetOptions): TokenAsset;
    /**
     * Fetch tokens by symbol.
     *
     * @public
     * @param {string} symbol - The token symbol (e.g. "USDT", "ETH").
     * @param {BaseAssetOptions} [opts] - Optional lookup filters such as `caseSensitive`.
     * @returns {TokenAsset[]} A list of matching tokens.
     */
    public getTokenBySymbol(symbol: string, opts?: BaseAssetOptions): TokenAsset[];
    /**
     * Alias of {@link getTokenBySymbol}.
     *
     * @public
     * @param {string} ticker - The token symbol (e.g. "USDT", "ETH").
     * @param {BaseAssetOptions} [filter] - Optional lookup filters such as `chainId` and `caseSensitive`.
     * @returns {TokenAsset[]} A list of matching tokens.
     */
    public getTokenByTicker(ticker: string, filter?: BaseAssetOptions): TokenAsset[];
    /**
     * todo
     *
     * @param {string} chainId
     * @param {BaseAssetOptions} opts
     * @returns {TokenAsset[]}
     */
    getTokenByChain(chainId: string, opts?: BaseAssetOptions): TokenAsset[];
}
export type TokenAsset = import("./wdk-asset-schema.js").TokenAsset;
export type BaseAssetOptions = import("./wdk-base-asset-registry.js").BaseAssetOptions;
import { WdkBaseAssetRegistry } from './wdk-base-asset-registry.js';
