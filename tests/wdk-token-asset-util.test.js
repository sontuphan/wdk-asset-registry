import { describe, expect, test } from '@jest/globals'

import {
  fromUniswapToken,
  fromUniswapTokenList
} from '@tetherto/wdk-asset-registry'

const UNISWAP_TOKEN = {
  chainId: 1,
  address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  symbol: 'USDT',
  name: 'Tether USD',
  decimals: 6,
  logoURI: 'https://example.com/usdt.png',
  tags: ['stablecoin'],
  extensions: {
    coingeckoId: 'tether'
  }
}

const CMC_DEFI_LIST = {
  name: 'CMC DeFi',
  timestamp: '2020-11-16T12:00:15+00:00',
  keywords: ['coinmarketcap', 'defi'],
  version: {
    major: 1,
    minor: 1,
    patch: 0
  },
  logoURI: 'https://example.com/cmc-defi.png',
  tokens: [
    {
      chainId: 1,
      address: '0x514910771af9ca656af840dff83e8264ecf986ca',
      symbol: 'LINK',
      name: 'Chainlink',
      decimals: 18
    },
    {
      chainId: 1,
      address: '0x04fa0d235c4abf4bcf4787af4cf447de572ef828',
      symbol: 'UMA',
      name: 'UMA',
      decimals: 18
    }
  ]
}

describe('wallet-token-asset-util', () => {
  test('should convert a uniswap token entry into a token asset', () => {
    const asset = fromUniswapToken(UNISWAP_TOKEN)

    expect(asset).toEqual({
      id: 'eip155:1/0xdAC17F958D2ee523a2206206994597C13D831ec7',
      address: UNISWAP_TOKEN.address,
      symbol: UNISWAP_TOKEN.symbol,
      name: UNISWAP_TOKEN.name,
      decimals: UNISWAP_TOKEN.decimals,
      chainId: 'eip155:1',
      isNative: false
    })
  })

  test('should port a cmc-style tokens array', () => {
    const assets = fromUniswapTokenList(CMC_DEFI_LIST.tokens)

    expect(assets).toHaveLength(2)
    expect(assets[0]).toEqual(expect.objectContaining({
      id: 'eip155:1/0x514910771af9ca656af840dff83e8264ecf986ca',
      chainId: 'eip155:1',
      symbol: 'LINK'
    }))
    expect(assets[1]).toEqual(expect.objectContaining({
      id: 'eip155:1/0x04fa0d235c4abf4bcf4787af4cf447de572ef828',
      chainId: 'eip155:1',
      symbol: 'UMA'
    }))
  })
})
