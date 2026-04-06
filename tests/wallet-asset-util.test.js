import { describe, expect, test } from '@jest/globals'

import { getTokenByTicker } from '@tetherto/wdk-asset-registry'

const TEST_TICKER = 'usdt'

describe('wallet-asset-util', () => {
  test('should successfully fetch data', async () => {
    const data = await getTokenByTicker(TEST_TICKER) 

    expect(Array.isArray(data)).toBe(true)

    const [usdt] = data || []

    expect(usdt.symbol).toBe(TEST_TICKER)
  })
})