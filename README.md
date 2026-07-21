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
