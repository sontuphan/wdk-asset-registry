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

import { TokenAssetSchema } from './wallet-asset-schema.js'

/** @typedef {import("./wallet-asset-schema.js").TokenAsset} TokenAsset */
/** @typedef {import("./wallet-asset-schema.js").TokenAssetList} TokenAssetList */

/**
 * @typedef {object} TokenAssetFilter
 * @property {number} [chainId] - Optional chain ID used to filter matching assets.
 * @property {boolean} [caseSensitive] - Defaults to `false`. When true, matches symbols and addresses without lowercasing.
 */

export default class WdkTokenAssetRegistry {
  /**
   * Creates a new asset registry.
   *
   * @param {TokenAssetList[]} assets - One or more asset lists to preload into the registry.
   *
   * @example
   * import { TokenAssetRegistry, type TokenAsset } from '@tetherto/wdk-asset-registry'
   * import commonAssets from '@tetherto/wdk-asset-registry/assets/common'
   *
   * const registry = new TokenAssetRegistry<TokenAsset>(commonAssets)
   */
  constructor (...assets) {
    /**
     * @private
     * @type {TokenAssetList}
     */
    this._assets = []

    for (const entry of assets) {
      this.registerAssets(entry)
    }
  }

  /**
   * Register a single asset in the registry.
   *
   * @public
   * @param {TokenAsset} asset - Asset definition to insert or replace.
   * @param {boolean} [force] - When `true`, replaces an existing asset with the same address and chain ID.
   * @returns {number} The inserted asset count from `Array#push`, or the replaced asset index when `force` is enabled.
   * @throws {Error} Thrown when the asset already exists and `force` is not enabled.
   */
  registerAsset (asset, force = false) {
    const normalizedAsset = TokenAssetSchema.parse(asset)

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

    throw new Error('Asset already exists. Set force to true to replace it.')
  }

  /**
   * Register multiple assets in the registry.
   *
   * @public
   * @param {TokenAssetList} assets - Asset definitions to insert or replace.
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
   * Fetch all tokens.
   *
   * @public
   * @returns {TokenAssetList} A list of all registered tokens.
   */
  getAllTokens () {
    return this._assets
  }

  /**
   * Fetch tokens by symbol.
   *
   * @public
   * @param {string} symbol - The token symbol (e.g. "USDT", "ETH").
   * @param {TokenAssetFilter} [filter] - Optional lookup filters such as `chainId` and `caseSensitive`.
   * @returns {TokenAssetList} A list of matching tokens.
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
   * @param {WdkTokenFilter} [filter] - Optional lookup filters such as `chainId` and `caseSensitive`.
   * @returns {WdkTokenList} A list of matching tokens.
   */
  getTokenByTicker (ticker, filter = {}) {
    return this.getTokenBySymbol(ticker, filter)
  }

  /**
   * Fetch tokens by contract address.
   *
   * @public
   * @param {string} address - The token address.
   * @param {TokenAssetFilter} [filter] - Optional lookup filters such as `chainId` and `caseSensitive`.
   * @returns {TokenAssetList} A list of matching tokens.
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
}
