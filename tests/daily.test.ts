import assert from 'node:assert/strict'
import { test } from 'node:test'
import { completeDaily, currentStreak, dailyPassage, emptyDailyState, isCalendarDay, localDay, setStreakTracking } from '../src/daily.ts'
import { passages } from '../src/passages.ts'

test('daily passages rotate deterministically without depending on collection order', () => {
  const day = '2026-09-08'
  assert.equal(dailyPassage(passages, day), dailyPassage([...passages].reverse(), day))
  assert.notEqual(dailyPassage(passages, day), dailyPassage(passages, '2026-09-09'))
  assert.equal(new Set(Array.from({ length: passages.length }, (_, i) =>
    dailyPassage(passages, `2026-09-${String(i + 1).padStart(2, '0')}`)?.id)).size, passages.length)
  assert.equal(dailyPassage([], day), undefined)
  assert.equal(dailyPassage(passages, 'invalid'), undefined)
  assert.ok(dailyPassage(passages, '1969-12-31'))
})

test('day keys use local calendar dates and reject impossible dates', () => {
  assert.equal(localDay(new Date(2026, 8, 8, 0, 1)), '2026-09-08')
  assert.equal(localDay(new Date(2026, 8, 8, 23, 59)), '2026-09-08')
  assert.equal(isCalendarDay('2028-02-29'), true)
  for (const day of ['2026-02-29', '2026-04-31', '2026-13-01', '2026-9-8', '', null, 42]) {
    assert.equal(isCalendarDay(day), false)
  }
})

test('streaks are opt-in, count submissions once per day, and tolerate late submissions', () => {
  const initial = emptyDailyState()
  assert.equal(initial.tracking, false)
  const completed = completeDaily(initial, '2026-09-08')
  assert.equal(completed.streak, 0)
  assert.equal(currentStreak(completed, '2026-09-08'), 0)
  const enabled = setStreakTracking(completed, true, '2026-09-08')
  assert.equal(enabled.streak, 1)
  assert.equal(completeDaily(enabled, '2026-09-08'), enabled)
  assert.equal(completeDaily(enabled, '2026-09-07'), enabled)
  assert.equal(completeDaily(enabled, 'invalid'), enabled)
  const tomorrow = completeDaily(enabled, '2026-09-09')
  assert.equal(tomorrow.streak, 2)
  assert.equal(currentStreak(tomorrow, '2026-09-10'), 2)
  assert.equal(currentStreak(tomorrow, '2026-09-11'), 0)
  assert.equal(currentStreak(tomorrow, '2026-09-08'), 0)
  assert.equal(completeDaily(tomorrow, '2026-09-11').streak, 1)
  const disabled = setStreakTracking(tomorrow, false, '2026-09-09')
  assert.equal(disabled.streak, 0)
  assert.equal(disabled.lastCompletedDay, '2026-09-09')
  assert.equal(setStreakTracking(disabled, true, '2026-09-10').streak, 0)
})

test('consecutive calendar days work across month, year, leap day and DST boundaries', () => {
  for (const [first, second] of [
    ['2026-12-31', '2027-01-01'],
    ['2028-02-28', '2028-02-29'],
    ['2028-02-29', '2028-03-01'],
    ['2026-03-08', '2026-03-09'],
    ['2026-11-01', '2026-11-02'],
  ]) {
    const state = completeDaily({ ...emptyDailyState(), tracking: true }, first)
    assert.equal(completeDaily(state, second).streak, 2)
  }
})
