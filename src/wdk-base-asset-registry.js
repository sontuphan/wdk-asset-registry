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
     * @type {Map<string, T>}
     */
    this._assets = new Map()

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
   * @returns {void}
   * @throws {Error} Thrown when the asset already exists and `force` is not enabled.
   */
  registerAsset (asset, force = false) {
    const normalizedAsset = this._assertAsset(asset)

    const existing = this._assets.get(normalizedAsset.id)

    if (existing && !force) {
      throw new Error('Asset already exists. Set force to `true` to replace it.')
    }

    this._assets.set(normalizedAsset.id, normalizedAsset)
  }

  /**
   * Register multiple assets in the registry.
   *
   * @public
   * @param {T[]} assets - Asset definitions to insert or replace.
   * @param {boolean} [force] - When `true`, replaces existing assets with the same id.
   * @returns {void}
   * @throws {Error} Thrown when any asset already exists and `force` is not enabled.
   */
  registerAssets (assets, force = false) {
    for (const asset of assets) {
      this.registerAsset(asset, force)
    }
  }

  /**
   * Fetch all assets.
   *
   * @public
   * @returns {T[]} A list of all registered assets.
   */
  getAllAssets () {
    return Array.from(this._assets.values())
  }

  /**
   * Fetch an asset by the identifier.
   *
   * @param {string} id - The asset identifier.
   * @returns {T | undefined} The matching asset, or `undefined` if no asset matches the id.
   */
  getAssetById (id) {
    return this._assets.get(id)
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

    const assets = this.getAllAssets()
    const results = []
    const caching = []

    for (const condition of filter) {
      for (let i = 0; i < assets.length; i++) {
        let match = true
        const asset = assets[i]

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
