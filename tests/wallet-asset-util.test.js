import { describe, expect, test } from '@jest/globals'

import { getTokenByAddress, getTokenByTicker } from '@tetherto/wdk-asset-registry'

const TEST_TICKER = 'usdt'
const TEST_CHAINID = 1
const TEST_ADDRESS = '0xdAC17F958D2ee523a2206206994597C13D831ec7'

describe('wallet-asset-util', () => {
  test('should successfully fetch data by ticker', async () => {
    const data = await getTokenByTicker(TEST_TICKER) 

    expect(Array.isArray(data)).toBe(true)

    for (const usdt of data) {
      expect(usdt.symbol.toLowerCase()).toBe(TEST_TICKER)
    }    
  })

  test('should successfully fetch data by ticker with chainId', async () => {
    const data = await getTokenByTicker(TEST_TICKER, TEST_CHAINID) 

    expect(Array.isArray(data)).toBe(true)

    const [usdt] = data || []

    expect(usdt.symbol.toLowerCase()).toBe(TEST_TICKER)
    expect(usdt.chainId).toBe(TEST_CHAINID)
    expect(usdt.address).toBe(TEST_ADDRESS)
  })

  test('should successfully fetch data by address', async () => {
    const data = await getTokenByAddress(TEST_ADDRESS) 

    expect(Array.isArray(data)).toBe(true)

    const [usdt] = data || []

    expect(usdt.symbol.toLowerCase()).toBe(TEST_TICKER)
    expect(usdt.address).toBe(TEST_ADDRESS)
  })

  test('should successfully fetch data by address with chainId', async () => {
    const data = await getTokenByAddress(TEST_ADDRESS, TEST_CHAINID) 

    expect(Array.isArray(data)).toBe(true)

    const [usdt] = data || []

    expect(usdt.symbol.toLowerCase()).toBe(TEST_TICKER)
    expect(usdt.chainId).toBe(TEST_CHAINID)
    expect(usdt.address).toBe(TEST_ADDRESS)
  })
})