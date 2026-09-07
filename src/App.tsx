import { useEffect, useRef, useState } from 'react'
import { passages } from './passages'
import { countWords, readHistory, readLargeText, scoreAttempt } from './game'
import type { PassageCategory, Result } from './game'
import PwaStatus from './PwaStatus'
import './App.css'

type Stage = 'select' | 'ready' | 'reading' | 'quiz' | 'results'

const categories: { id: PassageCategory; label: string; description: string }[] = [
  { id: 'informational', label: 'News & information', description: 'Original fictional news, memos, research summaries, and guides. Practise accuracy with details, instructions, and evidence — not real news or research.' },
  { id: 'classics', label: 'Classic excerpts', description: 'Novel excerpts and a timeless fable. Enjoy the language and see what stays with you.' },
]

export default function App() {
  const [stage, setStage] = useState<Stage>('select')
  const [category, setCategory] = useState<PassageCategory>('informational')
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const [selected, setSelected] = useState(passages[0])
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [history, setHistory] = useState(readHistory)
  const [largeText, setLargeText] = useState(readLargeText)
  const [result, setResult] = useState<Result | null>(null)
  const [notice, setNotice] = useState('')
  const started = useRef<number | null>(null)
  const duration = useRef(0)
  const submitted = useRef(false)
  const heading = useRef<HTMLHeadingElement>(null)
  const active = stage === 'reading' || stage === 'quiz'
  const words = countWords(selected.text)
  const attempted = history.some((item) => item.passageId === selected.id)
  const complete = selected.questions.every((_, index) => answers[index] !== undefined)

  useEffect(() => {
    if (stage !== 'select') heading.current?.focus()
    window.scrollTo(0, 0)
  }, [stage])

  useEffect(() => {
    if (!active) return
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [active])

  function save(key: string, value: unknown) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      setNotice('Your browser could not save this change. Results remain available for this visit only.')
    }
  }

  function choose(id: string) {
    const passage = passages.find((item) => item.id === id)
    if (!passage) return
    setSelected(passage)
    setAnswers({})
    setResult(null)
    setNotice('')
    started.current = null
    submitted.current = false
    duration.current = 0
    setStage('ready')
  }

  function start() {
    if (started.current !== null || stage !== 'ready') return
    started.current = performance.now()
    setNotice('')
    setStage('reading')
  }

  function finish() {
    if (started.current === null) return
    const elapsed = performance.now() - started.current
    if (elapsed < 1000) {
      setNotice('Take at least a second to read before finishing.')
      return
    }
    duration.current = elapsed
    started.current = null
    setNotice('')
    setStage('quiz')
  }

  function submit() {
    if (!complete || submitted.current || stage !== 'quiz') return
    submitted.current = true
    const correct = selected.questions.filter((question, index) => answers[index] === question.answer).length
    const next: Result = {
      id: crypto.randomUUID(),
      passageId: selected.id,
      date: new Date().toISOString(),
      ...scoreAttempt(words, duration.current, correct, selected.questions.length),
    }
    const updated = [next, ...history].slice(0, 30)
    setHistory(updated)
    save('between-lines-history', updated)
    setResult(next)
    setStage('results')
  }

  function goHome() {
    if (active && !window.confirm('Leave this attempt? Your unfinished result will not be saved.')) return
    started.current = null
    setNotice('')
    setStage('select')
    window.setTimeout(() => heading.current?.focus(), 0)
  }

  return (
    <div className="site">
      <a className="skip-link" href="#main">Skip to game</a>
      <header className="masthead">
        <button className="wordmark" onClick={goHome} aria-label="Between the Lines — choose a passage">
          <span className="brand-icon" aria-hidden="true">≋</span> Between the Lines<span className="brand-dot">.</span>
        </button>
        <span className="masthead-note">A small daily pleasure. At your own pace.</span>
      </header>

      <main id="main">
        {stage === 'select' ? (
          <>
            <section className="intro">
              <p className="eyebrow">THE READING ROOM</p>
              <h1 ref={heading} tabIndex={-1}>Quick mind.<br /><em>Careful reader.</em></h1>
              <p className="intro-copy">How fast do you read? How much stays with you?<br className="desktop-break" /> Everyday information and classic stories. A little test of both.</p>
              <div className="how-it-works" aria-label="How to play">
                <span><b>1</b> Read a passage</span>
                <span><b>2</b> Test your recall</span>
                <span><b>3</b> Find your rhythm</span>
              </div>
            </section>
            <section aria-labelledby="passages-title">
              <div className="section-heading">
                <h2 id="passages-title">Pick your next read</h2>
                <span>{passages.filter((passage) => passage.category === category).length} passages · No sign-up</span>
              </div>
              <div className="passage-tabs" role="tablist" aria-label="Passage categories">
                {categories.map((item, index) => (
                  <button
                    key={item.id}
                    ref={(element) => { tabs.current[index] = element }}
                    id={`tab-${item.id}`}
                    role="tab"
                    aria-selected={category === item.id}
                    aria-controls={`panel-${item.id}`}
                    tabIndex={category === item.id ? 0 : -1}
                    onClick={() => setCategory(item.id)}
                    onKeyDown={(event) => {
                      let next: number
                      if (event.key === 'ArrowRight') next = (index + 1) % categories.length
                      else if (event.key === 'ArrowLeft') next = (index + categories.length - 1) % categories.length
                      else if (event.key === 'Home') next = 0
                      else if (event.key === 'End') next = categories.length - 1
                      else return
                      event.preventDefault()
                      setCategory(categories[next].id)
                      tabs.current[next]?.focus()
                    }}
                  >{item.label}</button>
                ))}
              </div>
              {categories.map((item) => (
                <div key={item.id} id={`panel-${item.id}`} role="tabpanel" aria-labelledby={`tab-${item.id}`} hidden={category !== item.id} tabIndex={0}>
                  <p className="muted category-description">{item.description}</p>
                  <div className="passage-grid">
                {passages.filter((passage) => passage.category === item.id).map((passage, index) => (
                  <article className={`passage-card card-${index % 3}`} key={passage.id}>
                    <div className="card-top"><span className="eyebrow">{passage.difficulty}</span><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span></div>
                    <div className="book-mark" aria-hidden="true">{passage.id === 'aesop' ? 'Æ' : passage.title[0]}</div>
                    <h3>{passage.title}</h3>
                    <p className="author">{passage.author} · {passage.year}</p>
                    <p className="card-description">{passage.description}</p>
                    <p className="metadata">{countWords(passage.text)} words <span>·</span> {passage.questions.length} questions</p>
                    <button className="button" onClick={() => choose(passage.id)}>
                      {history.some((item) => item.passageId === passage.id) ? 'Read again · Practice' : 'Choose passage'} <span aria-hidden="true">↗</span>
                    </button>
                  </article>
                ))}
                  </div>
                </div>
              ))}
            </section>
            <section className="history" aria-labelledby="history-title">
              <div className="section-heading">
                <h2 id="history-title">Your reading journal</h2>
                {history.length > 0 && <button className="text-button" onClick={() => {
                  if (window.confirm('Clear all saved results on this device?')) {
                    setHistory([])
                    save('between-lines-history', [])
                  }
                }}>Clear history</button>}
              </div>
              <p className="muted">Your last 30 reads, saved on this device only. No account. No syncing.</p>
              {history.length === 0 ? <p className="empty-history">A fresh page. Your first result will appear here.</p> : (
                <ol className="history-list">{history.map((item) => (
                  <li key={item.id}>
                    <div><strong>{passages.find((passage) => passage.id === item.passageId)?.title ?? 'Previous passage'}</strong><small>{new Date(item.date).toLocaleDateString()}</small></div>
                    <span><b>{item.wpm}</b> wpm</span>
                    <span><b>{Math.round(item.correct / item.total * 100)}%</b> recall</span>
                  </li>
                ))}</ol>
              )}
            </section>
          </>
        ) : (
          <section className="game-panel" aria-label="Reading challenge">
            <div className="game-top">
              <button className="text-button" onClick={goHome}>← All passages</button>
              <span className="eyebrow">{stage === 'results' ? 'YOUR RESULTS' : stage === 'quiz' ? '02 / RECALL' : '01 / READ'}</span>
            </div>
            <h1 ref={heading} tabIndex={-1}>{stage === 'quiz' ? 'What stayed with you?' : stage === 'results' ? 'A read well spent.' : selected.title}</h1>
            <p className="muted">{selected.author} · {words} words · {selected.questions.length} questions</p>

            {(stage === 'ready' || stage === 'reading') && (
              <>
                <div className="reading-controls">
                  <button className="button primary" onClick={start} disabled={stage === 'reading'}>{stage === 'reading' ? '● Timer running' : 'Start reading'}</button>
                  <label className="text-toggle"><input type="checkbox" checked={largeText} onChange={(event) => {
                    setLargeText(event.target.checked)
                    save('between-lines-large-text', event.target.checked)
                  }} /> Larger text</label>
                </div>
                {stage === 'ready' ? (
                  <div className="ready-placeholder">
                    <span className="placeholder-icon" aria-hidden="true">¶</span>
                    <h2>A moment of focus.</h2>
                    <p>Your passage appears when you press Start.<br />Read naturally, then press End below the text.</p>
                    <p className="muted">The text disappears before the questions.<br />The timer keeps running if you switch tabs.</p>
                    {attempted && <p className="practice-label">Practice read — you’ve completed this passage before.</p>}
                  </div>
                ) : (
                  <>
                    <article className={`reading-text${largeText ? ' large-text' : ''}`} aria-label={selected.title}>
                      {selected.text.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                    </article>
                    <button className="button primary end-button" onClick={finish}>End reading →</button>
                    <p className="muted center">Finished? The passage will disappear.</p>
                  </>
                )}
              </>
            )}

            {stage === 'quiz' && (
              <form onSubmit={(event) => { event.preventDefault(); submit() }}>
                <p className="quiz-intro">No peeking. Choose one answer for each question. Take your time — the clock has stopped.</p>
                {selected.questions.map((question, index) => (
                  <fieldset key={index}>
                    <legend><span className="question-number">{index + 1}.</span> {question.prompt}</legend>
                    {question.options.map((option, optionIndex) => (
                      <label className={`answer-option${answers[index] === optionIndex ? ' chosen' : ''}`} key={option}>
                        <input type="radio" name={`question-${index}`} value={optionIndex} checked={answers[index] === optionIndex} onChange={() => setAnswers({ ...answers, [index]: optionIndex })} required />
                        <span>{option}</span>
                      </label>
                    ))}
                  </fieldset>
                ))}
                <p className="muted" aria-live="polite">{Object.keys(answers).length} of {selected.questions.length} answered</p>
                <button className="button primary" type="submit" disabled={!complete}>See my results →</button>
              </form>
            )}

            {stage === 'results' && result && (
              <>
                <p className="quiz-intro">Speed is only half the story. Here’s how your reading and recall came together.</p>
                <div className="score-grid">
                  <div className="score-card"><span className="eyebrow">READING SPEED</span><strong>{result.wpm}</strong><span>words per minute</span></div>
                  <div className="score-card"><span className="eyebrow">COMPREHENSION</span><strong>{Math.round(result.correct / result.total * 100)}<small>%</small></strong><span>{result.correct} of {result.total} correct</span></div>
                </div>
                <p className="muted center">{words} words in {result.seconds.toFixed(1)} seconds. Reading speed = words ÷ minutes.<br />A personal snapshot, not a standardized assessment.</p>
                <h2 className="review-title">Between the answers</h2>
                {selected.questions.map((question, index) => (
                  <article className="answer-review" key={index}>
                    <p className={`answer-status ${answers[index] === question.answer ? 'correct' : ''}`}>{answers[index] === question.answer ? '✓ Correct' : '↳ Room to revisit'}</p>
                    <h3>{index + 1}. {question.prompt}</h3>
                    <p>Your answer: {question.options[answers[index]]}</p>
                    {answers[index] !== question.answer && <p><strong>Correct answer: {question.options[question.answer]}</strong></p>}
                    <p className="muted">{question.explanation}</p>
                  </article>
                ))}
                <div className="result-actions">
                  <button className="button primary" onClick={goHome}>Choose another passage →</button>
                  <button className="button" onClick={() => choose(selected.id)}>Practice this passage</button>
                </div>
                <details className="source-note"><summary>About this passage</summary><p>{selected.edition}.{selected.category === 'classics' && ' Public domain in the United States.'}{selected.source && <> <a href={selected.source} target="_blank" rel="noreferrer">Read the original source ↗</a> (Internet required.)</>}</p></details>
              </>
            )}
          </section>
        )}
        {notice && <p className="notice" role="status">{notice}</p>}
      </main>
      <footer>
        <PwaStatus active={active} />
        <div className="footer-bottom"><span>Between the Lines.</span><span>Read for the pleasure. Stay for the challenge.</span></div>
      </footer>
    </div>
  )
}
