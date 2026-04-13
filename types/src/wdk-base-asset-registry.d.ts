/** @typedef {import("./wdk-asset-schema.js").BaseAsset} BaseAsset */
/**
 * @typedef {object} BaseAssetFilter
 * @property {number} [chainId] - Optional chain ID used to filter matching assets.
 * @property {boolean} [caseSensitive] - Defaults to `false`. When true, matches symbols and addresses without lowercasing.
 */
/**
 * The base registry for asset-agnostic use cases.
 *
 * @template {BaseAsset} T
 *
 * @example
 * import { z } from 'zod'
 * import { BaseAssetSchema, WdkBaseAssetRegistry } from '@tetherto/wdk-asset-registry'
 *
 * type CustomAsset = {
 *   address: string
 *   chainId: number
 *   label: string
 * }
 *
 * const CustomAssetSchema = BaseAssetSchema.extend({
 *   label: z.string()
 * })
 *
 * class CustomAssetRegistry extends WdkBaseAssetRegistry<CustomAsset> {
 *   _assertAsset (asset: CustomAsset): CustomAsset {
 *     return CustomAssetSchema.parse(asset)
 *   }
 * }
 */
export class WdkBaseAssetRegistry<T extends BaseAsset> {
    /**
     * Creates a new asset registry.
     *
     * @param {T[][]} assets - One or more asset lists to preload into the registry.
     */
    constructor(...assets: T[][]);
    /**
     * @private
     * @type {T[][]}
     */
    private _assets;
    /**
     * Assert a single asset.
     *
     * @private
     * @param {T} asset - Asset definition to validate.
     * @returns {T} The normalized asset after the sucessful validation.
     * @throws {Error} Throw an error if the provided asset is invalid.
     */
    private _assertAsset;
    /**
     * Register a single asset in the registry.
     *
     * @public
     * @param {T} asset - Asset definition to insert or replace.
     * @param {boolean} [force] - When `true`, replaces an existing asset with the same address and chain ID.
     * @returns {number} The inserted asset count from `Array#push`, or the replaced asset index when `force` is enabled.
     * @throws {Error} Thrown when the asset already exists and `force` is not enabled.
     */
    public registerAsset(asset: T, force?: boolean): number;
    /**
     * Register multiple assets in the registry.
     *
     * @public
     * @param {T[]} assets - Asset definitions to insert or replace.
     * @param {boolean} [force] - When `true`, replaces existing assets with the same address and chain ID.
     * @returns {number[]} The result of each `registerAsset` call in input order.
     * @throws {Error} Thrown when any asset already exists and `force` is not enabled.
     */
    public registerAssets(assets: T[], force?: boolean): number[];
    /**
     * Fetch all assets.
     *
     * @public
     * @returns {T[]} A list of all registered assets.
     */
    public getAllAssets(): T[];
    /**
     * Fetch assets by contract address.
     *
     * @public
     * @param {string} address - The asset address.
     * @param {BaseAssetFilter} [filter] - Optional lookup filters such as `chainId` and `caseSensitive`.
     * @returns {T[]} A list of matching assets.
     */
    public getAssetByAddress(address: string, filter?: BaseAssetFilter): T[];
}
export type BaseAsset = import("./wdk-asset-schema.js").BaseAsset;
export type BaseAssetFilter = {
    /**
     * - Optional chain ID used to filter matching assets.
     */
    chainId?: number | undefined;
    /**
     * - Defaults to `false`. When true, matches symbols and addresses without lowercasing.
     */
    caseSensitive?: boolean | undefined;
};
