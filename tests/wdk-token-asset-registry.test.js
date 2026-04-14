import { afterEach, beforeEach, describe, expect, test, } from '@jest/globals'

import { WdkTokenAssetRegistry } from '@tetherto/wdk-asset-registry'
import commonTokens from '@tetherto/wdk-asset-registry/assets/common-tokens'

const TEST_SYMBOL = 'usdt'
const TEST_CHAINID = '1'
const TEST_ADDRESS = '0xdAC17F958D2ee523a2206206994597C13D831ec7'
const TEST_ID = `${TEST_CHAINID}/${TEST_ADDRESS}`
const TEST_NEW_ASSET = {
  id: 'eip155:1/0x1111111111111111111111111111111111111111',
  address: '0x1111111111111111111111111111111111111111',
  symbol: 'TEST',
  name: 'Test Token',
  decimals: 18,
  chainId: '1',
  isNative: false,
  logoURI: 'https://example.com/test.png'
}
const TEST_REPLACED_ASSET = {
  id: TEST_ID,
  address: TEST_ADDRESS,
  symbol: 'USDT',
  name: 'Tether USD Updated',
  decimals: 6,
  chainId: '1',
  isNative: false,
  logoURI: 'https://example.com/usdt-updated.png'
}
const TEST_EXTRA_ASSET = {
  id: 'eip155:10/0x3333333333333333333333333333333333333333',
  address: '0x3333333333333333333333333333333333333333',
  symbol: 'EXTRA',
  name: 'Extra Token',
  decimals: 18,
  chainId: '10',
  isNative: false,
  logoURI: 'https://example.com/extra.png'
}

describe('wallet-token-asset-registry', () => {
  let wdkAssetRegistry

  beforeEach(() => {
    wdkAssetRegistry = new WdkTokenAssetRegistry(structuredClone(commonTokens))
  })

  afterEach(() => {
    wdkAssetRegistry = undefined
  })

  test('should load all common assets from the package export', () => {
    const assets = wdkAssetRegistry.getAllTokens()

    expect(Array.isArray(assets)).toBe(true)
    expect(assets.length).toBeGreaterThan(0)
  })

  test('should allow multiple asset sets in the constructor', () => {
    const registry = new WdkTokenAssetRegistry(
      structuredClone(commonTokens),
      [TEST_EXTRA_ASSET]
    )

    const assets = registry.getAllTokens()
    const [extraAsset] = registry.getTokenBySymbol(TEST_EXTRA_ASSET.symbol, {
      caseSensitive: false
    })

    expect(assets.length).toBe(commonTokens.length + 1)
    expect(extraAsset).toEqual(TEST_EXTRA_ASSET)
  })

  test('should get tokens by symbol', () => {
    const assets = wdkAssetRegistry.getTokenBySymbol(TEST_SYMBOL)

    expect(Array.isArray(assets)).toBe(true)
    expect(assets.length).toBeGreaterThan(0)

    for (const asset of assets) {
      expect(asset.symbol.toLowerCase()).toBe(TEST_SYMBOL)
    }
  })

  test('should support case sensitive symbol lookup', () => {
    expect(wdkAssetRegistry.getTokenBySymbol('USDT', { caseSensitive: true }).length).toBeGreaterThan(0)
    expect(wdkAssetRegistry.getTokenBySymbol(TEST_SYMBOL, { caseSensitive: true })).toEqual([])
  })

  test('should get tokens by ticker', () => {
    const assets = wdkAssetRegistry.getTokenByTicker(TEST_SYMBOL)

    expect(Array.isArray(assets)).toBe(true)

    const [asset] = assets

    expect(asset.symbol.toLowerCase()).toBe(TEST_SYMBOL)
    expect(assets).toContainEqual(expect.objectContaining({ address: TEST_ADDRESS, chainId: TEST_CHAINID }))
  })

  test('should get tokens by ticker as an alias of symbol lookup', () => {
    const assets = wdkAssetRegistry.getTokenByTicker('USDT', { caseSensitive: true })

    expect(Array.isArray(assets)).toBe(true)
    expect(assets.length).toBeGreaterThan(0)

    for (const asset of assets) {
      expect(asset.symbol).toBe('USDT')
    }
  })

  test('should return the same result for ticker and symbol lookup', () => {
    const byTicker = wdkAssetRegistry.getTokenByTicker(TEST_SYMBOL)
    const bySymbol = wdkAssetRegistry.getTokenBySymbol(TEST_SYMBOL)

    expect(byTicker).toEqual(bySymbol)
  })

  test('should get a token by id', () => {
    const asset = wdkAssetRegistry.getTokenById(TEST_ID)

    expect(asset).toEqual(expect.objectContaining({ id: TEST_ID, address: TEST_ADDRESS }))
  })

  test('should get tokens by address', () => {
    const assets = wdkAssetRegistry.getTokenByAddress(TEST_ADDRESS)

    expect(Array.isArray(assets)).toBe(true)
    expect(assets.length).toBeGreaterThan(0)

    const [asset] = assets

    expect(asset.symbol.toLowerCase()).toBe(TEST_SYMBOL)
    expect(asset.address).toBe(TEST_ADDRESS)
  })

  test('should support case sensitive address lookup', () => {
    expect(wdkAssetRegistry.getTokenByAddress(TEST_ADDRESS, { caseSensitive: true }).length).toBeGreaterThan(0)
    expect(wdkAssetRegistry.getTokenByAddress(TEST_ADDRESS.toLowerCase(), { caseSensitive: true })).toEqual([])
  })

  test('should get tokens by chain', () => {
    const assets = wdkAssetRegistry.getTokenByChain(TEST_CHAINID)

    expect(Array.isArray(assets)).toBe(true)
    expect(assets.length).toBeGreaterThan(0)

    for (const asset of assets) {
      expect(asset.chainId).toBe(TEST_CHAINID)
    }
  })

  test('should register a new asset', () => {
    const initialLength = wdkAssetRegistry.getAllTokens().length

    const result = wdkAssetRegistry.registerAsset(TEST_NEW_ASSET)
    const asset = wdkAssetRegistry.getTokenById(TEST_NEW_ASSET.id)

    expect(result).toBe(initialLength + 1)
    expect(asset).toEqual(TEST_NEW_ASSET)
  })

  test('should throw when registering a duplicate asset without force', () => {
    expect(() => wdkAssetRegistry.registerAsset(TEST_REPLACED_ASSET)).toThrow(
      'Asset already exists. Set force to `true` to replace it.'
    )
  })

  test('should replace an existing asset when force is true', () => {
    const result = wdkAssetRegistry.registerAsset(TEST_REPLACED_ASSET, true)
    const asset = wdkAssetRegistry.getTokenById(TEST_ID)

    expect(result).toBeGreaterThanOrEqual(0)
    expect(asset.name).toBe(TEST_REPLACED_ASSET.name)
    expect(asset.logoURI).toBe(TEST_REPLACED_ASSET.logoURI)
  })

  test('should register multiple assets', () => {
    const assetsToRegister = [
      TEST_NEW_ASSET,
      {
        ...TEST_NEW_ASSET,
        id: 'eip155:1/0x2222222222222222222222222222222222222222',
        address: '0x2222222222222222222222222222222222222222',
        symbol: 'TEST2',
        name: 'Test Token 2'
      }
    ]

    const result = wdkAssetRegistry.registerAssets(assetsToRegister)

    expect(result).toHaveLength(2)
    expect(wdkAssetRegistry.getTokenById(assetsToRegister[0].id)).toEqual(assetsToRegister[0])
    expect(wdkAssetRegistry.getTokenById(assetsToRegister[1].id)).toEqual(assetsToRegister[1])
  })

  test('should replace multiple existing assets when force is true', () => {
    const assetsToReplace = [
      TEST_REPLACED_ASSET,
      {
        id: '42161/0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
        address: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
        symbol: 'USDT',
        name: 'Tether USD Arbitrum Updated',
        decimals: 6,
        chainId: '42161',
        isNative: false,
        logoURI: 'https://example.com/usdt-arb-updated.png'
      }
    ]

    const result = wdkAssetRegistry.registerAssets(assetsToReplace, true)

    expect(result).toHaveLength(2)
    expect(wdkAssetRegistry.getTokenById(TEST_ID).name).toBe(TEST_REPLACED_ASSET.name)
    expect(wdkAssetRegistry.getTokenById(assetsToReplace[1].id).name).toBe(assetsToReplace[1].name)
  })
})
