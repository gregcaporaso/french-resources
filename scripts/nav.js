// Site navigation — injected at the top of every sheet so pages link to each
// other without going back to the index. To add a page, extend PAGES below.
(function () {
  var PAGES = [
    ['index.html', 'Accueil'],
    ['alphabet-a1.html', 'Alphabet'],
    ['fondations-a1-a2.html', 'Fondations'],
    ['conjugaison-a2.html', 'Conjugaison'],
    ['verbes-a2.html', 'Verbes'],
    ['noms-a2.html', 'Noms'],
    ['phrases-a2.html', 'Phrases'],
    ['cod-a2.html', 'COD'],
    ['pronoms-a2.html', 'Pronoms'],
    ['gerondif-a2.html', 'Gérondif'],
    ['delf-a2-lacunes.html', 'Feuille de route']
  ];
  var here = location.pathname.split('/').pop() || 'index.html';
  var nav = document.createElement('nav');
  nav.className = 'sitenav';
  nav.setAttribute('aria-label', 'Autres fiches');
  PAGES.forEach(function (page, i) {
    var el;
    if (page[0] === here) {
      el = document.createElement('span');
      el.setAttribute('aria-current', 'page');
    } else {
      el = document.createElement('a');
      el.href = page[0];
    }
    el.textContent = page[1];
    // whitespace between items: ignored by the flex layout in .sitenav,
    // but keeps the links separated if the stylesheet hasn't (re)loaded
    if (i > 0) nav.appendChild(document.createTextNode(' '));
    nav.appendChild(el);
  });
  var mast = document.querySelector('header.mast');
  if (mast) mast.parentNode.insertBefore(nav, mast);

  // back-to-top link, shown once the reader has scrolled past the masthead
  var top = document.createElement('a');
  top.className = 'totop';
  top.href = '#';
  top.textContent = '\u2191 haut';
  top.setAttribute('aria-label', 'Revenir en haut de la page');
  document.body.appendChild(top);
  window.addEventListener('scroll', function () {
    top.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });
})();
