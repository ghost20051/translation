/* Question bank. Contains NO answers: correct answers live in answer-keys.js. */
(function () {
  var UN = window.UN = window.UN || {};

  UN.written = [
    { id: 'W1', group: 'knowledge',       q: "What's UN Translation?" },
    { id: 'W2', group: 'knowledge',       q: 'What do you know about the UN?' },
    { id: 'W3', group: 'characteristics', q: 'What are the characteristics of UN Translation?' },
    { id: 'W4', group: 'cvresume',        q: "What's the difference between a CV and a Resume?" },
    { id: 'W5', group: 'knowledge',       q: "What's the UN?" }
  ];

  // The six characteristics (written question 3). Each is its own tracked item.
  UN.subs = [
    { id: 'W3-acc', name: 'Accuracy',        def: 'Keeping the original meaning' },
    { id: 'W3-cla', name: 'Clarity',         def: 'Using clear and understandable language' },
    { id: 'W3-obj', name: 'Objectivity',     def: 'Avoiding personal opinions' },
    { id: 'W3-con', name: 'Consistency',     def: 'Using the same terms throughout documents' },
    { id: 'W3-neu', name: 'Neutrality',      def: 'Avoiding biased or emotional language' },
    { id: 'W3-cnf', name: 'Confidentiality', def: 'Protecting sensitive information' }
  ];
  UN.subs.forEach(function (s) { s.group = 'characteristics'; s.kind = 'sub'; });

  UN.bank = {
    mcq: [
      { id: 'M1', item: 'W1', text: 'UN translation is…', opts: {
        a: 'translating official UN documents from one language into another while keeping the original meaning accurate',
        b: 'translating any text word for word, whatever the meaning',
        c: 'summarizing UN documents in a single language',
        d: 'writing speeches for the Secretary-General' } },
      { id: 'M2', item: 'W2', text: 'The United Nations was founded in…', opts: { a: '1945', b: '1919', c: '1939', d: '1950' } },
      { id: 'M3', item: 'W2', text: 'Which of these is NOT one of the aims of the UN?', opts: {
        a: 'Increasing the profits of member countries', b: 'Maintaining peace',
        c: 'Protecting human rights', d: 'Promoting development' } },
      { id: 'M4', item: 'W3-obj', text: 'In UN translation, objectivity means…', opts: {
        a: 'avoiding personal opinions', b: 'avoiding biased or emotional language',
        c: 'keeping the original meaning', d: 'protecting sensitive information' } },
      { id: 'M5', item: 'W4', text: 'Which document is short and highlights your most relevant skills and experience for a specific job?', opts: {
        a: 'Resume', b: 'CV', c: 'Both are always the same', d: 'Neither of them' } },
      { id: 'M6', item: 'W4', text: 'Which document is detailed and includes your education, qualifications, skills, and work experience?', opts: {
        a: 'CV', b: 'Resume', c: 'Both are always the same', d: 'Neither of them' } },
      { id: 'M7', item: 'W5', text: 'UN stands for…', opts: {
        a: 'United Nations', b: 'Union of Nations', c: 'United Nationalities', d: 'Universal Nations' } },
      { id: 'M8', item: 'W5', text: 'The UN is an international organization where…', opts: {
        a: 'countries work together to solve global problems and maintain international peace and security',
        b: 'each country works alone to protect its own interests',
        c: 'companies compete to develop global markets',
        d: 'translators work together to publish documents' } }
    ],
    tf: [
      { id: 'TF1',  item: 'W2',     text: 'The United Nations was founded in 1945.' },
      { id: 'TF2',  item: 'W3-obj', text: "UN translation allows the translator's personal opinions." },
      { id: 'TF3',  item: 'W3-con', text: 'Consistency means using the same terms throughout documents.' },
      { id: 'TF4',  item: 'W4',     text: 'A resume is longer and more detailed than a CV.' },
      { id: 'TF5',  item: 'W3-neu', text: 'Neutrality means avoiding biased or emotional language.' },
      { id: 'TF6',  item: 'T2',     text: 'The Arabic for "Security Council" is مجلس الأمن.' },
      { id: 'TF7',  item: 'T17',    text: 'The Arabic for "Trusteeship Council" is المجلس الاقتصادي والاجتماعي.' },
      { id: 'TF8',  item: 'W3-cnf', text: 'Confidentiality means protecting sensitive information.' },
      { id: 'TF9',  item: 'T5',     text: 'The Arabic for "Deputy Secretary-General" is الأمين العام للأمم المتحدة.' },
      { id: 'TF10', item: 'W2',     text: 'The UN works to maintain peace and protect human rights.' }
    ],
    cloze: [
      { id: 'CL1', item: 'W4', text: 'A ____ is a short document that highlights your most relevant skills and experience for a specific job.',
        opts: { a: 'resume', b: 'CV', c: 'resolution', d: 'working paper' } },
      { id: 'CL2', item: 'W2', text: 'The UN works to maintain ____, protect human rights, promote development, and encourage cooperation between countries.',
        opts: { a: 'peace', b: 'profit', c: 'tourism', d: 'trade' } }
    ]
  };
})();
