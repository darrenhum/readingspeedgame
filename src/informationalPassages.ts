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
  {
    id: 'news-market-shuttle',
    category: 'informational',
    title: 'Market Shuttle Takes a New Route',
    author: 'Between the Lines',
    year: 'Original practice',
    difficulty: 'NEWS',
    description: 'A transport update with temporary stops, unchanged fares, and a conditional return.',
    edition: 'Original fictional news report written for this game; not a report of real events',
    text: `The fictional town of Fernbridge is moving its Saturday market shuttle away from Mill Street while workers repair the bridge there. From June 8, the shuttle will use Orchard Road and stop outside the sports hall instead of beside the riverside gate. The railway station and market square stops will remain in service. The change affects the market shuttle only, not the weekday bus.

Shuttles will continue to leave the station every twenty minutes between 9 a.m. and 2 p.m. Tickets will cost the same as before, and passengers will not need to book seats. The sports hall stop has a covered waiting area, but the hall itself will not open earlier for passengers.

Engineers expect the repairs to take three Saturdays. However, the shuttle will return to Mill Street only after the bridge passes an inspection. The transport office will post a notice at each shuttle stop when the return date is confirmed. Traders have requested an additional late departure, but that request has not yet been approved.`,
    questions: [
      {
        prompt: 'Which stop replaces the riverside gate during the repairs?',
        options: ['The railway station', 'The sports hall', 'The market square', 'The Mill Street bridge'],
        answer: 1,
        explanation: 'The shuttle will stop outside the sports hall instead of beside the riverside gate.',
      },
      {
        prompt: 'What must happen before the shuttle returns to Mill Street?',
        options: ['Traders must approve a late departure.', 'The sports hall must open earlier.', 'The bridge must pass an inspection.', 'Three Saturdays must pass, regardless of the repairs.'],
        answer: 2,
        explanation: 'Three Saturdays is only an estimate; returning to Mill Street depends on the bridge passing an inspection.',
      },
      {
        prompt: 'Which service detail remains unchanged?',
        options: ['The ticket price', 'The riverside gate stop', 'The route through Mill Street', 'The use of the sports hall stop'],
        answer: 0,
        explanation: 'The report says tickets will cost the same as before, although the route and one stop will change.',
      },
    ],
  },
  {
    id: 'news-seed-exchange',
    category: 'informational',
    title: 'Seed Exchange Opens at the Garden',
    author: 'Between the Lines',
    year: 'Original practice',
    difficulty: 'NEWS',
    description: 'A community initiative: distinguish participation rules from future plans.',
    edition: 'Original fictional news report written for this game; not a report of real events',
    text: `A seed exchange will open at the fictional Ashcombe community garden on March 16. The volunteer-run stall will operate on the first and third Saturdays of each month, from 10 a.m. until noon. Visitors may take up to two packets per visit without bringing seeds of their own. Organisers say this rule is intended to let new gardeners participate alongside experienced growers.

Donated packets must be sealed and labelled with the plant name and the year the seeds were collected. Volunteers will check the labels before placing donations on the stall. They will not test whether the seeds will sprout, so a checked label is not a guarantee of successful growth. Packets without the required information will be set aside rather than offered to visitors.

The garden association has supplied a cupboard for storing packets between sessions. A nearby school has offered to host a seed-saving workshop in autumn, but no date or instructor has been confirmed. For now, the exchange includes seeds only; tools and plant pots are outside the scheme.`,
    questions: [
      {
        prompt: 'What may a visitor who brings no seeds take?',
        options: ['One packet only after donating a pot', 'Unlimited packets at the end of a session', 'Packets only after attending a workshop', 'Up to two packets per visit'],
        answer: 3,
        explanation: 'Visitors may take up to two packets per visit without donating seeds, allowing new gardeners to join in.',
      },
      {
        prompt: 'What does the volunteers’ packet check establish?',
        options: ['The seeds are certain to sprout.', 'The required label information is present.', 'The seeds were collected at the community garden.', 'The plants will be ready by autumn.'],
        answer: 1,
        explanation: 'Volunteers check for the plant name and collection year; they do not test germination or guarantee growth.',
      },
      {
        prompt: 'What has already been supplied for the exchange?',
        options: ['An instructor for the autumn workshop', 'Plant pots for every visitor', 'A cupboard for storing packets', 'Tools for collecting seeds'],
        answer: 2,
        explanation: 'The garden association has supplied a storage cupboard; the workshop is unconfirmed, and tools and pots are excluded.',
      },
    ],
  },
  {
    id: 'memo-archive-labels',
    category: 'informational',
    title: 'Archive Move: Label Before Packing',
    author: 'Between the Lines',
    year: 'Original practice',
    difficulty: 'MEMO',
    description: 'Follow a packing sequence while keeping exceptions and responsibilities straight.',
    edition: 'Original fictional workplace memo written for this game',
    text: `To: Staff at the fictional Wrenfield history centre
Subject: Preparing archive boxes for the storage-room move

Please finish labelling boxes by Wednesday at 4 p.m. Movers will collect them on Friday morning. Each label must show the department name, a box number, and the destination shelf code. Record the same details in the shared inventory before sealing the box. A shelf code identifies where a box belongs, not whether its contents may be discarded.

Blue labels are for material going to the new storage room. Yellow labels are for files that must remain accessible at reception during the move. Do not place yellow-labelled boxes on the collection trolley. If you cannot find a destination shelf code, leave the box unsealed and ask the archive coordinator; do not guess a code from a neighbouring box.

The coordinator will check the inventory on Thursday and report any missing details to the relevant department. Staff should keep original documents in their existing folders inside each box. This move does not authorise scanning, shredding, or changing access permissions. Reception files will move later, after a separate notice.`,
    questions: [
      {
        prompt: 'What must staff do before sealing a box?',
        options: ['Record its label details in the shared inventory.', 'Wait for movers to collect the trolley.', 'Scan all its original documents.', 'Move its folders to reception.'],
        answer: 0,
        explanation: 'The memo requires staff to record the department, box number, and shelf code in the inventory before sealing.',
      },
      {
        prompt: 'Where should yellow-labelled boxes remain during the move?',
        options: ['On the collection trolley', 'In the new storage room', 'Beside any box with a matching number', 'Accessible at reception'],
        answer: 3,
        explanation: 'Yellow labels identify files that must remain accessible at reception and must not go on the collection trolley.',
      },
      {
        prompt: 'What should staff do when a destination shelf code is missing?',
        options: ['Use the code from a neighbouring box.', 'Leave the box unsealed and ask the coordinator.', 'Seal the box and omit it from the inventory.', 'Replace its blue label with a yellow one.'],
        answer: 1,
        explanation: 'Staff are instructed to leave the box unsealed and ask the archive coordinator instead of guessing a code.',
      },
    ],
  },
  {
    id: 'research-map-trial',
    category: 'informational',
    title: 'Testing a Simpler Museum Map',
    author: 'Between the Lines',
    year: 'Original practice',
    difficulty: 'RESEARCH',
    description: 'Interpret a comparison without confusing speed, preference, and lasting learning.',
    edition: 'Original fictional research summary written for this game; all study details and numbers are invented',
    text: `In a fictional study at the Hartmere museum, researchers compared two printed maps. Sixty adults visiting for the first time were randomly assigned to receive either the existing map or a simplified version. Each group contained thirty people. Participants started at the entrance and were asked to find the same three galleries in a fixed order without asking staff for directions.

The simplified-map group had a median completion time of eight minutes, compared with eleven minutes for the existing-map group. The median is the middle value when the times are arranged in order; it does not mean that every participant finished within that time. Four people using the simplified map and five using the existing map entered at least one wrong gallery.

The team concluded that the simplified design deserved further testing for this particular navigation task. Researchers did not ask which map visitors preferred, measure how much they learned from exhibits, or test whether they remembered routes the next day. All sessions took place on quiet weekday mornings, so the findings may not apply to crowded weekend visits.`,
    questions: [
      {
        prompt: 'How were participants allocated to the two maps?',
        options: ['They chose their preferred design.', 'They were grouped by walking speed.', 'They were randomly assigned.', 'They received maps according to arrival day.'],
        answer: 2,
        explanation: 'The summary explicitly states that the sixty first-time adult visitors were randomly assigned to the two maps.',
      },
      {
        prompt: 'What does the eight-minute median describe?',
        options: ['The middle completion time in the simplified-map group', 'The longest time taken by any visitor', 'The time every simplified-map user needed', 'The time saved by each visitor'],
        answer: 0,
        explanation: 'The median is the middle value of the ordered completion times, not a maximum or a time shared by everyone.',
      },
      {
        prompt: 'Which question was not investigated in the study?',
        options: ['How long visitors took to find the galleries', 'Whether visitors entered a wrong gallery', 'How the two map groups compared on completion time', 'Whether visitors remembered routes the next day'],
        answer: 3,
        explanation: 'The study measured completion times and wrong-gallery entries but did not test next-day route memory.',
      },
    ],
  },
  {
    id: 'research-shaded-benches',
    category: 'informational',
    title: 'Where Do Park Visitors Sit?',
    author: 'Between the Lines',
    year: 'Original practice',
    difficulty: 'RESEARCH',
    description: 'An observation study separates repeated counts from individual visitors and possible causes.',
    edition: 'Original fictional research summary written for this game; all study details and numbers are invented',
    text: `A fictional parks team observed bench use in Alder Park before deciding where to add shade. Staff checked twelve benches at noon and at 3 p.m. on five dry days in July. Six benches were under mature trees, while six stood in open areas. At each check, observers recorded whether each bench had at least one person sitting on it. They did not count the number of people on an occupied bench.

Across the sixty checks of shaded benches, forty-two found a bench occupied. Across the sixty checks of open benches, twenty-four found one occupied. These totals describe observations, not separate visitors: the same person could have been present at more than one check.

The team noted that the shaded benches were also closer to the pond and farther from the main road. Because location and shade varied together, the observations could not show which feature explained the difference. Staff proposed testing temporary shade over some open benches before recommending permanent structures. No observations were made in rain or during the evening.`,
    questions: [
      {
        prompt: 'What did an occupied-bench observation record?',
        options: ['The exact number of people on a bench', 'That at least one person was sitting on a bench', 'That a new visitor had arrived at the park', 'The total time a person spent sitting'],
        answer: 1,
        explanation: 'Observers recorded whether a bench had at least one occupant, not the number of occupants or their sitting time.',
      },
      {
        prompt: 'Why can the team not attribute the difference to shade alone?',
        options: ['The shaded benches were checked only in the evening.', 'Observers counted people only on open benches.', 'All benches were beside the main road.', 'The shaded benches also differed in proximity to the pond and road.'],
        answer: 3,
        explanation: 'Shade and location varied together, so pond or road proximity could also explain the observed difference.',
      },
      {
        prompt: 'What next step did staff propose?',
        options: ['Test temporary shade over some open benches.', 'Build permanent structures immediately.', 'Remove benches near the pond.', 'Repeat observations only on the shaded benches.'],
        answer: 0,
        explanation: 'Staff proposed a temporary-shade test on some open benches before recommending permanent structures.',
      },
    ],
  },
  {
    id: 'info-reservation-status',
    category: 'informational',
    title: 'Reading a Workshop Reservation',
    author: 'Between the Lines',
    year: 'Original practice',
    difficulty: 'INFORMATION',
    description: 'Decode a booking status, an offer deadline, and the limits of a waiting-list entry.',
    edition: 'Original fictional service guide written for this game; booking rules and examples are invented',
    text: `This guide explains reservation messages from the fictional Elmshore craft centre. A message marked Received means that the centre has logged a request; it does not guarantee a place. A message marked Confirmed gives the workshop date, start time, and room. Only a confirmed reservation allows a visitor to attend. A Waiting list message means that the session is full and the request is queued.

When someone cancels, staff offer the place to the earliest waiting request for that same session. The offer states a reply deadline. If the visitor accepts before that deadline, staff send a confirmation. If no reply arrives in time, the offer expires and passes to the next request. Being on a waiting list does not automatically reserve a place in another session.

For example, a place offered at 10 a.m. on Tuesday with a deadline of noon on Wednesday must be accepted by Wednesday noon, not by the workshop's starting time. Visitors who no longer want a place should withdraw their request so others can receive offers sooner. These messages concern attendance only; materials charges, if any, appear in a separate notice.`,
    questions: [
      {
        prompt: 'Which message guarantees that a visitor has a place?',
        options: ['Received', 'Waiting list', 'Confirmed', 'An unanswered offer'],
        answer: 2,
        explanation: 'Only a Confirmed reservation allows attendance; a received request, waiting-list entry, or unanswered offer does not.',
      },
      {
        prompt: 'When must the example offer be accepted?',
        options: ['Before the workshop starts', 'By noon on Wednesday', 'By 10 a.m. on Wednesday', 'By noon on Tuesday'],
        answer: 1,
        explanation: 'The example explicitly sets Wednesday noon as the acceptance deadline, regardless of the workshop starting time.',
      },
      {
        prompt: 'What happens when an offer expires without a reply?',
        options: ['The visitor is automatically confirmed.', 'The visitor gets a place in another session.', 'The centre cancels the whole workshop.', 'The offer passes to the next waiting request.'],
        answer: 3,
        explanation: 'An unanswered offer expires at the deadline and passes to the next request for the same session.',
      },
    ],
  },
]
