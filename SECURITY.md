# Security and privacy model

This is a static website. It cannot guarantee absolute security, but it is designed to have very little that can go wrong.

## What it does
- Runs entirely in the student's browser. There is no backend, database or account system.
- Saves progress (scores, XP, achievements, answer history) in the browser's `localStorage` on that device only. Nothing is transmitted. Clearing site data or using Settings → Reset progress deletes it.
- All grading is plain local JavaScript. No AI and no API calls.
- Visit counter: the page loads one external script, GoatCounter (`https://gc.zgo.at/count.js`), which counts page views for the site owner at https://ghost20051.goatcounter.com. `js/visits.js` sends only the subject and the part of the site (for example `/si/learn` or `/si/video/v05`), never answers, scores or progress. GoatCounter sets no cookies and stores nothing in the browser; it keeps daily totals (page, browser, system, country, language, screen width) and, per its privacy policy, does not store IP addresses, the full User-Agent or any tracker ID. If it is blocked (ad blocker) or the device is offline, the site works the same. It never counts on localhost or `file://`.
- Apart from that counter, it loads no external scripts, fonts, styles or images and makes no other requests to other sites. (The optional service worker only caches this site's own files.)
- Contains no passwords, keys, tokens or secrets. It collects no personal information.

## What to be aware of
- **Answer keys are public.** The site is hosted publicly and its source can be read, so a determined student can read `js/data/answer-keys.js`. This is a study tool, not a secure exam system.
- Progress lives in one browser profile. Another browser or device starts fresh. Private windows or blocked storage fall back to in-memory progress that is lost on close.
- Anyone using the same browser profile can see that progress.
- Text shown on pages is inserted with `textContent` / text nodes, never `innerHTML`, which prevents HTML injection from content or stored data.
- Browser speech (the 🔊 button) uses the device's own text-to-speech; some browsers may send the text to their speech service, which is outside this site's control. It is disabled during exams.
- If you add videos or audio, only use files you have the right to share, and host them in the repository's `media` folder.

## Maintainer checks done
- The only links to other websites are the photo credits on the Short videos page (Wikimedia Commons pages, opened in a new tab with `noopener`). The photos themselves are stored in the site.
- Searched the code for `innerHTML`, `eval`, `new Function`, `document.write`, `fetch`, `XMLHttpRequest`, `WebSocket`, `sendBeacon`, dynamic `import` and external URLs. Only the service worker's same-origin cache fallback uses `fetch`.
- No cookies are set.
