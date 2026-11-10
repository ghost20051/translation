/*
 * Simultaneous Interpretation: subject configuration, learning-center resources and Memory Lessons.
 * All content is built from the supplied questions (gaps.js); nothing else is added.
 */
(function () {
  var UN = window.UN = window.UN || {};
  var SI = UN.SI = UN.SI || {};
  function s(en, ar) { return { en: en, ar: ar }; }

  // This subject has no vocabulary terms; the shared engine runs on gaps, essays, multiple choice and key concepts.
  SI.terms = []; SI.confusable = []; SI.parts = {}; SI.partsOrder = {};

  // Answers that would also fit the same blank, so they are never offered together in a multiple-choice question.
  SI.clash = [
    ['input', 'output', 'source', 'target', 'source-language', 'speeches', 'streams', 'language'],
    ['easier', 'longer', 'hinder'],
    ['storage', 'acquisition', 'processes', 'mechanisms', 'variables', 'features', 'dimensions'],
    ['syntactic', 'lexical'],
    ['native', 'english', 'french'],
    ['proficiency', 'performance', 'acquisition'],
    ['evs', 'lag', 'time delay', 'delay', 'decalage'],
    ['units', 'constituents', 'positions'],
    ['bilingual', 'bilinguals', 'balanced', 'dominant']
  ];

  SI.cfg = {
    id: 'si',
    name: { en: 'Simultaneous Interpretation', ar: 'الترجمة الفورية' },
    short: { en: 'SI', ar: 'الفورية' },
    icon: 'headphones', art: 'si',
    desc: { en: 'Fill-in-the-gap, multiple choice and essay answers', ar: 'أسئلة الفراغات والاختيار من متعدد والإجابات المقالية' },
    subNoun: 'concept',
    parts: [{ name: s('Fill in the gap', 'املأ الفراغ') }, { name: s('Multiple choice', 'اختيار من متعدد') }, { name: s('Written questions', 'أسئلة مقالية') }, { name: s('Key concepts', 'مفاهيم أساسية') }, { name: s('MCQ practice', 'تدريب اختيار من متعدد') }],
    exam: { typedGaps: true, plan: { gap: 24, mcq: 12, written: 4 }, terms: 0, written: 4, gaps: 36, extras: 0, extraPool: [], sample: true, adaptive: { total: 20, targeted: 15 }, fullTotal: 40,
      desc: {
        1: s('Three parts, like the real exam: Part 1 fill in the gap, typed (24 questions from every topic), Part 2 multiple choice (12) and Part 3 written questions (4). 40 questions. It sets your starting point.',
             'ثلاثة أجزاء زي الامتحان الحقيقي: الجزء 1 املأ الفراغ بالكتابة (24 سؤالًا من كل المحاور)، الجزء 2 اختيار من متعدد (12)، الجزء 3 أسئلة مقالية (4). 40 سؤالًا. يحدد نقطة البداية.'),
        2: s('Aims at your weak spots: 15 of your weakest questions plus 5 general ones (20 questions). Fill-in-the-gap questions are typed. Without data yet, it is the same as Exam 1.',
             'يستهدف نقاط ضعفك: 15 سؤالًا من أضعف أسئلتك و5 أسئلة عامة (20 سؤالًا). لو لسه مفيش بيانات يبقى زي الامتحان 1.'),
        3: s('The final check: the same three parts with a fresh set of 40 questions, avoiding the ones asked in your last exam where possible.',
             'الاختبار النهائي: نفس الأجزاء التلاتة بـ 40 سؤالًا جديدة، بنتجنب فيها أسئلة آخر امتحان قدر الإمكان.')
      } },
    clash: SI.clash,
    text: {
      en: { 'g1.fill': 'Part 1: MCQ practice', 'g1.fill.d': 'Choose the missing word from 4 options. Practice only: it is not in the exam.', 'g1.gtype': 'Part 1: fill in the gap (test)', 'g1.gtype.d': 'Type the missing word, exactly like in the exam.', 'vocab.part1': 'Part 1: Fill in the gap',
        'game1.name': 'Game 1: Fill the Gap', 'game1.desc': 'Flip cards, matching and quick gap questions across all topics.',
        'vocab.title': 'All questions and answers', 'vocab.lead': 'Every fill-in-the-gap question with its answer, the key concepts and the essay answers.', 'vocab.search': 'Search questions…', 'nav.vocab': 'All answers',
        'learn.lead': 'Go topic by topic: read the completed sentences, then the essay answers and memory tricks.' },
      ar: { 'g1.fill': 'الجزء 1: تدريب اختيار من متعدد', 'g1.fill.d': 'اختر الكلمة الناقصة من 4 إجابات. للتدريب فقط: مش في الامتحان.', 'g1.gtype': 'الجزء 1: املأ الفراغ (اختبار)', 'g1.gtype.d': 'اكتب الكلمة الناقصة بالظبط زي الامتحان.', 'vocab.part1': 'الجزء 1: املأ الفراغ',
        'game1.name': 'اللعبة 1: املأ الفراغ', 'game1.desc': 'بطاقات ومطابقة وأسئلة فراغات سريعة على كل المحاور.',
        'vocab.title': 'كل الأسئلة والإجابات', 'vocab.lead': 'كل أسئلة الفراغات مع إجاباتها، والمفاهيم الأساسية، والإجابات المقالية.', 'vocab.search': 'ابحث في الأسئلة…', 'nav.vocab': 'كل الإجابات',
        'learn.lead': 'ذاكر محور محور: اقرا الجمل كاملة، وبعدين الإجابات المقالية وحيل الحفظ.' }
    },
    flipGoal: 20, flipDeck: 20, flipKind: 'gap', termGroups: SI.groupOrder, acts: ['flip', 'match3', 'speed', 'fill', 'type'],
    bodyGroups: [], bodyKey: 'g1.body', reading: false, waveCap: 5
  };

  /* ---------- learning-center resources: one per topic ---------- */
  var TIP = {
    segm: s('Segmentation = dividing speech into meaningful units. Interpreters understand the meaning first, then translate.', 'التقسيم = تقسيم الكلام لوحدات ليها معنى. المترجم بيفهم المعنى الأول وبعدين يترجم.'),
    study: s('Goldman-Eisler: six professional interpreters, speeches of 3 to 6 minutes. Gerver: French into English, pauses over 0.25 seconds removed.', 'غولدمان-أيزلر: ستة مترجمين محترفين وخطب من 3 لـ 6 دقايق. جيرفر: من الفرنسي للإنجليزي وتم حذف الوقفات اللي أطول من 0.25 ثانية.'),
    time: s('Pauses in the source speech make interpreting easier; unnatural pauses at ungrammatical places hinder it.', 'الوقفات الطبيعية في كلام المتحدث بتسهّل الترجمة، والوقفات غير الطبيعية في أماكن غلط نحويًا بتعطّلها.'),
    evs: s('EVS = ear-voice span = time lag. Interpreting has a longer EVS than shadowing because of the higher cognitive load.', 'EVS = فترة الأذن-الصوت = التأخر الزمني. هي في الترجمة أطول من الترديد (shadowing) بسبب الحمل المعرفي الأكبر.'),
    key: s('Read the ten concepts, then say each one in your own words.', 'اقرا المفاهيم العشرة وبعدين قول كل واحد بأسلوبك.'),
    bil: s('Balanced bilingual = equal proficiency in both languages; dominant = one language is stronger. Interference can happen even with high proficiency.', 'ثنائي اللغة المتوازن = مستوى متساوي في اللغتين، والمهيمن = لغة أقوى من التانية. التداخل ممكن يحصل حتى مع مستوى عالي.')
  };
  var ICON = { segm: 'layers', study: 'file-text', time: 'zap', evs: 'play-circle', bil: 'globe', key: 'star' };
  SI.resources = SI.groupOrder.concat(['key']).map(function (g) {
    var items = SI.gaps.filter(function (x) { return x.group === g; }).map(function (x) { return x.id; })
      .concat(SI.written.filter(function (x) { return x.group === g; }).map(function (x) { return x.id; }))
      .concat(SI.subs.filter(function (x) { return x.group === g; }).map(function (x) { return x.id; }));
    return { id: 'r-' + g, group: g, items: items, title: SI.groups[g],
      text: s('Learn these ' + items.length + ' items in "' + SI.groups[g].en + '". Read each completed sentence, use the flip cards and the Memory Lessons, then test yourself.',
              'اتعلّم ' + items.length + ' عنصر في "' + SI.groups[g].ar + '". اقرا كل جملة كاملة، واستخدم بطاقات القلب ودروس الحفظ وبعدين اختبر نفسك.'),
      tip: TIP[g], video: null, audio: null };
  });

  /* ---------- Memory Lessons: for each topic, read the completed sentences, then a short check ---------- */
  var chunk = function (a, n) { var o = []; for (var i = 0; i < a.length; i += n) o.push(a.slice(i, i + n)); return o; };
  SI.lessons = SI.groupOrder.map(function (g) {
    var ids = SI.gaps.filter(function (x) { return x.group === g; }).map(function (x) { return x.id; });
    var steps = [{ t: 'say', icon: 'lightbulb', text: s('Topic: ' + SI.groups[g].en + '. Read each sentence with its answer, then check yourself.', 'المحور: ' + SI.groups[g].ar + '. اقرا كل جملة مع إجابتها وبعدين اختبر نفسك.') }];
    chunk(ids, 6).forEach(function (c) {
      steps.push({ t: 'gaps', ids: c });
      steps.push({ t: 'check', ids: c, n: Math.min(c.length, 4) });
    });
    var essays = SI.written.filter(function (x) { return x.group === g; }).map(function (x) { return x.id; });
    if (essays.length) steps.splice(steps.length - 1, 0, { t: 'essays', ids: essays });
    return { id: 'sl-' + g, res: 'r-' + g, icon: ICON[g], minutes: 2 + Math.ceil(ids.length / 6) * 2 + Math.ceil(essays.length / 2), title: SI.groups[g], steps: steps };
  });

  // Funny pictures to help remember (memory aids only; the answers always come from the supplied material)
  var FUN = {
    segm: s('Picture the speech as a pizza 🍕. Nobody eats a whole pizza in one bite: you cut it into slices (segmentation) that you can understand and store (chunking).', 'تخيّل الكلام بيتزا 🍕. محدش بياكل بيتزا كاملة في لقمة واحدة: بتقطّعها شرايح (تقسيم) تفهمها وتخزّنها (تجميع).'),
    study: s('Goldman-Eisler: six professional interpreters, like a football team ⚽. Gerver served French fries 🍟 (French) and the students replied in English.', 'غولدمان-أيزلر: ستة مترجمين محترفين زي فريق كورة ⚽. وجيرفر قدّم بطاطس فرنساوي 🍟 (فرنسي) والطلبة ردّوا بالإنجليزي.'),
    time: s('Pauses are traffic lights 🚦. A normal one lets you catch your breath. A red light in the middle of nowhere (an unusual pause) just causes a traffic jam.', 'الوقفات زي إشارات المرور 🚦. العادية بتريّحك. إشارة حمرا في نص الطريق (وقفة غريبة) بتعمل زحمة بس.'),
    evs: s('EVS: your ear texts your mouth "wait, I am still listening!" 📱 Shadowing is a parrot 🦜 that repeats everything, so it takes less brain power than interpreting.', 'EVS: ودنك بتبعت لبقّك "استنى، لسه بسمع!" 📱 والـ shadowing ببغاء 🦜 بيكرر كل حاجة، عشان كده مجهوده أقل من الترجمة.'),
    bil: s('A balanced bilingual juggles both languages evenly 🤹. A dominant one is "right-handed" in one language. Interference is your first language sneaking into the second like a nosy neighbour 🙈.', 'ثنائي اللغة المتوازن بيلعب باللغتين بالتساوي 🤹. والمهيمن "أعسر" في لغة واحدة. والتداخل هو لغتك الأولى بتتسلل للتانية زي الجار الفضولي 🙈.')
  };
  SI.lessons.forEach(function (l) {
    var g = l.id.replace('sl-', '');
    if (FUN[g]) l.steps.splice(1, 0, { t: 'say', icon: 'sparkles', text: FUN[g] });
  });

  // Key concepts lesson (the "important things to memorize" table)
  var KEYAR = [['التزامن', 'الاستماع والكلام في نفس الوقت تقريبًا'], ['فترة الأذن-الصوت', 'الفجوة الزمنية بين السماع والكلام'], ['الترديد', 'ترديد الكلام بنفس اللغة'], ['التقسيم', 'تقسيم الكلام لوحدات ذات معنى'], ['التجميع (chunking)', 'بيساعد في تخزين الذاكرة'], ['ثنائي اللغة المتوازن', 'مستوى متساوي في اللغتين'], ['ثنائي اللغة المهيمن', 'أقوى في لغة واحدة'], ['تداخل اللغات', 'لغة بتأثر على اللغة التانية'], ['الحمل المعرفي', 'الجهد الذهني'], ['علم اللغة النفسي', 'اللغة والعقل']];
  var FUNKEY = [
    s('Two people talking at once at the family dinner 🍽️', 'اتنين بيتكلموا في نفس الوقت على غدا العيلة 🍽️'),
    s('Your ear texts your mouth and waits for the reply 📱', 'ودنك بتبعت لبقّك وبتستنى الرد 📱'),
    s('Your shadow copies you without thinking 🦜', 'ظلّك بيقلّدك من غير تفكير 🦜'),
    s('Cutting a pizza into slices 🍕', 'تقطيع البيتزا شرايح 🍕'),
    s('Chunks of chocolate: bite-size and easy to store 🍫', 'قطع شوكولاتة: لقمة صغيرة وسهلة التخزين 🍫'),
    s('Juggling two balls evenly 🤹', 'بتلعب بكورتين بالتساوي 🤹'),
    s('Right-handed in one language ✍️', 'بتكتب باليمين في لغة واحدة ✍️'),
    s('Your first language sneaking in like a nosy neighbour 🙈', 'لغتك الأولى بتتسلل زي الجار الفضولي 🙈'),
    s('A backpack that gets heavier with every task 🎒', 'شنطة بتتقل مع كل مهمة 🎒'),
    s('Language on the therapist\'s couch: language + mind 🛋️', 'اللغة عند الدكتور النفسي: لغة + عقل 🛋️')
  ];
  var KEYICON = ['clock', 'play-circle', 'repeat', 'layers', 'lightbulb', 'star', 'flame', 'globe', 'zap', 'book-open'];
  SI.lessons.push({ id: 'sl-key', res: 'r-key', icon: 'star', minutes: 5, title: SI.groups.key, steps: [
    { t: 'say', icon: 'star', text: s('Ten concepts to know before the exam. Say each one in your own words.', 'عشر مفاهيم لازم تعرفهم قبل الامتحان. قول كل واحد بأسلوبك.') },
    { t: 'hook', items: SI.subs.map(function (x, i) { return { icon: KEYICON[i], key: s(x.name, x.name + ' = ' + KEYAR[i][0]), text: s(x.def, KEYAR[i][1]) }; }) },
    { t: 'hook', items: SI.subs.map(function (x, i) { return { icon: 'sparkles', key: s(x.name, x.name), text: FUNKEY[i] }; }) },
    { t: 'check', ids: SI.subs.map(function (x) { return x.id; }), n: 5 }] });
})();
