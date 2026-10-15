# BECE1064 Young Children's Literature PWA — Project Progress and Decisions

Updated: 15 October 2026

## Non-negotiable decisions
- **Meaningful visual learning supports (mandatory):** Include appropriate, concept-relevant images, illustrations, diagrams, and visual examples where they help students understand course material, including learners with disabilities who benefit from visual supports. This is required, not merely decorative.
- **Accessible image implementation:** Supply meaningful alternative text in English and Mandarin where appropriate; provide adjacent explanations or longer descriptions for complex diagrams; never convey essential information through images alone; ensure readable contrast, scalable layouts, and inclusive, culturally appropriate representation. Decorative images should be marked as decorative for assistive technology.
- **Practical image constraints:** Use original, appropriately licensed, or otherwise permitted visuals; optimize and cache assets for offline use, and avoid dependencies on services inaccessible in China. Review visuals and their accessibility during topic testing.
- **Accessibility requirement (mandatory):** Provide English and Mandarin read-aloud functionality for learning content, particularly to support learners with disabilities, including blind and low-vision learners. This is a required app feature, not an optional future enhancement.
- Read-aloud controls must be accessible by keyboard and assistive technologies, with play/pause/stop and language selection; verify English and Mandarin speech on target devices/browsers and document any voice availability limitations.
- Continue from the existing application, not a rewrite.
- Preserve all backups and approved quiz content.
- Aim for RM0 hosting/software and a China-compatible, offline-first PWA.
- Student-facing content: simple English, Mandarin, pinyin line by line, without language labels, including headings and every MCQ option and explanation.
- Keep lecturer-only quality checks and teaching notes separate from student-facing content.
- Verify integration locally before GitHub deployment; never assume file creation means testing or deployment.

## Current application
- GitHub Pages deployment exists; live site has not yet been updated with the current Topic 3 work.
- Working folder on user's computer: BECE1064_V16.9_WORKING_COPY.
- Known working files: index.html, script0.js, sw.js.
- Topic 3 quiz has been tested locally in Edge: persistence, immediate feedback, explanations, partial score, and completed-attempt behavior.
- Backups: BECE1064_BACKUP_BEFORE_TOPIC3_FIX and BECE1064_BACKUP_BEFORE_V16.9_UPDATE. Do not alter.

## Topic status
- Topic 1: Lecture notes approved and previously pasted; sections 1.1–1.3 and three learning outcomes. Exact verbatim text must be verified from source before insertion. Topic 1 quiz answer sequence recorded: B, D, A, C, A, D, B, C, A, B; full approved question/option/explanation text not currently verified.
- Topic 2: Trilingual notes and improved 10-question quiz drafted; pending approval and integration.
- Topic 3: Approved MCQ quality benchmark; integrated and locally tested in v16.9. Answer sequence: A, B, A, C, D, B, C, C, A, D.
- Topic 4: Revised MCQs approved, including protected Q2 and Q9. Answer sequence: B, D, A, C, D, B, A, C, B, D.
- Topics 5–12: Full integration/verification not yet confirmed.

## Next actions
1. Obtain current working application ZIP/files for inspection (never modify backup originals).
2. Verify exact approved Topic 1 notes and complete quiz text against original before integrating.
3. Add Topic 1 content and quiz to a new working copy, keeping lecturer materials restricted as supported.
4. Test locally, then prepare GitHub-ready package and deployment checklist.
5. Implement and test accessible English and Mandarin read-aloud controls before declaring the app complete.
6. Add and accessibility-check concept-relevant images and descriptions as topics are integrated.
7. Update this progress file after each verified milestone.

## Status definitions
- Drafted: content exists but not approved.
- Approved: user accepted content; does not mean coded.
- Integrated: inserted into a working app copy.
- Tested: relevant behavior verified.
- Deployed: published to GitHub Pages and checked live.
