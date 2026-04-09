import { afterEach, beforeEach, describe, expect, test, } from '@jest/globals'

import { WdkAssetRegistry } from '@tetherto/wdk-asset-registry'
import commonAssets from '@tetherto/wdk-asset-registry/assets/common'

const TEST_SYMBOL = 'usdt'
const TEST_CHAINID = 1
const TEST_ADDRESS = '0xdAC17F958D2ee523a2206206994597C13D831ec7'
const TEST_NEW_ASSET = {
  address: '0x1111111111111111111111111111111111111111',
  symbol: 'TEST',
  name: 'Test Token',
  decimals: 18,
  chainId: 1,
  isNative: false,
  logoURI: 'https://example.com/test.png'
}
const TEST_REPLACED_ASSET = {
  address: TEST_ADDRESS,
  symbol: 'USDT',
  name: 'Tether USD Updated',
  decimals: 6,
  chainId: 1,
  isNative: false,
  logoURI: 'https://example.com/usdt-updated.png'
}

describe('wallet-asset', () => {
  let wdkAssetRegistry

  beforeEach(() => {
    wdkAssetRegistry = new WdkAssetRegistry(structuredClone(commonAssets))
  })

  afterEach(() => {
    wdkAssetRegistry = undefined
  })

  test('should load all common assets from the package export', () => {
    const assets = wdkAssetRegistry.getAllTokens()

    expect(Array.isArray(assets)).toBe(true)
    expect(assets.length).toBeGreaterThan(0)
  })

  test('should get tokens by symbol', () => {
    const assets = wdkAssetRegistry.getTokenBySymbol(TEST_SYMBOL)

    expect(Array.isArray(assets)).toBe(true)
    expect(assets.length).toBeGreaterThan(0)

    for (const asset of assets) {
      expect(asset.symbol.toLowerCase()).toBe(TEST_SYMBOL)
    }
  })

  test('should get tokens by ticker with chainId', async () => {
    const assets = await wdkAssetRegistry.getTokenByTicker(TEST_SYMBOL, { chainId: TEST_CHAINID })

    expect(Array.isArray(assets)).toBe(true)

    const [asset] = assets

    expect(asset.symbol.toLowerCase()).toBe(TEST_SYMBOL)
    expect(asset.chainId).toBe(TEST_CHAINID)
    expect(asset.address).toBe(TEST_ADDRESS)
  })

  test('should get tokens by address', () => {
    const assets = wdkAssetRegistry.getTokenByAddress(TEST_ADDRESS)

    expect(Array.isArray(assets)).toBe(true)
    expect(assets.length).toBeGreaterThan(0)

    const [asset] = assets

    expect(asset.symbol.toLowerCase()).toBe(TEST_SYMBOL)
    expect(asset.address).toBe(TEST_ADDRESS)
  })

  test('should get tokens by address with chainId', () => {
    const assets = wdkAssetRegistry.getTokenByAddress(TEST_ADDRESS, { chainId: TEST_CHAINID })

    expect(Array.isArray(assets)).toBe(true)

    const [asset] = assets

    expect(asset.symbol.toLowerCase()).toBe(TEST_SYMBOL)
    expect(asset.chainId).toBe(TEST_CHAINID)
    expect(asset.address).toBe(TEST_ADDRESS)
  })

  test('should register a new asset', () => {
    const initialLength = wdkAssetRegistry.getAllTokens().length

    const result = wdkAssetRegistry.registerAsset(TEST_NEW_ASSET)
    const assets = wdkAssetRegistry.getTokenByAddress(TEST_NEW_ASSET.address, { chainId: TEST_NEW_ASSET.chainId })

    expect(result).toBe(initialLength + 1)
    expect(assets).toEqual([TEST_NEW_ASSET])
  })

  test('should throw when registering a duplicate asset without force', () => {
    expect(() => wdkAssetRegistry.registerAsset(TEST_REPLACED_ASSET)).toThrow(
      'Asset already exists. Set force to true to replace it.'
    )
  })

  test('should replace an existing asset when force is true', () => {
    const result = wdkAssetRegistry.registerAsset(TEST_REPLACED_ASSET, true)
    const [asset] = wdkAssetRegistry.getTokenByAddress(TEST_ADDRESS, { chainId: TEST_CHAINID })

    expect(result).toBeGreaterThanOrEqual(0)
    expect(asset.name).toBe(TEST_REPLACED_ASSET.name)
    expect(asset.logoURI).toBe(TEST_REPLACED_ASSET.logoURI)
  })

  test('should register multiple assets', () => {
    const assetsToRegister = [
      TEST_NEW_ASSET,
      {
        ...TEST_NEW_ASSET,
        address: '0x2222222222222222222222222222222222222222',
        symbol: 'TEST2',
        name: 'Test Token 2'
      }
    ]

    const result = wdkAssetRegistry.registerAssets(assetsToRegister)

    expect(result).toHaveLength(2)
    expect(wdkAssetRegistry.getTokenByAddress(assetsToRegister[0].address, { chainId: 1 })).toEqual([assetsToRegister[0]])
    expect(wdkAssetRegistry.getTokenByAddress(assetsToRegister[1].address, { chainId: 1 })).toEqual([assetsToRegister[1]])
  })

  test('should replace multiple existing assets when force is true', () => {
    const assetsToReplace = [
      TEST_REPLACED_ASSET,
      {
        address: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
        symbol: 'USDT',
        name: 'Tether USD Arbitrum Updated',
        decimals: 6,
        chainId: 42161,
        isNative: false,
        logoURI: 'https://example.com/usdt-arb-updated.png'
      }
    ]

    const result = wdkAssetRegistry.registerAssets(assetsToReplace, true)

    expect(result).toHaveLength(2)
    expect(wdkAssetRegistry.getTokenByAddress(TEST_ADDRESS, { chainId: 1 })[0].name).toBe(TEST_REPLACED_ASSET.name)
    expect(wdkAssetRegistry.getTokenByAddress(assetsToReplace[1].address, { chainId: 42161 })[0].name).toBe(assetsToReplace[1].name)
  })
})
