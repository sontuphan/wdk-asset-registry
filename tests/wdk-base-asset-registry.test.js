import { afterEach, beforeEach, describe, expect, test } from '@jest/globals'

import { BaseAssetSchema, WdkBaseAssetRegistry } from '@tetherto/wdk-asset-registry'
import commonTokens from '@tetherto/wdk-asset-registry/assets/common-tokens'

const TEST_CHAINID = 1
const TEST_ADDRESS = '0xdAC17F958D2ee523a2206206994597C13D831ec7'
const TEST_NEW_ASSET = {
  address: '0x1111111111111111111111111111111111111111',
  chainId: 11155111
}
const TEST_REPLACED_ASSET = {
  address: TEST_ADDRESS,
  chainId: TEST_CHAINID
}
const TEST_EXTRA_ASSET = {
  address: '0x3333333333333333333333333333333333333333',
  chainId: 10
}

class TestBaseAssetRegistry extends WdkBaseAssetRegistry {
  _assertAsset (asset) {
    return BaseAssetSchema.parse(asset)
  }
}

describe('wallet-base-asset-registry', () => {
  let wdkAssetRegistry

  beforeEach(() => {
    wdkAssetRegistry = new TestBaseAssetRegistry(structuredClone(commonTokens))
  })

  afterEach(() => {
    wdkAssetRegistry = undefined
  })

  test('should load all assets from the constructor', () => {
    const assets = wdkAssetRegistry.getAllAssets()

    expect(Array.isArray(assets)).toBe(true)
    expect(assets).toHaveLength(commonTokens.length)
  })

  test('should allow multiple asset sets in the constructor', () => {
    const registry = new TestBaseAssetRegistry(
      structuredClone(commonTokens),
      [TEST_EXTRA_ASSET]
    )

    expect(registry.getAllAssets()).toHaveLength(commonTokens.length + 1)
  })

  test('should get assets by address', () => {
    const assets = wdkAssetRegistry.getAssetByAddress(TEST_ADDRESS)

    expect(Array.isArray(assets)).toBe(true)
    expect(assets.length).toBeGreaterThan(0)
    expect(assets[0].address).toBe(TEST_ADDRESS)
  })

  test('should support case sensitive address lookup', () => {
    expect(wdkAssetRegistry.getAssetByAddress(TEST_ADDRESS, { caseSensitive: true }).length).toBeGreaterThan(0)
    expect(wdkAssetRegistry.getAssetByAddress(TEST_ADDRESS.toLowerCase(), { caseSensitive: true })).toEqual([])
  })

  test('should get assets by address with chainId', () => {
    const assets = wdkAssetRegistry.getAssetByAddress(TEST_ADDRESS, { chainId: TEST_CHAINID })

    expect(Array.isArray(assets)).toBe(true)
    expect(assets).toHaveLength(1)
    expect(assets[0].chainId).toBe(TEST_CHAINID)
  })

  test('should register a new asset', () => {
    const initialLength = wdkAssetRegistry.getAllAssets().length

    const result = wdkAssetRegistry.registerAsset(TEST_NEW_ASSET)
    const assets = wdkAssetRegistry.getAssetByAddress(TEST_NEW_ASSET.address, { chainId: TEST_NEW_ASSET.chainId })

    expect(result).toBe(initialLength + 1)
    expect(assets).toEqual([TEST_NEW_ASSET])
  })

  test('should throw when registering a duplicate asset without force', () => {
    expect(() => wdkAssetRegistry.registerAsset(TEST_REPLACED_ASSET)).toThrow(
      'Asset already exists. Set force to `true` to replace it.'
    )
  })

  test('should replace an existing asset when force is true', () => {
    const result = wdkAssetRegistry.registerAsset(TEST_REPLACED_ASSET, true)
    const [asset] = wdkAssetRegistry.getAssetByAddress(TEST_ADDRESS, { chainId: TEST_CHAINID })

    expect(result).toBeGreaterThanOrEqual(0)
    expect(asset).toEqual(TEST_REPLACED_ASSET)
  })

  test('should register multiple assets', () => {
    const assetsToRegister = [
      TEST_NEW_ASSET,
      TEST_EXTRA_ASSET
    ]

    const result = wdkAssetRegistry.registerAssets(assetsToRegister)

    expect(result).toHaveLength(2)
    expect(wdkAssetRegistry.getAssetByAddress(assetsToRegister[0].address, { chainId: assetsToRegister[0].chainId })).toEqual([assetsToRegister[0]])
    expect(wdkAssetRegistry.getAssetByAddress(assetsToRegister[1].address, { chainId: assetsToRegister[1].chainId })).toEqual([assetsToRegister[1]])
  })
})
