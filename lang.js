// Site language, as in the game: ?lang=, then the saved choice, then the browser language, then English.
// Also drives the language menu (.lang, a <details>): marks the current one, saves the choice, closes on an outside tap or Esc.
const LANGS = ['it', 'en', 'es', 'fr', 'de', 'pt'];
const L = (() => {
  const ok = x => LANGS.includes(x) ? x : null;
  let saved = null;
  try { saved = localStorage.getItem('starpick-lang'); } catch {}
  return ok(new URLSearchParams(location.search).get('lang')) ?? ok(saved) ?? ok(navigator.language.slice(0, 2).toLowerCase()) ?? 'en';
})();
document.documentElement.lang = L;

const menu = document.querySelector('.lang');
menu.querySelector('summary').setAttribute('aria-label', { it: 'Lingua', en: 'Language', es: 'Idioma', fr: 'Langue', de: 'Sprache', pt: 'Idioma' }[L]);
menu.querySelector('summary span').textContent = L.toUpperCase();
menu.querySelector(`[hreflang="${L}"]`).setAttribute('aria-current', 'true');
menu.querySelectorAll('a').forEach(a => a.onclick = () => { try { localStorage.setItem('starpick-lang', a.hreflang); } catch {} });
addEventListener('click', e => { if (!menu.contains(e.target)) menu.open = false; });
addEventListener('keydown', e => { if (e.key === 'Escape') menu.open = false; });
