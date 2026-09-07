export type Question = {
  prompt: string
  options: string[]
  answer: number
  explanation: string
}

export type PassageCategory = 'informational' | 'classics'

export type Passage = {
  id: string
  category: PassageCategory
  title: string
  author: string
  year: string
  difficulty: string
  description: string
  source?: string
  edition: string
  text: string
  questions: Question[]
}

export type Result = {
  id: string
  passageId: string
  date: string
  seconds: number
  wpm: number
  correct: number
  total: number
}

export const countWords = (text: string) => text.trim().split(/\s+/u).filter(Boolean).length

export function scoreAttempt(words: number, milliseconds: number, correct: number, total: number) {
  const seconds = Math.max(milliseconds / 1000, 1)
  return { seconds, wpm: Math.round(words * 60 / seconds), correct, total }
}

export function readHistory(): Result[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem('between-lines-history') ?? '[]')
    if (!Array.isArray(value)) return []
    return value.filter((item): item is Result =>
      !!item && typeof item === 'object' &&
      typeof item.id === 'string' && typeof item.passageId === 'string' &&
      typeof item.date === 'string' && Number.isFinite(Date.parse(item.date)) &&
      Number.isFinite(item.seconds) && item.seconds >= 1 &&
      Number.isInteger(item.wpm) && item.wpm >= 0 &&
      Number.isInteger(item.total) && item.total > 0 &&
      Number.isInteger(item.correct) && item.correct >= 0 && item.correct <= item.total,
    ).slice(0, 30)
  } catch {
    return []
  }
}

export function readLargeText(): boolean {
  try {
    return localStorage.getItem('between-lines-large-text') === 'true'
  } catch {
    return false
  }
}
