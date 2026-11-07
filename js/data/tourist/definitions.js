/*
 * Tourist Translation: every definition in two versions.
 *   orig   = the text exactly as it appears in the lecture PDFs (shown first)
 *   def    = a short, easy version in plain words (shown on the "simple version" button, and used inside questions)
 *   simpleAr = the easy version in Arabic
 * Loaded after content.js / terms.js: it fills these fields on the existing items.
 */
(function () {
  var UN = window.UN = window.UN || {};
  var T = UN.T = UN.T || {};

  // Arabic translation of each ORIGINAL English definition (second button)
  var ORIG_AR = {
    'RD-dom': 'تعني السياحة الداخلية السفر داخل بلد السائح نفسه، فلا يعبر السياح الحدود الدولية ولا نقاط الدخول. وتُستخدم السياحة الداخلية للحد من الفقر وتحسين البنية التحتية ودفع النمو الاقتصادي وتوفير فرص العمل.',
    'RD-int': 'السفر خارج بلدك يحتاج إلى تأشيرة وجواز سفر، ويُسمى السياحة الدولية. فعلى سبيل المثال، إذا أردت استكشاف المملكة المتحدة قادمًا من سريلانكا فأنت بحاجة إلى وثائق لدخول بلد آخر.',
    'RD-bus': 'هذا النوع من السياح يسافر لحضور الاجتماعات والتجمعات الرسمية للمؤتمرات وغيرها. وتلعب سياحة الأعمال دورًا حيويًا في قطاع السياحة. وأحيانًا يبقى الناس خارج بيئتهم المعتادة لأكثر من عام لأغراض العمل، ويقضون إجازاتهم هناك. وتشمل الأنشطة العامة المرتبطة بسياحة الأعمال حضور الاجتماعات والتجمعات الرسمية والمؤتمرات والندوات وزيارة المعارض والأسواق التجارية وغيرها. وهذه السياحة ترفع القدرة الشرائية.',
    'RD-adv': 'سياحة المغامرات هي سفر الشخص من مكان إلى آخر بحثًا عن مغامرات وأنشطة جديدة. وهذا النوع من السياحة هو الأشهر بين السياح الشباب ومحبي استكشاف المناطق النائية. وهو يشجعنا على الخروج من منطقة الراحة بممارسة أنشطة مثل المشي في الجبال والتجديف والتسلق والغوص وغيرها. وتزداد شعبية سياحة المغامرات يومًا بعد يوم.',
    'RD-wild': 'سياحة الحياة البرية هي سفر الناس إلى أماكن مختلفة لمراقبة الحياة البرية من نباتات وحيوانات والتفاعل معها في بيئتها الطبيعية. والسفاري وزيارة مركز إنقاذ الحيوانات والسباحة مع الدلافين وغيرها أمثلة على سياحة الحياة البرية.',
    'RD-well': 'يتعافى السياح من مشكلاتهم الصحية بممارسة أنشطة بدنية أو روحية أو نفسية. وفي أنحاء العالم وجهات كثيرة مشهورة بتحسين الصحة، منها: منتجع تيمازكال الشاطئي في المكسيك، ورحلة الاستجمام البحرية في الكاريبي، ومعسكرات إنقاص الوزن وإزالة السموم في كاليفورنيا، ومعسكر المشي الجبلي واليوغا في كولورادو، ومنتجعات الينابيع الحارة والطب الصيني التقليدي في الصين. والأيورفيدا واليوغا والتأمل والبانتشاكارما وعلاج التجديد هي أقدم أساليب العلاج لتحسين الصحة وأفضل وسيلة لتطوير سياحة العافية.',
    'RD-pil': 'السياحة الدينية أو الروحية هي أن يقوم الشخص برحلة إلى أماكن أخرى لأسباب روحية أو دينية. وتساعد السياحة الروحية على دعم الأنشطة الثقافية المحلية والحرف اليدوية، وتوفر فرص عمل وإيرادات. والرحلات إلى القدس وبودغايا والحج وغيرها هي سياحة دينية أو روحية. وهذه الرحلة مشهورة منذ زمن بعيد، لكنها تحظى بشعبية بين كبار السن خاصة.',
    'RD-cul': 'السياحة الثقافية هي رحلة الشخص للتعلم والمشاركة في المهرجانات والطقوس والأنشطة الثقافية المحلية في أماكن أخرى. وهي أكثر من مجرد نشاط تجاري. وهذا النوع من السياحة يساعد على نشر ثقافة المجتمعات الأصلية وتقاليدها وتنوعها وثرائها إلى بقية العالم.',
    'RE-eti': 'الإتيكيت يعني القواعد المتعارف عليها للعلاقات الرسمية والسلوك الشخصي في المجتمع المهذب. ويشمل ميثاق السلوك الأخلاقي المتعلق بالممارسة المهنية أو التصرف بين أفراد المهنة في تعاملهم مع بعضهم.',
    'RE-dec': 'ومن الكلمات الأخرى المرتبطة بالإتيكيت: الوقار (decorum) الذي يوحي بالكرامة وإدراك ما يليق بشخص حسن التنشئة.',
    'RE-pro': '... واللياقة (propriety) التي تعني أعراف الأخلاق والذوق الحسن المتعارف عليها.',
    'RE-cou': 'يتميز الشخص المثقف بسلوك يُظهر الاحترام والمجاملة للجميع بغض النظر عن المنصب.',
    'RE-bus': 'الفرق الرئيسي بين إتيكيت العمل والإتيكيت الاجتماعي أن إتيكيت العمل لا يفرّق بين الجنسين ... ففي مكان العمل الرجال والنساء زملاء متساوون.',
    'RE-soc': '... بينما الإتيكيت الاجتماعي هو الإتيكيت التقليدي الذي فيه شهامة، مثل فتح الباب لسيدة.'
  };

  // For the Arabic glossary definitions: English translation of the PDF text, and the easy version in English
  var TERM_EN = {
    'Adventure tourism': ['Practising activities that involve a degree of risk.', 'Tourism with exciting activities that carry some risk.'],
    'Agrotourism': ['Tourism whose destination is nature and its beautiful scenery.', 'Tourism for enjoying nature and beautiful views.'],
    'Air express courier': ['A carrier of air mail.', 'A company that carries letters and parcels by plane, fast.'],
    'Air piracy': ['Hijacking an aircraft in order to threaten, pressure or blackmail.', 'Taking over a plane to threaten, force or blackmail people.'],
    'Airworthy': ['A description of an aircraft that is able and safe to fly.', 'A plane that is safe and ready to fly.'],
    'Actual flying time': ['The actual time spent flying in the air on a particular flight.', 'The time a plane really spends in the air.'],
    'Advance purchase excursion fare': ['A discounted ticket restricted by time, without the benefits of full-fare tickets.', 'A cheaper plane ticket, but you must book early and follow conditions.'],
    'Adjoining rooms': ['Two or more neighbouring rooms separated by a wall.', 'Rooms next to each other, with only a wall between them.'],
    'ADA room': ['A hotel room that meets the requirements of the American law for the care of people with disabilities.', 'A hotel room designed for people with disabilities.'],
    'Advance deposit': ['An amount paid in advance when booking or buying.', 'Money you pay before booking or buying.'],
    'Alumni rate': ['A reduced price given by shipping lines to those who used to work for them.', 'A cheaper price that shipping companies give to former employees.'],
    'Guest night': ['A night of stay spent by a guest.', 'One night that a guest sleeps in the hotel.'],
    'Continental breakfast': ['A breakfast that includes coffee and rolls, in hotels.', 'A light breakfast: coffee and bread.'],
    'Active holidays': ['A holiday full of activities and events; those who enjoy it practise various kinds of sport.', 'A holiday full of activities and sports.'],
    'Inclusive tour': ['A trip at one total price for all services such as accommodation and transport.', 'A trip with one price that covers everything: stay and transport.']
  };

  var SUBS = {
    'RD-dom': {
      orig: "Domestic tourism involves travelling in own country, and tourists don't cross international borders or entry points. Domestic tourism is used to minimize poverty, enhance infrastructure, boost the economy's growth and generation of employment.",
      def: "Travelling within your own country, without crossing international borders or entry points.",
      simpleAr: 'السفر داخل بلدك نفسه دون عبور الحدود الدولية أو نقاط الدخول.' },
    'RD-int': {
      orig: "Travel outside your country needs a visa and passport; it's called International tourism. For example, if you want to explore The UK from Srilanka, you need documents to enter another country.",
      def: "Travelling outside your own country; it needs a visa and a passport.",
      simpleAr: 'السفر خارج بلدك؛ ويحتاج إلى تأشيرة وجواز سفر.' },
    'RD-bus': {
      orig: "This kind of tourist, travelling to attend meetings, officially get together for conferences, etc. Business tourism plays a vital role in the tourism sector. Sometimes, people stay out of their typical environment for more than a year for business purposes and spend their vacations there. General activities related to business tourism include attending meetings, officially getting together, conferences, seminars, visiting exhibitions and trade fairs, etc. This tourism level up the purchasing power.",
      def: "Travelling to attend meetings, conferences, seminars, exhibitions and trade fairs.",
      simpleAr: 'السفر لحضور الاجتماعات والمؤتمرات والندوات والمعارض والأسواق التجارية.' },
    'RD-adv': {
      orig: "Adventure Tourism is a person's travel from one place to another to seek fresh adventures and activities. This form of tourism is most famous among young tourists and people who like to explore remote areas. It encourages us to come out of our comfort zone by undertaking activities like hiking, rafting, climbing, diving, etc. Adventure tourism popularity is increasing day by day.",
      def: "Travelling to seek new adventures and activities, such as hiking, rafting, climbing and diving.",
      simpleAr: 'السفر بحثًا عن مغامرات وأنشطة جديدة، مثل المشي في الجبال والتجديف والتسلق والغوص.' },
    'RD-wild': {
      orig: "Wildlife tourism is people's travel to different places for observing and interacting with wildlife, flora and fauna in their natural habitat. Safaris, visiting the animal rescue centre, swimming with dolphins, etc., are examples of wildlife tourism.",
      def: "Travelling to observe and interact with wildlife, plants and animals in their natural habitat.",
      simpleAr: 'السفر لمراقبة الحياة البرية من نباتات وحيوانات والتفاعل معها في بيئتها الطبيعية.' },
    'RD-well': {
      orig: "Tourists recover their health issues by doing physical, spiritual, or psychological activities. All around the world, there are plenty of destinations, which are popular to improve health. Mexico Temazcal Beach Resort Spa, Caribbean wellness cruise, California weight loss and detox retreats, Colorado Hiking and Mountain Yoga retreat, China hot spring Resorts TCM are the examples. Ayurveda, Yoga, Meditation, Panchakarma, Rejuvenation Therapy are the oldest Therapy of treatments to improve health and the best way to develop wellness tourism.",
      def: "Travelling to improve health through physical, spiritual or psychological activities.",
      simpleAr: 'السفر لتحسين الصحة من خلال أنشطة بدنية أو روحية أو نفسية.' },
    'RD-pil': {
      orig: "Pilgrimage or spiritual tourism is when a person undertakes the journey to other places for spiritual or religious reasons. Spiritual tourism helps provide support to local cultural activities and handicrafts, generating employment and revenue. Trips to Jerusalem, Bodh Gaya, Hajj, etc., are pilgrimage or spiritual tourism. This tour is famous for ages, but It's popular among older people mainly.",
      def: "Travelling to other places for spiritual or religious reasons.",
      simpleAr: 'السفر إلى أماكن أخرى لأسباب روحية أو دينية.' },
    'RD-cul': {
      orig: "Cultural tourism is a person's journey to learn and participate in local festivals, rituals, and cultural activities of other places. It's more than a commercial activity. This form of tourism helps spread the culture, traditions, diversity and richness of aboriginal communities to the rest of the world.",
      def: "Travelling to learn about and take part in local festivals, rituals and cultural activities.",
      simpleAr: 'السفر للتعلم والمشاركة في المهرجانات والطقوس والأنشطة الثقافية المحلية.' },
    'RE-eti': {
      orig: "Etiquette means conventionally accepted rules for formal relations and personal behaviour in polite society. It includes the code of ethical behaviour in relation to professional practice or action among members of a profession in dealing with each other.",
      def: "Accepted rules of polite behaviour in formal and professional relations.",
      simpleAr: 'قواعد متعارف عليها للسلوك المهذب في العلاقات الرسمية والمهنية.' },
    'RE-dec': {
      orig: "Other words associated with etiquette are decorum, which suggests dignity and a sense of what is appropriate for a person of good breeding.",
      def: "Dignified behaviour that is appropriate for the situation.",
      simpleAr: 'سلوك وقور يليق بالموقف.' },
    'RE-pro': {
      orig: "... and propriety, which implies established conventions of morals and good taste.",
      def: "Following accepted morals and good taste.",
      simpleAr: 'الالتزام بالأخلاق المتعارف عليها والذوق الحسن.' },
    'RE-cou': {
      orig: "A cultivated person is marked by behaviour that shows respect and courtesy to everyone, regardless of position.",
      def: "Showing respect and politeness to everyone, whatever their position.",
      simpleAr: 'إظهار الاحترام والمجاملة للجميع مهما كان منصبهم.' },
    'RE-bus': {
      orig: "The main difference between business etiquette and social etiquette is that business etiquette is genderless ... In the workplace, men and women are peers.",
      def: "Etiquette at work: it is genderless, because men and women are peers.",
      simpleAr: 'الإتيكيت في العمل: لا يفرّق بين الجنسين لأن الرجال والنساء زملاء متساوون.' },
    'RE-soc': {
      orig: "... while social etiquette is the traditional chivalrous etiquette of holding the door open for a woman.",
      def: "Traditional chivalrous manners in social life, such as holding the door open for a woman.",
      simpleAr: 'آداب تقليدية فيها شهامة في الحياة الاجتماعية، مثل فتح الباب لسيدة.' }
  };

  // Glossary terms that came with an Arabic definition in the PDFs (orig = PDF text; def = easier Arabic)
  var TERMS = {
    'Adventure tourism': 'سياحة فيها نشاطات مثيرة وفيها شيء من المخاطرة',
    'Agrotourism': 'سياحة هدفها الاستمتاع بالطبيعة والمناظر الجميلة',
    'Air express courier': 'ناقل يوصل المراسلات البريدية بالطائرة بسرعة',
    'Air piracy': 'خطف طائرة لتهديد الناس أو الضغط عليهم أو ابتزازهم',
    'Airworthy': 'طائرة آمنة وصالحة للطيران',
    'Actual flying time': 'الوقت الذي تقضيه الطائرة في الجو فعلًا',
    'Advance purchase excursion fare': 'تذكرة طيران أرخص، لكن عليك أن تحجزها مبكرًا ولها شروط',
    'Adjoining rooms': 'غرف متجاورة يفصل بينها حائط فقط',
    'ADA room': 'غرفة فندقية مجهزة لتناسب ذوي الإعاقة',
    'Advance deposit': 'مبلغ تدفعه قبل الحجز أو الشراء',
    'Alumni rate': 'سعر مخفض تعطيه شركات النقل البحري لمن عمل فيها',
    'Guest night': 'ليلة واحدة ينامها النزيل في الفندق',
    'Continental breakfast': 'إفطار خفيف يشمل القهوة والخبز (الرولز)',
    'Active holidays': 'إجازة مليئة بالأنشطة والرياضة',
    'Inclusive tour': 'رحلة بسعر واحد يشمل كل الخدمات: الإقامة والمواصلات'
  };

  // fields used by the UI:  orig (+origLang), def = easy version, origOther = translation of the original, defOther = easy version in the other language
  (T.subs || []).forEach(function (x) {
    var d = SUBS[x.id];
    if (!d) return;
    x.orig = d.orig; x.origLang = 'en'; x.def = d.def;
    x.origOther = ORIG_AR[x.id]; x.defOther = d.simpleAr;
  });
  (T.terms || []).forEach(function (t) {
    if (!t.def) return;
    t.orig = t.def; t.origLang = 'ar';
    t.def = TERMS[t.en] || t.def;
    var en = TERM_EN[t.en];
    if (en) { t.origOther = en[0]; t.defOther = en[1]; }
  });
})();
