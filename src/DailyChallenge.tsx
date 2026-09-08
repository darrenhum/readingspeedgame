import { useEffect, useState } from 'react'
import { countWords } from './game'
import { passages } from './passages'
import { currentStreak, dailyPassage, localDay } from './daily'
import type { DailyState } from './daily'

type Props = {
  daily: DailyState
  onChoose: (id: string, day: string) => void
  onTracking: (enabled: boolean, day: string) => void
}

export default function DailyChallenge({ daily, onChoose, onTracking }: Props) {
  const [today, setToday] = useState(() => localDay())
  useEffect(() => {
    let timer: number
    function refresh() {
      const now = new Date()
      setToday(localDay(now))
      window.clearTimeout(timer)
      const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
      timer = window.setTimeout(refresh, midnight.getTime() - now.getTime())
    }
    refresh()
    window.addEventListener('focus', refresh)
    document.addEventListener('visibilitychange', refresh)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('focus', refresh)
      document.removeEventListener('visibilitychange', refresh)
    }
  }, [])

  const passage = dailyPassage(passages, today)
  if (!passage) return null
  const completed = daily.lastCompletedDay === today
  const streak = currentStreak(daily, today)

  return (
    <section className="daily-challenge" aria-labelledby="daily-title">
      <div className="section-heading">
        <h2 id="daily-title">Your daily reading challenge</h2>
        <time dateTime={today}>{today}</time>
      </div>
      <p className="muted">One featured passage each day, using your local date. Complete its quiz to mark the day — any score counts.</p>
      <h3>{passage.title}</h3>
      <p>{passage.description}</p>
      <p className="metadata">{countWords(passage.text)} words · {passage.questions.length} questions · {passage.category === 'classics' ? 'Classic excerpt' : 'News & information'}</p>
      <p role="status">{completed ? '✓ Today’s challenge completed.' : 'Today’s challenge is ready when you are.'}</p>
      <button className="button primary" onClick={() => onChoose(passage.id, today)}>
        {completed ? 'Practise today’s challenge' : 'Choose daily challenge'} →
      </button>
      <label className="text-toggle">
        <input type="checkbox" checked={daily.tracking} onChange={(event) => onTracking(event.target.checked, today)} />
        Track my daily streak on this device
      </label>
      {daily.tracking && <p className="practice-label" role="status">{streak} {streak === 1 ? 'day' : 'days'} in your current streak. {completed ? 'See you tomorrow.' : 'Complete today’s challenge to keep it going.'}</p>}
      <p className="muted daily-note">Streaks are optional. Turning tracking off resets the streak. A challenge finished after midnight counts toward the date you chose it.</p>
    </section>
  )
}
