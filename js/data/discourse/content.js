/* Subject 4: Discourse Analysis (تحليل الخطاب): cohesion and coherence, and nothing else.
   Prepared from standard discourse analysis references, not from a course book.
   The technical terms stay in English; the Arabic explains them in plain Egyptian Arabic, the way a lecturer would.
   Every multiple-choice question is its own item (kind "q"), so exams can hold all of them and the weak ones come back. */
(function () {
  var UN = window.UN = window.UN || {};
  var D = UN.DA = {};
  function s(en, ar) { return { en: en, ar: ar }; }

  D.groups = {
    coh: s('Cohesion', 'Cohesion'),
    cohr: s('Coherence', 'Coherence'),
    mix: s('Cohesive or coherent?', 'Cohesive ولا coherent؟')
  };
  D.groupOrder = ['coh', 'cohr', 'mix'];
  D.terms = []; D.confusable = []; D.written = []; D.parts = {}; D.partsOrder = {}; D.lessons = [];

  /* ---------- the two concepts: a full explanation and a short version (English, then an Arabic explanation that keeps
     the English terms), with examples. def (the short English line) is what the games use. ---------- */
  function ex(t, en, ar) { return { t: t, n: s(en, ar) }; }
  var K = [
    { g: 'coh', name: 'Cohesion',
      full: s("Cohesion is the way the sentences of a text are tied together by links you can see in the words themselves. Look for three things: pronouns and pointing words that go back to something mentioned before (he, it, they, this, that), linking words that join ideas (and, but, so, because, then, however), and words that are repeated, or another word used for the same thing (a car ... the car). If you can point to links like these between the sentences, the text is cohesive.",
              "الـ cohesion ببساطة هو الروابط اللي بتلزّق الجمل في بعض، واللي تقدر تشوفها بعينك في الكلام نفسه. دوّر على 3 حاجات: ضمير أو كلمة إشارة راجعة على حاجة اتذكرت قبل كده (زي he وit وthey وthis وthat)، وكلمات ربط بتوصل الأفكار ببعض (زي and وbut وso وbecause وthen وhowever)، وكلمة بتتكرر أو كلمة تانية لنفس الحاجة (a car ... the car). لو لقيت روابط زي دي بين الجمل، يبقى النص cohesive."),
      short: s('The visible links between sentences: pronouns, linking words and repeated words.', 'الروابط اللي تقدر تشاور عليها بين الجمل: ضمائر وكلمات ربط وكلمات متكررة.'),
      ex: [ex('Omar bought a phone. He uses it every day.', "'He' points to Omar and 'it' points to the phone.", "'He' راجعة على عمر، و'it' راجعة على الموبايل."),
        ex('It was raining. However, we went out.', "'However' links the two ideas: what happened is the opposite of what you would expect.", "'However' بتربط الفكرتين، ومعناها إن اللي حصل عكس المتوقع."),
        ex('I saw a snake. The snake was huge.', "'The snake' repeats 'a snake' from the first sentence.", "'The snake' بتكرر 'a snake' اللي في الجملة الأولى.")] },
    { g: 'cohr', name: 'Coherence',
      full: s("Coherence is the way the ideas of a text fit together so that the whole text makes sense. It is not found in particular words: it comes from a logical order of ideas, ideas that do not contradict each other, and the reader's own knowledge of the world, which fills the gaps between sentences. That is why a text can be coherent even with no linking words at all.",
              "الـ coherence معناه إن أفكار النص ماشية مع بعض والكلام كله طالع له معنى واحد مفهوم. ده مش بيبان في كلمة معينة، لكن بييجي من ترتيب الأفكار بشكل منطقي، ومن إن مفيش أفكار بتناقض بعضها، ومن معرفة القارئ نفسه بالدنيا، لأنه هو اللي بيكمّل الفراغات بين الجمل. علشان كده ممكن النص يبقى coherent حتى لو مفيهوش ولا كلمة ربط."),
      short: s('The ideas make sense together as one whole.', 'الأفكار راكبة على بعض والكلام كله له معنى.'),
      ex: [ex('The ice cream melted. The sun was very hot.', "There is no 'because', but we understand the cause: coherent.", "مفيش 'because'، بس فاهمين إن الشمس هي السبب، يبقى النص coherent."),
        ex('Omar is a vegetarian, so he eats meat every day.', "'So' and 'he' link the sentence, but the ideas contradict each other: not coherent.", "'so' و'he' رابطين الكلام، بس الأفكار بتناقض بعض، فالنص مش coherent.")] }
  ];
  D.subs = K.map(function (k, i) { return { id: 'DK' + (i + 1), group: k.g, name: k.name, arName: '', def: k.short.en, full: k.full, short: k.short, ex: k.ex }; });

  /* ---------- multiple-choice questions: [group, question, options (first is listed as a, ...), key, why] ---------- */
  var BOTH = 'Cohesive and coherent', COH = 'Cohesive but not coherent', CHR = 'Coherent but not cohesive', NONE = 'Neither cohesive nor coherent';
  var FOUR = [BOTH, COH, CHR, NONE];
  function txt(t) { return 'Which description fits this text best? "' + t + '"'; }
  var Q = [
    // cohesion
    ['coh', 'Cohesion is mainly about…', ['the visible links between sentences, such as pronouns and linking words', "the reader's background knowledge of the world", 'the length of the text', "the writer's handwriting"], 'a', 'Cohesion is on the surface: you can point to the words that tie the sentences together.'],
    ['coh', 'Where is cohesion found?', ['On the surface of the text: in its words and grammar', "Only in the reader's mind", 'In the title only', 'In the punctuation only'], 'a', "Cohesion is a property of the text's surface: its grammar and vocabulary."],
    ['coh', 'Which of these creates cohesion?', ["The pronoun 'it' referring to a book mentioned before", 'A long paragraph', 'A beautiful font', 'A question mark'], 'a', "'It' points back to the book, so it links two sentences."],
    ['coh', 'In "Ali bought a car. He paid cash for it.", which words create cohesion?', ["'He' and 'it'", "'a' and 'for'", 'Only the full stops', 'No words create cohesion'], 'a', "'He' points back to Ali and 'it' points back to the car: links you can see."],
    ['coh', 'Can a text be cohesive but still not make sense?', ['Yes. Links alone do not guarantee meaning', 'No. Every cohesive text makes sense', 'Only if it is very short', 'Only if it has no pronouns'], 'a', 'A text can be full of links and still be nonsense: cohesion is not enough for coherence.'],
    ['coh', 'Cohesion is like…', ['the threads that hold a woven carpet together', 'the colour of the carpet', 'the price of the carpet', 'the shop that sells the carpet'], 'a', 'A memory aid: the threads are the links you can see; the pattern (the meaning) is coherence.'],
    ['coh', 'Which question tests cohesion?', ['Can I point to the words that link these sentences?', 'Does the whole text make sense to me?', 'Is the text useful to the reader?', 'Is the information new?'], 'a', 'Cohesion: point to the links. Coherence: does it make sense as a whole?'],
    ['coh', "A text full of 'and', 'but' and 'so' has many…", ['linking words, which create cohesion', 'ideas that contradict each other', 'spelling mistakes', 'titles'], 'a', "'And', 'but' and 'so' are linking words: they tie the sentences together, so they create cohesion."],
    ['coh', "In \"Omar bought a phone. He uses it every day.\", what does 'He' point back to?", ['Omar', 'The phone', 'Every day', 'Nothing in the text'], 'a', "'He' goes back to Omar, so it ties the second sentence to the first: a link you can see."],
    ['coh', "In \"Karim lost his wallet. He found it under the bed.\", what does 'it' point back to?", ['His wallet', 'Karim', 'The bed', 'Nothing in the text'], 'a', "'It' goes back to 'his wallet', so the two sentences are linked."],
    ['coh', 'Which word links these two sentences? "It was raining. However, we went out."', ['However', 'raining', 'went', 'out'], 'a', "'However' joins the two ideas and shows a contrast: it is a linking word."],
    ['coh', 'Which pair of sentences is linked by a repeated word?', ['"I saw a snake. The snake was huge."', '"I saw a snake. It was huge."', '"I saw a snake, but I was not afraid."', '"Tea is hot. Cars have wheels."'], 'a', "'The snake' repeats 'a snake'. The second pair is linked by the pronoun 'it', the third by 'but', and the last has no links."],
    ['coh', 'Which text has NO cohesive links at all?', ['"Rain. Traffic. Late again."', '"Omar was late because of the rain."', '"It rained, so the traffic was slow."', '"The rain stopped. Then the traffic moved."'], 'a', 'The first text has no pronouns, no linking words and no repeated words. We can still guess the story, but nothing on the surface links it.'],
    ['coh', "Linking words such as 'and', 'but', 'so' and 'then' are part of…", ['cohesion: they tie the sentences together on the surface', 'coherence: they make sure the text makes sense', "the reader's background knowledge", 'punctuation'], 'a', 'They are links you can see in the text, so they belong to cohesion.'],
    ['coh', 'Why is "Omar came late. He missed the bus." cohesive?', ["'He' points back to Omar, linking the two sentences", 'Both sentences are short', 'It ends with a full stop', 'It is about a bus'], 'a', "The pronoun 'he' is a visible link between the sentences."],
    ['coh', 'Which text has the most cohesive links?', ['"Ahmed was hungry, so he made a sandwich and ate it."', '"Hungry. Sandwich."', '"Ahmed was hungry."', '"Sandwiches are popular."'], 'a', "'So', 'he', 'and' and 'it' all link the parts of the first text. The others have no links."],
    ['coh', "What do pronouns such as 'he', 'it' and 'they' usually do in a text?", ['They point back to people or things already mentioned, linking the sentences', 'They make the text longer', "They show the writer's opinion", 'They always start a new topic'], 'a', 'Each pronoun ties its sentence to an earlier one: one of the visible links of cohesion.'],
    ['coh', 'Which text is linked by a linking word?', ['"He was ill. Therefore, he stayed at home."', '"He was ill. He stayed at home."', '"Ill. Home. Bed."', '"Ahmed is ill. His brother is a doctor."'], 'a', "'Therefore' is a linking word that shows the result. The second and fourth texts are linked only by pronouns, and the third has no links."],
    ['coh', 'In "Youssef bought a car. The car was cheap.", how are the two sentences linked?', ["By repeating the word 'car'", 'By a linking word', 'They are not linked', 'By the full stop'], 'a', "'The car' repeats 'a car', so the reader sees that both sentences talk about the same car."],
    ['coh', 'Which one can you check by underlining words in the text?', ['Cohesion', 'Coherence'], 'a', 'You can underline the links (he, it, so, then, repeated words): that is cohesion. Coherence is about the meaning, so you cannot just underline it.'],
    // coherence
    ['cohr', 'Coherence is mainly about…', ['whether the ideas connect logically and make sense as a whole', 'the number of pronouns', 'the spelling', 'the font size'], 'a', 'Coherence is about meaning: do the ideas fit together into one sensible whole?'],
    ['cohr', 'Coherence depends on…', ["the logical order of ideas and the reader's background knowledge", 'the number of linking words only', 'the length of the sentences only', 'the use of capital letters'], 'a', 'Readers use logic and what they already know to connect the ideas.'],
    ['cohr', "\"The ice cream melted. The sun was very hot.\" Why does this make sense without 'because'?", ['The reader links cause and effect using his knowledge of the world', "Because of the pronoun 'it'", "Because the word 'sun' is repeated", 'It does not make sense'], 'a', 'No linking word is needed: the reader infers the cause (coherence without cohesion).'],
    ['cohr', "A: \"I need to buy bread.\" B: \"The bakery on the corner opens at seven.\" Why is B's answer coherent?", ['We know bakeries sell bread, so the ideas connect', "B repeats the word 'bread'", "B uses the linking word 'and'", 'It is not coherent'], 'a', 'World knowledge (bakeries sell bread) connects the two lines.'],
    ['cohr', '"He put on his shoes. He woke up. He went to work." What would make it more coherent?', ['Putting the events in a logical order', 'Adding more pronouns', 'Making the sentences longer', 'Removing the full stops'], 'a', 'He must wake up before he puts on his shoes: logical order builds coherence.'],
    ['cohr', '"The shop was closed, so we bought everything there." What is wrong?', ['The ideas contradict each other, so it is not coherent', 'It has no linking words', 'It is too short', 'Nothing is wrong'], 'a', "'So' and 'there' are cohesive links, but you cannot buy things in a closed shop: incoherent."],
    ['cohr', 'Which is a coherence problem?', ['Ideas that contradict each other', 'A missing comma', 'A long word', 'A capital letter at the start'], 'a', 'Contradictions break the meaning of the text, which is what coherence is about.'],
    ['cohr', 'Coherence is like…', ['the picture on a puzzle: the pieces must make one picture', 'the box of the puzzle', 'the price of the puzzle', 'the table under the puzzle'], 'a', 'A memory aid: pieces may fit together, but do they show one picture?'],
    ['cohr', 'Which question tests coherence?', ['Does the whole text make sense?', 'Can I underline the pronouns?', 'How many words are repeated?', 'Is the font readable?'], 'a', 'Coherence: does it make sense as a whole? Cohesion: can I point to the links?'],
    ['cohr', 'Where is coherence mainly built?', ["In the meaning behind the words and in the reader's mind", 'Only in the punctuation', 'Only in the title', 'In the number of paragraphs'], 'a', "Coherence lies beneath the surface: in the concepts, their relations and the reader's knowledge."],
    ['cohr', 'Can a text be coherent without any linking words?', ['Yes, if the ideas clearly connect', 'No, never', 'Only in Arabic', 'Only if it is written'], 'a', 'Many short dialogues and notes make perfect sense with no linking words.'],
    ['cohr', '"Exams start tomorrow. Omar is staying at home tonight." The link between the sentences is…', ['a cause-and-effect relation the reader infers', 'a pronoun', 'a repeated word', 'a linking word'], 'a', 'No word links them; the reader infers that he stays home to study: coherence.'],
    ['cohr', 'Which helps coherence most?', ['Ideas that follow a clear, logical plan', 'Using as many pronouns as possible', 'Repeating the same word in every sentence', 'Very long sentences'], 'a', 'A clear plan and logical order make the meaning easy to follow.'],
    ['cohr', 'Background knowledge (schema) matters for…', ['coherence, because the reader fills gaps with what he already knows', 'spelling', 'handwriting', 'punctuation'], 'a', 'Readers connect ideas using what they already know about the world.'],
    ['cohr', 'Which statement is true?', ['Cohesion helps coherence, but it is not enough by itself', 'Cohesion and coherence are exactly the same', 'Coherence is only about pronouns', 'A coherent text must have many linking words'], 'a', 'Links help the reader, but only meaningful connections make a text coherent.'],
    ['cohr', "A: \"Can you come to my party on Friday?\" B: \"I have an exam on Saturday morning.\" Why is B's answer coherent?", ['We understand that he probably cannot come because he must study', "B repeats the word 'party'", "B uses the linking word 'because'", 'It is not coherent'], 'a', 'No word links the two lines, but the reader works out the meaning from what he knows: coherence.'],
    ['cohr', 'Which text has a coherence problem?', ['"Omar is a vegetarian, so he eats meat every day."', '"Omar is a vegetarian, so he never eats meat."', '"Omar was hungry, so he ate."', '"Omar was tired, so he slept."'], 'a', "A vegetarian does not eat meat: the ideas contradict each other, even though 'so' and 'he' link them."],
    ['cohr', 'Which order of events is the most coherent?', ['"He woke up, had breakfast and went to work."', '"He went to work, woke up and had breakfast."', '"He had breakfast, went to work and woke up."', '"He went to work, had breakfast and woke up."'], 'a', 'Events that follow the order of real life make sense: coherence.'],
    ['cohr', 'A text has no linking words, but it still makes sense. Who fills in the missing connections?', ['The reader, using his knowledge of the world', 'The printer', 'The punctuation marks', 'Nobody: such a text cannot be understood'], 'a', 'Readers connect ideas with what they already know. That is why a text can be coherent without cohesion.'],
    ['cohr', '"Omar opened his umbrella. It was raining." Why does this make sense?', ['We know that people open umbrellas when it rains', "'It' points back to Omar", 'The two sentences have the same length', 'It does not make sense'], 'a', 'The reader links the two facts with what he knows: rain, so an umbrella. That is coherence.'],
    ['cohr', 'A text changes its topic in every sentence. What is it missing?', ['Coherence: one clear topic that holds the ideas together', 'Capital letters', 'Long words', 'A title in bold'], 'a', 'Jumping from topic to topic breaks the meaning of the whole text.'],
    ['cohr', 'Which statement is FALSE?', ['A text with many linking words is always coherent', 'A text can be coherent without linking words', 'Readers use their knowledge to connect ideas', 'Contradictions damage coherence'], 'a', 'Linking words help, but they cannot save a text whose ideas do not fit together.'],
    ['cohr', '"The match was cancelled because of heavy rain. Fans were told to keep their tickets for the new date." Which point is about its COHERENCE (not its cohesion)?', ['The ideas stay on one topic and make sense together', "It uses the linking word 'because'", "'Their' points back to 'fans'"], 'a', 'Linking words and pronouns are cohesion. Coherence is the meaning: the ideas fit together into one clear message.'],
    // cohesive or coherent? (classify the text)
    ['mix', txt('Omar lost his keys this morning. He looked for them everywhere, and finally he found them in his jacket.'), FOUR, 'a', "'He', 'them' and 'and finally' link the sentences, and the story makes sense."],
    ['mix', txt('I bought a new phone. The phone is black. Black is the colour of the night. The night is very long in winter.'), FOUR, 'b', 'Each sentence repeats a word from the one before (cohesive), but there is no single topic or point: not coherent.'],
    ['mix', txt("A: Can you give me a lift to the airport? B: My car is at the mechanic's."), FOUR, 'c', "No word links B's answer to A, but we understand it means 'No, I can't': coherent without cohesion."],
    ['mix', txt('My uncle likes tea. The capital of Japan has many trains. Seven is an odd number.'), FOUR, 'd', 'No links and no shared topic: neither cohesive nor coherent.'],
    ['mix', txt('The exam starts at nine. Therefore, students should arrive at half past eight.'), FOUR, 'a', "'Therefore' links the sentences, and the advice follows logically."],
    ['mix', txt('Ahmed plays football. Football is round. Round things roll. Rolling stones gather no moss.'), FOUR, 'b', 'A chain of repeated words (cohesive) that wanders from topic to topic: not coherent.'],
    ['mix', txt('Rain all night. Roads flooded. School closed.'), FOUR, 'c', 'No linking words, but we see the chain of cause and effect: coherent, not cohesive.'],
    ['mix', txt('Bananas are yellow. Karim will travel next Friday. Mountains do not use computers.'), FOUR, 'd', 'Unrelated sentences with no links: neither.'],
    ['mix', txt('Karim bought a new laptop. It is light, so he takes it to university every day.'), FOUR, 'a', "'It', 'so' and 'he' link the sentences, and the meaning is clear."],
    ['mix', txt('Youssef studies medicine because the sky is blue. However, the sky has never studied.'), FOUR, 'b', "'Because', 'however' and the repeated 'sky' are links, but the reasons make no sense."],
    ['mix', txt('The phone rang. I was in the shower.'), FOUR, 'c', 'No linking word, but we understand: I could not answer. Coherent, not cohesive.'],
    ['mix', txt('The window is open. Football matches last ninety minutes. Salt is cheap.'), FOUR, 'd', 'Three unrelated facts with no links: neither.'],
    ['mix', txt('First, boil the water. Then add the tea. After that, wait two minutes.'), FOUR, 'a', "'First', 'then' and 'after that' link clear steps: both."],
    ['mix', txt('My brother has a cat. Cats have whiskers. Whiskers also grow on old men. Old men tell stories about the sea.'), FOUR, 'b', 'Linked by repeated words, but it drifts with no point: cohesive, not coherent.'],
    ['mix', txt('A: Is Omar coming to the match tonight? B: Exams start tomorrow.'), FOUR, 'c', 'We infer that Omar will stay home to study: coherent without any cohesive tie.'],
    ['mix', txt('Paris is in France. My shoes are new. Cats sleep a lot.'), FOUR, 'd', 'No links and no common meaning: neither.'],
    ['mix', txt('My grandfather planted an olive tree in 1990. Today the tree gives us oil every year.'), FOUR, 'a', "'The tree' repeats 'an olive tree', and the story makes sense: both."],
    ['mix', txt('The car stopped. Then the moon became a teacher. After that, the teacher drank the river.'), FOUR, 'b', "'Then', 'after that' and 'the teacher' are links, but the events are impossible: not coherent."],
    ['mix', txt('Doorbell. Dog barking. Delivery man at the gate.'), FOUR, 'c', 'Fragments with no links, but we picture one scene: coherent, not cohesive.'],
    ['mix', txt('Tea is hot. Cars have wheels. I was born in Tanta.'), FOUR, 'd', 'Unrelated facts with no links: neither.'],
    ['mix', txt('Ali was hungry, so he made a sandwich. He ate it in the garden.'), FOUR, 'a', "'So', 'he' and 'it' link the sentences, and the actions follow logically."],
    ['mix', txt('Mahmoud bought shoes. Shoes are made of leather. Leather comes from cows. Cows give milk. Milk is white.'), FOUR, 'b', 'Each sentence picks up a word from the last (cohesive), but there is no overall point: not coherent.'],
    ['mix', txt('A: Shall we order pizza? B: I have only five pounds.'), FOUR, 'c', "No shared words or linking words, but we understand B means 'not now': coherent, not cohesive."],
    ['mix', 'Which text is coherent but NOT cohesive?', ['"The phone rang. I was in the shower."', '"I bought a car. The car is red. Red is a colour. Colours are nice."', '"Omar was tired, so he went to bed."', '"Salt is white. The bus is late. Seven is odd."'], 'a', 'The first text has no linking words, but the meaning connects.'],
    ['mix', 'Which text is cohesive but NOT coherent?', ['"I like apples. Apples are red. Red is a colour of the flag. The flag is on the moon."', '"Omar was tired, so he went to bed."', '"Rain. Traffic. Late again."', '"Salt is white. The bus is late. Seven is odd."'], 'a', 'The first text is chained by repeated words but makes no overall sense.'],
    ['mix', 'Which text is both cohesive and coherent?', ['"Omar was tired, so he went to bed early."', '"Rain. Traffic. Late again."', '"I like tea. Tea is a word. Words are long."', '"Salt is white. The bus is late. Seven is odd."'], 'a', "'So' and 'he' link the clauses, and the meaning is clear."],
    ['mix', 'Which text is neither cohesive nor coherent?', ['"Salt is white. The bus is late. Seven is odd."', '"Omar was tired, so he went to bed."', '"The phone rang. I was in the shower."', '"I like tea. Tea is a word. Words are long."'], 'a', 'No links and no shared meaning.'],
    ['mix', txt('Youssef missed the train, so he took a taxi. It was expensive, but he arrived on time.'), FOUR, 'a', "'So', 'he', 'it' and 'but' link the sentences, and the story makes sense."],
    ['mix', txt('My teacher drives a bus. The bus is a vegetable. Vegetables can fly, so my teacher is a bird.'), FOUR, 'b', "Repeated words and 'so' link every sentence, but the ideas are impossible: cohesive, not coherent."],
    ['mix', txt('A: Shall we play football this afternoon? B: My leg still hurts.'), FOUR, 'c', 'No word links the two lines, but we understand that B cannot play: coherent, not cohesive.'],
    ['mix', txt('Football is popular. My pen is blue. The Nile is long.'), FOUR, 'd', 'Three unrelated facts with no links: neither.'],
    ['mix', txt('The library opens at nine. Students who arrive early wait outside until then.'), FOUR, 'a', "'Then' points back to nine o'clock, and the meaning is clear: both."],
    ['mix', txt('Karim drinks coffee every morning. Morning is the first part of the day. The day has twenty-four hours. Hours are made of minutes.'), FOUR, 'b', 'Each sentence picks up a word from the one before (cohesive), but the text goes nowhere: not coherent.'],
    ['mix', txt('Power cut. Candles. Dinner in the dark.'), FOUR, 'c', 'Short pieces with no links, but we picture one evening without electricity: coherent, not cohesive.'],
    ['mix', txt('Lions eat meat. My bag is heavy. Wednesday comes after Tuesday.'), FOUR, 'd', 'No links and no shared topic: neither.'],
    ['mix', txt('Ahmed wanted to lose weight. Therefore, he started walking every evening.'), FOUR, 'a', "'Therefore' and 'he' link the sentences, and the reason makes sense: both."],
    ['mix', txt('The baby read the newspaper. Then he drove his car to work, because babies are good drivers.'), FOUR, 'b', "'Then', 'he', 'because' and the repeated 'baby' are links, but the events are impossible: cohesive, not coherent."],
    ['mix', txt('A: Did you enjoy the film? B: I fell asleep after ten minutes.'), FOUR, 'c', "No word links B's answer to the question, but we understand that he did not enjoy it: coherent, not cohesive."],
    ['mix', txt('Ice is cold. My uncle Hassan sells shoes. Trains are faster than bicycles.'), FOUR, 'd', 'Unrelated sentences with no links: neither.'],
    ['mix', 'Which text is coherent but NOT cohesive?', ['"Power cut. Candles. Dinner in the dark."', '"Ahmed wanted to lose weight, so he started walking."', '"I have a pen. The pen is blue. Blue is the colour of the sky."', '"Lions eat meat. My bag is heavy. Wednesday comes after Tuesday."'], 'a', 'The first text has no links, but we picture one evening without electricity.'],
    ['mix', 'Which text is cohesive but NOT coherent?', ['"The baby read the newspaper. Then he drove his car to work."', '"Rain all night. Roads flooded."', '"Youssef missed the train, so he took a taxi."', '"Ice is cold. Trains are fast. My pen is blue."'], 'a', "'Then' and 'he' link the first text, but a baby cannot read a newspaper or drive."],
    ['mix', 'Which text is both cohesive and coherent?', ['"The library opens at nine, so students wait outside until then."', '"Power cut. Candles. Dinner in the dark."', '"Karim drinks coffee. Coffee is brown. Brown is a colour."', '"Lions eat meat. My bag is heavy."'], 'a', "'So' and 'then' link the first text, and its meaning is clear."],
    ['mix', 'Which text is neither cohesive nor coherent?', ['"Ice is cold. My uncle Hassan sells shoes. Trains are faster than bicycles."', '"Rain all night. Roads flooded. School closed."', '"Ahmed was hungry, so he made a sandwich."', '"My phone is black. Black is a colour. Colours are nice."'], 'a', 'No links and no shared meaning.']
  ];
  var LETTERS = 'abcd';
  D.qitems = []; D.bank = { mcq: [], tf: [], cloze: [] }; D.keys = { mcq: {}, tf: {}, cloze: {}, written: {} };
  Q.forEach(function (q, i) {
    var id = 'D' + (i + 1), bid = 'DM' + (i + 1), opts = {};
    q[2].forEach(function (o, k) { opts[LETTERS.charAt(k)] = o; });
    D.qitems.push({ id: id, n: i + 1, group: q[0], q: q[1] });
    D.bank.mcq.push({ id: bid, item: id, text: q[1], opts: opts, note: q[4] });
    D.keys.mcq[bid] = q[3];
  });

  /* ---------- topics on the Learn page (and for "study this next" after an exam) ---------- */
  var TOPIC = {
    coh: s('The links you can see between sentences.', 'الروابط اللي تقدر تشوفها بين الجمل.'),
    cohr: s('Meaning that holds together: logic, order and what the reader already knows.', 'معنى ماسك في بعضه: منطق وترتيب ومعرفة القارئ.'),
    mix: s('Practise telling the four kinds of text apart.', 'اتدرب تفرّق بين الأنواع الأربعة للنصوص.')
  };
  var TIP = {
    coh: s('Ask: can I point to the links?', 'اسأل نفسك: أقدر أشاور على الروابط؟'),
    cohr: s('Ask: does the whole text make sense?', 'اسأل نفسك: هل الكلام كله له معنى؟'),
    mix: s('Check links first, then meaning.', 'شوف الروابط الأول، وبعدين المعنى.')
  };
  D.resources = D.groupOrder.map(function (g) {
    return { id: 'r-' + g, group: g, title: D.groups[g], text: TOPIC[g], tip: TIP[g], video: null, audio: null,
      items: D.subs.filter(function (x) { return x.group === g; }).map(function (x) { return x.id; }),
      related: D.qitems.filter(function (x) { return x.group === g; }).map(function (x) { return x.id; }) };
  });
  // what the repair lab shows before it asks a question of this topic
  D.groupLesson = {
    coh: s('Cohesion = the visible links: pronouns (he, it, this), linking words (and, but, so) and repeated words.', 'الـ cohesion = الروابط اللي بتبان: ضمائر (he وit وthis)، وكلمات ربط (and وbut وso)، وكلمات بتتكرر.'),
    cohr: s('Coherence = the meaning holds together. Check the order of ideas, contradictions and whether the reader can connect them with what he already knows.', 'الـ coherence = المعنى ماسك في بعضه. بص على ترتيب الأفكار، وهل فيه تناقض، وهل القارئ يقدر يربطها باللي يعرفه.'),
    mix: s('Two questions: Are there links I can point to? (cohesion) Does it make sense as a whole? (coherence) Both, one of them, or neither.', 'سؤالين: فيه روابط أقدر أشاور عليها؟ (cohesion) والكلام كله له معنى؟ (coherence) الإجابة يا الاتنين، يا واحد بس، يا ولا واحد.')
  };

  /* ---------- the Learn page: understand it first, with labelled examples ---------- */
  D.explain = [
    { id: 'x-intro', title: s('Cohesion and coherence in one minute', 'الـ cohesion والـ coherence في دقيقة'),
      text: s("A good text is like a woven carpet. Cohesion is the threads you can see: words that tie the sentences together (he, it, this, and, but, so, repeated words). Coherence is the pattern: the ideas fit together and make sense as one whole. You check cohesion by pointing to the links. You check coherence by asking: does it make sense?",
              "تخيّل النص سجادة منسوجة. الـ cohesion هو الخيوط اللي شايفها بعينك: الكلمات اللي بتربط الجمل ببعض زي he وit وthis وand وbut وso، والكلمات اللي بتتكرر. أما الـ coherence فهو الرسمة نفسها: الأفكار راكبة على بعض وطالعة بمعنى واحد مفهوم. الـ cohesion تعرفه لما تقدر تشاور على الروابط، والـ coherence تعرفه لما تسأل نفسك: الكلام ده له معنى؟"),
      points: [s('Cohesion: links on the surface, in the words themselves.', 'الـ cohesion: روابط ظاهرة على سطح النص، في الكلمات نفسها.'),
        s("Coherence: meaning underneath, made with logic and the reader's knowledge.", 'الـ coherence: معنى تحت السطح، جاي من المنطق ومن معرفة القارئ.'),
        s('Quick test: can I point to the links? Then it is cohesive. Does it make sense? Then it is coherent.', 'اختبار سريع: أقدر أشاور على الروابط؟ يبقى النص cohesive. الكلام له معنى؟ يبقى coherent.')] },
    { id: 'x-links', title: s('How to spot cohesion', 'إزاي تعرف إن النص cohesive'),
      text: s('Look for three kinds of links between the sentences. If you can point to them, the text is cohesive.', 'دوّر على 3 أنواع روابط بين الجمل. لو قدرت تشاور عليها، يبقى النص cohesive.'),
      items: [
        { name: s('Pronouns and pointing words', 'Pronouns and pointing words'), text: s('he, it, they, this, that: they go back to something mentioned before.', 'he وit وthey وthis وthat: بترجع على حاجة اتذكرت قبل كده.'),
          ex: ['Omar called. He wants to see you. (he = Omar)', 'My brother bought a car. It is red. (it = the car)'] },
        { name: s('Linking words', 'Linking words'), text: s('and, but, so, because, then, however: they join ideas and show how they are related.', 'and وbut وso وbecause وthen وhowever: بتوصل الأفكار ببعض وبتقولك العلاقة بينها إيه.'),
          ex: ['It was raining. However, we went out.', 'He was tired, so he went to bed early.'] },
        { name: s('Repeated words', 'Repeated words'), text: s('the same word again, or another word for the same thing.', 'نفس الكلمة تاني، أو كلمة تانية لنفس الحاجة.'),
          ex: ['I saw a snake. The snake was huge.', 'Karim bought a car. The vehicle was cheap. (vehicle = the car)'] }],
      remember: s('No links on the surface? Then the text is not cohesive, but it can still be coherent if the meaning connects.', 'مفيش روابط ظاهرة؟ يبقى النص مش cohesive، بس ممكن يبقى coherent لو المعنى متوصل.') },
    { id: 'x-four', title: s('Four possibilities, with examples', 'أربع حالات بالأمثلة'),
      text: s('Cohesion and coherence are two different things, so a text can have both, one of them, or neither.', 'الـ cohesion والـ coherence حاجتين مختلفين، فالنص ممكن يبقى فيه الاتنين، أو واحد بس، أو ولا واحد.'),
      examples: [
        { text: 'Omar was tired, so he went to bed early.', tags: { coh: true, cohr: true },
          why: s("'So' and 'he' link the two parts, and the meaning is clear.", "'so' و'he' رابطين الجزأين ببعض، والمعنى واضح.") },
        { text: 'I bought a car. The car is red. Red is a colour. Colours make children happy.', tags: { coh: true, cohr: false },
          why: s('Every sentence is linked to the one before by a repeated word, but there is no single topic: it goes nowhere.', 'كل جملة مربوطة باللي قبلها بكلمة متكررة، بس مفيش موضوع واحد، والكلام مش رايح في حتة.') },
        { text: "A: Can you give me a lift? B: My car is at the mechanic's.", tags: { coh: false, cohr: true },
          why: s("No word links the two lines, but we understand that B means 'no': the meaning connects.", "مفيش ولا كلمة بتربط السطرين، بس كلنا فاهمين إن B قصده 'لأ مش هقدر'، فالمعنى متوصل.") },
        { text: 'Salt is white. The bus is late. Seven is an odd number.', tags: { coh: false, cohr: false },
          why: s('No links and no shared meaning.', 'لا فيه روابط، ولا فيه معنى يجمع الجمل.') }],
      remember: s('Cohesion helps coherence, but it is not enough: a text can be linked and still make no sense, and a text with no links can still make sense.', 'الـ cohesion بيساعد الـ coherence بس مش كفاية لوحده: ممكن الكلام يبقى مربوط ومع ذلك ملوش معنى، وممكن يبقى من غير روابط وله معنى.') }
  ];
  D.explainNote = s('These explanations and questions were prepared from standard discourse analysis references, not from your course book. If your lecturer explains something differently, tell us and we will match it.',
                    'الشرح والأسئلة دي متجهزة من المراجع المعروفة في الـ discourse analysis، مش من كتاب المادة. لو الدكتور بيشرح حاجة بشكل مختلف، قولنا وهنظبطها.');

  /* ---------- settings ---------- */
  var N = D.qitems.length;
  D.cfg = {
    id: 'disc',
    name: s('Discourse Analysis', 'تحليل الخطاب'),
    short: s('Discourse', 'الخطاب'),
    icon: 'link', art: 'disc',
    desc: s('Cohesion and coherence, with ' + N + ' practice questions', 'Cohesion وcoherence، مع ' + N + ' سؤال تدريب'),
    subNoun: 'concept', parts: null, reading: false,
    termGroups: D.groupOrder, waveCap: 6, flipGoal: 10, flipDeck: 10,
    acts: ['quiz', 'speed'],
    vocabTabs: [['mcq', 'vocab.allMcq'], ['defs', 'vocab.defs']],
    exam: { qitems: 30, terms: 0, gaps: 0, written: 0, extras: 0, extraPool: [], all: true, sample: true, adaptive: { total: 20, targeted: 15 },
      desc: {
        1: s('30 multiple-choice questions from every topic: cohesion, coherence and classifying texts. It sets your starting point.',
             '30 سؤال اختيار من متعدد من كل المحاور: cohesion وcoherence وتصنيف النصوص. بيحدد إنت واقف فين.'),
        2: s('Aims at your weak spots: 15 of your weakest questions plus 5 general ones (20 questions). Without data yet, it is the same as Exam 1.',
             'بيركز على نقط ضعفك: 15 سؤال من أضعف أسئلتك و5 أسئلة عامة (20 سؤال). ولو لسه مفيش بيانات، بيبقى زي الامتحان 1.'),
        3: s('The final check: a fresh set of 30 questions, avoiding the ones asked in your last exam where possible.',
             'المراجعة الأخيرة: 30 سؤال جداد، وبنحاول نبعد عن أسئلة آخر امتحان على قد ما نقدر.'),
        4: s('All ' + N + ' questions in one exam, topic by topic. Stop whenever you like with "Finish now": only the questions you answered are marked, and you see how many you got right and wrong.',
             'كل الـ ' + N + ' سؤال في امتحان واحد، محور محور. تقدر توقف في أي وقت من زرار "إنهاء الآن": بيتصحح بس اللي جاوبته، وتشوف عدد الصح والغلط.')
      } },
    text: {
      en: { 'game1.name': 'Game 1: Quick Practice', 'game1.desc': 'Quick questions and a speed round across all topics.',
        'vocab.title': 'All questions and answers', 'vocab.lead': 'Every multiple-choice question with its answer and explanation, and the two concepts.', 'vocab.search': 'Search questions…', 'nav.vocab': 'All answers',
        'learn.lead': 'Understand it first: short explanations with examples, then each concept in full and in short.' },
      ar: { 'game1.name': 'اللعبة 1: تدريب سريع', 'game1.desc': 'أسئلة سريعة وجولة سرعة في كل المحاور.',
        'vocab.title': 'كل الأسئلة والإجابات', 'vocab.lead': 'كل أسئلة الاختيار من متعدد بإجاباتها وشرحها، والمفهومين.', 'vocab.search': 'ابحث في الأسئلة…', 'nav.vocab': 'كل الإجابات',
        'learn.lead': 'افهم الأول: شرح قصير بالأمثلة، وبعدين كل مفهوم بالتفصيل وباختصار.' }
    }
  };
})();
