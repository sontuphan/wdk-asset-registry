import { describe, expect, test } from '@jest/globals'
import {
  WdkAssetJsonSchema,
  WdkAssetListJsonSchema,
  WdkAssetListSchema,
  WdkAssetSchema
} from '@tetherto/wdk-asset-registry'

const TEST_ASSET = {
  address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  symbol: 'USDT',
  name: 'Tether USD',
  decimals: 6,
  chainId: 1,
  isNative: false,
  logoURI: 'https://example.com/usdt.png',
  tags: [
    'stablecoin',
    {
      name: 'bridge',
      description: 'Bridged asset'
    }
  ],
  extensions: {
    coingeckoId: 'tether'
  }
}

describe('wallet-asset', () => {
  test('should validate a valid asset', () => {
    const asset = WdkAssetSchema.parse(TEST_ASSET)

    expect(asset).toEqual(TEST_ASSET)
  })

  test('should reject an asset with invalid logo uri', () => {
    const invalidAsset = {
      ...TEST_ASSET,
      logoURI: 'https://example.com/usdt'
    }

    expect(() => WdkAssetSchema.parse(invalidAsset)).toThrow('URL must be a valid image url.')
  })

  test('should validate a list of assets', () => {
    const assets = WdkAssetListSchema.parse([TEST_ASSET])

    expect(assets).toHaveLength(1)
    expect(assets[0]).toEqual(TEST_ASSET)
  })

  test('should export a JSON schema for a single asset', () => {
    expect(WdkAssetJsonSchema.type).toBe('object')
    expect(WdkAssetJsonSchema.properties.symbol.type).toBe('string')
    expect(WdkAssetJsonSchema.properties.decimals.type).toBe('integer')
  })

  test('should export a JSON schema for an asset list', () => {
    expect(WdkAssetListJsonSchema.type).toBe('array')
    expect(WdkAssetListJsonSchema.items.type).toBe('object')
    expect(WdkAssetListJsonSchema.items.properties.address.type).toBe('string')
  })
})
