// Detailed index (« Sommaire détaillé ») — loaded by index.html only.
// Builds one line per sheet by fetching each page linked from a card and
// reading its nav.toc, so the listing can never drift from the pages
// themselves. Needs http(s): under file:// the fetches fail and each line
// degrades to just the page-title link.
(function () {
  var grid = document.querySelector('.card-grid');
  var cards = document.querySelectorAll('.card-grid a.card[href$=".html"]');
  if (!grid || !cards.length) return;

  var sec = document.createElement('section');
  sec.id = 'sommaire';
  var h2 = document.createElement('h2');
  h2.textContent = 'Sommaire détaillé';
  sec.appendChild(h2);
  var lede = document.createElement('p');
  lede.className = 'lede';
  lede.textContent = 'Toutes les sections de toutes les fiches — construit automatiquement à partir du sommaire de chaque page.';
  sec.appendChild(lede);
  grid.parentNode.insertBefore(sec, grid.nextSibling);

  cards.forEach(function (card) {
    var href = card.getAttribute('href');
    var row = document.createElement('p');
    row.className = 'som-row';
    var page = document.createElement('a');
    page.className = 'som-page';
    page.href = href;
    var title = card.querySelector('h3');
    page.textContent = (title || card).textContent;
    row.appendChild(page);
    sec.appendChild(row);
    fetch(href)
      .then(function (r) { return r.text(); })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        doc.querySelectorAll('nav.toc a[href^="#"]').forEach(function (a) {
          var link = document.createElement('a');
          link.href = href + a.getAttribute('href');
          // drop the "1 · " section numbers — they are per-page, not global
          link.textContent = a.textContent.replace(/^\d+\s*·\s*/, '');
          row.appendChild(link);
        });
      })
      .catch(function () { /* keep just the page-title link */ });
  });
})();
