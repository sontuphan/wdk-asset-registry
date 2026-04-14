import { describe, expect, test } from '@jest/globals'

import { TokenAssetJsonSchema, TokenAssetSchema } from '@tetherto/wdk-asset-registry'
import commonTokens from '@tetherto/wdk-asset-registry/assets/common-tokens'

const TEST_ASSET = {
  id: '1/0xdAC17F958D2ee523a2206206994597C13D831ec7',
  address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  symbol: 'USDT',
  name: 'Tether USD',
  decimals: 6,
  chainId: '1',
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

  test('should validate a valid asset with a string chain id', () => {
    const asset = TokenAssetSchema.parse({
      ...TEST_ASSET,
      chainId: '1'
    })

    expect(asset.chainId).toBe('1')
  })

  test('should reject an asset with invalid logo uri', () => {
    const invalidAsset = {
      ...TEST_ASSET,
      logoURI: 'https://example.com/usdt'
    }

    expect(() => TokenAssetSchema.parse(invalidAsset)).toThrow('URL must be a valid image url.')
  })

  test('should export a JSON schema for a single asset', () => {
    expect(TokenAssetJsonSchema.type).toBe('object')
    expect(TokenAssetJsonSchema.properties.symbol.type).toBe('string')
    expect(TokenAssetJsonSchema.properties.decimals.type).toBe('integer')
  })

  test('should validate common assets from the package export', () => {
    for (const commonAsset of commonTokens) {
      const asset = TokenAssetSchema.parse(commonAsset)

      expect(typeof asset).toBe('object')
    }
  })
})
