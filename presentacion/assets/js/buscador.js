/* =========================================================
   Buscador de contenido
   - Cuaderno de ejercicios: usa window.BUSCA_INDEX
   - Presentación: construye el índice con las diapositivas
   Atajos: Ctrl/Cmd+K o "/" para abrir, Esc para cerrar,
   ↑ ↓ para moverse, Enter para abrir.
   ========================================================= */
(function () {
  'use strict';

  const norm = (s) =>
    String(s || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\sáéíóúüñσ²·′]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

  const isDeck = !!document.querySelector('.slides .slide');

  /* ---------- Índice ---------- */
  let ITEMS = [];

  function deckText(s) {
    const clone = s.cloneNode(true);
    clone.querySelectorAll('.katex-mathml, .math-tip, .deck-menu, script, style').forEach((n) => n.remove());
    return (clone.textContent || '').replace(/\s+/g, ' ').trim();
  }

  function buildDeck() {
    const slides = [...document.querySelectorAll('.slide')];
    ITEMS = slides.map((s, i) => ({
      url: '#' + (i + 1),
      n: i + 1,
      title: s.dataset.title || ('Diapositiva ' + (i + 1)),
      sub: (s.dataset.part || '') + (s.dataset.section ? ' · ' + s.dataset.section : ''),
      text: deckText(s),
      deck: true
    }));
  }

  function buildFromIndex() {
    const raw = window.BUSCA_INDEX || [];
    ITEMS = raw.map((x) => ({
      url: x.url,
      title: x.title,
      sub: x.sub || '',
      text: x.text || '',
      deck: false
    }));
  }

  /* ---------- Búsqueda ---------- */
  function search(q) {
    const tokens = norm(q).split(' ').filter((t) => t.length > 1);
    if (!tokens.length) return [];
    const out = [];
    ITEMS.forEach((it) => {
      const t = norm(it.title);
      const s = norm(it.sub);
      const x = norm(it.text);
      let score = 0;
      let all = true;
      tokens.forEach((tok) => {
        let hit = 0;
        if (t.includes(tok)) hit += 8;
        if (s.includes(tok)) hit += 3;
        const idx = x.indexOf(tok);
        if (idx !== -1) hit += 2 + Math.min(3, (x.match(new RegExp(tok, 'g')) || []).length * 0.2);
        if (!hit) all = false;
        score += hit;
      });
      if (!all) return;
      if (t.startsWith(tokens[0])) score += 4;
      out.push({ it, score });
    });
    return out.sort((a, b) => b.score - a.score).slice(0, 12).map((o) => o.it);
  }

  function snippet(it, q) {
    const tokens = norm(q).split(' ').filter(Boolean);
    const text = (it.text || '').replace(/\s+/g, ' ');
    const low = text.toLowerCase();
    let pos = -1;
    tokens.forEach((t) => {
      const p = low.indexOf(t);
      if (p !== -1 && (pos === -1 || p < pos)) pos = p;
    });
    if (pos === -1) return text.slice(0, 130);
    const start = Math.max(0, pos - 45);
    let frag = text.slice(start, start + 150);
    tokens.forEach((t) => {
      frag = frag.replace(new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'), '<mark>$1</mark>');
    });
    return (start > 0 ? '…' : '') + frag + '…';
  }

  /* ---------- Interfaz ---------- */
  let modal, input, list, active = -1, results = [];

  function open() {
    modal.classList.add('is-open');
    input.value = '';
    render('');
    setTimeout(() => input.focus(), 30);
  }
  function close() {
    modal.classList.remove('is-open');
  }

  function render(q) {
    results = q.trim() ? search(q) : ITEMS.slice(0, 8);
    active = results.length ? 0 : -1;
    if (!results.length) {
      list.innerHTML = '<div class="b-empty">Sin coincidencias. Prueba con «fiabilidad», «intervalo», «Rulon», «alfa», «desviación»…</div>';
      return;
    }
    list.innerHTML = results.map((it, i) => `
      <button class="b-item${i === 0 ? ' is-on' : ''}" type="button" data-i="${i}">
        <span class="b-item__t">${it.deck ? '<b class="b-item__n">' + String(it.n).padStart(2, '0') + '</b>' : ''}${it.title}</span>
        <span class="b-item__s">${it.sub}</span>
        <span class="b-item__x">${snippet(it, q)}</span>
      </button>`).join('');
    list.querySelectorAll('.b-item').forEach((b) => {
      b.addEventListener('click', () => go(Number(b.dataset.i)));
      b.addEventListener('mousemove', () => setActive(Number(b.dataset.i)));
    });
  }

  function setActive(i) {
    active = i;
    list.querySelectorAll('.b-item').forEach((b, j) => b.classList.toggle('is-on', j === i));
    const el = list.querySelectorAll('.b-item')[i];
    if (el) el.scrollIntoView({ block: 'nearest' });
  }

  function go(i) {
    const it = results[i];
    if (!it) return;
    close();
    if (it.deck) {
      location.hash = it.url;
      document.dispatchEvent(new CustomEvent('pres:slide', { detail: { index: Number(it.url.slice(1)) - 1 } }));
    } else {
      location.href = it.url;
    }
  }

  function init() {
    modal = document.createElement('div');
    modal.className = 'b-modal';
    modal.innerHTML = `
      <div class="b-box" role="dialog" aria-modal="true" aria-label="Buscar">
        <div class="b-row">
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
          <input class="b-input" type="search" placeholder="Buscar: fiabilidad, intervalo, Rulon, σE, desviación…" autocomplete="off" aria-label="Buscar en el contenido">
          <kbd class="b-esc">Esc</kbd>
        </div>
        <div class="b-list"></div>
        <div class="b-foot"><span><kbd>↑</kbd><kbd>↓</kbd> moverse</span><span><kbd>Enter</kbd> abrir</span><span>${isDeck ? 'Busca en las diapositivas' : 'Busca en todas las páginas'}</span></div>
      </div>`;
    document.body.appendChild(modal);

    input = modal.querySelector('.b-input');
    list = modal.querySelector('.b-list');

    modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
    input.addEventListener('input', () => render(input.value));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { close(); return; }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); open(); return; }
      if (e.key === '/' && !modal.classList.contains('is-open')) {
        const tag = (document.activeElement && document.activeElement.tagName) || '';
        if (tag !== 'INPUT' && tag !== 'TEXTAREA') { e.preventDefault(); open(); }
        return;
      }
      if (!modal.classList.contains('is-open')) return;
      if (e.key === 'ArrowDown') { e.preventDefault(); if (results.length) setActive((active + 1) % results.length); }
      if (e.key === 'ArrowUp') { e.preventDefault(); if (results.length) setActive((active - 1 + results.length) % results.length); }
      if (e.key === 'Enter') { e.preventDefault(); go(active); }
    });

    /* Botón flotante */
    const fab = document.createElement('button');
    fab.className = 'b-fab';
    fab.type = 'button';
    fab.title = 'Buscar (Ctrl+K o /)';
    fab.innerHTML = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg><em>Buscar</em>';
    fab.addEventListener('click', open);
    document.body.appendChild(fab);

    /* Botón en la barra superior (páginas de documento) */
    const nav = document.querySelector('.topnav');
    if (nav) {
      const b = document.createElement('button');
      b.className = 'b-navbtn';
      b.type = 'button';
      b.innerHTML = 'Buscar <kbd>Ctrl K</kbd>';
      b.addEventListener('click', open);
      nav.appendChild(b);
    }
  }

  function boot() {
    if (isDeck) buildDeck(); else buildFromIndex();
    init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
