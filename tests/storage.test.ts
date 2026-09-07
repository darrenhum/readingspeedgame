import assert from 'node:assert/strict'
import { test } from 'node:test'
import { addResult, HISTORY_LIMIT, readHistory, readLargeText, saveHistory, saveLargeText } from '../src/storage.ts'

const result = { id: '1', passageId: 'alice', date: '2026-09-07', seconds: 60, wpm: 300, correct: 2, total: 3 }

test('history is newest first, bounded, immutable, and persists with preferences separately', () => {
  const previous = Object.getOwnPropertyDescriptor(globalThis, 'localStorage')
  const values = new Map<string, string>()
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => values.set(key, value) },
  })
  try {
    const history = Array.from({ length: HISTORY_LIMIT }, (_, index) => ({ ...result, id: String(index) }))
    const next = { ...result, id: 'new' }
    const updated = addResult(history, next)
    assert.equal(updated.length, HISTORY_LIMIT)
    assert.equal(updated[0], next)
    assert.equal(history[0].id, '0')
    assert.equal(saveHistory([next, ...history]), true)
    assert.equal(saveLargeText(true), true)
    assert.deepEqual(readHistory(), updated)
    assert.equal(readLargeText(), true)
    assert.equal(saveHistory([]), true)
    assert.deepEqual(readHistory(), [])
    assert.equal(readLargeText(), true)
  } finally {
    if (previous) Object.defineProperty(globalThis, 'localStorage', previous)
    else Reflect.deleteProperty(globalThis, 'localStorage')
  }
})

test('quota and blocked storage failures are reported without throwing', () => {
  const previous = Object.getOwnPropertyDescriptor(globalThis, 'localStorage')
  try {
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      value: { setItem() { throw new Error('Quota exceeded') } },
    })
    assert.equal(saveHistory([result]), false)
    assert.equal(saveLargeText(true), false)
    Object.defineProperty(globalThis, 'localStorage', { configurable: true, get() { throw new Error('Blocked') } })
    assert.equal(saveHistory([]), false)
    assert.equal(saveLargeText(false), false)
    assert.deepEqual(readHistory(), [])
    assert.equal(readLargeText(), false)
  } finally {
    if (previous) Object.defineProperty(globalThis, 'localStorage', previous)
    else Reflect.deleteProperty(globalThis, 'localStorage')
  }
})
