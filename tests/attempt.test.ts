import assert from 'node:assert/strict'
import { test } from 'node:test'
import { isAttemptActive, transitionAttempt } from '../src/attempt.ts'
import type { Attempt } from '../src/attempt.ts'
import { countWords } from '../src/game.ts'
import { passages } from '../src/passages.ts'

const passage = passages[0]
const ready = (): Attempt => transitionAttempt({ stage: 'select' }, { type: 'choose', passage })
const quiz = (): Attempt => transitionAttempt(
  transitionAttempt(ready(), { type: 'start', now: 100 }),
  { type: 'finish', now: 60_100 },
)

test('timing rejects early finishes and duplicate starts/finishes', () => {
  const reading = transitionAttempt(ready(), { type: 'start', now: 100 })
  assert.equal(transitionAttempt(reading, { type: 'start', now: 500 }), reading)
  assert.equal(transitionAttempt(reading, { type: 'finish', now: 1099 }), reading)
  const finished = transitionAttempt(reading, { type: 'finish', now: 1100 })
  assert.equal(finished.stage, 'quiz')
  assert.equal(transitionAttempt(finished, { type: 'finish', now: 5000 }), finished)
  if (finished.stage === 'quiz') assert.equal(finished.milliseconds, 1000)
})

test('submission requires valid answers and produces only one result', () => {
  let attempt = quiz()
  const submit = { type: 'submit', id: 'result-1', date: '2026-09-07' } as const
  assert.equal(transitionAttempt(attempt, submit), attempt)
  for (const [question, option] of [[-1, 0], [0, -1], [0, 4], [0.5, 0], [0, NaN]]) {
    assert.equal(transitionAttempt(attempt, { type: 'answer', question, option }), attempt)
  }
  passage.questions.forEach((question, index) => {
    attempt = transitionAttempt(attempt, { type: 'answer', question: index, option: question.answer })
  })
  const completed = transitionAttempt(attempt, submit)
  assert.equal(completed.stage, 'results')
  if (completed.stage === 'results') {
    assert.deepEqual(completed.result, {
      id: 'result-1', date: '2026-09-07', passageId: passage.id,
      seconds: 60, wpm: countWords(passage.text), correct: 3, total: 3,
    })
  }
  assert.equal(transitionAttempt(completed, submit), completed)
  assert.equal(transitionAttempt(completed, { type: 'answer', question: 0, option: 0 }), completed)
})

test('abandoning and retrying discard answers, timing, and results', () => {
  const answered = transitionAttempt(quiz(), { type: 'answer', question: 0, option: 1 })
  assert.deepEqual(transitionAttempt(answered, { type: 'home' }), { stage: 'select' })
  assert.deepEqual(transitionAttempt(answered, { type: 'choose', passage }), ready())
  assert.equal(transitionAttempt({ stage: 'select' }, { type: 'start', now: 0 }).stage, 'select')
})

test('reading and quiz protect attempts from navigation and PWA updates', () => {
  for (const stage of ['select', 'ready', 'reading', 'quiz', 'results'] as const) {
    assert.equal(isAttemptActive(stage), stage === 'reading' || stage === 'quiz')
  }
})
