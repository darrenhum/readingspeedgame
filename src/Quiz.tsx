import { hasAllAnswers } from './attempt'
import type { Answers } from './attempt'
import type { Passage } from './game'

type Props = {
  passage: Passage
  answers: Answers
  onAnswer: (question: number, option: number) => void
  onSubmit: () => void
}

export default function Quiz({ passage, answers, onAnswer, onSubmit }: Props) {
  return (
    <form onSubmit={(event) => { event.preventDefault(); onSubmit() }}>
      <p className="quiz-intro">No peeking. Choose one answer for each question. Take your time — the clock has stopped.</p>
      {passage.questions.map((question, index) => (
        <fieldset key={index}>
          <legend><span className="question-number">{index + 1}.</span> {question.prompt}</legend>
          {question.options.map((option, optionIndex) => (
            <label className={`answer-option${answers[index] === optionIndex ? ' chosen' : ''}`} key={option}>
              <input type="radio" name={`question-${index}`} value={optionIndex} checked={answers[index] === optionIndex} onChange={() => onAnswer(index, optionIndex)} required />
              <span>{option}</span>
            </label>
          ))}
        </fieldset>
      ))}
      <p className="muted" aria-live="polite">{Object.keys(answers).length} of {passage.questions.length} answered</p>
      <button className="button primary" type="submit" disabled={!hasAllAnswers(passage, answers)}>See my results →</button>
    </form>
  )
}
