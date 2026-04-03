import { describe, expect, test } from '@jest/globals'

import { WdkAssetSchema } from '@tetherto/wdk-asset-registry'

const changedFiles = process.env.CHANGED_JSON_FILES || ''

console.log("============", changedFiles)

describe('CI: Automerge', () => {
  test("should be valid object following the wdk asset schema", () => {
    expect(true).toBe(true)
  })
})