/*
 * Simultaneous Interpretation: 80 fill-in-the-gap questions with answers and explanations, exactly as supplied.
 * Line format:  group | answer | other accepted answers separated by ";" | question (__ marks the gap) | explanation
 * Questions 15, 35, 36, 61, 65 and 79 follow the course book where it differs from the question bank (each note says so).
 * Question 59 follows the class correction: languages, not speeches.
 */
(function () {
  var UN = window.UN = window.UN || {};
  var SI = UN.SI = UN.SI || {};

  SI.groups = {
    segm:  { en: 'Comprehension and segmentation', ar: 'الفهم والتقسيم' },
    study: { en: 'Research studies (Goldman-Eisler, Gerver)', ar: 'الدراسات البحثية (غولدمان-أيزلر وجيرفر)' },
    time:  { en: 'Temporal dimensions and pauses', ar: 'الجوانب الزمنية والوقفات' },
    evs:   { en: 'Ear-voice span and shadowing', ar: 'فترة الأذن-الصوت والترديد' },
    bil:   { en: 'Bilingualism and language acquisition', ar: 'ثنائية اللغة واكتساب اللغة' },
    key:   { en: 'Key concepts to memorise', ar: 'مفاهيم أساسية للحفظ' }
  };
  SI.groupOrder = ['segm', 'study', 'time', 'evs', 'bil'];

  var RAW = [
    'segm|Comprehension||Simultaneous interpreters rely on __ rather than perception.|They must understand the meaning, not just hear the words.',
    'segm|Strategy||According to Kalina, segmentation is a comprehension-based __.|It is a method of dividing speech into meaningful parts.',
    'segm|Storage||Chunking helps facilitate memory __.|Grouping information makes it easier to store in memory.',
    'study|Interpreters||Goldman-Eisler\'s study included six professional __.|The study involved six professional interpreters.',
    'study|Speeches||The interpreters were asked to render short __.|They were asked to interpret short spoken presentations.',
    'study|Minutes||The speeches ranged from 3 to 6 __.|The speeches lasted between three and six minutes.',
    'study|Pairs||The study involved several language __.|Different combinations of languages were studied.',
    'study|Syntactic||EVS units were found to be __ in nature.|They were related to sentence structure.',
    'study|Lexical||EVS units were not primarily __ in nature.|They were not mainly based on individual words.',
    'segm|Units||Input segmentation is based on identifying propositional meaning __.|Speech is divided into meaningful units.',
    'segm|Verb||A complete predicative expression contains a noun phrase and a __ phrase.|It contains a noun phrase and a verb phrase.',
    'segm|Verb||A predicate is usually formed by a __ phrase.|The verb phrase usually forms the predicate.',
    'time|Simultaneity||Temporal phenomena in SI deal with the mechanism of __.|Listening and speaking happen at the same time.',
    'time|Output||Researchers investigated the delivery pattern of SI input and __.|They studied the relationship between incoming speech and the interpreter\'s speech.',
    'time|Variables / Dimensions|features|Fluency, pausing, and lag are examples of temporal __.|Both words count. These are temporal (surface) variables: SI studies measure "fluency, pausing and the lag" between the two streams, and Setton divides this research into three dimensions (synchronicity, EVS and segmentation).',
    'time|EVS||Ear-voice span is abbreviated as __.|EVS means Ear-Voice Span.',
    'time|Task||Measuring synchronicity between input and output is considered a difficult __.|Measuring how closely listening and speaking happen together is difficult.',
    'time|Listening||An interpreter must speak while simultaneously __.|The interpreter listens while speaking.',
    'time|Mysterious||Simultaneous interpreting is often described as spectacular and __.|It seems mysterious because two language activities happen together.',
    'time|Input||Interpreters may pause to listen and use pauses in the __ speech.|They can use pauses in the original speaker\'s speech.',
    'study|French||Gerver\'s study involved pre-recorded __ speech.|The recorded speeches were in French.',
    'study|English||The students interpreted from French into __.|French was the source language; English was the target language.',
    'study|Removed||In Gerver\'s experiment, pauses over 0.25 seconds were __.|Pauses longer than 0.25 seconds were taken out.',
    'study|Positions||Interpreter pauses tended to occur in the same __ as speaker pauses.|Both speakers and interpreters paused at similar points.',
    'study|Correspondence||Similar pause locations indicate structural __.|The two speeches have similar structural patterns.',
    'study|Output||Structural correspondence exists between SL input and TL __.|The source input and target output may have similar structures.',
    'time|Easier||Normal pausing in source speech makes interpreting __.|Pauses give interpreters time to process information.',
    'time|Output||Source-speaker pauses can help interpreters produce successful __.|Pauses help interpreters organize their translation.',
    'time|Hinder||Unusual pauses at ungrammatical locations may __ interpreting.|Unnatural pauses can make interpreting more difficult.',
    'bil|Performance||Bilingualism is one criterion for evaluating interpreter __.|Language ability is important when evaluating an interpreter.',
    'bil|Bilingual||A person who speaks two languages is called a __.|A bilingual person can use two languages.',
    'bil|Translate||Harris suggested that bilinguals possess a natural ability to __.|Harris suggested that bilingual people may naturally be able to translate.',
    'bil|Training||Natural Translation/Interpreting does not necessarily require specialized __.|Natural translation can happen without professional training.',
    'bil|Acquisition||One factor affecting bilingual proficiency is age of __.|The age at which someone learns a language can affect their ability.',
    'bil|Proficiency|acquisition|Motivation can influence second-language __.|Being proficient in a second language depends on factors such as age of acquisition, how close the languages are, motivation and personality (Chenu and Jisa, 2009). "Acquisition" is also accepted.',
    'bil|Proficiency|acquisition|Personality may affect language __.|Personality is one of the factors that being proficient in a second language depends on, with age of acquisition, how close the languages are and motivation (Chenu and Jisa, 2009). "Acquisition" is also accepted.',
    'bil|Words||Language interference may occur when learners encounter new __.|Learners may apply rules from their first language to unfamiliar words.',
    'bil|Native|first;l1|L2 learners often associate new concepts through their __ language.|They often connect new concepts to their first language ("through L1"), so first is also correct.',
    'bil|Proficiency||Language interference can occur despite high language __.|Even advanced learners can experience language interference.',
    'bil|Native||Interpreters must understand at least one language besides their __ language.|They must understand another language in addition to their first language.',
    'bil|Speaking||Interpreters need to understand one language while __ another.|They listen in one language and speak in another.',
    'bil|Psycholinguistics||The study of bilingualism belongs to the field of __.|Psycholinguistics studies language and the human mind.',
    'bil|Processes|mechanisms|Psycholinguistics studies mental and cognitive __.|It studies how the mind understands and produces language: "the underlying mental/cognitive, neural mechanisms and processes", so mechanisms is also correct.',
    'bil|Mechanisms||Psycholinguistics also examines neural __.|It studies how the brain works during language activities.',
    'bil|Languages||Language acquisition involves one or more __.|Language acquisition means learning one or more languages.',
    'bil|Bilinguals||Simultaneous interpreters are different from normal __.|Interpreters must process and produce languages under time pressure.',
    'bil|Proficiency||A bilingual may have two languages with equal __.|Someone may have the same ability in both languages.',
    'bil|Balanced||A bilingual with equal proficiency is called a __ bilingual.|A balanced bilingual has similar ability in both languages.',
    'bil|Dominant||A bilingual may have one language that is more __ than the other.|The dominant language is the one in which the person is stronger.',
    'segm|Information||Segmentation helps interpreters organize incoming __.|It divides incoming speech into manageable parts.',
    'segm|Storage||Comprehension-based segmentation supports memory __.|Understanding and grouping information helps memory.',
    'segm|Translation||Meaningful units are identified before __ begins.|Interpreters identify the meaning before producing the translation.',
    'segm|Constituents||A complete predicative expression contains at least two major __.|These are the noun phrase and the verb phrase.',
    'evs|Streams||Ear-voice span refers to the lag between two __.|It is the time gap between the source and target speech.',
    'time|Fluency||SI researchers examined pausing and __ patterns.|They studied pauses and how smoothly interpreters speak.',
    'segm|Units||Interpreters process information in meaningful __.|They process speech in meaningful sections.',
    'time|Source||The source speaker provides the __ input.|The source is the original message.',
    'time|Target||The interpreter produces the __ output.|The target is the translated message.',
    'time|Languages||Structural correspondence may exist between source and target __.|The source and target languages may have similar structures.',
    'bil|Proficiency||Effective interpreting requires both comprehension and language __.|Interpreters need understanding and strong language skills.',
    'evs|Décalage|decalage;time delay;delay|Ear-voice span (EVS) is also known as __ or time lag.|"Ear-voice span (EVS), also known as décalage or time lag". "Time delay" means the same and is also accepted.',
    'evs|Interpretation|interpreting;the interpretation|EVS refers to the interval between hearing the source speech and delivering the __.|It is the time between hearing the original and producing the translation.',
    'evs|Words||Time lag can be measured by units of time or the number of content __.|It can be measured in seconds or by counting words.',
    'evs|2 seconds|2;two;two seconds;2 sec|Paneth\'s findings showed that the average EVS ranged from __ to 4 seconds.|The reported average range was two to four seconds.',
    'evs|10 seconds|10;ten;ten seconds;10 sec|According to some studies, EVS may range from 2 to __ seconds.|EVS can range from 2 to 10 seconds, depending on the languages (Oléron and Nanpon, 1965).',
    'evs|Source-language|source language;source;sl|An interpreter must comprehend a sufficient amount of __ information before beginning interpretation.|The interpreter needs to understand enough of the original message.',
    'evs|EVS||The position of key words may affect the length of the __.|The location of important words can affect the interpreter\'s delay.',
    'evs|Syntactic||The predicate is considered an important __ element.|The predicate is an important part of sentence structure.',
    'evs|Lag|delay|Cognitive activity can influence the length of time __.|Mental processing can affect the time delay: "EVS or time delay is affected by the cognitive activity", so delay is also correct.',
    'evs|Repetition||Shadowing involves the immediate verbatim __ of the input.|Shadowing means repeating the original speech exactly.',
    'evs|Language||In shadowing, the input is repeated in the same __.|The person repeats the speech without translating it.',
    'evs|Longer||Studies have shown that EVS in interpreting is generally __ than in shadowing.|Interpreting requires more mental effort than simple repetition.',
    'evs|Load||The longer EVS in interpreting may be caused by increased cognitive __.|Interpreters have to listen, understand, translate, and speak.',
    'evs|Decisions||Simultaneous interpreters must make continuous __ while interpreting.|They constantly decide how to understand and express the message.',
    'evs|Speeches||The average time lag is not the same for all interpreters or all types of __.|The time lag depends on the interpreter and the speech.',
    'segm|Output||According to Pöchhacker, segmentation refers to the interpreter\'s processing of both input and __.|It involves processing the original speech and producing the translation.',
    'segm|Units||Segmentation helps decompose speech into processing-relevant __.|It divides speech into smaller parts that are easier to process.',
    'bil|Productive||Interpreters should possess both perceptive and __ language skills.|They need to understand language and produce it.',
    'bil|Early||A bilingual who learns two languages from birth is described as an __ sequential bilingual.|An early sequential bilingual is one exposed to the two languages from birth (De Groot, 2015).',
    'bil|Performance||High proficiency in both the source language and target language is an important criterion for evaluating an interpreter\'s __.|Strong ability in both languages is essential for good interpreting.'
  ];

  // Heading shown for the question number is its position in this list (1 to 80), the same as in the source.
  SI.gaps = RAW.map(function (line, i) {
    var p = line.split('|');
    return { id: 'G' + (i + 1), n: i + 1, group: p[0], answer: p[1], alt: p[2] ? p[2].split(';') : [], q: p[3], note: p[4] };
  });
})();
