import assert from 'node:assert/strict'
import { test } from 'node:test'
import { progressPoints } from '../src/progress.ts'
import type { Result } from '../src/game.ts'

const result: Result = { id: '1', passageId: 'alice', date: '2026-09-08', seconds: 60, wpm: 300, correct: 2, total: 3 }

test('progress keeps speed and comprehension separate, oldest to newest, without mutating history', () => {
  const first: Result = { ...result, readingType: 'first' }
  const practice: Result = { ...result, id: '2', wpm: 400, correct: 1, readingType: 'practice' }
  const history = [practice, first]
  const points = progressPoints(history)
  assert.deepEqual(points.map(({ attempt, readingType, accuracy, wpm }) => ({ attempt, readingType, accuracy, wpm })), [
    { attempt: 1, readingType: 'first', accuracy: 67, wpm: 300 },
    { attempt: 2, readingType: 'practice', accuracy: 33, wpm: 400 },
  ])
  assert.deepEqual(history, [practice, first])
})

test('empty and single-point histories work; legacy results are never guessed to be first reads', () => {
  assert.deepEqual(progressPoints([]), [])
  assert.equal(progressPoints([result])[0].readingType, 'unknown')
  assert.equal(progressPoints([{ ...result, readingType: 'practice' }])[0].readingType, 'practice')
  assert.equal(progressPoints([{ ...result, correct: 0 }])[0].accuracy, 0)
  assert.equal(progressPoints([{ ...result, correct: 3 }])[0].accuracy, 100)
})
