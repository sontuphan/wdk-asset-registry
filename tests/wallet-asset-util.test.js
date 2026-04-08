import { afterEach, beforeEach, describe, expect, jest, test } from '@jest/globals'

import { getAllTokens, getTokenByAddress, getTokenByTicker } from '@tetherto/wdk-asset-registry'

const TEST_BASE = 'https://raw.githubusercontent.com/sontuphan/wdk-asset-registry'
const TEST_ASSETS = [
  {
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    symbol: 'USDT',
    name: 'Tether USD',
    decimals: 6,
    chainId: 1,
    isNative: false,
    logoURI: 'https://example.com/usdt.png'
  },
  {
    address: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
    symbol: 'USDT',
    name: 'Tether USD',
    decimals: 6,
    chainId: 42161,
    isNative: false,
    logoURI: 'https://example.com/usdt.png'
  }
]
const [TEST_ASSET] = TEST_ASSETS

describe('wallet-asset-util', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('should successfully fetch all tokens', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => TEST_ASSETS
    })

    const data = await getAllTokens()

    expect(global.fetch).toHaveBeenCalledWith(
      `${TEST_BASE}/refs/heads/public/cache/all.json`
    )
    expect(Array.isArray(data)).toBe(true)
    expect(data).toEqual(TEST_ASSETS)
  })

  test('should successfully fetch data by ticker', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => TEST_ASSETS
    })

    const data = await getTokenByTicker(TEST_ASSET.symbol.toLowerCase())

    expect(global.fetch).toHaveBeenCalledWith(
      `${TEST_BASE}/refs/heads/public/assets/usdt.json`
    )
    expect(Array.isArray(data)).toBe(true)

    for (const usdt of data) {
      expect(usdt.symbol.toLowerCase()).toBe(TEST_ASSET.symbol.toLowerCase())
    }
  })

  test('should successfully fetch data by ticker with chainId', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => TEST_ASSETS
    })

    const data = await getTokenByTicker(TEST_ASSET.symbol.toLowerCase(), TEST_ASSET.chainId)

    expect(Array.isArray(data)).toBe(true)

    const [usdt] = data || []

    expect(usdt.symbol.toLowerCase()).toBe(TEST_ASSET.symbol.toLowerCase())
    expect(usdt.chainId).toBe(TEST_ASSET.chainId)
    expect(usdt.address).toBe(TEST_ASSET.address)
  })

  test('should successfully fetch data by address', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => TEST_ASSETS
    })

    const data = await getTokenByAddress(TEST_ASSET.address)

    expect(global.fetch).toHaveBeenCalledWith(
      `${TEST_BASE}/refs/heads/public/cache/0xdac17f958d2ee523a2206206994597c13d831ec7.json`
    )
    expect(Array.isArray(data)).toBe(true)

    const [usdt] = data || []

    expect(usdt.symbol.toLowerCase()).toBe(TEST_ASSET.symbol.toLowerCase())
    expect(usdt.address).toBe(TEST_ASSET.address)
  })

  test('should successfully fetch data by address with chainId', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => TEST_ASSETS
    })

    const data = await getTokenByAddress(TEST_ASSET.address, TEST_ASSET.chainId)

    expect(Array.isArray(data)).toBe(true)

    const [usdt] = data || []

    expect(usdt.symbol.toLowerCase()).toBe(TEST_ASSET.symbol.toLowerCase())
    expect(usdt.chainId).toBe(TEST_ASSET.chainId)
    expect(usdt.address).toBe(TEST_ASSET.address)
  })
})
