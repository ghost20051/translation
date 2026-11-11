/* Sports Translation, chapter 7: "Sports Journalism and Media Translation".
   A summary topic by topic in English, the Arabic equivalent the chapter gives for each key term, and a short line in Arabic
   under each topic. Summaries only: this subject has no questions. */
(function () {
  var UN = window.UN = window.UN || {};
  var P = UN.SP = UN.SP || { chapters: [] };

  P.chapters.push({
    g: 'c7', n: 7,
    en: 'Ch. 7: Sports journalism', short: 'الفصل 7: الصحافة الرياضية',
    title: 'Chapter 7: Sports Journalism and Media Translation', titleAr: 'الفصل السابع: الصحافة الرياضية والترجمة الإعلامية',
    intro: 'Sports journalism is one of the liveliest kinds of specialized translation. Unlike scientific or medical sports texts, it mixes information, description, evaluation and emotion, in newspapers, magazines, websites, social media, match reports, interviews, press conferences and sports news agencies. The translator must keep the facts and also the speed, tone, style, terminology and impact of the original. Common text types are news reports, match reports, interviews, press conferences, player profiles, features, headlines, opinion articles, tournament reports and statistical reports. Take special care with terms, abbreviations, proper names, scores, statistics, quotations and culture-specific expressions.',
    introAr: 'الصحافة الرياضية تجمع بين نقل المعلومة والوصف والتقييم والتعبير عن المشاعر، لذلك ينقل المترجم الحقائق ومعها السرعة والنبرة والأسلوب والتأثير، وينتبه بشكل خاص للمصطلحات والاختصارات والأسماء والنتائج والإحصاءات والاقتباسات.',
    topics: [
      { title: '7.2 The language of sports journalism', titleAr: 'لغة الصحافة الرياضية',
        text: 'Sports journalism has its own vocabulary and style. It often uses short sentences, dynamic verbs, evaluative adjectives, metaphors, idioms, abbreviations, technical terms and dramatic expressions. A plain sentence such as "The team won the match" only states the fact; a typical sports-news sentence adds judgement and drama to the same fact.',
        terms: [['Sports journalism', 'الصحافة الرياضية'], ['Sports journalist', 'صحفي رياضي'], ['Sports news', 'الأخبار الرياضية'], ['Match report', 'تقرير المباراة'], ['Sports feature', 'تحقيق / موضوع رياضي موسع'], ['Headline', 'عنوان الخبر'],
          ['Lead / lead paragraph', 'مقدمة الخبر'], ['Interview', 'مقابلة'], ['Press conference', 'مؤتمر صحفي'], ['Sports commentator', 'معلق رياضي'], ['Sports correspondent', 'مراسل رياضي'], ['Editorial', 'مقال افتتاحي / رأي']],
        ar: 'تتميز لغة الصحافة الرياضية بالجمل القصيرة والأفعال الحيوية والصفات التقييمية والاستعارات والتعابير الاصطلاحية، فهي لا تكتفي بنقل الخبر بل تضيف إليه التقييم والإثارة.' },

      { title: '7.3 Headlines', titleAr: 'العناوين الرياضية',
        text: 'Headlines are hard to translate because they are short, leave words out, and are full of metaphor and feeling. Aim for a natural journalistic equivalent that works for the reader, not a word-for-word copy. For the headline "Lions Roar Back to Seal Victory":',
        terms: [['Literal (can sound unnatural)', 'الأسود تزأر من جديد لتختم الانتصار'], ['More natural', 'الأسود تنتفض وتحسم الانتصار']],
        points: ['Typical features of headlines: no articles, no auxiliary verbs, compressed syntax, the present tense for past events, metaphors, puns and alliteration.'],
        ar: 'العناوين قصيرة ومكثفة ومليئة بالاستعارات، لذلك نبحث عن مقابل صحفي طبيعي بدل الترجمة الحرفية.' },

      { title: '7.4 Match reports', titleAr: 'تقارير المباريات',
        text: 'A match report gives the main events of a game in time order or by theme. It may include the teams or competitors, the venue, the competition, the score, important events, individual performances, tactical developments, the final result and quotations.',
        terms: [['Home side', 'الفريق صاحب الأرض'], ['Away side', 'الفريق الضيف'], ['Possession', 'الاستحواذ'], ['Scoring opportunity', 'فرصة تسجيل'], ['Goal-scoring chance', 'فرصة لإحراز هدف'], ['Equalizer', 'هدف التعادل'],
          ['Winner', 'الهدف الحاسم'], ['Extra time', 'الوقت الإضافي'], ['Injury time', 'الوقت المحتسب بدل الضائع'], ['Final whistle', 'صافرة النهاية']],
        ar: 'تقرير المباراة يسرد أهم أحداثها بالترتيب الزمني أو حسب الموضوع: الفريقان، والملعب، والبطولة، والنتيجة، والأحداث المهمة، وأداء اللاعبين، والتطورات الخططية، والنتيجة النهائية، والتصريحات.' },

      { title: '7.5 Metaphors', titleAr: 'الاستعارات',
        text: 'Sports news is full of metaphors such as "crushed its opponents", "the striker was on fire", "the defense collapsed" or "fighting for survival", and they should not always be translated literally. First decide whether an expression is literal, metaphorical, idiomatic or technical. For "The striker was on fire":',
        terms: [['Better', 'كان المهاجم في قمة تألقه'], ['Literal (avoid)', 'كان المهاجم مشتعلاً']],
        ar: 'لا نترجم الاستعارات حرفيًا دائمًا، فالمقصود أن المهاجم في قمة تألقه لا أنه "مشتعل". نحدد أولًا هل التعبير حرفي أم مجازي أم اصطلاحي أم فني.' },

      { title: '7.6 Idioms', titleAr: 'التعابير الاصطلاحية',
        text: 'Choose an Arabic expression that does the same job, instead of copying the English image mechanically.',
        terms: [['Level the playing field', 'تحقيق تكافؤ الفرص'], ['A game changer', 'عنصر يغير مجريات المباراة'], ['Back on track', 'استعادة المسار الصحيح'], ['Throw in the towel', 'الاستسلام'], ['A heavyweight clash', 'مواجهة بين الكبار'],
          ['On the ropes', 'في موقف حرج'], ['Blow the whistle', 'يطلق صافرة الحكم'], ['Take the lead', 'يتقدم'], ['Hold the lead', 'يحافظ على تقدمه'], ['Seal the victory', 'يحسم الانتصار']],
        ar: 'نترجم التعبير الاصطلاحي بتعبير عربي يؤدي الوظيفة نفسها، لا بنقل صورته الإنجليزية حرفيًا.' },

      { title: '7.7 Interviews and quotations', titleAr: 'المقابلات والاقتباسات',
        text: 'When translating what someone said, keep the speaker\'s meaning, tone, level of formality, emotional attitude and style. Do not make spontaneous speech more formal than it is.',
        ar: 'في ترجمة كلام المتحدث نحافظ على المعنى والنبرة ومستوى الرسمية والمشاعر والأسلوب، ولا نحوّل الكلام العفوي إلى لغة رسمية متكلفة.' },

      { title: '7.8 Statistics', titleAr: 'الإحصاءات',
        text: 'Sports news uses many statistics: goals, assists, shots, possession percentage, passing accuracy, fouls, yellow and red cards, rebounds, points, wins, losses and rankings. Numbers must be translated with complete accuracy.',
        ar: 'الإحصاءات كثيرة في الأخبار الرياضية، مثل الأهداف ونسبة الاستحواذ والبطاقات والترتيب، ويجب نقل الأرقام بدقة تامة.' },

      { title: '7.9 Proper names', titleAr: 'أسماء الأعلام',
        text: 'Names of athletes, teams, stadiums, competitions, leagues, clubs and coaches must be handled consistently. Know when to transliterate, when to translate and when to use the established Arabic form: the World Cup has an established Arabic name, while a player\'s name is normally transliterated, not translated for its meaning.',
        terms: [['World Cup', 'كأس العالم']],
        ar: 'نتعامل مع أسماء اللاعبين والفرق والملاعب والبطولات بثبات، ونفرّق بين النقل الصوتي والترجمة والاستخدام العربي المستقر: World Cup هي كأس العالم، أما اسم اللاعب فيُكتب بحروف عربية كما يُنطق.' },

      { title: '7.10 Strategies for translating sports journalism', titleAr: 'استراتيجيات ترجمة الصحافة الرياضية',
        points: ['Identify the genre.', 'Understand the sporting context.', 'Keep the facts accurate.', 'Translate terms consistently.', 'Reproduce the journalistic register.', 'Avoid unnecessary literal translation.',
          'Keep metaphors when possible.', 'Replace culture-specific idioms with functional equivalents.', 'Check names and statistics.', 'Keep the rhythm and brevity of headlines.'],
        ar: 'حدد نوع النص، وافهم السياق الرياضي، وانقل الحقائق بدقة، والتزم بالمصطلحات، وحافظ على الأسلوب الصحفي، وتجنب الحرفية، واستبدل التعابير الثقافية بمقابلات وظيفية، وراجع الأسماء والأرقام، وحافظ على إيقاع العناوين وإيجازها.' }
    ],
    sum: 'Translating sports journalism needs more than sports terms: the translator must know how journalistic writing works and reproduce it naturally in the target language. The main skills are translating headlines, match reports, quotations, metaphors and idioms, and statistics, handling proper names, and managing terminology. Key principle: carry over both the information and the communicative energy of the original.',
    sumAr: 'مترجم الصحافة الرياضية ينقل المعلومة وروح النص معًا في العناوين وتقارير المباريات والاقتباسات والاستعارات والتعابير والإحصاءات وأسماء الأعلام.'
  });
})();
