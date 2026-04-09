/** @typedef {import("./wallet-asset-schema.js").WdkAsset} WdkAsset */
/** @typedef {import("./wallet-asset-schema.js").WdkAssetList} WdkAssetList */
/**
 * @typedef {object} WdkAssetFilter
 * @property {number} [chainId] - Optional chain ID used to filter matching assets.
 * @property {boolean} [caseSensitive] - Defaults to `false`. When true, matches symbols and addresses without lowercasing.
 */
export default class WdkAssetRegistry {
    /**
     * Creates a new asset registry.
     *
     * @param {WdkAssetList} assets - Predefined asset list used by the registry.
     *
     * @example
     * import { WdkAssetRegistry } from '@tetherto/wdk-asset-registry'
     * import commonAssets from '@tetherto/wdk-asset-registry/assets/common'
     *
     * const registry = new WdkAssetRegistry(commonAssets)
     */
    constructor(assets: WdkAssetList);
    /**
     * @private
     * @type {WdkAssetList}
     */
    private _assets;
    /**
     * Fetch all tokens.
     *
     * @public
     * @returns {Promise<WdkAssetList | undefined>} A list of all tokens or undefined if not found.
     */
    public getAllTokens(): Promise<WdkAssetList | undefined>;
    /**
     * Fetch tokens by symbol.
     *
     * @public
     * @param {string} symbol - The token symbol (e.g. "USDT", "ETH").
     * @param {WdkAssetFilter} [filter] - Optional lookup filters such as `chainId` and `caseSensitive`.
     * @returns {Promise<WdkAssetList | undefined>} A list of matching tokens or undefined if not found.
     */
    public getTokenBySymbol(symbol: string, filter?: WdkAssetFilter): Promise<WdkAssetList | undefined>;
    /**
     * Alias of {@link getTokenBySymbol}.
     *
     * @public
     * @param {string} ticker - The token symbol (e.g. "USDT", "ETH").
     * @param {WdkAssetFilter} [filter] - Optional lookup filters such as `chainId` and `caseSensitive`.
     * @returns {Promise<WdkAssetList | undefined>} A list of matching tokens or undefined if not found.
     */
    public getTokenByTicker(ticker: string, filter?: WdkAssetFilter): Promise<WdkAssetList | undefined>;
    /**
     * Fetch tokens by contract address.
     *
     * @public
     * @param {string} address - The token address.
     * @param {WdkAssetFilter} [filter] - Optional lookup filters such as `chainId` and `caseSensitive`.
     * @returns {Promise<WdkAssetList | undefined>} A list of matching tokens or undefined if not found.
     */
    public getTokenByAddress(address: string, filter?: WdkAssetFilter): Promise<WdkAssetList | undefined>;
}
export type WdkAsset = import("./wallet-asset-schema.js").WdkAsset;
export type WdkAssetList = import("./wallet-asset-schema.js").WdkAssetList;
export type WdkAssetFilter = {
    /**
     * - Optional chain ID used to filter matching assets.
     */
    chainId?: number | undefined;
    /**
     * - Defaults to `false`. When true, matches symbols and addresses without lowercasing.
     */
    caseSensitive?: boolean | undefined;
};
