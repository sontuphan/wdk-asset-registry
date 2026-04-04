import { describe, expect, test } from '@jest/globals'
import { z } from 'zod'

import { WdkAssetSchema } from '@tetherto/wdk-asset-registry'

const ChangedFileSchema = z.object({
  CHANGED_JSON_FILE: z.string()
})

describe('CI: Automerge', () => {
  const { CHANGED_JSON_FILE: changedFile } = ChangedFileSchema.parse(process.env)

  test("should be valid object against the wdk asset schema", async () => {
    const { default: entry } = await import(`../${changedFile}`, { with: { type: 'json' } })

    const data = WdkAssetSchema.parse(entry)

    expect(typeof data).toBe('object')
    expect(data).toBeDefined()
  })
})