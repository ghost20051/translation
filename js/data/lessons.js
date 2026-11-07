/*
 * Memory Lessons: step-by-step visual lessons built only from the approved material.
 * Every text has { en, ar }. The Arabic is written for Egyptian students (simple, spoken style);
 * it is a teaching aid and is shown only in learning pages, never during exams.
 *
 * Step types:
 *   say     { icon, text }                      a teacher bubble
 *   split   { ids:[term ids] }                  each term broken into word pairs (same colour = same meaning)
 *   hook    { items:[{icon, key, text}] }       a memory hook per word
 *   compare { cols:[{title, lines:[...]}], note }   easily-confused things side by side
 *   letters { items:[{k, key, text}], warn }    first-letter memory aid
 *   blocks  { q, blocks:[{label, en, ar}] }     build an answer piece by piece, then show the model answer
 *   check   { ids:[item ids], n }               quick questions with instant feedback
 */
(function () {
  var UN = window.UN = window.UN || {};

  // word-level breakdown of each term: [English word(s), Arabic word(s)]
  UN.parts = {
    T1: [['General', 'العمومية'], ['Assembly', 'الجمعية']],
    T2: [['Security', 'الأمن'], ['Council', 'مجلس']],
    T3: [['Secretariat', 'الأمانة العامة']],
    T4: [['Office', 'مكتب'], ['of the Secretary-General', 'الأمين العام']],
    T5: [['Deputy', 'نائب'], ['Secretary-General', 'الأمين العام']],
    T6: [['UN', 'للأمم المتحدة'], ['Secretary-General', 'الأمين العام']],
    T7: [['Executive Assistants', 'المساعدون التنفيذيون'], ['to the Secretary-General', 'للأمين العام']],
    T8: [['Office', 'مكتب'], ['for External Relations', 'العلاقات الخارجية']],
    T9: [['Office', 'مكتب'], ['for Development Financing', 'التمويل الإنمائي']],
    T10: [['Administrative', 'الإدارية'], ['Unit', 'الوحدة']],
    T11: [['Speech', 'الخطاب'], ['Writer', 'كاتب']],
    T12: [['Correspondence', 'مراسلات']],
    T13: [['Omission', 'إسقاط']],
    T14: [['Working', 'عمل'], ['Paper', 'ورقة']],
    T15: [['Resolutions', 'قرارات']],
    T16: [['Document', 'الوثائق'], ['Control', 'مراقبة']],
    T17: [['Trusteeship', 'الوصاية'], ['Council', 'مجلس']],
    T18: [['Economic', 'الاقتصادي'], ['and', 'و'], ['Social', 'الاجتماعي'], ['Council', 'المجلس']],
    T19: [['Document', 'الوثائق'], ['Symbols', 'رموز']],
    T20: [['Evaluation', 'التقييم'], ['Sheet', 'نموذج']]
  };

  // reading order of the Arabic chips (indexes into UN.parts), checked against the approved Arabic terms
  UN.partsOrder = { T1: [1, 0], T2: [1, 0], T3: [0], T4: [0, 1], T5: [0, 1], T6: [1, 0], T7: [0, 1], T8: [0, 1], T9: [0, 1], T10: [1, 0], T11: [1, 0], T12: [0], T13: [0], T14: [1, 0], T15: [0], T16: [1, 0], T17: [1, 0], T18: [3, 0, 1, 2], T19: [1, 0], T20: [1, 0] };

  function s(en, ar) { return { en: en, ar: ar }; }

  UN.lessons = [
    { id: 'r-organs', icon: 'landmark', minutes: 3, title: s('Principal organs', 'الأجهزة الرئيسية'), steps: [
      { t: 'say', icon: 'landmark', text: s('Five names, one family. Let\'s learn how to remember them.', 'خمس أسامي في عيلة واحدة. تعالَ نشوف إزاي نحفظهم بسهولة.') },
      { t: 'split', ids: ['T1', 'T2', 'T17', 'T18', 'T3'], text: s('Break each name into small words. The same colour means the same meaning.', 'فكّك كل اسم لكلمات صغيرة، والكلمة ومقابلها ليهم نفس اللون.') },
      { t: 'say', icon: 'lightbulb', text: s('Rule: "Council" is always مجلس, and "Assembly" is الجمعية.', 'القاعدة: كلمة Council دايمًا معناها مجلس، وكلمة Assembly معناها الجمعية.') },
      { t: 'compare', cols: [
        { title: s('Trusteeship Council', 'مجلس الوصاية'), lines: [s('"Trust" is inside the word', 'كلمة Trust جوّه الاسم'), s('Trust → وصاية (someone is trusted to look after)', 'Trust → وصاية (حد اتأمّن يرعى)')] },
        { title: s('Economic and Social Council', 'المجلس الاقتصادي والاجتماعي'), lines: [s('Two words joined by "and"', 'كلمتين بينهم "و"'), s('Economic + Social → اقتصادي + اجتماعي', 'Economic + Social → اقتصادي + اجتماعي')] }],
        note: s('Two different councils. Do not swap them.', 'دول مجلسين مختلفين. متبدّلهمش ببعض.') },
      { t: 'say', icon: 'check-circle', text: s('The Secretariat has two accepted Arabic names: الأمانة العامة or أمانة الأمم المتحدة. Either one is correct.', 'الـ Secretariat ليها اسمين مقبولين: الأمانة العامة، أو أمانة الأمم المتحدة. أي واحد فيهم صح.') },
      { t: 'check', ids: ['T1', 'T2', 'T3', 'T17', 'T18'], n: 4 }] },

    { id: 'r-sgoffice', icon: 'user', minutes: 3, title: s("Secretary-General's office", 'مكتب الأمين العام'), steps: [
      { t: 'say', icon: 'user', text: s('Four terms around the Secretary-General. We will give each one a hook.', 'حوالين الأمين العام عندنا أربع مصطلحات. هنحط لكل واحد علامة تفكّرك بيه.') },
      { t: 'split', ids: ['T4', 'T5', 'T6', 'T7'], text: s('Same colour = same meaning. Notice the Secretary-General part repeats.', 'نفس اللون = نفس المعنى. لاحظ إن جزء الأمين العام بيتكرر.') },
      { t: 'hook', items: [
        { icon: 'layout-dashboard', key: s('Office', 'Office = مكتب'), text: s('The place or department', 'المكان أو الإدارة') },
        { icon: 'user', key: s('Deputy', 'Deputy = نائب'), text: s('The one next to the Secretary-General', 'اللي جنب الأمين العام') },
        { icon: 'star', key: s('Secretary-General', 'Secretary-General = الأمين العام'), text: s('The main person', 'الشخص الأساسي') },
        { icon: 'layers', key: s('Executive Assistants', 'Executive Assistants = المساعدون التنفيذيون'), text: s('Plural: more than one helper', 'جمع: أكتر من مساعد') }] },
      { t: 'check', ids: ['T4', 'T5', 'T6', 'T7'], n: 4 }] },

    { id: 'r-offices', icon: 'layers', minutes: 2, title: s('Offices and units', 'المكاتب والوحدات'), steps: [
      { t: 'say', icon: 'layers', text: s('Three terms that look alike. The only difference is the second part.', 'تلات مصطلحات شبه بعض. الفرق كله في الجزء التاني.') },
      { t: 'split', ids: ['T8', 'T9', 'T10'], text: s('Break them down. Same colour = same meaning.', 'فكّكهم. نفس اللون = نفس المعنى.') },
      { t: 'hook', items: [
        { icon: 'globe', key: s('External', 'External = الخارجية'), text: s('Outside, dealing with others', 'برّه، بيتعامل مع الغير') },
        { icon: 'trending-up', key: s('Development', 'Development = الإنمائي'), text: s('Growth and building', 'نمو وبناء') },
        { icon: 'bar-chart', key: s('Financing', 'Financing = التمويل'), text: s('Money', 'فلوس') },
        { icon: 'layers', key: s('Administrative Unit', 'Administrative Unit = الوحدة الإدارية'), text: s('Organising the work inside', 'تنظيم الشغل جوّه') }] },
      { t: 'check', ids: ['T8', 'T9', 'T10'], n: 3 }] },

    { id: 'r-docs', icon: 'file-text', minutes: 4, title: s('Documents and roles', 'الوثائق والأدوار'), steps: [
      { t: 'say', icon: 'file-text', text: s('Seven terms about documents and who works on them.', 'سبع مصطلحات عن الوثائق واللي بيشتغل عليها.') },
      { t: 'split', ids: ['T11', 'T14', 'T16', 'T19', 'T20', 'T12', 'T15'], text: s('Same colour = same meaning.', 'نفس اللون = نفس المعنى.') },
      { t: 'hook', items: [
        { icon: 'pencil', key: s('Working Paper', 'Working Paper = ورقة عمل'), text: s('A paper you work on, word for word', 'ورقة بتشتغل عليها، الترجمة حرفية') },
        { icon: 'file-text', key: s('Correspondence', 'Correspondence = مراسلات'), text: s('Letters going back and forth', 'جوابات رايحة جاية') },
        { icon: 'check-circle', key: s('Resolutions', 'Resolutions = قرارات'), text: s('Decisions, plural', 'قرارات، جمع') },
        { icon: 'pencil', key: s('Speech Writer', 'Speech Writer = كاتب الخطاب'), text: s('Writer of the speech', 'اللي بيكتب الخطاب') }] },
      { t: 'compare', cols: [
        { title: s('Document Control', 'مراقبة الوثائق'), lines: [s('Control = مراقبة', 'Control = مراقبة')] },
        { title: s('Document Symbols', 'رموز الوثائق'), lines: [s('Symbols = رموز', 'Symbols = رموز')] },
        { title: s('Evaluation Sheet', 'نموذج التقييم'), lines: [s('Sheet = نموذج, Evaluation = التقييم', 'Sheet = نموذج، وEvaluation = التقييم')] }],
        note: s('Look at the second word to tell them apart.', 'بُص على الكلمة التانية علشان تفرّق بينهم.') },
      { t: 'check', ids: ['T11', 'T12', 'T14', 'T15', 'T16', 'T19', 'T20'], n: 5 }] },

    { id: 'r-translation', icon: 'languages', minutes: 1, title: s('Translation term', 'مصطلح ترجمة'), steps: [
      { t: 'say', icon: 'languages', text: s('One translation term: Omission = إسقاط.', 'مصطلح واحد في الترجمة: Omission = إسقاط.') },
      { t: 'hook', items: [{ icon: 'x-circle', key: s('Omission', 'Omission = إسقاط'), text: s('Something from the original text is dropped, and the word إسقاط means dropping.', 'حاجة من النص الأصلي بتتشال، وكلمة إسقاط معناها إنها بتسقط.') }] },
      { t: 'check', ids: ['T13'], n: 2 }] },

    { id: 'r-knowledge', icon: 'globe', minutes: 4, title: s('The UN and UN translation', 'الأمم المتحدة وترجمتها'), steps: [
      { t: 'say', icon: 'globe', text: s('Three written questions. We will build each answer from small pieces.', 'تلات أسئلة مقالية. هنبني كل إجابة من حتت صغيرة.') },
      { t: 'blocks', q: 'W1', blocks: [
        { label: s('What?', 'إيه هي؟'), en: 'UN translation is the process of translating official United Nations documents', ar: 'ترجمة وثائق الأمم المتحدة الرسمية' },
        { label: s('How?', 'إزاي؟'), en: 'from one language into another', ar: 'من لغة للغة تانية' },
        { label: s('Condition', 'الشرط'), en: 'while keeping the original meaning accurate.', ar: 'مع الحفاظ على دقة المعنى الأصلي' }] },
      { t: 'blocks', q: 'W2', blocks: [
        { label: s('What?', 'إيه هي؟'), en: 'The United Nations is an international organization', ar: 'منظمة دولية' },
        { label: s('When?', 'إمتى؟'), en: 'founded in 1945.', ar: 'اتأسست سنة 1945' },
        { label: s('Aims (4)', 'الأهداف (4)'), en: 'It works to maintain peace, protect human rights, promote development, and encourage cooperation between countries.', ar: 'سلام، حقوق إنسان، تنمية، تعاون' }] },
      { t: 'blocks', q: 'W5', blocks: [
        { label: s('Stands for', 'اختصار'), en: 'UN stands for United Nations.', ar: 'UN اختصار United Nations' },
        { label: s('What?', 'إيه هي؟'), en: 'It is an international organization where countries work together', ar: 'منظمة دولية الدول بتتعاون فيها' },
        { label: s('Why?', 'ليه؟'), en: 'to solve global problems and maintain international peace and security.', ar: 'علشان تحل المشاكل العالمية وتحافظ على السلام والأمن الدولي' }] },
      { t: 'check', ids: ['W1', 'W2', 'W5'], n: 4 }] },

    { id: 'r-chars', icon: 'target', minutes: 4, title: s('Six characteristics', 'الخصائص الست'), steps: [
      { t: 'say', icon: 'target', text: s('Six characteristics of UN translation. First, a memory aid from the first letters: A-C-O-C-N-C.', 'ست خصائص للترجمة في الأمم المتحدة. الأول، حيلة للحفظ من الحروف الأولى: A-C-O-C-N-C.') },
      { t: 'letters', items: [
        { k: 'A', key: s('Accuracy', 'Accuracy = الدقة'), text: s('Keeping the original meaning', 'تحافظ على المعنى الأصلي') },
        { k: 'C', key: s('Clarity', 'Clarity = الوضوح'), text: s('Clear and understandable language', 'لغة واضحة ومفهومة') },
        { k: 'O', key: s('Objectivity', 'Objectivity = الموضوعية'), text: s('Avoiding personal opinions', 'من غير آراء شخصية') },
        { k: 'C', key: s('Consistency', 'Consistency = الاتساق'), text: s('Same terms throughout documents', 'نفس المصطلحات في كل الوثائق') },
        { k: 'N', key: s('Neutrality', 'Neutrality = الحياد'), text: s('Avoiding biased or emotional language', 'من غير لغة متحيّزة أو عاطفية') },
        { k: 'C', key: s('Confidentiality', 'Confidentiality = السرية'), text: s('Protecting sensitive information', 'حماية المعلومات الحساسة') }] },
      { t: 'compare', cols: [
        { title: s('Objectivity', 'الموضوعية'), lines: [s('About your opinions', 'بتخص آراءك إنت'), s('Avoid personal opinions', 'متحطش رأيك الشخصي')] },
        { title: s('Neutrality', 'الحياد'), lines: [s('About the style of the words', 'بتخص أسلوب الكلام'), s('Avoid biased or emotional language', 'متستخدمش لغة متحيّزة أو عاطفية')] }],
        note: s('The pair people mix up most. Opinion vs. biased or emotional wording.', 'أكتر اتنين بيتلخبطوا. الرأي جنب اللغة المتحيّزة أو العاطفية.') },
      { t: 'blocks', q: 'W3', blocks: [
        { label: s('1-2', '١-٢'), en: 'Accuracy: Keeping the original meaning. Clarity: Using clear and understandable language.', ar: 'الدقة والوضوح' },
        { label: s('3-4', '٣-٤'), en: 'Objectivity: Avoiding personal opinions. Consistency: Using the same terms throughout documents.', ar: 'الموضوعية والاتساق' },
        { label: s('5-6', '٥-٦'), en: 'Neutrality: Avoiding biased or emotional language. Confidentiality: Protecting sensitive information.', ar: 'الحياد والسرية' }] },
      { t: 'check', ids: ['W3-acc', 'W3-cla', 'W3-obj', 'W3-con', 'W3-neu', 'W3-cnf'], n: 5 }] },

    { id: 'r-cv', icon: 'file-text', minutes: 2, title: s('CV or resume?', 'CV ولا Resume؟'), steps: [
      { t: 'say', icon: 'file-text', text: s('Two documents that look alike. One word each will keep them apart.', 'وثيقتين شبه بعض. كلمة واحدة لكل واحدة هتفرّق بينهم.') },
      { t: 'compare', cols: [
        { title: s('CV', 'CV'), lines: [s('Complete and detailed', 'كامل ومفصّل'), s('Education, qualifications, skills, work experience', 'التعليم والمؤهلات والمهارات والخبرة العملية')] },
        { title: s('Resume', 'Resume'), lines: [s('Really short and focused', 'قصير ومركّز'), s('Most relevant skills and experience for a specific job', 'المهارات والخبرات الأنسب لوظيفة معينة')] }],
        note: s('CV = Complete. Resume = Really short.', 'CV = كامل. Resume = قصير ومركّز.') },
      { t: 'blocks', q: 'W4', blocks: [
        { label: s('CV', 'CV'), en: 'CV: A detailed document that includes your education, qualifications, skills, and work experience.', ar: 'وثيقة مفصّلة' },
        { label: s('Resume', 'Resume'), en: 'Resume: A short document that highlights your most relevant skills and experience for a specific job.', ar: 'وثيقة قصيرة' }] },
      { t: 'check', ids: ['W4'], n: 3 }] }
  ];
})();
