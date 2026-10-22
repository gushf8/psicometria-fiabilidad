/* =========================================================
   Nomenclatura de Fiabilidad
   - Al pasar el ratón por cualquier símbolo o razón aparece
     una tarjeta con su significado, y en las razones, qué
     significa el NUMERADOR y qué el DENOMINADOR.
   - Botón "Σ" con la tabla completa de nomenclatura.
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Glosario ---------- */
  const T = {
    // ---------------- RAZONES (numerador / denominador) ----------------
    'σ²V/σ²X': {
      sym: 'σ²V / σ²X',
      label: 'Razón de varianza verdadera',
      num: ['σ²V', 'Varianza de las puntuaciones verdaderas: la dispersión que refleja diferencias reales entre las personas.'],
      den: ['σ²X', 'Varianza de las puntuaciones observadas: toda la dispersión que hay en el grupo, señal + ruido.'],
      desc: 'Compara la parte “real” con el total de lo observado.',
      res: 'Es el <b>coeficiente de fiabilidad</b> r<sub>xx</sub>. Con r = 0,90, el 90 % de la varianza observada es verdadera.'
    },
    'σ²E/σ²X': {
      sym: 'σ²E / σ²X',
      label: 'Razón de varianza de error',
      num: ['σ²E', 'Varianza del error: la dispersión producida por el ruido aleatorio de la medida.'],
      den: ['σ²X', 'Varianza de las puntuaciones observadas: el total de la dispersión del grupo.'],
      desc: 'Mide qué parte de lo observado es ruido.',
      res: 'Es 1 − r<sub>xx</sub>. Con r = 0,90, el 10 % de la varianza observada es error.'
    },
    'σV/σX': {
      sym: 'σV / σX',
      label: 'Razón de desviación verdadera',
      num: ['σV', 'Desviación típica verdadera: raíz de σ²V, en puntos del test.'],
      den: ['σX', 'Desviación típica observada: raíz de σ²X, en puntos del test.'],
      desc: 'Al pasar de varianzas a desviaciones hay que aplicar raíz cuadrada: no es una resta.',
      res: 'Es el <b>índice de fiabilidad</b> r<sub>XV</sub> = √r<sub>xx</sub>. Con r = 0,90 vale 0,9487.'
    },
    'σE/σX': {
      sym: 'σE / σX',
      label: 'Razón de desviación del error',
      num: ['σE', 'Error típico de medida: la desviación típica de los errores.'],
      den: ['σX', 'Desviación típica de las puntuaciones observadas.'],
      desc: 'Cuánta de la dispersión que vemos aporta el error.',
      res: 'Coincide con r(X,E) = √(1 − r<sub>xx</sub>). Con r = 0,90 vale 0,3162.'
    },
    'r(X,E)': {
      sym: 'r(X,E)',
      label: 'Correlación observadas ↔ error',
      num: ['σE', 'Error típico de medida (desviación de los errores).'],
      den: ['σX', 'Desviación típica observada.'],
      desc: 'No es 0: el error forma parte de la puntuación observada, así que la acompaña. Su valor es σE/σX.',
      res: 'Vale √(1 − r<sub>xx</sub>): 0,3162 con r = 0,90.'
    },
    'r(V,E)': {
      sym: 'r(V,E)',
      label: 'Correlación verdaderas ↔ error',
      desc: 'El modelo clásico <b>supone</b> que el error es aleatorio y no depende del nivel real de la persona, por eso vale 0. No se calcula con los datos: es un supuesto.',
      res: 'Siempre 0 por definición del modelo.'
    },

    'σ_XX′': {
      sym: 'σ_XX′',
      label: 'Covarianza entre dos medidas',
      desc: 'Es el <b>numerador</b> de la correlación entre dos formas paralelas o entre test y retest: indica cuánto varían juntas ambas medidas.',
      res: 'σ<sub>XX′</sub> = Σ(X−X̄)(X′−X̄′)/N · <b>esto sí es la covarianza</b>'
    },
    'r_XX′': {
      sym: 'r_XX′',
      label: 'Coeficiente entre formas paralelas',
      num: ['σXX′', 'Covarianza entre las dos medidas (formas paralelas o test y retest).'],
      den: ['σX · σX′', 'Producto de las desviaciones típicas de cada medida.'],
      desc: 'No es la covarianza: es la correlación entre las dos medidas, y con formas paralelas <b>es</b> el coeficiente de fiabilidad.',
      res: 'r<sub>XX′</sub> = σ<sub>XX′</sub> / (σ<sub>X</sub>·σ<sub>X′</sub>)'
    },

    'sigma': { sym: 'σ', label: 'Desviación típica (poblacional)', desc: 'También llamada <b>desviación estándar</b> (o “standard deviation”). Es la raíz cuadrada de la varianza. Se usa con la población.', res: 'σ = √σ²' },
    's': { sym: 's', label: 'Desviación típica (muestral)', desc: 'La misma idea calculada en una muestra. Alias: desviación estándar, SD. <b>s y σ son lo mismo</b>, cambia la muestra.', res: 's = √s²' },
    'sigma2p': { sym: 'σ²', label: 'Varianza poblacional', desc: 'Suma de cuadrados dividida entre N (toda la población).', res: 'σ² = Σ(x−μ)² / N' },
    's2m': { sym: 's²', label: 'Varianza muestral', desc: 'Suma de cuadrados dividida entre N − 1 (muestra).', res: 's² = Σ(x−x̄)² / (N−1)' },
    'xbar': { sym: 'x̄', label: 'Media muestral', desc: 'Promedio de la muestra; se usa cuando la media es un estadístico y no el parámetro μ.', res: 'x̄ = Σx / N' },
    'Syx': { sym: 'S_yx', label: 'Error típico de estimación', desc: '¡No es el error típico de medida! Se usa en regresión/validez para predecir un criterio a partir del test.', res: 'S_yx = s_y·√(1−r²)' },
    'r2det': { sym: 'r²', label: 'Coeficiente de determinación', desc: 'Proporción de varianza compartida entre dos variables (validez). <b>No es la fiabilidad</b>, aunque se escriba igual que r al cuadrado.', res: 'r² = r·r' },

    // ---------------- SÍMBOLOS ----------------
    'X': { sym: 'X', label: 'Puntuación observada', desc: 'La puntuación que se obtiene al aplicar el test. Es la única que vemos.', res: 'X = V + E' },
    'V': { sym: 'V', label: 'Puntuación verdadera', desc: 'El nivel real del rasgo: la media de las puntuaciones que se obtendrían al repetir la medida muchas veces.', res: 'No se observa directamente.' },
    'E': { sym: 'E', label: 'Error de medida', desc: 'La parte aleatoria que separa lo observado de lo verdadero.', res: 'E = X − V' },
    'σ²X': { sym: 'σ²X', label: 'Varianza observada', desc: 'Dispersión al cuadrado de las puntuaciones del grupo.', res: 'σ²X = σ²V + σ²E' },
    'σ²V': { sym: 'σ²V', label: 'Varianza verdadera', desc: 'Parte de la dispersión que refleja diferencias reales entre personas.', res: 'σ²V = r<sub>xx</sub> · σ²X' },
    'σ²E': { sym: 'σ²E', label: 'Varianza de error', desc: 'Parte de la dispersión debida al ruido de la medida.', res: 'σ²E = (1 − r<sub>xx</sub>) · σ²X' },
    'σV': { sym: 'σV', label: 'Desviación típica verdadera', desc: 'Raíz cuadrada de la varianza verdadera: la misma idea en puntos del test.', res: 'σV = √σ²V' },
    'σX': { sym: 'σX', label: 'Desviación típica observada', desc: 'Raíz cuadrada de la varianza observada.', res: 'σX = √σ²X' },
    'σE': { sym: 'σE', label: 'Error típico de medida', desc: 'Desviación típica de los errores: cuánto se espera que se equivoque el test, en puntos de la escala.', res: 'σE = σX · √(1 − r<sub>xx</sub>)' },
    'r_xx': { sym: 'r_xx', label: 'Coeficiente de fiabilidad', desc: 'Proporción de la varianza observada que es verdadera. Va de 0 a 1.', res: 'r<sub>xx</sub> = σ²V / σ²X' },
    'r_XV': { sym: 'r_XV', label: 'Índice de fiabilidad', desc: 'Correlación entre la puntuación observada y la verdadera. Siempre es mayor que el coeficiente.', res: 'r<sub>XV</sub> = √r<sub>xx</sub>' },
    'r_12': { sym: 'r_12', label: 'Correlación entre medidas', desc: 'Correlación entre dos aplicaciones del test o entre dos formas paralelas.', res: 'r<sub>12</sub> = cov / (σ1 · σ2)' },
    'r_1,2': { sym: 'r_1,2', label: 'Correlación entre mitades', desc: 'Correlación entre las dos mitades de un mismo test.', res: 'Se corrige con R = 2r / (1 + r)' },
    'V̂': { sym: 'V̂', label: 'Puntuación verdadera estimada', desc: 'La mejor aproximación a V a partir de X y de la fiabilidad. Se acerca a la media (regresión a la media).', res: 'V̂ = μX(1 − r) + rX' },
    'v̂': { sym: 'v̂', label: 'Estimación diferencial', desc: 'La puntuación verdadera estimada expresada como distancia a la media.', res: 'v̂ = r · (X − μX)' },
    'μX': { sym: 'μX', label: 'Media observada', desc: 'Promedio del grupo en el test. Es el punto al que tienden las estimaciones.', res: 'μX = μV' },
    'μV': { sym: 'μV', label: 'Media verdadera', desc: 'Media de las puntuaciones verdaderas. En el modelo coincide con la observada.', res: 'μV = μX' },
    'k': { sym: 'k', label: 'Razón de longitud', desc: 'Cuántas veces es de largo el test nuevo respecto al original. No es el número de ítems añadidos.', res: 'k = nF / nI' },
    'R': { sym: 'R', label: 'Fiabilidad corregida', desc: 'Coeficiente del test después de alargarlo, acortarlo o corregir la longitud de las mitades.', res: 'R = kr / [1 + (k−1)r]' },
    'nI': { sym: 'nI', label: 'Ítems iniciales', desc: 'Número de ítems del test que ya existe, antes de modificarlo.', res: 'nF = k · nI' },
    'nF': { sym: 'nF', label: 'Ítems finales', desc: 'Número de ítems del test después de alargarlo o acortarlo.', res: 'nF = k · nI' },
    's²X': { sym: 's²X', label: 'Varianza total del test', desc: 'Dispersión de las puntuaciones totales (la suma de todos los ítems).', res: 'Aparece en α, KR-20, Rulon y Guttman.' },
    's²d': { sym: 's²d', label: 'Varianza de las diferencias', desc: 'Dispersión de las diferencias entre las dos mitades de cada persona (V1 − V2).', res: 'R = 1 − s²d / s²X' },
    's²i': { sym: 's²i', label: 'Varianza de un ítem', desc: 'Dispersión de las respuestas a un ítem concreto.', res: 'Σs²i = suma de todas las varianzas de ítem' },
    'Σs²i': { sym: 'Σs²i', label: 'Suma de varianzas de ítem', desc: 'Suma de la varianza de cada ítem del test. En alfa hace el papel de “error”.', res: 'Σs²i = s²X[1 − α(k−1)/k]' },
    'Σpq': { sym: 'Σpq', label: 'Suma de p·q', desc: 'Suma de las varianzas de los ítems dicotómicos (cada una vale p·q).', res: 'Es la versión de Σs²i para ítems 0/1.' },
    'p': { sym: 'p', label: 'Proporción de aciertos', desc: 'Fracción de personas que aciertan o responden 1 al ítem.', res: 'p = A / N' },
    'q': { sym: 'q', label: 'Proporción de fallos', desc: 'La parte que falta para 1.', res: 'q = 1 − p' },
    'α': { sym: 'α', label: 'Alfa de Cronbach', desc: 'Consistencia interna entre los ítems del test, con cualquier tipo de respuesta.', res: 'α = [k/(k−1)]·[1 − Σs²i/s²X]' },
    'KR-20': { sym: 'KR-20', label: 'Kuder-Richardson 20', desc: 'El mismo alfa, aplicado a ítems dicotómicos (0/1).', res: 'KR = [k/(k−1)]·[1 − Σpq/s²X]' },
    'cov': { sym: 'cov', label: 'Covarianza', desc: 'Indica cómo cambian juntas dos variables: si tienden a moverse en el mismo sentido, es positiva.', res: 'cov = r · σX · σY' },
    'z': { sym: 'z', label: 'Puntuación típica', desc: 'Distancia a la media medida en desviaciones típicas.', res: 'z = (X − μX) / σX' },
    'z_X': { sym: 'z_X', label: 'Típica observada', desc: 'La puntuación observada expresada en unidades de desviación típica.', res: 'z<sub>X</sub> = (X − μX)/σX' },
    'z_V̂': { sym: 'z_V̂', label: 'Típica estimada', desc: 'La puntuación verdadera estimada, en unidades z.', res: 'z<sub>V̂</sub> = r<sub>XV</sub> · z<sub>X</sub>' },
    'σze': { sym: 'σze', label: 'Error típico en típicas', desc: 'El error de medida expresado en unidades z.', res: 'σ<sub>ze</sub> = √(1 − r<sub>xx</sub>)' },
    'IC': { sym: 'IC', label: 'Intervalo de confianza', desc: 'Rango en el que esperamos que esté la puntuación verdadera. Se construye alrededor de la puntuación observada.', res: 'IC = X ± z·σE' },
    'N': { sym: 'N', label: 'Tamaño de la muestra', desc: 'Número de personas evaluadas.', desc2: '', res: 'Se usa para la covarianza y las varianzas.' },
    'n': { sym: 'n', label: 'Número de ítems', desc: 'Cantidad de ítems del test (o de casos, según el contexto).', res: '' }
  };

  /* ---------- Orden del panel ---------- */
  const PANEL = [
    ['Razones: numerador y denominador', ['σ²V/σ²X', 'σ²E/σ²X', 'σV/σX', 'σE/σX', 'r(X,E)', 'r(V,E)']],
    ['Puntuaciones y varianzas', ['X', 'V', 'E', 'σ²X', 'σ²V', 'σ²E', 'σX', 'σV', 'σE', 'μX', 'μV']],
    ['Fiabilidad', ['r_xx', 'r_XV', 'r_12', 'r_1,2', 'V̂', 'v̂', 'z', 'z_X', 'z_V̂', 'σze', 'IC']],
    ['Longitud y muestra', ['k', 'R', 'nI', 'nF', 'n']],
    ['Consistencia interna', ['s²X', 's²d', 's²i', 'Σs²i', 'Σpq', 'p', 'q', 'α', 'KR-20', 'N']],
    ['Datos', ['cov']],
    ['Nombres alternativos y confusiones', ['sigma', 's', 'sigma2p', 's2m', 'xbar', 'Syx', 'r2det']]
  ];


  /* ---------- Catálogo: nombre de cada fórmula ---------- */
  const FORMULAS = [
    ['Ecuación fundamental del modelo clásico', 'X = V + E', 'Lo observado es lo verdadero más el error.'],
    ['Varianza observada', 'σ²X = σ²V + σ²E', 'La varianza se reparte entre verdadera y error.'],
    ['Coeficiente de fiabilidad (por varianzas)', 'r_xx = σ²V / σ²X', 'Proporción de varianza observada que es verdadera.'],
    ['Coeficiente de fiabilidad (por el error)', 'r_xx = 1 − σ²E / σ²X', 'La misma idea, restando la parte de error.'],
    ['Índice de fiabilidad', 'r_XV = σV / σX = √r_xx', 'Correlación entre lo observado y lo verdadero.'],
    ['Correlación observadas-error', 'r_XE = σE / σX', 'Cuánto acompaña el error a la puntuación observada.'],
    ['Covarianza', 'σ_XY = Σxy / N', 'Producto medio de las puntuaciones diferenciales.'],
    ['Coeficiente de correlación de Pearson', 'r_XY = σ_XY / (σX·σY)', 'Covarianza estandarizada: de −1 a 1.'],
    ['Fiabilidad entre formas paralelas / test-retest', 'r_XX′ = σ_XX′ / (σX·σX′)', 'Correlación entre las dos medidas: ES la fiabilidad.'],
    ['Error típico de medida (directas)', 'σE = σX·√(1 − r_xx)', 'Desviación típica de los errores, en puntos.'],
    ['Error típico (diferenciales)', 'σe = σE', 'El mismo error, en puntuaciones diferenciales.'],
    ['Error típico (típicas)', 'σze = √(1 − r_xx)', 'El error medido en unidades z.'],
    ['Ecuación de pronóstico (directas)', 'V̂ = μX(1 − r) + rX', 'Estimación de la puntuación verdadera.'],
    ['Ecuación de pronóstico (diferenciales)', 'v̂ = r · x', 'La misma estimación respecto a la media.'],
    ['Ecuación de pronóstico (típicas)', 'z_V̂ = r_XV · z_X', 'La misma estimación en unidades z.'],
    ['Intervalo de confianza', 'IC = X ± z·σE', 'Rango probable de la puntuación verdadera.'],
    ['Ecuación de Spearman-Brown', 'R = k·r / [1 + (k−1)·r]', 'Fiabilidad al alargar o acortar el test.'],
    ['Razón de longitud', 'k = nF / nI', 'Veces que se alarga o acorta el test.'],
    ['Cálculo de k para alcanzar R', 'k = R(1−r) / [r(1−R)]', 'Cuánto hay que alargar para llegar a R.'],
    ['Fiabilidad en otro grupo (variabilidad)', 'r₂ = 1 − (1−r₁)(σ²₁/σ²₂)', 'Cambia la fiabilidad si cambia la varianza del grupo.'],
    ['Dos mitades (Spearman-Brown)', 'R = 2r₁₂ / (1 + r₁₂)', 'Corrige la correlación entre mitades al test completo.'],
    ['Fórmula de Rulon', 'R = 1 − s²d / s²X', 'Fiabilidad a partir de la varianza de las diferencias.'],
    ['Fórmula de Guttman-Flanagan', 'R = 2[1 − (s²₁+s²₂)/s²X]', 'Fiabilidad a partir de la varianza de cada mitad.'],
    ['Alfa de Cronbach', 'α = [k/(k−1)]·[1 − Σs²i/s²X]', 'Consistencia interna con cualquier tipo de ítem.'],
    ['KR-20 (Kuder-Richardson)', 'KR₂₀ = [k/(k−1)]·[1 − Σpq/s²X]', 'Alfa para ítems dicotómicos (0/1).']
  ];

  /* ---------- Detección en texto plano ---------- */
  const RX = /(σ²V\s*\/\s*σ²X|σ²E\s*\/\s*σ²X|σV\s*\/\s*σX|σE\s*\/\s*σX|r\s*\(\s*X\s*,\s*E\s*\)|r\s*\(\s*V\s*,\s*E\s*\)|σ²V|σ²E|σ²X|σ²d|σV|σX|σE|σze|r_\{?xx\}?|r_\{?XV\}?|r_\{?12\}?|r_1,2|s²X|s²d|s²i|Σs²i|Σpq|V̂|v̂|μX|μV|KR-20|α|z_V̂|z_X)/g;

  function keyOf(txt) {
    let k = txt.replace(/\s+/g, '').replace(/\{|\}/g, '');
    if (k === 'rxx') return 'r_xx';
    if (k === 'rXV') return 'r_XV';
    if (k === 'r12') return 'r_12';
    if (k === 'zV̂') return 'z_V̂';
    if (k === 'zX') return 'z_X';
    return k;
  }

  const SKIP = 'script,style,textarea,pre,code,.katex,.g-term,.g-card,.g-modal,[data-no-glosario]';

  function wrapNode(node) {
    const txt = node.nodeValue;
    if (!txt) return;
    // No tocar LaTeX sin renderizar: si hay barras invertidas, es fuente matemática
    if (txt.indexOf('\\') !== -1) return;
    if (!/σ|α|Σ|KR-20|r_|V̂|v̂|μ/.test(txt)) return;
    RX.lastIndex = 0;
    let m, last = 0, frag = null;
    while ((m = RX.exec(txt))) {
      const key = keyOf(m[0]);
      if (!T[key]) continue;
      if (!frag) frag = document.createDocumentFragment();
      if (m.index > last) frag.appendChild(document.createTextNode(txt.slice(last, m.index)));
      const span = document.createElement('span');
      span.className = 'g-term';
      span.dataset.g = key;
      span.textContent = m[0];
      frag.appendChild(span);
      last = m.index + m[0].length;
    }
    if (!frag) return;
    if (last < txt.length) frag.appendChild(document.createTextNode(txt.slice(last)));
    node.parentNode.replaceChild(frag, node);
  }

  function scan(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(n) {
        if (!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if (n.parentElement && n.parentElement.closest(SKIP)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(wrapNode);
  }

  /* ---------- Fórmulas: qué símbolos contiene ---------- */
  const LATEX_MAP = [
    ['σ²V', /\\sigma\^2_V|\\sigma_V\^2/],
    ['σ²X', /\\sigma\^2_X|\\sigma_X\^2/],
    ['σ²E', /\\sigma\^2_E|\\sigma_E\^2/],
    ['σV', /\\sigma_V(?!\^)/],
    ['σX', /\\sigma_X(?!\^)/],
    ['σE', /\\sigma_E(?!\^)/],
    ['r_xx', /r_\{xx\}/],
    ['r_XV', /r_\{XV\}/],
    ['r_12', /r_\{12\}|r_\{1,2\}/],
    ['V̂', /\\hat\{V\}/],
    ['v̂', /\\hat\{v\}/],
    ['μX', /\\mu_X/],
    ['s²X', /s\^2_X|\\sigma\^2_X/],
    ['s²d', /s\^2_d/],
    ['s²i', /s\^2_i/],
    ['Σs²i', /\\sum s\^2_i/],
    ['Σpq', /\\sum p_iq_i/],
    ['α', /\\alpha/],
    ['KR-20', /KR_\{?20\}?/],
    ['cov', /\\sigma_\{?AB\}?|\\operatorname\{cov\}|cov/]
  ];

  function formulaSymbols(el) {
    const ann = el.querySelector('annotation[encoding="application/x-tex"]');
    const latex = ann ? ann.textContent : el.textContent;
    const out = [];
    LATEX_MAP.forEach(([k, rx]) => {
      if (T[k] && rx.test(latex) && !out.includes(k)) out.push(k);
    });
    return out.slice(0, 5);
  }

  function buildFormula(keys) {
    let h = `<div class="g-card__top"><span class="g-card__sym">Fórmula</span><span class="g-card__lbl">Símbolos que aparecen</span></div>`;
    h += '<div class="g-flist">';
    keys.forEach((k) => {
      const t = T[k];
      h += `<div class="g-fitem"><b>${t.sym}</b><span>${t.label}</span></div>`;
    });
    h += '</div>';
    h += `<div class="g-res">Pasa el ratón por cada símbolo del texto para ver su detalle, o abre <b>Σ Nomenclatura</b>.</div>`;
    return h;
  }

  /* ---------- Tarjeta ---------- */
  let card = null, current = null;

  function build(key) {
    const t = T[key];
    if (!t) return '';
    let h = `<div class="g-card__top"><span class="g-card__sym">${t.sym}</span><span class="g-card__lbl">${t.label}</span></div>`;
    if (t.num) {
      h += `<div class="g-row"><span class="g-badge">NUM</span><div><b>${t.num[0]}</b> ${t.num[1]}</div></div>`;
      h += `<div class="g-row"><span class="g-badge g-badge--den">DEN</span><div><b>${t.den[0]}</b> ${t.den[1]}</div></div>`;
      h += `<div class="g-sep"></div>`;
    }
    h += `<p class="g-desc">${t.desc}</p>`;
    if (t.res) h += `<div class="g-res">${t.res}</div>`;
    return h;
  }

  function ensureCard() {
    if (!card) {
      card = document.createElement('div');
      card.className = 'g-card';
      card.setAttribute('role', 'tooltip');
      document.body.appendChild(card);
    }
    return card;
  }

  function place(el) {
    const r = el.getBoundingClientRect();
    const c = ensureCard();
    c.style.visibility = 'hidden';
    c.style.left = '0px';
    c.style.top = '0px';
    const cw = c.offsetWidth, ch = c.offsetHeight;
    let x = r.left + r.width / 2 - cw / 2;
    x = Math.max(10, Math.min(x, window.innerWidth - cw - 10));
    let y = r.top - ch - 10;
    if (y < 10) y = r.bottom + 10;
    c.style.left = x + 'px';
    c.style.top = y + 'px';
    c.style.visibility = 'visible';
  }

  function show(el, key) {
    const c = ensureCard();
    c.innerHTML = build(key);
    current = el;
    c.classList.add('is-on');
    place(el);
  }

  function showFormula(el, keys) {
    const c = ensureCard();
    c.innerHTML = buildFormula(keys);
    current = el;
    c.classList.add('is-on');
    place(el);
  }

  function hide() {
    if (card) card.classList.remove('is-on');
    current = null;
  }

  function bind() {
    document.addEventListener('mouseover', (e) => {
      const el = e.target.closest('.g-term, [data-gbox]');
      if (el) {
        const key = el.dataset.g || el.dataset.gbox;
        if (T[key] && el !== current) show(el, key);
        return;
      }
      // Fórmulas (solo en el cuaderno de ejercicios, para no duplicar los tooltips de la presentación)
      if (document.body.classList.contains('ejercicios')) {
        const f = e.target.closest('.fx, .eq__main');
        if (f && f !== current) {
          const keys = formulaSymbols(f);
          if (keys.length) { showFormula(f, keys); return; }
        }
      }
      if (!e.target.closest('.g-card')) hide();
    });
    document.addEventListener('mouseout', (e) => {
      const el = e.target.closest('.g-term, [data-gbox], .fx, .eq__main');
      if (el && !el.contains(e.relatedTarget)) hide();
    });
    document.addEventListener('focusin', (e) => {
      const el = e.target.closest('.g-term');
      if (el && T[el.dataset.g]) show(el, el.dataset.g);
    });
    document.addEventListener('focusout', hide);
    window.addEventListener('scroll', hide, { passive: true });
  }

  /* ---------- Panel de nomenclatura ---------- */
  function buildPanel() {
    const rows = PANEL.map(([title, keys]) => {
      let h = `<tr class="g-group"><td colspan="4">${title}</td></tr>`;
      keys.forEach((k) => {
        const t = T[k];
        if (!t) return;
        const num = t.num ? `<b>${t.num[0]}</b> ${t.num[1]}` : '—';
        const den = t.den ? `<b>${t.den[0]}</b> ${t.den[1]}` : '—';
        h += `<tr><td class="g-sym">${t.sym}</td><td><b>${t.label}</b><div class="g-mini">${t.desc}</div></td><td class="g-num">${num}</td><td class="g-num">${den}</td></tr>`;
      });
      return h;
    }).join('');

    const frows = FORMULAS.map(([name, tex, what]) =>
      `<tr><td class="g-sym">${tex}</td><td><b>${name}</b><div class="g-mini">${what}</div></td></tr>`).join('');

    const wrapEl = document.createElement('div');
    wrapEl.className = 'g-modal';
    wrapEl.innerHTML = `
      <div class="g-modal__box" role="dialog" aria-modal="true" aria-label="Nomenclatura de fiabilidad">
        <header class="g-modal__head">
          <div>
            <div class="g-modal__eyebrow">Nomenclatura</div>
            <h2 class="g-modal__title">Símbolos y fórmulas</h2>
            <p class="g-modal__sub">En las razones se indica por separado qué es el <b>numerador</b> y qué el <b>denominador</b>. En la pestaña <b>Fórmulas</b> está el nombre de cada una. Pasa el ratón por cualquier símbolo de la página para verlo también en contexto.</p>
          </div>
          <button class="g-modal__close" type="button" aria-label="Cerrar">✕</button>
        </header>
        <div class="g-tabs" role="tablist">
          <button class="g-tab is-on" type="button" data-tab="sym" role="tab">Símbolos</button>
          <button class="g-tab" type="button" data-tab="for" role="tab">Fórmulas y cómo se llaman</button>
        </div>
        <div class="g-modal__scroll" data-sec="sym">
          <table class="g-table">
            <thead><tr><th>Símbolo</th><th>Qué es</th><th>Numerador</th><th>Denominador</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
        <div class="g-modal__scroll" data-sec="for" hidden>
          <table class="g-table">
            <thead><tr><th>Fórmula</th><th>Nombre y qué calcula</th></tr></thead>
            <tbody>${frows}</tbody>
          </table>
        </div>
      </div>`;
    document.body.appendChild(wrapEl);

    wrapEl.querySelector('.g-modal__close').addEventListener('click', () => wrapEl.classList.remove('is-open'));
    wrapEl.addEventListener('click', (e) => { if (e.target === wrapEl) wrapEl.classList.remove('is-open'); });
    wrapEl.querySelectorAll('.g-tab').forEach((b) => b.addEventListener('click', () => {
      wrapEl.querySelectorAll('.g-tab').forEach((x) => x.classList.toggle('is-on', x === b));
      wrapEl.querySelectorAll('[data-sec]').forEach((sec) => { sec.hidden = sec.dataset.sec !== b.dataset.tab; });
    }));
    return wrapEl;
  }

  function initPanel() {
    const modal = buildPanel();
    const fab = document.createElement('button');
    fab.className = 'g-fab';
    fab.type = 'button';
    fab.title = 'Nomenclatura de símbolos (N)';
    fab.innerHTML = '<span>Σ</span><em>Nomenclatura</em>';
    fab.addEventListener('click', () => modal.classList.toggle('is-open'));
    document.body.appendChild(fab);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') modal.classList.remove('is-open');
      if ((e.key === 'n' || e.key === 'N') && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const tag = (document.activeElement && document.activeElement.tagName) || '';
        if (tag !== 'INPUT' && tag !== 'TEXTAREA') modal.classList.toggle('is-open');
      }
    });
  }

  /* ---------- Inicio ---------- */
  let started = false;
  function boot() {
    scan(document.body);
    if (!started) {
      started = true;
      bind();
      initPanel();
    }
  }

  // Se ejecuta después de que KaTeX haya renderizado (y se repite por si acaso)
  const later = () => {
    setTimeout(boot, 400);
    setTimeout(boot, 1800);
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', later);
  } else {
    later();
  }
})();
