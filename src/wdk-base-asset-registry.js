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

import { deepEqual } from 'fast-equals'

/** @typedef {import("./wdk-asset-schema.js").BaseAsset} BaseAsset */

/**
 * @template {object} TSchema
 * @typedef {Partial<TSchema>[]} BaseAssetFilter
 */

/**
 * @typedef {object} BaseAssetOptions
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
 *   id: string
 *   chainId: string
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
   * @param {T[][]} preload - One or more asset lists to preload into the registry.
   */
  constructor (...preload) {
    /**
     * @private
     * @type {T[]}
     */
    this._assets = []

    for (const entry of preload) {
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
   * @param {boolean} [force] - When `true`, replaces an existing asset with the same id.
   * @returns {number} The inserted asset count from `Array#push`, or the replaced asset index when `force` is enabled.
   * @throws {Error} Thrown when the asset already exists and `force` is not enabled.
   */
  registerAsset (asset, force = false) {
    const normalizedAsset = this._assertAsset(asset)

    const index = this._assets.findIndex(({ id }) => {
      return id.toLowerCase() === normalizedAsset.id.toLowerCase()
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
   * @param {boolean} [force] - When `true`, replaces existing assets with the same id.
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
   * Fetch an asset by the identifier.
   *
   * @param {string} id - The asset identifier.
   * @param {BaseAssetOptions} [opts] - Optional lookup options such as `caseSensitive`.
   * @returns {T | undefined} The matching asset, or `undefined` if no asset matches the id.
   */
  getAssetById (id, opts = {}) {
    const { caseSensitive = false } = opts

    for (const asset of this._assets) {
      if (caseSensitive) {
        if (asset.id === id) return asset
      } else {
        if (asset.id.toLowerCase() === id.toLowerCase()) return asset
      }
    }

    return undefined
  }

  /**
   * Fetch assets by one or more partial match conditions.
   *
   * @public
   * @param {BaseAssetFilter<T>} filter - One or more partial asset match conditions. Each condition matches assets that contain the provided key-value pairs.
   * @param {BaseAssetOptions} [opts] - Optional lookup options such as `caseSensitive`.
   * @returns {T[]} A list of matching assets.
   */
  getAsset (filter, opts = {}) {
    const { caseSensitive = false } = opts

    const results = []
    const caching = []

    for (const condition of filter) {
      for (let i = 0; i < this._assets.length; i++) {
        let match = true
        const asset = this._assets[i]

        for (const key of Object.keys(condition)) {
          const conditionValue = !caseSensitive && typeof condition[key] === 'string'
            ? condition[key].toLowerCase()
            : condition[key]
          const assetValue = !caseSensitive && typeof asset[key] === 'string'
            ? asset[key].toLowerCase()
            : asset[key]

          if (!deepEqual(conditionValue, assetValue)) {
            match = false
            break
          }
        }

        if (match && !caching.includes(i)) {
          results.push(asset)
          caching.push(i)
        }
      }
    }

    return results
  }
}
