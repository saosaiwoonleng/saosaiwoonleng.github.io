const elements = document.querySelectorAll("[data-chaffle]");
Array.prototype.forEach.call(elements, function(el) {
  const chaffle = new Chaffle(el, {
    lang: "en", // default: 'en'
  // 'en' || 'ja' || 'ja-hiragana' || 'ja-katakana' || 'ua' || 'cn'
  speed: 20, // default: 20
  delay: 100 // default: 100
});
el.addEventListener("mouseover", function() {
  chaffle.init();
});
});