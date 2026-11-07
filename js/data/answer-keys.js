/*
 * Answer keys (approved). Kept apart from the question bank.
 * NOTE: this is a public static site, so these keys can be read by anyone who views the source.
 * Terms and the six characteristics carry their own answers in terms.js / questions.js.
 */
(function () {
  var UN = window.UN = window.UN || {};

  UN.keys = {
    mcq: { M1: 'a', M2: 'a', M3: 'a', M4: 'a', M5: 'a', M6: 'a', M7: 'a', M8: 'a' },
    tf: { TF1: true, TF2: false, TF3: true, TF4: false, TF5: true, TF6: true, TF7: false, TF8: true, TF9: false, TF10: true },
    cloze: { CL1: 'a', CL2: 'a' },

    // Model answers, verbatim from the approved material.
    // phrases: groups of alternatives; a group counts as matched if ANY alternative appears.
    // This only produces an ESTIMATE; the student always self-grades.
    written: {
      W1: {
        model: 'UN translation is the process of translating official United Nations documents from one language into another while keeping the original meaning accurate.',
        phrases: [['translat'], ['official'], ['united nations', ' un '], ['one language', 'another language', 'into another'], ['original meaning', 'meaning'], ['accura']]
      },
      W2: {
        model: 'The United Nations is an international organization founded in 1945. It works to maintain peace, protect human rights, promote development, and encourage cooperation between countries.',
        phrases: [['united nations', ' un '], ['1945'], ['international'], ['peace'], ['human rights'], ['develop'], ['cooperat', 'co operat', 'work together']]
      },
      W3: {
        model: 'Accuracy: Keeping the original meaning. Clarity: Using clear and understandable language. Objectivity: Avoiding personal opinions. Consistency: Using the same terms throughout documents. Neutrality: Avoiding biased or emotional language. Confidentiality: Protecting sensitive information.',
        phrases: [['accura'], ['clarity', 'clear'], ['objectiv'], ['consisten'], ['neutral'], ['confidential']]
      },
      W4: {
        model: 'CV: A detailed document that includes your education, qualifications, skills, and work experience. Resume: A short document that highlights your most relevant skills and experience for a specific job.',
        phrases: [[' cv '], ['resume'], ['detail', 'long', 'full'], ['short', 'brief', 'summary', 'one page'], ['education'], ['skills'], ['experience'], ['specific job', 'relevant']]
      },
      W5: {
        model: 'UN stands for United Nations. It is an international organization where countries work together to solve global problems and maintain international peace and security.',
        phrases: [['united nations'], ['international'], ['countries', 'nations'], ['together', 'cooperat'], ['problems'], ['peace'], ['security']]
      }
    }
  };
})();
