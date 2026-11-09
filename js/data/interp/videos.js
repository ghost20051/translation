/*
 * Simultaneous Interpretation: short explainer videos, one per hard term.
 * The definitions come from the supplied questions and from the course book (Simultaneous Interpreting 3, Suez Canal University).
 * The pictures, comparisons and "memory pictures" are our own aids to remember the ideas; they are never exam answers.
 * Each scene has a narration line (say) that is shown as the caption and read aloud.
 * A scene is one of: title, def, lanes, chunks, compare, steps, picture, recap.
 */
(function () {
  var UN = window.UN = window.UN || {};
  var SI = UN.SI = UN.SI || {};
  function M(t) { return { m: t }; }   // a highlighted word in a definition

  // Real photos used as memory pictures: { id: { file, title, by, license, source } }. Empty until photos are added.
  SI.photos = {
    conference: {"file":"conference.jpg","title":"Hearing of Commissioner-designate Thierry Breton","by":"European Parliament","license":"CC BY 2.0","source":"https://commons.wikimedia.org/wiki/File:Hearing_of_Commissioner-designate_Thierry_Breton_(49068586441).jpg"},
    pizza: {"file":"pizza.jpg","title":"Pizza","by":"igorovsyannykov","license":"CC0","source":"https://commons.wikimedia.org/wiki/File:Pizza-3007395.jpg"},
    traffic: {"file":"traffic.jpg","title":"LED traffic light on red","by":"Kevin Payravi","license":"CC BY-SA 4.0","source":"https://commons.wikimedia.org/wiki/File:LED_traffic_light_on_red.jpg"},
    echo: {"file":"echo.jpg","title":"Echo Point Lookout","by":"MilaKampus","license":"CC BY-SA 4.0","source":"https://commons.wikimedia.org/wiki/File:Echo_Point_Lookout.jpg"},
    lightning: {"file":"lightning.jpg","title":"Lightning strike in the evening","by":"Валерия Бобыленко","license":"CC BY 4.0","source":"https://commons.wikimedia.org/wiki/File:Lightning_strike_in_the_evening.jpg"},
    parrot: {"file":"parrot.jpg","title":"Scarlet macaw","by":"David E. Lucas","license":"Public domain","source":"https://commons.wikimedia.org/wiki/File:Scarlet_macaw_-_DPLA_-_34c7c384feb3d71d9831fd28f62a1d5b.jpg"},
    backpack: {"file":"backpack.jpg","title":"Backpackers on the Stehekin Valley Road","by":"NPS Staff","license":"Public domain","source":"https://commons.wikimedia.org/wiki/File:Backpackers_on_the_Stehekin_Valley_Road_(67af5853ef7b4a11acda1e392a4ff4cd).JPG"},
    juggler: {"file":"juggler.jpg","title":"Juggling balls","by":"Richard Leonard","license":"CC BY 2.0","source":"https://commons.wikimedia.org/wiki/File:Juggling_Balls_(81706016).jpg"},
    scales: {"file":"scales.jpg","title":"Justice scale and flag","by":"St. Louis Circuit Attorney's Office","license":"CC BY-SA 4.0","source":"https://commons.wikimedia.org/wiki/File:Justice_scale_and_flag.jpg"},
    puzzle: {"file":"puzzle.jpg","title":"Jigsaw puzzle solving","by":"kallerna","license":"CC BY-SA 4.0","source":"https://commons.wikimedia.org/wiki/File:Jigsaw_puzzle_solving_2.jpg"},
    seedling: {"file":"seedling.jpg","title":"Tomato seedlings grow in Plant Habitat-06","by":"NASA Johnson Space Center","license":"Public domain","source":"https://commons.wikimedia.org/wiki/File:Tomato_Seedlings_Grow_in_Plant_Habitat-06_(iss070e064263).jpg"},
    brain: {"file":"brain.jpg","title":"MRI of human brain","by":"Asnaebsa","license":"CC BY-SA 4.0","source":"https://commons.wikimedia.org/wiki/File:MRI_of_Human_Brain.jpg"},
    stopwatch: {"file":"stopwatch.jpg","title":"Stopwatch","by":"Ansgar Koreng","license":"CC BY-SA 4.0","source":"https://commons.wikimedia.org/wiki/File:Stopwatch%2C_1810201155%2C_ako.jpg"},
    babel: {"file":"babel.jpg","title":"The Tower of Babel (Vienna)","by":"Pieter Bruegel the Elder","license":"Public domain","source":"https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_(Vienna)_-_Google_Art_Project_-_edited.jpg"},
    sign: {"file":"sign.jpg","title":"Arabic-English street sign \"Sidi El Wasti St.\" in Alexandria","by":"Marsupium","license":"CC BY 4.0","source":"https://commons.wikimedia.org/wiki/File:Arabic-English_street_sign_%22Sidi_El_Wasti_St.%22_in_Alexandria.jpg"},
    bridge: {"file":"bridge.jpg","title":"Cairo's Qasr El Nil Bridge","by":"سها القاضي","license":"CC0","source":"https://commons.wikimedia.org/wiki/File:Cairo%E2%80%99s_Qasr_El_Nil_Bridge.jpg"},
    bricks: {"file":"bricks.jpg","title":"Bricklayer","by":"Brice Blondel for HDPTCAR","license":"CC BY 2.0","source":"https://commons.wikimedia.org/wiki/File:Bricklayer.jpg"},
    racecar: {"file":"racecar.jpg","title":"Renault Formula One racing car","by":"Ivan Radic","license":"CC BY 2.0","source":"https://commons.wikimedia.org/wiki/File:Renault_Formula_One_racing_car_(49667991997).jpg"},
    tape: {"file":"tape.jpg","title":"Revox B77 reel-to-reel audio tape recorder","by":"touhotus","license":"CC BY 2.0","source":"https://commons.wikimedia.org/wiki/File:Revox_B77_reel-to-reel_audio_tape_recorder%2C_ca._1977_(cropped_and_edited).jpg"},
    tango: {"file":"tango.jpg","title":"Tango Porteño","by":"Manticora87","license":"CC BY-SA 4.0","source":"https://commons.wikimedia.org/wiki/File:Tango_Porte%C3%B1o.jpg"}
  };

  SI.videos = [
    { id: 'v01', title: "Why do interpreters rely on comprehension, not perception?", gist: "Perception = hearing the sounds. Comprehension = understanding the meaning.", ar: 'المترجم الفوري بيعتمد على الفهم مش على السمع بس.', tone: 'blue', cover: 'conference', refs: { gaps: [1, 60], mcq: [1, 20], essay: [19] },
      scenes: [
        { t: 'title', emoji: '🎧', sub: 'Simultaneous interpreting', say: "Video one. Why do interpreters rely on comprehension, not perception?" },
        { t: 'story', say: "Imagine a conference hall. A speaker talks in English. In a glass booth sits an interpreter, wearing headphones. He is not copying sounds. He understands the idea, and says it in Arabic to the audience.", beats: [{"who":"speaker","text":"We must protect our water resources."},{"who":"interp","text":"يجب أن نحمي مواردنا المائية"},{"who":"audience","text":"Understood! 👍"},{"who":"note","text":"Meaning first, words second"}] },
        { t: 'def', parts: ['In simultaneous interpreting, the interpreter ', M('listens and speaks at the same time'), ', in two languages.'], say: 'In simultaneous interpreting, the interpreter listens to the speaker and speaks in another language at the same time.' },
        { t: 'compare', left: { emoji: '👂', title: 'Perception', items: ['Hearing the sounds', 'What a normal listener does'] }, right: { emoji: '🧠', title: 'Comprehension', items: ['Understanding the meaning', 'What interpreters rely on'] },
          say: 'A normal listener depends on perception: hearing the sounds and the words. But simultaneous interpreters rely on comprehension. They understand the meaning first, and only then express it.' },
        {"t":"example","rows":[{"who":"src","text":"It's raining cats and dogs."},{"who":"bad","label":"Word for word (perception)","text":"إنها تمطر قططًا وكلابًا ✗"},{"who":"good","label":"Meaning (comprehension)","text":"إنها تمطر بغزارة ✓"}],"say":"Here is a real example. The speaker says: it's raining cats and dogs. If the interpreter only copies the words, the Arabic says that cats and dogs are falling from the sky, which makes no sense. If he understands the meaning, he says: it is raining heavily. That is comprehension."},
        { t: 'picture', emoji: '🍿', anim: 'bounce', caption: 'Retell the story, not the sounds', say: 'It is like telling a friend the story of a film in another language. You cannot just repeat sounds. You must understand the story first.' },
        { t: 'recap', points: ['Interpreters rely on comprehension, not perception', 'Meaning first, words second'], say: 'So remember: comprehension, not perception. Meaning first, words second.' }
      ] },

    { id: 'v02', title: "What are temporal phenomena?", gist: "The time features of interpreting: fluency, pausing and lag.", ar: 'الظواهر الزمنية = كل حاجة بتخص الوقت في الترجمة: الطلاقة والوقفات والتأخير.', tone: 'amber', refs: { gaps: [14, 15, 55], mcq: [], essay: [] },
      scenes: [
        { t: 'title', emoji: '⏱️', sub: 'Temporal phenomena', say: "Video two. What are temporal phenomena?" },
        { t: 'story', say: "Picture the same booth. Researchers do not only listen to what is said. They watch the clock. How smooth is his speech? Where does he pause? And how far behind the speaker is he?", beats: [{"who":"speaker","text":"Today we will discuss the budget."},{"who":"interp","text":"اليوم سنناقش الميزانية"},{"who":"note","text":"Fluency · Pausing · Lag"}] },
        { t: 'def', parts: ['Temporal means ', M('related to time'), '. These are the time features of interpreting.'], say: 'Temporal simply means related to time. Temporal phenomena are the time features of interpreting.' },
        { t: 'steps', items: [{ emoji: '🌊', text: 'Fluency: how smooth the speech is' }, { emoji: '⏸️', text: 'Pausing: the silent gaps' }, { emoji: '🐢', text: 'Lag: the delay behind the speaker' }],
          say: 'Researchers look at three things. Fluency, which is how smooth the speech is. Pausing, which is the silent gaps. And lag, which is how far the interpreter is behind the speaker. This lag is called ear-voice span.' },
        {"t":"example","rows":[{"who":"src","time":"0:00","text":"Good morning, everyone. ⏸"},{"who":"tgt","time":"0:02","text":"صباح الخير جميعًا."},{"who":"note","text":"Lag: 2 seconds · Pause: 1 second · Fluency: smooth, no \"uh\""}],"say":"A real example with a clock. At zero seconds the speaker says: good morning, everyone, and pauses for one second. At two seconds the interpreter says it in Arabic. So the lag is two seconds, the pause is one second, and the speech is fluent, with no uh. Those are temporal features."},
        { t: "picture", photo: "stopwatch", kb: "in", emoji: "💃", caption: "Interpreting, measured against the clock", say: "Picture researchers holding a stopwatch over the booth. They time how smooth the speech is, how long the pauses are, and how far behind the speaker the interpreter is." },
        { t: 'recap', points: ['Temporal = related to time', 'Fluency + Pausing + Lag'], say: 'Remember: temporal means time. Fluency, pausing, and lag.' }
      ] },

    { id: 'v03', title: "What are simultaneity and synchronicity?", gist: "Listening and speaking at the same time, with a gap that keeps changing.", ar: 'التزامن: السماع والكلام بيحصلوا في نفس الوقت تقريبًا، والفجوة بينهم بتتغير.', tone: 'purple', refs: { gaps: [13, 17, 18, 19], mcq: [9, 10], essay: [1] },
      scenes: [
        { t: 'title', emoji: '🔁', sub: 'Simultaneity & synchronicity', say: "Video three. What are simultaneity and synchronicity?" },
        { t: 'story', say: "The speaker never waits for the interpreter. Both of them are talking at the same time. He listens to the next words while he is still speaking the previous ones.", beats: [{"who":"speaker","text":"The new law will start next month."},{"who":"interp","text":"سيبدأ القانون الجديد الشهر المقبل"},{"who":"note","text":"Two voices at the same time"}] },
        { t: 'def', parts: ['Simultaneity: listening and speaking happen ', M('at the same time'), '. Synchronicity: how closely input and output match in time.'], say: 'Simultaneity means listening and speaking happen at the same time. Synchronicity is how closely the speaker and the interpreter match in time.' },
        { t: 'lanes', bars: 5, lag: 1, label: 'the gap keeps changing', say: 'Look at the two lanes. The speaker talks, and the interpreter follows almost at the same time. But the gap is never fixed. It keeps changing. That is why synchronicity is difficult to measure.' },
        {"t":"example","rows":[{"who":"src","time":"0:00 → 0:05","text":"The new law will start next month, and it will affect all companies."},{"who":"tgt","time":"0:02 → 0:07","text":"سيبدأ القانون الجديد الشهر المقبل، وسيؤثر على جميع الشركات."},{"who":"note","text":"From 0:02 to 0:05 both are talking at the same time"}],"say":"Look at the times. The speaker talks from zero to five seconds. The interpreter talks from two to seven seconds. So between second two and second five, both of them are speaking at the same time. That overlap is simultaneity."},
        { t: "picture", photo: "tango", kb: "left", emoji: "🎶", caption: "Moving together, one a fraction behind", say: "Think of tango dancers. They move at almost the same moment, but the follower is always a fraction of a second behind the leader. Simultaneous interpreting is the same kind of dance." },
        { t: 'recap', points: ['Synchronicity = input and output, almost at the same time', 'The time gap keeps changing'], say: 'Remember: same time, and a changing time gap.' }
      ] },

    { id: 'v04', title: "What is the ear-voice span (EVS)?", gist: "The time gap between hearing the speaker and speaking the interpretation.", ar: 'EVS = الفجوة الزمنية بين ما بتسمعه وما بتقوله، وتتقاس بالثواني أو بعدد الكلمات.', tone: 'blue', cover: 'echo', refs: { gaps: [16, 54, 61, 62, 63, 64, 65, 66, 67, 69, 75], mcq: [8], essay: [3, 4, 5, 6, 7] },
      scenes: [
        { t: 'title', emoji: '🗣️', sub: 'Ear-voice span, or EVS', say: "Video four. What is the ear-voice span, or E V S?" },
        { t: 'story', say: "The speaker says a word. The interpreter hears it, but he waits a moment to understand it. Then he speaks. That small gap, between his ear and his voice, is the ear-voice span.", beats: [{"who":"speaker","text":"Water"},{"who":"note","text":"EVS: the gap, about 2 to 4 seconds"},{"who":"interp","text":"المياه"}] },
        { t: 'def', parts: ['EVS is the ', M('time delay'), ' between hearing the source speech and delivering the interpretation. Also called décalage or time lag.'], say: 'E V S is the time delay between hearing the source speech and delivering the interpretation. It is also called décalage, or time lag.' },
        { t: 'lanes', bars: 5, lag: 2, label: 'EVS', say: 'Here the speaker finishes a word, and the interpreter speaks it a moment later. That gap is the E V S. It gives the interpreter time to understand the message before translating it.' },
        { t: 'steps', items: [{ emoji: '⏲️', text: 'In seconds' }, { emoji: '🔢', text: 'Or by the number of content words' }],
          say: "It can be measured in two ways: in seconds, or by counting the content words. Paneth found an average of two to four seconds. Oléron and Nanpon found that it can range from two to ten seconds, depending on the languages." },
        { t: 'steps', items: [{ emoji: '🔑', text: 'Where the key words are' }, { emoji: '🏗️', text: 'Sentence structure, such as the predicate' }, { emoji: '🧠', text: 'Mental effort' }, { emoji: '😵', text: 'How difficult the speech is' }, { emoji: '👤', text: 'Who is interpreting' }],
          say: 'What changes its length? Where the key words are, the sentence structure, the mental effort, how difficult the speech is, and who is interpreting. The interpreter must understand enough of the original before starting.' },
        {"t":"example","rows":[{"who":"src","time":"0:00","text":"The minister …"},{"who":"src","time":"0:01","text":"… announced a new plan."},{"who":"tgt","time":"0:02","text":"أعلن الوزير عن خطة جديدة."},{"who":"note","text":"EVS ≈ 2 seconds, or about 3 words behind"}],"say":"A real example. At zero seconds the speaker says: the minister. At one second: announced a new plan. The interpreter starts at two seconds and says the whole idea in Arabic. His E V S is about two seconds, or about three words. In Arabic the verb comes first, so he had to hear announced before he could start."},
        { t: "picture", photo: "lightning", kb: "up", emoji: "⛰️", caption: "See the flash, hear the thunder a moment later", say: "Think of a storm. You see the lightning first, and you hear the thunder a moment later. That delay between the flash and the sound is like the ear-voice span." },
        { t: 'recap', points: ['Ear = hearing. Voice = speaking. EVS = the gap between them', 'Two ways to measure: seconds and words'], say: 'Remember: ear is hearing, voice is speaking, and E V S is the gap between them.' }
      ] },

    { id: 'v05', title: "How do pauses help or hurt the interpreter?", gist: "Normal pauses help. Pauses in the wrong place make interpreting harder.", ar: 'الوقفات الطبيعية في كلام المتحدث بتساعد المترجم، والوقفات الغريبة بتصعّب عليه.', tone: 'green', refs: { gaps: [20, 23, 24, 25, 27, 28, 29], mcq: [13, 14], essay: [2] },
      scenes: [
        { t: 'title', emoji: '⏸️', sub: 'Pauses', say: "Video five. How do pauses help or hurt the interpreter?" },
        { t: 'story', say: "Imagine the interpreter listening to a speech, and he must deliver it to the audience. When the speaker pauses at the end of a clause, he catches up and organizes his thoughts. But when the speaker stops in the middle of a phrase, he is left waiting, without enough information.", beats: [{"who":"speaker","text":"The minister said that the law will change.","badge":{"text":"⏸ normal","tone":"ok"}},{"who":"interp","text":"قال الوزير إن القانون سيتغير"},{"who":"note","text":"A pause in the middle of a phrase = trouble"}] },
        { t: 'def', parts: ['Pauses are ', M('interruptions in the flow of speech'), '. Silent pauses are empty gaps. Filled pauses are hesitations like uh.'], say: 'Pauses are interruptions in the flow of speech. Silent pauses are empty gaps. Filled pauses are hesitations, like uh.' },
        { t: 'chunks', words: ['The', 'minister', 'said', 'that', 'the', 'law', 'will', 'change'], groups: [], pauses: [{ after: 2, kind: 'ok', label: 'normal' }, { after: 4, kind: 'bad', label: 'unusual' }],
          say: 'Look at this sentence. A pause between clauses is normal, and it gives the interpreter time to listen, understand, and organize. But a pause in the middle of a phrase, between the and law, is unusual. It sits at an ungrammatical location.' },
        { t: 'compare', left: { emoji: '🟢', title: 'Normal pauses', items: ['Time to listen and organize', 'Make interpreting easier'] }, right: { emoji: '🔴', title: 'Unusual pauses', items: ['Not enough information to process', 'May hinder the interpreter'] },
          say: 'Normal pauses make interpreting easier. Unusual pauses can hinder the interpreter, because the information is not enough to process. Gerver also found that interpreters pause in the same positions as the speaker. That is called structural correspondence.' },
        {"t":"example","rows":[{"who":"src","text":"Ladies and gentlemen, ⏸ welcome to our conference. ⏸","tag":"normal pauses"},{"who":"tgt","text":"سيداتي وسادتي، مرحبًا بكم في مؤتمرنا."},{"who":"bad","label":"Unusual pause","text":"We must protect the ⏸ … environment."},{"who":"note","text":"After \"the\" he cannot go on: he does not know the noun yet"}],"say":"A real example. Ladies and gentlemen, pause, welcome to our conference, pause. These pauses come at natural places, so the interpreter uses them to speak. Now listen: we must protect the, pause, environment. The pause comes right after the. The interpreter cannot continue, because he does not know yet what must be protected."},
        { t: "picture", photo: "traffic", kb: "up", emoji: "🚦", caption: "A stop in the right place helps; in the wrong place it causes a jam", say: "Think of traffic lights. A red light at a crossing helps the traffic. A red light in the middle of a road just causes a jam. Pauses work the same way." },
        { t: 'recap', points: ['Normal pauses = help', 'Unusual pauses = difficulty', 'Same pause positions = structural correspondence'], say: 'Remember: normal pauses help, unusual pauses make it difficult.' }
      ] },

    { id: 'v06', title: "What are segmentation and chunking?", gist: "Cutting speech into small meaningful pieces to understand and remember it.", ar: 'التقسيم = تقطيع الكلام لوحدات ليها معنى عشان تفهمها وتحفظها.', tone: 'amber', refs: { gaps: [2, 3, 10, 50, 51, 52, 56, 76, 77], mcq: [2, 3, 6], essay: [11, 12] },
      scenes: [
        { t: 'title', emoji: '🍕', sub: 'Segmentation and chunking', say: "Video six. What are segmentation and chunking?" },
        { t: 'story', say: "A speaker delivers one long sentence. The interpreter cannot hold all of it in his head. So he cuts it into small pieces, understands each piece, and speaks piece by piece.", beats: [{"who":"speaker","text":"The delegates agreed to postpone the vote until next week."},{"who":"note","text":"Chunk 1 | Chunk 2 | Chunk 3"},{"who":"interp","text":"اتفق المندوبون … على تأجيل التصويت … إلى الأسبوع المقبل"}] },
        { t: 'def', parts: ['Segmentation means ', M('dividing speech into smaller meaningful units'), ', called chunks, that are easier to process.'], say: 'Segmentation means dividing speech into smaller meaningful units, called chunks, that are easier to process.' },
        { t: 'chunks', words: ['The', 'delegates', 'agreed', 'to', 'postpone', 'the', 'vote', 'until', 'next', 'week'], groups: [{ from: 0, to: 2, label: 'Chunk 1', cls: 'a' }, { from: 3, to: 6, label: 'Chunk 2', cls: 'b' }, { from: 7, to: 9, label: 'Chunk 3', cls: 'c' }], pauses: [],
          say: 'A long sentence arrives. The interpreter does not process it all at once. They cut it into meaningful chunks, understand each one, and keep it in memory.' },
        { t: 'steps', items: [{ emoji: '✂️', text: 'Divide the speech into units' }, { emoji: '💡', text: 'Understand each unit' }, { emoji: '📦', text: 'Store it in memory' }],
          say: 'Kalina sees segmentation, or chunking, as a comprehension-based strategy that helps memory storage. Each interpreter segments in their own way, and the output chunks do not have to match the input chunks.' },
        {"t":"example","rows":[{"who":"src","text":"The delegates agreed │ to postpone the vote │ until next week."},{"who":"tgt","text":"اتفق المندوبون │ على تأجيل التصويت │ حتى الأسبوع المقبل."},{"who":"note","text":"3 chunks in, 3 chunks out: each one is easy to hold"}],"say":"A real example. The delegates agreed, to postpone the vote, until next week. The interpreter takes it in three chunks, and says each chunk in Arabic as soon as he understands it. Each chunk is small enough to hold in memory."},
        { t: "picture", photo: "pizza", kb: "in", emoji: "🍕", caption: "Nobody eats a whole pizza in one bite", say: "Nobody eats a whole pizza in one bite. You cut it into slices and eat slice by slice. Segmentation is slicing the speech." },
        { t: 'recap', points: ['Segmentation = Divide + Understand + Remember', 'Chunking helps memory storage'], say: 'Remember: divide, understand, remember.' }
      ] },

    { id: 'v07', title: "What is a propositional meaning unit?", gist: "A complete idea: a noun phrase plus a verb phrase (the predicate).", ar: 'الوحدة المعنوية الكاملة = مركب اسمي + مركب فعلي (المسند).', tone: 'purple', refs: { gaps: [11, 12, 53, 68], mcq: [7], essay: [7] },
      scenes: [
        { t: 'title', emoji: '🧩', sub: 'Propositional meaning unit', say: "Video seven. What is a propositional meaning unit?" },
        { t: 'story', say: "The interpreter hears: the delegates. He waits. Who did what? Only when he hears: agreed to postpone the vote, does he have a complete idea, and he starts speaking.", beats: [{"who":"speaker","text":"The delegates … (who?)"},{"who":"note","text":"Waiting for the predicate"},{"who":"speaker","text":"… agreed to postpone the vote."},{"who":"interp","text":"اتفق المندوبون على تأجيل التصويت"}] },
        { t: 'def', parts: ['A complete predicative expression is a ', M('noun phrase'), ' followed by a ', M('verb phrase'), ', which is the predicate.'], say: 'A complete predicative expression is a noun phrase followed by a verb phrase. The verb phrase is called the predicate.' },
        { t: 'chunks', words: ['The', 'interpreter', 'understands', 'the', 'message'], groups: [{ from: 0, to: 1, label: 'Noun phrase: who', cls: 'a' }, { from: 2, to: 4, label: 'Verb phrase = predicate: what happens', cls: 'b' }], pauses: [],
          say: 'In this sentence, the interpreter is the noun phrase. It says who. Understands the message is the verb phrase, the predicate. It says what happens. You need both pieces for a complete unit.' },
        {"t":"example","rows":[{"who":"src","text":"The Secretary-General of the United Nations, after long talks with member states, … announced a new plan."},{"who":"note","text":"He waits for the predicate: \"announced\""},{"who":"tgt","text":"أعلن الأمين العام للأمم المتحدة، بعد محادثات طويلة مع الدول الأعضاء، عن خطة جديدة."}],"say":"A real example. The Secretary-General of the United Nations, after long talks with member states, announced a new plan. The interpreter hears a long noun phrase first, but he does not know what he did. He waits for the predicate, announced. In Arabic the verb comes first, so only then can he start."},
        { t: "picture", photo: "puzzle", kb: "right", emoji: "🧩", caption: "Pieces that must click together: who + what happens", say: "Think of puzzle pieces. A piece alone means little. Who, and what happens, must click together. Interpreters usually wait for the predicate before they start speaking." },
        { t: 'recap', points: ['Complete unit = noun phrase + verb phrase', 'The predicate is the verb phrase', 'EVS units contain at least a complete predicative expression'], say: 'Remember: noun phrase plus verb phrase makes a complete unit.' }
      ] },

    {
      "id": "v08",
      "title": "What do syntactic and lexical mean?",
      "gist": "Syntactic = sentence structure. Lexical = single words. EVS units are syntactic.",
      "ar": "syntactic = تركيب الجملة (النحو)، وlexical = الكلمات المفردة (المعجم). ووحدات EVS تركيبية مش معجمية.",
      "tone": "blue",
      "refs": {
        "gaps": [
          8,
          9
        ],
        "mcq": [
          5
        ],
        "essay": []
      },
      "scenes": [
        {
          "t": "title",
          "emoji": "🧱",
          "sub": "Syntactic and lexical",
          "say": "Video eight. What do syntactic and lexical mean?"
        },
        {
          "t": "def",
          "parts": [
            "Syntactic comes from ",
            {
              "m": "syntax"
            },
            ": how words are put together into phrases and sentences. Lexical comes from ",
            {
              "m": "lexicon"
            },
            ": the words themselves."
          ],
          "say": "Syntactic comes from syntax, which means how words are put together into phrases and sentences. Lexical comes from lexicon, which means the vocabulary: the words themselves."
        },
        {
          "t": "chunks",
          "words": [
            "The",
            "committee",
            "approved",
            "the",
            "plan"
          ],
          "groups": [
            {
              "from": 0,
              "to": 1,
              "label": "Noun phrase",
              "cls": "a"
            },
            {
              "from": 2,
              "to": 4,
              "label": "Verb phrase",
              "cls": "b"
            }
          ],
          "pauses": [],
          "say": "Look at this sentence. Lexical looks at one word at a time: committee, approved, plan. Syntactic looks at the structure: the committee, a noun phrase, and approved the plan, a verb phrase."
        },
        {
          "t": "story",
          "say": "Researchers asked: when does the interpreter start speaking? After every single word? No. He waits for a structure, a complete phrase, not just one word.",
          "beats": [
            {
              "who": "speaker",
              "text": "The … committee … approved … the plan."
            },
            {
              "who": "note",
              "text": "He waits for a whole phrase, not one word"
            },
            {
              "who": "interp",
              "text": "وافقت اللجنة على الخطة"
            }
          ]
        },
        {
          "t": "compare",
          "left": {
            "emoji": "🔤",
            "title": "Lexical unit",
            "items": [
              "One word, like \"committee\"",
              "About vocabulary"
            ]
          },
          "right": {
            "emoji": "🏗️",
            "title": "Syntactic unit",
            "items": [
              "A structure, like \"the committee approved the plan\"",
              "About grammar: noun phrase + verb phrase"
            ]
          },
          "say": "In Goldman-Eisler's study, six professional interpreters interpreted short speeches. She found that E V S units are syntactic in nature, not lexical. Interpreters work with structures, not single words."
        },
        {"t":"example","rows":[{"who":"src","text":"The committee approved the plan."},{"who":"bad","label":"Word by word (lexical)","text":"اللجنة وافقت الخطة ✗"},{"who":"good","label":"By structure (syntactic)","text":"وافقت اللجنة على الخطة ✓"}],"say":"A real example. The committee approved the plan. Translated word by word, the Arabic sounds wrong, because Arabic needs a different order and a small preposition. Translated by structure, noun phrase and verb phrase, the Arabic is natural: the verb first, then the committee, then the plan with the right preposition."},
        {"t":"picture","photo":"bricks","kb":"left","emoji":"🧱","caption":"Not single bricks, but the wall they build","say":"Watch a bricklayer. Lexical is looking at each single brick. Syntactic is looking at how the bricks are built into a wall. Interpreters work with the wall."},
        {
          "t": "recap",
          "points": [
            "Syntactic = structure (syntax)",
            "Lexical = single words (lexicon)",
            "EVS units are syntactic, not lexical"
          ],
          "say": "Remember: syntactic means structure. Lexical means single words. E V S units are syntactic."
        }
      ]
    },

    { id: 'v09', title: "What is shadowing?", gist: "Repeating the speaker word for word, in the same language.", ar: 'الـ shadowing = ترديد الكلام فورًا بنفس اللغة من غير ترجمة.', tone: 'green', refs: { gaps: [70, 71, 72], mcq: [], essay: [8] },
      scenes: [
        { t: 'title', emoji: '🦜', sub: 'Shadowing', say: "Video nine. What is shadowing?" },
        { t: 'story', say: "In a training room, a student wears headphones and simply repeats every word he hears, in the same language, like an echo. There is no translating and no deep thinking. That is shadowing.", beats: [{"who":"speaker","text":"Good morning, everyone."},{"who":"interp","text":"Good morning, everyone."},{"who":"note","text":"Shadowing: same language, just repeat"}] },
        { t: 'def', parts: ['Shadowing is the ', M('immediate verbatim repetition'), ' of the input, in the ', M('same language'), '.'], say: 'Shadowing is the immediate, word for word repetition of the input, in the same language.' },
        { t: 'compare', left: { emoji: '🦜', title: 'Shadowing', items: ['Repeat the words', 'Same language', 'Shorter lag: about 3 words'] }, right: { emoji: '🧠', title: 'Interpreting', items: ['Understand + translate', 'Another language', 'Longer lag: about 4 to 5 words'] },
          say: 'In shadowing you only repeat, in the same language. In interpreting, you understand and translate into another language. Treisman found that the lag is longer in interpreting, about four to five words, than in shadowing, about three words.' },
        {"t":"example","rows":[{"who":"src","text":"Good morning, everyone, and welcome."},{"who":"src","label":"Shadowing: same language, about 3 words behind","text":"Good morning, everyone, and welcome."},{"who":"tgt","label":"Interpreting: Arabic, about 4 to 5 words behind","text":"صباح الخير جميعًا، ومرحبًا بكم."}],"say":"A real example. The speaker says: good morning, everyone, and welcome. In shadowing, the student repeats exactly the same English words, about three words behind. In interpreting, the interpreter says it in Arabic, about four to five words behind, because he must understand and translate."},
        { t: "picture", photo: "parrot", kb: "up", emoji: "🪞", caption: "A parrot repeats; an interpreter understands", say: "A parrot repeats what it hears, without understanding it. That is shadowing. Interpreting needs much more mental effort, so the delay is longer." },
        { t: 'recap', points: ['Shadowing = Repeat', 'Interpreting = Understand + Translate', 'Interpreting needs more mental effort'], say: 'Remember: shadowing is repeat. Interpreting is understand and translate.' }
      ] },

    { id: 'v10', title: "What is cognitive load?", gist: "How much mental effort interpreting takes.", ar: 'الحمل المعرفي = كمية الجهد الذهني، وكل ما زاد زادت الأخطاء وقلّت الطلاقة.', tone: 'amber', cover: 'juggler', refs: { gaps: [69, 73, 74], mcq: [], essay: [9, 10] },
      scenes: [
        { t: 'title', emoji: '🎒', sub: 'Cognitive load', say: "Video ten. What is cognitive load?" },
        { t: 'story', say: "Now imagine the booth when the speaker talks fast about a very difficult topic. The interpreter must listen, understand, remember, translate, and speak, all at once. His brain is working very hard.", beats: [{"who":"speaker","text":"Inflation, tariffs and fiscal policy…","badge":{"text":"fast!","tone":"bad"}},{"who":"interp","text":"Hmm… 😓"},{"who":"note","text":"High cognitive load"}] },
        { t: 'def', parts: ['Cognitive load is the ', M('amount of mental effort'), ' needed during interpreting.'], say: 'Cognitive load is the amount of mental effort needed during interpreting.' },
        { t: 'steps', items: [{ emoji: '👂', text: 'Listen' }, { emoji: '💡', text: 'Understand' }, { emoji: '🧠', text: 'Remember' }, { emoji: '🔁', text: 'Translate' }, { emoji: '🗣️', text: 'Speak' }, { emoji: '⚖️', text: 'Keep making decisions' }],
          say: 'The interpreter must listen, understand, remember, translate, and speak, all at once, and keep making decisions. All of this is cognitive activity, and it can make the time lag longer.' },
        {"t":"example","rows":[{"who":"good","label":"Low load: formulaic","text":"Thank you, Mr. Chairman. → شكرًا سيدي الرئيس."},{"who":"bad","label":"High load: dense, numbers, terms","text":"Inflation-adjusted fiscal deficits rose by 3.2 percent in the third quarter."},{"who":"note","text":"Course book: load goes down with formulaic speech, up with lexical density"}],"say":"A real example. Thank you, Mr. Chairman, is formulaic: the interpreter has said it many times, so the load is low. But: inflation-adjusted fiscal deficits rose by three point two percent in the third quarter, is full of terms and numbers, so the load jumps. The course book says cognitive load goes down with formulaic speech, and up with lexical density."},
        { t: "picture", photo: "backpack", kb: "right", emoji: "🎒", caption: "Every task adds weight to the backpack", say: "Imagine a long hike with a backpack that gets heavier with every task. When the load is too high, mistakes, memory problems, and less fluent speech appear." },
        { t: 'recap', points: ['Cognitive load = mental effort', 'High load = more mistakes + less fluency'], say: 'Remember: high load means more mistakes and less fluency.' }
      ] },

    { id: 'v11', title: "What do source and target mean?", gist: "Source = the original speech (SL, input). Target = the interpretation (TL, output).", ar: 'المصدر = كلام المتحدث (input)، والهدف = ترجمة المترجم (output).', tone: 'purple', refs: { gaps: [26, 57, 58, 59], mcq: [], essay: [20] },
      scenes: [
        { t: 'title', emoji: '📮', sub: 'Source and target', say: "Video eleven. What do source and target mean?" },
        { t: 'story', say: "The speaker's language is the source. The audience's language is the target. The message travels from the source to the target, through the interpreter.", beats: [{"who":"speaker","text":"SOURCE: the original speech, in English"},{"who":"interp","text":"TARGET: the interpretation, in Arabic"},{"who":"note","text":"Input → Interpreter → Output"}] },
        { t: 'compare', left: { emoji: '🎤', title: 'Source', items: ['The original speaker', 'The input', 'Source language, SL'] }, right: { emoji: '🎧', title: 'Target', items: ['The interpreter', 'The output', 'Target language, TL'] },
          say: 'The source is the original speaker, and the original message. It is the input, in the source language, S L. The target is the interpreter, and the translated message. It is the output, in the target language, T L.' },
        {"t":"example","rows":[{"who":"src","label":"Source · SL (English) · input","text":"Water is life."},{"who":"tgt","label":"Target · TL (Arabic) · output","text":"الماء هو الحياة."}],"say":"A real example. The speaker says: water is life. That English sentence is the source: the input, in the source language. The interpreter says it in Arabic. That Arabic sentence is the target: the output, in the target language."},
        { t: "picture", photo: "bridge", kb: "left", emoji: "📮", caption: "The interpreter is the bridge from source to target", say: "Think of Qasr El Nil Bridge in Cairo. The source is one bank of the Nile, the target is the other bank, and the interpreter is the bridge between them. In Gerver's study, the source was French and the target was English." },
        { t: 'recap', points: ['Source = input = SL', 'Target = output = TL'], say: 'Remember: source is input, target is output.' }
      ] },

    { id: 'v12', title: "What are balanced and dominant bilinguals?", gist: "Balanced = equally strong in both languages. Dominant = one language is stronger.", ar: 'ثنائي اللغة المتوازن = مستوى متساوي في اللغتين، والمهيمن = أقوى في لغة.', tone: 'green', refs: { gaps: [30, 31, 47, 48, 49, 80], mcq: [15, 19], essay: [13, 18] },
      scenes: [
        { t: 'title', emoji: '⚖️', sub: 'Bilingual, balanced, dominant', say: "Video twelve. What are balanced and dominant bilinguals?" },
        { t: 'def', parts: ['A ', M('bilingual'), ' is a person who speaks two languages. How good they are in each is called proficiency.'], say: 'A bilingual is a person who speaks two languages. How good they are in each language is called proficiency.' },
        { t: 'compare', left: { emoji: '⚖️', title: 'Balanced bilingual', items: ['Equal proficiency', 'Both languages at the same level'] }, right: { emoji: '🏋️', title: 'Dominant bilingual', items: ['One language is stronger', 'The other is weaker'] },
          say: 'A balanced bilingual has almost equal proficiency in both languages. A dominant bilingual is stronger in one language than in the other. Interpreters need a high level in both the source and the target language.' },
        {"t":"example","rows":[{"who":"good","label":"Mohamed: balanced","text":"English 9/10 · Arabic 9/10"},{"who":"src","label":"Karim: dominant in Arabic","text":"Arabic 10/10 · English 6/10"},{"who":"note","text":"Interpreters need a high level in both languages"}],"say":"An example. Mohamed's English and Arabic are both nine out of ten: he is a balanced bilingual. Karim's Arabic is ten out of ten, but his English is six: he is a dominant bilingual, dominant in Arabic. To interpret well, Karim must raise his English."},
        { t: "picture", photo: "scales", kb: "in", emoji: "⚖️", caption: "Balanced: level scales. Dominant: one side is heavier", say: "Picture a pair of scales. Balanced means the scales are level. Dominant means one side is heavier." },
        { t: 'recap', points: ['Balanced = Equal', 'Dominant = One is stronger', 'Interpreters need high proficiency in SL and TL'], say: 'Remember: balanced is equal. Dominant is one stronger.' }
      ] },

    { id: 'v13', title: "What is natural translation?", gist: "Translating without any training, just because you know two languages (Harris, 1977).", ar: 'أي ثنائي اللغة عنده قدرة طبيعية على الترجمة من غير تدريب متخصص (هاريس 1977).', tone: 'amber', cover: 'sign', refs: { gaps: [32, 33], mcq: [], essay: [14] },
      scenes: [
        { t: 'title', emoji: '👧', sub: 'Natural translation / interpreting', say: "Video thirteen. What is natural translation?" },
        { t: 'def', parts: ['Harris said any bilingual has a ', M('natural ability to translate'), ' without receiving specialized training.'], say: 'Harris, in 1977, said that any bilingual has a natural ability to translate, without receiving any specialized training.' },
        { t: 'compare', left: { emoji: '👧', title: 'Natural interpreting', items: ['No special training', 'Comes from knowing two languages'] }, right: { emoji: '🎓', title: 'Professional interpreting', items: ['Trained skills and strategies', 'Works under time pressure'] },
          say: 'Think of a child who helps a grandparent talk to a doctor. That is natural interpreting. Professional interpreting adds training, skills, and strategies.' },
        {"t":"example","rows":[{"who":"src","label":"Doctor (English)","text":"Where does it hurt?"},{"who":"tgt","label":"Boy to his grandmother (Arabic)","text":"الدكتور بيسألك: بيوجعك فين؟"},{"who":"note","text":"No training, just two languages: natural interpreting"}],"say":"A real example. A doctor asks: where does it hurt? The boy turns to his grandmother and says it in Arabic. Nobody trained this boy. He can do it because he knows both languages. That is natural interpreting."},
        { t: 'recap', points: ['Natural translation = Bilingualism + natural ability − specialized training'], say: 'Remember: bilingualism, plus natural ability, minus specialized training.' }
      ] },

    { id: 'v14', title: "What affects proficiency in a second language?", gist: "Age of acquisition, motivation, personality and how close the languages are.", ar: 'اللي بيأثر على مستواك في اللغة التانية: سن الاكتساب، الدافع، الشخصية، وقرب اللغات.', tone: 'green', refs: { gaps: [34, 35, 36], mcq: [], essay: [15] },
      scenes: [
        { t: 'title', emoji: '🌱', sub: 'Factors of proficiency', say: "Video fourteen. What affects proficiency in a second language?" },
        { t: 'steps', items: [{ emoji: '🎂', text: 'Age of acquisition' }, { emoji: '🔥', text: 'Motivation' }, { emoji: '🎭', text: 'Personality' }, { emoji: '🧭', text: 'Closeness of the two languages' }],
          say: 'According to the course book, being proficient in a second language depends on the age of acquisition, motivation, personality, and how close the languages involved are. Your essay answer also mentions language exposure.' },
        {"t":"example","rows":[{"who":"good","label":"Samir","text":"Started English at 5 · loves English films · watches every day"},{"who":"src","label":"Ali","text":"Started English at 18 · studies only before exams"},{"who":"note","text":"Age of acquisition, motivation and exposure all help Samir"}],"say":"An example. Samir started English at five, loves English films, and watches them every day. Ali started at eighteen, and studies only before exams. Age of acquisition, motivation, and exposure all help Samir. Closeness matters too: Italian is easier for a Spanish speaker than Chinese is for an Arabic speaker."},
        { t: "picture", photo: "seedling", kb: "in", emoji: "🌱", caption: "Start early, keep it watered, and it grows", say: "These seedlings are growing on the International Space Station. A language grows like a plant: starting early, staying motivated, and plenty of exposure help it grow." },
        { t: 'recap', points: ['Age + Motivation + Personality + (closeness / exposure)'], say: 'Remember: age, motivation, personality.' }
      ] },

    { id: 'v15', title: "What is language interference?", gist: "When one language affects the other.", ar: 'التداخل اللغوي = لغة بتأثر على التانية، حتى لو مستواك عالي.', tone: 'purple', refs: { gaps: [37, 38, 39], mcq: [16], essay: [16] },
      scenes: [
        { t: 'title', emoji: '🙈', sub: 'Language interference', say: "Video fifteen. What is language interference?" },
        { t: 'def', parts: ['Language interference happens when ', M('one language influences another'), '.'], say: 'Language interference happens when one language influences another.' },
        { t: 'steps', items: [{ emoji: '🆕', text: 'A learner meets a new word in the second language, L2' }, { emoji: '🔗', text: 'They link it to a concept through their first language, L1' }, { emoji: '🔍', text: 'Later they see how much the concepts really overlap' }],
          say: 'According to De Bot, it happens when second language learners meet new words and link them to concepts through their first language. Later they realize how much the concepts overlap, or do not. And even a high level of proficiency does not prevent it.' },
        {"t":"example","rows":[{"who":"bad","label":"Interference from Arabic (افتح النور)","text":"Open the light."},{"who":"good","label":"Correct English","text":"Turn on the light."},{"who":"bad","label":"Interference from Arabic (عندي 20 سنة)","text":"I have 20 years."},{"who":"good","label":"Correct English","text":"I am 20 years old."}],"say":"Real examples that many Arabic speakers make. Open the light, because that is how we say it in Arabic. The correct English is: turn on the light. Or: I have twenty years, again from Arabic. The correct English is: I am twenty years old. That is the first language interfering with the second."},
        { t: "picture", photo: "babel", kb: "up", emoji: "🙈", caption: "Languages mixing: a little Babel in your head", say: "Remember the Tower of Babel, where languages got mixed up. Interference is a small Babel inside your head: your first language slips into the second one, with its grammar and its words." },
        { t: 'recap', points: ['One language affects another', 'Can happen even with high proficiency'], say: 'Remember: one language affects another.' }
      ] },

    { id: 'v16', title: "What is psycholinguistics?", gist: "The study of language in the mind and the brain.", ar: 'علم اللغة النفسي = دراسة العمليات العقلية والعصبية اللي بتخلّينا نكتسب اللغة.', tone: 'blue', refs: { gaps: [42, 43, 44, 45], mcq: [18], essay: [17] },
      scenes: [
        { t: 'title', emoji: '🧠', sub: 'Psycholinguistics', say: "Video sixteen. What is psycholinguistics?" },
        { t: 'def', parts: ['The study of the ', M('mental and cognitive processes'), ' and the ', M('neural mechanisms'), ' that let a person acquire one or more languages.'], say: 'Psycholinguistics studies the mental and cognitive processes, and the neural mechanisms, that let a person acquire one or more languages. The study of bilingualism belongs to it.' },
        { t: 'steps', items: [{ emoji: '💭', text: 'Mental / cognitive processes: how the mind works with language' }, { emoji: '🧬', text: 'Neural mechanisms: how the brain does it' }, { emoji: '📚', text: 'Language acquisition: learning one or more languages' }], say: 'It asks how the mind understands and produces language, how the brain works during language activities, and how people learn one or more languages.' },
        {"t":"example","rows":[{"who":"note","label":"A question psycholinguists ask","text":"Why does the EVS get longer when a sentence is difficult?"},{"who":"note","label":"Another one","text":"How does a bilingual brain keep two languages apart and switch between them?"},{"who":"note","label":"And another","text":"How does a child acquire two languages at the same time?"}],"say":"Examples of questions psycholinguists ask. Why does the interpreter's E V S get longer when a sentence is difficult? How does a bilingual brain keep two languages apart, and switch between them? How does a child acquire two languages at the same time?"},
        { t: "picture", photo: "brain", kb: "in", emoji: "🛋️", caption: "Language + mind + brain", say: "This is a scan of a real human brain. Psycholinguistics studies what happens in here when we learn, understand, and produce language. Language, plus mind, plus brain." },
        { t: 'recap', points: ['Psycholinguistics = Language + Mind + Brain', 'Bilingualism belongs to psycholinguistics'], say: 'Remember: language, mind, and brain.' }
      ] },

    { id: 'v17', title: "How is an interpreter different from a normal bilingual?", gist: "Interpreters must understand and speak at the same time, under pressure.", ar: 'المترجم الفوري مش مجرد ثنائي اللغة: لازم يفهم وينتج بسرعة وتحت ضغط.', tone: 'amber', refs: { gaps: [40, 41, 46, 78], mcq: [17], essay: [19] },
      scenes: [
        { t: 'title', emoji: '🏎️', sub: 'Interpreter vs normal bilingual', say: "Video seventeen. How is an interpreter different from a normal bilingual?" },
        { t: 'story', say: "Ahmed speaks Arabic and English perfectly at home. But put him in the booth, and he must understand one language while speaking another, under pressure, for a long time. That is a different skill from simply being bilingual.", beats: [{"who":"speaker","text":"Talking at normal speed for an hour…"},{"who":"interp","text":"Understand + remember + speak!"},{"who":"note","text":"Interpreters do more than speak two languages"}] },
        { t: 'def', parts: ['Interpreters need ', M('perceptive skills'), ' (understanding language) and ', M('productive skills'), ' (producing it).'], say: 'Interpreters need perceptive skills, which means understanding language, and productive skills, which means producing it.' },
        { t: 'compare', left: { emoji: '🚗', title: 'Normal bilingual', items: ['Knows two languages', 'May understand but not produce'] }, right: { emoji: '🏎️', title: 'Simultaneous interpreter', items: ['Productive and close to balanced', 'Listens, understands, remembers, speaks', 'Understands one language while speaking another'] },
          say: 'A normal bilingual knows two languages, but may understand without producing. A simultaneous interpreter is productive and close to balanced, and must understand one language while speaking another, under time pressure.' },
        {"t":"example","rows":[{"who":"src","label":"Dillinger (1994): a real study","text":"Professional interpreters vs balanced bilinguals with no interpreting experience"},{"who":"good","label":"Result","text":"The interpreters were more accurate with syntactically and conceptually complex texts"},{"who":"note","text":"Strategies and types of errors: no difference between the two groups"}],"say":"A real study from the course book. Dillinger compared professional interpreters with balanced bilinguals who had no interpreting experience. The professionals were more accurate when the text was syntactically and conceptually complex, although both groups used similar strategies and made similar types of errors. Comprehension under difficult conditions is a skill interpreters practise."},
        { t: "picture", photo: "racecar", kb: "right", emoji: "🏎️", caption: "Everyone can drive. Interpreters race", say: "Everyone can drive an ordinary car. A simultaneous interpreter drives a race car, at high speed, with no time to stop." },
        { t: 'recap', points: ['Interpreters do more than speak two languages'], say: 'Remember: interpreters do more than speak two languages.' }
      ] },

    { id: 'v18', title: "What are early sequential and late bilinguals?", gist: "Early sequential = both languages from birth. Late = the second language later in life.", ar: 'الثنائي المبكر (early sequential) اتعرّض للغتين من الولادة، والمتأخر اتعلّم التانية بعد الأولى.', tone: 'green', cover: 'seedling', refs: { gaps: [79], mcq: [], essay: [] },
      scenes: [
        { t: 'title', emoji: '⏳', sub: 'When bilinguals learn their languages', say: "Video eighteen. What are early sequential and late bilinguals?" },
        { t: 'steps', items: [{ emoji: '👶', text: 'Simultaneous bilingual' }, { emoji: '🍼', text: 'Early sequential: exposed to the two languages from birth' }, { emoji: '🧑‍🎓', text: 'Late bilingual: learns a second language later, after the first' }],
          say: 'According to the course book, bilinguals can be simultaneous, early sequential, meaning exposed to the two languages from birth, or late, meaning they learn a second language later in life, after the first one.' },
        { t: 'def', parts: ['All ages of first exposure ', M('may lead to balanced bilingualism'), ' with a high level of proficiency in both languages.'], say: 'The good news: all ages of first exposure may lead to balanced bilingualism, with a high level of proficiency in both languages.' },
        {"t":"example","rows":[{"who":"good","label":"Youssef: early sequential","text":"Arabic-speaking father, English-speaking mother: both languages from birth"},{"who":"src","label":"Omar: late bilingual","text":"Only Arabic at home · learned English at 15"},{"who":"note","text":"With practice, both can reach a high level"}],"say":"An example. Youssef has an Arabic-speaking father and an English-speaking mother, and heard both languages from birth: in the book's terms, he is an early sequential bilingual. Omar spoke only Arabic at home and learned English at fifteen: he is a late bilingual. With enough practice, both can reach a high level."},
        { t: 'recap', points: ['Early sequential = exposed to both languages from birth', 'Late = second language later in life'], say: 'Remember: early sequential means from birth. Late means later in life.' }
      ] },

    { id: 'v19', title: "The two classic studies: Goldman-Eisler and Gerver", gist: "Who they studied, what they did and what they found.", ar: 'دراستا غولدمان-أيزلر وجيرفر: مين، وإيه اللي عملوه، وإيه النتيجة.', tone: 'blue', refs: { gaps: [4, 5, 6, 7, 21, 22, 23], mcq: [4, 11, 12], essay: [] },
      scenes: [
        { t: 'title', emoji: '🔬', sub: 'Goldman-Eisler and Gerver', say: "Video nineteen. The two classic studies: Goldman-Eisler and Gerver" },
        { t: 'story', say: "Picture Gerver's experiment: students listen to a recorded French speech and interpret it into English. In another study, Goldman-Eisler asked six professional interpreters to interpret short speeches of three to six minutes.", beats: [{"who":"speaker","text":"Un discours en français…"},{"who":"interp","text":"A speech in English…"},{"who":"note","text":"Goldman-Eisler: 6 interpreters · Gerver: French into English"}] },
        { t: 'compare', left: { emoji: '👩‍🏫', title: 'Goldman-Eisler', items: ['Six professional interpreters', 'Short speeches, 3 to 6 minutes', 'Several language pairs', 'EVS units are syntactic'] }, right: { emoji: '🇫🇷', title: 'Gerver', items: ['Students interpreting pre-recorded French into English', 'Pauses over 0.25 seconds removed', 'Interpreters paused where the speaker paused'] },
          say: 'Goldman-Eisler studied six professional interpreters, who interpreted short speeches of three to six minutes, in several language pairs. She found that E V S units are syntactic. Gerver had students interpret pre-recorded French speech into English, after removing pauses longer than a quarter of a second. Their pauses fell in the same places as the speaker\'s.' },
        {"t":"example","rows":[{"who":"src","label":"Speaker (French)","text":"Mesdames et messieurs, ⏸ bienvenue à cette conférence."},{"who":"tgt","label":"Student interpreter (English)","text":"Ladies and gentlemen, ⏸ welcome to this conference."},{"who":"note","text":"The pause falls in the same place: structural correspondence"}],"say":"Here is the kind of result Gerver found. The French speaker says: ladies and gentlemen, pause, welcome to this conference. The student interpreter pauses in the same place in English. Pauses in the same positions show structural correspondence between the source and the target."},
        { t: "picture", photo: "tape", kb: "in", emoji: "🔬", caption: "Gerver: a pre-recorded French speech, pauses removed", say: "Gerver used pre-recorded speech, played from a tape recorder like this one, after cutting out every pause longer than a quarter of a second." },
        { t: 'recap', points: ['Goldman-Eisler: 6 professionals, 3 to 6 minutes, syntactic units', 'Gerver: French into English, pauses over 0.25 s removed, structural correspondence'], say: 'Remember these two studies, and their numbers.' }
      ] }
  ];
})();
