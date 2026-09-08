import { useId } from 'react'
import type { Result } from './game'
import { passages } from './passages'
import { progressPoints, readingLabels } from './progress'
import type { ReadingType } from './progress'

const series: ReadingType[] = ['first', 'practice', 'unknown']

export default function ProgressCharts({ history }: { history: Result[] }) {
  const id = useId()
  const points = progressPoints(history)
  return (
    <section className="progress" aria-labelledby={`${id}-title`}>
      <h3 id={`${id}-title`}>Your progress</h3>
      <p className="muted">Speed and comprehension, side by side. Compare both: faster isn’t better if less stays with you. Different passages vary in difficulty.</p>
      {points.length === 0 ? <p className="empty-history">Complete a passage to start your progress charts.</p> : (
        <>
          <ul className="chart-legend" aria-label="Reading types">
            {series.filter((type) => points.some((point) => point.readingType === type)).map((type) => (
              <li key={type}><span className={`legend-marker series-${type}`} aria-hidden="true">{type === 'first' ? '●' : type === 'practice' ? '■' : '▲'}</span> {readingLabels[type]}</li>
            ))}
          </ul>
          {points.length === 1 && <p className="muted">Your first data point is here. Complete another passage to see a trend.</p>}
          <div className="chart-grid">
            {(['wpm', 'accuracy'] as const).map((metric) => {
              const title = metric === 'wpm' ? 'Reading speed (wpm)' : 'Comprehension (%)'
              const maximum = metric === 'accuracy' ? 100 : Math.max(50, Math.ceil(Math.max(...points.map((point) => point.wpm)) / 50) * 50)
              const x = (index: number) => points.length === 1 ? 260 : 65 + index * 390 / (points.length - 1)
              const y = (value: number) => 190 - value / maximum * 165
              return (
                <figure className="progress-chart" key={metric}>
                  <figcaption>{title}</figcaption>
                  <svg viewBox="0 0 480 235" role="img" aria-labelledby={`${id}-${metric}-title ${id}-${metric}-desc`}>
                    <title id={`${id}-${metric}-title`}>{title} over your last {points.length} reads</title>
                    <desc id={`${id}-${metric}-desc`}>Oldest to newest by attempt. Circles and solid lines show first reads; squares and dashed lines show repeat practice; triangles and dotted lines show unclassified earlier results. Exact values are in the progress data table below.</desc>
                    {[0, maximum / 2, maximum].map((tick) => (
                      <g key={tick}>
                        <line className="chart-gridline" x1="65" x2="455" y1={y(tick)} y2={y(tick)} />
                        <text x="57" y={y(tick) + 4} textAnchor="end">{tick}</text>
                      </g>
                    ))}
                    {series.map((type) => {
                      const matching = points.map((point, index) => ({ point, index })).filter(({ point }) => point.readingType === type)
                      return (
                        <g className={`series-${type}`} key={type}>
                          <polyline className="chart-line" points={matching.map(({ point, index }) => `${x(index)},${y(point[metric])}`).join(' ')} />
                          {matching.map(({ point, index }) => (
                            <g key={point.id}>
                              {type === 'first' ? <circle cx={x(index)} cy={y(point[metric])} r="4" /> :
                                type === 'practice' ? <rect x={x(index) - 4} y={y(point[metric]) - 4} width="8" height="8" /> :
                                  <path d={`M ${x(index)} ${y(point[metric]) - 5} l 5 9 h -10 Z`} />}
                            </g>
                          ))}
                        </g>
                      )
                    })}
                    <text x="65" y="214">Oldest</text>
                    <text x="455" y="214" textAnchor="end">Newest</text>
                    <text x="260" y="230" textAnchor="middle">Completed reads (attempt order)</text>
                  </svg>
                </figure>
              )
            })}
          </div>
          <details className="progress-data">
            <summary>View progress data table</summary>
            <div className="table-scroll" role="region" aria-label="Progress data" tabIndex={0}>
              <table>
                <caption>Saved reads, oldest to newest. Earlier results without a recorded reading type remain unclassified.</caption>
                <thead><tr><th scope="col">Read</th><th scope="col">Date</th><th scope="col">Passage</th><th scope="col">Type</th><th scope="col">WPM</th><th scope="col">Comprehension</th></tr></thead>
                <tbody>{points.map((point) => (
                  <tr key={point.id}>
                    <th scope="row">{point.attempt}</th>
                    <td>{new Date(point.date).toLocaleDateString()}</td>
                    <td>{passages.find((passage) => passage.id === point.passageId)?.title ?? 'Previous passage'}</td>
                    <td>{readingLabels[point.readingType]}</td>
                    <td>{point.wpm}</td>
                    <td>{point.accuracy}%</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </details>
        </>
      )}
    </section>
  )
}
