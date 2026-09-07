import type { Result } from './game.ts'

export const HISTORY_LIMIT = 30
const HISTORY_KEY = 'between-lines-history'
const LARGE_TEXT_KEY = 'between-lines-large-text'

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
    ).slice(0, HISTORY_LIMIT)
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
