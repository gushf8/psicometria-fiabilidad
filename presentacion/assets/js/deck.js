/* =========================================================
   Motor de presentación — navegación, animaciones y escala
   ========================================================= */
(function () {
  'use strict';

  const stage = document.querySelector('.stage');
  const slidesRoot = document.querySelector('.slides');
  if (!stage || !slidesRoot) return;

  const slides = Array.from(slidesRoot.querySelectorAll('.slide'));
  const total = slides.length;
  const deckName = document.body.dataset.deckTitle || document.title;
  const deckTag = document.body.dataset.deckTag || '';
  const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();

  let index = 0;
  let menuOpen = false;
  let currentChartSlide = null;

  const pad = (n) => String(n).padStart(2, '0');
  const hasGsap = typeof window.gsap !== 'undefined';
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Bloques / seminarios ---------- */
  const parts = [];
  slides.forEach((s, i) => {
    if (s.dataset.part && !parts.some((p) => p.label === s.dataset.part)) {
      parts.push({ label: s.dataset.part, index: i });
    }
  });
  const shortPart = (label) => {
    const m = label.match(/Seminario\s*(\d+)/i);
    return m ? `Seminario ${parseInt(m[1], 10)}` : label;
  };
  const switchHTML = parts.length > 1
    ? `<div class="deck-switch" role="group" aria-label="Cambiar de seminario">
        ${parts.map((p, i) => `<button type="button" data-goto="${p.index}" data-tone="${i === 0 ? 'teal' : 'violet'}" title="${p.label}">${shortPart(p.label)}</button>`).join('')}
      </div>`
    : '';

  /* ---------- Escalado fijo 1280 × 720 ---------- */
  function resize() {
    const s = Math.min(window.innerWidth / 1280, window.innerHeight / 720);
    stage.style.transform = `translate(-50%, -50%) scale(${s})`;
  }
  window.addEventListener('resize', resize);
  document.addEventListener('fullscreenchange', () => setTimeout(resize, 60));
  resize();

  /* ---------- Chrome ---------- */
  const chrome = document.createElement('div');
  chrome.className = 'chrome';
  chrome.innerHTML = `
    <header class="deck-head">
      <div class="deck-brand">
        <span class="deck-brand__dot"></span>
        <span class="deck-brand__name">Psicometría</span>
        <span class="deck-brand__sep"></span>
        <span>${deckName}</span>
      </div>
      <div class="deck-right">
        ${switchHTML}
        <span class="deck-counter"><b class="js-count">01</b><span style="opacity:.45"> / </span><span class="js-total">${pad(total)}</span></span>
        <a class="home-btn" href="index.html" aria-label="Volver al inicio" title="Volver al inicio (I)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5L12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></svg>
          <span>Inicio</span>
        </a>
        <button class="icon-btn js-menu" type="button" aria-label="Índice de diapositivas" title="Índice (O)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h10"/></svg>
        </button>
        <button class="icon-btn js-fs" type="button" aria-label="Pantalla completa" title="Pantalla completa (F)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5"/></svg>
        </button>
      </div>
    </header>

    <div class="deck-hint">← → navegar · <span style="opacity:.7">O</span> índice · <span style="opacity:.7">F</span> pantalla completa · <span style="color:var(--accent)">pasa el ratón por las fórmulas</span></div>

    <div class="deck-progress"><span class="js-progress"></span></div>

    <div class="deck-nav">
      <button class="icon-btn js-prev" type="button" aria-label="Anterior">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button class="icon-btn js-next" type="button" aria-label="Siguiente">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
      </button>
    </div>

    <div class="deck-menu" role="dialog" aria-modal="true" aria-label="Índice de diapositivas">
      <div class="deck-menu__head">
        <div class="deck-menu__title">${deckName}<span>Índice de diapositivas</span></div>
        <button class="icon-btn js-menu-close" type="button" aria-label="Cerrar índice">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <div class="deck-menu__grid"></div>
      <div class="deck-menu__foot">
        <span>${total} diapositivas · Navega con ← → o haz clic en el índice</span>
        <span>Psicometría · Fiabilidad</span>
      </div>
    </div>

    <div class="toast js-toast"></div>
  `;
  stage.appendChild(chrome);

  const menu = chrome.querySelector('.deck-menu');
  const menuGrid = chrome.querySelector('.deck-menu__grid');
  const progress = chrome.querySelector('.js-progress');
  const countEl = chrome.querySelector('.js-count');
  const toast = chrome.querySelector('.js-toast');

  let lastPart = null;
  slides.forEach((slide, i) => {
    if (slide.dataset.part && slide.dataset.part !== lastPart) {
      const group = document.createElement('div');
      group.className = 'menu-group';
      group.textContent = slide.dataset.part;
      menuGrid.appendChild(group);
      lastPart = slide.dataset.part;
    }
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'menu-item';
    btn.dataset.goto = i;
      const sec = slide.dataset.section || '';
    btn.innerHTML = `<span class="menu-item__n">${pad(i + 1)}</span>
      <span class="menu-item__t">${slide.dataset.title || 'Diapositiva ' + (i + 1)}
      ${sec ? `<span class="menu-item__s">${sec}</span>` : ''}</span>`;
    btn.addEventListener('click', () => {
      go(i);
      closeMenu();
    });
    menuGrid.appendChild(btn);
  });

  /* ---------- Utilidades ---------- */
  function showToast(html, ms = 2600) {
    toast.innerHTML = html;
    toast.classList.add('is-visible');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove('is-visible'), ms);
  }

  function closeMenu() {
    menuOpen = false;
    menu.classList.remove('is-open');
  }
  function openMenu() {
    menuOpen = true;
    menu.classList.add('is-open');
    chrome.querySelector('.menu-item.is-current')?.focus({ preventScroll: true });
  }

  /* ---------- Animaciones ---------- */
  function animateSlide(slide) {
    if (!hasGsap || reduceMotion) return;
    const els = slide.querySelectorAll('[data-anim]');
    if (!els.length) return;

    els.forEach((el) => {
      const kind = el.dataset.anim;
      const from = { autoAlpha: 0 };
      if (kind === 'left') from.x = -22;
      else if (kind === 'right') from.x = 22;
      else if (kind === 'zoom') { from.scale = 0.94; from.y = 8; }
      else if (kind === 'fade') { /* solo opacidad */ }
      else { from.y = 18; }
      gsap.killTweensOf(el);
      gsap.fromTo(el, from, {
        autoAlpha: 1, x: 0, y: 0, scale: 1,
        duration: 0.58, ease: 'power3.out', overwrite: true,
        delay: 0.06 + (el.dataset.delay ? parseFloat(el.dataset.delay) : 0)
      });
    });

    // Contadores numéricos
    slide.querySelectorAll('[data-count]').forEach((el) => {
      const target = parseFloat(el.dataset.count);
      const dec = parseInt(el.dataset.dec || '0', 10);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const obj = { v: 0 };
      const fmt = (v) => prefix + v.toFixed(dec).replace('.', ',') + suffix;
      gsap.killTweensOf(obj);
      gsap.to(obj, {
        v: target, duration: 1.15, delay: 0.35, ease: 'power2.out',
        onUpdate: () => { el.textContent = fmt(obj.v); },
        onComplete: () => { el.textContent = fmt(target); }
      });
    });
  }

  /* ---------- Gráficos ---------- */
  function initCharts(slide) {
    if (!window.PRES_CHARTS) return;
    slide.querySelectorAll('canvas[data-chart]').forEach((canvas) => {
      if (canvas.dataset.ready === '1') return;
      const factory = window.PRES_CHARTS[canvas.dataset.chart];
      if (!factory) return;
      try {
        factory(canvas);
        canvas.dataset.ready = '1';
      } catch (err) {
        console.error('[chart]', canvas.dataset.chart, err);
      }
    });
  }

  /* ---------- Navegación ---------- */
  function go(i, opts = {}) {
    const next = Math.max(0, Math.min(total - 1, i));
    if (next === index && opts.force !== true) return;

    slides[index]?.classList.remove('is-active');
    index = next;
    const slide = slides[index];
    slide.classList.add('is-active');

    countEl.textContent = pad(index + 1);
    progress.style.width = ((index + 1) / total) * 100 + '%';
    stage.dataset.index = String(index);
    document.dispatchEvent(new CustomEvent('pres:slide', { detail: { index } }));
    const currentPart = [...parts].reverse().find((p) => index >= p.index);
    chrome.querySelectorAll('.deck-switch [data-goto]').forEach((b) => {
      b.classList.toggle('is-active', !!currentPart && Number(b.dataset.goto) === currentPart.index);
    });
    document.title = `${slide.dataset.title || 'Diapositiva'} · ${deckName}`;

    chrome.querySelectorAll('.menu-item').forEach((b) => {
      b.classList.toggle('is-current', Number(b.dataset.goto) === index);
    });

    if (history.replaceState) {
      try { history.replaceState(null, '', '#' + (index + 1)); } catch (_) { /* file:// */ }
    }

    // Reinicia scroll interno
    slide.querySelectorAll('.table-wrap').forEach((w) => { w.scrollTop = 0; });

    animateSlide(slide);

    if (currentChartSlide !== slide) {
      currentChartSlide = slide;
      requestAnimationFrame(() => requestAnimationFrame(() => initCharts(slide)));
    }
  }

  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  chrome.querySelector('.js-next').addEventListener('click', next);
  chrome.querySelector('.js-prev').addEventListener('click', prev);
  chrome.querySelector('.js-menu').addEventListener('click', () => (menuOpen ? closeMenu() : openMenu()));
  chrome.querySelector('.js-menu-close').addEventListener('click', closeMenu);
  chrome.querySelector('.js-fs').addEventListener('click', toggleFullscreen);

  document.addEventListener('click', (e) => {
    const goto = e.target.closest('[data-goto]');
    if (goto && !goto.closest('.deck-menu')) go(Number(goto.dataset.goto));
    if (e.target.closest('[data-next]')) next();
    if (e.target.closest('[data-prev]')) prev();
  });

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.();
    }
  }

  document.addEventListener('keydown', (e) => {
    const key = e.key;
    if (key === 'Escape') { closeMenu(); return; }
    if (['ArrowRight', 'PageDown', ' ', 'Enter'].includes(key)) {
      if (menuOpen) { closeMenu(); return; }
      e.preventDefault(); next(); return;
    }
    if (['ArrowLeft', 'PageUp', 'Backspace'].includes(key)) {
      if (menuOpen) { closeMenu(); return; }
      e.preventDefault(); prev(); return;
    }
    if (key === 'Home') { e.preventDefault(); go(0); return; }
    if (key === 'End') { e.preventDefault(); go(total - 1); return; }
    if (key === 'o' || key === 'O') { e.preventDefault(); menuOpen ? closeMenu() : openMenu(); return; }
    if (key === 'f' || key === 'F') { e.preventDefault(); toggleFullscreen(); return; }
    if (key === 'i' || key === 'I') { e.preventDefault(); location.href = 'index.html'; return; }
    if (key === '1' && parts[0]) { e.preventDefault(); go(parts[0].index); return; }
    if (key === '2' && parts[1]) { e.preventDefault(); go(parts[1].index); return; }
    if (key === '?' || key === 'h' || key === 'H') {
      showToast('Usa <kbd>←</kbd><kbd>→</kbd> para navegar · <kbd>O</kbd> índice · <kbd>I</kbd> inicio · <kbd>F</kbd> pantalla completa', 4200);
    }
  });

  /* ---------- Enlaces directos (#n) ---------- */
  window.addEventListener('hashchange', () => {
    const n = parseInt((location.hash || '').replace('#', ''), 10);
    if (Number.isFinite(n) && n >= 1 && n <= total && n - 1 !== index) go(n - 1);
  });

  /* ---------- Gestos ---------- */
  let startX = null, startY = null;
  stage.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse') return;
    if (e.target.closest('.deck-menu, .table-wrap, .chart-box')) return;
    startX = e.clientX; startY = e.clientY;
  });
  stage.addEventListener('pointerup', (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    startX = null;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) (dx < 0 ? next() : prev());
  });

  /* ---------- Render matemático ---------- */
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

  /* ---------- Inicio ---------- */
  function boot() {
    document.body.classList.add('js-anim');
    typeset();
    if (window.PRES_TOOLTIPS) window.PRES_TOOLTIPS.scan();

    const fromHash = parseInt((location.hash || '').replace('#', ''), 10);
    const start = Number.isFinite(fromHash) && fromHash >= 1 && fromHash <= total ? fromHash - 1 : 0;

    slides.forEach((s) => s.classList.remove('is-active'));
    index = -1;
    go(start);

    if (hasGsap && !reduceMotion) {
      gsap.fromTo('.deck-head', { autoAlpha: 0, y: -8 }, { autoAlpha: 1, y: 0, duration: 0.7, delay: 0.2, ease: 'power2.out' });
    }

    try {
      if (!localStorage.getItem('fiab-formula-hint')) {
        localStorage.setItem('fiab-formula-hint', '1');
        setTimeout(() => {
          showToast('Pasa el ratón por cualquier fórmula para ver su significado · haz clic para fijarlo', 5200);
        }, 1700);
      }
    } catch (_) { /* sin localStorage */ }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
