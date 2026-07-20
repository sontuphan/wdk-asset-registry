import { describe, expect, test } from '@jest/globals'

import { TokenAssetJsonSchema, TokenAssetSchema } from '@tetherto/wdk-asset-registry'
import commonTokens from '@tetherto/wdk-asset-registry/assets/common-tokens'

const TEST_ASSET = {
  id: 'eip155:1/0xdAC17F958D2ee523a2206206994597C13D831ec7',
  address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  symbol: 'USDT',
  name: 'Tether USD',
  decimals: 6,
  chainId: 'eip155:1',
  isNative: false
}

describe('wallet-asset-schema', () => {
  test('should validate a valid asset', () => {
    const asset = TokenAssetSchema.parse(TEST_ASSET)

    expect(asset).toEqual(TEST_ASSET)
  })

  test('should validate a valid asset with a string chain id', () => {
    const asset = TokenAssetSchema.parse({
      ...TEST_ASSET,
      chainId: 'eip155:1'
    })

    expect(asset.chainId).toBe('eip155:1')
  })

  test('should validate a native asset without an address', () => {
    // Native coins (ETH, BTC, SOL, ...) have no contract address, so the build
    // script falls back to the bare chain id and omits the address field.
    const nativeAsset = {
      id: 'eip155:1',
      symbol: 'ETH',
      name: 'Ether',
      decimals: 18,
      chainId: 'eip155:1',
      isNative: true
    }

    const asset = TokenAssetSchema.parse(nativeAsset)

    expect(asset).toEqual(nativeAsset)
    expect(asset.address).toBeUndefined()
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
