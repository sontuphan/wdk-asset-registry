import { describe, expect, test } from '@jest/globals'

import {
  TokenAssetJsonSchema,
  TokenAssetListJsonSchema,
  TokenAssetListSchema,
  TokenAssetSchema
} from '@tetherto/wdk-asset-registry'
import commonAssets from '@tetherto/wdk-asset-registry/assets/common'

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

describe('wallet-asset-schema', () => {
  test('should validate a valid asset', () => {
    const asset = TokenAssetSchema.parse(TEST_ASSET)

    expect(asset).toEqual(TEST_ASSET)
  })

  test('should reject an asset with invalid logo uri', () => {
    const invalidAsset = {
      ...TEST_ASSET,
      logoURI: 'https://example.com/usdt'
    }

    expect(() => TokenAssetSchema.parse(invalidAsset)).toThrow('URL must be a valid image url.')
  })

  test('should validate a list of assets', () => {
    const assets = TokenAssetListSchema.parse([TEST_ASSET])

    expect(assets).toHaveLength(1)
    expect(assets[0]).toEqual(TEST_ASSET)
  })

  test('should export a JSON schema for a single asset', () => {
    expect(TokenAssetJsonSchema.type).toBe('object')
    expect(TokenAssetJsonSchema.properties.symbol.type).toBe('string')
    expect(TokenAssetJsonSchema.properties.decimals.type).toBe('integer')
  })

  test('should export a JSON schema for an asset list', () => {
    expect(TokenAssetListJsonSchema.type).toBe('array')
    expect(TokenAssetListJsonSchema.items.type).toBe('object')
    expect(TokenAssetListJsonSchema.items.properties.address.type).toBe('string')
  })

  test('should validate common assets from the package export', () => {
    const assets = TokenAssetListSchema.parse(commonAssets)

    expect(assets.length).toBeGreaterThanOrEqual(1)
  })
})
