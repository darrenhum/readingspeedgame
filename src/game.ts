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
  initial: string
  theme: 'sage' | 'rose' | 'sand'
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
  readingType?: 'first' | 'practice'
  challengeDay?: string
}

export const countWords = (text: string) => text.trim().split(/\s+/u).filter(Boolean).length

export function scoreAttempt(words: number, milliseconds: number, correct: number, total: number) {
  const seconds = Math.max(milliseconds / 1000, 1)
  return { seconds, wpm: Math.round(words * 60 / seconds), correct, total }
}
