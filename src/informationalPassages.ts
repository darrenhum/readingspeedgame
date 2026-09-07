import type { Passage } from './game.ts'

export const informationalPassages: Passage[] = [
  {
    id: 'news-library-hours',
    category: 'informational',
    title: 'Library Extends Evening Hours',
    author: 'Between the Lines',
    year: 'Original practice',
    difficulty: 'NEWS',
    description: 'A local service update. Separate the confirmed changes from the proposals.',
    edition: 'Original fictional news report written for this game; not a report of real events',
    text: `The fictional town of Bellwick will test longer opening hours at its central library for six weeks, beginning on October 7. On Tuesdays and Thursdays, the building will close at 8 p.m. instead of 6 p.m. Hours on all other days will remain unchanged. The two neighbourhood branches are not part of the trial.

The council has approved funding for additional evening staff, but it has not approved a permanent change. During the trial, librarians will record visits after 6 p.m. and invite visitors to complete an optional survey. The council will review both sources of information before deciding whether to continue the arrangement.

Study desks, computers, and the borrowing desk will be available throughout the extra hours. The children's activity room will still close at 6 p.m. A proposal to add Saturday workshops is being considered separately and has no confirmed start date. Residents do not need to register to use the extended opening hours.`,
    questions: [
      {
        prompt: 'Which location will offer the extra evening hours?',
        options: ['All three libraries', 'Only the two neighbourhood branches', 'Only the central library', 'Only the children’s activity room'],
        answer: 2,
        explanation: 'The trial covers the central library; the two neighbourhood branches are explicitly excluded.',
      },
      {
        prompt: 'What will the council review before deciding whether to continue?',
        options: ['Evening visits and optional visitor surveys', 'Workshop registrations only', 'Visits before 6 p.m. only', 'The number of books bought'],
        answer: 0,
        explanation: 'Librarians will record visits after 6 p.m. and collect optional surveys. The council will review both.',
      },
      {
        prompt: 'What is the status of the Saturday workshops?',
        options: ['They begin on October 7.', 'They run throughout the six-week trial.', 'They have been cancelled.', 'They are a separate proposal with no confirmed start date.'],
        answer: 3,
        explanation: 'The workshops are being considered separately; the report gives them no confirmed start date.',
      },
    ],
  },
  {
    id: 'memo-equipment-bookings',
    category: 'informational',
    title: 'Shared Equipment: Booking Update',
    author: 'Between the Lines',
    year: 'Original practice',
    difficulty: 'MEMO',
    description: 'A workplace procedure with a deadline, an exception, and a clear next step.',
    edition: 'Original fictional workplace memo written for this game',
    text: `To: All staff at the fictional Linden design office
Subject: Shared equipment bookings from Monday, November 4

Starting Monday, please reserve projectors and portable speakers through the equipment calendar rather than the team chat. Enter your name, the item, and the collection and return times. A calendar entry reserves equipment only; it does not reserve a meeting room. Room bookings will continue through the reception desk.

Requests for equipment needed before 10 a.m. must be entered by 3 p.m. on the previous working day. For a Monday morning collection, that means Friday afternoon. Later collections may be booked on the same day if the item is available. Existing bookings made in the team chat will be honoured, and reception will transfer them to the calendar; staff should not enter those bookings again.

Return each item to the labelled cupboard and mark it returned in the calendar. If an item is damaged or missing, contact reception instead of marking it returned. This process will be reviewed after one month. No changes to room-booking rules are included in this update.`,
    questions: [
      {
        prompt: 'When must a booking for Monday at 9 a.m. be entered?',
        options: ['By Monday at 10 a.m.', 'By Friday at 3 p.m.', 'By Sunday at 3 p.m.', 'Any time on Monday'],
        answer: 1,
        explanation: 'Collections before 10 a.m. must be booked by 3 p.m. on the previous working day, which is Friday for Monday.',
      },
      {
        prompt: 'What should staff do with existing team-chat bookings?',
        options: ['Cancel them.', 'Enter them again in the calendar.', 'Leave them for reception to transfer.', 'Replace them with room bookings.'],
        answer: 2,
        explanation: 'Reception will transfer existing bookings, which will be honoured. Staff are told not to duplicate them.',
      },
      {
        prompt: 'What should you do if equipment is missing?',
        options: ['Contact reception without marking it returned.', 'Mark it returned and tell a colleague.', 'Reserve a meeting room.', 'Wait until the monthly review.'],
        answer: 0,
        explanation: 'The memo instructs staff to contact reception instead of marking damaged or missing equipment returned.',
      },
    ],
  },
  {
    id: 'research-reminder-trial',
    category: 'informational',
    title: 'Do Reminder Cards Help?',
    author: 'Between the Lines',
    year: 'Original practice',
    difficulty: 'RESEARCH',
    description: 'Read a small study carefully: what was measured, and what remains uncertain?',
    edition: 'Original fictional research summary written for this game; all study details and numbers are invented',
    text: `In a fictional pilot study, a community centre tested whether reminder cards could help volunteers return borrowed tools on time. Forty volunteers took part for four weeks. Twenty received a printed card showing the return date whenever they borrowed a tool. The other twenty received the usual verbal reminder. Volunteers chose which group to join; they were not assigned at random.

In the card group, 17 of the 20 volunteers returned every borrowed tool on time. In the verbal-reminder group, 12 of the 20 did so. The researchers counted volunteers with no late returns, not the total number of tools returned. Both groups could borrow tools for the same length of time.

The results suggest that reminder cards may be worth testing further, but they do not establish that the cards caused the difference. Volunteers who chose cards might already have been more organised. The study also involved only one centre and a small number of people. The team recommended a larger trial with random assignment before changing the centre's standard borrowing procedure.`,
    questions: [
      {
        prompt: 'What did the reported counts of 17 and 12 measure?',
        options: ['Tools borrowed by each group', 'Days without a late return', 'Cards that volunteers kept', 'Volunteers who returned every tool on time'],
        answer: 3,
        explanation: 'The researchers counted volunteers with no late returns, explicitly not the number of tools returned.',
      },
      {
        prompt: 'Why can the study not establish that the cards caused the difference?',
        options: ['The groups had different borrowing periods.', 'Volunteers chose their groups and might differ in organisation.', 'No volunteers received cards.', 'The researchers counted only damaged tools.'],
        answer: 1,
        explanation: 'Self-selection could explain the difference: volunteers choosing cards might already have been more organised.',
      },
      {
        prompt: 'What did the team recommend next?',
        options: ['Immediately require cards for everyone.', 'Stop lending tools.', 'Run a larger trial with random assignment.', 'Extend the borrowing period only for the card group.'],
        answer: 2,
        explanation: 'The team recommended a larger, randomly assigned trial before changing the standard borrowing procedure.',
      },
    ],
  },
  {
    id: 'info-water-meter',
    category: 'informational',
    title: 'Understanding a Water-Use Notice',
    author: 'Between the Lines',
    year: 'Original practice',
    difficulty: 'INFORMATION',
    description: 'An explanatory guide to readings, estimates, and what a comparison really means.',
    edition: 'Original fictional service guide written for this game; example figures and service rules are invented',
    text: `This practice guide describes notices from a fictional water service. Each notice lists an opening meter reading, a closing reading, and the dates covered. Subtracting the opening reading from the closing reading gives the amount used during that period. The meter records cumulative use, so the closing reading alone is not the amount used that month.

For example, an opening reading of 280 cubic metres and a closing reading of 292 cubic metres show use of 12 cubic metres. If the notice covers 30 days, the average is 0.4 cubic metres per day. Comparing daily averages is more useful than comparing period totals when two notices cover different numbers of days.

A reading marked E is an estimate, while a reading marked A was actually taken from the meter. An estimated notice may be adjusted after an actual reading becomes available. Higher recorded use does not, by itself, prove that a pipe is leaking: extra occupants or garden watering could also explain a change. This notice describes water use only; it does not include prices or calculate a payment due.`,
    questions: [
      {
        prompt: 'How much water was used in the example period?',
        options: ['12 cubic metres', '292 cubic metres', '280 cubic metres', '0.4 cubic metres'],
        answer: 0,
        explanation: 'Subtract the opening reading of 280 from the closing reading of 292 to get 12 cubic metres.',
      },
      {
        prompt: 'Why does the guide recommend comparing daily averages?',
        options: ['They reveal the price of water.', 'They always prove whether there is a leak.', 'All notices cover exactly 30 days.', 'Notices may cover different numbers of days.'],
        answer: 3,
        explanation: 'Daily averages account for differing period lengths, making them more useful than raw totals for this comparison.',
      },
      {
        prompt: 'What does an E beside a reading mean?',
        options: ['The meter was checked for errors.', 'The reading is estimated and may later be adjusted.', 'Payment is overdue.', 'A leak has been confirmed.'],
        answer: 1,
        explanation: 'E marks an estimate, which may be adjusted once an actual meter reading becomes available.',
      },
    ],
  },
]
