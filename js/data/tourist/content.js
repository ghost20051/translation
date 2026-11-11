/*
 * Tourist Translation: definitions, written questions, answer keys, objective questions, resources and lessons.
 * Everything comes from the approved PDFs. Long definitions are summarised.
 * Answer keys are public (this is a static site), like for the UN subject.
 */
(function () {
  var UN = window.UN = window.UN || {};
  var T = UN.T = UN.T || {};
  function s(en, ar) { return { en: en, ar: ar }; }

  /* ---------- definitions (items of kind "sub": name + short definition) ---------- */
  T.subs = [
    { id: 'RD-dom', group: 'defs', name: 'Domestic tourism', def: 'Travelling in your own country, without crossing international borders or entry points' },
    { id: 'RD-int', group: 'defs', name: 'International tourism', def: 'Travelling outside your country, which needs a visa and a passport' },
    { id: 'RD-bus', group: 'defs', name: 'Business tourism', def: 'Travelling to attend meetings, conferences, seminars, exhibitions and trade fairs' },
    { id: 'RD-adv', group: 'defs', name: 'Adventure tourism', def: 'Travelling to seek fresh adventures and activities such as hiking, rafting, climbing and diving' },
    { id: 'RD-wild', group: 'defs', name: 'Wildlife tourism', def: 'Travelling to observe and interact with wildlife, flora and fauna in their natural habitat' },
    { id: 'RD-well', group: 'defs', name: 'Wellness tourism', def: 'Travelling to recover health through physical, spiritual or psychological activities' },
    { id: 'RD-pil', group: 'defs', name: 'Pilgrimage and spiritual tourism', def: 'Travelling to other places for spiritual or religious reasons' },
    { id: 'RD-cul', group: 'defs', name: 'Cultural tourism', def: 'Travelling to learn and take part in local festivals, rituals and cultural activities' },
    { id: 'RE-eti', group: 'etiquette', name: 'Etiquette', def: 'Conventionally accepted rules for formal relations and personal behaviour in polite society' },
    { id: 'RE-dec', group: 'etiquette', name: 'Decorum', def: 'Behaviour that suggests dignity and a sense of what is appropriate for a person of good breeding' },
    { id: 'RE-pro', group: 'etiquette', name: 'Propriety', def: 'Established conventions of morals and good taste' },
    { id: 'RE-cou', group: 'etiquette', name: 'Courtesy', def: 'Behaviour that shows respect to everyone, regardless of position' },
    { id: 'RE-bus', group: 'etiquette', name: 'Business etiquette', def: 'Genderless: men and women are peers in the workplace' },
    { id: 'RE-soc', group: 'etiquette', name: 'Social etiquette', def: 'Traditional chivalrous etiquette, such as holding the door open for a woman' }
  ];

  /* ---------- written questions ---------- */
  T.written = [
    { id: 'RW1', group: 'industry', q: 'What is tourism?' },
    { id: 'RW2', group: 'industry', q: 'Why is tourism important to a country?' },
    { id: 'RW3', group: 'defs', q: 'What is the difference between domestic tourism and international tourism?' },
    { id: 'RW4', group: 'defs', q: 'What is business tourism?' },
    { id: 'RW5', group: 'etiquette', q: 'What is etiquette?' },
    { id: 'RW6', group: 'etiquette', q: 'What is the difference between business etiquette and social etiquette?' },
    { id: 'RW7', group: 'language', q: 'How is the language of tourism described?' },
    { id: 'RW8', group: 'language', q: 'How do the English and Arabic tourism texts differ?' }
  ];

  /* ---------- objective questions (no answers here) ---------- */
  T.bank = {
    mcq: [
      { id: 'RM1', item: 'RW7', text: 'According to Dann (1996), the language of tourism aims to…', opts: { a: 'persuade, lure, woo and seduce', b: 'give only legal information', c: 'criticise the tourist', d: 'teach grammar rules' } },
      { id: 'RM2', item: 'RW8', text: 'Compared with English tourism text, Arabic tourism text tends to be…', opts: { a: 'more formal', b: 'less formal', c: 'much shorter', d: 'free of figures of speech' } },
      { id: 'RM3', item: 'RW7', text: 'A tourist text is described as…', opts: { a: 'hybrid: informative, persuasive and argumentative', b: 'purely legal', c: 'purely poetic', d: 'purely technical' } },
      { id: 'RM4', item: 'RW5', text: 'Etiquette means…', opts: { a: 'conventionally accepted rules for formal relations and personal behaviour in polite society', b: 'the study of languages', c: 'a type of hotel', d: 'a kind of tourist ticket' } },
      { id: 'RM5', item: 'RW6', text: 'Business etiquette is…', opts: { a: 'genderless', b: 'traditionally chivalrous', c: 'only for women', d: 'only for tourists' } },
      { id: 'RM6', item: 'RW3', text: 'Which type of tourism needs a visa and a passport?', opts: { a: 'International tourism', b: 'Domestic tourism', c: 'Both are always the same', d: 'Neither of them' } },
      { id: 'RM7', item: 'RW4', text: 'Business tourism includes…', opts: { a: 'meetings, conferences, seminars, exhibitions and trade fairs', b: 'safaris and swimming with dolphins', c: 'hiking and rafting only', d: 'trips to Hajj and Jerusalem' } },
      { id: 'RM8', item: 'RW2', text: 'Which of these is a benefit of tourism?', opts: { a: 'It is a source of national income and brings in foreign currency', b: 'It lowers the value of the local currency', c: 'It reduces job opportunities', d: 'It stops infrastructure development' } }
    ],
    tf: [
      { id: 'RT1', item: 'RW3', text: 'Domestic tourism does not involve crossing international borders.' },
      { id: 'RT2', item: 'RW3', text: 'International tourism does not need a passport or a visa.' },
      { id: 'RT3', item: 'RW5', text: 'Decorum suggests dignity and a sense of what is appropriate.' },
      { id: 'RT4', item: 'RW6', text: 'Social etiquette is genderless.' },
      { id: 'RT5', item: 'RW8', text: 'English tourism text tends to be more formal than Arabic tourism text.' },
      { id: 'RT6', item: 'RW1', text: 'Tourism can be seen as a leisure activity involving the movement of people to various destinations for a short stay.' },
      { id: 'RT7', item: 'RW2', text: 'Tourism is one of the main sources of national income.' },
      { id: 'RT8', item: 'RW7', text: 'The language of tourism uses adjectives, figurative tropes and emphatic phrases.' }
    ],
    cloze: []
  };

  /* ---------- answer keys ---------- */
  T.keys = {
    mcq: { RM1: 'a', RM2: 'a', RM3: 'a', RM4: 'a', RM5: 'a', RM6: 'a', RM7: 'a', RM8: 'a' },
    tf: { RT1: true, RT2: false, RT3: true, RT4: false, RT5: false, RT6: true, RT7: true, RT8: true },
    cloze: {},
    written: {
      RW1: { model: 'Tourism is the processes, activities and outcomes arising from the relationships and interaction among tourists, tourism suppliers, host governments, host communities and surrounding environments that are involved in attracting and hosting visitors. It can also be seen as a leisure activity involving the movement of people to various destinations for a short-term stay.',
        phrases: [['process', 'activities'], ['tourists'], ['host'], ['visitors', 'attracting'], ['leisure'], ['movement', 'destinations'], ['short']] },
      RW2: { model: 'Tourism is an important source of national income and of foreign (hard) currency. It provides job opportunities, helps raise the value of the local currency and supports the development of infrastructure.',
        phrases: [['income'], ['foreign', 'hard currency', 'currency'], ['job', 'employment'], ['infrastructure', 'development'], ['important', 'main source']] },
      RW3: { model: 'Domestic tourism is travelling in your own country, so tourists do not cross international borders or entry points. International tourism is travelling outside your country and needs a visa and a passport.',
        phrases: [['domestic'], ['own country', 'in your country'], ['border', 'entry point'], ['international'], ['outside'], ['visa'], ['passport']] },
      RW4: { model: 'Business tourism is travelling to attend meetings, officially get together for conferences, seminars, exhibitions and trade fairs. It plays a vital role in the tourism sector.',
        phrases: [['meeting'], ['conference'], ['seminar'], ['exhibition'], ['trade fair'], ['vital', 'important', 'role']] },
      RW5: { model: 'Etiquette means conventionally accepted rules for formal relations and personal behaviour in polite society. It includes the code of ethical behaviour in professional practice among members of a profession in dealing with each other.',
        phrases: [['rules'], ['accepted', 'convention'], ['formal'], ['behaviour', 'behavior'], ['polite society', 'polite'], ['ethical', 'code'], ['profession']] },
      RW6: { model: 'Business etiquette is genderless, because men and women are peers in the workplace. Social etiquette is the traditional chivalrous etiquette, such as holding the door open for a woman.',
        phrases: [['business'], ['genderless'], ['peers', 'equal'], ['social'], ['chivalr'], ['door', 'holding']] },
      RW7: { model: 'The language of tourism aims to persuade, lure, woo and seduce (Dann, 1996). It is featured by the deft use of adjectives, figurative tropes and emphatic phrases. The type and function of a tourist text is hybrid: it can be informative, persuasive and argumentative.',
        phrases: [['persuade'], ['lure'], ['woo'], ['seduce'], ['adjective'], ['figurative', 'trope'], ['emphatic'], ['hybrid'], ['informative'], ['argumentative']] },
      RW8: { model: 'English tourism language tends to be less formal and communicates directly with the reader, whereas Arabic tourism text tends to be formal. Arabic is a literary language rich in rhetorical devices such as metaphors, similes and other figures of speech, used to attract the reader and show the beauty of a place or a thought.',
        phrases: [['english'], ['less formal', 'informal'], ['direct'], ['arabic'], ['formal'], ['literary', 'rhetorical'], ['metaphor'], ['simile'], ['figures of speech', 'figure of speech']] }
    }
  };

  /* ---------- configuration ---------- */
  var subIds = T.subs.map(function (x) { return x.id; });
  T.cfg = {
    id: 'tour',
    name: { en: 'Tourist Translation', ar: 'الترجمة السياحية' },
    short: { en: 'Tourism', ar: 'السياحة' },
    icon: 'globe', art: 'tour',
    desc: { en: 'Tourism, hotels and travel terms, definitions and etiquette', ar: 'مصطلحات السياحة والفنادق والسفر والتعريفات والإتيكيت' },
    subNoun: 'term',
    exam: { terms: 28, written: 4, extras: 8, extraPool: subIds.concat(['RW1', 'RW2', 'RW3', 'RW4', 'RW5', 'RW6', 'RW7', 'RW8']), sample: true, adaptive: { total: 20, targeted: 15 }, fullTotal: 40 },
    flipGoal: 30, flipDeck: 20, termGroups: T.termGroups, bodyGroups: ['hotels', 'places', 'tours', 'food'], bodyKey: 'g1.body2', reading: true, waveCap: 5
  };

  /* ---------- learning-center resources ---------- */
  var ICON = { types: 'globe', transport: 'play-circle', air: 'zap', hotels: 'layout-dashboard', rates: 'bar-chart', booking: 'file-text', food: 'sparkles', places: 'landmark', tours: 'flag', people: 'user', industry: 'trophy', defs: 'book', etiquette: 'star', language: 'languages' };
  var TIP = {
    types: s('Most names are "<type> tourism" = سياحة + the type: learn the second Arabic word.', 'أغلب الأسماء "<النوع> tourism" = سياحة + النوع: ركّز على الكلمة التانية بالعربي.'),
    transport: s('Note that street and track share the same Arabic (سكة).', 'لاحظ إن street وtrack ليهم نفس الكلمة العربي (سكة).'),
    air: s('Many terms start with "air": air + a noun = جوي / الجوية.', 'مصطلحات كتير بتبدأ بـ air: air + اسم = جوي / الجوية.'),
    hotels: s('Learn hotel types together, then the rooms and the staff areas.', 'اتعلّم أنواع الفنادق مع بعض، وبعدين الغرف والأقسام.'),
    rates: s('Plans: EP = room only, AP = room + three meals, B&B = room + breakfast.', 'الخطط: EP = مبيت فقط، AP = مبيت مع ثلاث وجبات، B&B = سكن بإفطار.'),
    booking: s('Booking and reservation both mean حجز.', 'booking وreservation معناهم حجز.'),
    food: s('Learn the three breakfast kinds together: oriental, continental, American.', 'اتعلّم أنواع الإفطار التلاتة مع بعض: شرقي، أوروبي، أمريكي.'),
    places: s('Group them: nature, shopping, entertainment, heritage.', 'قسّمهم: طبيعة، تسوق، ترفيه، تراث.'),
    tours: s('Day visit / day-trip: one day. Conducted tour: with a guide. Escorted tour: with an escort.', 'زيارة/رحلة ليوم واحد. جولة بمرشد. جولة بمرافق.'),
    people: s('Tourist = سائح, traveller = مسافر, passenger = راكب, guest = ضيف / نزيل.', 'tourist = سائح، traveller = مسافر، passenger = راكب، guest = ضيف / نزيل.'),
    industry: s('Seasons: low, out and peak. Agencies: travel, ticket, insurance.', 'المواسم: ركود، خارج الموسم، ذروة. الوكالات: سفر، تذاكر، تأمين.'),
    defs: s('Ask yourself: where does the trip happen and why?', 'اسأل نفسك: الرحلة فين وليه؟'),
    etiquette: s('Etiquette = rules; decorum = dignity; propriety = morals and taste; courtesy = respect.', 'etiquette = قواعد، decorum = وقار، propriety = أخلاق وذوق، courtesy = احترام.'),
    language: s('Remember: persuade, lure, woo, seduce.', 'افتكر: persuade, lure, woo, seduce.')
  };
  T.resources = Object.keys(T.groups).map(function (g) {
    var items = T.terms.filter(function (t) { return t.group === g; }).map(function (t) { return t.id; })
      .concat(T.subs.filter(function (x) { return x.group === g; }).map(function (x) { return x.id; }))
      .concat(T.written.filter(function (x) { return x.group === g; }).map(function (x) { return x.id; }));
    return { id: 'r-' + g, group: g, items: items, title: T.groups[g],
      text: s('Learn these ' + items.length + ' items in "' + T.groups[g].en + '". Use the flip cards and the Memory Lessons, then test yourself.',
              'اتعلّم ' + items.length + ' عنصر في "' + T.groups[g].ar + '". استخدم بطاقات القلب ودروس الحفظ وبعدين اختبر نفسك.'),
      tip: TIP[g], video: null, audio: null };
  });

  /* ---------- Memory Lessons ---------- */
  var L = [];
  // hand-made lessons
  L.push({ id: 'rl-types', res: 'r-defs', icon: 'globe', minutes: 4, title: s('Types of tourism: definitions', 'أنماط السياحة: التعريفات'), steps: [
    { t: 'say', icon: 'globe', text: s('Eight types of tourism. For each one ask: where does the trip happen, and why?', 'تمن أنواع من السياحة. لكل نوع اسأل: الرحلة فين وليه؟') },
    { t: 'compare', cols: [
      { title: s('Domestic tourism', 'السياحة الداخلية'), lines: [s('In your own country', 'جوه بلدك'), s('No border or entry point crossed', 'من غير عبور حدود')] },
      { title: s('International tourism', 'السياحة الدولية'), lines: [s('Outside your country', 'برّه بلدك'), s('Needs a visa and a passport', 'محتاجة تأشيرة وجواز سفر')] }],
      note: s('The difference is crossing borders.', 'الفرق هو عبور الحدود.') },
    { t: 'hook', items: [
      { icon: 'file-text', key: s('Business tourism', 'سياحة الأعمال'), text: s('Meetings, conferences, seminars, exhibitions, trade fairs', 'اجتماعات ومؤتمرات وندوات ومعارض') },
      { icon: 'flame', key: s('Adventure tourism', 'سياحة المغامرات'), text: s('Hiking, rafting, climbing, diving', 'مشي جبلي وتجديف وتسلق وغوص') },
      { icon: 'heart', key: s('Wellness tourism', 'السياحة العلاجية والصحية'), text: s('Recover health: physical, spiritual, psychological', 'استعادة الصحة بأنشطة بدنية وروحية ونفسية') },
      { icon: 'landmark', key: s('Pilgrimage / spiritual tourism', 'السياحة الدينية والروحية'), text: s('Spiritual or religious reasons (Hajj, Jerusalem)', 'لأسباب دينية أو روحية (الحج، القدس)') },
      { icon: 'sparkles', key: s('Cultural tourism', 'السياحة الثقافية'), text: s('Festivals, rituals, local cultural activities', 'مهرجانات وطقوس وأنشطة ثقافية محلية') },
      { icon: 'globe', key: s('Wildlife tourism', 'سياحة الحياة البرية'), text: s('Wildlife, flora and fauna in their natural habitat', 'مشاهدة الحيوانات والنباتات في بيئتها الطبيعية') }] },
    { t: 'subdefs', ids: ['RD-dom', 'RD-int', 'RD-bus', 'RD-adv', 'RD-wild', 'RD-well', 'RD-pil', 'RD-cul'] },
    { t: 'blocks', q: 'RW3', blocks: [
      { label: s('Domestic', 'داخلية'), en: 'Domestic tourism is travelling in your own country, so tourists do not cross international borders or entry points.', ar: 'السياحة الداخلية: جوه البلد من غير عبور حدود' },
      { label: s('International', 'دولية'), en: 'International tourism is travelling outside your country and needs a visa and a passport.', ar: 'السياحة الدولية: برّه البلد وتحتاج تأشيرة وجواز سفر' }] },
    { t: 'blocks', q: 'RW4', blocks: [
      { label: s('What?', 'إيه هي؟'), en: 'Business tourism is travelling to attend meetings, officially get together for conferences, seminars, exhibitions and trade fairs.', ar: 'سفر لحضور اجتماعات ومؤتمرات وندوات ومعارض' },
      { label: s('Role', 'دورها'), en: 'It plays a vital role in the tourism sector.', ar: 'ليها دور حيوي في قطاع السياحة' }] },
    { t: 'check', ids: ['RD-dom', 'RD-int', 'RD-bus', 'RD-adv', 'RD-wild', 'RD-well', 'RD-pil', 'RD-cul'], n: 5 }] });

  L.push({ id: 'rl-etiquette', res: 'r-etiquette', icon: 'star', minutes: 4, title: s('Etiquette', 'آداب السلوك'), steps: [
    { t: 'say', icon: 'star', text: s('Etiquette is about behaving well with others. Four words are easy to mix up.', 'الإتيكيت معناه إزاي تتصرف كويس مع الناس. في أربع كلمات بتتلخبط.') },
    { t: 'hook', items: [
      { icon: 'book-open', key: s('Etiquette', 'Etiquette = آداب السلوك'), text: s('Accepted rules for formal relations and personal behaviour', 'قواعد متعارف عليها للتعامل الرسمي والسلوك الشخصي') },
      { icon: 'star', key: s('Decorum', 'Decorum = الوقار'), text: s('Dignity and a sense of what is appropriate', 'وقار وإحساس بما هو مناسب') },
      { icon: 'lock', key: s('Propriety', 'Propriety = اللياقة'), text: s('Established conventions of morals and good taste', 'أعراف أخلاقية وذوق حسن') },
      { icon: 'thumbs-up', key: s('Courtesy', 'Courtesy = المجاملة'), text: s('Respect to everyone, regardless of position', 'احترام للجميع بغض النظر عن المنصب') }] },
    { t: 'compare', cols: [
      { title: s('Business etiquette', 'إتيكيت العمل'), lines: [s('Genderless', 'من غير تفرقة بين الجنسين'), s('Men and women are peers', 'الرجال والنساء زملاء متساوون')] },
      { title: s('Social etiquette', 'الإتيكيت الاجتماعي'), lines: [s('Traditional and chivalrous', 'تقليدي وفيه شهامة'), s('For example, holding the door open for a woman', 'زي فتح الباب لسيدة')] }],
      note: s('Business = genderless. Social = chivalrous.', 'العمل = من غير تفرقة. الاجتماعي = شهامة.') },
    { t: 'hook', items: [
      { icon: 'check-circle', key: s('Greet others', 'حيّي الناس'), text: s('A smile and a nod, or a formal greeting like "good morning"', 'ابتسامة وإيماءة أو تحية رسمية زي "صباح الخير"') },
      { icon: 'user', key: s('Good posture', 'وقفة سليمة'), text: s('Feet on the floor, back straight, arms not crossed', 'القدمين على الأرض والظهر مستقيم والذراعين غير متشابكتين') },
      { icon: 'alert-circle', key: s('Sneezing or coughing', 'العطس أو الكحة'), text: s('Cover nose and mouth with a handkerchief in the left hand', 'غطّي الأنف والفم بمنديل في اليد الشمال') },
      { icon: 'sparkles', key: s('Fragrance', 'العطر'), text: s('Apply sparingly; strong or cheap fragrance is offensive', 'استخدمه بخفة؛ العطر القوي مزعج') }] },
    { t: 'subdefs', ids: ['RE-eti', 'RE-dec', 'RE-pro', 'RE-cou', 'RE-bus', 'RE-soc'] },
    { t: 'blocks', q: 'RW5', blocks: [
      { label: s('What?', 'إيه هو؟'), en: 'Etiquette means conventionally accepted rules for formal relations and personal behaviour in polite society.', ar: 'قواعد متعارف عليها للتعامل والسلوك' },
      { label: s('Also', 'كمان'), en: 'It includes the code of ethical behaviour in professional practice among members of a profession in dealing with each other.', ar: 'ويشمل ميثاق السلوك المهني بين أفراد المهنة' }] },
    { t: 'blocks', q: 'RW6', blocks: [
      { label: s('Business', 'العمل'), en: 'Business etiquette is genderless, because men and women are peers in the workplace.', ar: 'من غير تفرقة بين الجنسين' },
      { label: s('Social', 'الاجتماعي'), en: 'Social etiquette is the traditional chivalrous etiquette, such as holding the door open for a woman.', ar: 'تقليدي وفيه شهامة' }] },
    { t: 'check', ids: ['RE-eti', 'RE-dec', 'RE-pro', 'RE-cou', 'RE-bus', 'RE-soc', 'RW5', 'RW6'], n: 5 }] });

  L.push({ id: 'rl-language', res: 'r-language', icon: 'languages', minutes: 3, title: s('The language of tourism', 'لغة السياحة'), steps: [
    { t: 'say', icon: 'languages', text: s('Tourist texts are written to attract people. Let us see how.', 'النصوص السياحية بتتكتب علشان تجذب الناس. تعالى نشوف إزاي.') },
    { t: 'letters', items: [
      { k: 'P', key: s('Persuade', 'Persuade = يقنع'), text: s('Dann (1996): the language aims to persuade…', 'دان (1996): اللغة تهدف إلى الإقناع') },
      { k: 'L', key: s('Lure', 'Lure = يغري'), text: s('…lure…', 'يستميل') },
      { k: 'W', key: s('Woo', 'Woo = يستميل'), text: s('…woo…', 'يخطب ودّ القارئ') },
      { k: 'S', key: s('Seduce', 'Seduce = يفتن'), text: s('…and seduce', 'ويأسر القارئ') }] },
    { t: 'hook', items: [
      { icon: 'sparkles', key: s('How it sounds', 'أسلوبها'), text: s('Deft use of adjectives, figurative tropes and emphatic phrases', 'استخدام ماهر للصفات والمجاز والعبارات التوكيدية') },
      { icon: 'layers', key: s('Text type', 'نوع النص'), text: s('Hybrid: informative, persuasive and argumentative (Munoz, 2011)', 'مختلط: معلوماتي وإقناعي وجدلي') }] },
    { t: 'compare', cols: [
      { title: s('English tourism text', 'النص السياحي الإنجليزي'), lines: [s('Less formal', 'أقل رسمية'), s('Direct communication with the reader', 'تواصل مباشر مع القارئ')] },
      { title: s('Arabic tourism text', 'النص السياحي العربي'), lines: [s('More formal', 'أكثر رسمية'), s('Rich in rhetoric: metaphors, similes, figures of speech', 'غني بالبلاغة: استعارات وتشبيهات وصور بيانية')] }],
      note: s('Dickins, Hervey & Higgins (2002).', 'ديكنز وهيرفي وهيجينز (2002).') },
    { t: 'blocks', q: 'RW7', blocks: [
      { label: s('Aim', 'الهدف'), en: 'The language of tourism aims to persuade, lure, woo and seduce (Dann, 1996).', ar: 'الإقناع والإغراء والاستمالة والفتنة' },
      { label: s('Features', 'السمات'), en: 'It is featured by the deft use of adjectives, figurative tropes and emphatic phrases.', ar: 'صفات ومجاز وعبارات توكيدية' },
      { label: s('Text type', 'نوع النص'), en: 'The type and function of a tourist text is hybrid: informative, persuasive and argumentative.', ar: 'نص مختلط الوظائف' }] },
    { t: 'blocks', q: 'RW8', blocks: [
      { label: s('English', 'الإنجليزي'), en: 'English tourism language tends to be less formal and communicates directly with the reader,', ar: 'أقل رسمية وتواصل مباشر' },
      { label: s('Arabic', 'العربي'), en: 'whereas Arabic tourism text tends to be formal. Arabic is a literary language rich in rhetorical devices such as metaphors and similes.', ar: 'أكثر رسمية وغني بالبلاغة' }] },
    { t: 'check', ids: ['RW7', 'RW8'], n: 4 }] });

  L.push({ id: 'rl-tourism', res: 'r-industry', icon: 'trophy', minutes: 3, title: s('What is tourism and why it matters', 'ما هي السياحة ولماذا هي مهمة'), steps: [
    { t: 'say', icon: 'trophy', text: s('Two written answers: what tourism is, and why countries care about it.', 'إجابتين مقاليتين: يعني إيه سياحة، وليه الدول مهتمة بيها.') },
    { t: 'blocks', q: 'RW1', blocks: [
      { label: s('Definition', 'التعريف'), en: 'Tourism is the processes, activities and outcomes arising from the relationships and interaction among tourists, tourism suppliers, host governments, host communities and surrounding environments that are involved in attracting and hosting visitors.', ar: 'العمليات والأنشطة والنتائج الناتجة عن التفاعل بين السياح ومقدمي الخدمات والحكومات والمجتمعات المضيفة' },
      { label: s('Also', 'كمان'), en: 'It can also be seen as a leisure activity involving the movement of people to various destinations for a short-term stay.', ar: 'نشاط ترفيهي لانتقال الناس لوجهات مختلفة لإقامة قصيرة' }] },
    { t: 'blocks', q: 'RW2', blocks: [
      { label: s('Income', 'الدخل'), en: 'Tourism is an important source of national income and of foreign (hard) currency.', ar: 'مصدر مهم للدخل القومي والعملة الأجنبية' },
      { label: s('Jobs', 'الوظائف'), en: 'It provides job opportunities.', ar: 'بتوفر فرص عمل' },
      { label: s('Economy', 'الاقتصاد'), en: 'It helps raise the value of the local currency and supports the development of infrastructure.', ar: 'بترفع قيمة العملة المحلية وبتدعم البنية التحتية' }] },
    { t: 'check', ids: ['RW1', 'RW2'], n: 4 }] });

  // generated lessons: the terms of every category, in chunks
  var CHUNK = 14;
  T.termGroups.forEach(function (g) {
    var ids = T.terms.filter(function (t) { return t.group === g; }).map(function (t) { return t.id; });
    var parts = Math.ceil(ids.length / CHUNK), size = Math.ceil(ids.length / parts);
    for (var k = 0; k < parts; k++) {
      var chunk = ids.slice(k * size, (k + 1) * size), withDef = chunk.filter(function (id) { return T.terms.filter(function (t) { return t.id === id; })[0].def; });
      var half = Math.ceil(chunk.length / 2);
      var steps = [
        { t: 'say', icon: ICON[g], text: s('Let us learn ' + chunk.length + ' terms about "' + T.groups[g].en + '". Say each one out loud, then check yourself.', 'هنتعلّم ' + chunk.length + ' مصطلح عن "' + T.groups[g].ar + '". اقرأ كل مصطلح بصوت عالي وبعدين اختبر نفسك.') },
        { t: 'pairs', ids: chunk.slice(0, half) },
        { t: 'pairs', ids: chunk.slice(half) }
      ];
      if (withDef.length) steps.push({ t: 'defs', ids: withDef });
      steps.push({ t: 'check', ids: chunk, n: Math.min(5, chunk.length) });
      L.push({ id: 'rl-' + g + '-' + (k + 1), res: 'r-' + g, icon: ICON[g], minutes: 3,
        title: s(T.groups[g].en + (parts > 1 ? ' (' + (k + 1) + '/' + parts + ')' : ''), T.groups[g].ar + (parts > 1 ? ' (' + (k + 1) + '/' + parts + ')' : '')), steps: steps });
    }
  });
  T.lessons = L;
  T.parts = {}; T.partsOrder = {};
})();
