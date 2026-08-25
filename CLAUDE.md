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
Owners: present of `parler`/`être`/`avoir` and the silent-endings note → `fondations-a1-a2.html`; the tense system and the « Dr & Mrs Vandertramp » list → `conjugaison-a2.html`; open-ended word lists → the vocab pages.

## Structure conventions

All pages link the single shared stylesheet `styles/main.css` by relative path — style changes go there, not inline per page.
Reusable components in `main.css`: `table.conj` (conjugation grids), `table.ref` (plain tables), `.note` / `.key` (callouts), `.grid` (responsive columns), `.e` (ending highlight).
New resources: create the HTML page, add a card to `index.html` by copying the commented `TEMPLATE` block there, and add the page to the `PAGES` list in `scripts/nav.js`.
Shared page furniture is injected by scripts (loaded before `</body>` on every sheet): `scripts/nav.js` adds the cross-page nav above the masthead, and `scripts/deepl.js` adds the DeepL launcher form to the footer — the markup lives only in those scripts, not in the pages.
The vocab pages (`verbes-a2.html`, `noms-a2.html`, `phrases-a2.html`) are hand-editable word lists: one `<tr><td>français</td><td><span class="en">English</span></td></tr>` row per entry, with a `POUR AJOUTER` comment and commented `TEMPLATE` rows in each file — keep that row format when extending them.
Preview locally with `python3 -m http.server` (relative CSS paths break under `file://`).
DeepL cannot be embedded in an iframe (its CSP sends `frame-ancestors 'self' *.deepl.com`); the launcher form instead opens `deepl.com/translator#src/tgt/text` prefilled in a new tab.

## Workflow

The developer runs `gh` and `git push` commands themselves — provide copy-pasteable commands instead of executing them.
