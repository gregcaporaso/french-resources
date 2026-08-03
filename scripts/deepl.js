// DeepL launcher — a small form injected into the page footer that opens
// deepl.com in a new tab with direction + text prefilled. Injected here so the
// markup lives in one place instead of being copied into every page.
// Prefill URL format: #source/target/text — literal "/" in text must be sent as "\/".
(function () {
  var footer = document.querySelector('footer');
  if (!footer) return;
  var form = document.createElement('form');
  form.className = 'deepl print-hide';
  form.innerHTML =
    '<span class="lvl">DeepL</span>' +
    '<select aria-label="Direction de traduction">' +
      '<option value="fr/en">FR → EN</option>' +
      '<option value="en/fr">EN → FR</option>' +
    '</select>' +
    '<input type="text" placeholder="mot ou phrase à traduire…" aria-label="Texte à traduire">' +
    '<button type="submit">Traduire ↗</button>';
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var dir = form.querySelector('select').value;
    var text = form.querySelector('input').value.trim();
    var url = 'https://www.deepl.com/translator#' + dir + '/' +
              encodeURIComponent(text).replace(/%2F/g, '%5C%2F');
    window.open(url, '_blank', 'noopener');
  });
  footer.appendChild(form);
})();
