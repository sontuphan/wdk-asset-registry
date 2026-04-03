import { describe, expect, test } from '@jest/globals'
import { z } from 'zod'

import { WdkAssetSchema } from '@tetherto/wdk-asset-registry'

const ChangeFilesSchema = z.object({
  CHANGED_JSON_FILES: z.string().transform(str => {
    return str.split('\n').filter(e => !!e)
  })
})

describe('CI: Automerge', () => {
  const { CHANGED_JSON_FILES: changedFiles } = ChangeFilesSchema.parse(process.env)

  test('should change exactly one file', () => {
    expect(changedFiles).toHaveLength(1)
  })

  test("should be valid object against the wdk asset schema", async () => {
    const [changedFile] = changedFiles
    const { default: entry } = await import(`../${changedFile}`, { with: { type: 'json' } })

    const data = WdkAssetSchema.parse(entry)

    expect(typeof data).toBe('object')
    expect(data).toBeDefined()
  })
})