# Ressources de français

A small, growing collection of French reference sheets — plain static HTML,
print-friendly (A4), meant to be served on GitHub Pages.

## Structure

```
french-resources/
├── index.html             # landing page / hub (links every resource)
├── fondations-a1-a2.html  # A1→A2 foundation: pronouns, present, negation, questions
├── conjugaison-a2.html    # A2 conjugation reference
├── styles/
│   └── main.css           # shared styles + A4 print rules (edit once, applies everywhere)
├── .gitignore
└── README.md
```

Each sheet ends with a short **Exercices** section: fill-in-the-blank drills with
an answer key hidden behind a `<details>` toggle (open it before printing if you
want the key on paper).

All pages link the same `styles/main.css`, so the look stays consistent and you
change it in one place. Colour convention: **radical** in ink, *terminaison* in red.

## Preview locally

Because pages load `styles/main.css` by relative path, open them through a local
server (not `file://`) so the CSS resolves:

```bash
cd french-resources
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Publish on GitHub Pages

```bash
cd french-resources
git init
git add .
git commit -m "Initial French resources site"
git branch -M main
git remote add origin git@github.com:<you>/french-resources.git
git push -u origin main
```

Then on GitHub: **Settings → Pages → Build and deployment**
- Source: **Deploy from a branch**
- Branch: **main** / **/ (root)** → Save

Your site appears at `https://<you>.github.io/french-resources/` within a minute
or two. No Jekyll config or build step needed — these are static files.

## Add a new resource

1. Create `something.html`, linking the shared stylesheet in `<head>`:
   ```html
   <link rel="stylesheet" href="styles/main.css">
   ```
2. Reuse the components already defined in `main.css`: `table.conj` (conjugation
   grids), `table.ref` (plain tables), `.note` / `.key` (callouts), `.grid`
   (responsive columns), `.e` (ending highlight).
3. Add a card to `index.html` — copy the commented `TEMPLATE` block already in
   that file and edit `href`, level, title, and description.
4. Commit and push; Pages redeploys automatically.

## Printing

Every page carries an `@page { size: A4; margin: 16mm; }` rule and a print
stylesheet. Just open a page and Ctrl/Cmd + P — the table of contents and any
`.print-hide` elements drop out automatically.
