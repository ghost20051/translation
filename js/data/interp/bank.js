/*
 * Simultaneous Interpretation: the 20 multiple-choice questions, the 20 essay questions with their short answers and
 * memory tricks, and the ten key concepts to memorise. All of it is exactly as supplied.
 */
(function () {
  var UN = window.UN = window.UN || {};
  var SI = UN.SI = UN.SI || {};

  /* ---------- Part II: multiple choice. Each question is attached to the fill-in-the-gap item on the same idea. ---------- */
  var MCQ = [
    ['G1', 'Simultaneous interpreters mainly rely on:', ['Pronunciation', 'Comprehension', 'Writing', 'Note-taking'], 'b'],
    ['G2', 'Kalina views segmentation as a:', ['Grammar strategy', 'Comprehension-based strategy', 'Memory failure', 'Vocabulary list'], 'b'],
    ['G3', 'Chunking is used to facilitate:', ['Memory storage', 'Typing speed', 'Reading aloud', 'Proofreading'], 'a'],
    ['G4', 'Goldman-Eisler\'s study included:', ['Four interpreters', 'Five interpreters', 'Six interpreters', 'Eight interpreters'], 'c'],
    ['G8', 'EVS units were found to be:', ['Lexical', 'Syntactic', 'Phonetic', 'Graphic'], 'b'],
    ['G10', 'Input segmentation is based on:', ['Sound units', 'Letter units', 'Propositional meaning units', 'Word count'], 'c'],
    ['G11', 'A complete predicative expression includes:', ['Noun phrase and verb phrase', 'Adjective and noun', 'Verb and adverb', 'Preposition and noun'], 'a'],
    ['G16', 'EVS is short for:', ['Electronic Voice System', 'Ear-Voice Span', 'Effective Vocal Speech', 'Ear Vocabulary Study'], 'b'],
    ['G17', 'Measuring synchronicity involves comparing:', ['Two interpreters', 'Two languages only', 'Input and output', 'Memory and attention'], 'c'],
    ['G18', 'Simultaneous interpreters must speak while:', ['Reading', 'Writing', 'Listening', 'Resting'], 'c'],
    ['G21', 'Gerver\'s study used:', ['Arabic speech', 'French speech', 'Spanish speech', 'German speech'], 'b'],
    ['G22', 'Students interpreted the speech into:', ['Arabic', 'German', 'English', 'Italian'], 'c'],
    ['G25', 'Similar pause locations suggest:', ['Structural correspondence', 'Memory loss', 'Language interference', 'Noise problems'], 'a'],
    ['G27', 'Normal pausing in source speech makes interpreting:', ['Harder', 'Slower', 'Easier', 'Impossible'], 'c'],
    ['G31', 'A person who speaks two languages is:', ['Translator', 'Linguist', 'Bilingual', 'Researcher'], 'c'],
    ['G37', 'Language interference may occur when learners meet:', ['New words', 'Old books', 'Native speakers only', 'Exams'], 'a'],
    ['G40', 'Interpreters must know at least one language besides their:', ['Foreign language', 'Native language', 'Academic language', 'Written language'], 'b'],
    ['G42', 'The study of bilingualism belongs to:', ['Sociology', 'Psycholinguistics', 'Geography', 'Economics'], 'b'],
    ['G48', 'A bilingual with equal proficiency in two languages is:', ['Dominant', 'Passive', 'Balanced', 'Monolingual'], 'c'],
    ['G60', 'Effective simultaneous interpreting depends heavily on:', ['Memorizing isolated words', 'Comprehension and processing meaning', 'Speaking very fast', 'Repeating the source language verbatim'], 'b']
  ];
  SI.bank = { mcq: [], tf: [], cloze: [] };
  SI.keys = { mcq: {}, tf: {}, cloze: {}, written: {} };
  MCQ.forEach(function (m, i) {
    var id = 'SM' + (i + 1);
    SI.bank.mcq.push({ id: id, item: m[0], text: m[1], opts: { a: m[2][0], b: m[2][1], c: m[2][2], d: m[2][3] } });
    SI.keys.mcq[id] = m[3];
  });

  /* ---------- Part III: essay questions. group | question | answer | memory trick | key phrases (any one of each group counts) ---------- */
  var ESSAY = [
    ['time', 'Explain the concept of synchronicity in simultaneous interpreting and discuss why it is difficult to measure.',
      'Synchronicity means listening to the speaker and interpreting at almost the same time. It is difficult to measure because the interpreter listens and speaks simultaneously, and the time difference keeps changing.',
      'Same time + changing time gap.', [['listening', 'listen'], ['same time', 'simultaneous'], ['difficult'], ['changing', 'time difference', 'time gap']]],
    ['time', 'Discuss the role of pauses in simultaneous interpreting and explain how they can influence interpreter performance.',
      'Pauses give interpreters time to listen, understand, and organize information. Normal pauses make interpreting easier, while unusual pauses can make it more difficult.',
      'Normal pauses = help. Unusual pauses = difficulty.', [['understand', 'organize', 'listen'], ['normal'], ['easier', 'help'], ['unusual'], ['difficult', 'harder', 'hinder']]],
    ['evs', 'Explain the concept of Ear-Voice Span (EVS) and discuss its importance in simultaneous interpreting.',
      'EVS is the time delay between hearing the source speech and producing the interpretation. It gives interpreters time to understand the message before translating it.',
      'Ear = hearing. Voice = speaking. EVS = the gap between them.', [['time delay', 'time lag', 'gap', 'interval'], ['hearing', 'ear', 'listening'], ['producing', 'speaking', 'voice', 'interpretation'], ['understand', 'comprehend']]],
    ['evs', 'Describe the different methods used to measure Ear-Voice Span and evaluate their effectiveness.',
      'EVS can be measured in seconds or by counting the number of content words between the speaker\'s speech and the interpreter\'s speech. Both methods help measure the time lag, but they do not fully explain the interpreter\'s mental processing.',
      'Two methods = Seconds + Words.', [['seconds', 'time'], ['content words', 'counting words', 'number of words', 'words'], ['time lag', 'lag'], ['mental', 'cognitive', 'processing']]],
    ['evs', 'Discuss the factors that may affect the length of EVS during simultaneous interpreting.',
      'EVS is affected by key words, sentence structure, cognitive activity, and speech difficulty. It also differs between interpreters.',
      'Words + Structure + Thinking + Difficulty.', [['key word'], ['structure', 'syntactic', 'sentence'], ['cognitive', 'thinking', 'mental'], ['difficulty', 'difficult'], ['differs', 'different', 'interpreters']]],
    ['segm', 'Explain why interpreters need to comprehend sufficient source-language information before beginning their output.',
      'Interpreters need to understand enough of the original message before speaking. This helps them produce an accurate translation and avoid mistakes.',
      'Understand first, translate second.', [['understand', 'comprehend'], ['original', 'source'], ['accurate', 'accuracy'], ['mistakes', 'errors']]],
    ['evs', 'Discuss the relationship between key words, syntactic elements, and the timing of interpretation.',
      'Key words and sentence structure affect when interpreters can begin speaking. They may need to wait for important information to understand the complete meaning.',
      'Key words + Sentence structure = Timing.', [['key word'], ['structure', 'syntactic'], ['begin', 'start', 'when'], ['wait'], ['complete meaning', 'important information']]],
    ['evs', 'Explain the concept of shadowing and compare it with simultaneous interpreting.',
      'Shadowing means repeating the speaker\'s words immediately in the same language. Simultaneous interpreting means understanding the message and translating it into another language. Interpreting requires more mental effort.',
      'Shadowing = Repeat. Interpreting = Understand + Translate.', [['repeating', 'repeat'], ['same language'], ['understanding', 'understand'], ['another language', 'translat'], ['more mental effort', 'mental effort', 'more effort']]],
    ['evs', 'Discuss the role of cognitive activity in determining the length of EVS.',
      'Cognitive activity affects EVS because interpreters must listen, understand, remember, and speak at the same time. More mental processing may increase the time delay.',
      'More thinking = potentially longer EVS.', [['listen'], ['understand'], ['remember', 'memory'], ['speak'], ['time delay', 'longer', 'increase']]],
    ['evs', 'Explain how cognitive load affects interpreter performance during simultaneous interpreting.',
      'Cognitive load is the amount of mental effort required during interpreting. High cognitive load can cause mistakes, memory problems, and less fluent speech.',
      'High load = More mistakes + Less fluency.', [['mental effort'], ['high'], ['mistakes', 'errors'], ['memory'], ['fluen']]],
    ['segm', 'Discuss the concept of segmentation and explain its importance in processing source-language input.',
      'Segmentation means dividing speech into smaller meaningful units. It helps interpreters understand, organize, and remember information.',
      'Segmentation = Divide + Understand + Remember.', [['dividing', 'divide'], ['meaningful'], ['understand'], ['organize'], ['remember', 'memory']]],
    ['segm', 'Explain how segmentation helps interpreters transform speech into processing-relevant units.',
      'Segmentation divides continuous speech into smaller meaningful parts. These parts are easier to process, remember, and translate.',
      'Big speech → Small units → Easier processing.', [['divides', 'dividing'], ['continuous', 'speech'], ['smaller'], ['meaningful'], ['easier'], ['process']]],
    ['bil', 'Discuss bilingualism as a criterion for evaluating interpreter performance.',
      'Bilingualism is important because interpreters must understand and use two languages. However, knowing two languages is not enough; they also need interpreting skills and good comprehension.',
      'Two languages + Interpreting skills.', [['two languages'], ['not enough', 'however'], ['interpreting skills', 'skills'], ['comprehension', 'understanding']]],
    ['bil', 'Explain the concept of Natural Translation/Interpreting and discuss its relationship to bilingualism.',
      'Natural Translation/Interpreting is the ability to translate or interpret without specialized professional training. It is related to bilingualism because bilingual people may naturally develop the ability to translate between their languages.',
      'Bilingualism + Natural ability − Specialized training.', [['without', 'no '], ['specialized', 'professional training', 'training'], ['bilingual'], ['naturally', 'natural ability', 'natural'], ['translate']]],
    ['bil', 'Discuss the factors that influence proficiency in a second language.',
      'Second-language proficiency is affected by age of acquisition, motivation, personality, and language exposure. These factors influence how well someone learns another language. The course book also mentions how close the two languages are (proximity of the languages involved).',
      'Age + Motivation + Personality + Exposure (+ how close the languages are).', [['age'], ['motivation'], ['personality'], ['exposure', 'proximity', 'close']]],
    ['bil', 'Explain the concept of language interference and describe how it may affect bilingual speakers.',
      'Language interference happens when one language influences another. For example, bilingual speakers may use grammar or vocabulary from their native language when speaking a second language.',
      'One language affects another.', [['one language influences', 'one language affects', 'influences another', 'affects another'], ['grammar', 'vocabulary'], ['native language', 'first language'], ['second language']]],
    ['bil', 'Discuss the importance of psycholinguistics in understanding bilingualism and simultaneous interpreting.',
      'Psycholinguistics studies the relationship between language and the mind. It helps explain how people learn languages, understand speech, remember information, and produce language.',
      'Psycholinguistics = Language + Mind + Brain.', [['language and the mind', 'language and mind', 'mind'], ['learn'], ['understand', 'speech'], ['remember', 'memory'], ['produce']]],
    ['bil', 'Compare balanced bilinguals and dominant bilinguals, explaining how they differ in language proficiency.',
      'A balanced bilingual has almost equal proficiency in both languages. A dominant bilingual is stronger in one language than the other.',
      'Balanced = Equal. Dominant = One is stronger.', [['balanced'], ['equal'], ['dominant'], ['stronger']]],
    ['bil', 'Discuss the characteristics that distinguish simultaneous interpreters from ordinary bilinguals.',
      'Simultaneous interpreters must listen, understand, remember, and speak in another language at the same time. Ordinary bilinguals may know two languages but do not necessarily have these interpreting skills.',
      'Interpreters do more than speak two languages.', [['listen'], ['understand'], ['remember'], ['same time'], ['interpreting skills', 'skills'], ['ordinary', 'not necessarily']]],
    ['bil', 'Explain why high proficiency in both the source language (SL) and target language (TL) is essential for successful simultaneous interpreting.',
      'High proficiency helps interpreters understand the original message accurately and express it clearly in the target language. It reduces mistakes and improves interpretation quality.',
      'Strong SL comprehension + Strong TL expression = Good interpretation.', [['understand'], ['original', 'source'], ['express'], ['target language', 'target'], ['mistakes', 'errors'], ['quality']]]
  ];
  SI.written = ESSAY.map(function (e, i) {
    var id = 'SW' + (i + 1);
    SI.keys.written[id] = { model: e[2], trick: e[3], phrases: e[4] };
    return { id: id, n: i + 1, group: e[0], q: e[1] };
  });

  /* ---------- "Important things to memorize": ten key concepts ---------- */
  var KEY = [
    ['Synchronicity', 'Listening and speaking at almost the same time'],
    ['EVS', 'Time gap between hearing and speaking'],
    ['Shadowing', 'Repeating in the same language'],
    ['Segmentation', 'Dividing speech into meaningful units'],
    ['Chunking', 'Helps memory storage'],
    ['Balanced bilingual', 'Equal proficiency'],
    ['Dominant bilingual', 'Stronger in one language'],
    ['Language interference', 'One language affects another'],
    ['Cognitive load', 'Mental effort'],
    ['Psycholinguistics', 'Language and the mind']
  ];
  SI.subs = KEY.map(function (k, i) { return { id: 'SK' + (i + 1), group: 'key', name: k[0], def: k[1] }; });
})();
