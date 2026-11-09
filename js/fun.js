/* Light-hearted one-liners shown after answers and results, to make revising less heavy.
   Never shown during an exam. They only encourage; they never change a score. */
(function () {
  var UN = window.UN = window.UN || {};
  var last = {};

  var Q = {
    en: {
      correct: ['Boom! 💥 Your brain just did a little dance.', 'Correct! Somewhere, a professor is smiling. 😄', 'Nailed it! 🎯 Cookie for you. 🍪', 'Yes! You make this look easy. 😎', 'Right! Your memory is on fire. 🔥', 'Ding ding ding! 🔔 That one is yours.', 'Perfect! Interpreters would hire you. 🎧'],
      partly: ['So close! 🤏 Your brain is warming up.', 'Almost there. One more tiny push! 💪', 'Half the credit, double the potential. 😉'],
      wrong: ['Oops! 🙈 Even great interpreters pause sometimes.', 'Not this time. Mistakes are free brain training. 🧠', 'Whoops! Read the answer once, and it will stick. 📌', 'Plot twist! 🎬 Now you will never forget it.', 'No worries. Your brain just saved a note for later. 📝', 'Missed! Even coffee needs a second cup. ☕']
    },
    ar: {
      correct: ['برافو! 💥 مخك عمل رقصة صغيرة.', 'صح! 😄 دكتورك ابتسم دلوقتي.', 'ضربت في الجول! 🎯 تستاهل بسكوتة. 🍪', 'إجابة صح! شكلك بتذاكر بنفس مرتاحة. 😎', 'ممتاز! ذاكرتك نار. 🔥', 'دينج دينج! 🔔 النقطة دي بتاعتك.', 'تحفة! أي مترجم هيشغّلك. 🎧'],
      partly: ['قربت أوي! 🤏 مخك لسه بيسخّن.', 'شوية كمان وتوصل! 💪', 'نص الدرجة، وضعف الإمكانيات. 😉'],
      wrong: ['أوبس! 🙈 حتى أحسن مترجم بيقف شوية.', 'المرة دي لأ. الغلطة تدريب مجاني للمخ. 🧠', 'ولا يهمك! اقرا الإجابة مرة وهتثبت. 📌', 'تحوّل درامي! 🎬 دلوقتي مش هتنساها أبدًا.', 'عادي. مخك سجّل ملاحظة للمرة الجاية. 📝', 'فاتتك! حتى القهوة محتاجة فنجان تاني. ☕']
    }
  };
  var END = {
    en: { top: ['Legend! 🏆 Take a bow.', 'Flawless! 🎉 Show-off. (We love it.)'], good: ['Nice work! 👏 Almost a pro.', 'Solid! 💪 Keep this rhythm.'], low: ['Good start! 🌱 Every expert was once a beginner.', 'Tough round, but you now know what to review. 🔍'] },
    ar: { top: ['أسطورة! 🏆 اتفضّل التحية.', 'مفيش غلطة! 🎉 بتستعرض؟ (وإحنا بنحب كده).'], good: ['شغل حلو! 👏 قربت تبقى محترف.', 'ثابت! 💪 كمّل على نفس الإيقاع.'], low: ['بداية كويسة! 🌱 كل خبير كان مبتدئ.', 'جولة صعبة، بس دلوقتي عرفت إيه اللي تراجعه. 🔍'] }
  };

  function lang() { try { return UN.store.get() && UN.store.get().lang === 'ar' ? 'ar' : 'en'; } catch (e) { return 'en'; } }
  function pickFresh(list, key) {
    if (list.length === 1) return list[0];
    var i; do { i = Math.floor(Math.random() * list.length); } while (i === last[key]);
    last[key] = i; return list[i];
  }

  UN.fun = {
    // one line after a game answer. v: 1 correct, 0 < v < 1 partly, 0 wrong
    answer: function (v) {
      var kind = v >= 0.99 ? 'correct' : v > 0 ? 'partly' : 'wrong';
      return pickFresh(Q[lang()][kind], kind);
    },
    // one line for a score in percent (0 to 100)
    band: function (pct) {
      var k = pct >= 100 ? 'top' : pct >= 60 ? 'good' : 'low';
      return pickFresh(END[lang()][k], 'end' + k);
    }
  };
})();
