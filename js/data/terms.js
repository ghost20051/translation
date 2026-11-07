/* Academic content: the 20 approved terms. Classic script (works from file://). */
(function () {
  var UN = window.UN = window.UN || {};

  UN.groups = {
    organs:          { en: 'Principal organs',            ar: 'الأجهزة الرئيسية' },
    sgoffice:        { en: "Secretary-General's office",  ar: 'مكتب الأمين العام' },
    offices:         { en: 'Offices and units',           ar: 'المكاتب والوحدات' },
    docs:            { en: 'Documents and roles',         ar: 'الوثائق والأدوار' },
    translation:     { en: 'Translation terms',           ar: 'مصطلحات الترجمة' },
    knowledge:       { en: 'The UN and UN translation',   ar: 'الأمم المتحدة وترجمتها' },
    characteristics: { en: 'Characteristics of UN translation', ar: 'خصائص الترجمة في الأمم المتحدة' },
    cvresume:        { en: 'CV and resume',               ar: 'السيرة الذاتية (CV) والريزيومي' }
  };

  // Sets of terms that are easy to confuse. Used to choose plausible distractors.
  UN.confusable = [
    ['T4', 'T5', 'T6', 'T7'],
    ['T8', 'T9', 'T10'],
    ['T1', 'T2', 'T17', 'T18', 'T3'],
    ['T12', 'T14', 'T15', 'T16', 'T19', 'T20']
  ];

  UN.terms = [
    { id: 'T1',  en: 'General Assembly', ar: ['الجمعية العمومية'], group: 'organs' },
    { id: 'T2',  en: 'Security Council', ar: ['مجلس الأمن'], group: 'organs' },
    { id: 'T3',  en: 'Secretariat', ar: ['الأمانة العامة', 'أمانة الأمم المتحدة'], group: 'organs' },
    { id: 'T4',  en: 'Office of the Secretary-General', ar: ['مكتب الأمين العام'], group: 'sgoffice' },
    { id: 'T5',  en: 'Deputy Secretary-General', ar: ['نائب الأمين العام'], group: 'sgoffice' },
    { id: 'T6',  en: 'UN Secretary-General', enAlt: ['Secretary-General', 'United Nations Secretary-General'], ar: ['الأمين العام للأمم المتحدة'], group: 'sgoffice' },
    { id: 'T7',  en: 'Executive Assistants to the Secretary-General', ar: ['المساعدون التنفيذيون للأمين العام'], group: 'sgoffice' },
    { id: 'T8',  en: 'Office for External Relations', ar: ['مكتب العلاقات الخارجية'], group: 'offices' },
    { id: 'T9',  en: 'Office for Development Financing', ar: ['مكتب التمويل الإنمائي'], group: 'offices' },
    { id: 'T10', en: 'Administrative Unit', ar: ['الوحدة الإدارية'], group: 'offices' },
    { id: 'T11', en: 'Speech Writer', enAlt: ['Speechwriter'], ar: ['كاتب الخطاب'], group: 'docs' },
    { id: 'T12', en: 'Correspondence', ar: ['مراسلات'], group: 'docs' },
    { id: 'T13', en: 'Omission', ar: ['إسقاط'], group: 'translation' },
    { id: 'T14', en: 'Working Paper', ar: ['ورقة عمل'], group: 'docs' },
    { id: 'T15', en: 'Resolutions', enAlt: ['Resolution'], ar: ['قرارات'], group: 'docs' },
    { id: 'T16', en: 'Document Control', ar: ['مراقبة الوثائق'], group: 'docs' },
    { id: 'T17', en: 'Trusteeship Council', ar: ['مجلس الوصاية'], group: 'organs' },
    { id: 'T18', en: 'Economic and Social Council', ar: ['المجلس الاقتصادي والاجتماعي'], group: 'organs' },
    { id: 'T19', en: 'Document Symbols', ar: ['رموز الوثائق'], group: 'docs' },
    { id: 'T20', en: 'Evaluation Sheet', ar: ['نموذج التقييم'], group: 'docs' }
  ];

  UN.terms.forEach(function (t) { t.arShow = t.ar.join(' / '); t.kind = 'term'; });
})();
