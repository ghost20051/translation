/* Sound effects: every sound is synthesised in the browser with the Web Audio API.
   No audio files, no network, works offline. Sound is on by default and can be muted with the speaker button. */
(function () {
  var UN = window.UN = window.UN || {};
  var KEY = 'unrev-sfx', MASTER = 0.5;
  var ctx = null, master = null, enabled = true, last = {};

  try { enabled = localStorage.getItem(KEY) !== 'off'; } catch (e) { /* storage may be blocked */ }

  // note name -> frequency
  var N = { C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392, A4: 440, B4: 493.88, C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99, A5: 880, C6: 1046.5, E6: 1318.5, G3: 196, E3: 164.81, C3: 130.81 };

  // one shaped tone: attack/decay envelope, optional pitch glide
  function tone(c, out, o) {
    var osc = c.createOscillator(), g = c.createGain(), t0 = c.currentTime + (o.at || 0), dur = o.dur || 0.15, peak = o.vol == null ? 0.5 : o.vol;
    osc.type = o.type || 'sine';
    osc.frequency.setValueAtTime(o.f, t0);
    if (o.to) osc.frequency.exponentialRampToValueAtTime(o.to, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(peak, t0 + (o.atk || 0.01));
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g); g.connect(out);
    osc.start(t0); osc.stop(t0 + dur + 0.02);
  }
  // short burst of filtered noise (swish / thud texture)
  function noise(c, out, o) {
    var len = Math.max(1, Math.floor(c.sampleRate * o.dur)), buf = c.createBuffer(1, len, c.sampleRate), d = buf.getChannelData(0);
    for (var i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1);
    var src = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain(), t0 = c.currentTime + (o.at || 0);
    src.buffer = buf; f.type = o.filter || 'bandpass'; f.frequency.setValueAtTime(o.f, t0);
    if (o.to) f.frequency.exponentialRampToValueAtTime(o.to, t0 + o.dur);
    g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(o.vol || 0.3, t0 + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t0 + o.dur);
    src.connect(f); f.connect(g); g.connect(out); src.start(t0);
  }

  var R = {
    tick: function (c, o) { tone(c, o, { f: 1400, to: 900, dur: 0.04, vol: 0.2, type: 'triangle', atk: 0.003 }); },
    flip: function (c, o) { noise(c, o, { f: 600, to: 3200, dur: 0.16, vol: 0.6 }); },
    correct: function (c, o) {
      tone(c, o, { f: N.E5, dur: 0.14, vol: 0.4, type: 'triangle' });
      tone(c, o, { f: N.A5, at: 0.09, dur: 0.28, vol: 0.4, type: 'triangle' });
      tone(c, o, { f: N.E6, at: 0.09, dur: 0.2, vol: 0.08 });
    },
    partly: function (c, o) { tone(c, o, { f: N.G4, dur: 0.12, vol: 0.35, type: 'triangle' }); tone(c, o, { f: N.G4, at: 0.14, dur: 0.18, vol: 0.3, type: 'triangle' }); },
    wrong: function (c, o) {
      tone(c, o, { f: 220, to: 130, dur: 0.32, vol: 0.28, type: 'sawtooth', atk: 0.02 });
      tone(c, o, { f: 110, to: 70, dur: 0.34, vol: 0.3, type: 'square', atk: 0.02 });
    },
    pair: function (c, o) { tone(c, o, { f: N.C5, dur: 0.1, vol: 0.4, type: 'triangle' }); tone(c, o, { f: N.G5, at: 0.07, dur: 0.22, vol: 0.4, type: 'triangle' }); },
    miss: function (c, o) { noise(c, o, { f: 220, dur: 0.14, vol: 0.5, filter: 'lowpass' }); tone(c, o, { f: 150, to: 90, dur: 0.14, vol: 0.3, type: 'sine' }); },
    coin: function (c, o) { tone(c, o, { f: N.B4 * 2, dur: 0.07, vol: 0.3, type: 'square', atk: 0.004 }); tone(c, o, { f: N.E6, at: 0.07, dur: 0.3, vol: 0.28, type: 'square', atk: 0.004 }); },
    win: function (c, o) {
      [N.C5, N.E5, N.G5, N.C6].forEach(function (f, i) { tone(c, o, { f: f, at: i * 0.11, dur: 0.22, vol: 0.4, type: 'triangle' }); });
      [N.C5, N.E5, N.G5].forEach(function (f) { tone(c, o, { f: f, at: 0.5, dur: 0.7, vol: 0.22, type: 'triangle' }); });
      tone(c, o, { f: N.C6 * 2, at: 0.5, dur: 0.5, vol: 0.06 });
    },
    lose: function (c, o) {
      [N.G4, N.F4, N.E4, N.C4].forEach(function (f, i) { tone(c, o, { f: f, to: f * 0.96, at: i * 0.2, dur: i === 3 ? 0.7 : 0.22, vol: 0.32, type: 'sawtooth', atk: 0.02 }); });
    },
    done: function (c, o) { [N.E5, N.G5, N.C6].forEach(function (f, i) { tone(c, o, { f: f, at: i * 0.1, dur: 0.24, vol: 0.34, type: 'triangle' }); }); },
    ach: function (c, o) {
      [N.C5, N.E5, N.G5, N.C6, N.E6].forEach(function (f, i) { tone(c, o, { f: f, at: i * 0.07, dur: 0.3, vol: 0.28, type: 'triangle' }); });
      tone(c, o, { f: N.C6, at: 0.4, dur: 0.6, vol: 0.2 });
    },
    finish: function (c, o) { tone(c, o, { f: N.G4, dur: 0.2, vol: 0.32, type: 'triangle' }); tone(c, o, { f: N.C5, at: 0.18, dur: 0.4, vol: 0.32, type: 'triangle' }); },
    // sounds used by the explainer videos
    whoosh: function (c, o) { noise(c, o, { f: 250, to: 2800, dur: 0.3, vol: 0.4 }); },
    pop: function (c, o) { tone(c, o, { f: 520, to: 780, dur: 0.09, vol: 0.3, type: 'sine', atk: 0.004 }); },
    blip: function (c, o) { tone(c, o, { f: 880, dur: 0.08, vol: 0.2, type: 'triangle', atk: 0.004 }); },
    blipLow: function (c, o) { tone(c, o, { f: 440, dur: 0.1, vol: 0.2, type: 'triangle', atk: 0.004 }); },
    ding: function (c, o) { tone(c, o, { f: 1319, dur: 0.45, vol: 0.24, type: 'sine' }); tone(c, o, { f: 2637, at: 0.01, dur: 0.25, vol: 0.06 }); },
    boing: function (c, o) { tone(c, o, { f: 170, to: 540, dur: 0.24, vol: 0.3, type: 'sine', atk: 0.01 }); },
    sparkle: function (c, o) { [1568, 2093, 2637].forEach(function (f, i) { tone(c, o, { f: f, at: i * 0.05, dur: 0.14, vol: 0.14, type: 'sine' }); }); },
    time: function (c, o) { tone(c, o, { f: 880, dur: 0.06, vol: 0.25, type: 'square', atk: 0.004 }); tone(c, o, { f: 880, at: 0.12, dur: 0.06, vol: 0.25, type: 'square', atk: 0.004 }); }
  };

  function audio() {
    if (ctx) return ctx;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    try {
      ctx = new AC(); master = ctx.createGain(); master.gain.value = MASTER;
      var comp = ctx.createDynamicsCompressor(); master.connect(comp); comp.connect(ctx.destination);
    } catch (e) { ctx = null; }
    return ctx;
  }

  function play(name) {
    if (!enabled || !R[name]) return;
    var now = Date.now();
    if (last[name] && now - last[name] < 60) return;   // never stack the same sound
    last[name] = now;
    try {
      var c = audio(); if (!c) return;
      if (c.state === 'suspended') c.resume();
      R[name](c, master);
    } catch (e) { /* sound is optional */ }
  }

  function setEnabled(on) {
    enabled = !!on;
    try { localStorage.setItem(KEY, enabled ? 'on' : 'off'); } catch (e) { /* ignore */ }
    if (enabled) play('coin');
  }

  // Render a sound without speakers (used by tests): returns its peak level and length in seconds.
  // delay > 0 starts the sound part-way through the timeline, like a real page that has been open for a while.
  function measure(name, delay) {
    var OC = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    if (!OC || !R[name]) return Promise.resolve(null);
    var oc = new OC(1, 44100 * 3, 44100), g = oc.createGain(); g.gain.value = MASTER; g.connect(oc.destination);
    var from = Math.floor((delay || 0) * 44100);
    var run = delay ? oc.suspend(delay).then(function () { R[name](oc, g); oc.resume(); }) : (R[name](oc, g), null);
    var render = oc.startRendering();
    return render.then(function (buf) {
      var d = buf.getChannelData(0), peak = 0, end = 0;
      for (var i = from; i < d.length; i++) { var a = Math.abs(d[i]); if (a > peak) peak = a; if (a > 0.002) end = i; }
      return { peak: peak, seconds: Math.max(0, end - from) / 44100 };
    });
  }

  // soft tick on ordinary buttons and tabs (answer buttons and games make their own sounds)
  document.addEventListener('click', function (e) {
    var el = e.target.closest && e.target.closest('.btn, .tab, .chipbtn, .dbtn, .icon-btn, .lcard, .res summary');
    if (el && !el.closest('.opts') && !el.hasAttribute('data-nosfx')) play('tick');
  }, true);

  UN.sfx = { play: play, enabled: function () { return enabled; }, setEnabled: setEnabled, names: Object.keys(R), measure: measure };
})();
