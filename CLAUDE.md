# CLAUDE.md

## What this repo is

A small static site of French-learning reference sheets (plain HTML, no build step), published with GitHub Pages from the root of `main`.
Live site: <https://gregcaporaso.github.io/french-resources/>

## Content conventions

Pages are reference sheets only — do not add exercises, drills, or answer keys (removed by request on 2026-07-21).
Page content is in French with English glosses; `lang="fr"` on every page.
Colour convention throughout: verb **radical** in ink, **terminaison** in red (the `.e` class / `--ending` CSS variable).
Typography is intentional and is an exception to the global monospace-body default: serif (`--serif`) for headings, sans (`--sans`) for body text, mono (`--mono`) for accents only.
Every page must be A4 print-friendly; print rules live in the shared stylesheet.
Any list of French words (verbs, nouns, phrases…) shows an English translation beside each item, marked up with the `.en` class (requested 2026-07-22).

## Structure conventions

All pages link the single shared stylesheet `styles/main.css` by relative path — style changes go there, not inline per page.
Reusable components in `main.css`: `table.conj` (conjugation grids), `table.ref` (plain tables), `.note` / `.key` (callouts), `.grid` (responsive columns), `.e` (ending highlight).
New resources: create the HTML page, then add a card to `index.html` by copying the commented `TEMPLATE` block there.
The vocab pages (`verbes-a2.html`, `noms-a2.html`, `phrases-a2.html`) are hand-editable word lists: one `<tr><td>français</td><td><span class="en">English</span></td></tr>` row per entry, with a `POUR AJOUTER` comment and commented `TEMPLATE` rows in each file — keep that row format when extending them.
Preview locally with `python3 -m http.server` (relative CSS paths break under `file://`).
DeepL cannot be embedded in an iframe (its CSP sends `frame-ancestors 'self' *.deepl.com`); instead, every page footer has a launcher form (logic in `scripts/deepl.js`) that opens `deepl.com/translator#src/tgt/text` prefilled in a new tab.

## Workflow

The developer runs `gh` and `git push` commands themselves — provide copy-pasteable commands instead of executing them.
