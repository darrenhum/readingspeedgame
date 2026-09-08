import type { Result } from './game.ts'

export type ReadingType = 'first' | 'practice' | 'unknown'
export const readingLabels: Record<ReadingType, string> = {
  first: 'First read',
  practice: 'Repeat practice',
  unknown: 'Earlier result (unclassified)',
}

export function progressPoints(history: Result[]) {
  return [...history].reverse().map((result, index) => ({
    ...result,
    attempt: index + 1,
    readingType: result.readingType ?? ('unknown' as const),
    accuracy: Math.round(result.correct / result.total * 100),
  }))
}
