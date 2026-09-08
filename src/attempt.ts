import { countWords, scoreAttempt } from './game.ts'
import type { Passage, Result } from './game.ts'

export type Answers = Record<number, number>
export type Attempt =
  | { stage: 'select' }
  | { stage: 'ready'; passage: Passage; challengeDay?: string }
  | { stage: 'reading'; passage: Passage; started: number; challengeDay?: string }
  | { stage: 'quiz'; passage: Passage; milliseconds: number; answers: Answers; challengeDay?: string }
  | { stage: 'results'; passage: Passage; answers: Answers; result: Result }

export type AttemptAction =
  | { type: 'choose'; passage: Passage; challengeDay?: string }
  | { type: 'home' }
  | { type: 'start' | 'finish'; now: number }
  | { type: 'answer'; question: number; option: number }
  | { type: 'submit'; id: string; date: string; readingType?: Result['readingType'] }

export const isAttemptActive = (stage: Attempt['stage']) => stage === 'reading' || stage === 'quiz'
export const hasAllAnswers = (passage: Passage, answers: Answers) =>
  passage.questions.every((_, index) => answers[index] !== undefined)

export function transitionAttempt(attempt: Attempt, action: AttemptAction): Attempt {
  switch (action.type) {
    case 'choose':
      return { stage: 'ready', passage: action.passage, ...(action.challengeDay ? { challengeDay: action.challengeDay } : {}) }
    case 'home':
      return { stage: 'select' }
    case 'start':
      return attempt.stage === 'ready' && Number.isFinite(action.now)
        ? { ...attempt, stage: 'reading', started: action.now }
        : attempt
    case 'finish': {
      if (attempt.stage !== 'reading') return attempt
      const milliseconds = action.now - attempt.started
      return Number.isFinite(milliseconds) && milliseconds >= 1000
        ? { stage: 'quiz', passage: attempt.passage, milliseconds, answers: {},
          ...(attempt.challengeDay ? { challengeDay: attempt.challengeDay } : {}) }
        : attempt
    }
    case 'answer': {
      if (attempt.stage !== 'quiz' || !Number.isInteger(action.question)) return attempt
      const question = attempt.passage.questions[action.question]
      if (!question || !Number.isInteger(action.option) || action.option < 0 || action.option >= question.options.length) return attempt
      return { ...attempt, answers: { ...attempt.answers, [action.question]: action.option } }
    }
    case 'submit': {
      if (attempt.stage !== 'quiz' || !hasAllAnswers(attempt.passage, attempt.answers)) return attempt
      const { passage, answers, milliseconds } = attempt
      const correct = passage.questions.filter((question, index) => answers[index] === question.answer).length
      return {
        stage: 'results', passage, answers,
        result: {
          id: action.id, passageId: passage.id, date: action.date,
          ...(action.readingType ? { readingType: action.readingType } : {}),
          ...(attempt.challengeDay ? { challengeDay: attempt.challengeDay } : {}),
          ...scoreAttempt(countWords(passage.text), milliseconds, correct, passage.questions.length),
        },
      }
    }
  }
}
