/* =========================================================
   Cuaderno de ejercicios · interacción mínima
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Render de matemáticas ---------- */
  function typeset() {
    if (typeof renderMathInElement !== 'function') return;
    renderMathInElement(document.body, {
      delimiters: [
        { left: '\\(', right: '\\)', display: false },
        { left: '\\[', right: '\\]', display: true }
      ],
      throwOnError: false,
      ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code']
    });
  }

  /* ---------- Mostrar / ocultar soluciones ---------- */
  function initToggle() {
    const btn = document.getElementById('toggleSol');
    if (!btn) return;
    const KEY = 'fiab-ej-sol';
    let hidden = false;
    try { hidden = localStorage.getItem(KEY) === '1'; } catch (_) { /* noop */ }

    const apply = () => {
      document.body.classList.toggle('hide-sol', hidden);
      btn.textContent = hidden ? 'Mostrar soluciones' : 'Ocultar soluciones';
      btn.setAttribute('aria-pressed', String(!hidden));
    };
    btn.addEventListener('click', () => {
      hidden = !hidden;
      try { localStorage.setItem(KEY, hidden ? '1' : '0'); } catch (_) { /* noop */ }
      apply();
    });
    apply();
  }

  /* ---------- Recordar la posición de lectura ---------- */
  function initScrollMemory() {
    const key = 'scroll:' + location.pathname;
    // Si venimos de un enlace con ancla, manda el ancla
    if (!location.hash) {
      let y = null;
      try { y = sessionStorage.getItem(key); } catch (_) { /* noop */ }
      if (y !== null && !isNaN(+y)) {
        requestAnimationFrame(() => window.scrollTo(0, +y));
        setTimeout(() => window.scrollTo(0, +y), 120);
      }
    }
    let timer = null;
    const save = () => {
      try { sessionStorage.setItem(key, String(Math.round(window.scrollY))); } catch (_) { /* noop */ }
    };
    window.addEventListener('scroll', () => {
      clearTimeout(timer);
      timer = setTimeout(save, 180);
    }, { passive: true });
    window.addEventListener('pagehide', save);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') save();
    });
  }

  /* ---------- Índice activo al hacer scroll ---------- */  function initScrollSpy() {
    const links = [...document.querySelectorAll('.toc a[href^="#"]')];
    if (!links.length || !('IntersectionObserver' in window)) return;
    const map = new Map();
    links.forEach((a) => {
      const el = document.querySelector(a.getAttribute('href'));
      if (el) map.set(el, a);
    });
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          links.forEach((l) => l.style.borderColor = '');
          const a = map.get(e.target);
          if (a) a.style.borderColor = 'rgba(45,212,191,.45)';
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    map.forEach((_, el) => obs.observe(el));
  }

  function boot() {
    typeset();
    initToggle();
    initScrollSpy();
    initScrollMemory();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
