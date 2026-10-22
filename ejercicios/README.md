# Cuaderno de ejercicios · Fiabilidad

Carpeta independiente de la presentación: contiene **solo ejercicios** (y su formulario), con sus propios HTML, CSS y JS.

## Qué hay aquí

| Archivo | Contenido |
|---|---|
| `index.html` | Portada del cuaderno e índice de las secciones. |
| `teoria.html` | **La teoría mínima**: los 6 bloques (modelo clásico, estimación, longitud, variabilidad, dos medidas y consistencia interna) con sus fórmulas y su idea clave. |
| `nomenclatura.html` | **Qué significa cada símbolo** (`X`, `V`, `E`, `σ²V`, `σX`, `r_xx`, `r_XV`, `k`, `R`, `α`, `KR-20`…) con el **numerador y el denominador** de cada razón. |
| `formulario.html` | **22 ecuaciones** de fiabilidad, cada una con **todas sus letras despejadas** (coeficiente, índice, error típico, estimación, intervalos, Spearman-Brown, cambio de muestra, Rulon, Guttman, alfa, KR-20, Pearson y covarianza). |
| `seminario2.html` | **15 ejercicios inversos** de Fiabilidad (I): varianza, estimación, longitud y muestra. |
| `seminario3.html` | **19 ejercicios inversos** de Fiabilidad (II): formas paralelas, test-retest y consistencia interna. |

## La lógica: ejercicios al revés

Los ejercicios de clase dan los datos y piden el resultado. Aquí se invierte el planteamiento:

- te dan el **error típico** y piden **σX**;
- te dan el **intervalo de confianza** y piden **X**, **σE** o **r**;
- te dan la **fiabilidad final** y piden la **original** (o **k**, o los **ítems a añadir**);
- te dan el **alfa** y piden **Σs²ᵢ** o **s²X**;
- te dan **R** y piden **s²d**, **s²₂** o la correlación entre mitades.

Cada tarjeta indica en la cabecera **qué letra hay que despejar** y contiene:

- un botón **“Ver fórmula y despeje paso a paso”** con la ecuación de partida, el despeje algebraico de la incógnita y la fórmula aplicada (con enlace a esa ecuación del formulario);
- el **desarrollo numérico** paso a paso;
- la **respuesta en naranja** y un aviso con la trampa típica del ejercicio.

## Uso

1. Abre `index.html` con doble clic (Chrome, Edge o Firefox).
2. Entra en el seminario que toque.
3. Pulsa **Ocultar soluciones** para trabajar sin la respuesta a la vista.
4. Cuando te bloquees, abre el formulario y busca la fila de la incógnita que necesitas.
5. **Pasa el ratón por cualquier símbolo** (`σ²V`, `σX`, `r_xx`…) o por una fórmula: aparece una tarjeta con su significado (y, en las razones, qué es el numerador y qué el denominador). El botón **Σ Nomenclatura** abre la tabla completa, con los **nombres alternativos y las confusiones frecuentes** (σ/s, covarianza/correlación, coeficiente/índice, σE/S_yx…).
6. **Buscador**: botón **Buscar** de la barra superior o `Ctrl + K` (también `/`). Busca en las 66 entradas del cuaderno (teoría, ecuaciones, ejercicios y nomenclatura) y salta a la coincidencia.

No necesita servidor ni conexión: KaTeX y las tipografías están copiadas en `assets/`.

## Estructura

```
EJERCICIOS-FIABILIDAD/
├── index.html
├── formulario.html
├── seminario2.html
├── seminario3.html
├── teoria.html
├── nomenclatura.html
├── assets/js/indice.js   Índice del buscador
└── assets/
    ├── css/ejercicios.css
    ├── js/ejercicios.js
    ├── fonts/            Inter y Sora (woff2)
    └── vendor/katex/     KaTeX 0.16.11 + fuentes
```

## Nota

Los enunciados originales de los seminarios (con su solución) están en la presentación de clase:
`../presentacion-fiabilidad/index.html`.
