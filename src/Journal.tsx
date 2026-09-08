import type { Result } from './game'
import { passages } from './passages'
import { HISTORY_LIMIT } from './storage'
import ProgressCharts from './ProgressCharts'
import { readingLabels } from './progress'

export default function Journal({ history, onClear }: { history: Result[]; onClear: () => void }) {
  return (
    <section className="history" aria-labelledby="history-title">
      <div className="section-heading">
        <h2 id="history-title">Your reading journal</h2>
        {history.length > 0 && <button className="text-button" onClick={onClear}>Clear history</button>}
      </div>
      <p className="muted">Your last {HISTORY_LIMIT} reads, saved on this device only. No account. No syncing.</p>
      <ProgressCharts history={history} />
      {history.length === 0 ? <p className="empty-history">A fresh page. Your first result will appear here.</p> : (
        <ol className="history-list">{history.map((item) => (
          <li key={item.id}>
            <div><strong>{passages.find((passage) => passage.id === item.passageId)?.title ?? 'Previous passage'}</strong><small>{new Date(item.date).toLocaleDateString()} · {readingLabels[item.readingType ?? 'unknown']}{item.challengeDay && ` · Daily challenge ${item.challengeDay}`}</small></div>
            <span><b>{item.wpm}</b> wpm</span>
            <span><b>{Math.round(item.correct / item.total * 100)}%</b> recall</span>
          </li>
        ))}</ol>
      )}
    </section>
  )
}
