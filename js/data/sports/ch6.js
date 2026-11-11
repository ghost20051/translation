/* Sports Translation, chapter 6: "Sports Injuries, Prevention, and Rehabilitation".
   A summary topic by topic in English, the Arabic equivalent the chapter gives for each key term, and a short line in Arabic
   under each topic. Summaries only: this subject has no questions. */
(function () {
  var UN = window.UN = window.UN || {};
  var P = UN.SP = UN.SP || { chapters: [] };

  P.chapters.push({
    g: 'c6', n: 6,
    en: 'Ch. 6: Sports injuries', short: 'الفصل 6: الإصابات الرياضية',
    title: 'Chapter 6: Sports Injuries, Prevention, and Rehabilitation', titleAr: 'الفصل السادس: الإصابات الرياضية والوقاية منها وإعادة التأهيل',
    intro: 'Sports-injury texts mix anatomy, physiology, medicine and therapy, so they need very precise terms. Words such as sprain, strain, fracture, dislocation, inflammation, rehabilitation and recovery may look alike in everyday language, but each has an exact meaning in sports medicine. The chapter covers the main types of injuries, their causes and symptoms, prevention, treatment and rehabilitation, and how to translate their terms.',
    introAr: 'نصوص الإصابات الرياضية تجمع بين التشريح ووظائف الأعضاء والطب والعلاج، لذلك تحتاج دقة عالية في المصطلحات، فكلمات مثل sprain وstrain وfracture قد تتشابه في اللغة العامة لكن لكل منها معنى محدد في الطب الرياضي.',
    topics: [
      { title: '6.2 What a sports injury is', titleAr: 'مفهوم الإصابة الرياضية',
        text: 'A sports injury happens while taking part in physical activity, exercise, training or competitive sport. It can affect muscles, bones, joints, ligaments, tendons or other body tissues.',
        terms: [['Sports injury / athletic injury', 'إصابة رياضية'], ['Traumatic injury', 'إصابة رضّية'], ['Tissue damage', 'تلف الأنسجة'], ['Injury prevention', 'الوقاية من الإصابات'], ['Injury treatment', 'علاج الإصابات']],
        ar: 'الإصابة الرياضية هي أي إصابة تحدث أثناء ممارسة النشاط البدني أو التدريب أو المنافسة، وقد تصيب العضلات أو العظام أو المفاصل أو الأربطة أو الأوتار.' },

      { title: '6.3 Kinds of injuries', titleAr: 'أنواع الإصابات',
        items: [
          { name: 'Acute injury', ar: 'إصابة حادة', text: 'Happens suddenly, usually because of one specific event: for example an ankle sprain, a muscle strain, a fracture, a dislocation or a concussion.' },
          { name: 'Chronic injury', ar: 'إصابة مزمنة', text: 'Develops gradually over time, often from repeated stress or poor recovery: for example tendinopathy, stress injuries and repetitive strain injuries.' },
          { name: 'Overuse injury', ar: 'إصابة ناتجة عن فرط الاستخدام / إصابة فرط الاستخدام / إصابة ناتجة عن الإفراط في الاستخدام', text: 'Repeated physical stress goes beyond what the body can recover from and adapt to: for example tendinopathy, stress fractures and repetitive strain injuries. A sudden jump in training volume raises the risk.' }],
        ar: 'الإصابة الحادة تحدث فجأة بسبب موقف محدد، والمزمنة تتطور تدريجيًا مع الوقت، وإصابة فرط الاستخدام تحدث عندما يزيد الضغط المتكرر على قدرة الجسم على الاستشفاء والتكيف.' },

      { title: '6.4–6.5 Sprain and strain', titleAr: 'الالتواء والشد العضلي',
        text: 'This is one of the most important distinctions in the chapter: a sprain is an injury to a ligament, a strain is an injury to a muscle or a tendon.',
        items: [
          { name: 'Sprain', ar: 'التواء / التواء رباطي', text: 'An injury to a LIGAMENT, usually from overstretching or tearing. Common in the ankle, knee and wrist.' },
          { name: 'Strain', ar: 'شدّ عضلي / تمزق عضلي (بحسب السياق)', text: 'An injury to a MUSCLE or TENDON, usually from overstretching or a forceful contraction. The right Arabic depends on how severe it is and on the context, so do not use تمزق for every "strain".' }],
        terms: [['Sprain: a ligament injury', 'إصابة في الرباط'], ['Strain: a muscle or tendon injury', 'إصابة في العضلة أو الوتر'], ['Hamstring strain', 'شدّ في العضلات المأبضية']],
        ar: 'أهم فرق في الفصل: sprain إصابة في الرباط (التواء)، وstrain إصابة في العضلة أو الوتر، وتُترجم شدًّا أو تمزقًا حسب شدتها وسياقها.' },

      { title: '6.6–6.7 Fractures and dislocations', titleAr: 'الكسور والخلع',
        items: [
          { name: 'Fracture', ar: 'كسر', text: 'A break or crack in a bone.' },
          { name: 'Dislocation', ar: 'خلع', text: 'The bones that form a joint are pushed out of their normal position. Common in the shoulder, elbow, finger and knee.' }],
        terms: [['Simple fracture', 'كسر بسيط'], ['Compound / open fracture', 'كسر مفتوح'], ['Closed fracture', 'كسر مغلق'], ['Stress fracture', 'كسر إجهادي'], ['Hairline fracture', 'كسر شعري']],
        ar: 'الكسر انكسار أو شرخ في العظم وله أنواع (بسيط، ومفتوح، ومغلق، وإجهادي، وشعري)، والخلع هو خروج عظام المفصل من وضعها الطبيعي.' },

      { title: '6.8–6.9 Tendon and ligament injuries', titleAr: 'إصابات الأوتار والأربطة',
        text: 'Tendons connect muscles to bones; they can be hurt by a sudden blow or by repeated loading. Ligaments connect bones to each other and keep joints stable; their injuries include sprains, partial or complete tears and ruptures.',
        points: ['Tendinitis and tendinopathy should not automatically be treated as exact synonyms: current medical usage may treat tendinopathy as the broader term for tendon disorders.',
          'The ACL is one of the main ligaments that stabilize the knee. ACL injuries are common in sports with sudden changes of direction.'],
        terms: [['Tendon', 'وتر'], ['Tendon injury', 'إصابة الوتر'], ['Tendinitis', 'التهاب الوتر'], ['Tendinopathy', 'اعتلال الوتر'], ['Achilles tendon', 'وتر أخيل'], ['Tendon rupture', 'تمزق الوتر'],
          ['Ligament', 'رباط'], ['Ligament injury', 'إصابة الرباط'], ['Ligament sprain', 'التواء الرباط'], ['Ligament tear / ligament rupture', 'تمزق الرباط'], ['Anterior cruciate ligament (ACL)', 'الرباط الصليبي الأمامي']],
        ar: 'الوتر يربط العضلة بالعظم، والرباط يربط العظام ببعضها ويثبّت المفصل. ولا نعامل tendinitis وtendinopathy كمترادفين تمامًا، فالثاني مصطلح أوسع. والرباط الصليبي الأمامي من أهم أربطة الركبة.' },

      { title: '6.10–6.11 Muscle injuries and muscle soreness', titleAr: 'الإصابات العضلية والألم العضلي',
        text: 'Muscle injuries can come from overstretching, a sudden contraction, a direct blow, fatigue, poor preparation or too much training load. Muscle soreness is not the same as a muscle injury: delayed onset muscle soreness (DOMS) is the soreness that shows up after unfamiliar or hard exercise.',
        terms: [['Muscle injury', 'إصابة عضلية'], ['Muscle strain', 'شدّ عضلي'], ['Muscle tear', 'تمزق عضلي'], ['Muscle rupture', 'تمزق عضلي شديد'], ['Muscle soreness', 'ألم عضلي / ألم العضلات'], ['Muscle damage', 'تلف عضلي'],
          ['Muscle spasm', 'تشنج عضلي'], ['Delayed Onset Muscle Soreness (DOMS)', 'ألم العضلات المتأخر الظهور']],
        ar: 'للإصابة العضلية أسباب منها الإطالة الزائدة والانقباض المفاجئ والضربة المباشرة والتعب. ويجب التفريق بين الألم العضلي والإصابة العضلية، ومن الألم العضلي ما يظهر متأخرًا بعد تمرين شاق أو غير معتاد.' },

      { title: '6.12 Concussion', titleAr: 'ارتجاج الدماغ',
        items: [
          { name: 'Concussion', ar: 'ارتجاج الدماغ', text: 'A form of traumatic brain injury caused by a blow or force that affects the head and brain. Possible signs are headache, dizziness, confusion, nausea, balance problems and sensitivity to light. An athlete who may have one should be taken out of play and medically evaluated.' }],
        ar: 'الارتجاج إصابة دماغية رضّية تنتج عن ضربة في الرأس، ومن أعراضه الصداع والدوخة والارتباك والغثيان، والرياضي المشتبه في إصابته يُخرج من اللعب ويخضع لتقييم طبي.' },

      { title: '6.13 Causes of injuries', titleAr: 'أسباب الإصابات',
        items: [
          { name: 'Intrinsic factors', text: 'Linked to the athlete: muscle weakness, poor flexibility, a previous injury, fatigue, inadequate conditioning, poor movement mechanics.' },
          { name: 'Extrinsic factors', text: 'External: unsuitable equipment, unsafe playing surfaces, environmental conditions, too much training load, inadequate supervision.' }],
        terms: [['Risk factor', 'عامل خطر'], ['Injury risk', 'خطر الإصابة'], ['Previous injury', 'إصابة سابقة'], ['Training error', 'خطأ تدريبي'], ['Poor technique', 'أسلوب أداء غير سليم'], ['Unsafe environment', 'بيئة غير آمنة']],
        ar: 'أسباب الإصابة نوعان: أسباب تخص الرياضي نفسه مثل ضعف العضلات وقلة المرونة والإصابة السابقة والتعب، وأسباب من خارجه مثل المعدات غير المناسبة وأرضية اللعب غير الآمنة والحمل التدريبي الزائد.' },

      { title: '6.14 Injury prevention', titleAr: 'الوقاية من الإصابات',
        text: 'Prevention means steps that lower the risk and the severity of injuries. A complete prevention program deals both with the risk factors that can be changed and with the way training is done. The main measures:',
        points: ['Proper warm-up', 'Suitable training progression', 'Enough recovery', 'Correct technique', 'Suitable equipment', 'Strength and conditioning', 'Flexibility and mobility work', 'Enough hydration and good nutrition', 'Monitoring training load'],
        ar: 'الوقاية تقلل خطر الإصابة وشدتها، وأهم وسائلها: الإحماء الجيد، والتدرج في التدريب، والاستشفاء الكافي، والأداء الصحيح، والمعدات المناسبة، وتمارين القوة والمرونة، والتغذية الجيدة، ومراقبة الحمل التدريبي.' },

      { title: '6.15–6.16 First aid and treatment', titleAr: 'الإسعافات الأولية والعلاج',
        text: 'Right after an injury, the aim is to protect the athlete and prevent more damage. Medical terms need special care here, because a wrong translation can change how professional instructions are understood. Treatment then depends on the type and severity of the injury: medical treatment, physical therapy, therapeutic exercise, medication, immobilization or surgery.',
        terms: [['First aid', 'الإسعافات الأولية'], ['Initial assessment', 'التقييم الأولي'], ['Injury assessment', 'تقييم الإصابة'], ['Emergency care', 'الرعاية الطارئة'], ['Immobilization', 'تثبيت الجزء المصاب / التثبيت'], ['Medical evaluation', 'التقييم الطبي'],
          ['Treatment', 'العلاج'], ['Medical treatment', 'العلاج الطبي'], ['Physical therapy', 'العلاج الطبيعي'], ['Therapeutic exercise', 'التمرينات العلاجية'], ['Surgery', 'الجراحة'], ['Surgical intervention', 'التدخل الجراحي'], ['Pain management', 'تدبير الألم']],
        ar: 'الهدف الأول بعد الإصابة حماية الرياضي ومنع زيادة الضرر، ثم يأتي العلاج حسب نوع الإصابة وشدتها. والدقة في ترجمة المصطلحات الطبية ضرورية لأن الخطأ قد يغيّر فهم التعليمات.' },

      { title: '6.17–6.19 Rehabilitation and return to play', titleAr: 'إعادة التأهيل والعودة إلى اللعب',
        text: 'Rehabilitation is the process of restoring physical function after an injury or illness: strength, flexibility, mobility, balance, coordination, functional movement and sport-specific performance. Programs differ with the injury and the person, but they generally go through five stages:',
        points: ['1. Protection and initial recovery: protect the injured area and manage the symptoms.',
          '2. Restoring mobility: gradually get back normal movement and range of motion.',
          '3. Building strength: exercises to rebuild muscle strength and capacity.',
          '4. Functional training: movements that resemble what the sport demands.',
          '5. Return to sport: gradually go back to sport activities after meeting functional criteria.',
          'Return to play is the process of safely bringing an athlete back to participation after injury. It is more than just saying the athlete has "recovered": the athlete should first meet specific functional criteria.'],
        terms: [['Rehabilitation', 'إعادة التأهيل'], ['Range of motion', 'مدى الحركة'], ['Return to sport', 'العودة إلى ممارسة الرياضة'], ['Return to play', 'العودة إلى اللعب'], ['Recovery', 'الاستشفاء / التعافي'], ['Functional recovery', 'التعافي الوظيفي'],
          ['Mobility', 'القدرة على الحركة / الحركة'], ['Flexibility', 'المرونة'], ['Strength', 'القوة'], ['Balance', 'التوازن'], ['Coordination', 'التوافق'], ['Functional exercise', 'التمرينات الوظيفية']],
        ar: 'إعادة التأهيل عملية لاستعادة وظائف الجسم بعد الإصابة، وتمر عادة بخمس مراحل: الحماية، ثم استعادة مدى الحركة، ثم بناء القوة، ثم التدريب الوظيفي، ثم العودة إلى الرياضة. والعودة إلى اللعب مرحلة لها معايير محددة، وليست مجرد قول إن الرياضي تعافى.' },

      { title: '6.21 Terms that are easy to confuse', titleAr: 'مصطلحات يسهل الخلط بينها',
        items: [
          { name: 'Sprain ≠ Strain', ar: 'إصابة أو التواء في الرباط ≠ إصابة أو شدّ في العضلة أو الوتر', text: 'Perhaps the most important distinction in sports-injury terms.' },
          { name: 'Injury ≠ Pain', ar: 'إصابة ≠ ألم', text: 'Not the same: an athlete may feel pain without any specific structural injury being found.' },
          { name: 'Recovery ≠ Rehabilitation', ar: 'الاستشفاء / التعافي ≠ إعادة التأهيل', text: 'Rehabilitation is a structured process to restore function; recovery is a broader process.' },
          { name: 'Treatment ≠ Rehabilitation', ar: 'العلاج ≠ إعادة التأهيل', text: 'Treatment deals with the injury itself; rehabilitation focuses on restoring function and getting the person ready to return to normal or sporting activity.' },
          { name: 'Tear and rupture', text: 'Both mean tissue damage, but their exact sense depends on the tissue and the medical context, so check the context instead of always writing تمزق.' }],
        ar: 'الفروق المهمة: sprain للرباط وstrain للعضلة أو الوتر، والإصابة غير الألم، وإعادة التأهيل عملية منظمة أضيق من الاستشفاء، والعلاج يتعامل مع الإصابة نفسها بينما إعادة التأهيل تستعيد الوظيفة.' },

      { title: '6.22 How to translate injury texts', titleAr: 'خطوات ترجمة نصوص الإصابات',
        points: ['Identify the injured structure: muscle, tendon, ligament, bone, joint, nerve or brain.',
          'Identify the type of injury: sprain, strain, fracture, dislocation, tear, inflammation or overuse injury.',
          'Tell general language from medical language: a popular sports article uses easy words, a medical report uses exact clinical terms.',
          'Keep your terms consistent: once you choose an equivalent, use it throughout the text.',
          'Keep the professional register: medical and rehabilitation texts need an objective, precise and formal style.'],
        ar: 'حدد أولًا الجزء المصاب ثم نوع الإصابة، وفرّق بين لغة المقال الصحفي ولغة التقرير الطبي، والتزم بالمصطلح نفسه طوال النص، وحافظ على الأسلوب العلمي الرسمي.' }
    ],
    sum: 'Injury texts combine anatomy, physiology, medicine, physical therapy and sports science. The key terms are sprain, strain, fracture, dislocation, ligament, tendon, muscle injury, overuse injury, rehabilitation, recovery, return to play and injury prevention. Keep the close pairs apart: a sprain is mainly a ligament injury while a strain involves a muscle or tendon, rehabilitation is not just recovery, and return to play is one specific stage of going back to sport. Key principle: accuracy needs anatomical and medical knowledge: find the injured structure, understand the injury, and choose terms that fit the clinical and sporting context.',
    sumAr: 'الدقة في ترجمة الإصابات تحتاج معرفة تشريحية وطبية: حدد الجزء المصاب، وافهم طبيعة الإصابة، واختر المصطلح المناسب للسياق الطبي والرياضي.'
  });
})();
