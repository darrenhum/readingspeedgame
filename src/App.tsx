import { useEffect, useRef, useState } from 'react'
import { passages } from './passages'
import { countWords } from './game'
import { addResult, readHistory, readLargeText, saveHistory, saveLargeText } from './storage'
import { isAttemptActive, transitionAttempt } from './attempt'
import type { Attempt, AttemptAction } from './attempt'
import Quiz from './Quiz'
import Results from './Results'
import Journal from './Journal'
import PwaStatus from './PwaStatus'
import './App.css'

export default function App() {
  const [attempt, setAttempt] = useState<Attempt>({ stage: 'select' })
  const currentAttempt = useRef(attempt)
  const { stage } = attempt
  const selected = attempt.stage === 'select' ? passages[0] : attempt.passage
  const [history, setHistory] = useState(readHistory)
  const [largeText, setLargeText] = useState(readLargeText)
  const [notice, setNotice] = useState('')
  const heading = useRef<HTMLHeadingElement>(null)
  const active = isAttemptActive(stage)
  const words = countWords(selected.text)
  const attempted = history.some((item) => item.passageId === selected.id)

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

  function reportSave(saved: boolean) {
    if (!saved) {
      setNotice('Your browser could not save this change. Results remain available for this visit only.')
    }
  }

  function dispatch(action: AttemptAction) {
    const previous = currentAttempt.current
    const next = transitionAttempt(previous, action)
    if (next === previous) return null
    // Commit synchronously so repeated events cannot submit the same attempt twice.
    currentAttempt.current = next
    setAttempt(next)
    return next
  }

  function choose(id: string) {
    const passage = passages.find((item) => item.id === id)
    if (!passage) return
    dispatch({ type: 'choose', passage })
    setNotice('')
  }

  function start(now: number) {
    if (dispatch({ type: 'start', now })) setNotice('')
  }

  function finish(now: number) {
    if (currentAttempt.current.stage !== 'reading') return
    if (!dispatch({ type: 'finish', now })) {
      setNotice('Take at least a second to read before finishing.')
      return
    }
    setNotice('')
  }

  function submit() {
    const next = dispatch({ type: 'submit', id: crypto.randomUUID(), date: new Date().toISOString() })
    if (next?.stage !== 'results') return
    const updated = addResult(history, next.result)
    setHistory(updated)
    reportSave(saveHistory(updated))
  }

  function goHome() {
    if (isAttemptActive(currentAttempt.current.stage) && !window.confirm('Leave this attempt? Your unfinished result will not be saved.')) return
    dispatch({ type: 'home' })
    setNotice('')
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
              <p className="intro-copy">How fast do you read? How much stays with you?<br className="desktop-break" /> A few words from the classics. A little test of both.</p>
              <div className="how-it-works" aria-label="How to play">
                <span><b>1</b> Read a passage</span>
                <span><b>2</b> Test your recall</span>
                <span><b>3</b> Find your rhythm</span>
              </div>
            </section>
            <section aria-labelledby="passages-title">
              <div className="section-heading">
                <h2 id="passages-title">Pick your next read</h2>
                <span>{passages.length} classics · No sign-up</span>
              </div>
              <div className="passage-grid">
                {passages.map((passage, index) => (
                  <article className={`passage-card card-${passage.theme}`} key={passage.id}>
                    <div className="card-top"><span className="eyebrow">{passage.difficulty}</span><span aria-hidden="true">0{index + 1}</span></div>
                    <div className="book-mark" aria-hidden="true">{passage.initial}</div>
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
            </section>
            <Journal history={history} onClear={() => {
              if (window.confirm('Clear all saved results on this device?')) {
                setHistory([])
                reportSave(saveHistory([]))
              }
            }} />
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
                  <button className="button primary" onClick={() => start(performance.now())} disabled={stage === 'reading'}>{stage === 'reading' ? '● Timer running' : 'Start reading'}</button>
                  <label className="text-toggle"><input type="checkbox" checked={largeText} onChange={(event) => {
                    setLargeText(event.target.checked)
                    reportSave(saveLargeText(event.target.checked))
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
                    <button className="button primary end-button" onClick={() => finish(performance.now())}>End reading →</button>
                    <p className="muted center">Finished? The passage will disappear.</p>
                  </>
                )}
              </>
            )}

            {attempt.stage === 'quiz' && (
              <Quiz passage={attempt.passage} answers={attempt.answers}
                onAnswer={(question, option) => { dispatch({ type: 'answer', question, option }) }}
                onSubmit={submit} />
            )}

            {attempt.stage === 'results' && (
              <Results passage={attempt.passage} answers={attempt.answers} result={attempt.result}
                onHome={goHome} onPractice={() => choose(selected.id)} />
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
