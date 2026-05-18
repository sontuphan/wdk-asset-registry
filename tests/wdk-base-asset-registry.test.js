import { afterEach, beforeEach, describe, expect, test } from '@jest/globals'

import WdkBaseAssetRegistry, { AssetRegistryError, BaseAssetSchema } from '@tetherto/wdk-asset-registry'
import commonTokens from '@tetherto/wdk-asset-registry/assets/common-tokens'

const TEST_CHAINID = 'eip155:1'
const TEST_ID = 'eip155:1/0xdAC17F958D2ee523a2206206994597C13D831ec7'
const TEST_NEW_ASSET = {
  id: '11155111/custom',
  chainId: 'eip155:11155111'
}
const TEST_REPLACED_ASSET = {
  id: TEST_ID,
  chainId: TEST_CHAINID
}
const TEST_EXTRA_ASSET = {
  id: 'eip155:10/custom',
  chainId: 'eip155:10'
}
const TEST_EXTENDED_ASSET = {
  id: 'eip155:1/extended',
  chainId: TEST_CHAINID,
  label: 'Extended Asset'
}

class CustomBaseAssetRegistry extends WdkBaseAssetRegistry {
  _assertAsset (asset) {
    return BaseAssetSchema.parse(asset)
  }
}

describe('wallet-base-asset-registry', () => {
  describe('WdkBaseAssetRegistry', () => {
    test('should validate a base asset with the default assertion', () => {
      const registry = new WdkBaseAssetRegistry()

      expect(registry._assertAsset(TEST_NEW_ASSET)).toEqual(TEST_NEW_ASSET)
    })

    test('should preserve extra fields with the default assertion', () => {
      const registry = new WdkBaseAssetRegistry()

      expect(registry._assertAsset(TEST_EXTENDED_ASSET)).toEqual(TEST_EXTENDED_ASSET)
    })

    test('should throw for invalid assets with the default assertion', () => {
      const registry = new WdkBaseAssetRegistry()

      expect(() => registry._assertAsset({ id: 'missing-chain-id' })).toThrow('Required')
    })

    test('should register a base asset with the default assertion', () => {
      const registry = new WdkBaseAssetRegistry()

      registry.registerAsset(TEST_EXTENDED_ASSET)

      expect(registry.getAssetById(TEST_EXTENDED_ASSET.id)).toEqual(TEST_EXTENDED_ASSET)
    })
  })

  describe('CustomBaseAssetRegistry', () => {
    let wdkAssetRegistry

    beforeEach(() => {
      wdkAssetRegistry = new CustomBaseAssetRegistry(structuredClone(commonTokens))
    })

    afterEach(() => {
      wdkAssetRegistry = undefined
    })

    test('should load all assets from the constructor', () => {
      const assets = wdkAssetRegistry.getAssets()

      expect(assets).toHaveLength(commonTokens.length)
    })

    test('should allow multiple asset sets in the constructor', () => {
      const registry = new CustomBaseAssetRegistry(
        structuredClone(commonTokens),
        [TEST_EXTRA_ASSET]
      )

      expect(registry.getAssets()).toHaveLength(commonTokens.length + 1)
    })

    test('should get assets by id', () => {
      const asset = wdkAssetRegistry.getAssetById(TEST_ID)

      expect(asset).toEqual(expect.objectContaining({ id: TEST_ID }))
    })

    test('should support case sensitive id lookup', () => {
      expect(wdkAssetRegistry.getAssetById(TEST_ID)).toEqual(
        expect.objectContaining({ id: TEST_ID })
      )
      expect(wdkAssetRegistry.getAssetById(TEST_ID.toLowerCase())).toBeNull()
    })

    test('should get assets with multiple filter conditions', () => {
      const assets = wdkAssetRegistry.getAsset([{ id: TEST_ID, chainId: TEST_CHAINID }])

      expect(Array.isArray(assets)).toBe(true)
      expect(assets).toEqual([expect.objectContaining({ id: TEST_ID, chainId: TEST_CHAINID })])
    })

    test('should register a new asset', () => {
      const initialLength = wdkAssetRegistry.getAssets().length

      wdkAssetRegistry.registerAsset(TEST_NEW_ASSET)
      const asset = wdkAssetRegistry.getAssetById(TEST_NEW_ASSET.id)

      expect(wdkAssetRegistry.getAssets()).toHaveLength(initialLength + 1)
      expect(asset).toEqual(TEST_NEW_ASSET)
    })

    test('should throw when registering a duplicate asset without upsert', () => {
      expect(() => wdkAssetRegistry.registerAsset(TEST_REPLACED_ASSET)).toThrow(AssetRegistryError)
      expect(() => wdkAssetRegistry.registerAsset(TEST_REPLACED_ASSET)).toThrow(
        'Asset already exists. Set upsert to `true` to replace it.'
      )
    })

    test('should replace an existing asset when upsert is true', () => {
      wdkAssetRegistry.registerAsset(TEST_REPLACED_ASSET, true)
      const asset = wdkAssetRegistry.getAssetById(TEST_ID)

      expect(asset).toEqual(TEST_REPLACED_ASSET)
    })

    test('should register multiple assets', () => {
      const assetsToRegister = [
        TEST_NEW_ASSET,
        TEST_EXTRA_ASSET
      ]

      wdkAssetRegistry.registerAssets(assetsToRegister)

      expect(wdkAssetRegistry.getAssetById(assetsToRegister[0].id)).toEqual(assetsToRegister[0])
      expect(wdkAssetRegistry.getAssetById(assetsToRegister[1].id)).toEqual(assetsToRegister[1])
    })
  })
})
