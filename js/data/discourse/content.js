/* Subject 4: Discourse Analysis (تحليل الخطاب): cohesion, coherence, acceptability and the standards of textuality.
   Prepared from standard references (Halliday and Hasan, 1976; de Beaugrande and Dressler, 1981), not from a course book.
   Every multiple-choice question is its own item (kind "q"), so exams can hold all of them and the weak ones come back. */
(function () {
  var UN = window.UN = window.UN || {};
  var D = UN.DA = {};
  function s(en, ar) { return { en: en, ar: ar }; }

  D.groups = {
    coh: s('Cohesion', 'السبك (الاتساق)'),
    dev: s('Cohesive devices', 'أدوات السبك'),
    cohr: s('Coherence', 'الحبك (الانسجام)'),
    mix: s('Cohesive or coherent?', 'سبك أم حبك؟'),
    acc: s('Acceptability', 'المقبولية'),
    std: s('Standards of textuality', 'معايير النصية')
  };
  D.groupOrder = ['coh', 'dev', 'cohr', 'mix', 'acc', 'std'];
  D.terms = []; D.confusable = []; D.written = []; D.parts = {}; D.partsOrder = {}; D.lessons = [];

  /* ---------- key concepts: a full explanation and a short version, in English and in natural Arabic, with examples.
     def (the short English line) is what the games and matching use. ---------- */
  function ex(t, en, ar) { return { t: t, n: s(en, ar) }; }
  var K = [
    { g: 'coh', name: 'Cohesion', ar: 'السبك (الاتساق)',
      full: s("Cohesion is the way the sentences of a text are tied together by visible links in the words and the grammar. When a pronoun points back to a name, when a linking word joins two ideas, or when a word is repeated, the reader can see how one sentence connects to the next. Halliday and Hasan (1976) describe five kinds of these links: reference, substitution, ellipsis, conjunction and lexical cohesion.",
              "السبك (أو الاتساق) هو الترابط الظاهر بين جمل النص، الذي نراه في الكلمات والتراكيب نفسها. فحين يعود ضمير على اسم سبق ذكره، أو تربط أداةٌ بين فكرتين، أو تتكرر كلمة، يرى القارئ كيف تتصل كل جملة بالتي تليها. وقد حدّد هاليداي ورقية حسن (1976) خمسة أنواع لهذه الروابط: الإحالة، والاستبدال، والحذف، والوصل، والسبك المعجمي."),
      short: s('The visible links between sentences: pronouns, linking words and repeated words.', 'يعني ببساطة: الروابط اللي تقدر تشاور عليها بين الجمل، زي الضمائر وأدوات الربط والكلمات المتكررة.'),
      ex: [ex('Omar bought a phone. He uses it every day.', "'He' points to Omar and 'it' points to the phone.", "'He' راجعة على عمر، و'it' راجعة على الموبايل.")] },
    { g: 'cohr', name: 'Coherence', ar: 'الحبك (الانسجام)',
      full: s("Coherence is the way the ideas of a text fit together so that the whole text makes sense. It is not found in particular words: it comes from a logical order of ideas, ideas that do not contradict each other, and the reader's own knowledge of the world, which fills the gaps between sentences. That is why a text can be coherent even with no linking words at all.",
              "الحبك (أو الانسجام) هو ترابط أفكار النص بحيث يصبح له معنى واحد مفهوم. وهو لا يظهر في كلمات بعينها، بل ينتج عن ترتيب منطقي للأفكار، وخلوّها من التناقض، وعن معرفة القارئ نفسه بالعالم، وهي التي تملأ الفجوات بين الجمل. ولهذا قد يكون النص منسجمًا حتى لو خلا تمامًا من أدوات الربط."),
      short: s('The ideas make sense together as one whole.', 'يعني ببساطة: الأفكار راكبة على بعض، والكلام كله له معنى.'),
      ex: [ex('The ice cream melted. The sun was very hot.', "There is no 'because', but we understand the cause: coherent.", "مفيش 'because'، بس فاهمين السبب: فيه حبك.")] },
    { g: 'acc', name: 'Acceptability', ar: 'المقبولية',
      full: s("Acceptability looks at a text from the receiver's side: does the reader or listener accept it as a clear, connected and useful text in this situation? It depends on who the receiver is, on the situation and on the culture, so the same text can be acceptable in one place and not in another. Receivers also tolerate small mistakes when the text is useful to them (de Beaugrande and Dressler, 1981).",
              "المقبولية تنظر إلى النص من جهة المتلقي: هل يقبله القارئ أو السامع نصًا واضحًا مترابطًا مفيدًا في هذا الموقف؟ وهي تتوقف على المتلقي نفسه وعلى الموقف والثقافة، ولذلك قد يكون النص الواحد مقبولًا في موقف وغير مقبول في موقف آخر. كما يتسامح المتلقي مع الأخطاء الصغيرة إذا كان النص مفيدًا له (دي بوجراند ودريسلر، 1981)."),
      short: s('Would this reader accept this text here?', 'يعني ببساطة: هل اللي هيقرا أو يسمع هيقبل الكلام ده في الموقف ده؟'),
      ex: [ex('A formal email to the dean: "Hey man, fix my grades ASAP."', 'Connected and clear, but not acceptable for this receiver.', 'مترابط وواضح، لكنه مش مقبول عند المتلقي ده.')] },
    { g: 'dev', name: 'Reference', ar: 'الإحالة',
      full: s("Reference is when a word cannot be understood on its own and points to something else for its meaning. Pronouns (he, it, they), demonstratives (this, that, here) and comparatives (same, different, other) are the usual reference words. What they point to may come before (anaphora), after (cataphora), or be outside the text in the situation (exophora).",
              "الإحالة أن تكون الكلمة غير مفهومة وحدها، فتشير إلى شيء آخر تأخذ منه معناها. وأشهر كلمات الإحالة: الضمائر (هو، هم)، وأسماء الإشارة (هذا، هناك)، وألفاظ المقارنة (نفس، مختلف، آخر). وما تشير إليه قد يأتي قبلها (إحالة قبلية)، أو بعدها (إحالة بعدية)، أو يكون خارج النص في الموقف نفسه (إحالة خارجية)."),
      short: s('A word that points to something else: he, it, this, that.', 'يعني ببساطة: كلمة بتشاور على حاجة تانية، زي: هو، ده، دي.'),
      ex: [ex('Omar called. He wants to see you.', "'He' = Omar.", "'He' = عمر.")] },
    { g: 'dev', name: 'Substitution', ar: 'الاستبدال',
      full: s("Substitution is replacing a word or a group of words with a short substitute word, so the writer does not need to repeat them. English uses 'one/ones' for nouns, 'do' for verbs and 'so/not' for whole clauses. The reader understands the substitute by looking back at what it replaces.",
              "الاستبدال أن نضع كلمة قصيرة مكان كلمة أو مجموعة كلمات حتى لا نكررها. وفي الإنجليزية تُستخدم one/ones بدل الأسماء، وdo بدل الأفعال، وso/not بدل جملة كاملة. ويفهم القارئ الكلمة البديلة حين يعود إلى ما حلّت محله."),
      short: s('A short word replaces another: one, do, so.', 'يعني ببساطة: كلمة صغيرة بتاخد مكان كلمة تانية عشان منكررهاش.'),
      ex: [ex('My phone is old. I need a new one.', "'one' = phone.", "'one' = الموبايل."), ex('Will it rain? I think so.', "'so' = it will rain.", "'so' = إنها هتمطر.")] },
    { g: 'dev', name: 'Ellipsis', ar: 'الحذف',
      full: s("Ellipsis is leaving out words that the reader can easily recover from the text before. It is sometimes called 'substitution by zero', because the missing words are replaced by nothing. Short answers and parallel sentences often use ellipsis.",
              "الحذف أن نُسقط كلمات يستطيع القارئ أن يستعيدها بسهولة من الكلام السابق. ولهذا يُسمّى أحيانًا «الاستبدال بالصفر»، لأن الكلمات المحذوفة لا يحل محلها شيء. وكثيرًا ما نجده في الإجابات القصيرة والجمل المتوازية."),
      short: s('Leaving out words the reader can guess.', 'يعني ببساطة: بنشيل كلام القارئ يقدر يخمّنه من اللي قبله.'),
      ex: [ex('Ahmed ordered tea and Karim coffee.', "'ordered' is left out after Karim.", "كلمة 'ordered' اتشالت بعد كريم."), ex('Who broke the window? Youssef.', '= Youssef broke the window.', '= يوسف هو اللي كسر الشباك.')] },
    { g: 'dev', name: 'Conjunction', ar: 'الوصل (الربط)',
      full: s("Conjunction is the use of linking words that join sentences and show how the ideas are related. The relation can be addition (and, moreover), contrast (but, however), cause or result (because, so, therefore) or time (first, then, finally). These words tell the reader how to read the next sentence.",
              "الوصل هو استخدام أدوات ربط تصل بين الجمل وتوضح نوع العلاقة بين الأفكار: إضافة (و، علاوة على ذلك)، أو مقابلة (لكن، ومع ذلك)، أو سبب ونتيجة (لأن، لذلك)، أو زمن (أولًا، ثم، أخيرًا). فهذه الأدوات تخبر القارئ كيف يفهم الجملة التالية."),
      short: s('Linking words: and, but, because, then.', 'يعني ببساطة: أدوات الربط اللي بتقولك العلاقة بين الأفكار.'),
      ex: [ex('It was raining. However, we went out.', "'However' = contrast.", "'However' = مقابلة، يعني عكس المتوقع.")] },
    { g: 'dev', name: 'Lexical cohesion', ar: 'السبك المعجمي',
      full: s("Lexical cohesion is the link created by vocabulary rather than grammar. It happens when a word is repeated, when a synonym or a more general word is used for the same thing, when opposite words appear, or when words that usually go together (collocation) appear in the same text, like doctor, patient and hospital.",
              "السبك المعجمي هو الترابط الذي تصنعه المفردات لا القواعد. ويحدث حين تتكرر كلمة، أو يُستخدم مرادفها أو كلمة أعم منها للدلالة على الشيء نفسه، أو تظهر كلمات متضادة، أو كلمات اعتادت أن تأتي معًا (التضام)، مثل: طبيب ومريض ومستشفى."),
      short: s('Words that link: repetition, synonyms, words that go together.', 'يعني ببساطة: الربط بالكلمات نفسها، زي التكرار والمرادفات والكلمات اللي بتيجي مع بعض.'),
      ex: [ex('Karim bought a car. The vehicle was cheap.', "'vehicle' is a more general word for 'car'.", "'vehicle' كلمة أعم من 'car'.")] },
    { g: 'dev', name: 'Anaphora', ar: 'الإحالة القبلية',
      full: s("Anaphora is reference that points back to something already mentioned in the text. It is the most common kind of reference: we name something once and then use a pronoun or 'this/that' instead of repeating it.",
              "الإحالة القبلية إحالة تعود إلى شيء ذُكر من قبل في النص، وهي أكثر أنواع الإحالة شيوعًا: نذكر الشيء مرة، ثم نستعمل ضميرًا أو اسم إشارة بدل تكراره."),
      short: s('Pointing back.', 'يعني ببساطة: بترجع لورا.'),
      ex: [ex('Omar came late. He missed the bus.', "'He' points back to Omar.", "'He' بترجع لعمر اللي اتذكر قبلها.")] },
    { g: 'dev', name: 'Cataphora', ar: 'الإحالة البعدية',
      full: s("Cataphora is reference that points forward to something that comes later in the text. The writer uses 'this', 'here' or a pronoun first and gives the meaning afterwards, which builds a little suspense.",
              "الإحالة البعدية إحالة تشير إلى شيء يأتي لاحقًا في النص؛ فالكاتب يستعمل اسم إشارة أو ضميرًا أولًا، ثم يوضّح المقصود بعد ذلك، فيصنع شيئًا من التشويق."),
      short: s('Pointing forward.', 'يعني ببساطة: بتشاور لقدام.'),
      ex: [ex('This is my advice: read every day.', "'This' points to 'read every day'.", "'This' بتشاور على 'read every day' اللي جاية بعدها.")] },
    { g: 'dev', name: 'Exophora', ar: 'الإحالة الخارجية (المقامية)',
      full: s("Exophora is reference to something outside the text, in the situation where the text is used. The reader or listener has to see or know the situation to understand it, so it does not create links inside the text itself.",
              "الإحالة الخارجية (المقامية) إحالة إلى شيء خارج النص، في الموقف الذي يُقال فيه الكلام؛ فلا يفهمها القارئ أو السامع إلا إذا رأى الموقف أو عرفه، ولذلك لا تصنع ربطًا داخل النص نفسه."),
      short: s('Pointing outside the text.', 'يعني ببساطة: بتشاور على حاجة برة النص.'),
      ex: [ex('Look at that! (pointing at a plane)', "'That' = the plane you can see.", "'That' = الطيارة اللي قدامك.")] },
    { g: 'std', name: 'Intentionality', ar: 'القصدية',
      full: s("Intentionality is the producer's side of a text: the writer or speaker intends the text to be connected and to achieve a goal, such as informing, persuading or asking. Without this intention, the words would not form a real message.",
              "القصدية هي جانب منتج النص: فالكاتب أو المتكلم يقصد أن يكون نصه مترابطًا وأن يحقق هدفًا، كالإخبار أو الإقناع أو الطلب. ومن دون هذا القصد لا تصبح الكلمات رسالة حقيقية."),
      short: s('The writer means it to reach a goal.', 'يعني ببساطة: صاحب الكلام قاصد يوصّل رسالة.'),
      ex: [ex('An advert for a phone.', 'It is written to persuade you to buy.', 'متكتب عشان يقنعك تشتري.')] },
    { g: 'std', name: 'Informativity', ar: 'الإعلامية',
      full: s("Informativity is how new or unexpected the content of a text is for the receiver. A text that says only what everyone already knows is dull, while a text full of surprises may be hard to follow; good texts balance the two.",
              "الإعلامية هي مدى جِدّة محتوى النص أو مفاجأته للمتلقي. فالنص الذي لا يقول إلا ما يعرفه الجميع مملّ، والنص المليء بالمفاجآت قد يصعب استيعابه، والنص الجيد يوازن بين الأمرين."),
      short: s('How new the information is.', 'يعني ببساطة: قد إيه المعلومة جديدة عليك.'),
      ex: [ex('"The sea is wet." / "This beach got 3 metres of snow."', 'The first tells you nothing new; the second is very surprising.', 'الأولى ملهاش أي جديد، والتانية مفاجأة جدًا.')] },
    { g: 'std', name: 'Situationality', ar: 'المقامية (رعاية الموقف)',
      full: s("Situationality is about how well a text fits the situation in which it is used. The place, the time and the people involved help the receiver understand it, which is why a very short text can work perfectly in the right situation.",
              "المقامية (رعاية الموقف) تتعلق بمدى مناسبة النص للموقف الذي يُستعمل فيه. فالمكان والزمان والأشخاص يساعدون المتلقي على الفهم، ولهذا قد ينجح نص قصير جدًا نجاحًا تامًا في الموقف المناسب."),
      short: s('Fitting the situation.', 'يعني ببساطة: الكلام مناسب للمكان والوقت والناس.'),
      ex: [ex('"SLOW. SCHOOL." on a sign next to a school.', 'The place makes the short text clear.', 'المكان نفسه بيوضّح معنى الكلمتين.')] },
    { g: 'std', name: 'Intertextuality', ar: 'التناص',
      full: s("Intertextuality is the way understanding one text depends on knowing other texts. A headline that plays on a famous saying, a reply to an earlier message, or a text that follows a familiar type (a recipe, a letter) all rely on other texts the reader already knows.",
              "التناص هو اعتماد فهم نص ما على معرفة نصوص أخرى. فالعنوان الصحفي الذي يلعب على مثل مشهور، والرد على رسالة سابقة، والنص الذي يتبع نوعًا مألوفًا (كوصفة طعام أو خطاب)، كلها تستند إلى نصوص يعرفها القارئ من قبل."),
      short: s('Understanding depends on other texts.', 'يعني ببساطة: علشان تفهم النص لازم تكون عارف نص تاني.'),
      ex: [ex('A football headline: "Where there\'s a will, there\'s a goal."', "It plays on the proverb \"Where there's a will, there's a way\".", "بيلعب على المثل المشهور \"Where there's a will, there's a way\" (اللي عايز حاجة بيلاقي طريقها).")] }
  ];
  D.subs = K.map(function (k, i) { return { id: 'DK' + (i + 1), group: k.g, name: k.name, arName: k.ar, def: k.short.en, full: k.full, short: k.short, ex: k.ex }; });

  /* ---------- multiple-choice questions: [group, question, options (first is listed as a, ...), key, why] ---------- */
  var BOTH = 'Cohesive and coherent', COH = 'Cohesive but not coherent', CHR = 'Coherent but not cohesive', NONE = 'Neither cohesive nor coherent';
  var FOUR = [BOTH, COH, CHR, NONE];
  function txt(t) { return 'Which description fits this text best? "' + t + '"'; }
  var Q = [
    // cohesion
    ['coh', 'Cohesion is mainly about…', ['the visible links between sentences, such as pronouns and linking words', "the reader's background knowledge of the world", 'the length of the text', "the writer's handwriting"], 'a', 'Cohesion is on the surface: you can point to the words that tie the sentences together.'],
    ['coh', 'Where is cohesion found?', ['On the surface of the text: in its words and grammar', "Only in the reader's mind", 'In the title only', 'In the punctuation only'], 'a', "Cohesion is a property of the text's surface: its grammar and vocabulary."],
    ['coh', 'Which of these is a cohesive device?', ["The pronoun 'it' referring to a book mentioned before", 'A long paragraph', 'A beautiful font', 'A question mark'], 'a', "'It' points back to the book, so it links two sentences (reference)."],
    ['coh', "In \"Ali bought a car. He paid cash for it.\", which words create cohesion?", ["'He' and 'it'", "'a' and 'for'", 'Only the full stops', 'No words create cohesion'], 'a', "'He' refers back to Ali and 'it' refers back to the car: reference."],
    ['coh', 'Halliday and Hasan (1976) described how many main types of cohesion?', ['Five', 'Two', 'Seven', 'Ten'], 'a', 'Reference, substitution, ellipsis, conjunction and lexical cohesion.'],
    ['coh', "Which list gives Halliday and Hasan's types of cohesion?", ['Reference, substitution, ellipsis, conjunction, lexical cohesion', 'Intentionality, acceptability, informativity', 'Subject, verb, object', 'Introduction, body, conclusion'], 'a', 'These five are the cohesive devices; the second list contains standards of textuality.'],
    ['coh', 'Can a text be cohesive but still not make sense?', ['Yes. Links alone do not guarantee meaning', 'No. Every cohesive text makes sense', 'Only if it is very short', 'Only if it has no pronouns'], 'a', 'A text can be full of links and still be nonsense: cohesion is not enough for coherence.'],
    ['coh', 'Cohesion is like…', ['the threads that hold a woven carpet together', 'the colour of the carpet', 'the price of the carpet', 'the shop that sells the carpet'], 'a', 'A memory aid: the threads are the links you can see; the pattern (the meaning) is coherence.'],
    ['coh', "'Grammatical cohesion' includes…", ['reference, substitution, ellipsis and conjunction', 'repetition and synonyms only', 'rhyme and rhythm', 'spelling and punctuation'], 'a', 'Lexical cohesion (vocabulary) is the fifth type; the other four are grammatical.'],
    ['coh', 'Which type of cohesion is made with vocabulary rather than grammar?', ['Lexical cohesion', 'Reference', 'Ellipsis', 'Substitution'], 'a', 'Repetition, synonyms, general words and collocations are links made with vocabulary.'],
    ['coh', 'Which question tests cohesion?', ['Can I point to the words that link these sentences?', 'Does the whole text make sense to me?', 'Is the text useful to the reader?', 'Is the information new?'], 'a', 'Cohesion: point to the links. Coherence: does it make sense as a whole?'],
    ['coh', "A text full of 'and', 'but' and 'so' has many…", ['conjunctions, which are cohesive devices', 'ellipses', 'intertextual links', 'situations'], 'a', 'Linking words like and, but and so are conjunctions, one of the five cohesive devices.'],
    // cohesive devices
    ['dev', "\"Omar bought a new book and read it in one day.\" What is 'it'?", ["Reference: 'it' points back to 'a new book'", 'Substitution', 'Ellipsis', 'Conjunction'], 'a', "A pronoun that points back to something already mentioned is reference (anaphora)."],
    ['dev', "\"My phone is old. I need a new one.\" What is 'one'?", ["Substitution: 'one' replaces 'phone'", 'Reference', 'Ellipsis', 'Lexical cohesion'], 'a', "'One' takes the place of the noun 'phone': nominal substitution."],
    ['dev', "\"Ahmed ordered tea and Karim coffee.\" Which device explains the missing word after 'Karim'?", ["Ellipsis: 'ordered' is left out because it is understood", 'Substitution', 'Reference', 'Collocation'], 'a', "The verb 'ordered' is omitted and recovered from the first part: ellipsis."],
    ['dev', "\"It was raining. However, we went out.\" 'However' is…", ['Conjunction (contrast)', 'Reference', 'Substitution', 'Ellipsis'], 'a', "'However' links the sentences and shows contrast: adversative conjunction."],
    ['dev', "\"I saw a snake. The snake was huge.\" The repeated word 'snake' is…", ['Lexical cohesion (repetition)', 'Substitution', 'Ellipsis', 'Conjunction'], 'a', 'Repeating a word is the simplest kind of lexical cohesion (reiteration).'],
    ['dev', "\"Will it rain tomorrow? I think so.\" 'So' here is…", ["Substitution: 'so' replaces 'it will rain tomorrow'", 'Conjunction (cause)', 'Reference', 'Ellipsis'], 'a', "Here 'so' replaces a whole clause: clausal substitution. Compare 'He was tired, so he slept' (conjunction)."],
    ['dev', "\"He studied hard, so he passed.\" 'So' here is…", ['Conjunction (result)', 'Substitution', 'Reference', 'Ellipsis'], 'a', "Here 'so' links two clauses and shows result: causal conjunction."],
    ['dev', "\"Do you like football? I do.\" 'Do' is…", ["Substitution: 'do' replaces 'like football'", 'Reference', 'Lexical cohesion', 'Conjunction'], 'a', "'Do' stands for the verb phrase 'like football': verbal substitution."],
    ['dev', "\"Who broke the window? Youssef.\" This short answer uses…", ["Ellipsis: 'broke the window' is understood", 'Reference', 'Substitution', 'Conjunction'], 'a', "The rest of the clause is left out because the question supplies it: ellipsis."],
    ['dev', "\"Karim bought a car. The vehicle was cheap.\" 'Vehicle' links back to 'car' through…", ['Lexical cohesion (a more general word)', 'Ellipsis', 'Substitution', 'Conjunction'], 'a', "'Vehicle' is a more general word (superordinate) for 'car': reiteration, a kind of lexical cohesion."],
    ['dev', "\"The doctor examined the patient in the hospital.\" 'Doctor', 'patient' and 'hospital' are linked by…", ['Collocation: words that usually go together', 'Ellipsis', 'Substitution', 'Reference'], 'a', 'Words from the same field that tend to occur together create lexical cohesion through collocation.'],
    ['dev', "\"Look at that!\" (said while pointing at a plane in the sky). 'That' is…", ['Exophoric reference: it points to something outside the text', 'Anaphoric reference', 'Cataphoric reference', 'Ellipsis'], 'a', "The plane is in the situation, not in the text: exophora."],
    ['dev', "\"This is my advice: read every day.\" 'This' points…", ["Forward, to 'read every day' (cataphora)", 'Back to an earlier sentence (anaphora)', 'Outside the text (exophora)', 'Nowhere'], 'a', "'This' points to what comes next: cataphoric reference."],
    ['dev', "\"Omar called. He wants to see you.\" 'He' points…", ["Back to 'Omar' (anaphora)", 'Forward (cataphora)', 'Outside the text (exophora)', 'Nowhere'], 'a', "'He' points back to Omar, mentioned before: anaphoric reference."],
    ['dev', 'Anaphora means…', ['referring back to something mentioned before', 'referring forward to something coming later', 'referring to something outside the text', 'repeating the same word'], 'a', 'Ana = back: the word points back in the text.'],
    ['dev', 'Cataphora means…', ['referring forward to something that comes later', 'referring back to something mentioned before', 'leaving words out', 'using a synonym'], 'a', 'Cata = forward: the word points ahead in the text.'],
    ['dev', "\"First, boil the water. Then add the tea.\" 'First' and 'Then' show…", ['Conjunction (time order)', 'Substitution', 'Ellipsis', 'Exophora'], 'a', 'Words that order events in time are temporal conjunctions.'],
    ['dev', "\"He speaks English. Moreover, he speaks French.\" 'Moreover' is a conjunction of…", ['addition', 'contrast', 'cause', 'time'], 'a', "'Moreover' adds information: additive conjunction."],
    ['dev', "\"I stayed at home because I was ill.\" 'Because' expresses…", ['cause', 'contrast', 'addition', 'time'], 'a', "'Because' gives the reason: causal conjunction."],
    ['dev', "\"The film was long, but it was interesting.\" 'But' expresses…", ['contrast', 'cause', 'addition', 'time'], 'a', "'But' sets two ideas against each other: adversative conjunction."],
    ['dev', "\"Apples, bananas, oranges: Karim loves fruit.\" 'Fruit' links to the list through…", ['Lexical cohesion (a general word for the items)', 'Ellipsis', 'Substitution', 'Conjunction'], 'a', "'Fruit' is the general word for apples, bananas and oranges: lexical cohesion."],
    ['dev', "\"I have two pens. You can take the blue.\" What is left out after 'blue'?", ["'pen': nominal ellipsis", "'take': verbal substitution", 'Nothing is left out', "'two': reference"], 'a', "'The blue (pen)': the noun is omitted and recovered from the first sentence."],
    ['dev', 'Which word is a substitute, not a pronoun?', ["'one' in \"I need a new one\"", "'he' in \"He came\"", "'it' in \"I read it\"", "'they' in \"They left\""], 'a', "Pronouns are reference; 'one/ones', 'do' and 'so' are typical substitutes."],
    ['dev', "\"Mahmoud has a red car. Ali has a different car.\" 'Different' creates…", ['Comparative reference: it compares with the car mentioned before', 'Ellipsis', 'Substitution', 'Exophora'], 'a', "Words like same, different, other and more compare with something in the text: comparative reference."],
    ['dev', 'Ellipsis is sometimes called…', ['substitution by zero', 'reference by name', 'conjunction by time', 'repetition by sound'], 'a', 'In ellipsis the replacement is nothing at all: substitution by zero.'],
    ['dev', 'Which device replaces a word with another word?', ['Substitution', 'Ellipsis', 'Reference', 'Collocation'], 'a', 'Substitution replaces; ellipsis leaves out; reference points.'],
    ['dev', 'Which device leaves a word out completely?', ['Ellipsis', 'Substitution', 'Reference', 'Conjunction'], 'a', 'Ellipsis omits words that the reader can recover from the text.'],
    ['dev', "\"The movie was not long; it was short.\" 'Long' and 'short' are linked by…", ['Lexical cohesion (opposites)', 'Ellipsis', 'Substitution', 'Cataphora'], 'a', 'Opposite words also tie sentences together: a kind of lexical cohesion.'],
    // coherence
    ['cohr', 'Coherence is mainly about…', ['whether the ideas connect logically and make sense as a whole', 'the number of pronouns', 'the spelling', 'the font size'], 'a', 'Coherence is about meaning: do the ideas fit together into one sensible whole?'],
    ['cohr', 'Coherence depends on…', ["the logical order of ideas and the reader's background knowledge", 'the number of linking words only', 'the length of the sentences only', 'the use of capital letters'], 'a', 'Readers use logic and what they already know to connect the ideas.'],
    ['cohr', "\"The ice cream melted. The sun was very hot.\" Why does this make sense without 'because'?", ['The reader links cause and effect using his knowledge of the world', "Because of the pronoun 'it'", "Because the word 'sun' is repeated", 'It does not make sense'], 'a', 'No linking word is needed: the reader infers the cause (coherence without cohesion).'],
    ['cohr', "A: \"I need to buy bread.\" B: \"The bakery on the corner opens at seven.\" Why is B's answer coherent?", ['We know bakeries sell bread, so the ideas connect', "B repeats the word 'bread'", "B uses the conjunction 'and'", 'It is not coherent'], 'a', 'World knowledge (bakeries sell bread) connects the two lines.'],
    ['cohr', "\"He put on his shoes. He woke up. He went to work.\" What would make it more coherent?", ['Putting the events in a logical order', 'Adding more pronouns', 'Making the sentences longer', 'Removing the full stops'], 'a', 'He must wake up before he puts on his shoes: logical order builds coherence.'],
    ['cohr', "\"The shop was closed, so we bought everything there.\" What is wrong?", ['The ideas contradict each other, so it is not coherent', 'It has no cohesive devices', 'It is too short', 'Nothing is wrong'], 'a', "'So' and 'there' are cohesive links, but you cannot buy things in a closed shop: incoherent."],
    ['cohr', 'Which is a coherence problem?', ['Ideas that contradict each other', 'A missing comma', 'A long word', 'A capital letter at the start'], 'a', 'Contradictions break the meaning of the text, which is what coherence is about.'],
    ['cohr', 'Coherence is like…', ['the picture on a puzzle: the pieces must make one picture', 'the box of the puzzle', 'the price of the puzzle', 'the table under the puzzle'], 'a', 'A memory aid: pieces may fit together, but do they show one picture?'],
    ['cohr', 'Which question tests coherence?', ['Does the whole text make sense?', 'Can I underline the pronouns?', 'How many words are repeated?', 'Is the font readable?'], 'a', 'Coherence: does it make sense as a whole? Cohesion: can I point to the links?'],
    ['cohr', 'Where is coherence mainly built?', ["In the meaning behind the words and in the reader's mind", 'Only in the punctuation', 'Only in the title', 'In the number of paragraphs'], 'a', 'Coherence lies beneath the surface: in the concepts, their relations and the reader\'s knowledge.'],
    ['cohr', 'Can a text be coherent without any linking words?', ['Yes, if the ideas clearly connect', 'No, never', 'Only in Arabic', 'Only if it is written'], 'a', 'Many short dialogues and notes make perfect sense with no linking words.'],
    ['cohr', "\"Exams start tomorrow. Omar is staying at home tonight.\" The link between the sentences is…", ['a cause-and-effect relation the reader infers', 'a pronoun', 'a repeated word', 'a conjunction'], 'a', 'No word links them; the reader infers that he stays home to study: coherence.'],
    ['cohr', 'Which helps coherence most?', ['Ideas that follow a clear, logical plan', 'Using as many pronouns as possible', 'Repeating the same word in every sentence', 'Very long sentences'], 'a', 'A clear plan and logical order make the meaning easy to follow.'],
    ['cohr', 'Background knowledge (schema) matters for…', ['coherence, because the reader fills gaps with what he already knows', 'spelling', 'handwriting', 'punctuation'], 'a', 'Readers connect ideas using what they already know about the world.'],
    ['cohr', 'Which statement is true?', ['Cohesion helps coherence, but it is not enough by itself', 'Cohesion and coherence are exactly the same', 'Coherence is only about pronouns', 'A coherent text must have many conjunctions'], 'a', 'Links help the reader, but only meaningful connections make a text coherent.'],
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
    ['mix', 'Which text is coherent but NOT cohesive?', ["\"The phone rang. I was in the shower.\"", "\"I bought a car. The car is red. Red is a colour. Colours are nice.\"", "\"Omar was tired, so he went to bed.\"", "\"Salt is white. The bus is late. Seven is odd.\""], 'a', 'The first text has no linking words, but the meaning connects.'],
    ['mix', 'Which text is cohesive but NOT coherent?', ["\"I like apples. Apples are red. Red is a colour of the flag. The flag is on the moon.\"", "\"Omar was tired, so he went to bed.\"", "\"Rain. Traffic. Late again.\"", "\"Salt is white. The bus is late. Seven is odd.\""], 'a', 'The first text is chained by repeated words but makes no overall sense.'],
    ['mix', 'Which text is both cohesive and coherent?', ["\"Omar was tired, so he went to bed early.\"", "\"Rain. Traffic. Late again.\"", "\"I like tea. Tea is a word. Words are long.\"", "\"Salt is white. The bus is late. Seven is odd.\""], 'a', "'So' and 'he' link the clauses, and the meaning is clear."],
    ['mix', 'Which text is neither cohesive nor coherent?', ["\"Salt is white. The bus is late. Seven is odd.\"", "\"Omar was tired, so he went to bed.\"", "\"The phone rang. I was in the shower.\"", "\"I like tea. Tea is a word. Words are long.\""], 'a', 'No links and no shared meaning.'],
    // acceptability
    ['acc', "Situation: a formal email to the dean. Text: \"Hey man, fix my grades ASAP.\" Is it acceptable here?", ['Not acceptable: the receiver would not accept this text in this situation', 'Acceptable: it is short and clear'], 'a', 'It is cohesive and coherent, but its tone does not suit the receiver or the situation.'],
    ['acc', "Situation: a friend texts \"Coming to the match?\" Reply: \"Yes! See you at 8.\" Is it acceptable?", ['Acceptable: it is clear and suits the situation', 'Not acceptable: it is too short'], 'a', 'Short, friendly and useful: exactly what the receiver needs here.'],
    ['acc', "Situation: a road sign near a school. Text: \"SLOW. SCHOOL.\" Is it acceptable?", ['Acceptable: drivers understand it at once in this situation', 'Not acceptable: it is not a full sentence'], 'a', 'Receivers accept the short form because the situation makes the meaning clear.'],
    ['acc', "Situation: a job interview. \"Tell us about yourself.\" Answer: \"My favourite food is koshari and I hate Mondays.\" Is it acceptable?", ['Not acceptable: it is not useful or relevant for the interviewer', 'Acceptable: it is cohesive and coherent'], 'a', 'The answer may be connected, but the receiver does not find it relevant to the situation.'],
    ['acc', "Situation: a teacher asks, \"What is the capital of Egypt?\" Student: \"Cairo.\" Is it acceptable?", ['Acceptable: the short answer is complete in this situation', 'Not acceptable: it has no verb'], 'a', 'With the question as context, one word is a full and useful answer.'],
    ['acc', 'Acceptability is mainly about…', ["the receiver's attitude: does the reader or listener accept the text as useful and suitable?", "the writer's spelling", 'the number of paragraphs', 'the use of pronouns only'], 'a', 'Acceptability takes the receiver\'s point of view.'],
    ['acc', 'Whose point of view does acceptability take?', ["The receiver's (the reader or listener)", "The writer's only", "The printer's", "The translator's grammar book"], 'a', "Intentionality is the producer's side; acceptability is the receiver's side."],
    ['acc', 'A text can be cohesive and coherent but still not acceptable when…', ['it does not suit the receiver or the situation', 'it has too many pronouns', 'it is printed in black', 'it has a title'], 'a', 'Acceptability depends on the receiver and the situation, not only on the text.'],
    ['acc', 'Readers often accept a text with small mistakes if it is useful to them. This shows that acceptability…', ["depends on the receiver's needs and tolerance", 'means a text must be perfect', 'has nothing to do with the receiver', 'is only about grammar'], 'a', 'Receivers tolerate small problems when the text serves their purpose.'],
    ['acc', "Situation: a medicine leaflet. Text: \"Take two tablets after meals, three times a day.\" Is it acceptable?", ['Acceptable: it is clear and useful for the patient', 'Not acceptable: it is too direct'], 'a', 'Clear, direct instructions are exactly what this receiver needs.'],
    ['acc', "Situation: a condolence message to a friend whose father has died. Text: \"LOL, life goes on!\" Is it acceptable?", ['Not acceptable: it is unsuitable for the receiver and the situation', 'Acceptable: it is short'], 'a', 'The tone hurts the receiver; he would not accept this text in this situation.'],
    ['acc', "Situation: exam instructions. Text: \"Answer all questions. Use a blue pen.\" Is it acceptable?", ['Acceptable: clear and suitable for students', 'Not acceptable: it gives orders'], 'a', 'Instructions are expected to give clear orders: acceptable.'],
    ['acc', 'Which things affect acceptability?', ['The receiver, the situation and the culture', 'Only the length of the text', 'Only the font', 'Only the number of verbs'], 'a', 'The same text can be acceptable to one receiver or in one situation and not in another.'],
    ['acc', "Situation: a weather forecast on the radio. Text: \"Tomorrow: sunny, 30 degrees, light wind.\" Is it acceptable?", ['Acceptable: the short form is normal for a forecast', 'Not acceptable: it has no full sentences'], 'a', 'Listeners expect this short style in a forecast.'],
    // standards of textuality
    ['std', 'de Beaugrande and Dressler (1981) listed how many standards of textuality?', ['Seven', 'Five', 'Three', 'Ten'], 'a', 'Cohesion, coherence, intentionality, acceptability, informativity, situationality and intertextuality.'],
    ['std', 'Which two standards are about the text itself (text-centred)?', ['Cohesion and coherence', 'Acceptability and intentionality', 'Informativity and situationality', 'Intertextuality and acceptability'], 'a', 'Cohesion and coherence describe the text; the other five involve the users and the setting.'],
    ['std', "Which standard is about the writer's or speaker's purpose?", ['Intentionality', 'Acceptability', 'Informativity', 'Intertextuality'], 'a', 'Intentionality: the producer means the text to be connected and to reach a goal.'],
    ['std', 'Which standard is about how new or unexpected the information is?', ['Informativity', 'Situationality', 'Cohesion', 'Acceptability'], 'a', 'Informativity measures how new or surprising the content is for the receiver.'],
    ['std', 'Which standard is about how relevant the text is to its situation?', ['Situationality', 'Informativity', 'Intertextuality', 'Cohesion'], 'a', 'Situationality: the text fits the situation in which it is used.'],
    ['std', "Which standard is about a text's relation to other texts the reader knows?", ['Intertextuality', 'Intentionality', 'Acceptability', 'Coherence'], 'a', 'Intertextuality: understanding one text depends on knowing others.'],
    ['std', 'A newspaper headline that plays on a famous proverb depends mainly on…', ['intertextuality', 'ellipsis', 'acceptability', 'substitution'], 'a', 'The reader must know the original proverb to enjoy the headline.'],
    ['std', "\"SLOW. SCHOOL.\" on a sign near a school is understood at once because of…", ['situationality', 'informativity', 'intertextuality', 'cohesion'], 'a', 'The place where the sign stands tells drivers what it means: situationality.'],
    ['std', 'A text that only tells the reader what he already knows has low…', ['informativity', 'cohesion', 'intentionality', 'situationality'], 'a', 'Nothing new means low informativity, so the text can be boring.'],
    ['std', 'Which pair shows the two sides of a text: the producer and the receiver?', ['Intentionality and acceptability', 'Cohesion and ellipsis', 'Reference and substitution', 'Informativity and collocation'], 'a', 'Intentionality is the producer\'s attitude; acceptability is the receiver\'s.'],
    ['std', 'Which list gives the seven standards of textuality?', ['Cohesion, coherence, intentionality, acceptability, informativity, situationality, intertextuality', 'Reference, substitution, ellipsis, conjunction, lexical cohesion, anaphora, cataphora', 'Subject, verb, object, complement, adverb, clause, phrase', 'Introduction, body, conclusion, title, paragraph, sentence, word'], 'a', 'The second list is cohesive devices and reference types, not standards of textuality.'],
    ['std', 'A text that does not meet the standards of textuality is treated as…', ['a non-text (it does not communicate)', 'a poem', 'a translation', 'a dictionary entry'], 'a', 'de Beaugrande and Dressler: if a standard is not satisfied, the text is not communicative.']
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
    dev: s('Five tools that tie sentences together: reference, substitution, ellipsis, conjunction and lexical cohesion.', 'خمس أدوات بتربط الجمل: الإحالة، والاستبدال، والحذف، والوصل، والسبك المعجمي.'),
    cohr: s('Meaning that holds together: logic, order and what the reader already knows.', 'معنى متماسك: منطق وترتيب ومعرفة القارئ.'),
    mix: s('Practise telling the four kinds of text apart.', 'اتدرب تفرّق بين الأنواع الأربعة للنصوص.'),
    acc: s('Would the reader or listener accept this text here?', 'هل القارئ أو السامع هيقبل النص ده في الموقف ده؟'),
    std: s('The seven standards that make a text a text.', 'المعايير السبعة اللي بتخلي النص نص.')
  };
  var TIP = {
    coh: s('Ask: can I point to the links?', 'اسأل: أقدر أشاور على الروابط؟'),
    dev: s('Reference points, substitution replaces, ellipsis leaves out.', 'الإحالة بتشاور، والاستبدال بيبدّل، والحذف بيشيل.'),
    cohr: s('Ask: does the whole text make sense?', 'اسأل: هل النص كله له معنى؟'),
    mix: s('Check links first, then meaning.', 'شوف الروابط الأول، وبعدين المعنى.'),
    acc: s('Same text, different situation, different answer.', 'نفس النص، موقف مختلف، إجابة مختلفة.'),
    std: s('Two are about the text, two about the people, three about the setting.', 'اتنين عن النص، واتنين عن الناس، وتلاتة عن الظروف.')
  };
  D.resources = D.groupOrder.map(function (g) {
    return { id: 'r-' + g, group: g, title: D.groups[g], text: TOPIC[g], tip: TIP[g], video: null, audio: null,
      items: D.subs.filter(function (x) { return x.group === g; }).map(function (x) { return x.id; }),
      related: D.qitems.filter(function (x) { return x.group === g; }).map(function (x) { return x.id; }) };
  });
  // what the repair lab shows before it asks a question of this topic
  D.groupLesson = {
    coh: s('Cohesion = the visible links: pronouns (he, it, this), linking words (and, but, so) and repeated or related words.', 'السبك = الروابط الظاهرة: الضمائر (هو، ده)، وأدوات الربط (و، لكن، لذلك)، والكلمات المتكررة أو المترابطة.'),
    dev: s('Reference points (he, it, this). Substitution replaces (one, do, so). Ellipsis leaves out. Conjunction links (and, but, because, then). Lexical cohesion uses vocabulary (repetition, synonyms, general words, collocation).', 'الإحالة بتشاور (هو، ده). الاستبدال بيبدّل (one، do، so). الحذف بيشيل. الوصل بيربط (و، لكن، لأن، ثم). السبك المعجمي بالمفردات (تكرار، مرادفات، كلمة أعم، تضام).'),
    cohr: s('Coherence = the meaning holds together. Check the order of ideas, contradictions and whether the reader can connect them with what he already knows.', 'الحبك = المعنى متماسك. شوف ترتيب الأفكار، وهل فيه تناقض، وهل القارئ يقدر يربطها بمعرفته.'),
    mix: s('Two questions: Are there links I can point to? (cohesion) Does it make sense as a whole? (coherence) Both, one of them, or neither.', 'سؤالين: فيه روابط أقدر أشاور عليها؟ (سبك) والنص كله له معنى؟ (حبك) الاتنين، أو واحد بس، أو ولا واحد.'),
    acc: s("Acceptability = the receiver's view. Is the text clear, useful and suitable for this reader in this situation?", 'المقبولية = رأي المتلقي. هل النص واضح ومفيد ومناسب للقارئ ده في الموقف ده؟'),
    std: s('Seven standards: cohesion, coherence (the text); intentionality, acceptability (the people); informativity, situationality, intertextuality (the setting).', 'سبعة معايير: السبك والحبك (النص)، والقصدية والمقبولية (الناس)، والإعلامية والمقامية والتناص (الظروف).')
  };

  /* ---------- the Learn page: understand it first, with labelled examples ---------- */
  D.explain = [
    { id: 'x-intro', title: s('Cohesion and coherence in one minute', 'السبك والحبك في دقيقة'),
      text: s("A good text is like a woven carpet. Cohesion is the threads you can see: words that tie the sentences together (he, it, this, and, but, so, repeated words). Coherence is the pattern: the ideas fit together and make sense as one whole. You check cohesion by pointing to the links. You check coherence by asking: does it make sense?",
              "النص الكويس زي السجادة المنسوجة. السبك هو الخيوط اللي بتشوفها: كلمات بتربط الجمل ببعض (هو، ده، و، لكن، لذلك، وتكرار الكلمات). والحبك هو الرسمة: الأفكار راكبة على بعض وبتعمل معنى واحد مفهوم. السبك تعرفه لما تقدر تشاور على الروابط، والحبك تعرفه لما تسأل: هل الكلام ده له معنى؟"),
      points: [s('Cohesion (السبك / الاتساق): links on the surface, made with grammar and vocabulary.', 'السبك (الاتساق): روابط على سطح النص، معمولة بالنحو والمفردات.'),
        s('Coherence (الحبك / الانسجام): meaning underneath, made with logic and the reader\'s knowledge.', 'الحبك (الانسجام): معنى تحت السطح، معمول بالمنطق ومعرفة القارئ.'),
        s('Quick test: can I point to the links? Then it is cohesive. Does it make sense? Then it is coherent.', 'اختبار سريع: أقدر أشاور على الروابط؟ يبقى فيه سبك. الكلام له معنى؟ يبقى فيه حبك.')] },
    { id: 'x-four', title: s('Four possibilities, with examples', 'أربع حالات بالأمثلة'),
      text: s('Cohesion and coherence are two different things, so a text can have both, one of them, or neither.', 'السبك والحبك حاجتين مختلفين، فالنص ممكن يبقى فيه الاتنين، أو واحد بس، أو ولا واحد.'),
      examples: [
        { text: 'Omar was tired, so he went to bed early.', tags: { coh: true, cohr: true },
          why: s("'So' and 'he' link the two parts, and the meaning is clear.", "'so' و'he' بيربطوا الجزأين، والمعنى واضح.") },
        { text: 'I bought a car. The car is red. Red is a colour. Colours make children happy.', tags: { coh: true, cohr: false },
          why: s('Every sentence is linked to the one before by a repeated word, but there is no single topic: it goes nowhere.', 'كل جملة مربوطة باللي قبلها بكلمة متكررة، لكن مفيش موضوع واحد: الكلام مش رايح في حتة.') },
        { text: "A: Can you give me a lift? B: My car is at the mechanic's.", tags: { coh: false, cohr: true },
          why: s("No word links the two lines, but we understand that B means 'no': the meaning connects.", "مفيش كلمة بتربط السطرين، بس فاهمين إن B قصده 'لأ': المعنى متصل.") },
        { text: 'Salt is white. The bus is late. Seven is an odd number.', tags: { coh: false, cohr: false },
          why: s('No links and no shared meaning.', 'لا روابط ولا معنى مشترك.') }],
      remember: s('Cohesion helps coherence, but it is not enough: a text can be linked and still make no sense, and a text with no links can still make sense.', 'السبك بيساعد الحبك لكنه مش كفاية: النص ممكن يكون مربوط ومع ذلك ملوش معنى، وممكن يكون من غير روابط وله معنى.') },
    { id: 'x-devices', title: s('The five cohesive devices (Halliday and Hasan, 1976)', 'أدوات السبك الخمسة (هاليداي ورقية حسن، 1976)'),
      text: s('These are the tools that create cohesion. The first four are grammar; the fifth is vocabulary.', 'دي الأدوات اللي بتعمل السبك. الأربعة الأولى نحو، والخامسة مفردات.'),
      items: [
        { name: s('Reference', 'الإحالة'), text: s('A word points to something else: back (anaphora), forward (cataphora) or outside the text (exophora).', 'كلمة بتشاور على حاجة تانية: لورا (إحالة قبلية)، أو لقدام (إحالة بعدية)، أو برة النص (إحالة خارجية).'),
          ex: ['Omar called. He wants to see you. (he = Omar, back)', 'Here is the news: the exam is postponed. (here = what comes next, forward)', 'Look at that! (pointing: outside the text)'] },
        { name: s('Substitution', 'الاستبدال'), text: s('A short word replaces a word or a clause: one/ones, do, so/not.', 'كلمة قصيرة بتحل محل كلمة أو جملة: one/ones، do، so/not.'),
          ex: ['My phone is old. I need a new one. (one = phone)', 'Do you like tea? I do. (do = like tea)', 'Will it rain? I think so. (so = it will rain)'] },
        { name: s('Ellipsis', 'الحذف'), text: s('Words are left out because the reader can recover them.', 'كلمات بتتشال لأن القارئ يقدر يرجّعها.'),
          ex: ['Ahmed ordered tea and Karim (ordered) coffee.', 'Who broke the window? Youssef (broke it).'] },
        { name: s('Conjunction', 'الوصل'), text: s('Linking words show the relation: addition, contrast, cause or time.', 'أدوات ربط بتوضح العلاقة: إضافة، أو مقابلة، أو سبب، أو زمن.'),
          ex: ['and, moreover (addition)', 'but, however (contrast)', 'because, so, therefore (cause and result)', 'first, then, finally (time)'] },
        { name: s('Lexical cohesion', 'السبك المعجمي'), text: s('Vocabulary ties the text: repetition, a synonym or a more general word, words that go together, opposites.', 'المفردات بتربط النص: تكرار، أو مرادف أو كلمة أعم، أو كلمات بتيجي مع بعض، أو أضداد.'),
          ex: ['I saw a snake. The snake was huge. (repetition)', 'Karim bought a car. The vehicle was cheap. (a more general word)', 'doctor, patient, hospital (words that go together)', 'not long but short (opposites)'] }] },
    { id: 'x-acc', title: s('Acceptability', 'المقبولية'),
      text: s("Acceptability looks at the text from the receiver's side: does the reader or listener accept it as clear, useful and suitable here? The same text can be acceptable in one situation and not in another. Receivers also tolerate small mistakes when the text is useful to them.",
              'المقبولية بتبص للنص من ناحية المتلقي: هل القارئ أو السامع يقبله على إنه واضح ومفيد ومناسب هنا؟ نفس النص ممكن يبقى مقبول في موقف ومش مقبول في موقف تاني. والمتلقي كمان بيتسامح مع الأخطاء الصغيرة لو النص مفيد له.'),
      examples: [
        { context: s('Texting a friend', 'رسالة لصاحبك'), text: 'Coming to the match? Yes! See you at 8.', tags: { acc: true },
          why: s('Short, friendly and clear: exactly right for this receiver.', 'قصير وودود وواضح: مناسب جدًا للمتلقي ده.') },
        { context: s('A formal email to the dean', 'إيميل رسمي لعميد الكلية'), text: 'Hey man, fix my grades ASAP.', tags: { acc: false },
          why: s('It is cohesive and coherent, but the tone does not suit this receiver or situation.', 'متسق ومنسجم، لكن الأسلوب مش مناسب للمتلقي ولا للموقف.') },
        { context: s('A road sign near a school', 'لافتة طريق جنب مدرسة'), text: 'SLOW. SCHOOL.', tags: { acc: true },
          why: s('Not a full sentence, but drivers understand it at once in this place.', 'مش جملة كاملة، لكن السواقين بيفهموها على طول في المكان ده.') },
        { context: s('A job interview: "Tell us about yourself."', 'مقابلة شغل: "احكيلنا عن نفسك."'), text: 'My favourite food is koshari and I hate Mondays.', tags: { acc: false },
          why: s('Connected, but not useful or relevant for the interviewer.', 'كلام مترابط، لكنه مش مفيد ولا له علاقة بالمطلوب في المقابلة.') }],
      remember: s('Cohesion and coherence are about the text. Acceptability is about the receiver and the situation.', 'السبك والحبك عن النص نفسه. المقبولية عن المتلقي والموقف.') },
    { id: 'x-std', title: s('The seven standards of textuality (de Beaugrande and Dressler, 1981)', 'معايير النصية السبعة (دي بوجراند ودريسلر، 1981)'),
      text: s('A text is a text when it meets these seven standards. If one is missing, the text does not communicate (a non-text).', 'النص بيبقى نص لما يحقق المعايير السبعة دي. لو واحد ناقص، النص مش بيوصّل رسالة (لا نص).'),
      items: [
        { name: s('Cohesion', 'السبك'), text: s('the surface links (about the text)', 'الروابط على السطح (عن النص)') },
        { name: s('Coherence', 'الحبك'), text: s('the meaning links (about the text)', 'روابط المعنى (عن النص)') },
        { name: s('Intentionality', 'القصدية'), text: s('the producer means it to be connected and to reach a goal (about the writer or speaker)', 'منتج النص قاصد إنه يكون مترابط ويحقق هدف (عن الكاتب أو المتكلم)') },
        { name: s('Acceptability', 'المقبولية'), text: s('the receiver accepts it as useful and suitable (about the reader or listener)', 'المتلقي بيقبله على إنه مفيد ومناسب (عن القارئ أو السامع)') },
        { name: s('Informativity', 'الإعلامية'), text: s('how new or unexpected the information is', 'قد إيه المعلومة جديدة أو مش متوقعة') },
        { name: s('Situationality', 'المقامية'), text: s('how well it fits the situation', 'قد إيه مناسب للموقف') },
        { name: s('Intertextuality', 'التناص'), text: s('understanding it depends on other texts, like a famous saying', 'فهمه بيعتمد على نصوص تانية، زي مثل مشهور') }],
      remember: s('Memory aid: 2 about the text, 2 about the people, 3 about the setting.', 'للحفظ: 2 عن النص، و2 عن الناس، و3 عن الظروف.') }
  ];
  D.explainNote = s('These explanations and questions were prepared from standard discourse analysis references (Halliday and Hasan, 1976; de Beaugrande and Dressler, 1981), not from your course book. If your lecturer uses different terms, tell us and we will match them.',
                    'الشرح والأسئلة دي متجهزة من المراجع المعروفة في تحليل الخطاب (هاليداي ورقية حسن 1976، ودي بوجراند ودريسلر 1981)، مش من كتاب المادة. لو الدكتور بيستخدم مصطلحات مختلفة، قولنا وهنظبطها.');

  /* ---------- settings ---------- */
  var N = D.qitems.length;
  D.cfg = {
    id: 'disc',
    name: s('Discourse Analysis', 'تحليل الخطاب'),
    short: s('Discourse', 'الخطاب'),
    icon: 'link', art: 'disc',
    desc: s('Cohesion, coherence, acceptability and the standards of textuality, with ' + N + ' practice questions', 'السبك والحبك والمقبولية ومعايير النصية، مع ' + N + ' سؤال تدريب'),
    subNoun: 'concept', parts: null, reading: false,
    termGroups: D.groupOrder, waveCap: 6, flipGoal: 10, flipDeck: 10,
    acts: ['quiz', 'match3', 'speed'],
    vocabTabs: [['mcq', 'vocab.allMcq'], ['defs', 'vocab.defs']],
    exam: { qitems: 30, terms: 0, gaps: 0, written: 0, extras: 0, extraPool: [], all: true, sample: true, adaptive: { total: 20, targeted: 15 },
      desc: {
        1: s('30 multiple-choice questions from every topic: cohesion, cohesive devices, coherence, classifying texts, acceptability and the standards of textuality. It sets your starting point.',
             '30 سؤال اختيار من متعدد من كل المحاور: السبك، وأدوات السبك، والحبك، وتصنيف النصوص، والمقبولية، ومعايير النصية. بيحدد نقطة البداية.'),
        2: s('Aims at your weak spots: 15 of your weakest questions plus 5 general ones (20 questions). Without data yet, it is the same as Exam 1.',
             'بيستهدف نقاط ضعفك: 15 سؤال من أضعف أسئلتك و5 أسئلة عامة (20 سؤال). لو لسه مفيش بيانات بيبقى زي الامتحان 1.'),
        3: s('The final check: a fresh set of 30 questions, avoiding the ones asked in your last exam where possible.',
             'الاختبار النهائي: 30 سؤال جديدة، بنتجنب فيها أسئلة آخر امتحان قدر الإمكان.'),
        4: s('All ' + N + ' questions in one exam, topic by topic. Stop whenever you like with "Finish now": only the questions you answered are marked, and you see how many you got right and wrong.',
             'كل الـ ' + N + ' سؤال في امتحان واحد، محور محور. تقدر توقف في أي وقت بزرار "إنهاء الآن": بيتصحح بس اللي جاوبته، وتشوف عدد الصح والغلط.')
      } },
    text: {
      en: { 'game1.name': 'Game 1: Quick Practice', 'game1.desc': 'Quick questions, matching concepts and a speed round across all topics.',
        'vocab.title': 'All questions and answers', 'vocab.lead': 'Every multiple-choice question with its answer and explanation, and the key concepts.', 'vocab.search': 'Search questions…', 'nav.vocab': 'All answers',
        'learn.lead': 'Understand it first: short explanations with examples, then the topics and the questions.' },
      ar: { 'game1.name': 'اللعبة 1: تدريب سريع', 'game1.desc': 'أسئلة سريعة، وتوصيل المفاهيم، وجولة سرعة في كل المحاور.',
        'vocab.title': 'كل الأسئلة والإجابات', 'vocab.lead': 'كل أسئلة الاختيار من متعدد بإجاباتها وشرحها، والمفاهيم الأساسية.', 'vocab.search': 'ابحث في الأسئلة…', 'nav.vocab': 'كل الإجابات',
        'learn.lead': 'افهم الأول: شرح قصير بالأمثلة، وبعدين المحاور والأسئلة.' }
    }
  };
})();
