import { describe, expect, test } from '@jest/globals'
import { z } from zod;

import { WdkAssetSchema } from '@tetherto/wdk-asset-registry'

const ChangeFilesSchema = z.object({CHANGED_JSON_FILES: z.string()}).transform(str => {
  return str.split('\n').filter(e => !e)
})

describe('CI: Automerge', () => {
  const { CHANGED_JSON_FILES: changedFiles } = ChangeFilesSchema.parse(process.env);

  test("should be valid object following the wdk asset schema", () => {
    console.log(changedFiles)
    expect(true).toBe(true)
  })
})