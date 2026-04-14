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
/** @typedef {import("./wdk-base-asset-registry.js").BaseAssetOptions} BaseAssetOptions */

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
   * Fetch a token by its asset identifier.
   *
   * @public
   * @param {string} id - The asset identifier.
   * @returns {TokenAsset | undefined} The matching token, or `undefined` if no token matches the id.
   */
  getTokenById (id) {
    return this.getAssetById(id)
  }

  /**
   * Fetch tokens by contract address.
   *
   * @public
   * @param {string} address - The token address.
   * @param {BaseAssetOptions} [opts] - Optional lookup filters such as `caseSensitive`.
   * @returns {TokenAsset[]} A list of matching tokens.
   */
  getTokenByAddress (address, opts = {}) {
    return this.getAsset([{ address }], opts)
  }

  /**
   * Fetch tokens by symbol.
   *
   * @public
   * @param {string} symbol - The token symbol (e.g. "USDT", "ETH").
   * @param {BaseAssetOptions} [opts] - Optional lookup filters such as `caseSensitive`.
   * @returns {TokenAsset[]} A list of matching tokens.
   */
  getTokenBySymbol (symbol, opts = {}) {
    return this.getAsset([{ symbol }], opts)
  }

  /**
   * Alias of {@link getTokenBySymbol}.
   *
   * @public
   * @param {string} ticker - The token symbol (e.g. "USDT", "ETH").
   * @param {BaseAssetOptions} [filter] - Optional lookup filters such as `chainId` and `caseSensitive`.
   * @returns {TokenAsset[]} A list of matching tokens.
   */
  getTokenByTicker (ticker, filter = {}) {
    return this.getTokenBySymbol(ticker, filter)
  }

  /**
   * todo
   *
   * @param {string} chainId
   * @param {BaseAssetOptions} opts
   * @returns {TokenAsset[]}
   */
  getTokenByChain (chainId, opts = {}) {
    return this.getAsset([{ chainId }], opts)
  }
}
