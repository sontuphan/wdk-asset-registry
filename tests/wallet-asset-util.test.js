import { describe, expect, test } from '@jest/globals'

import { getTokenByTicker } from '@tetherto/wdk-asset-registry'

const TEST_TICKER = 'usdt'
const TEST_CHAINID = 1

describe('wallet-asset-util', () => {
  test('should successfully fetch data', async () => {
    const data = await getTokenByTicker(TEST_TICKER) 

    expect(Array.isArray(data)).toBe(true)

    const [usdt] = data || []

    expect(usdt.symbol.toLowerCase()).toBe(TEST_TICKER)
  })

  test('should successfully fetch data with chainId', async () => {
    const data = await getTokenByTicker(TEST_TICKER, TEST_CHAINID) 

    expect(Array.isArray(data)).toBe(true)

    const [usdt] = data || []

    expect(usdt.symbol.toLowerCase()).toBe(TEST_TICKER)
    expect(usdt.chainId).toBe(TEST_CHAINID)
  })
})