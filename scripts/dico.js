// Dictionnaire — a small FR/EN lookup injected into the page footer, with the
// results shown inline (no new tab). Injected here so the markup lives in one
// place instead of being copied into every page. Two free, keyless APIs:
//   FR → EN single words: Wiktionary REST (real dictionary entries — part of
//     speech + senses, and "conditional of vouloir"-style form-of entries).
//   EN → FR, and FR → EN multi-word: MyMemory translation API.
// Both send Access-Control-Allow-Origin: * so they work from the browser.
(function () {
  var footer = document.querySelector('footer');
  if (!footer) return;

  var form = document.createElement('form');
  form.className = 'dico';
  form.innerHTML =
    '<span class="lvl">Dico</span>' +
    '<select aria-label="Direction de recherche">' +
      '<option value="fr">FR → EN</option>' +
      '<option value="en">EN → FR</option>' +
    '</select>' +
    '<input type="text" placeholder="mot à chercher…" aria-label="Mot à chercher">' +
    '<button type="submit">Chercher</button>' +
    '<div class="out" hidden></div>';
  footer.appendChild(form);

  var out = form.querySelector('.out');

  function show(html) {
    out.innerHTML = html;
    out.hidden = false;
  }

  // Wiktionary definitions arrive as HTML (links, inline <style> junk) —
  // parse inertly and keep only the text.
  function defText(html) {
    var doc = new DOMParser().parseFromString(html, 'text/html');
    doc.querySelectorAll('style').forEach(function (s) { s.remove(); });
    var t = doc.body.textContent.replace(/\s+/g, ' ').trim();
    return t.length > 180 ? t.slice(0, 180) + '…' : t;
  }

  function esc(t) {
    var el = document.createElement('span');
    el.textContent = t;
    return el.innerHTML;
  }

  function lookupWiktionary(word) {
    var url = 'https://en.wiktionary.org/api/rest_v1/page/definition/' +
              encodeURIComponent(word);
    return fetch(url)
      .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
      .then(function (data) {
        var fr = data.fr;
        if (!fr || !fr.length) return Promise.reject();
        var html = fr.slice(0, 3).map(function (pos) {
          var defs = pos.definitions.map(function (d) { return defText(d.definition); })
            .filter(function (t) { return t; }).slice(0, 3);
          return '<p><b>' + esc(pos.partOfSpeech.toLowerCase()) + '</b> — ' +
                 defs.map(esc).join(' · ') + '</p>';
        }).join('');
        html += '<p class="src"><a href="https://en.wiktionary.org/wiki/' +
                encodeURIComponent(word) + '#French" target="_blank" rel="noopener">' +
                'Wiktionnaire ↗</a></p>';
        show(html);
      });
  }

  function lookupMyMemory(text, dir) {
    var pair = dir === 'fr' ? 'fr|en' : 'en|fr';
    var url = 'https://api.mymemory.translated.net/get?q=' +
              encodeURIComponent(text) + '&langpair=' + pair;
    return fetch(url)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var top = data.responseData && data.responseData.translatedText;
        if (!top) return Promise.reject();
        var seen = {};
        seen[top.toLowerCase()] = true;
        var alts = (data.matches || []).map(function (m) { return m.translation; })
          .filter(function (t) {
            var k = t && t.toLowerCase();
            if (!k || seen[k]) return false;
            seen[k] = true;
            return true;
          }).slice(0, 3);
        show('<p><b>' + esc(top) + '</b>' +
             (alts.length ? ' <span class="alts">· ' + alts.map(esc).join(' · ') + '</span>' : '') +
             '</p><p class="src">MyMemory (mémoire de traduction)</p>');
      });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var dir = form.querySelector('select').value;
    var text = form.querySelector('input').value.trim();
    if (!text) return;
    show('…');
    // drop a leading article so « la bibliothèque » finds the dictionary entry
    var word = text.replace(/^(le|la|les|un|une|des|l')\s*/i, '').toLowerCase();
    var q = (dir === 'fr' && word.indexOf(' ') === -1)
      ? lookupWiktionary(word).catch(function () { return lookupMyMemory(text, dir); })
      : lookupMyMemory(text, dir);
    q.catch(function () {
      show('<p>Rien trouvé <span class="en">nothing found — check the spelling?</span></p>');
    });
  });
})();
