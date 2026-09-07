import type { Answers } from './attempt'
import { countWords } from './game'
import type { Passage, Result } from './game'

type Props = {
  passage: Passage
  answers: Answers
  result: Result
  onHome: () => void
  onPractice: () => void
}

export default function Results({ passage, answers, result, onHome, onPractice }: Props) {
  return (
    <>
      <p className="quiz-intro">Speed is only half the story. Here’s how your reading and recall came together.</p>
      <div className="score-grid">
        <div className="score-card"><span className="eyebrow">READING SPEED</span><strong>{result.wpm}</strong><span>words per minute</span></div>
        <div className="score-card"><span className="eyebrow">COMPREHENSION</span><strong>{Math.round(result.correct / result.total * 100)}<small>%</small></strong><span>{result.correct} of {result.total} correct</span></div>
      </div>
      <p className="muted center">{countWords(passage.text)} words in {result.seconds.toFixed(1)} seconds. Reading speed = words ÷ minutes.<br />A personal snapshot, not a standardized assessment.</p>
      <h2 className="review-title">Between the answers</h2>
      {passage.questions.map((question, index) => (
        <article className="answer-review" key={index}>
          <p className={`answer-status ${answers[index] === question.answer ? 'correct' : ''}`}>{answers[index] === question.answer ? '✓ Correct' : '↳ Room to revisit'}</p>
          <h3>{index + 1}. {question.prompt}</h3>
          <p>Your answer: {question.options[answers[index]]}</p>
          {answers[index] !== question.answer && <p><strong>Correct answer: {question.options[question.answer]}</strong></p>}
          <p className="muted">{question.explanation}</p>
        </article>
      ))}
      <div className="result-actions">
        <button className="button primary" onClick={onHome}>Choose another passage →</button>
        <button className="button" onClick={onPractice}>Practice this passage</button>
      </div>
      <details className="source-note"><summary>About this excerpt</summary><p>{passage.edition}. Public domain in the United States. <a href={passage.source} target="_blank" rel="noreferrer">Read the original source ↗</a> (Internet required.)</p></details>
    </>
  )
}
