/** @typedef {import("./wdk-asset-schema.js").TokenAsset} TokenAsset */
/** @typedef {import("./wdk-base-asset-registry.js").BaseAssetOptions} BaseAssetOptions */
/**
 * @extends {WdkBaseAssetRegistry<TokenAsset>}
 */
export class WdkTokenAssetRegistry extends WdkBaseAssetRegistry<{
    id: string;
    chainId: string | number;
    address: string;
    symbol: string;
    name: string;
    decimals: number;
    isNative: boolean;
}> {
    constructor(...preload: {
        id: string;
        chainId: string | number;
        address: string;
        symbol: string;
        name: string;
        decimals: number;
        isNative: boolean;
    }[][]);
    _assertAsset(asset: any): {
        id: string;
        chainId: string | number;
        address: string;
        symbol: string;
        name: string;
        decimals: number;
        isNative: boolean;
    };
    /**
     * Fetch all tokens.
     *
     * @returns {TokenAsset[]} A list of all registered tokens.
     */
    getTokens(): TokenAsset[];
    /**
     * Fetch a token by its asset identifier.
     *
     * @param {string} id - The asset identifier.
     * @returns {TokenAsset | null} The matching token, or `null` if no token matches the id.
     */
    getTokenById(id: string): TokenAsset | null;
    /**
     * Fetch tokens by contract address.
     *
     * @param {string} address - The token address.
     * @param {BaseAssetOptions} [opts] - Optional lookup filters such as `caseSensitive`.
     * @returns {TokenAsset[]} A list of matching tokens.
     */
    getTokenByAddress(address: string, opts?: BaseAssetOptions): TokenAsset[];
    /**
     * Fetch tokens by symbol.
     *
     * @param {string} symbol - The token symbol (e.g. "USDT", "ETH").
     * @param {BaseAssetOptions} [opts] - Optional lookup filters such as `caseSensitive`.
     * @returns {TokenAsset[]} A list of matching tokens.
     */
    getTokenBySymbol(symbol: string, opts?: BaseAssetOptions): TokenAsset[];
    /**
     * Alias of {@link getTokenBySymbol}.
     *
     * @param {string} ticker - The token symbol (e.g. "USDT", "ETH").
     * @param {BaseAssetOptions} [filter] - Optional lookup filters such as `chainId` and `caseSensitive`.
     * @returns {TokenAsset[]} A list of matching tokens.
     */
    getTokenByTicker(ticker: string, filter?: BaseAssetOptions): TokenAsset[];
    /**
     * Fetch tokens by chain id.
     *
     * @param {string | number} chainId - The chain identifier (e.g. "eip155:1").
     * @param {BaseAssetOptions} [opts] - Optional lookup filters such as `caseSensitive`.
     * @returns {TokenAsset[]} A list of matching tokens.
     */
    getTokenByChain(chainId: string | number, opts?: BaseAssetOptions): TokenAsset[];
}
export type TokenAsset = import("./wdk-asset-schema.js").TokenAsset;
export type BaseAssetOptions = import("./wdk-base-asset-registry.js").BaseAssetOptions;
import { WdkBaseAssetRegistry } from './wdk-base-asset-registry.js';
