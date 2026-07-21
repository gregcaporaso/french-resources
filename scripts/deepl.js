// DeepL launcher — opens deepl.com in a new tab with direction + text prefilled.
// Prefill URL format: #source/target/text — literal "/" in text must be sent as "\/".
document.getElementById('deepl-form').addEventListener('submit', function (e) {
  e.preventDefault();
  var dir = document.getElementById('deepl-dir').value;
  var text = document.getElementById('deepl-text').value.trim();
  var url = 'https://www.deepl.com/translator#' + dir + '/' +
            encodeURIComponent(text).replace(/%2F/g, '%5C%2F');
  window.open(url, '_blank', 'noopener');
});
