# Fiabilidad · Seminarios 2 y 3 — Presentación web interactiva

Presentación estilo *slides* (16:9) que recorre **de forma continua** los Seminarios 2 y 3 de Fiabilidad de Psicometría. Son **47 diapositivas**: las 25 primeras corresponden a Fiabilidad (I) y, sin cambiar de página, las 22 siguientes continúan con Fiabilidad (II).

Antes de cada bloque de actividades hay una diapositiva de **teoría previa** que explica qué significa cada concepto que se va a usar. Cada ejercicio está resuelto paso a paso, con la fórmula, la sustitución numérica, el resultado y su interpretación. **Todas las respuestas van numeradas como en el documento del seminario** (`1.a`, `1.b`, `2.a`, `3.1.a`…) y destacadas **en naranja**. Al final de cada seminario hay una **hoja de respuestas** con todos los resultados juntos.

---

## Cómo abrirla

1. Abre `index.html` con doble clic en Chrome, Edge o Firefox.
2. Pulsa **Abrir recorrido completo**.
3. Entra en pantalla completa con `F`.

No necesita servidor ni conexión a internet: todas las librerías y tipografías están descargadas en `assets/`.

> Si prefieres servirla localmente:
> ```bash
> python -m http.server 8000
> ```
> y abre `http://localhost:8000`.

---

## Navegación y atajos

| Acción | Cómo |
|---|---|
| Diapositiva siguiente / anterior | `→` `←`, `Espacio`, botones inferiores o deslizar en táctil |
| Índice de las 32 diapositivas | `O` o el botón de lista |
| Volver a la portada | botón **Inicio** del encabezado o tecla `I` |
| Saltar al Seminario 2 / 3 | selector **Seminario 2 · Seminario 3** del encabezado, o teclas `1` / `2` |
| Pantalla completa | `F` |
| Buscar en las diapositivas | `Ctrl + K` o `/`, o el botón **Buscar** |
| Ir al principio / final | `Home` / `End` |
| Cerrar índice | `Esc` |

**Fórmulas interactivas:** pasa el ratón por cualquier fórmula o símbolo matemático y aparecerá una mini-ventana con su significado explicado en lenguaje sencillo. Haz clic para fijarla y `Esc` para cerrarla. Las 171 fórmulas de la presentación tienen explicación. Además, cualquier símbolo (`σ²V`, `σX`, `r_xx`, `r_XV`…) muestra su significado al pasar el ratón, y el botón **Σ Nomenclatura** abre la tabla completa.

El progreso superior y el contador `n / 47` son continuos: al llegar a la diapositiva 25, la siguiente es la portada del Seminario 3.

---

## Mapa de contenido

### Seminario 2 · Fiabilidad (I) — diapositivas 1–25

1. Portada y hoja de ruta.
2. **Marco teórico 1**: el ejemplo de la ansiedad (`X = V + E`, `30 = 28 + 2`).
3. **Marco teórico 2**: de la báscula a la fiabilidad (`r = 80/100 = .80`).
4. Modelo clásico: supuestos, deducciones (`r_XE = σE/σX`) e índice de fiabilidad.
5. **Nomenclatura**: qué es cada símbolo y qué son el numerador y el denominador de cada razón.
5. **Teoría previa A1**: fiabilidad, varianza, desviación típica y correlación.
6. **Actividad 1** (enunciado + respuestas `1.a`, `1.b`, `1.c`).
7. **Teoría previa A2**: las tres escalas y el error típico de medida.
8. **Actividad 2** (enunciado + respuestas `2.a`, `2.b`).
9. **Teoría previa A3**: longitud del test y Spearman-Brown.
10. **Actividad 3** (CARAS: `3.a`, `3.b`, `3.c`; Matemáticas: enunciado literal y respuestas `3.d`, `3.e`).
11. **Teoría previa A4**: variabilidad de la muestra y restricción del rango.
12. **Actividad 4** (`4.a`, `4.b`).
13. **Hoja de respuestas** del Seminario 2.
14. Cierre con chuleta de fórmulas y errores frecuentes.

### Seminario 3 · Fiabilidad (II) — diapositivas 26–47

1. Portada y panorama de métodos.
2. **Formas paralelas (2 diapositivas)**: los cuatro supuestos del paralelismo, qué cambia y qué se mantiene, y los tres niveles (estrictas, tau-equivalentes, similares); después, el coeficiente como correlación (formas paralelas y test-retest).
3. **Actividad 1**: formas paralelas → `1.a` = .9265.
4. **Test-retest**: estabilidad temporal, supuestos, fórmula y explicación intuitiva.
5. **Actividad 2**: test-retest → `2.a` = .2406.
5. **Teoría previa**: consistencia interna (mitades, Rulon, Guttman, α, KR-20).
6. **Actividad 3.1**: dos mitades → `3.1.a` = .2879 y .4471.
7. **Actividad 3.2**: Rulon y Guttman-Flanagan → `3.2.a` = .6988.
8. **Actividad 3.3**: alfa de Cronbach → `3.3.a` = .9640.
9. **Actividad 3.4**: KR-20 → `3.4.a` = .6811.
10. **Hoja de respuestas** del Seminario 3.
11. Comparativa de coeficientes, **qué mide cada método** (estabilidad / equivalencia / consistencia, con α, ω, KR-20/21, dos mitades y versiones ordinales) y cierre.

---

## Estructura del proyecto

```
presentacion-fiabilidad/
├── index.html                 Portada / índice general
├── presentacion.html          Presentación única de 32 diapositivas
├── assets/
│   ├── css/
│   │   ├── base.css           Variables, tipografías y utilidades
│   │   ├── deck.css           Motor visual de las diapositivas
│   │   ├── landing.css        Estilos de la portada
│   │   └── tooltips.css       Mini-explicaciones de fórmulas
│   ├── js/
│   │   ├── deck.js            Navegación, escala 16:9, menú y animaciones
│   │   ├── charts.js          Gráficos con Chart.js
│   │   └── tooltips.js        Glosario y explicaciones matemáticas
│   ├── fonts/                 Inter y Sora (woff2)
│   ├── vendor/
│   │   ├── katex/             KaTeX 0.16.11 + fuentes
│   │   ├── chartjs/           Chart.js 4.4.4
│   │   └── gsap/              GSAP 3.12.5
│   └── favicon.svg
└── README.md
```

## Tecnologías

- **HTML + CSS + JavaScript vanilla**, sin paso de compilación.
- **KaTeX 0.16.11** para todas las fórmulas.
- **Chart.js 4.4.4** para las gráficas (dispersión, curvas, barras y donuts).
- **GSAP 3.12.5** para las animaciones de entrada y contadores.
- **Inter / Sora** como tipografías locales.
- **Sistema propio de ayuda matemática** (`tooltips.js`): detecta cada fórmula, la clasifica y muestra una explicación breve, además de un glosario de símbolos. Incluye 171 fórmulas anotadas, fijado con clic y cierre con `Esc`.
- Escenario fijo de **1280 × 720** escalado al tamaño de la ventana, para conservar la composición tipo PowerPoint.

Todas las dependencias están descargadas y enlazadas localmente. El proyecto funciona offline.

---

## Nota metodológica

- Cada actividad incluye el **enunciado completo del seminario**, con sus apartados a), b), c) y las preguntas tal como se plantean, numeradas `1.a`, `1.b`, `2.a`… Los resultados se presentan siempre con esa misma etiqueta y en naranja.
- Las varianzas y covarianzas se calculan dividiendo entre `n` (varianza poblacional de la muestra), que es el criterio habitual en estos ejercicios de clase.
- Los datos de las tablas son exactamente los de los documentos de los seminarios.
- En las diapositivas conceptuales (regresión a la media, nube de puntos de fiabilidad) hay gráficos **ilustrativos**; en el Seminario 3 todos los gráficos representan los datos reales de las tablas.
- Los coeficientes se interpretan con los criterios orientativos habituales (≥ .90 excelente; .70–.89 aceptable; < .70 insuficiente), recordando siempre que dependen de la muestra y del método.
- **Criterios tomados del Formulario de la asignatura**: índice de fiabilidad `r_XV = √r_xx`; estimación típica `z_V' = r_XV · z_X`; error típico en escala típica `σ_ze = √(1 − r_xx)`; intervalos de confianza construidos alrededor de la puntuación observada (`X ± z·σE`). En los apartados con doble lectura posible (3.e y el centro del intervalo) se indican **las dos variantes**.

## Créditos

Material didáctico basado en los ejercicios de clase de **Fiabilidad (I) y (II)** de Psicometría, Grado en Psicología. Prof.ª María José Quesada Rodríguez.

Adaptación interactiva: diseño, cálculo paso a paso y desarrollo web.
