export type Question = {
  prompt: string
  options: string[]
  answer: number
  explanation: string
}

export type Passage = {
  id: string
  title: string
  author: string
  year: string
  difficulty: string
  description: string
  source: string
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
