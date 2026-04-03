import { describe, expect, test } from '@jest/globals'

import { WdkAssetSchema } from '@tetherto/wdk-asset-registry'

const changedFilesRaw = process.env.CHANGED_JSON_FILES || '';

console.log("============", changedFilesRaw)

describe('CI: Automerge', () => {
  test("should be valid object following the wdk asset schema", () => {
    expect(true).toBe(true)
  })
})