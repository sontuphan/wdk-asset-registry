import { describe, expect, test } from '@jest/globals'
import { z } from 'zod'

import { WdkAssetListSchema } from '@tetherto/wdk-asset-registry'

const ChangedFileSchema = z.object({
  CHANGED_JSON_FILE: z.string()
})

describe('ci: automerge', () => {
  const { CHANGED_JSON_FILE: changedFile } = ChangedFileSchema.parse(process.env)

  test("should be valid object against the wdk asset schema", async () => {
    const { default: entry } = await import(`../${changedFile}`, { with: { type: 'json' } })

    const data = WdkAssetListSchema.parse(entry)
    
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBeGreaterThan(0)
  })
})