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

  SI.videos = [
    { id: 'v01', title: 'Comprehension, not perception', ar: 'المترجم الفوري بيعتمد على الفهم مش على السمع بس.', tone: 'blue', refs: { gaps: [1, 60], mcq: [1, 20], essay: [19] },
      scenes: [
        { t: 'title', emoji: '🎧', sub: 'Simultaneous interpreting', say: 'Video one. Comprehension, not perception.' },
        { t: 'def', parts: ['In simultaneous interpreting, the interpreter ', M('listens and speaks at the same time'), ', in two languages.'], say: 'In simultaneous interpreting, the interpreter listens to the speaker and speaks in another language at the same time.' },
        { t: 'compare', left: { emoji: '👂', title: 'Perception', items: ['Hearing the sounds', 'What a normal listener does'] }, right: { emoji: '🧠', title: 'Comprehension', items: ['Understanding the meaning', 'What interpreters rely on'] },
          say: 'A normal listener depends on perception: hearing the sounds and the words. But simultaneous interpreters rely on comprehension. They understand the meaning first, and only then express it.' },
        { t: 'picture', emoji: '🍿', anim: 'bounce', caption: 'Retell the story, not the sounds', say: 'It is like telling a friend the story of a film in another language. You cannot just repeat sounds. You must understand the story first.' },
        { t: 'recap', points: ['Interpreters rely on comprehension, not perception', 'Meaning first, words second'], say: 'So remember: comprehension, not perception. Meaning first, words second.' }
      ] },

    { id: 'v02', title: 'Temporal phenomena', ar: 'الظواهر الزمنية = كل حاجة بتخص الوقت في الترجمة: الطلاقة والوقفات والتأخير.', tone: 'amber', refs: { gaps: [14, 15, 55], mcq: [], essay: [] },
      scenes: [
        { t: 'title', emoji: '⏱️', sub: 'Temporal phenomena', say: 'Video two. Temporal phenomena.' },
        { t: 'def', parts: ['Temporal means ', M('related to time'), '. These are the time features of interpreting.'], say: 'Temporal simply means related to time. Temporal phenomena are the time features of interpreting.' },
        { t: 'steps', items: [{ emoji: '🌊', text: 'Fluency: how smooth the speech is' }, { emoji: '⏸️', text: 'Pausing: the silent gaps' }, { emoji: '🐢', text: 'Lag: the delay behind the speaker' }],
          say: 'Researchers look at three things. Fluency, which is how smooth the speech is. Pausing, which is the silent gaps. And lag, which is how far the interpreter is behind the speaker. This lag is called ear-voice span.' },
        { t: 'picture', emoji: '💃', anim: 'float', caption: 'The interpreter follows the speaker, one step behind', say: 'Think of a dance. The speaker leads, and the interpreter follows, one step behind. The timing of that dance is what temporal phenomena study.' },
        { t: 'recap', points: ['Temporal = related to time', 'Fluency + Pausing + Lag'], say: 'Remember: temporal means time. Fluency, pausing, and lag.' }
      ] },

    { id: 'v03', title: 'Simultaneity and synchronicity', ar: 'التزامن: السماع والكلام بيحصلوا في نفس الوقت تقريبًا، والفجوة بينهم بتتغير.', tone: 'purple', refs: { gaps: [13, 17, 18, 19], mcq: [9, 10], essay: [1] },
      scenes: [
        { t: 'title', emoji: '🔁', sub: 'Simultaneity & synchronicity', say: 'Video three. Simultaneity and synchronicity.' },
        { t: 'def', parts: ['Simultaneity: listening and speaking happen ', M('at the same time'), '. Synchronicity: how closely input and output match in time.'], say: 'Simultaneity means listening and speaking happen at the same time. Synchronicity is how closely the speaker and the interpreter match in time.' },
        { t: 'lanes', bars: 5, lag: 1, label: 'the gap keeps changing', say: 'Look at the two lanes. The speaker talks, and the interpreter follows almost at the same time. But the gap is never fixed. It keeps changing. That is why synchronicity is difficult to measure.' },
        { t: 'picture', emoji: '🎶', anim: 'float', caption: 'Singing along to a song you have never heard', say: 'It is like singing along to a song you have never heard before. You listen and sing at once. Researchers call this task spectacular and mysterious.' },
        { t: 'recap', points: ['Synchronicity = input and output, almost at the same time', 'The time gap keeps changing'], say: 'Remember: same time, and a changing time gap.' }
      ] },

    { id: 'v04', title: 'Ear-voice span (EVS)', ar: 'EVS = الفجوة الزمنية بين ما بتسمعه وما بتقوله، وتتقاس بالثواني أو بعدد الكلمات.', tone: 'blue', refs: { gaps: [16, 54, 61, 62, 63, 64, 65, 66, 67, 69, 75], mcq: [8], essay: [3, 4, 5, 6, 7] },
      scenes: [
        { t: 'title', emoji: '🗣️', sub: 'Ear-voice span, or EVS', say: 'Video four. Ear-voice span, or E V S.' },
        { t: 'def', parts: ['EVS is the ', M('time delay'), ' between hearing the source speech and delivering the interpretation. Also called décalage or time lag.'], say: 'E V S is the time delay between hearing the source speech and delivering the interpretation. It is also called décalage, or time lag.' },
        { t: 'lanes', bars: 5, lag: 2, label: 'EVS', say: 'Here the speaker finishes a word, and the interpreter speaks it a moment later. That gap is the E V S. It gives the interpreter time to understand the message before translating it.' },
        { t: 'steps', items: [{ emoji: '⏲️', text: 'In seconds' }, { emoji: '🔢', text: 'Or by the number of content words' }],
          say: 'It can be measured in two ways: in seconds, or by counting the content words. Studies report different ranges. Paneth found an average of two to four seconds, and your question bank also mentions up to six. Use the numbers given in your question.' },
        { t: 'steps', items: [{ emoji: '🔑', text: 'Where the key words are' }, { emoji: '🏗️', text: 'Sentence structure, such as the predicate' }, { emoji: '🧠', text: 'Mental effort' }, { emoji: '😵', text: 'How difficult the speech is' }, { emoji: '👤', text: 'Who is interpreting' }],
          say: 'What changes its length? Where the key words are, the sentence structure, the mental effort, how difficult the speech is, and who is interpreting. The interpreter must understand enough of the original before starting.' },
        { t: 'picture', art: 'echo', emoji: '⛰️', anim: 'float', caption: 'Like an echo: the voice comes back a moment later', say: 'Think of an echo in a valley. You shout, and the sound comes back a moment later. That small delay is the E V S.' },
        { t: 'recap', points: ['Ear = hearing. Voice = speaking. EVS = the gap between them', 'Two ways to measure: seconds and words'], say: 'Remember: ear is hearing, voice is speaking, and E V S is the gap between them.' }
      ] },

    { id: 'v05', title: 'Pauses', ar: 'الوقفات الطبيعية في كلام المتحدث بتساعد المترجم، والوقفات الغريبة بتصعّب عليه.', tone: 'green', refs: { gaps: [20, 23, 24, 25, 27, 28, 29], mcq: [13, 14], essay: [2] },
      scenes: [
        { t: 'title', emoji: '⏸️', sub: 'Pauses', say: 'Video five. Pauses.' },
        { t: 'def', parts: ['Pauses are ', M('interruptions in the flow of speech'), '. Silent pauses are empty gaps. Filled pauses are hesitations like uh.'], say: 'Pauses are interruptions in the flow of speech. Silent pauses are empty gaps. Filled pauses are hesitations, like uh.' },
        { t: 'chunks', words: ['The', 'minister', 'said', 'that', 'the', 'law', 'will', 'change'], groups: [], pauses: [{ after: 2, kind: 'ok', label: 'normal' }, { after: 4, kind: 'bad', label: 'unusual' }],
          say: 'Look at this sentence. A pause between clauses is normal, and it gives the interpreter time to listen, understand, and organize. But a pause in the middle of a phrase, between the and law, is unusual. It sits at an ungrammatical location.' },
        { t: 'compare', left: { emoji: '🟢', title: 'Normal pauses', items: ['Time to listen and organize', 'Make interpreting easier'] }, right: { emoji: '🔴', title: 'Unusual pauses', items: ['Not enough information to process', 'May hinder the interpreter'] },
          say: 'Normal pauses make interpreting easier. Unusual pauses can hinder the interpreter, because the information is not enough to process. Gerver also found that interpreters pause in the same positions as the speaker. That is called structural correspondence.' },
        { t: 'picture', art: 'traffic', emoji: '🚦', anim: 'bounce', caption: 'A green light helps. A red light in the wrong place causes a jam', say: 'Think of traffic lights. A normal stop helps traffic. A red light in the middle of nowhere causes a jam.' },
        { t: 'recap', points: ['Normal pauses = help', 'Unusual pauses = difficulty', 'Same pause positions = structural correspondence'], say: 'Remember: normal pauses help, unusual pauses make it difficult.' }
      ] },

    { id: 'v06', title: 'Segmentation and chunking', ar: 'التقسيم = تقطيع الكلام لوحدات ليها معنى عشان تفهمها وتحفظها.', tone: 'amber', refs: { gaps: [2, 3, 10, 50, 51, 52, 56, 76, 77], mcq: [2, 3, 6], essay: [11, 12] },
      scenes: [
        { t: 'title', emoji: '🍕', sub: 'Segmentation and chunking', say: 'Video six. Segmentation and chunking.' },
        { t: 'def', parts: ['Segmentation means ', M('dividing speech into smaller meaningful units'), ', called chunks, that are easier to process.'], say: 'Segmentation means dividing speech into smaller meaningful units, called chunks, that are easier to process.' },
        { t: 'chunks', words: ['The', 'delegates', 'agreed', 'to', 'postpone', 'the', 'vote', 'until', 'next', 'week'], groups: [{ from: 0, to: 2, label: 'Chunk 1', cls: 'a' }, { from: 3, to: 6, label: 'Chunk 2', cls: 'b' }, { from: 7, to: 9, label: 'Chunk 3', cls: 'c' }], pauses: [],
          say: 'A long sentence arrives. The interpreter does not process it all at once. They cut it into meaningful chunks, understand each one, and keep it in memory.' },
        { t: 'steps', items: [{ emoji: '✂️', text: 'Divide the speech into units' }, { emoji: '💡', text: 'Understand each unit' }, { emoji: '📦', text: 'Store it in memory' }],
          say: 'Kalina sees segmentation, or chunking, as a comprehension-based strategy that helps memory storage. Each interpreter segments in their own way, and the output chunks do not have to match the input chunks.' },
        { t: 'picture', art: 'pizza', emoji: '🍕', anim: 'slice', caption: 'Nobody eats a whole pizza in one bite', say: 'Nobody eats a whole pizza in one bite. You eat slice by slice. Segmentation is slicing the speech.' },
        { t: 'recap', points: ['Segmentation = Divide + Understand + Remember', 'Chunking helps memory storage'], say: 'Remember: divide, understand, remember.' }
      ] },

    { id: 'v07', title: 'Propositional meaning unit and predicate', ar: 'الوحدة المعنوية الكاملة = مركب اسمي + مركب فعلي (المسند).', tone: 'purple', refs: { gaps: [11, 12, 53, 68], mcq: [7], essay: [7] },
      scenes: [
        { t: 'title', emoji: '🧩', sub: 'Propositional meaning unit', say: 'Video seven. The propositional meaning unit, and the predicate.' },
        { t: 'def', parts: ['A complete predicative expression is a ', M('noun phrase'), ' followed by a ', M('verb phrase'), ', which is the predicate.'], say: 'A complete predicative expression is a noun phrase followed by a verb phrase. The verb phrase is called the predicate.' },
        { t: 'chunks', words: ['The', 'interpreter', 'understands', 'the', 'message'], groups: [{ from: 0, to: 1, label: 'Noun phrase: who', cls: 'a' }, { from: 2, to: 4, label: 'Verb phrase = predicate: what happens', cls: 'b' }], pauses: [],
          say: 'In this sentence, the interpreter is the noun phrase. It says who. Understands the message is the verb phrase, the predicate. It says what happens. You need both pieces for a complete unit.' },
        { t: 'picture', art: 'puzzle', emoji: '🧩', anim: 'bounce', caption: 'Two pieces that must click: who + what happens', say: 'Think of two puzzle pieces. Who, and what happens. They must click together. Interpreters usually wait for the predicate before they start speaking.' },
        { t: 'recap', points: ['Complete unit = noun phrase + verb phrase', 'The predicate is the verb phrase', 'EVS units contain at least a complete predicative expression'], say: 'Remember: noun phrase plus verb phrase makes a complete unit.' }
      ] },

    { id: 'v08', title: 'Syntactic, not lexical', ar: 'وحدات EVS مبنية على تركيب الجملة (syntactic) مش على الكلمات المفردة (lexical).', tone: 'blue', refs: { gaps: [8, 9], mcq: [5], essay: [] },
      scenes: [
        { t: 'title', emoji: '🧱', sub: 'Syntactic and lexical', say: 'Video eight. Syntactic, not lexical.' },
        { t: 'compare', left: { emoji: '🏗️', title: 'Syntactic', items: ['About sentence structure', 'Phrases, like noun phrase and verb phrase'] }, right: { emoji: '🔤', title: 'Lexical', items: ['About individual words', 'Single words, one by one'] },
          say: 'Syntactic means about sentence structure. Lexical means about individual words.' },
        { t: 'def', parts: ['Goldman-Eisler found that EVS units are ', M('syntactic in nature, not lexical'), '.'], say: 'In Goldman-Eisler\'s study, six professional interpreters interpreted short speeches. She found that E V S units are syntactic in nature, not lexical.' },
        { t: 'picture', emoji: '🧱', anim: 'slice', caption: 'Not single bricks, but the shape of the wall', say: 'Think of a wall. Lexical is looking at single bricks. Syntactic is looking at how the bricks form the wall. Interpreters process the wall.' },
        { t: 'recap', points: ['EVS units are syntactic', 'Not mainly lexical'], say: 'Remember: syntactic, structure. Lexical, single words.' }
      ] },

    { id: 'v09', title: 'Shadowing', ar: 'الـ shadowing = ترديد الكلام فورًا بنفس اللغة من غير ترجمة.', tone: 'green', refs: { gaps: [70, 71, 72], mcq: [], essay: [8] },
      scenes: [
        { t: 'title', emoji: '🦜', sub: 'Shadowing', say: 'Video nine. Shadowing.' },
        { t: 'def', parts: ['Shadowing is the ', M('immediate verbatim repetition'), ' of the input, in the ', M('same language'), '.'], say: 'Shadowing is the immediate, word for word repetition of the input, in the same language.' },
        { t: 'compare', left: { emoji: '🦜', title: 'Shadowing', items: ['Repeat the words', 'Same language', 'Shorter lag: about 3 words'] }, right: { emoji: '🧠', title: 'Interpreting', items: ['Understand + translate', 'Another language', 'Longer lag: about 4 to 5 words'] },
          say: 'In shadowing you only repeat, in the same language. In interpreting, you understand and translate into another language. Treisman found that the lag is longer in interpreting, about four to five words, than in shadowing, about three words.' },
        { t: 'picture', art: 'parrot', emoji: '🪞', anim: 'float', caption: 'Your shadow copies you without thinking', say: 'Your shadow copies you without thinking. Interpreting needs more mental effort, so the delay is longer.' },
        { t: 'recap', points: ['Shadowing = Repeat', 'Interpreting = Understand + Translate', 'Interpreting needs more mental effort'], say: 'Remember: shadowing is repeat. Interpreting is understand and translate.' }
      ] },

    { id: 'v10', title: 'Cognitive load', ar: 'الحمل المعرفي = كمية الجهد الذهني، وكل ما زاد زادت الأخطاء وقلّت الطلاقة.', tone: 'amber', refs: { gaps: [69, 73, 74], mcq: [], essay: [9, 10] },
      scenes: [
        { t: 'title', emoji: '🎒', sub: 'Cognitive load', say: 'Video ten. Cognitive load.' },
        { t: 'def', parts: ['Cognitive load is the ', M('amount of mental effort'), ' needed during interpreting.'], say: 'Cognitive load is the amount of mental effort needed during interpreting.' },
        { t: 'steps', items: [{ emoji: '👂', text: 'Listen' }, { emoji: '💡', text: 'Understand' }, { emoji: '🧠', text: 'Remember' }, { emoji: '🔁', text: 'Translate' }, { emoji: '🗣️', text: 'Speak' }, { emoji: '⚖️', text: 'Keep making decisions' }],
          say: 'The interpreter must listen, understand, remember, translate, and speak, all at once, and keep making decisions. All of this is cognitive activity, and it can make the time lag longer.' },
        { t: 'picture', art: 'backpack', emoji: '🎒', anim: 'meter', caption: 'Each task makes the bag heavier', meter: { label: 'Mental effort', to: 92 }, say: 'Imagine a backpack that gets heavier with every task. When the load is high, mistakes, memory problems, and less fluent speech can appear.' },
        { t: 'recap', points: ['Cognitive load = mental effort', 'High load = more mistakes + less fluency'], say: 'Remember: high load means more mistakes and less fluency.' }
      ] },

    { id: 'v11', title: 'Source and target', ar: 'المصدر = كلام المتحدث (input)، والهدف = ترجمة المترجم (output).', tone: 'purple', refs: { gaps: [26, 57, 58, 59], mcq: [], essay: [20] },
      scenes: [
        { t: 'title', emoji: '📮', sub: 'Source and target', say: 'Video eleven. Source and target.' },
        { t: 'compare', left: { emoji: '🎤', title: 'Source', items: ['The original speaker', 'The input', 'Source language, SL'] }, right: { emoji: '🎧', title: 'Target', items: ['The interpreter', 'The output', 'Target language, TL'] },
          say: 'The source is the original speaker, and the original message. It is the input, in the source language, S L. The target is the interpreter, and the translated message. It is the output, in the target language, T L.' },
        { t: 'picture', emoji: '📮', anim: 'float', caption: 'The sender is the source, the receiver is the target', say: 'Think of a letter. The sender is the source. The receiver is the target. In Gerver\'s study, the source was French and the target was English.' },
        { t: 'recap', points: ['Source = input = SL', 'Target = output = TL'], say: 'Remember: source is input, target is output.' }
      ] },

    { id: 'v12', title: 'Bilingual, balanced and dominant', ar: 'ثنائي اللغة المتوازن = مستوى متساوي في اللغتين، والمهيمن = أقوى في لغة.', tone: 'green', refs: { gaps: [30, 31, 47, 48, 49, 80], mcq: [15, 19], essay: [13, 18] },
      scenes: [
        { t: 'title', emoji: '⚖️', sub: 'Bilingual, balanced, dominant', say: 'Video twelve. Bilingual, balanced, and dominant.' },
        { t: 'def', parts: ['A ', M('bilingual'), ' is a person who speaks two languages. How good they are in each is called proficiency.'], say: 'A bilingual is a person who speaks two languages. How good they are in each language is called proficiency.' },
        { t: 'compare', left: { emoji: '⚖️', title: 'Balanced bilingual', items: ['Equal proficiency', 'Both languages at the same level'] }, right: { emoji: '🏋️', title: 'Dominant bilingual', items: ['One language is stronger', 'The other is weaker'] },
          say: 'A balanced bilingual has almost equal proficiency in both languages. A dominant bilingual is stronger in one language than in the other. Interpreters need a high level in both the source and the target language.' },
        { t: 'picture', art: 'scales', emoji: '⚖️', anim: 'tilt', caption: 'Balanced: level scales. Dominant: one side is heavier', say: 'Picture a pair of scales. Balanced means the scales are level. Dominant means one side is heavier.' },
        { t: 'recap', points: ['Balanced = Equal', 'Dominant = One is stronger', 'Interpreters need high proficiency in SL and TL'], say: 'Remember: balanced is equal. Dominant is one stronger.' }
      ] },

    { id: 'v13', title: 'Natural translation', ar: 'أي ثنائي اللغة عنده قدرة طبيعية على الترجمة من غير تدريب متخصص (هاريس 1977).', tone: 'amber', refs: { gaps: [32, 33], mcq: [], essay: [14] },
      scenes: [
        { t: 'title', emoji: '👧', sub: 'Natural translation / interpreting', say: 'Video thirteen. Natural translation and interpreting.' },
        { t: 'def', parts: ['Harris said any bilingual has a ', M('natural ability to translate'), ' without receiving specialized training.'], say: 'Harris, in 1977, said that any bilingual has a natural ability to translate, without receiving any specialized training.' },
        { t: 'compare', left: { emoji: '👧', title: 'Natural interpreting', items: ['No special training', 'Comes from knowing two languages'] }, right: { emoji: '🎓', title: 'Professional interpreting', items: ['Trained skills and strategies', 'Works under time pressure'] },
          say: 'Think of a child who helps a grandparent talk to a doctor. That is natural interpreting. Professional interpreting adds training, skills, and strategies.' },
        { t: 'recap', points: ['Natural translation = Bilingualism + natural ability − specialized training'], say: 'Remember: bilingualism, plus natural ability, minus specialized training.' }
      ] },

    { id: 'v14', title: 'What affects proficiency in a second language', ar: 'اللي بيأثر على مستواك في اللغة التانية: سن الاكتساب، الدافع، الشخصية، وقرب اللغات.', tone: 'green', refs: { gaps: [34, 35, 36], mcq: [], essay: [15] },
      scenes: [
        { t: 'title', emoji: '🌱', sub: 'Factors of proficiency', say: 'Video fourteen. What affects proficiency in a second language.' },
        { t: 'steps', items: [{ emoji: '🎂', text: 'Age of acquisition' }, { emoji: '🔥', text: 'Motivation' }, { emoji: '🎭', text: 'Personality' }, { emoji: '🧭', text: 'Closeness of the two languages' }],
          say: 'According to the course book, being proficient in a second language depends on the age of acquisition, motivation, personality, and how close the languages involved are. Your essay answer also mentions language exposure.' },
        { t: 'picture', art: 'plant', emoji: '🌱', anim: 'grow', caption: 'Start early, keep it watered, and it grows', say: 'Learning a language is like growing a plant. Starting early, staying motivated, and plenty of exposure help it grow.' },
        { t: 'recap', points: ['Age + Motivation + Personality + (closeness / exposure)'], say: 'Remember: age, motivation, personality.' }
      ] },

    { id: 'v15', title: 'Language interference', ar: 'التداخل اللغوي = لغة بتأثر على التانية، حتى لو مستواك عالي.', tone: 'purple', refs: { gaps: [37, 38, 39], mcq: [16], essay: [16] },
      scenes: [
        { t: 'title', emoji: '🙈', sub: 'Language interference', say: 'Video fifteen. Language interference.' },
        { t: 'def', parts: ['Language interference happens when ', M('one language influences another'), '.'], say: 'Language interference happens when one language influences another.' },
        { t: 'steps', items: [{ emoji: '🆕', text: 'A learner meets a new word in the second language, L2' }, { emoji: '🔗', text: 'They link it to a concept through their first language, L1' }, { emoji: '🔍', text: 'Later they see how much the concepts really overlap' }],
          say: 'According to De Bot, it happens when second language learners meet new words and link them to concepts through their first language. Later they realize how much the concepts overlap, or do not. And even a high level of proficiency does not prevent it.' },
        { t: 'picture', emoji: '🙈', anim: 'shake', caption: 'Your first language sneaks in like a nosy neighbour', say: 'Imagine your first language as a nosy neighbour that sneaks into your second language, bringing its grammar and vocabulary with it.' },
        { t: 'recap', points: ['One language affects another', 'Can happen even with high proficiency'], say: 'Remember: one language affects another.' }
      ] },

    { id: 'v16', title: 'Psycholinguistics', ar: 'علم اللغة النفسي = دراسة العمليات العقلية والعصبية اللي بتخلّينا نكتسب اللغة.', tone: 'blue', refs: { gaps: [42, 43, 44, 45], mcq: [18], essay: [17] },
      scenes: [
        { t: 'title', emoji: '🧠', sub: 'Psycholinguistics', say: 'Video sixteen. Psycholinguistics.' },
        { t: 'def', parts: ['The study of the ', M('mental and cognitive processes'), ' and the ', M('neural mechanisms'), ' that let a person acquire one or more languages.'], say: 'Psycholinguistics studies the mental and cognitive processes, and the neural mechanisms, that let a person acquire one or more languages. The study of bilingualism belongs to it.' },
        { t: 'steps', items: [{ emoji: '💭', text: 'Mental / cognitive processes: how the mind works with language' }, { emoji: '🧬', text: 'Neural mechanisms: how the brain does it' }, { emoji: '📚', text: 'Language acquisition: learning one or more languages' }], say: 'It asks how the mind understands and produces language, how the brain works during language activities, and how people learn one or more languages.' },
        { t: 'picture', emoji: '🛋️', anim: 'bounce', caption: 'Language on the therapist\'s couch: language + mind + brain', say: 'Imagine language on a therapist\'s couch. Psycholinguistics is language, plus mind, plus brain.' },
        { t: 'recap', points: ['Psycholinguistics = Language + Mind + Brain', 'Bilingualism belongs to psycholinguistics'], say: 'Remember: language, mind, and brain.' }
      ] },

    { id: 'v17', title: 'Interpreter vs normal bilingual', ar: 'المترجم الفوري مش مجرد ثنائي اللغة: لازم يفهم وينتج بسرعة وتحت ضغط.', tone: 'amber', refs: { gaps: [40, 41, 46, 78], mcq: [17], essay: [19] },
      scenes: [
        { t: 'title', emoji: '🏎️', sub: 'Interpreter vs normal bilingual', say: 'Video seventeen. Interpreter versus normal bilingual.' },
        { t: 'def', parts: ['Interpreters need ', M('perceptive skills'), ' (understanding language) and ', M('productive skills'), ' (producing it).'], say: 'Interpreters need perceptive skills, which means understanding language, and productive skills, which means producing it.' },
        { t: 'compare', left: { emoji: '🚗', title: 'Normal bilingual', items: ['Knows two languages', 'May understand but not produce'] }, right: { emoji: '🏎️', title: 'Simultaneous interpreter', items: ['Productive and close to balanced', 'Listens, understands, remembers, speaks', 'Understands one language while speaking another'] },
          say: 'A normal bilingual knows two languages, but may understand without producing. A simultaneous interpreter is productive and close to balanced, and must understand one language while speaking another, under time pressure.' },
        { t: 'picture', emoji: '🏎️', anim: 'slide', caption: 'Everyone can drive. Interpreters race', say: 'Everyone can drive a car. Interpreters drive a race car, at high speed.' },
        { t: 'recap', points: ['Interpreters do more than speak two languages'], say: 'Remember: interpreters do more than speak two languages.' }
      ] },

    { id: 'v18', title: 'Simultaneous, early sequential and late bilinguals', ar: 'الثنائي المبكر (early sequential) اتعرّض للغتين من الولادة، والمتأخر اتعلّم التانية بعد الأولى.', tone: 'green', refs: { gaps: [79], mcq: [], essay: [] },
      scenes: [
        { t: 'title', emoji: '⏳', sub: 'When bilinguals learn their languages', say: 'Video eighteen. Simultaneous, early sequential, and late bilinguals.' },
        { t: 'steps', items: [{ emoji: '👶', text: 'Simultaneous bilingual' }, { emoji: '🍼', text: 'Early sequential: exposed to the two languages from birth' }, { emoji: '🧑‍🎓', text: 'Late bilingual: learns a second language later, after the first' }],
          say: 'According to the course book, bilinguals can be simultaneous, early sequential, meaning exposed to the two languages from birth, or late, meaning they learn a second language later in life, after the first one.' },
        { t: 'def', parts: ['All ages of first exposure ', M('may lead to balanced bilingualism'), ' with a high level of proficiency in both languages.'], say: 'The good news: all ages of first exposure may lead to balanced bilingualism, with a high level of proficiency in both languages.' },
        { t: 'recap', points: ['Early sequential = exposed to both languages from birth', 'Late = second language later in life'], say: 'Remember: early sequential means from birth. Late means later in life.' }
      ] },

    { id: 'v19', title: 'The two classic studies', ar: 'دراستا غولدمان-أيزلر وجيرفر: مين، وإيه اللي عملوه، وإيه النتيجة.', tone: 'blue', refs: { gaps: [4, 5, 6, 7, 21, 22, 23], mcq: [4, 11, 12], essay: [] },
      scenes: [
        { t: 'title', emoji: '🔬', sub: 'Goldman-Eisler and Gerver', say: 'Video nineteen. The two classic studies.' },
        { t: 'compare', left: { emoji: '👩‍🏫', title: 'Goldman-Eisler', items: ['Six professional interpreters', 'Short speeches, 3 to 6 minutes', 'Several language pairs', 'EVS units are syntactic'] }, right: { emoji: '🇫🇷', title: 'Gerver', items: ['Students interpreting pre-recorded French into English', 'Pauses over 0.25 seconds removed', 'Interpreters paused where the speaker paused'] },
          say: 'Goldman-Eisler studied six professional interpreters, who interpreted short speeches of three to six minutes, in several language pairs. She found that E V S units are syntactic. Gerver had students interpret pre-recorded French speech into English, after removing pauses longer than a quarter of a second. Their pauses fell in the same places as the speaker\'s.' },
        { t: 'picture', emoji: '🔬', anim: 'bounce', caption: 'Goldman-Eisler: 6 interpreters. Gerver: French into English', say: 'To remember: Goldman-Eisler, six interpreters. Gerver served French, and the students replied in English.' },
        { t: 'recap', points: ['Goldman-Eisler: 6 professionals, 3 to 6 minutes, syntactic units', 'Gerver: French into English, pauses over 0.25 s removed, structural correspondence'], say: 'Remember these two studies, and their numbers.' }
      ] }
  ];
})();
