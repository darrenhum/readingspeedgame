import assert from 'node:assert/strict'
import { test } from 'node:test'
import { addResult, HISTORY_LIMIT, readDaily, readHistory, readLargeText, readPassageIds, saveDaily, saveHistory, saveLargeText, savePassageIds } from '../src/storage.ts'
import { emptyDailyState } from '../src/daily.ts'

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
    assert.equal(saveDaily(emptyDailyState()), false)
    assert.equal(savePassageIds(['alice']), false)
    Object.defineProperty(globalThis, 'localStorage', { configurable: true, get() { throw new Error('Blocked') } })
    assert.equal(saveHistory([]), false)
    assert.equal(saveLargeText(false), false)
    assert.deepEqual(readHistory(), [])
    assert.equal(readLargeText(), false)
    assert.deepEqual(readDaily(), emptyDailyState())
    assert.deepEqual(readPassageIds([result]), ['alice'])
    assert.equal(saveDaily(emptyDailyState()), false)
    assert.equal(savePassageIds([]), false)
  } finally {
    if (previous) Object.defineProperty(globalThis, 'localStorage', previous)
    else Reflect.deleteProperty(globalThis, 'localStorage')
  }
})

test('daily settings and read identities survive reload and history eviction', () => {
  const previous = Object.getOwnPropertyDescriptor(globalThis, 'localStorage')
  const values = new Map<string, string>()
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => values.set(key, value) },
  })
  try {
    assert.deepEqual(readDaily(), emptyDailyState())
    assert.deepEqual(readPassageIds([result]), ['alice'])
    const daily = { tracking: true, lastCompletedDay: '2026-09-08', streak: 4 }
    assert.equal(saveDaily(daily), true)
    assert.deepEqual(readDaily(), daily)
    assert.equal(savePassageIds(['alice', 'alice', 'pride']), true)
    const history = Array.from({ length: HISTORY_LIMIT }, (_, index) => ({ ...result, id: String(index), passageId: 'pride' }))
    saveHistory(history)
    assert.deepEqual(readPassageIds(readHistory()), ['alice', 'pride'])
    const enriched = { ...result, readingType: 'practice' as const, challengeDay: '2026-09-08' }
    saveHistory([enriched, result])
    assert.deepEqual(readHistory(), [enriched, result])
    saveHistory([])
    savePassageIds([])
    saveDaily(emptyDailyState())
    assert.deepEqual(readHistory(), [])
    assert.deepEqual(readPassageIds([]), [])
    assert.deepEqual(readDaily(), emptyDailyState())
  } finally {
    if (previous) Object.defineProperty(globalThis, 'localStorage', previous)
    else Reflect.deleteProperty(globalThis, 'localStorage')
  }
})

test('new storage readers validate malformed data and preserve usable legacy results', () => {
  const previous = Object.getOwnPropertyDescriptor(globalThis, 'localStorage')
  let stored = ''
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: { getItem: () => stored } })
  try {
    for (const invalid of ['{', '{}', 'null', '42', '[]',
      '{"tracking":true,"lastCompletedDay":"2026-02-30","streak":1}',
      '{"tracking":true,"lastCompletedDay":null,"streak":2}',
      '{"tracking":false,"lastCompletedDay":"2026-09-08","streak":2}',
      '{"tracking":true,"lastCompletedDay":"2026-09-08","streak":-1}']) {
      stored = invalid
      assert.deepEqual(readDaily(), emptyDailyState())
    }
    stored = '["alice", null, 2, "", "alice"]'
    assert.deepEqual(readPassageIds([result]), ['alice'])
    stored = JSON.stringify([{ ...result, readingType: 'made-up', challengeDay: '2026-02-30' }])
    assert.deepEqual(readHistory(), [result])
  } finally {
    if (previous) Object.defineProperty(globalThis, 'localStorage', previous)
    else Reflect.deleteProperty(globalThis, 'localStorage')
  }
})
