
(function () {
  const body = document.body;
  function setLang(lang) {
    body.classList.remove('lang-sk', 'lang-en');
    body.classList.add('lang-' + lang);
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang-btn').forEach((b) => {
      b.classList.toggle('active', b.getAttribute('data-set-lang') === lang);
    });
    try { localStorage.setItem('vissimart-lang', lang); } catch (e) {}
  }
  let lang = 'sk';
  try { lang = localStorage.getItem('vissimart-lang') || 'sk'; } catch (e) {}
  setLang(lang);
  document.querySelectorAll('[data-set-lang]').forEach((btn) => {
    btn.addEventListener('click', () => setLang(btn.getAttribute('data-set-lang')));
  });
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) toggle.addEventListener('click', () => nav.classList.toggle('open'));

  document.addEventListener('contextmenu', (e) => {
    if (e.target.closest('img, .art-photo, .protect')) e.preventDefault();
  });
  document.addEventListener('dragstart', (e) => {
    if (e.target.closest('img')) e.preventDefault();
  });

  document.querySelectorAll('.filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('[data-category]').forEach((card) => {
        const cats = (card.dataset.category || '').split(' ');
        card.style.display = (f === 'all' || cats.includes(f)) ? '' : 'none';
      });
    });
  });

  const modal = document.getElementById('art-modal');
  const modalImg = document.getElementById('modal-img');
  const modalThumbs = document.getElementById('modal-thumbs');
  const modalTitle = document.getElementById('modal-title');
  const modalMeta = document.getElementById('modal-meta');
  if (modal) {
    document.querySelectorAll('.art-card[data-art-id]').forEach((card) => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const id = card.dataset.artId;
        const photos = [0,2,3,4,5].map((n, i) => i === 0 ? `images/${id}.jpg` : `images/${id}-d${n}.jpg`);
        // d2-d5: ids 2,3,4,5
        const srcs = [`images/${id}.jpg`, `images/${id}-d2.jpg`, `images/${id}-d3.jpg`, `images/${id}-d4.jpg`, `images/${id}-d5.jpg`];
        let i = 0;
        function show(n) {
          i = (n + srcs.length) % srcs.length;
          modalImg.src = srcs[i];
          modalThumbs.querySelectorAll('img').forEach((im, idx) => im.classList.toggle('on', idx === i));
        }
        modalTitle.innerHTML = card.dataset.titleSk
          ? `<span data-lang="sk">${card.dataset.titleSk}</span><span data-lang="en">${card.dataset.titleEn}</span>`
          : '';
        modalMeta.textContent = card.dataset.meta || '';
        modalThumbs.innerHTML = srcs.map((s) => `<img src="${s}" alt="">`).join('');
        modalThumbs.querySelectorAll('img').forEach((im, idx) => im.addEventListener('click', () => show(idx)));
        show(0);
        modal.classList.add('open');
      });
    });
    document.getElementById('modal-close')?.addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('open'); });
  }

  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.querySelectorAll('label, button[type="submit"]').forEach((el) => { el.style.display = 'none'; });
      const ok = document.getElementById('form-ok');
      if (ok) ok.hidden = false;
    });
  }
  const cookieBanner = document.getElementById('cookie-banner');
  const cookieOk = document.getElementById('cookie-ok');
  try {
    if (cookieBanner && localStorage.getItem('vissimart-consent') !== '1') cookieBanner.hidden = false;
  } catch (e) {}
  cookieOk?.addEventListener('click', () => {
    try { localStorage.setItem('vissimart-consent', '1'); } catch (e) {}
    if (cookieBanner) cookieBanner.hidden = true;
  });
})();
