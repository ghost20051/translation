/*
 * Learning-center resources. Text comes only from the approved material.
 * To add a video or audio file: copy it into media/video or media/audio and set
 * `video` / `audio` below (for example video: 'media/video/organs.mp4').
 * With no file set, the written explanation is shown instead.
 * Egyptian Arabic explanations are planned for a later phase and need review before they are added.
 */
(function () {
  var UN = window.UN = window.UN || {};
  UN.resources = [
    { id: 'r-organs', group: 'organs', items: ['T1', 'T2', 'T3', 'T17', 'T18'],
      title: { en: 'Principal organs', ar: 'الأجهزة الرئيسية' },
      text: { en: 'Learn these five names as one family: General Assembly, Security Council, Secretariat, Trusteeship Council and Economic and Social Council. Each English name has one Arabic equivalent; the Secretariat has two accepted forms.',
              ar: 'تعلّم هذه الأسماء الخمسة كمجموعة واحدة: الجمعية العمومية، مجلس الأمن، الأمانة العامة، مجلس الوصاية، المجلس الاقتصادي والاجتماعي. لكل اسم إنجليزي مقابل عربي واحد، وللأمانة العامة صيغتان مقبولتان.' },
      tip: { en: 'Do not mix up Trusteeship Council (الوصاية) with Economic and Social Council (الاقتصادي والاجتماعي).',
             ar: 'لا تخلط بين مجلس الوصاية والمجلس الاقتصادي والاجتماعي.' },
      video: null, audio: null },
    { id: 'r-sgoffice', group: 'sgoffice', items: ['T4', 'T5', 'T6', 'T7'],
      title: { en: "Secretary-General's office", ar: 'مكتب الأمين العام' },
      text: { en: 'Four names around the Secretary-General: the Office of the Secretary-General, the Deputy Secretary-General, the UN Secretary-General and the Executive Assistants to the Secretary-General.',
              ar: 'أربعة مصطلحات حول الأمين العام: مكتب الأمين العام، نائب الأمين العام، الأمين العام للأمم المتحدة، والمساعدون التنفيذيون للأمين العام.' },
      tip: { en: 'Deputy = نائب. Executive Assistants = المساعدون التنفيذيون (plural). Office = مكتب.',
             ar: 'Deputy = نائب، وExecutive Assistants = المساعدون التنفيذيون (جمع)، وOffice = مكتب.' },
      video: null, audio: null },
    { id: 'r-offices', group: 'offices', items: ['T8', 'T9', 'T10'],
      title: { en: 'Offices and units', ar: 'المكاتب والوحدات' },
      text: { en: 'Office for External Relations, Office for Development Financing and Administrative Unit.',
              ar: 'مكتب العلاقات الخارجية، مكتب التمويل الإنمائي، الوحدة الإدارية.' },
      tip: { en: 'External = الخارجية. Development Financing = التمويل الإنمائي. Administrative = الإدارية.',
             ar: 'External = الخارجية، وDevelopment Financing = التمويل الإنمائي، وAdministrative = الإدارية.' },
      video: null, audio: null },
    { id: 'r-docs', group: 'docs', items: ['T11', 'T12', 'T14', 'T15', 'T16', 'T19', 'T20'],
      title: { en: 'Documents and roles', ar: 'الوثائق والأدوار' },
      text: { en: 'Speech Writer, Correspondence, Working Paper, Resolutions, Document Control, Document Symbols and Evaluation Sheet.',
              ar: 'كاتب الخطاب، مراسلات، ورقة عمل، قرارات، مراقبة الوثائق، رموز الوثائق، نموذج التقييم.' },
      tip: { en: 'Three terms contain "Document": Document Control (مراقبة), Document Symbols (رموز), and Evaluation Sheet is the form (نموذج).',
             ar: 'مصطلحان يحتويان على "Document": Document Control (مراقبة الوثائق) وDocument Symbols (رموز الوثائق).' },
      video: null, audio: null },
    { id: 'r-translation', group: 'translation', items: ['T13'],
      title: { en: 'Translation terms', ar: 'مصطلحات الترجمة' },
      text: { en: 'Omission = إسقاط.', ar: 'Omission = إسقاط.' },
      tip: { en: 'Link the sound: Omission → إسقاط (something is dropped).', ar: 'اربط المعنى: Omission → إسقاط (شيء يسقط).' },
      video: null, audio: null },
    { id: 'r-knowledge', group: 'knowledge', items: ['W1', 'W2', 'W5'],
      title: { en: 'The UN and UN translation', ar: 'الأمم المتحدة وترجمتها' },
      text: { en: 'UN translation is translating official UN documents from one language into another while keeping the original meaning accurate. The UN (United Nations) was founded in 1945 to maintain peace, protect human rights, promote development and encourage cooperation between countries.',
              ar: 'الترجمة في الأمم المتحدة هي ترجمة وثائق الأمم المتحدة الرسمية من لغة إلى أخرى مع الحفاظ على دقة المعنى الأصلي. تأسست الأمم المتحدة عام 1945 للحفاظ على السلام وحماية حقوق الإنسان وتعزيز التنمية وتشجيع التعاون بين الدول.' },
      tip: { en: 'Four aims to remember: peace, human rights, development, cooperation.', ar: 'أربعة أهداف: السلام، حقوق الإنسان، التنمية، التعاون.' },
      video: null, audio: null },
    { id: 'r-chars', group: 'characteristics', items: ['W3', 'W3-acc', 'W3-cla', 'W3-obj', 'W3-con', 'W3-neu', 'W3-cnf'],
      title: { en: 'Six characteristics of UN translation', ar: 'الخصائص الست للترجمة في الأمم المتحدة' },
      text: { en: 'Accuracy, Clarity, Objectivity, Consistency, Neutrality, Confidentiality.',
              ar: 'الدقة، الوضوح، الموضوعية، الاتساق، الحياد، السرية.' },
      tip: { en: 'Memory aid from the first letters: A-C-O-C-N-C. Objectivity (no personal opinions) and Neutrality (no biased or emotional language) are the pair people mix up.',
             ar: 'للحفظ: الحروف الأولى A-C-O-C-N-C. الموضوعية (بلا آراء شخصية) والحياد (بلا لغة متحيزة أو عاطفية) أكثر ما يتم الخلط بينهما.' },
      video: null, audio: null },
    { id: 'r-cv', group: 'cvresume', items: ['W4'],
      title: { en: 'CV or resume?', ar: 'السيرة الذاتية (CV) أم الريزيومي؟' },
      text: { en: 'CV: detailed, with education, qualifications, skills and work experience. Resume: short, highlighting the skills and experience most relevant to a specific job.',
              ar: 'الـ CV وثيقة مفصلة تشمل التعليم والمؤهلات والمهارات والخبرة العملية. أما الـ Resume فوثيقة قصيرة تبرز المهارات والخبرات الأكثر صلة بوظيفة محددة.' },
      tip: { en: 'CV = Complete and detailed. Resume = Really short and focused.', ar: 'CV = مفصّل وكامل. Resume = قصير ومركّز.' },
      video: null, audio: null }
  ];
})();
