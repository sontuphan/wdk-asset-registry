// Copyright 2024 Tether Operations Limited
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict'

import { NotImplementedError } from '@tetherto/wdk-wallet'

import { TokenAssetSchema } from './wallet-asset-schema.js'

/** @typedef {import("./wallet-asset-schema.js").BaseAsset} BaseAsset */
/** @typedef {import("./wallet-asset-schema.js").TokenAsset} TokenAsset */

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
export class WdkBaseAssetRegistry {
  /**
   * Creates a new asset registry.
   * 
   * @param {T[][]} assets - One or more asset lists to preload into the registry.
   */
  constructor (...assets) {
    /**
     * @private
     * @type {T[][]}
     */
    this._assets = []

    for (const entry of assets) {
      this.registerAssets(entry)
    }
  }

  /**
   * Assert a single asset.
   *
   * @private
   * @param {T} asset - Asset definition to validate.
   * @returns {T} The normalized asset after the sucessful validation.
   * @throws {Error} Throw an error if the provided asset is invalid.
   */
  _assertAsset (asset) {
    throw new NotImplementedError('_validateAsset(asset)')
  }

  /**
   * Register a single asset in the registry.
   *
   * @public
   * @param {T} asset - Asset definition to insert or replace.
   * @param {boolean} [force] - When `true`, replaces an existing asset with the same address and chain ID.
   * @returns {number} The inserted asset count from `Array#push`, or the replaced asset index when `force` is enabled.
   * @throws {Error} Thrown when the asset already exists and `force` is not enabled.
   */
  registerAsset (asset, force = false) {
    const normalizedAsset = this._assertAsset(asset)

    const index = this._assets.findIndex(({ address, chainId }) => {
      return address.toLowerCase() === normalizedAsset.address.toLowerCase() && chainId === normalizedAsset.chainId
    })

    if (index < 0) {
      return this._assets.push(asset)
    }

    if (force) {
      this._assets[index] = asset
      return index
    }

    throw new Error('Asset already exists. Set force to `true` to replace it.')
  }

  /**
   * Register multiple assets in the registry.
   *
   * @public
   * @param {T[]} assets - Asset definitions to insert or replace.
   * @param {boolean} [force] - When `true`, replaces existing assets with the same address and chain ID.
   * @returns {number[]} The result of each `registerAsset` call in input order.
   * @throws {Error} Thrown when any asset already exists and `force` is not enabled.
   */
  registerAssets (assets, force = false) {
    const indexes = []

    for (const asset of assets) {
      const index = this.registerAsset(asset, force)
      indexes.push(index)
    }

    return indexes
  }

  /**
   * Fetch all assets.
   *
   * @public
   * @returns {T[]} A list of all registered assets.
   */
  getAllAssets () {
    return this._assets
  }

  /**
   * Fetch assets by contract address.
   *
   * @public
   * @param {string} address - The asset address.
   * @param {BaseAssetFilter} [filter] - Optional lookup filters such as `chainId` and `caseSensitive`.
   * @returns {T[]} A list of matching assets.
   */
  getAssetByAddress (address, filter = {}) {
    const { chainId, caseSensitive = false } = filter

    const data = this._assets.filter(asset => {
      if (caseSensitive) return asset.address === address
      return asset.address.toLowerCase() === address.toLowerCase()
    })

    if (typeof chainId === 'number') return data.filter(token => token.chainId === chainId)

    return data
  }
}

/**
 * @extends {WdkBaseAssetRegistry<TokenAsset>}
 */
export class WdkTokenAssetRegistry extends WdkBaseAssetRegistry {
  _assertAsset (/** @type {TokenAsset} */ asset) {
    return TokenAssetSchema.parse(asset)
  }

  /**
   * Fetch all tokens.
   *
   * @public
   * @returns {TokenAsset[]} A list of all registered tokens.
   */
  getAllTokens () {
    return this.getAllAssets()
  }

  /**
   * Fetch tokens by contract address.
   *
   * @public
   * @param {string} address - The token address.
   * @param {BaseAssetFilter} [filter] - Optional lookup filters such as `chainId` and `caseSensitive`.
   * @returns {TokenAsset[]} A list of matching tokens.
   */
  getTokenByAddress (address, filter = {}) {
    const { chainId, caseSensitive = false } = filter

    const data = this._assets.filter(asset => {
      if (caseSensitive) return asset.address === address
      return asset.address.toLowerCase() === address.toLowerCase()
    })

    if (typeof chainId === 'number') return data.filter(token => token.chainId === chainId)

    return data
  }

  /**
   * Fetch tokens by symbol.
   *
   * @public
   * @param {string} symbol - The token symbol (e.g. "USDT", "ETH").
   * @param {BaseAssetFilter} [filter] - Optional lookup filters such as `chainId` and `caseSensitive`.
   * @returns {TokenAsset[]} A list of matching tokens.
   */
  getTokenBySymbol (symbol, filter = {}) {
    const { chainId, caseSensitive = false } = filter

    const data = this._assets.filter(asset => {
      if (caseSensitive) return asset.symbol === symbol
      return asset.symbol.toLowerCase() === symbol.toLowerCase()
    })

    if (typeof chainId === 'number') return data.filter(token => token.chainId === chainId)

    return data
  }

  /**
   * Alias of {@link getTokenBySymbol}.
   *
   * @public
   * @param {string} ticker - The token symbol (e.g. "USDT", "ETH").
   * @param {BaseAssetFilter} [filter] - Optional lookup filters such as `chainId` and `caseSensitive`.
   * @returns {TokenAsset[]} A list of matching tokens.
   */
  getTokenByTicker (ticker, filter = {}) {
    return this.getTokenBySymbol(ticker, filter)
  }
}
