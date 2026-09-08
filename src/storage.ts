import type { Result } from './game.ts'
import { emptyDailyState, isCalendarDay } from './daily.ts'
import type { DailyState } from './daily.ts'

export const HISTORY_LIMIT = 30
const HISTORY_KEY = 'between-lines-history'
const LARGE_TEXT_KEY = 'between-lines-large-text'
const DAILY_KEY = 'between-lines-daily'
const READ_PASSAGES_KEY = 'between-lines-read-passages'

export const isGameStorageKey = (key: string | null) =>
  key === null || [HISTORY_KEY, LARGE_TEXT_KEY, DAILY_KEY, READ_PASSAGES_KEY].includes(key)

export function isLocalStorageArea(area: Storage | null): boolean {
  try {
    return area === localStorage
  } catch {
    return false
  }
}

export function addResult(history: Result[], result: Result): Result[] {
  return [result, ...history].slice(0, HISTORY_LIMIT)
}

export function readHistory(): Result[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(HISTORY_KEY) ?? '[]')
    if (!Array.isArray(value)) return []
    return value.filter((item): item is Result =>
      !!item && typeof item === 'object' &&
      typeof item.id === 'string' && typeof item.passageId === 'string' &&
      typeof item.date === 'string' && Number.isFinite(Date.parse(item.date)) &&
      Number.isFinite(item.seconds) && item.seconds >= 1 &&
      Number.isInteger(item.wpm) && item.wpm >= 0 &&
      Number.isInteger(item.total) && item.total > 0 &&
      Number.isInteger(item.correct) && item.correct >= 0 && item.correct <= item.total,
    ).slice(0, HISTORY_LIMIT).map((item) => {
      const { readingType, challengeDay, ...result } = item
      return {
        ...result,
        ...(readingType === 'first' || readingType === 'practice' ? { readingType } : {}),
        ...(isCalendarDay(challengeDay) ? { challengeDay } : {}),
      }
    })
  } catch {
    return []
  }
}

export function readLargeText(): boolean {
  try {
    return localStorage.getItem(LARGE_TEXT_KEY) === 'true'
  } catch {
    return false
  }
}

export function readDaily(): DailyState {
  try {
    const value = JSON.parse(localStorage.getItem(DAILY_KEY) ?? 'null')
    if (value && typeof value.tracking === 'boolean' &&
      (value.lastCompletedDay === null || isCalendarDay(value.lastCompletedDay)) &&
      Number.isSafeInteger(value.streak) && value.streak >= 0 &&
      ((value.tracking && value.lastCompletedDay !== null) || value.streak === 0)) {
      return { tracking: value.tracking, lastCompletedDay: value.lastCompletedDay, streak: value.streak }
    }
  } catch {
    return emptyDailyState()
  }
  return emptyDailyState()
}

export function readPassageIds(history: Result[]): string[] {
  let saved: string[] = []
  try {
    const value: unknown = JSON.parse(localStorage.getItem(READ_PASSAGES_KEY) ?? '[]')
    if (Array.isArray(value)) saved = value.filter((id): id is string => typeof id === 'string' && id.length > 0)
  } catch {
    // Existing history still identifies repeat reads when storage is unavailable.
  }
  return [...new Set([...saved, ...history.map((result) => result.passageId)])]
}

function save(key: string, value: unknown): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export const saveHistory = (history: Result[]) => save(HISTORY_KEY, history.slice(0, HISTORY_LIMIT))
export const saveLargeText = (largeText: boolean) => save(LARGE_TEXT_KEY, largeText)
export const saveDaily = (daily: DailyState) => save(DAILY_KEY, daily)
export const savePassageIds = (ids: string[]) => save(READ_PASSAGES_KEY, [...new Set(ids)])
