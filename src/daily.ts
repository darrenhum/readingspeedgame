import type { Passage } from './game.ts'

export type DailyState = {
  tracking: boolean
  lastCompletedDay: string | null
  streak: number
}

export const emptyDailyState = (): DailyState => ({ tracking: false, lastCompletedDay: null, streak: 0 })

export function localDay(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function dayNumber(day: string): number {
  return Date.parse(`${day}T00:00:00Z`) / 86_400_000
}

export function isCalendarDay(value: unknown): value is string {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    Number.isFinite(dayNumber(value)) && new Date(dayNumber(value) * 86_400_000).toISOString().slice(0, 10) === value
}

export function dailyPassage(collection: Passage[], day: string): Passage | undefined {
  if (!collection.length || !isCalendarDay(day)) return undefined
  const ordered = [...collection].sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0)
  return ordered[((dayNumber(day) % ordered.length) + ordered.length) % ordered.length]
}

export function currentStreak(state: DailyState, today: string): number {
  if (!state.tracking || !state.lastCompletedDay) return 0
  const gap = dayNumber(today) - dayNumber(state.lastCompletedDay)
  return gap === 0 || gap === 1 ? state.streak : 0
}

export function completeDaily(state: DailyState, day: string): DailyState {
  if (!isCalendarDay(day) || (state.lastCompletedDay && day <= state.lastCompletedDay)) return state
  const consecutive = state.lastCompletedDay && dayNumber(day) - dayNumber(state.lastCompletedDay) === 1
  return {
    ...state,
    lastCompletedDay: day,
    streak: state.tracking ? (consecutive ? state.streak + 1 : 1) : 0,
  }
}

export function setStreakTracking(state: DailyState, tracking: boolean, today: string): DailyState {
  if (state.tracking === tracking) return state
  return { ...state, tracking, streak: tracking && state.lastCompletedDay === today ? 1 : 0 }
}
