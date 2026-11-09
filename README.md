# Translation Revision (UN Translation + Tourist Translation)

A bilingual (English / Arabic) study game with two subjects: **UN Translation** and **Tourist Translation**. Use the UN / Tourism switch in the top bar; each subject keeps its own scores, XP, weak areas and achievements. Plain HTML, CSS and JavaScript. No server, no accounts, no AI, no external services. Progress is saved only in the student's own browser.

## Subjects
- **UN Translation:** 20 terms, 5 written questions, the six characteristics of UN translation (31 items). Exams cover every item.
- **Tourist Translation:** about 340 English-Arabic terms from the lecture glossaries (11 categories: types of tourism, transport, air travel, hotels, rates and plans, booking and procedures, food, attractions, tours, people and jobs, the tourism industry), plus definitions of the types of tourism, etiquette and the language of tourism. Exams 1 and 3 are balanced 40-question samples (28 terms from every category, 4 written questions, 8 definition checks) that avoid repeating terms where possible; Exam 2 targets weak items. Games 2 and 3 have a full-material mode. A **Reading & Translation** page holds the lecture summaries and nine translation passages with translations for review (no questions are made from them). The passage translations and the Arabic lesson text were written by Claude and need a native-speaker check.
- Source quirks in the PDFs (typos, conflicting Arabic for the same word) were fixed or merged; terms with the same Arabic (for example tour and trip) are accepted for each other when typing.

## Design
One design system with two themes: a clean light theme and a modern dark theme (switch in the top bar; the choice is remembered, and the device preference is used until you choose). Desktop has a top bar and left sidebar (Dashboard, Learn, Games, Exams, Progress, Videos & Audio, Vocabulary, Achievements, Settings); phones get a compact top bar and a bottom navigation bar with a "More" sheet. Exams switch to a focused layout with no sidebar. All colours are CSS variables at the top of `css/style.css`. Icons are drawn locally in the Lucide style (`js/icons.js`), so there is no CDN.

Fonts: the CSS asks for Inter (English) and Cairo / Tajawal (Arabic) and falls back to system fonts. Those fonts are used only if installed on the device. To bundle them for everyone, add the font files to a `fonts` folder and `@font-face` rules (this needs downloading the fonts, so it was not done).

## Memory Lessons (phase 2)
Eight short, animated, step-by-step lessons (`js/data/lessons.js`, page `Memory Lessons`): each term is broken into word pairs (same colour = same meaning, Arabic in its real reading order), then memory hooks, side-by-side comparisons of easily confused terms, a first-letter aid for the six characteristics, written answers built piece by piece, and a quick check that feeds the adaptive engine. They also cover the five written questions. Lessons are learning-only and are not reachable during an exam. The lesson Arabic is written in simple Egyptian style by me and has **not** been checked by a native-speaker teacher: please review `js/data/lessons.js` and tell me what to change.

Audio and video: an audio clip that only read the words aloud was tried with ElevenLabs and rejected, so there is no narration and no video. The optional player support (`video` / `audio` in `js/data/resources.js`) remains for anything you add later.

## What is inside
- **Game 1 – Term Quest:** flip cards, three matching races, a 60-second speed round, missing word, UN bodies.
- **Game 2 – Fix-It Lab:** a short lesson, then a "repair meter" loop on weak items (untimed).
- **Game 3 – Boss Battle:** 3 hearts and a timer, one boss per category; missed questions return in a final boss.
- **Exam 1 / 2 / 3:** Exam 1 and 3 cover the whole material (30 questions: 20 terms, 5 written questions, 5 extra checks). Exam 2 has 20 questions, about 15 on the weakest items and 5 general.
- **Adaptive engine** (`js/adaptive.js`): tracks every item, weak/mastered status, repeated mistakes, spaced repetition (Leitner boxes), category performance, and recommends learning resources. With too little data it falls back to the full material. Nothing is ever excluded.
- **Written questions:** the student types an answer, sees an *estimated* match, then the model answer, and grades themselves ("I got it / Partly / Not yet"). Each written question also has objective MCQ and True/False checks. The estimate is a simple keyword match and is never presented as real grading.
- **Dashboard:** XP and level, exam scores and improvement, weak terms / definitions / concepts, previously wrong answers, recommended revision, achievements, reset with confirmation.
- **Exam rule:** during an exam there are no hints, audio, videos, or Arabic translations that reveal answers. Switching the interface to Arabic does not translate exam content (an English terminology question stays English).

## Opening it
- **Easiest:** double-click `index.html`. All scripts are classic `<script>` files and the data lives in `.js` files, so it does not need a server.
- **With a local server (recommended for testing):** `node tests/serve.js` then open http://localhost:8765
- Offline: the site loads nothing from the internet. When hosted on https (GitHub Pages) it also registers a small service worker that caches the files after the first visit.

## Hosting on GitHub Pages (when you are ready)
1. Create a repository (Pages on a free account needs a public repo).
2. Upload everything in this folder (keep the structure).
3. Settings → Pages → Deploy from branch → `main` / root.
4. Share the `https://<account>.github.io/<repo>/` link.

Because the site is public, anyone can read the source, **including the answer keys**. See `SECURITY.md`.

## Adding content for the Tourist subject
- Terms: add a line to the table in `js/data/tourist/terms.js` (`group | English | Arabic variants separated by " / " | other accepted English | short definition`). Everything else (games, exams, lessons) picks it up automatically.
- Definitions, written questions, answer keys and the question bank: `js/data/tourist/content.js`. Reading page: `js/data/tourist/reading.js`.
- Run `node tests/tourist.test.js` after changes, and `node tests/make-coverage.js` to refresh `COVERAGE.md`.

## Adding content
- **Terms:** add an object to `UN.terms` in `js/data/terms.js` (`id` like `T21`, `en`, `ar` list, `group`). Add it to a set in `UN.confusable` if it is easy to confuse. It then appears in every game and exam automatically. Add the id to a resource in `js/data/resources.js` so it shows in the learning center. Add the new file names to `sw.js` only if you add new files.
- **Written question:** add to `UN.written` (`js/data/questions.js`) and its `model` + `phrases` in `js/data/answer-keys.js`.
- **MCQ / True-False / fill-in:** add to `UN.bank` in `questions.js` and its key in `answer-keys.js` (`mcq`, `tf`, `cloze`). `item` links the question to the item whose mastery it tracks.
- **Lessons:** edit or add entries in `js/data/lessons.js` (step types are described at the top of that file).
- **Videos / audio (optional):** copy files into `media/video` (MP4) or `media/audio`, then set `video: 'media/video/name.mp4'` or `audio: 'media/audio/name.mp3'` on the matching entry in `js/data/resources.js`. With no file set, the written explanation shows instead.
- Run `node tests/logic.test.js` after changes.

## Decisions made on your behalf (please review)
- Group names (Principal organs, Offices and units, …) are my own labels, used for weak-area reporting.
- Some wrong MCQ options use content that is not in your material (for example other founding years). They are only wrong answers, never presented as facts.
- Matching is a game activity; exams use MCQ, True/False, typed answers, fill-in and written questions.
- Interface Arabic is standard Arabic. Egyptian Arabic explanations and recorded audio are **not included yet**; they need your review first (planned phase 2/3).
- Learning-center videos are not made yet; the video player slots and written explanations are in place.

## Tested
- `node tests/logic.test.js`: answer normalization, typed-answer grading, every question format for every item (one correct option each, no duplicate options), approved keys, full-exam composition, scoring and self-grading, weak-area ranking, 15+5 adaptive exam, full-material fallback, format variety, spaced repetition.
- In a browser (served over http://localhost): Exam 1 end to end with scoring and self-grading, no hint/audio/video elements during the exam, leave-exam guard, Exam 2 targeting of missed items, Exam 3 uses different formats and extras than Exam 1, all Game 1 activities, Game 2 (recommended), Game 3 (waves, hearts, timeout, final boss, victory), Arabic/RTL, language switch, reload persistence, reset with cancel and confirm, achievements, no horizontal overflow at phone width in both languages, local audio playback.

## Not tested / limits
- Opening by double-click (`file://`) was **not** run in a browser here (the test browser blocks it). It uses no `fetch`, modules or service worker on `file://`, so it should work, but please try it once.
- Real MP4 playback was not tested (no sample video yet); the player element and the missing-file path were created, local audio playback was verified.
- Layouts were checked in the built-in browser at 1280 px and 375 px (dark/light, English/Arabic: no horizontal overflow on 13+ pages, no console errors, text/button colour pairs at least 4.5:1). Tablet width (768-1024 px) and real phones were not tested.
- The service worker and offline cache were not exercised (needs https hosting).

## Definitions (Tourist Translation)

Every definition is shown exactly as written in the course material. Two buttons sit under it: **Simple version** (a short, exam-ready wording with the same core meaning) and **Translation** (Arabic for English originals, English for Arabic ones). In exams, "Define: …" questions are self-graded against both the simple and the original wording. The Arabic text was written by Claude and should be checked by a native speaker.

## Sound effects

All sounds are generated in the browser with the Web Audio API (no audio files, nothing to download, works offline). They play on right/wrong/partly answers in games and lessons, matching pairs and mistakes, card flips, the boss-battle countdown, win/lose fanfares, achievements, finishing a lesson and submitting an exam. Exams never reveal correctness through sound. A speaker button in the top bar turns sound on or off (the choice is remembered).

## Subjects

The top bar shows the current subject by its full name; tap it to choose another (UN Translation, Tourist Translation, Simultaneous Interpretation). Progress is kept separately for each subject. A fourth subject can be added the same way: its content files, one `registerSubject` call, and an icon and description for the picker.

Simultaneous Interpretation uses fill-in-the-gap questions (shown with a real blank and the answer in colour), 20 multiple-choice questions, 20 essay questions with memory tricks, ten key concepts, funny memory pictures, games, lessons and balanced exams of 36 gap questions and 4 essays.
