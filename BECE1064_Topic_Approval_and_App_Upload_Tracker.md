# BECE1064 Young Children's Literature — Topic Approval & App Upload Tracker

**Purpose:** This is the persistent working record for the topic-by-topic review and app integration workflow. Update this file at each milestone. Do not treat a topic as uploaded merely because its content was approved in chat.

## Agreed workflow

For each topic, complete the following in order:
1. Confirm the latest approved master learning content and student-facing quiz.
2. Integrate that topic into the existing app source/package without rewriting approved content unnecessarily.
3. Test content display, navigation, quiz answer logic, feedback/explanations, and progress tracking.
4. Record the package/version and mark the topic as uploaded only after the updated package is built and checked. Live deployment is a separate step.
5. Preserve a backup of the working package and this tracker.

## Course-wide standards

- Student-facing content follows English → Mandarin Chinese → pinyin, line by line.
- Do not add language labels to student-facing content.
- All headings and subtitles must also be trilingual in the agreed order.
- Topic-specific MCQs: exactly four options (A–D), one best answer, plausible distractors, explanations for every option, and balanced correct-answer positions across a set.
- Topic 3 is the approved quality benchmark for MCQ design.
- Do not rewrite approved content wholesale. Make targeted corrections only when necessary and agreed.
- Keep the existing app structure; do not add the planned story library until all 12 topics and their quizzes have been verified, unless the user changes this priority.

## Topic status ledger

Status terms: **Approved** = explicitly confirmed by the user; **Partially confirmed** = some content approved or available, but full approval state is not certain; **Needs status check** = not enough reliable information to assert approval. **App status** is separate from content approval.

| Topic | Learning content status | Topic-specific quiz status | App integration status | Notes |
|---|---|---|---|---|
| 1. Introduction to Young Children's Literature | Needs status check | Needs status check | Not yet verified as integrated | Do not infer approval from the existing general quiz. |
| 2. Evaluating Picture Books | Needs status check | Needs status check | Not yet verified as integrated | Do not infer approval from the existing general quiz. |
| 3. The Art of the Picture Book | **Approved** | **Approved — 10 MCQs** | **Integrated in v16.8**; dedicated lesson plus all 10 approved trilingual MCQs, scoring and feedback added; package integrity and JS syntax checks passed | Quality benchmark. Approved answer key: 1-A, 2-B, 3-A, 4-C, 5-D, 6-B, 7-C, 8-C, 9-A, 10-D. Q5 uses the revised approved Option C. Browser interaction testing and live deployment remain separate. |
| 4. Genres and Formats I | Learning content file located; approval status should be confirmed against the latest master | Quiz file/material located; final approval status needs confirmation before integration | Not yet integrated/verified | Topic master located as `Pasted text(20261009-153009).txt`; related deck `Topic_4_Redesigned_Colour_Coded.pptx`. |
| 5. Poetry for Young Children | Learning content **approved** | Quiz status needs confirmation | Not yet integrated/verified | Sections 5.1–5.3 were reviewed and approved. Do not assume quiz approval without evidence. |
| 6. Realism and Fantasy | **Approved** | **Approved — 10 MCQs** | Not yet integrated/verified | Approved answer key: 1-A, 2-D, 3-D, 4-C, 5-B, 6-C, 7-B, 8-C, 9-B, 10-D. Do not reopen unless user requests it. |
| 7. Nonfiction and Informational Texts | **Approved** | **Approved — revised 10 MCQs** | Not yet integrated/verified | Revised quiz approved; earlier concern about an overly easy distractor was addressed. |
| 8. Diversity and Social Justice | **Approved for now** | **Approved for now — 10 MCQs** | Not yet integrated/verified | Answer key: 1-B, 2-B, 3-C, 4-D, 5-B, 6-C, 7-D, 8-D, 9-A, 10-C. |
| 9. Digital Literature, E-books, Awards and Censorship | Needs status check | Needs status check | Not yet verified as integrated | Confirm against prior work before asking user to repeat anything. |
| 10. Reading Aloud | Needs status check | Needs status check | Not yet verified as integrated | Confirm against prior work before asking user to repeat anything. |
| 11. Literature-Based Extensions | Needs status check | Needs status check | Not yet verified as integrated | Confirm against prior work before asking user to repeat anything. |
| 12. Literature Across the Curriculum | Needs status check | Needs status check | Not yet verified as integrated | Confirm against prior work before asking user to repeat anything. |

## Existing app baseline located

- Existing deployment package: `BECE1064_Young_Childrens_Literature_PWA_Deployment_Package_v16.5.zip`.
- Other package variants exist: `BECE1064_Young_Childrens_Literature_PWA_v16.5.zip` and `BECE1064_Young_Childrens_Literature_PWA_v16.5(1).zip`.
- App source files in the Library include `BECE1064 Young Children's Literature.html` and `BECE1064 Young Children's Literature — Stage 15 Prototype.html`.
- The existing app has a general quiz with one question per topic. Do not mistake that for the approved topic-specific MCQ sets.
- Historical baseline note (superseded for Topic 3 by v16.8): earlier packages did not contain the approved topic-specific quiz sets. Check each topic against its current versioned package before marking it integrated.
- Creating an updated package is distinct from publishing it to GitHub Pages or another live host; live deployment needs its own verification.

## Update log

- 2026-10-10: Created the topic-by-topic workflow record. Confirmed the user wants each approved topic integrated and tested one at a time to reduce loss of progress and avoid rework.


## Update log — 2026-10-10

- Built `BECE1064_Young_Childrens_Literature_Topic3_Integration_v16.7.zip` and uploaded it to the Library.
- Added a dedicated trilingual Topic 3 learning page covering 3.1 paratext/peritext/double-page spreads; 3.2 illustration media/style/line/colour/composition; 3.3 counterpoint/visual irony; a hands-on activity and saved reflection.
- JavaScript syntax check passed; ZIP integrity test passed. Full in-browser interaction testing was not available in this build environment.
- Topic 3 is **partially integrated, not fully uploaded**: the exact approved ten-question quiz wording and A–D options were not found in the available app source files. The approved answer key is preserved and no replacement quiz was invented. Import the exact quiz master before marking Topic 3 fully integrated.
- Live deployment to GitHub Pages or another host has not been performed.


## Update log — 2026-10-10 (v16.8)

- Recovered the approved Topic 3 quiz wording from the saved source and prior approval records; preserved the approved answer key and revised Question 5 Option C.
- Created standalone master: `BECE1064_Topic3_Approved_Quiz_Master_v16.8.md`.
- Built `BECE1064_Young_Childrens_Literature_Topic3_Quiz_Integration_v16.8.zip`.
- Integrated all 10 questions with English, Mandarin and pinyin line-by-line, four options each, answer checking, score, per-question correct answers/explanations, and browser-local saved answers/score/attempt count.
- Automated checks passed: Node.js JavaScript syntax check; quiz-data integrity checks (10 questions, four options each, complete trilingual stem/options/explanations, approved answer key); ZIP archive integrity; expected package contents and service-worker cache version.
- Full in-browser interaction testing was not completed in this environment.
- Live deployment to GitHub Pages or another host has **not** been performed.

## Current status at close of v16.8

- Topic 3 approved quiz is integrated in the v16.8 app package and preserved in the standalone master file.
- Verified against the extracted package: JavaScript syntax passes; quiz data contains 10 questions with four options each; each stem, option, and explanation has English, Mandarin, and pinyin; the approved answer key matches 1-A, 2-B, 3-A, 4-C, 5-D, 6-B, 7-C, 8-C, 9-A, 10-D; revised Question 5 Option C matches the approved wording; ZIP integrity passes.
- Not yet verified: full browser interaction/accessibility testing and live GitHub Pages deployment. Do not describe either as complete.
- Next workflow step: verify and integrate the next topic using its existing approved master content and quiz; do not reopen already approved content without evidence of a problem.
