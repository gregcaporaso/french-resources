# CLAUDE.md

## What this repo is

A small static site of French-learning reference sheets (plain HTML, no build step), published with GitHub Pages from the root of `main`.
Live site: <https://gregcaporaso.github.io/french-resources/>

## Content conventions

Pages are reference sheets only — do not add exercises, drills, or answer keys (removed by request on 2026-07-21).
Page content is in French with English glosses; `lang="fr"` on every page.
Colour convention throughout: verb **radical** in ink, **terminaison** in red (the `.e` class / `--ending` CSS variable).
Typography is intentional and is an exception to the global monospace-body default: serif (`--serif`) for headings, sans (`--sans`) for body text, mono (`--mono`) for accents only.
Pages are screen-only (print support removed 2026-08-25): the site nav is sticky and `nav.js` injects a back-to-top link.
Any list of French words (verbs, nouns, phrases…) shows an English translation beside each item, marked up with the `.en` class (requested 2026-07-22).
Each topic lives on exactly one page; other pages link to it rather than repeating it (deduplicated by request on 2026-08-03).
Owners: present of `parler`/`être`/`avoir` and the silent-endings note → `fondations-a1-a2.html`; the tense system and the « Dr & Mrs Vandertramp » list → `conjugaison-a2.html`; the conditionnel (formation, politesse, conseil, souhait, hypothèse avec si) → `conditionnel-a2.html`; open-ended word lists → the vocab pages; the demonstratives (déterminants ce/cet/cette/ces and pronoms celui/celle…) and the all-pronoun-forms map → `pronoms-a2.html`.
The map table on `pronoms-a2.html` §1 is a deliberate exception to the one-topic-one-page rule: it repeats pronoun *forms* for skimming but keeps all rules on the owner pages (added by request 2026-08-31).

## Structure conventions

All pages link the single shared stylesheet `styles/main.css` by relative path — style changes go there, not inline per page.
Reusable components in `main.css`: `table.conj` (conjugation grids), `table.ref` (plain tables), `.note` / `.key` (callouts), `.grid` (responsive columns), `.e` (ending highlight).
New resources: create the HTML page, add a card to `index.html` by copying the commented `TEMPLATE` block there, and add the page to the `PAGES` list in `scripts/nav.js`.
Shared page furniture is injected by scripts (loaded before `</body>` on every sheet): `scripts/nav.js` adds the cross-page nav above the masthead (and exposes `window.SITE_PAGES`), `scripts/recherche.js` adds the site-search box (in the sticky nav; below the masthead on the index, where it lists pages from the cards instead), and `scripts/dico.js` adds the FR/EN dictionary lookup to the footer — the markup lives only in those scripts, not in the pages.
`scripts/sommaire.js` (loaded by `index.html` only) builds the « Sommaire détaillé » section on the landing page by fetching every page linked from a card and reading its `nav.toc` — it needs no updating when pages change, but every sheet must keep an accurate `nav.toc` since the detailed index mirrors it.
The vocab pages (`verbes-a2.html`, `noms-a2.html`, `phrases-a2.html`) are hand-editable word lists: one `<tr><td>français</td><td><span class="en">English</span></td></tr>` row per entry, with a `POUR AJOUTER` comment and commented `TEMPLATE` rows in each file — keep that row format when extending them.
Preview locally with `python3 -m http.server` (relative CSS paths break under `file://`).
The DeepL launcher was removed by request on 2026-09-02 (unused; DeepL also cannot be iframed — its CSP sends `frame-ancestors 'self' *.deepl.com`).
The footer dictionary (`scripts/dico.js`) uses two free, keyless, CORS-open APIs: the Wiktionary REST definition endpoint for FR→EN single words (real dictionary entries), and MyMemory for EN→FR and multi-word input (translation-memory quality — good on single words, shaky on phrases).
The site search (`scripts/recherche.js`) builds its index in the browser by fetching every page and reading `section[id]` elements, so sections must keep their `id`s and `h2` headings; like `sommaire.js` it degrades to nothing under `file://`.

## Workflow

The developer runs `gh` and `git push` commands themselves — provide copy-pasteable commands instead of executing them.
