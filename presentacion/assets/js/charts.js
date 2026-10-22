/* =========================================================
   Gráficos de la presentación (Chart.js)
   ========================================================= */
(function () {
  'use strict';
  if (typeof Chart === 'undefined') return;

  const C = {
    teal: '#2dd4bf',
    tealL: '#5eead4',
    tealSoft: 'rgba(45,212,191,.18)',
    violet: '#a78bfa',
    violetSoft: 'rgba(167,139,250,.2)',
    amber: '#fbbf24',
    amberSoft: 'rgba(251,191,36,.2)',
    rose: '#fb7185',
    roseSoft: 'rgba(251,113,133,.2)',
    blue: '#60a5fa',
    ink: '#eaf1ff',
    muted: '#94a6bf',
    grid: 'rgba(148,163,184,.10)',
    axis: 'rgba(148,163,184,.22)'
  };

  Chart.defaults.font.family = "'Inter', system-ui, sans-serif";
  Chart.defaults.font.size = 10;
  Chart.defaults.color = C.muted;
  Chart.defaults.borderColor = C.grid;
  Chart.defaults.animation.duration = 950;
  Chart.defaults.animation.easing = 'easeOutQuart';
  Chart.defaults.plugins.legend.labels.usePointStyle = true;
  Chart.defaults.plugins.legend.labels.boxWidth = 7;
  Chart.defaults.plugins.legend.labels.boxHeight = 7;
  Chart.defaults.plugins.legend.labels.padding = 13;
  Chart.defaults.plugins.legend.labels.color = '#a9b8cc';
  Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(7,14,26,.96)';
  Chart.defaults.plugins.tooltip.borderColor = 'rgba(148,163,184,.24)';
  Chart.defaults.plugins.tooltip.borderWidth = 1;
  Chart.defaults.plugins.tooltip.titleColor = '#eaf1ff';
  Chart.defaults.plugins.tooltip.bodyColor = '#c3d1e5';
  Chart.defaults.plugins.tooltip.padding = 9;
  Chart.defaults.plugins.tooltip.cornerRadius = 7;
  Chart.defaults.plugins.tooltip.displayColors = true;
  Chart.defaults.plugins.tooltip.boxPadding = 3;
  Chart.defaults.maintainAspectRatio = false;

  /* Texto central para doughnuts */
  const centerText = {
    id: 'centerText',
    afterDraw(chart, _args, opts) {
      if (!opts || !opts.text) return;
      const { ctx, chartArea } = chart;
      const x = (chartArea.left + chartArea.right) / 2;
      const y = (chartArea.top + chartArea.bottom) / 2;
      ctx.save();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = opts.color || '#eaf1ff';
      ctx.font = `600 ${opts.size || 26}px Sora, Inter, sans-serif`;
      ctx.fillText(opts.text, x, y - (opts.sub ? 7 : 0));
      if (opts.sub) {
        ctx.fillStyle = 'rgba(148,163,184,.9)';
        ctx.font = '600 8px Inter, sans-serif';
        ctx.letterSpacing = '1.5px';
        ctx.fillText(opts.sub.toUpperCase(), x, y + 14);
      }
      ctx.restore();
    }
  };
  Chart.register(centerText);

  /* Etiquetas de valor al final de las barras horizontales */
  const barValues = {
    id: 'barValues',
    afterDatasetsDraw(chart, _args, opts) {
      if (!opts || !opts.display) return;
      const { ctx, chartArea } = chart;
      chart.data.datasets.forEach((ds, di) => {
        const meta = chart.getDatasetMeta(di);
        if (meta.hidden) return;
        meta.data.forEach((el, i) => {
          const v = ds.data[i];
          if (v == null || Number.isNaN(Number(v))) return;
          const txt = Number(v).toFixed(opts.decimals ?? 0);
          ctx.save();
          ctx.font = '600 9.5px Inter, sans-serif';
          ctx.textBaseline = 'middle';
          const width = ctx.measureText(txt).width;
          const inside = el.x + 6 + width > chartArea.right - 2;
          ctx.textAlign = inside ? 'right' : 'left';
          ctx.fillStyle = inside ? 'rgba(5,25,22,.85)' : '#dbe9f8';
          ctx.fillText(txt, inside ? el.x - 6 : el.x + 6, el.y);
          ctx.restore();
        });
      });
    }
  };
  Chart.register(barValues);

  function axis(xTitle, yTitle, extra = {}) {
    return {
      x: {
        type: 'linear',
        grid: { color: C.grid, drawTicks: false },
        border: { display: false },
        ticks: { color: '#7f93ae', padding: 6, maxRotation: 0 },
        title: xTitle ? { display: true, text: xTitle, color: '#6f829e', font: { size: 9, weight: '600' }, padding: { top: 6 } } : undefined,
        ...(extra.x || {})
      },
      y: {
        type: 'linear',
        grid: { color: C.grid, drawTicks: false },
        border: { display: false },
        ticks: { color: '#7f93ae', padding: 6 },
        title: yTitle ? { display: true, text: yTitle, color: '#6f829e', font: { size: 9, weight: '600' }, padding: { bottom: 6 } } : undefined,
        ...(extra.y || {})
      }
    };
  }

  const F = {};

  /* ---------- Seminario 2 · descomposición de la varianza ---------- */
  F['s2-var'] = (canvas) => new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: ['Varianza verdadera · 90 %', 'Varianza de error · 10 %'],
      datasets: [{
        data: [90, 10],
        backgroundColor: ['rgba(45,212,191,.82)', 'rgba(251,113,133,.75)'],
        hoverBackgroundColor: [C.tealL, '#fda4af'],
        borderWidth: 0,
        spacing: 3,
        borderRadius: 4
      }]
    },
    options: {
      cutout: '74%',
      plugins: {
        legend: { position: 'bottom', labels: { padding: 12 } },
        centerText: { text: 'r = .90', sub: 'fiabilidad', color: C.tealL, size: 24 },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ${ctx.label}: ${ctx.parsed} % de σ²X`
          }
        }
      }
    }
  });

  /* ---------- Seminario 2 · regresión a la media ---------- */
  F['s2-reg'] = (canvas) => {
    // Nube ilustrativa alrededor de la recta V' = 20 + .82 (X - 20)
    const cloud = [
      [13, 15.1], [14, 16.8], [15, 14.9], [16, 18.8], [17, 18.2], [17.5, 21.1],
      [19, 20.4], [20, 23.2], [21, 20.1], [22, 22.7], [23, 24.8], [24, 23.1],
      [25, 25.9], [26, 24.2], [27, 27.6], [28, 26.1], [29, 29.3], [31, 28.4],
      [32, 30.6], [33, 29.8], [34, 32.1], [35, 31.4], [36, 33.2], [37, 32.6]
    ];
    const reg = (x) => 20 + 0.82 * (x - 20);
    return new Chart(canvas, {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'Personas (esquema)',
            data: cloud,
            backgroundColor: 'rgba(148,163,184,.36)',
            pointRadius: 3,
            pointHoverRadius: 4
          },
          {
            label: 'Recta de regresión',
            data: [{ x: 10, y: reg(10) }, { x: 40, y: reg(40) }],
            type: 'scatter',
            showLine: true,
            borderColor: C.teal,
            borderWidth: 2,
            pointRadius: 0,
            fill: false
          },
          {
            label: 'Identidad V = X',
            data: [{ x: 10, y: 10 }, { x: 40, y: 40 }],
            showLine: true,
            borderColor: 'rgba(148,163,184,.28)',
            borderDash: [4, 5],
            borderWidth: 1,
            pointRadius: 0
          },
          {
            label: 'Guías',
            data: [{ x: 30, y: 16 }, { x: 30, y: 28.2 }, { x: 16, y: 28.2 }],
            showLine: true,
            borderColor: C.amber,
            borderDash: [3, 3],
            borderWidth: 1,
            pointRadius: 0
          },
          {
            label: 'X = 30 (observada)',
            data: [{ x: 30, y: 30 }],
            backgroundColor: C.amber,
            borderColor: '#0b1424',
            borderWidth: 2,
            pointRadius: 5.5,
            pointHoverRadius: 7
          },
          {
            label: "V' = 28.2 (estimada)",
            data: [{ x: 30, y: 28.2 }],
            backgroundColor: C.tealL,
            borderColor: '#0b1424',
            borderWidth: 2,
            pointRadius: 5.5,
            pointHoverRadius: 7
          }
        ]
      },
      options: {
        scales: axis('Puntuación observada (X)', "Puntuación verdadera estimada (V')", {
          x: { min: 10, max: 40, ticks: { stepSize: 5 } },
          y: { min: 10, max: 40, ticks: { stepSize: 5 } }
        }),
        plugins: {
          legend: { position: 'bottom', labels: { filter: (item) => !['Guías'].includes(item.text) } },
          tooltip: {
            filter: (item) => item.dataset.label !== 'Guías' && item.dataset.label !== 'Identidad V = X',
            callbacks: {
              label: (ctx) => {
                if (ctx.dataset.label === 'Recta de regresión') return ' Recta: V\' = 20 + .82·(X − 20)';
                return ` ${ctx.dataset.label}: (${ctx.parsed.x}, ${ctx.parsed.y})`;
              }
            }
          }
        }
      }
    });
  };

  /* ---------- Seminario 2 · Spearman-Brown (CARAS) ---------- */
  F['s2-sb'] = (canvas) => {
    const r0 = 0.6;
    const curve = [];
    for (let n = 10; n <= 220; n += 2.5) {
      const k = n / 70;
      curve.push({ x: n, y: (k * r0) / (1 + (k - 1) * r0) });
    }
    return new Chart(canvas, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Fiabilidad según longitud',
            data: curve,
            parsing: false,
            borderColor: C.teal,
            borderWidth: 2,
            pointRadius: 0,
            fill: true,
            backgroundColor: (ctx) => {
              const { chart } = ctx;
              if (!chart.chartArea) return 'rgba(45,212,191,.15)';
              const g = chart.ctx.createLinearGradient(0, chart.chartArea.top, 0, chart.chartArea.bottom);
              g.addColorStop(0, 'rgba(45,212,191,.22)');
              g.addColorStop(1, 'rgba(45,212,191,0)');
              return g;
            }
          },
          {
            label: '70 ítems · r = .60',
            data: [{ x: 70, y: 0.6 }],
            parsing: false,
            backgroundColor: C.amber,
            borderColor: C.amber,
            pointRadius: 5,
            pointHoverRadius: 7,
            showLine: false
          },
          {
            label: '+35 ítems · r = .692',
            data: [{ x: 105, y: 0.6923 }],
            parsing: false,
            backgroundColor: C.tealL,
            borderColor: C.tealL,
            pointRadius: 5,
            pointHoverRadius: 7,
            showLine: false
          },
          {
            label: 'Un tercio · r = .333',
            data: [{ x: 23.33, y: 0.3333 }],
            parsing: false,
            backgroundColor: C.rose,
            borderColor: C.rose,
            pointRadius: 5,
            pointHoverRadius: 7,
            showLine: false
          }
        ]
      },
      options: {
        scales: axis('Número de ítems del test', 'Coeficiente de fiabilidad', {
          x: { min: 0, max: 220, ticks: { stepSize: 35 } },
          y: { min: 0, max: 1, ticks: { stepSize: 0.2 } }
        }),
        plugins: {
          legend: { position: 'bottom' },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: n = ${ctx.parsed.x.toFixed(0)}, r = ${ctx.parsed.y.toFixed(3)}`
            }
          }
        }
      }
    });
  };

  /* ---------- Seminario 2 · Spearman-Brown (prueba de Matemáticas) ---------- */
  F['s2-sb2'] = (canvas) => {
    const r0 = 0.8;
    const curve = [];
    for (let n = 8; n <= 220; n += 3) {
      const k = n / 65;
      curve.push({ x: n, y: (k * r0) / (1 + (k - 1) * r0) });
    }
    return new Chart(canvas, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Fiabilidad según longitud',
            data: curve,
            parsing: false,
            borderColor: C.violet,
            borderWidth: 2,
            pointRadius: 0,
            fill: true,
            backgroundColor: (ctx) => {
              const { chart } = ctx;
              if (!chart.chartArea) return 'rgba(167,139,250,.15)';
              const g = chart.ctx.createLinearGradient(0, chart.chartArea.top, 0, chart.chartArea.bottom);
              g.addColorStop(0, 'rgba(167,139,250,.22)');
              g.addColorStop(1, 'rgba(167,139,250,0)');
              return g;
            }
          },
          {
            label: '65 ítems · r = .80',
            data: [{ x: 65, y: 0.8 }],
            parsing: false,
            backgroundColor: C.amber,
            borderColor: C.amber,
            pointRadius: 5,
            pointHoverRadius: 7,
            showLine: false
          },
          {
            label: '146,25 ítems · r = .90',
            data: [{ x: 146.25, y: 0.9 }],
            parsing: false,
            backgroundColor: C.tealL,
            borderColor: C.tealL,
            pointRadius: 5,
            pointHoverRadius: 7,
            showLine: false
          },
          {
            label: '¼ del test · r = .50',
            data: [{ x: 16.25, y: 0.5 }],
            parsing: false,
            backgroundColor: C.rose,
            borderColor: C.rose,
            pointRadius: 5,
            pointHoverRadius: 7,
            showLine: false
          }
        ]
      },
      options: {
        scales: axis('Número de ítems del test', 'Coeficiente de fiabilidad', {
          x: { min: 0, max: 220, ticks: { stepSize: 35 } },
          y: { min: 0, max: 1, ticks: { stepSize: 0.2 } }
        }),
        plugins: {
          legend: { position: 'bottom' },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: n = ${ctx.parsed.x.toFixed(1)}, r = ${ctx.parsed.y.toFixed(3)}`
            }
          }
        }
      }
    });
  };

  /* ---------- Seminario 2 · fiabilidad y variabilidad ---------- */
  F['s2-varcurve'] = (canvas) => {
    const curve = [];
    for (let v = 1; v <= 12; v += 0.1) curve.push({ x: v, y: 1 - 0.88 / v });
    return new Chart(canvas, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'r = 1 − 0,88 / σ²X',
            data: curve,
            parsing: false,
            borderColor: C.teal,
            borderWidth: 2,
            pointRadius: 0,
            fill: true,
            backgroundColor: 'rgba(45,212,191,.08)'
          },
          {
            label: 'σ²X = 2 · r = .56',
            data: [{ x: 2, y: 0.56 }],
            parsing: false,
            backgroundColor: C.rose,
            borderColor: C.rose,
            pointRadius: 5,
            showLine: false
          },
          {
            label: 'σ²X = 4 · r = .78',
            data: [{ x: 4, y: 0.78 }],
            parsing: false,
            backgroundColor: C.amber,
            borderColor: C.amber,
            pointRadius: 5,
            showLine: false
          },
          {
            label: 'σ²X = 8 · r = .89',
            data: [{ x: 8, y: 0.89 }],
            parsing: false,
            backgroundColor: C.tealL,
            borderColor: C.tealL,
            pointRadius: 5,
            showLine: false
          }
        ]
      },
      options: {
        scales: axis('Varianza de las puntuaciones observadas (σ²X)', 'Fiabilidad', {
          x: { min: 0, max: 12, ticks: { stepSize: 2 } },
          y: { min: 0.2, max: 1, ticks: { stepSize: 0.2 } }
        }),
        plugins: { legend: { position: 'bottom' } }
      }
    });
  };

  /* ---------- Seminario 3 · formas paralelas ---------- */
  F['s3-parallel'] = (canvas) => {
    const pts = [
      { x: 20, y: 21, p: 1 }, { x: 15, y: 14, p: 2 }, { x: 18, y: 16, p: 3 },
      { x: 22, y: 23, p: 4 }, { x: 24, y: 21, p: 5 }, { x: 9, y: 7, p: 6 },
      { x: 14, y: 16, p: 7 }, { x: 20, y: 20, p: 8 }, { x: 17, y: 18, p: 9 },
      { x: 15, y: 12, p: 10 }
    ];
    return new Chart(canvas, {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'Alumnos',
            data: pts,
            backgroundColor: 'rgba(167,139,250,.85)',
            borderColor: '#0b1424',
            borderWidth: 2,
            pointRadius: 5.5,
            pointHoverRadius: 7.5
          },
          {
            label: 'Recta de regresión',
            data: [{ x: 7, y: -1.145 + 1.0313 * 7 }, { x: 26, y: -1.145 + 1.0313 * 26 }],
            showLine: true,
            borderColor: C.teal,
            borderWidth: 1.8,
            pointRadius: 0,
            borderDash: [5, 4]
          },
          {
            label: 'Identidad (A = B)',
            data: [{ x: 5, y: 5 }, { x: 27, y: 27 }],
            showLine: true,
            borderColor: 'rgba(148,163,184,.25)',
            borderWidth: 1,
            pointRadius: 0
          }
        ]
      },
      options: {
        scales: axis('Forma A', 'Forma B', {
          x: { min: 5, max: 27, ticks: { stepSize: 5 } },
          y: { min: 5, max: 27, ticks: { stepSize: 5 } }
        }),
        plugins: {
          legend: { position: 'bottom' },
          tooltip: {
            callbacks: {
              label: (ctx) => ctx.dataset.label === 'Alumnos'
                ? ` Alumno ${ctx.raw.p}: A = ${ctx.parsed.x}, B = ${ctx.parsed.y}`
                : ` ${ctx.dataset.label}`
            }
          }
        }
      }
    });
  };

  /* ---------- Seminario 3 · test-retest ---------- */
  F['s3-retest'] = (canvas) => {
    const pts = [
      { x: 12, y: 28, p: 1 }, { x: 10, y: 14, p: 2 }, { x: 18, y: 12, p: 3 },
      { x: 30, y: 23, p: 4 }, { x: 24, y: 23, p: 5 }
    ];
    return new Chart(canvas, {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'Niños',
            data: pts,
            backgroundColor: 'rgba(251,191,36,.9)',
            borderColor: '#0b1424',
            borderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8
          },
          {
            label: 'Recta de regresión',
            data: [{ x: 8, y: 16.332 + 0.1951 * 8 }, { x: 32, y: 16.332 + 0.1951 * 32 }],
            showLine: true,
            borderColor: C.teal,
            borderWidth: 1.8,
            pointRadius: 0,
            borderDash: [5, 4]
          },
          {
            label: 'Identidad (A = B)',
            data: [{ x: 5, y: 5 }, { x: 33, y: 33 }],
            showLine: true,
            borderColor: 'rgba(148,163,184,.25)',
            borderWidth: 1,
            pointRadius: 0
          }
        ]
      },
      options: {
        scales: axis('Primera aplicación', 'Segunda aplicación (2 semanas)', {
          x: { min: 5, max: 33, ticks: { stepSize: 5 } },
          y: { min: 5, max: 33, ticks: { stepSize: 5 } }
        }),
        plugins: {
          legend: { position: 'bottom' },
          tooltip: {
            callbacks: {
              label: (ctx) => ctx.dataset.label === 'Niños'
                ? ` Niño ${ctx.raw.p}: 1.ª = ${ctx.parsed.x}, 2.ª = ${ctx.parsed.y}`
                : ` ${ctx.dataset.label}`
            }
          }
        }
      }
    });
  };

  /* ---------- Seminario 3 · dos mitades ---------- */
  F['s3-halves'] = (canvas) => {
    const labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    return new Chart(canvas, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Mitad 1 (A–D)',
            data: [2, 1, 2, 2, 3, 1, 4, 3, 4, 1],
            backgroundColor: 'rgba(45,212,191,.7)',
            borderRadius: 4,
            maxBarThickness: 16
          },
          {
            label: 'Mitad 2 (E–H)',
            data: [3, 2, 1, 1, 4, 1, 4, 2, 2, 4],
            backgroundColor: 'rgba(167,139,250,.7)',
            borderRadius: 4,
            maxBarThickness: 16
          }
        ]
      },
      options: {
        scales: {
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: { color: '#7f93ae' },
            title: { display: true, text: 'Persona', color: '#6f829e', font: { size: 9, weight: '600' } }
          },
          y: {
            grid: { color: C.grid },
            border: { display: false },
            ticks: { color: '#7f93ae', stepSize: 1 },
            title: { display: true, text: 'Aciertos en la mitad', color: '#6f829e', font: { size: 9, weight: '600' } },
            max: 5
          }
        },
        plugins: { legend: { position: 'bottom' } }
      }
    });
  };

  /* ---------- Seminario 3 · alfa de Cronbach (varianzas de ítems) ---------- */
  F['s3-alpha-items'] = (canvas) => new Chart(canvas, {
    type: 'bar',
    data: {
      labels: ['Ítem 1', 'Ítem 2', 'Ítem 3', 'Ítem 4'],
      datasets: [{
        label: 'Varianza de cada ítem (s²ᵢ)',
        data: [0.56, 0.56, 0.8, 1.36],
        backgroundColor: ['rgba(45,212,191,.55)', 'rgba(45,212,191,.55)', 'rgba(45,212,191,.72)', 'rgba(45,212,191,.9)'],
        borderRadius: 5,
        maxBarThickness: 45
      }]
    },
    options: {
      scales: {
        x: { grid: { display: false }, border: { display: false }, ticks: { color: '#8fa2ba' } },
        y: { grid: { color: C.grid }, border: { display: false }, ticks: { color: '#7f93ae' }, max: 1.6, title: { display: true, text: 'Varianza', color: '#6f829e', font: { size: 9, weight: '600' } } }
      },
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: (ctx) => ` s² = ${ctx.parsed.y.toFixed(2)}` } }
      }
    }
  });

  F['s3-alpha'] = (canvas) => new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: ['Varianza verdadera (72,3 %)', 'Varianza de error (27,7 %)'],
      datasets: [{
        data: [8.56, 3.28],
        backgroundColor: ['rgba(45,212,191,.78)', 'rgba(251,113,133,.7)'],
        borderWidth: 0,
        spacing: 3,
        borderRadius: 4
      }]
    },
    options: {
      cutout: '75%',
      plugins: {
        legend: { position: 'bottom', labels: { padding: 10 } },
        centerText: { text: '.964', sub: 'alfa', color: C.tealL, size: 25 },
        tooltip: { callbacks: { label: (ctx) => ` ${ctx.label}: ${ctx.parsed} puntos de varianza` } }
      }
    }
  });

  /* ---------- Seminario 3 · KR-20 ---------- */
  F['s3-kr20'] = (canvas) => new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: ['Consistencia (.681)', 'Error (.319)'],
      datasets: [{
        data: [68.1, 31.9],
        backgroundColor: ['rgba(167,139,250,.82)', 'rgba(251,113,133,.55)'],
        borderWidth: 0,
        spacing: 3,
        borderRadius: 4
      }]
    },
    options: {
      cutout: '76%',
      plugins: {
        legend: { position: 'bottom', labels: { padding: 10 } },
        centerText: { text: '.681', sub: 'KR-20', color: C.violet, size: 25 },
        tooltip: { callbacks: { label: (ctx) => ` ${ctx.parsed} %` } }
      }
    }
  });

  /* ---------- Seminario 3 · comparación final ---------- */
  F['s3-compare'] = (canvas) => new Chart(canvas, {
    type: 'bar',
    data: {
      labels: ['Formas paralelas', 'Test-retest', 'Dos mitades (S-B)', 'Rulon / Guttman', 'Alfa de Cronbach', 'KR-20'],
      datasets: [{
        label: 'Coeficiente de fiabilidad',
        data: [0.9265, 0.2406, 0.4471, 0.6988, 0.9640, 0.6811],
        backgroundColor: [
          'rgba(45,212,191,.85)',
          'rgba(251,113,133,.85)',
          'rgba(251,191,36,.75)',
          'rgba(96,165,250,.8)',
          'rgba(45,212,191,.85)',
          'rgba(167,139,250,.8)'
        ],
        borderRadius: 4,
        maxBarThickness: 22
      }]
    },
    options: {
      indexAxis: 'y',
      scales: {
        x: {
          min: 0, max: 1,
          grid: { color: C.grid },
          border: { display: false },
          ticks: { color: '#7f93ae', stepSize: 0.2 },
          title: { display: true, text: 'Fiabilidad estimada', color: '#6f829e', font: { size: 9, weight: '600' } }
        },
        y: { grid: { display: false }, border: { display: false }, ticks: { color: '#b7c5d8', font: { size: 10 } } }
      },
      plugins: {
        legend: { display: false },
        barValues: { display: true, decimals: 3 },
        tooltip: {
          callbacks: {
            label: (ctx) => ` r = ${ctx.parsed.x.toFixed(3)}`
          }
        }
      }
    }
  });

  window.PRES_CHARTS = F;
})();
