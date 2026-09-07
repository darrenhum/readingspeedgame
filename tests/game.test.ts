import assert from 'node:assert/strict'
import { test } from 'node:test'
import { countWords, scoreAttempt } from '../src/game.ts'
import { readHistory, readLargeText } from '../src/storage.ts'
import { passages } from '../src/passages.ts'

test('counts whitespace-delimited words without counting empty text', () => {
  assert.equal(countWords(' \n '), 0)
  assert.equal(countWords(' A daisy-chain\nand a watch. '), 5)
})

test('scores speed separately from comprehension and bounds tiny durations', () => {
  assert.deepEqual(scoreAttempt(300, 90_000, 2, 3), { seconds: 90, wpm: 200, correct: 2, total: 3 })
  assert.equal(scoreAttempt(10, 0, 0, 3).seconds, 1)
})

test('the collection contains ten distinct passages', () => {
  assert.equal(passages.length, 10)
  assert.equal(new Set(passages.map((passage) => passage.id)).size, passages.length)
  assert.equal(new Set(passages.map((passage) => passage.text)).size, passages.length)
})

test('every passage has usable content and unambiguous answer indices', () => {
  for (const passage of passages) {
    for (const field of ['id', 'title', 'author', 'year', 'difficulty', 'description', 'edition'] as const) {
      assert.ok(passage[field].trim().length > 0)
    }
    assert.ok(passage.initial.length > 0)
    assert.ok(['sage', 'rose', 'sand'].includes(passage.theme))
    assert.ok(countWords(passage.text) >= 100)
    assert.ok(passage.source.startsWith('https://'))
    assert.equal(passage.questions.length, 3)
    for (const question of passage.questions) {
      assert.ok(question.prompt.trim().length > 0)
      assert.equal(question.options.length, 4)
      assert.equal(new Set(question.options).size, 4)
      assert.ok(question.options.every((option) => option.trim().length > 0))
      assert.ok(Number.isInteger(question.answer))
      assert.ok(question.answer >= 0 && question.answer < 4)
      assert.ok(question.explanation.length > 20)
    }
  }
})

test('storage tolerates absent, malformed, invalid, oversized, and blocked data', () => {
  const previous = Object.getOwnPropertyDescriptor(globalThis, 'localStorage')
  let stored: string | null = null
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: { getItem: () => stored },
  })
  try {
    assert.deepEqual(readHistory(), [])
    for (const invalid of ['{', '{}', 'null', '[null, 1, "oops", {}]']) {
      stored = invalid
      assert.deepEqual(readHistory(), [])
    }
    const valid = { id: '1', passageId: 'alice', date: '2026-09-07', seconds: 60, wpm: 300, correct: 2, total: 3 }
    stored = JSON.stringify([valid, { ...valid, correct: 4 }, { ...valid, date: 'invalid' }])
    assert.deepEqual(readHistory(), [valid])
    stored = JSON.stringify(Array.from({ length: 40 }, () => valid))
    assert.equal(readHistory().length, 30)
    stored = 'true'
    assert.equal(readLargeText(), true)
    stored = 'false'
    assert.equal(readLargeText(), false)
    Object.defineProperty(globalThis, 'localStorage', { configurable: true, get() { throw new Error('Blocked') } })
    assert.deepEqual(readHistory(), [])
    assert.equal(readLargeText(), false)
  } finally {
    if (previous) Object.defineProperty(globalThis, 'localStorage', previous)
    else Reflect.deleteProperty(globalThis, 'localStorage')
  }
})
