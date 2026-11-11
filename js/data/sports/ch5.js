/* Sports Translation, chapter 5: "Sports Training and Conditioning".
   A summary topic by topic in English, the Arabic equivalent the chapter gives for each key term, and a short line in Arabic
   under each topic. Summaries only: this subject has no questions. */
(function () {
  var UN = window.UN = window.UN || {};
  var P = UN.SP = UN.SP || { chapters: [] };

  P.chapters.push({
    g: 'c5', n: 5,
    en: 'Ch. 5: Sports training', short: 'الفصل 5: التدريب الرياضي',
    title: 'Chapter 5: Sports Training and Conditioning', titleAr: 'الفصل الخامس: التدريب الرياضي والإعداد البدني',
    intro: 'Sports training is the planned, step-by-step development of an athlete\'s physical, technical, tactical and psychological abilities in order to perform better. Training texts mix terms from exercise physiology, biomechanics, psychology, nutrition, medicine and coaching, so the translator has to understand how load, intensity, volume, recovery, adaptation, performance and fatigue are connected, not only the single words.',
    introAr: 'التدريب الرياضي عملية مخططة ومنظمة لتطوير قدرات الرياضي البدنية والفنية والخططية والنفسية بهدف تحسين الأداء، ولذلك يحتاج المترجم إلى فهم العلاقة بين الحمل والشدة والحجم والاستشفاء والتكيف والتعب، لا الكلمات منفردة فقط.',
    topics: [
      { title: '5.2 What sports training is', titleAr: 'مفهوم التدريب الرياضي',
        text: 'Sports training is a systematic process in which an athlete goes through planned physical and other preparation to perform better and reach specific competition goals. It is more than just doing exercise: real training involves planning, step-by-step progression, repetition, adaptation, monitoring, recovery and evaluation.',
        terms: [['Sports training / athletic training', 'التدريب الرياضي'], ['Training program', 'البرنامج التدريبي'], ['Training session', 'الوحدة التدريبية / الحصة التدريبية'], ['Training plan', 'الخطة التدريبية'], ['Training goal', 'الهدف التدريبي'],
          ['Coach', 'مدرب'], ['Athlete', 'رياضي'], ['Performance', 'الأداء'], ['Athletic performance', 'الأداء الرياضي']],
        ar: 'التدريب الرياضي عملية منظمة يمر فيها الرياضي بإعداد مخطط له لتحسين أدائه وتحقيق أهداف تنافسية محددة، وهو أكثر من مجرد أداء تمارين: فيه تخطيط وتدرج وتكرار وتكيف ومتابعة واستشفاء وتقييم.' },

      { title: '5.3 The objectives of training', titleAr: 'أهداف التدريب',
        text: 'What training aims at depends on the athlete, the sport and the stage of preparation. The objectives fall into four kinds, and a complete training program should meet all four kinds of needs:',
        points: ['Physical: improving strength, endurance, speed, flexibility, agility, power and coordination.',
          'Technical: performing the skills of the sport correctly and efficiently, such as passing, shooting, serving, dribbling, jumping and throwing.',
          'Tactical: making the right decisions during competition.',
          'Psychological: building concentration, confidence, motivation, emotional control and mental resilience.'],
        terms: [['Physical', 'بدني'], ['Technical', 'فني'], ['Tactical', 'خططي'], ['Psychological', 'نفسي']],
        ar: 'للتدريب أربعة أنواع من الأهداف: بدنية، وفنية (أداء مهارات اللعبة بشكل صحيح)، وخططية (اتخاذ القرار المناسب أثناء المنافسة)، ونفسية (التركيز والثقة والدافعية وضبط الانفعالات).' },

      { title: '5.4 The five principles of training', titleAr: 'المبادئ الخمسة للتدريب',
        text: 'Good training rests on five basic principles:',
        items: [
          { name: 'Specificity', ar: 'الخصوصية / التخصصية', text: 'The body adapts to the kind of training it does: endurance training mainly develops endurance, while resistance training mainly develops strength and muscle.' },
          { name: 'Overload', ar: 'الحمل الزائد / التحميل الزائد', text: 'To keep adapting, the body must work harder than it is used to. Progressive overload is essential for gaining muscular strength.' },
          { name: 'Progression', ar: 'التدرج', text: 'Training demands should go up gradually, not suddenly, so that the body can adapt safely.' },
          { name: 'Individualization', ar: 'الفردية / مراعاة الفروق الفردية', text: 'Training is fitted to each athlete: age, fitness level, training experience, health status, sport, competitive level and personal goals.' },
          { name: 'Recovery', ar: 'الاستشفاء', text: 'Adaptation does not happen only during training. The body needs enough recovery to respond well to training stress and to avoid excessive fatigue.' }],
        ar: 'مبادئ التدريب خمسة: الخصوصية (الجسم يتكيف حسب نوع التدريب)، والحمل الزائد (يجب أن يتعرض الجسم لحمل أكبر مما اعتاده)، والتدرج (زيادة المتطلبات شيئًا فشيئًا)، والفردية (مراعاة الفروق بين الرياضيين)، والاستشفاء (وقت كافٍ ليستفيد الجسم من التدريب).' },

      { title: '5.5 Training load', titleAr: 'الحمل التدريبي',
        text: 'Training load is the amount and intensity of stress that training places on an athlete; it is one of the most important ideas in sports-science translation. External load is the work that can be measured: distance covered, number of repetitions, running speed, weight lifted, duration of exercise. Internal load is how the athlete\'s body and mind respond to that work.',
        terms: [['Training load', 'الحمل التدريبي'], ['External load', 'الحمل الخارجي'], ['Internal load', 'الحمل الداخلي'], ['Workload', 'عبء العمل / حمل العمل'], ['Training stress', 'الإجهاد التدريبي'], ['Training stimulus', 'المثير التدريبي']],
        ar: 'الحمل التدريبي هو مقدار الضغط الواقع على الرياضي بسبب التدريب وشدته. الحمل الخارجي هو العمل الذي يمكن قياسه مثل المسافة وعدد التكرارات، أما الحمل الداخلي فهو استجابة الرياضي الفسيولوجية والنفسية لهذا العمل.' },

      { title: '5.6–5.9 Intensity, volume, frequency and duration', titleAr: 'الشدة والحجم والتكرار والمدة',
        items: [
          { name: 'Training intensity', ar: 'شدة التدريب', text: 'How hard the effort or demand of an exercise or training activity is. High-intensity interval training, for example, repeats hard bouts of exercise with recovery periods in between.' },
          { name: 'Training volume', ar: 'حجم التدريب', text: 'The total amount of work done. Depending on the sport it is counted as duration, distance, repetitions, sets, total weight lifted or number of sessions. Raising volume too fast can increase the risk of excessive fatigue.' },
          { name: 'Training frequency', ar: 'تكرار التدريب', text: 'How often the athlete trains in a given period, for example three sessions a week. It should match the athlete\'s goals and ability to recover.' },
          { name: 'Training duration', ar: 'مدة التدريب', text: 'How long one session, or a whole training period, lasts.' }],
        terms: [['Exercise intensity', 'شدة التمرين'], ['Low intensity', 'شدة منخفضة'], ['Moderate intensity', 'شدة متوسطة'], ['High intensity', 'شدة مرتفعة'], ['Maximum intensity', 'شدة قصوى'],
          ['Three training sessions per week', 'ثلاث وحدات تدريبية أسبوعيًا']],
        ar: 'الشدة هي درجة صعوبة الجهد، والحجم هو مجموع العمل المنجز، والتكرار هو عدد مرات التدريب في فترة معينة، والمدة هي طول الوحدة التدريبية أو فترة التدريب.' },

      { title: '5.10 The FITT principle', titleAr: 'مبدأ FITT',
        text: 'FITT describes a training program by four variables. Coaches change these variables to adjust the training stimulus.',
        terms: [['F: Frequency', 'التكرار'], ['I: Intensity', 'الشدة'], ['T: Time', 'الوقت / المدة'], ['T: Type', 'النوع']],
        ar: 'مبدأ FITT يصف البرنامج التدريبي بأربعة متغيرات: التكرار والشدة والوقت والنوع، ويعدّل المدرب هذه المتغيرات ليغيّر المثير التدريبي.' },

      { title: '5.11–5.12 Periodization and training cycles', titleAr: 'التخطيط الدوري والدورات التدريبية',
        text: 'Periodization is organizing training into periods or phases, to reach the best performance and to manage training demands. Arabic sports-science writing uses different equivalents for it (some writers keep the English word), so use the term common in your field and stay consistent.',
        items: [
          { name: 'Preparatory period', ar: 'فترة الإعداد', text: 'The athlete builds the physical and technical base needed for competition.' },
          { name: 'Competitive period', ar: 'فترة المنافسات', text: 'The athlete takes part in competitions.' },
          { name: 'Transition period', ar: 'الفترة الانتقالية', text: 'Lighter training after the competitive season, for physical and psychological recovery.' }],
        points: ['Macrocycle: may cover a whole season or a major training period.', 'Mesocycle: a medium-length training block.', 'Microcycle: a short period, often about one week.'],
        terms: [['Periodization', 'تخطيط التدريب الدوري / الدورية التدريبية'], ['Macrocycle', 'دورة تدريبية كبرى'], ['Mesocycle', 'دورة تدريبية متوسطة'], ['Microcycle', 'دورة تدريبية صغرى']],
        ar: 'التخطيط الدوري هو تقسيم التدريب إلى فترات: فترة الإعداد، ثم فترة المنافسات، ثم الفترة الانتقالية للاستشفاء بعد الموسم. وتُقسَّم المدة إلى دورة كبرى (موسم كامل)، ودورة متوسطة، ودورة صغرى (أسبوع تقريبًا).' },

      { title: '5.13 Strength training', titleAr: 'تدريب القوة',
        text: 'Strength training is exercise that improves the muscles\' ability to produce force. Its common forms are resistance training, weight training, bodyweight training and circuit training.',
        terms: [['Strength training', 'تدريب القوة'], ['Resistance training', 'تدريب المقاومة'], ['Weight training', 'تدريب الأوزان'], ['Free weights', 'الأوزان الحرة'], ['Repetition', 'تكرار'], ['Set', 'مجموعة'],
          ['Rest interval', 'فترة الراحة'], ['Resistance', 'مقاومة'], ['Load', 'حمل'], ['One-repetition maximum (1RM)', 'الحد الأقصى لتكرار واحد']],
        ar: 'تدريب القوة يحسّن قدرة العضلات على إنتاج القوة، ومن أشكاله تدريب المقاومة وتدريب الأوزان والتدريب الدائري.' },

      { title: '5.14–5.17 Endurance, interval and circuit training, HIIT', titleAr: 'تدريب التحمل والتدريب المتقطع والتدريب الدائري',
        items: [
          { name: 'Endurance training', ar: 'تدريب التحمل', text: 'Improves the ability to keep up physical activity for a long time, for example through continuous training, interval training, long-distance running, cycling and swimming.' },
          { name: 'Interval training', ar: 'التدريب المتقطع / التدريب الفتري', text: 'Alternates fairly hard work with recovery or easier work.' },
          { name: 'Circuit training', ar: 'التدريب الدائري', text: 'A series of exercises done at different stations, usually with little rest between them. It can combine strength, endurance and coordination in one session.' },
          { name: 'High-Intensity Interval Training (HIIT)', ar: 'التدريب المتقطع عالي الشدة', text: 'Repeated bouts of fairly intense exercise with recovery in between; a popular way to improve cardiovascular fitness. Write the full term first, then keep the abbreviation HIIT.' }],
        terms: [['Work interval', 'فترة العمل'], ['Recovery interval', 'فترة الاستشفاء'], ['High-intensity interval', 'فترة عالية الشدة'], ['Active recovery', 'الاستشفاء النشط']],
        ar: 'تدريب التحمل يزيد قدرة الجسم على الاستمرار في النشاط، والتدريب المتقطع يبادل بين فترات عمل شديدة وفترات استشفاء، والتدريب الدائري سلسلة تمارين في محطات مختلفة براحة قليلة. وعند ترجمة HIIT نذكر المصطلح كاملًا أول مرة ثم نحتفظ بالاختصار.' },

      { title: '5.18 Warm-up, main phase and cool-down', titleAr: 'الإحماء والمرحلة الرئيسية والتهدئة',
        text: 'A training session is usually divided into stages:',
        items: [
          { name: 'Warm-up', ar: 'الإحماء', text: 'Raises body temperature, prepares the muscles and the cardiovascular system, and gets the body ready to move.' },
          { name: 'Main training phase', ar: 'المرحلة الرئيسية من التدريب', text: 'The core of the session, where its training objectives are achieved.' },
          { name: 'Cool-down', ar: 'التهدئة', text: 'Gradually lowers the exercise intensity and helps recovery.' }],
        ar: 'تبدأ الوحدة التدريبية بالإحماء لتهيئة الجسم، ثم المرحلة الرئيسية التي تتحقق فيها أهدافها، ثم التهدئة بخفض الشدة تدريجيًا.' },

      { title: '5.19 Fatigue and overtraining', titleAr: 'التعب وفرط التدريب',
        text: 'Training puts physiological stress on the body. Too much training without enough recovery can harm performance.',
        terms: [['Fatigue', 'التعب'], ['Excessive fatigue', 'التعب المفرط'], ['Overreaching', 'الإجهاد التدريبي الزائد'], ['Overtraining', 'فرط التدريب'], ['Overtraining syndrome', 'متلازمة فرط التدريب'], ['Performance decline', 'تراجع الأداء']],
        ar: 'التدريب الكثير بدون استشفاء كافٍ يؤدي إلى التعب المفرط وتراجع الأداء، وقد يصل إلى فرط التدريب.' },

      { title: '5.20–5.21 Tapering and training adaptation', titleAr: 'خفض الحمل قبل المنافسة والتكيف التدريبي',
        items: [
          { name: 'Tapering', ar: 'خفض الحمل التدريبي تدريجيًا / التخفيف التدريجي للتدريب', text: 'A planned cut in training volume before an important competition, while keeping a suitable intensity (for example a two-week taper). Here a descriptive translation can be better than an unnatural literal one.' },
          { name: 'Training adaptation', ar: 'التكيف التدريبي', text: 'Regular training changes the body so it performs better: more muscular strength, better aerobic capacity, more efficient movement, more endurance and better recovery.' }],
        terms: [['Physiological adaptation', 'التكيف الفسيولوجي'], ['Neuromuscular adaptation', 'التكيف العصبي العضلي'], ['Performance adaptation', 'التكيف المرتبط بالأداء'], ['Training effect', 'أثر التدريب']],
        ar: 'خفض الحمل تدريجيًا يعني تقليل حجم التدريب بشكل مخطط قبل منافسة مهمة مع الحفاظ على الشدة، والترجمة الوصفية هنا أفضل من الحرفية. أما التكيف فهو التغيرات التي يحدثها التدريب المنتظم في الجسم.' },

      { title: '5.22 Monitoring training', titleAr: 'مراقبة التدريب',
        text: 'Modern training follows how the athlete responds to it, using signs such as heart rate, perceived exertion, training volume and intensity, performance measures and recovery status.',
        terms: [['Training monitoring', 'مراقبة التدريب'], ['Performance monitoring', 'مراقبة الأداء'], ['Perceived exertion', 'الجهد المُدرَك'], ['Rating of Perceived Exertion (RPE)', 'مقياس الجهد المُدرَك'], ['Training status', 'الحالة التدريبية'], ['Recovery status', 'حالة الاستشفاء']],
        ar: 'يتابع المدربون استجابة الرياضي للتدريب عن طريق معدل ضربات القلب والجهد المُدرَك وبيانات الأداء وحالة الاستشفاء.' },

      { title: '5.23 Terms that are easy to confuse', titleAr: 'مصطلحات يسهل الخلط بينها',
        items: [
          { name: 'Exercise ≠ Training', ar: 'تمرين ≠ تدريب', text: 'An exercise is one specific physical activity; training is a systematic process that aims at an adaptation or a performance goal.' },
          { name: 'Load ≠ Intensity', ar: 'الحمل ≠ الشدة', text: 'Related, but two different dimensions of training.' },
          { name: 'Volume ≠ Duration', ar: 'الحجم ≠ المدة', text: 'Duration is how long an activity lasts; volume is the total amount of work.' },
          { name: 'Recovery ≠ Rest', ar: 'الاستشفاء ≠ الراحة', text: 'In sports science, recovery can be more than resting: it is the body\'s process of getting back to a recovered state.' },
          { name: 'Conditioning', ar: 'الإعداد البدني / التهيئة البدنية / التدريب البدني', text: 'The right Arabic equivalent depends on the context.' }],
        ar: 'التمرين نشاط محدد والتدريب عملية منظمة، والحمل غير الشدة، والحجم هو مجموع العمل أما المدة فهي طول الوقت، والاستشفاء أوسع من مجرد الراحة. وكلمة Conditioning تُترجم حسب السياق.' }
    ],
    sum: 'Sports training is a systematic process for improving physical, technical, tactical and psychological performance, built on five principles: specificity, overload, progression, individualization and recovery. The terms to master are load, intensity, volume, frequency, periodization, strength, endurance and interval training, conditioning, fatigue, recovery, adaptation and tapering, together with the pairs that are easy to mix up: training and exercise, load and intensity, volume and duration, rest and recovery. Key principle: understand the logic of training: workload brings fatigue, recovery brings adaptation, and systematic training leads to better performance.',
    sumAr: 'أهم ما يحتاجه المترجم هو فهم منطق التدريب: الحمل يسبب التعب، والاستشفاء يؤدي إلى التكيف، والتدريب المنظم يؤدي إلى تحسن الأداء.'
  });
})();
