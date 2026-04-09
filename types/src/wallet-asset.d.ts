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
     * @param {WdkAssetList[]} assets - One or more asset lists to preload into the registry.
     *
     * @example
     * import { WdkAssetRegistry } from '@tetherto/wdk-asset-registry'
     * import commonAssets from '@tetherto/wdk-asset-registry/assets/common'
     *
     * const registry = new WdkAssetRegistry(commonAssets)
     */
    constructor(...assets: WdkAssetList[]);
    /**
     * @private
     * @type {WdkAssetList}
     */
    private _assets;
    /**
     * Register a single asset in the registry.
     *
     * @public
     * @param {WdkAsset} asset - Asset definition to insert or replace.
     * @param {boolean} [force] - When `true`, replaces an existing asset with the same address and chain ID.
     * @returns {number} The inserted asset count from `Array#push`, or the replaced asset index when `force` is enabled.
     * @throws {Error} Thrown when the asset already exists and `force` is not enabled.
     */
    public registerAsset(asset: WdkAsset, force?: boolean): number;
    /**
     * Register multiple assets in the registry.
     *
     * @public
     * @param {WdkAssetList} assets - Asset definitions to insert or replace.
     * @param {boolean} [force] - When `true`, replaces existing assets with the same address and chain ID.
     * @returns {number[]} The result of each `registerAsset` call in input order.
     * @throws {Error} Thrown when any asset already exists and `force` is not enabled.
     */
    public registerAssets(assets: WdkAssetList, force?: boolean): number[];
    /**
     * Fetch all tokens.
     *
     * @public
     * @returns {WdkAssetList} A list of all registered tokens.
     */
    public getAllTokens(): WdkAssetList;
    /**
     * Fetch tokens by symbol.
     *
     * @public
     * @param {string} symbol - The token symbol (e.g. "USDT", "ETH").
     * @param {WdkAssetFilter} [filter] - Optional lookup filters such as `chainId` and `caseSensitive`.
     * @returns {WdkAssetList} A list of matching tokens.
     */
    public getTokenBySymbol(symbol: string, filter?: WdkAssetFilter): WdkAssetList;
    /**
     * Alias of {@link getTokenBySymbol}.
     *
     * @public
     * @param {string} ticker - The token symbol (e.g. "USDT", "ETH").
     * @param {WdkAssetFilter} [filter] - Optional lookup filters such as `chainId` and `caseSensitive`.
     * @returns {WdkAssetList} A list of matching tokens.
     */
    public getTokenByTicker(ticker: string, filter?: WdkAssetFilter): WdkAssetList;
    /**
     * Fetch tokens by contract address.
     *
     * @public
     * @param {string} address - The token address.
     * @param {WdkAssetFilter} [filter] - Optional lookup filters such as `chainId` and `caseSensitive`.
     * @returns {WdkAssetList} A list of matching tokens.
     */
    public getTokenByAddress(address: string, filter?: WdkAssetFilter): WdkAssetList;
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
