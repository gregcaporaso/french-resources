// Site search — a search box injected on every page. On the sheets it sits in
// the sticky nav (load after nav.js, which exposes window.SITE_PAGES); on the
// index, where there is no nav, it goes below the masthead and the page list
// comes from the cards. The index is built in the browser on first use by
// fetching every page and reading its sections — no build step, nothing to
// regenerate when pages change. Needs http(s): under file:// the fetches fail
// and the box finds nothing (same limitation as scripts/sommaire.js).
(function () {
  var pages = window.SITE_PAGES ||
    Array.prototype.map.call(
      document.querySelectorAll('.card-grid a.card[href$=".html"]'),
      function (card) {
        var title = card.querySelector('h3');
        return [card.getAttribute('href'), (title || card).textContent.trim()];
      });
  if (!pages.length) return;

  var box = document.createElement('div');
  box.className = 'recherche';
  box.innerHTML =
    '<input type="search" placeholder="rechercher…" aria-label="Rechercher dans les fiches">' +
    '<div class="res" hidden></div>';
  var nav = document.querySelector('.sitenav');
  if (nav) {
    box.classList.add('in-nav');
    nav.appendChild(box);
  } else {
    var mast = document.querySelector('header.mast');
    if (!mast) return;
    mast.parentNode.insertBefore(box, mast.nextSibling);
  }
  var input = box.querySelector('input');
  var res = box.querySelector('.res');

  // accent-insensitive fold that keeps string indices aligned with the
  // original text, so match positions can be used for snippets
  function fold(text) {
    var out = '';
    for (var i = 0; i < text.length; i++) {
      out += (text[i].normalize('NFD')[0] || text[i]).toLowerCase();
    }
    return out;
  }

  var index = null;   // [{url, page, heading, text, folded, isHeading-folded}]
  var loading = false;

  function buildIndex() {
    if (index || loading) return;
    loading = true;
    var entries = [];
    Promise.all(pages.map(function (page) {
      return fetch(page[0])
        .then(function (r) { return r.text(); })
        .then(function (html) {
          var doc = new DOMParser().parseFromString(html, 'text/html');
          doc.querySelectorAll('section[id]').forEach(function (sec) {
            var h2 = sec.querySelector('h2');
            var heading = h2 ? h2.textContent.replace(/^\d+\s*·\s*/, '').trim() : sec.id;
            // pad tag boundaries so adjacent table cells don't run together
            // in snippets (doc comes from DOMParser, so this stays inert)
            var tmp = doc.createElement('div');
            tmp.innerHTML = sec.innerHTML.replace(/></g, '> <');
            var text = tmp.textContent.replace(/\s+/g, ' ').trim();
            entries.push({
              url: page[0] + '#' + sec.id,
              page: page[1],
              heading: heading,
              text: text,
              folded: fold(text),
              foldedHeading: fold(heading)
            });
          });
        })
        .catch(function () { /* page unreachable — skip it */ });
    })).then(function () {
      index = entries;
      render();
    });
  }

  function esc(t) {
    var el = document.createElement('span');
    el.textContent = t;
    return el.innerHTML;
  }

  function snippet(entry, q) {
    var at = entry.folded.indexOf(q);
    var from = Math.max(0, at - 40);
    var to = Math.min(entry.text.length, at + q.length + 60);
    return (from > 0 ? '…' : '') +
      esc(entry.text.slice(from, at)) +
      '<mark>' + esc(entry.text.slice(at, at + q.length)) + '</mark>' +
      esc(entry.text.slice(at + q.length, to)) +
      (to < entry.text.length ? '…' : '');
  }

  function render() {
    var q = fold(input.value.trim());
    if (q.length < 2) { res.hidden = true; return; }
    if (!index) {
      buildIndex();
      res.innerHTML = '<p class="none">…</p>';
      res.hidden = false;
      return;
    }
    var hits = index.filter(function (e) { return e.folded.indexOf(q) !== -1; });
    hits.sort(function (a, b) {
      return (b.foldedHeading.indexOf(q) !== -1) - (a.foldedHeading.indexOf(q) !== -1);
    });
    res.innerHTML = hits.length
      ? hits.slice(0, 15).map(function (e) {
          return '<a href="' + e.url + '"><b>' + esc(e.page) + ' · ' + esc(e.heading) +
                 '</b><span>' + snippet(e, q) + '</span></a>';
        }).join('')
      : '<p class="none">aucun résultat <span class="en">no results</span></p>';
    res.hidden = false;
  }

  input.addEventListener('focus', buildIndex);
  input.addEventListener('input', render);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { res.hidden = true; input.blur(); }
  });
  document.addEventListener('click', function (e) {
    if (!box.contains(e.target)) res.hidden = true;
  });
  // navigating within the current page: close the panel so it doesn't cover
  // the section just jumped to
  res.addEventListener('click', function (e) {
    if (e.target.closest('a')) res.hidden = true;
  });
})();
