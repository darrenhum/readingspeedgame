import type { Passage } from './game.ts'

export const passages: Passage[] = [
  {
    id: 'alice',
    title: 'Alice’s Adventures in Wonderland',
    author: 'Lewis Carroll',
    year: '1865',
    difficulty: 'CURIOUS & PLAYFUL',
    description: 'An ordinary afternoon takes a rather extraordinary turn.',
    source: 'https://www.gutenberg.org/ebooks/11',
    edition: 'Chapter I, opening three paragraphs. Project Gutenberg #11, Millennium Fulcrum Edition 3.0',
    text: `Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, 'and what is the use of a book,' thought Alice 'without pictures or conversations?'

So she was considering in her own mind (as well as she could, for the hot day made her feel very sleepy and stupid), whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her.

There was nothing so VERY remarkable in that; nor did Alice think it so VERY much out of the way to hear the Rabbit say to itself, 'Oh dear! Oh dear! I shall be late!' (when she thought it over afterwards, it occurred to her that she ought to have wondered at this, but at the time it all seemed quite natural); but when the Rabbit actually TOOK A WATCH OUT OF ITS WAISTCOAT-POCKET, and looked at it, and then hurried on, Alice started to her feet, for it flashed across her mind that she had never before seen a rabbit with either a waistcoat-pocket, or a watch to take out of it, and burning with curiosity, she ran across the field after it, and fortunately was just in time to see it pop down a large rabbit-hole under the hedge.`,
    questions: [
      {
        prompt: 'What bothered Alice about her sister’s book?',
        options: ['It was written in another language.', 'It had no pictures or conversations.', 'It was too heavy to hold.', 'She had already read it.'],
        answer: 1,
        explanation: 'Alice wonders what use a book is “without pictures or conversations.”',
      },
      {
        prompt: 'What was Alice considering before the Rabbit appeared?',
        options: ['Swimming in the river', 'Taking a nap under a tree', 'Making a daisy-chain', 'Reading her own book'],
        answer: 2,
        explanation: 'She weighs the pleasure of making a daisy-chain against the effort of picking the daisies.',
      },
      {
        prompt: 'What finally made Alice jump to her feet and follow the Rabbit?',
        options: ['It called her name.', 'It offered her a flower.', 'It asked her for directions.', 'It took a watch from its waistcoat-pocket.'],
        answer: 3,
        explanation: 'The talking initially seems natural to Alice. The watch and waistcoat-pocket are what spark her curiosity.',
      },
    ],
  },
  {
    id: 'pride',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    year: '1813',
    difficulty: 'WIT & OBSERVATION',
    description: 'A new neighbour, a handsome fortune, and a very interested mother.',
    source: 'https://www.gutenberg.org/ebooks/1342',
    edition: 'Chapter 1, opening through “What a fine thing for our girls!” Project Gutenberg #1342. Plain-text emphasis markers omitted',
    text: `It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.

However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters.

"My dear Mr. Bennet," said his lady to him one day, "have you heard that Netherfield Park is let at last?"

Mr. Bennet replied that he had not.

"But it is," returned she; "for Mrs. Long has just been here, and she told me all about it."

Mr. Bennet made no answer.

"Do you not want to know who has taken it?" cried his wife impatiently.

"You want to tell me, and I have no objection to hearing it."

This was invitation enough.

"Why, my dear, you must know, Mrs. Long says that Netherfield is taken by a young man of large fortune from the north of England; that he came down on Monday in a chaise and four to see the place, and was so much delighted with it, that he agreed with Mr. Morris immediately; that he is to take possession before Michaelmas, and some of his servants are to be in the house by the end of next week."

"What is his name?"

"Bingley."

"Is he married or single?"

"Oh! Single, my dear, to be sure! A single man of large fortune; four or five thousand a year. What a fine thing for our girls!"`,
    questions: [
      {
        prompt: 'Who told Mrs. Bennet that Netherfield Park had been let?',
        options: ['Mrs. Long', 'Mr. Bingley', 'Mr. Bennet', 'One of her daughters'],
        answer: 0,
        explanation: 'Mrs. Bennet says Mrs. Long “has just been here, and she told me all about it.”',
      },
      {
        prompt: 'What annual income is reported for the new tenant?',
        options: ['One thousand a year', 'Ten thousand a year', 'Four or five thousand a year', 'No amount is mentioned'],
        answer: 2,
        explanation: 'Mrs. Bennet describes Bingley as having “four or five thousand a year.”',
      },
      {
        prompt: 'Why does Mrs. Bennet likely consider this news good for her girls?',
        options: ['He will employ them as servants.', 'He could be a wealthy marriage prospect.', 'He is giving away his fortune.', 'He is a long-lost relative.'],
        answer: 1,
        explanation: 'The opening links wealthy single men with marriage. Her excitement about his being single and rich suggests a prospective husband for a daughter.',
      },
    ],
  },
  {
    id: 'aesop',
    title: 'The Hare and the Tortoise',
    author: 'Aesop',
    year: '1867 translation',
    difficulty: 'SHORT & STEADY',
    description: 'Two unlikely rivals. One timeless lesson about getting there.',
    source: 'https://www.gutenberg.org/ebooks/21',
    edition: 'Complete fable, translated by George Fyler Townsend (1814–1900). Project Gutenberg #21',
    text: `A HARE one day ridiculed the short feet and slow pace of the Tortoise, who replied, laughing: "Though you be swift as the wind, I will beat you in a race." The Hare, believing her assertion to be simply impossible, assented to the proposal; and they agreed that the Fox should choose the course and fix the goal. On the day appointed for the race the two started together. The Tortoise never for a moment stopped, but went on with a slow but steady pace straight to the end of the course. The Hare, lying down by the wayside, fell fast asleep. At last waking up, and moving as fast as he could, he saw the Tortoise had reached the goal, and was comfortably dozing after her fatigue.

Slow but steady wins the race.`,
    questions: [
      {
        prompt: 'Who was chosen to set the course and finish line?',
        options: ['The Lion', 'The Fox', 'The Hare', 'The Tortoise'],
        answer: 1,
        explanation: 'They agree that the Fox should “choose the course and fix the goal.”',
      },
      {
        prompt: 'What was the Tortoise doing when the Hare finally reached the goal?',
        options: ['Still walking toward it', 'Celebrating with the Fox', 'Comfortably dozing', 'Waiting impatiently'],
        answer: 2,
        explanation: 'The Hare sees that the Tortoise has already arrived and is “comfortably dozing after her fatigue.”',
      },
      {
        prompt: 'Which contrast best explains the result of the race?',
        options: ['Steady effort beat overconfidence.', 'A shortcut beat the longer route.', 'Outside help beat individual effort.', 'Speed beat patience.'],
        answer: 0,
        explanation: 'The Tortoise never stops, while the confident Hare falls asleep. This supports the moral: “Slow but steady wins the race.”',
      },
    ],
  },
]
