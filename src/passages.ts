import type { Passage } from './game.ts'
import { informationalPassages } from './informationalPassages.ts'

export const passages: Passage[] = [
  {
    id: 'alice',
    category: 'classics',
    initial: 'A',
    theme: 'sage',
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
    category: 'classics',
    initial: 'P',
    theme: 'rose',
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
    category: 'classics',
    initial: 'Æ',
    theme: 'sand',
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
  {
    id: 'oz',
    category: 'classics',
    initial: 'O',
    theme: 'sand',
    title: 'The Wonderful Wizard of Oz',
    author: 'L. Frank Baum',
    year: '1900',
    difficulty: 'PRAIRIE & POSSIBILITY',
    description: 'Dorothy’s small Kansas home stands in a landscape faded by sun and rain.',
    source: 'https://www.gutenberg.org/ebooks/55',
    edition: 'Chapter 1, “The Cyclone,” opening two paragraphs. Project Gutenberg #55, GITenberg 55.txt',
    text: `Dorothy lived in the midst of the great Kansas prairies, with Uncle Henry, who was a farmer, and Aunt Em, who was the farmer's wife. Their house was small, for the lumber to build it had to be carried by wagon many miles. There were four walls, a floor and a roof, which made one room; and this room contained a rusty looking cookstove, a cupboard for the dishes, a table, three or four chairs, and the beds. Uncle Henry and Aunt Em had a big bed in one corner, and Dorothy a little bed in another corner. There was no garret at all, and no cellar--except a small hole dug in the ground, called a cyclone cellar, where the family could go in case one of those great whirlwinds arose, mighty enough to crush any building in its path. It was reached by a trap door in the middle of the floor, from which a ladder led down into the small, dark hole.

When Dorothy stood in the doorway and looked around, she could see nothing but the great gray prairie on every side. Not a tree nor a house broke the broad sweep of flat country that reached to the edge of the sky in all directions. The sun had baked the plowed land into a gray mass, with little cracks running through it. Even the grass was not green, for the sun had burned the tops of the long blades until they were the same gray color to be seen everywhere. Once the house had been painted, but the sun blistered the paint and the rains washed it away, and now the house was as dull and gray as everything else.`,
    questions: [
      {
        prompt: 'Why was Dorothy’s house small?',
        options: ['The family wanted space for a garden.', 'The lumber had to travel many miles by wagon.', 'A storm had destroyed most of it.', 'Uncle Henry had sold the other rooms.'],
        answer: 1,
        explanation: 'The passage directly explains that the house was small because its building lumber had to be carried many miles by wagon.',
      },
      {
        prompt: 'How could the family reach the cyclone cellar?',
        options: ['Through a door behind the stove', 'By stairs outside the house', 'Through a trap door and down a ladder', 'Along a tunnel from the barn'],
        answer: 2,
        explanation: 'A trap door in the middle of the floor opened onto a ladder leading down into the cellar.',
      },
      {
        prompt: 'What had happened to the house’s paint?',
        options: ['The sun blistered it and rain washed it away.', 'Uncle Henry covered it with gray paint.', 'Dorothy scraped it off the walls.', 'Dust concealed its bright colors.'],
        answer: 0,
        explanation: 'The final sentence says the sun blistered the paint and the rains washed it away.',
      },
    ],
  },
  {
    id: 'secret-garden',
    category: 'classics',
    initial: 'S',
    theme: 'rose',
    title: 'The Secret Garden',
    author: 'Frances Hodgson Burnett',
    year: '1911',
    difficulty: 'QUIET & OBSERVANT',
    description: 'Mary discovers a hidden garden woven with bare rose branches.',
    source: 'https://www.gutenberg.org/ebooks/113',
    edition: 'Chapter IX, “The Strangest House Any One Ever Lived In,” opening paragraph. Project Gutenberg #113, GITenberg 113.txt',
    text: `It was the sweetest, most mysterious-looking place any one could imagine. The high walls which shut it in were covered with the leafless stems of climbing roses which were so thick that they were matted together. Mary Lennox knew they were roses because she had seen a great many roses in India. All the ground was covered with grass of a wintry brown and out of it grew clumps of bushes which were surely rosebushes if they were alive. There were numbers of standard roses which had so spread their branches that they were like little trees. There were other trees in the garden, and one of the things which made the place look strangest and loveliest was that climbing roses had run all over them and swung down long tendrils which made light swaying curtains, and here and there they had caught at each other or at a far-reaching branch and had crept from one tree to another and made lovely bridges of themselves. There were neither leaves nor roses on them now and Mary did not know whether they were dead or alive, but their thin gray or brown branches and sprays looked like a sort of hazy mantle spreading over everything, walls, and trees, and even brown grass, where they had fallen from their fastenings and run along the ground. It was this hazy tangle from tree to tree which made it all look so mysterious. Mary had thought it must be different from other gardens which had not been left all by themselves so long; and indeed it was different from any other place she had ever seen in her life.`,
    questions: [
      {
        prompt: 'How did Mary recognize the plants as roses?',
        options: ['She read labels beside the bushes.', 'A gardener identified them for her.', 'She recognized their open flowers.', 'She had seen many roses in India.'],
        answer: 3,
        explanation: 'The excerpt says Mary knew they were roses because she had seen a great many in India.',
      },
      {
        prompt: 'What formed the garden’s “lovely bridges”?',
        options: ['Wooden walkways over ponds', 'Rose tendrils reaching between trees', 'Stone arches along the walls', 'Rows of flowering shrubs'],
        answer: 1,
        explanation: 'The climbing roses caught on branches and crept from one tree to another, making bridges of themselves.',
      },
      {
        prompt: 'What was Mary uncertain about as she examined the roses?',
        options: ['Whether they belonged to her', 'Whether they had ever flowered', 'Whether they were dead or alive', 'Whether they came from India'],
        answer: 2,
        explanation: 'There were no leaves or roses on the branches, and Mary did not know whether the plants were dead or alive.',
      },
    ],
  },
  {
    id: 'willows',
    category: 'classics',
    initial: 'W',
    theme: 'sage',
    title: 'The Wind in the Willows',
    author: 'Kenneth Grahame',
    year: '1908',
    difficulty: 'SPRING & ESCAPE',
    description: 'Mole abandons his spring-cleaning for the world above ground.',
    source: 'https://www.gutenberg.org/ebooks/289',
    edition: 'Chapter I, “The River Bank,” opening paragraph. Project Gutenberg #289, GITenberg 289.txt',
    text: `The Mole had been working very hard all the morning, spring-cleaning his little home. First with brooms, then with dusters; then on ladders and steps and chairs, with a brush and a pail of whitewash; till he had dust in his throat and eyes, and splashes of whitewash all over his black fur, and an aching back and weary arms. Spring was moving in the air above and in the earth below and around him, penetrating even his dark and lowly little house with its spirit of divine discontent and longing. It was small wonder, then, that he suddenly flung down his brush on the floor, said 'Bother!' and 'O blow!' and also 'Hang spring-cleaning!' and bolted out of the house without even waiting to put on his coat. Something up above was calling him imperiously, and he made for the steep little tunnel which answered in his case to the gavelled carriage-drive owned by animals whose residences are nearer to the sun and air. So he scraped and scratched and scrabbled and scrooged and then he scrooged again and scrabbled and scratched and scraped, working busily with his little paws and muttering to himself, 'Up we go! Up we go!' till at last, pop! his snout came out into the sunlight, and he found himself rolling in the warm grass of a great meadow.`,
    questions: [
      {
        prompt: 'What had Mole been doing all morning?',
        options: ['Spring-cleaning his home', 'Planting a meadow', 'Repairing a carriage-drive', 'Searching for his coat'],
        answer: 0,
        explanation: 'The opening sentence says Mole had been working hard all morning, spring-cleaning his little home.',
      },
      {
        prompt: 'What did Mole leave without putting on?',
        options: ['His boots', 'His gloves', 'His hat', 'His coat'],
        answer: 3,
        explanation: 'He bolted out of the house “without even waiting to put on his coat.”',
      },
      {
        prompt: 'Where did Mole emerge after climbing the tunnel?',
        options: ['Inside another animal’s house', 'In the warm grass of a meadow', 'On the bank of a frozen river', 'In a dusty road beside a carriage'],
        answer: 1,
        explanation: 'At the end of the excerpt, his snout comes into sunlight and he rolls in the warm grass of a great meadow.',
      },
    ],
  },
  {
    id: 'treasure-island',
    category: 'classics',
    initial: 'T',
    theme: 'sand',
    title: 'Treasure Island',
    author: 'Robert Louis Stevenson',
    year: '1883',
    difficulty: 'SEAFARING & SUSPENSE',
    description: 'A scarred old sailor arrives at the Admiral Benbow inn.',
    source: 'https://www.gutenberg.org/ebooks/120',
    edition: 'Part One, Chapter 1, “The Old Sea-dog at the Admiral Benbow,” opening through “up at our signboard.” Project Gutenberg #120, GITenberg 120.txt',
    text: `SQUIRE TRELAWNEY, Dr. Livesey, and the rest of these gentlemen having asked me to write down the whole particulars about Treasure Island, from the beginning to the end, keeping nothing back but the bearings of the island, and that only because there is still treasure not yet lifted, I take up my pen in the year of grace 17__ and go back to the time when my father kept the Admiral Benbow inn and the brown old seaman with the sabre cut first took up his lodging under our roof.

I remember him as if it were yesterday, as he came plodding to the inn door, his sea-chest following behind him in a hand-barrow--a tall, strong, heavy, nut-brown man, his tarry pigtail falling over the shoulder of his soiled blue coat, his hands ragged and scarred, with black, broken nails, and the sabre cut across one cheek, a dirty, livid white. I remember him looking round the cover and whistling to himself as he did so, and then breaking out in that old sea-song that he sang so often afterwards:

"Fifteen men on the dead man's chest--
Yo-ho-ho, and a bottle of rum!"

in the high, old tottering voice that seemed to have been tuned and broken at the capstan bars. Then he rapped on the door with a bit of stick like a handspike that he carried, and when my father appeared, called roughly for a glass of rum. This, when it was brought to him, he drank slowly, like a connoisseur, lingering on the taste and still looking about him at the cliffs and up at our signboard.`,
    questions: [
      {
        prompt: 'Why does the narrator withhold the island’s bearings?',
        options: ['He has forgotten the route.', 'The island has no safe landing place.', 'Some treasure still remains there.', 'His father forbade him to describe it.'],
        answer: 2,
        explanation: 'He keeps back the bearings only because “there is still treasure not yet lifted.”',
      },
      {
        prompt: 'How was the sailor’s sea-chest brought to the inn?',
        options: ['In a hand-barrow', 'On the sailor’s shoulder', 'On the back of a horse', 'In a fishing boat'],
        answer: 0,
        explanation: 'The narrator remembers the sailor’s sea-chest following behind him in a hand-barrow.',
      },
      {
        prompt: 'What did the sailor request when the narrator’s father appeared?',
        options: ['A room with a sea view', 'A new blue coat', 'Directions to the harbor', 'A glass of rum'],
        answer: 3,
        explanation: 'After knocking on the door, the sailor called roughly for a glass of rum.',
      },
    ],
  },
  {
    id: 'moby-dick',
    category: 'classics',
    initial: 'M',
    theme: 'sage',
    title: 'Moby-Dick; or, The Whale',
    author: 'Herman Melville',
    year: '1851',
    difficulty: 'REFLECTIVE & RESTLESS',
    description: 'Ishmael explains why a troubled mood sends him back to sea.',
    source: 'https://www.gutenberg.org/ebooks/2701',
    edition: 'Chapter 1, “Loomings,” opening paragraph. Project Gutenberg #2701, GITenberg 2701.txt',
    text: `Call me Ishmael. Some years ago--never mind how long precisely--having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people's hats off--then, I account it high time to get to sea as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the ship. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the ocean with me.`,
    questions: [
      {
        prompt: 'What does the narrator ask the reader to call him?',
        options: ['Cato', 'Ishmael', 'Ahab', 'Queequeg'],
        answer: 1,
        explanation: 'The excerpt begins with the direct request, “Call me Ishmael.”',
      },
      {
        prompt: 'What circumstances does Ishmael mention before deciding to sail?',
        options: ['A large inheritance and a new ship', 'A promise to deliver a letter overseas', 'Little money and nothing on shore to interest him', 'A request from Cato to join a voyage'],
        answer: 2,
        explanation: 'He says he had “little or no money” and “nothing particular to interest me on shore.”',
      },
      {
        prompt: 'What does Ishmael do when his mood grows grim?',
        options: ['He goes to sea.', 'He buys a warehouse.', 'He studies swordsmanship.', 'He gives away his hats.'],
        answer: 0,
        explanation: 'After describing his gloomy and restless moods, he says it is time to get to sea and that he quietly takes to the ship.',
      },
    ],
  },
  {
    id: 'little-women',
    category: 'classics',
    initial: 'L',
    theme: 'rose',
    title: 'Little Women',
    author: 'Louisa May Alcott',
    year: '1868–1869',
    difficulty: 'FAMILY & SACRIFICE',
    description: 'Four sisters consider a Christmas without presents while their father is away.',
    source: 'https://www.gutenberg.org/ebooks/514',
    edition: 'Chapter One, “Playing Pilgrims,” opening through “all the pretty things she wanted.” Project Gutenberg #514, GITenberg 514.txt',
    text: `"Christmas won't be Christmas without any presents," grumbled Jo, lying on the rug.

"It's so dreadful to be poor!" sighed Meg, looking down at her old dress.

"I don't think it's fair for some girls to have plenty of pretty things, and other girls nothing at all," added little Amy, with an injured sniff.

"We've got Father and Mother, and each other," said Beth contentedly from her corner.

The four young faces on which the firelight shone brightened at the cheerful words, but darkened again as Jo said sadly, "We haven't got Father, and shall not have him for a long time." She didn't say "perhaps never," but each silently added it, thinking of Father far away, where the fighting was.

Nobody spoke for a minute; then Meg said in an altered tone, "You know the reason Mother proposed not having any presents this Christmas was because it is going to be a hard winter for everyone; and she thinks we ought not to spend money for pleasure, when our men are suffering so in the army. We can't do much, but we can make our little sacrifices, and ought to do it gladly. But I am afraid I don't," and Meg shook her head, as she thought regretfully of all the pretty things she wanted.`,
    questions: [
      {
        prompt: 'Who reminds the sisters that they have their parents and each other?',
        options: ['Jo', 'Meg', 'Amy', 'Beth'],
        answer: 3,
        explanation: 'Beth says contentedly, “We’ve got Father and Mother, and each other.”',
      },
      {
        prompt: 'Why does Mother propose having no Christmas presents?',
        options: ['The shops have run out of gifts.', 'She thinks pleasure spending is wrong while the men in the army suffer.', 'The sisters have already received their presents.', 'She plans to celebrate Christmas in the spring.'],
        answer: 1,
        explanation: 'Meg explains that Mother expects a hard winter and thinks they should not spend money for pleasure while their men are suffering in the army.',
      },
      {
        prompt: 'How does Meg feel about making the sacrifice?',
        options: ['She is delighted to give up everything.', 'She has forgotten the things she wanted.', 'She knows she ought to do it gladly but still regrets the things she wants.', 'She thinks the family should ignore Mother’s proposal.'],
        answer: 2,
        explanation: 'Meg says they ought to make sacrifices gladly, admits “I am afraid I don’t,” and thinks regretfully of the pretty things she wanted.',
      },
    ],
  },
  {
    id: 'sherlock-holmes',
    category: 'classics',
    initial: 'S',
    theme: 'sand',
    title: 'The Adventures of Sherlock Holmes',
    author: 'Arthur Conan Doyle',
    year: '1892',
    difficulty: 'LOGIC & OBSERVATION',
    description: 'Holmes uses a familiar staircase to explain the difference between seeing and observing.',
    source: 'https://www.gutenberg.org/ebooks/1661',
    edition: '“A Scandal in Bohemia,” Section I, from “I could not help laughing” through “Read it aloud.” Project Gutenberg #1661, GITenberg 1661.txt',
    text: `I could not help laughing at the ease with which he explained his process of deduction. "When I hear you give your reasons," I remarked, "the thing always appears to me to be so ridiculously simple that I could easily do it myself, though at each successive instance of your reasoning I am baffled until you explain your process. And yet I believe that my eyes are as good as yours."

"Quite so," he answered, lighting a cigarette, and throwing himself down into an armchair. "You see, but you do not observe. The distinction is clear. For example, you have frequently seen the steps which lead up from the hall to this room."

"Frequently."

"How often?"

"Well, some hundreds of times."

"Then how many are there?"

"How many? I don't know."

"Quite so! You have not observed. And yet you have seen. That is just my point. Now, I know that there are seventeen steps, because I have both seen and observed. By-the-way, since you are interested in these little problems, and since you are good enough to chronicle one or two of my trifling experiences, you may be interested in this." He threw over a sheet of thick, pink-tinted note-paper which had been lying open upon the table. "It came by the last post," said he. "Read it aloud."`,
    questions: [
      {
        prompt: 'How many steps does Holmes say lead up from the hall?',
        options: ['Seventeen', 'Twelve', 'Twenty', 'Twenty-seven'],
        answer: 0,
        explanation: 'Holmes explicitly says, “I know that there are seventeen steps.”',
      },
      {
        prompt: 'What distinction does Holmes illustrate with the staircase?',
        options: ['Reading is faster than listening.', 'Good eyesight always produces good memory.', 'Unfamiliar places are easier to describe.', 'Seeing something is not the same as observing it.'],
        answer: 3,
        explanation: 'The narrator has seen the stairs hundreds of times but cannot count them from memory; Holmes says, “You see, but you do not observe.”',
      },
      {
        prompt: 'What does Holmes ask the narrator to read aloud?',
        options: ['A newspaper beside his chair', 'A thick, pink-tinted sheet of note-paper', 'A chapter from a book on the table', 'A list of measurements of the stairs'],
        answer: 1,
        explanation: 'Holmes throws over the thick, pink-tinted note-paper, says it came by the last post, and asks the narrator to read it aloud.',
      },
    ],
  },
  ...informationalPassages,
]
