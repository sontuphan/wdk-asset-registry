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

import { TokenAssetSchema } from './wdk-asset-schema.js'
import { WdkBaseAssetRegistry } from './wdk-base-asset-registry.js'

/** @typedef {import("./wdk-asset-schema.js").TokenAsset} TokenAsset */

/**
 * @extends {WdkBaseAssetRegistry<TokenAsset>}
 */
export class WdkTokenAssetRegistry extends WdkBaseAssetRegistry {
  _assertAsset (asset) {
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
