/* =========================================================
   Mini-explicaciones para fórmulas y símbolos matemáticos
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Glosario de símbolos ---------- */
  const S = {
    X: { display: 'X', label: 'Puntuación observada', desc: 'La puntuación que se obtiene al aplicar el test.' },
    V: { display: 'V', label: 'Puntuación verdadera', desc: 'El nivel real de la persona en el rasgo. No se observa directamente.' },
    E: { display: 'E', label: 'Error de medida', desc: 'La parte aleatoria que separa la puntuación observada de la verdadera.' },
    Eexp: { display: 'E(·)', label: 'Esperanza matemática', desc: 'El valor medio que tendría una variable si repitiéramos el proceso muchas veces.' },
    Vhat: { display: 'V̂', label: 'Puntuación verdadera estimada', desc: 'La mejor aproximación a V a partir de X y de la fiabilidad del test.' },
    mu: { display: 'μ', label: 'Media', desc: 'Promedio del grupo en el test.' },
    sigma2X: { display: 'σ²X', label: 'Varianza observada', desc: 'Cuánto se dispersan las puntuaciones observadas.' },
    sigma2V: { display: 'σ²V', label: 'Varianza verdadera', desc: 'Parte de la dispersión que refleja diferencias reales entre personas.' },
    sigma2E: { display: 'σ²E', label: 'Varianza de error', desc: 'Parte de la dispersión producida por el error de medida.' },
    sigmaX: { display: 'σX', label: 'Desviación típica observada', desc: 'Raíz de σ²X: la dispersión en puntos del test.' },
    sigmaV: { display: 'σV', label: 'Desviación típica verdadera', desc: 'Raíz de σ²V: dispersión de las puntuaciones verdaderas.' },
    sigmaE: { display: 'σE', label: 'Error típico de medida', desc: 'Cuánto se espera que se equivoque el test, en puntos de la escala.' },
    rxx: { display: 'rxx', label: 'Coeficiente de fiabilidad', desc: 'Proporción de la varianza observada que es verdadera (de 0 a 1).' },
    r12: { display: 'r₁₂', label: 'Correlación entre mitades', desc: 'Relación entre las puntuaciones de las dos mitades del test.' },
    s2X: { display: 's²X', label: 'Varianza del total', desc: 'Dispersión de las puntuaciones totales del test.' },
    s2d: { display: 's²d', label: 'Varianza de las diferencias', desc: 'Dispersión de las diferencias entre las dos mitades.' },
    diff: { display: 'V − μ', label: 'Puntuación diferencial', desc: 'Distancia de una persona respecto a la media del grupo.' },
    zsigma: { display: 'z · σE', label: 'Semiamplitud del intervalo', desc: 'Mitad de la anchura total del intervalo de confianza.' },
    item: { display: 'i', label: 'Índice del ítem', desc: 'Número o etiqueta que identifica cada ítem del test.' },
    rho: { display: 'ρ', label: 'Correlación', desc: 'Relación entre dos variables; va de −1 a 1.' },
    z: { display: 'z', label: 'Puntuación típica', desc: 'Distancia a la media medida en desviaciones típicas.' },
    k: { display: 'k', label: 'Razón de longitud', desc: 'Cuántas veces es de largo el nuevo test respecto al original.' },
    R: { display: 'R', label: 'Fiabilidad corregida', desc: 'Fiabilidad del test después de alargarlo o acortarlo.' },
    alpha: { display: 'α', label: 'Alfa de Cronbach', desc: 'Consistencia interna entre los ítems (de 0 a 1).' },
    KR20: { display: 'KR-20', label: 'Kuder-Richardson 20', desc: 'Alfa aplicado a ítems dicotómicos (0/1).' },
    s2: { display: 's²', label: 'Varianza', desc: 'Dispersión de las puntuaciones en la muestra.' },
    s: { display: 's', label: 'Desviación típica', desc: 'Raíz de la varianza; la misma idea expresada en puntos.' },
    cov: { display: 'cov', label: 'Covarianza', desc: 'Indica cómo cambian juntas dos variables.' },
    d: { display: 'd', label: 'Diferencia', desc: 'Separación entre las dos mitades de una misma persona.' },
    p: { display: 'p', label: 'Proporción de aciertos', desc: 'Fracción de personas que responden 1 o aciertan el ítem.' },
    q: { display: 'q', label: 'Proporción de fallos', desc: 'La parte que falta para 1: q = 1 − p.' },
    n: { display: 'n', label: 'Número de ítems', desc: 'Cantidad de ítems del test (o de casos, según el contexto).' },
    N: { display: 'N', label: 'Tamaño de la muestra', desc: 'Número de personas evaluadas.' },
    IC: { display: 'IC', label: 'Intervalo de confianza', desc: 'Rango en el que esperamos que esté la puntuación verdadera.' },
    sum: { display: 'Σ', label: 'Sumatorio', desc: 'Suma todos los valores que se indican.' },
    sqrt: { display: '√', label: 'Raíz cuadrada', desc: 'Operación inversa de elevar al cuadrado.' }
  };

  /* ---------- Reglas de explicación (orden importante) ---------- */
  const RULES = [
    {
      test: /r_\{xx'\}=\\frac\{\\sigma_\{XX'\}\}/,
      kind: 'Coeficiente de fiabilidad',
      title: "r_XX\u2032 = fiabilidad entre formas paralelas",
      body: 'El numerador \u03c3XX\u2032 es la COVARIANZA entre las dos formas; el denominador es el producto de sus desviaciones t\u00edpicas. El cociente es una correlaci\u00f3n y, con formas paralelas, esa correlaci\u00f3n ES el coeficiente de fiabilidad. La covarianza no es el coeficiente: es solo su numerador.',
      symbols: ['rxx', 'cov', 'sigmaX']
    },
    {
      test: /r_\{AB\}=\\frac\{\\operatorname\{cov\}/,
      kind: 'Coeficiente de fiabilidad',
      title: 'Correlaci\u00f3n entre las formas A y B',
      body: 'Es el coeficiente de correlaci\u00f3n de Pearson aplicado a las dos formas: covarianza en el numerador y producto de las desviaciones t\u00edpicas en el denominador. Con formas paralelas, ese valor es directamente la fiabilidad.',
      symbols: ['rxx', 'cov', 'sigmaX']
    },
    {
      test: /E\(E\)=0/,
      kind: 'Símbolo clave',
      title: 'E(E) = 0: el error se compensa',
      body: 'La E de fuera significa «esperanza matemática»: el valor medio a largo plazo. La E de dentro es el error de medida. Que su esperanza sea 0 quiere decir que los errores aleatorios no empujan siempre en la misma dirección: unos suman, otros restan y, en promedio, se anulan.',
      symbols: ['Eexp', 'E']
    },
    {
      test: /X=V\+E/,
      kind: 'Ecuación fundamental',
      title: 'Lo observado = lo verdadero + error',
      body: 'X es lo que mide el test, V es el nivel real del rasgo y E es el ruido de la medición. Como ningún test es perfecto, lo que vemos es la suma de ambas partes. La fiabilidad consiste en averiguar cuánto pesa V y cuánto pesa E.',
      symbols: ['X', 'V', 'E']
    },
    {
      test: /\\sigma\^2_X=\\sigma\^2_V\+\\sigma\^2_E/,
      kind: 'Ecuación clave',
      title: 'La varianza también se reparte',
      body: 'La dispersión de las puntuaciones observadas es igual a la dispersión verdadera más la dispersión debida al error. No aparece un término extra porque el modelo supone que V y E no van de la mano.',
      symbols: ['sigma2X', 'sigma2V', 'sigma2E']
    },
    {
      test: /r_\{xx\}=.*\\rho\^2\(X,V\)=1-.*\\sigma\^2_E/,
      kind: 'Tres formas de decir lo mismo',
      title: 'La fiabilidad es una proporción de varianza',
      body: 'Es la parte de la varianza observada que es verdadera. También equivale a la correlación al cuadrado entre X y V, o a 1 menos la proporción de varianza que aporta el error. Las tres expresiones cuentan la misma historia.',
      symbols: ['rxx', 'rho', 'sigma2X']
    },
    {
      test: /\\frac\{\\sigma\^2_V\}\{\\sigma\^2_X\}=r_\{xx\}/,
      kind: 'Ecuación clave',
      title: 'La fiabilidad ya está en la proporción',
      body: 'Si divides la varianza verdadera entre la varianza observada, obtienes directamente el coeficiente. Un valor de .90 significa que el 90 % de la varianza observada es verdadera y el 10 % es error.',
      symbols: ['sigma2V', 'sigma2X', 'rxx']
    },
    {
      test: /\\frac\{\\sigma\^2_E\}\{\\sigma\^2_X\}=1-r_\{xx\}/,
      kind: 'Ecuación clave',
      title: 'La proporción de ruido',
      body: 'Es lo que falta para llegar a 1. Si la fiabilidad es .90, el error explica el 10 % de la varianza observada. Cuanto menor sea esta proporción, más fiable es el test.',
      symbols: ['sigma2E', 'sigma2X', 'rxx']
    },
    {
      test: /\\frac\{\\sigma_V\}\{\\sigma_X\}=\\sqrt/,
      kind: 'Paso de cálculo',
      title: 'Las desviaciones típicas no se suman',
      body: 'Para pasar de razones de varianza a razones de desviación típica hay que sacar la raíz cuadrada. Por eso √.90 = .9487 y √.10 = .3162, no .90 y .10. Las varianzas sí se pueden sumar; las desviaciones típicas, no.',
      symbols: ['sigmaV', 'sigmaX', 'sigmaE']
    },
    {
      test: /\\rho\(E_1,E_2\)=0/,
      kind: 'Supuesto del modelo',
      title: 'Los errores de dos medidas son independientes',
      body: 'El error de una aplicación no debe estar relacionado con el error de otra. Si los errores se repitieran igual en las dos medidas, serían error sistemático y no aleatorio. Este supuesto permite sumar varianzas sin añadir covarianzas.',
      symbols: ['rho', 'E']
    },
    {
      test: /\\rho\(X,E\)=0|\\rho\(V,E\)=0/,
      kind: 'Supuesto del modelo',
      title: 'El error no correlaciona con lo medido',
      body: 'Si el error es verdaderamente aleatorio, no debe tener relación con la puntuación observada ni con la verdadera. Por eso su correlación es 0. Si no lo fuera, hablaríamos de error sistemático y el modelo clásico no se aplicaría igual.',
      symbols: ['rho', 'X', 'E', 'V']
    },
    {
      test: /\\rho\(X,E\)\\neq0|\\rho\(V,E\)\\neq0/,
      kind: 'Supuesto del modelo',
      title: 'Qué pasaría si el error no fuera independiente',
      body: 'Sería una señal de error sistemático: el test se equivocaría siempre en la misma dirección para cierto tipo de personas. El modelo clásico asume que eso no ocurre, y por eso puede separar V y E.',
      symbols: ['rho', 'X', 'E']
    },
    {
      test: /\\rho\(X,V\)=\\sqrt\{r_\{xx\}\}/,
      kind: 'Relación clave',
      title: 'Índice de fiabilidad',
      body: 'Es la correlación entre la puntuación observada y la verdadera. Su cuadrado es el coeficiente de fiabilidad. Con rxx = .90, el índice vale √.90 = .9487: una relación muy alta entre lo que medimos y lo que realmente hay.',
      symbols: ['rho', 'X', 'V', 'rxx']
    },
    {
      test: /\\hat\{V\}=\\mu\+r_\{xx\}/,
      kind: 'Ecuación clave',
      title: 'Regresión a la media',
      body: 'No tomamos X como si fuera V: acercamos la puntuación a la media del grupo en la proporción que marca la fiabilidad. Cuanto menos fiable es el test, más se acerca la estimación a la media. Si rxx = 1, V̂ = X; si rxx = 0, V̂ = μ.',
      symbols: ['Vhat', 'mu', 'rxx', 'X']
    },
    {
      test: /X-\\mu=30-20/,
      kind: 'Paso de cálculo',
      title: 'Distancia de la persona a la media',
      body: 'La persona saca 30 y la media del grupo es 20. Su distancia es 10 puntos por encima de la media. Esa distancia es la que luego se corrige con la fiabilidad.',
      symbols: ['X', 'mu']
    },
    {
      test: /r_\{xx\}\(X-\\mu\)=/,
      kind: 'Paso de cálculo',
      title: 'La parte fiable de la distancia',
      body: 'Solo aprovechamos la parte de esa distancia que el test es capaz de medir con seguridad. Con rxx = .82, de los 10 puntos de distancia se conservan 8,2 como diferencia verdadera.',
      symbols: ['rxx', 'X', 'mu']
    },
    {
      test: /\\hat\{V\}=20\+|\\hat\{V\}=28\.2/,
      kind: 'Resultado',
      title: 'Estimación final en escala directa',
      body: 'Se suman la media (20) y la parte fiable de la distancia (8,2). El resultado, 28,2, es la puntuación verdadera estimada de esta persona. Está por debajo de 30 porque el test no es perfectamente fiable.',
      symbols: ['Vhat', 'mu']
    },
    {
      test: /z_\{\\hat\{V\}\}=r_\{xx\}/,
      kind: 'Paso de cálculo',
      title: 'La estimación en escala típica',
      body: 'En puntuaciones típicas, la estimación es la z observada multiplicada por la fiabilidad. Es la misma regresión, pero sin arrastrar la media ni las unidades originales del test.',
      symbols: ['z', 'rxx']
    },
    {
      test: /z_X=\\frac|z_X=/,
      kind: 'Paso de cálculo',
      title: 'Puntuación típica',
      body: 'Indica a cuántas desviaciones típicas está la persona de la media. z = 1.25 significa que está 1,25 desviaciones por encima de la media de su grupo.',
      symbols: ['z', 'X', 'mu', 'sigmaX']
    },
    {
      test: /1-r_\{xx\}=1-\.82/,
      kind: 'Paso de cálculo',
      title: 'La varianza que queda para el error',
      body: 'Al restar la fiabilidad a 1 obtenemos la proporción de varianza que no es verdadera. Con rxx = .82, queda .18: el 18 % de la varianza observada se atribuye al error.',
      symbols: ['rxx']
    },
    {
      test: /\\sigma_E=\\sigma_X\\sqrt\{1-r_\{xx\}\}/,
      kind: 'Ecuación clave',
      title: 'Error típico de medida',
      body: 'Es la desviación típica de los errores: cuánto se espera que se equivoque el test, expresado en puntos de su escala. Cuanto mayor es la fiabilidad, más pequeño es σE y más precisa es la medida.',
      symbols: ['sigmaE', 'sigmaX', 'rxx']
    },
    {
      test: /\\sigma_E=8\\times|\\sigma_E=8\\sqrt/,
      kind: 'Resultado',
      title: 'Error típico en puntos del test',
      body: 'Se multiplica la desviación típica observada (8) por √.18. El resultado, 3,394, indica que los errores típicos del test rondan los 3,4 puntos.',
      symbols: ['sigmaE', 'sigmaX']
    },
    {
      test: /IC_\{99/,
      kind: 'Ecuación clave',
      title: 'Intervalo de confianza al 99 %',
      body: 'Alrededor de la estimación se construye un rango con una confianza del 99 %. Con ese nivel, z = 2,58, así que el intervalo es V̂ ± 2,58·σE. No es la probabilidad de que V esté justo ahí, sino la garantía del procedimiento.',
      symbols: ['IC', 'Vhat', 'sigmaE', 'z']
    },
    {
      test: /R=\\frac\{k\\?,?r\}\{1\+\(k-1\)r\}|R=\\frac\{k\{\\?,?r\}\}/,
      kind: 'Ecuación clave',
      title: 'Spearman-Brown: cambiar la longitud',
      body: 'Predice la fiabilidad cuando el test se alarga o se acorta. k es la razón entre la longitud nueva y la vieja. Si k = 2 (el doble de ítems), la fiabilidad sube, pero no se duplica. Solo funciona si los ítems añadidos son paralelos.',
      symbols: ['R', 'k', 'r']
    },
    {
      test: /k=\\frac\{R/,
      kind: 'Despeje',
      title: '¿Cuántas veces debe crecer el test?',
      body: 'Si conocemos la fiabilidad actual (r) y la que queremos alcanzar (R), esta fórmula calcula cuántas veces debe multiplicarse la longitud. Después se multiplica ese factor por el número actual de ítems.',
      symbols: ['k', 'R', 'r']
    },
    {
      test: /k=\\frac\{n_/,
      kind: 'Definición',
      title: 'Qué es exactamente k',
      body: 'k no es el número de ítems que se añaden: es la razón de longitudes. Pasar de 70 a 105 ítems es k = 105/70 = 1.5. Si se reduce a un tercio, k = 1/3.',
      symbols: ['k', 'n']
    },
    {
      test: /r_\{xx\}=1-\\frac\{\\sigma\^2_E\}|r=1-\\frac\{\\sigma\^2_E\}/,
      kind: 'Ecuación clave',
      title: 'Fiabilidad y variabilidad de la muestra',
      body: 'La varianza de error se mantiene, pero al cambiar la dispersión del grupo cambia su peso relativo. Más variabilidad entre personas → más fácil distinguirlas → mayor fiabilidad. Menos variabilidad → restricción del rango y menor fiabilidad.',
      symbols: ['rxx', 'sigma2E', 'sigma2X']
    },
    {
      test: /\\sqrt\{r_\{xx\}\}/,
      kind: 'Relación clave',
      title: 'Coeficiente frente a índice',
      body: 'El coeficiente (rxx) es una proporción de varianza. El índice es su raíz cuadrada y se interpreta como correlación entre X y V. No son intercambiables: .90 y √.90 = .9487 son cosas distintas.',
      symbols: ['rxx', 'X', 'V']
    },
    {
      test: /r_\{AB\}=.*cov|r_\{12\}=.*cov/,
      kind: 'Ecuación clave',
      title: 'Correlación de Pearson',
      body: 'Mide si dos medidas suben y bajan juntas. Se calcula dividiendo la covarianza entre el producto de sus desviaciones típicas. Va de −1 a 1; 1 sería una relación lineal perfecta.',
      symbols: ['rho', 'cov', 's']
    },
    {
      test: /R=\\frac\{2r_\{1,2\}\}\{1\+r_\{1,2\}\}/,
      kind: 'Ecuación clave',
      title: 'Dos mitades (Spearman-Brown)',
      body: 'Se correlacionan las dos mitades y se corrige con Spearman-Brown, porque una mitad es más corta y tendría menos fiabilidad que el test completo. El resultado estima la fiabilidad del test entero.',
      symbols: ['R', 'rxx']
    },
    {
      test: /R=1-\\frac\{s\^2_\{?d\}?\}\{s\^2_X\}/,
      kind: 'Ecuación clave',
      title: 'Rulon: comparar las diferencias',
      body: 'Compara la varianza de las diferencias entre mitades con la varianza total. Si las mitades son coherentes, las diferencias varían poco y R se acerca a 1.',
      symbols: ['R', 'd', 's2']
    },
    {
      test: /R=2\[1-\\frac\{s\^2_\{V_1\}/,
      kind: 'Ecuación clave',
      title: 'Guttman-Flanagan: comparar las mitades',
      body: 'Usa la suma de las varianzas de las dos mitades frente a la varianza total. Es algebraicamente equivalente a Rulon cuando se usan exactamente las mismas mitades.',
      symbols: ['R', 's2']
    },
    {
      test: /\\alpha=\\frac\{k\}\{k-1\}/,
      kind: 'Ecuación clave',
      title: 'Alfa de Cronbach',
      body: 'Resume la consistencia interna: compara la suma de las varianzas de los ítems con la varianza del total. Si los ítems miden lo mismo, el total varía mucho más que cada ítem y α se acerca a 1.',
      symbols: ['alpha', 'k', 's2']
    },
    {
      test: /KR_\{20\}=/,
      kind: 'Ecuación clave',
      title: 'KR-20 para ítems dicotómicos',
      body: 'Es el alfa para ítems 0/1. En lugar de varianzas, usa p·q, la varianza de cada ítem expresada con proporciones. Cuanto más homogéneos son los ítems, mayor es KR-20.',
      symbols: ['KR20', 'k', 'p', 'q']
    },
    {
      test: /s\^2_i=p_iq_i/,
      kind: 'Ecuación clave',
      title: 'La varianza de un ítem 0/1',
      body: 'Si p es la proporción de aciertos y q = 1 − p la de fallos, la varianza del ítem es p·q. Es máxima cuando p = q = .5, y pequeña cuando el ítem es muy fácil o muy difícil.',
      symbols: ['s2', 'p', 'q']
    },
    {
      test: /q_i=1-p_i/,
      kind: 'Definición',
      title: 'Proporción de fallos',
      body: 'Si p es la proporción de personas que aciertan, q es la que falla. Siempre suman 1: q = 1 − p.',
      symbols: ['q', 'p']
    },
    {
      test: /\\sum s\^2_i=/,
      kind: 'Paso de cálculo',
      title: 'Suma de las varianzas de los ítems',
      body: 'Se suman las varianzas de todos los ítems. Esa suma se compara con la varianza del total: si es pequeña en relación al total, los ítems son homogéneos y la consistencia interna es alta.',
      symbols: ['sum', 's2']
    },
    {
      test: /d=V_1-V_2/,
      kind: 'Definición',
      title: 'Diferencia entre las dos mitades',
      body: 'd = V1 − V2 mide cuánto se separa cada persona de una mitad a otra. Si las mitades son equivalentes, estas diferencias serán pequeñas y su varianza también.',
      symbols: ['d']
    },
    {
      test: /s\^2_d=s\^2_\{V_1\}/,
      kind: 'Por qué coinciden',
      title: 'Rulon y Guttman-Flanagan son equivalentes',
      body: 'La varianza de la diferencia y la de la suma están relacionadas: s²d = s²V1 + s²V2 − 2·cov, y s²X = s²V1 + s²V2 + 2·cov. Al sustituir, ambas fórmulas acaban dando el mismo resultado.',
      symbols: ['s2', 'cov']
    },
    {
      test: /\\sqrt\{\.90\}\\neq\.90/,
      kind: 'Aviso',
      title: 'Cuidado: las raíces no se suman',
      body: '√.90 no es .90. Las varianzas se pueden sumar, pero las desviaciones típicas no: hay que sacar la raíz después de sumar. En el ejemplo, .90 es la proporción de varianza, no la proporción de desviación.',
      symbols: ['sqrt']
    },
    {
      test: /\\bar\{/,
      kind: 'Estadístico',
      title: 'Media del grupo',
      body: 'Es el promedio de las puntuaciones. En la regresión actúa como punto de referencia: las estimaciones se acercan a ella cuando la fiabilidad no es perfecta.',
      symbols: ['mu']
    },
    {
      test: /\\operatorname\{cov\}|s_\{AB\}=|s_\{12\}=/,
      kind: 'Estadístico',
      title: 'Covarianza',
      body: 'Indica cómo cambian juntas dos variables. Si tienden a subir a la vez, es positiva; si una sube cuando la otra baja, negativa. Su valor depende de las unidades, por eso se estandariza al calcular la correlación.',
      symbols: ['cov']
    },
    {
      test: /s\^2_\{?[AB12]\}?=/,
      kind: 'Estadístico',
      title: 'Varianza de una de las medidas',
      body: 'Es la dispersión de las puntuaciones de esa forma o de esa mitad. Se calcula promediando las distancias al cuadrado respecto a su media.',
      symbols: ['s2']
    },
    {
      test: /^s_\{?[AB12]\}?=/,
      kind: 'Estadístico',
      title: 'Desviación típica de una de las medidas',
      body: 'Es la raíz cuadrada de la varianza. Se usa para estandarizar la covarianza y obtener la correlación.',
      symbols: ['s']
    },
    {
      test: /^R=[\d.]+$/,
      kind: 'Resultado',
      title: 'Resultado del coeficiente',
      body: 'Este es el valor final que se obtiene al aplicar la fórmula. Se interpreta como la proporción de varianza que es verdadera. Cuanto más cerca de 1, mayor fiabilidad.',
      symbols: ['R']
    },
    {
      test: /^\\sqrt\{\.60\}=|^\\sqrt\{\.50\}=/,
      kind: 'Resultado',
      title: 'Índice de fiabilidad del test resultante',
      body: 'El índice es la raíz cuadrada del coeficiente. Se interpreta como la correlación entre la puntuación observada y la verdadera. No es lo mismo que el coeficiente: √.50 = .7071, no .50.',
      symbols: ['sqrt', 'rxx']
    },
    {
      test: /^\\sqrt\{\.18\}=/,
      kind: 'Paso de cálculo',
      title: 'Cálculo auxiliar de una raíz',
      body: 'Se calcula la raíz cuadrada de .18 para obtener el factor que multiplica a la desviación típica en el error típico de medida. El resultado es .4243.',
      symbols: ['sqrt', 'sigmaE']
    },
    {
      test: /20\+1\.025\\times8/,
      kind: 'Comprobación',
      title: 'Volver a la escala directa',
      body: 'Se comprueba que la estimación típica (1.025) equivale a 28.2 puntos: media + 1.025 desviaciones de 8 puntos. Las tres escalas describen la misma estimación.',
      symbols: ['mu', 'z', 'sigmaX']
    },
    {
      test: /\(1-\.78\)\\times4/,
      kind: 'Paso de cálculo',
      title: 'Cálculo de la varianza de error',
      body: 'La fiabilidad .78 deja .22 de varianza no explicada. Multiplicando por la varianza observada (4) se obtiene la varianza de error: .88. Ese valor se mantiene aunque cambie la muestra.',
      symbols: ['sigma2E', 'sigma2X']
    },
    {
      test: /^1-s\^2_d\/s\^2_X$/,
      kind: 'Fórmula abreviada',
      title: 'Rulon, en versión corta',
      body: 'Es la misma fórmula de Rulon sin el desarrollo: 1 menos la varianza de las diferencias entre la varianza total. Si las mitades coinciden, las diferencias varían poco y R se acerca a 1.',
      symbols: ['R', 's2d', 's2X']
    },
    {
      test: /^2\[1-\(s\^2_1\+s\^2_2\)\/s\^2_X\]$/,
      kind: 'Fórmula abreviada',
      title: 'Guttman-Flanagan, en versión corta',
      body: 'Es la misma fórmula de Guttman-Flanagan: dos veces (1 menos la varianza conjunta de las mitades dividida entre la varianza total). Con las mismas mitades coincide con Rulon.',
      symbols: ['R', 's2', 's2X']
    },
    {
      test: /^s\^2_X=[\d.]+$/,
      kind: 'Resultado',
      title: 'Varianza de las puntuaciones totales',
      body: 'Es la dispersión del total del test en esta muestra. Se usa como denominador en alfa, KR-20 y en las fórmulas de dos mitades: representa toda la variabilidad que hay que explicar.',
      symbols: ['s2X']
    },
    {
      test: /^R_\{\\text\{Rulon\}\}=/,
      kind: 'Resultado',
      title: 'Resultado de Rulon',
      body: 'Sustituyendo la varianza de las diferencias (10) y la varianza total (33.2): 1 − .3012 = .6988. La fiabilidad estimada es .699.',
      symbols: ['R', 's2d', 's2X']
    },
    {
      test: /^R_\{GF\}=/,
      kind: 'Resultado',
      title: 'Resultado de Guttman-Flanagan',
      body: 'Sustituyendo las varianzas de las mitades y la total: 2 × (1 − .6506) = .6988. Coincide con Rulon porque se usan las mismas mitades.',
      symbols: ['R', 's2', 's2X']
    },
    {
      test: /^r_\{xx\}=[\d.]+$/,
      kind: 'Dato del ejercicio',
      title: 'Fiabilidad del test',
      body: 'Es el coeficiente de fiabilidad. Se interpreta como la proporción de varianza observada que es verdadera: cuanto más cerca de 1, más fiable es la medida. Un valor de .90 indica que el 90 % de la varianza observada es verdadera.',
      symbols: ['rxx']
    },
    {
      test: /^s\^2_\{V_1\}\+s\^2_\{V_2\}$/,
      kind: 'Expresión matemática',
      title: 'Varianza conjunta de las dos mitades',
      body: 'Suma la dispersión de la mitad 1 y la de la mitad 2. En Guttman-Flanagan se compara con la varianza total: si las mitades son homogéneas, esta suma pesa poco frente al total.',
      symbols: ['s2', 's2X']
    },
    {
      test: /\\sigma\^2_X=60/,
      kind: 'Dato del ejercicio',
      title: 'Varianza observada del test',
      body: 'El test tiene una varianza de 60 puntos². Es la cantidad total de dispersión que hay que repartir entre la parte verdadera y la parte de error.',
      symbols: ['sigma2X']
    }
  ];

  /* ---------- Detección automática de símbolos ---------- */
  const DETECT = [
    ['sigma2X', /\\sigma\^2_\{?X\}?/],
    ['sigma2V', /\\sigma\^2_\{?V\}?/],
    ['sigma2E', /\\sigma\^2_\{?E\}?/],
    ['sigmaX', /\\sigma_\{?X\}?/],
    ['sigmaV', /\\sigma_\{?V\}?/],
    ['sigmaE', /\\sigma_\{?E\}?/],
    ['Vhat', /\\hat\{V\}/],
    ['rxx', /r_\{xx\}/],
    ['KR20', /KR_\{20\}/],
    ['alpha', /\\alpha/],
    ['rho', /\\rho/],
    ['mu', /\\mu/],
    ['z', /z_\{?X\}?|z_\{\\hat\{V\}\}|z_\{\.995\}/],
    ['k', /(^|[^A-Za-z])k([^A-Za-z]|$)/],
    ['R', /(^|[^A-Za-z])R([^A-Za-z]|$)/],
    ['s2', /s\^2/],
    ['s', /s_\{?[A-Z0-9]/],
    ['cov', /\\operatorname\{cov\}/],
    ['d', /s\^2_\{?d\}?|d=V_1/],
    ['p', /p_i/],
    ['q', /q_i/],
    ['N', /N=/],
    ['n', /n['=]/],
    ['IC', /IC_/],
    ['sum', /\\sum/],
    ['sqrt', /\\sqrt/],
    ['X', /(^|[^A-Za-z\\])X([^A-Za-z]|$)/],
    ['V', /(^|[^A-Za-z\\])V([^A-Za-z]|$)/],
    ['E', /(^|[^A-Za-z\\])E([^A-Za-z]|$)/]
  ];

  const EXACT = {
    'V': 'V', 'X': 'X', 'E': 'E', 'k': 'k', 'r': 'rxx', 'z': 'z',
    'r_{xx}': 'rxx', 'r_{1,2}': 'r12',
    's^2': 's2', 's^2_X': 's2X', 's^2_d': 's2d',
    'V-\\mu': 'diff', 'z\\sigma_E': 'zsigma', 'i': 'item',
    '\\mu': 'mu', '\\sigma_X': 'sigmaX', '\\sigma_E': 'sigmaE',
    '\\sigma^2_X': 'sigma2X', '\\sigma^2_E': 'sigma2E',
    '\\alpha': 'alpha', 's^2_i': 's2', 'p_i': 'p', 'q_i': 'q'
  };

  function norm(s) {
    return String(s)
      .replace(/\\left|\\right/g, '')
      .replace(/\\dfrac/g, '\\frac')
      .replace(/\\[,;!]/g, '')
      .replace(/\\quad|\\qquad/g, '')
      .replace(/\s+/g, '');
  }

  function detect(t) {
    const out = [];
    DETECT.forEach(([key, re]) => {
      if (out.length >= 4) return;
      if (out.includes(key)) return;
      if (re.test(t)) out.push(key);
    });
    return out;
  }

  function unique(list) {
    return [...new Set(list)].filter((k) => S[k]);
  }

  function explain(tex) {
    const t = norm(tex);
    if (!t) return null;

    for (const rule of RULES) {
      if (rule.test.test(t)) {
        return {
          kind: rule.kind,
          title: rule.title,
          body: rule.body,
          symbols: unique(rule.symbols || detect(t))
        };
      }
    }

    if (EXACT[t]) {
      const s = S[EXACT[t]];
      return { kind: 'Símbolo', title: s.label, body: s.desc, symbols: [] };
    }

    const eqCount = (t.match(/=/g) || []).length;
    const symbols = detect(t);

    if (eqCount > 0 && /\d/.test(t)) {
      const isCalc = /[+\-]|\\times|\/|\\frac|\\sqrt/.test(t);
      if (isCalc) {
        return {
          kind: 'Paso de cálculo',
          title: 'Sustitución de los datos',
          body: 'No es una fórmula nueva: es la misma relación con los números del problema. Sirve para obtener el resultado paso a paso. Abajo tienes el significado de los símbolos que aparecen.',
          symbols
        };
      }
      return {
        kind: 'Datos',
        title: 'Datos del ejercicio',
        body: 'Reúne los valores de partida. Pasa el ratón por los símbolos para recordar qué representa cada uno.',
        symbols
      };
    }

    if (symbols.length) {
      return {
        kind: 'Expresión matemática',
        title: 'Qué representa esta expresión',
        body: 'Relaciona las cantidades del ejercicio. Abajo tienes el significado de cada símbolo que aparece.',
        symbols
      };
    }

    return {
      kind: 'Expresión matemática',
      title: 'Expresión del ejercicio',
      body: 'Es una relación entre las cantidades que aparecen en este paso.',
      symbols: []
    };
  }

  /* ---------- Interfaz ---------- */
  const tip = document.createElement('div');
  tip.className = 'math-tip';
  tip.setAttribute('role', 'tooltip');
  tip.setAttribute('aria-hidden', 'true');
  tip.innerHTML = `
    <div class="math-tip__kind"></div>
    <div class="math-tip__title"></div>
    <div class="math-tip__body"></div>
    <div class="math-tip__symbols"></div>
    <div class="math-tip__foot">Haz clic en la fórmula para fijar esta explicación</div>
  `;
  document.body.appendChild(tip);

  const kindEl = tip.querySelector('.math-tip__kind');
  const titleEl = tip.querySelector('.math-tip__title');
  const bodyEl = tip.querySelector('.math-tip__body');
  const symbolsEl = tip.querySelector('.math-tip__symbols');

  let showTimer = null;
  let hideTimer = null;
  let pinned = null;
  let lastX = 0;
  let lastY = 0;

  function render(info) {
    kindEl.textContent = info.kind;
    titleEl.textContent = info.title;
    bodyEl.textContent = info.body;
    const syms = unique(info.symbols || []);
    if (syms.length) {
      symbolsEl.innerHTML = syms.map((key) => {
        const s = S[key];
        return `<div class="math-tip__sym"><b>${s.display}</b><span>${s.desc}</span></div>`;
      }).join('');
      symbolsEl.style.display = 'grid';
    } else {
      symbolsEl.innerHTML = '';
      symbolsEl.style.display = 'none';
    }
  }

  function place(x, y) {
    lastX = x;
    lastY = y;
    tip.classList.add('is-visible');
    tip.setAttribute('aria-hidden', 'false');
    const r = tip.getBoundingClientRect();
    const gap = 16;
    const margin = 12;
    let left = x + gap;
    let top = y + gap;

    if (left + r.width > window.innerWidth - margin) left = x - r.width - gap;
    if (top + r.height > window.innerHeight - margin) top = y - r.height - gap;

    left = Math.max(margin, Math.min(left, window.innerWidth - r.width - margin));
    top = Math.max(margin, Math.min(top, window.innerHeight - r.height - margin));

    tip.style.left = left + 'px';
    tip.style.top = top + 'px';
  }

  function show(info, x, y, el) {
    clearTimeout(hideTimer);
    clearTimeout(showTimer);
    showTimer = setTimeout(() => {
      render(info);
      place(x, y);
      document.querySelectorAll('.katex.is-tip-active').forEach((e) => e.classList.remove('is-tip-active'));
      if (el) el.classList.add('is-tip-active');
    }, 70);
  }

  function hide(force) {
    clearTimeout(showTimer);
    if (pinned && !force) return;
    hideTimer = setTimeout(() => {
      tip.classList.remove('is-visible');
      tip.setAttribute('aria-hidden', 'true');
      document.querySelectorAll('.katex.is-tip-active').forEach((e) => e.classList.remove('is-tip-active'));
    }, 110);
  }

  function unpin() {
    pinned = null;
    tip.classList.remove('is-visible');
    tip.setAttribute('aria-hidden', 'true');
    document.querySelectorAll('.katex.is-tip-active').forEach((e) => e.classList.remove('is-tip-active'));
  }

  /* ---------- Escaneo de fórmulas ---------- */
  function scan(root = document) {
    root.querySelectorAll('.katex').forEach((el) => {
      if (el.dataset.mathTip === '1') return;
      if (el.closest('.math-tip')) return;
      const ann = el.querySelector('annotation[encoding="application/x-tex"]');
      if (!ann) return;
      const info = explain(ann.textContent);
      if (!info) return;

      el.dataset.mathTip = '1';
      el.classList.add('has-math-tip');
      el.setAttribute('aria-label', info.title + '. ' + info.body);
      el._mathInfo = info;

      el.addEventListener('mouseenter', (e) => {
        if (pinned && pinned !== el) unpin();
        show(info, e.clientX, e.clientY, el);
      });
      el.addEventListener('mousemove', (e) => {
        if (pinned) return;
        if (tip.classList.contains('is-visible')) place(e.clientX, e.clientY);
        else {
          lastX = e.clientX;
          lastY = e.clientY;
        }
      });
      el.addEventListener('mouseleave', () => hide(false));
      el.addEventListener('click', (e) => {
        if (e.target.closest('a')) return;
        e.stopPropagation();
        if (pinned === el) {
          unpin();
          return;
        }
        pinned = el;
        clearTimeout(hideTimer);
        clearTimeout(showTimer);
        render(info);
        const x = e.clientX || el.getBoundingClientRect().left + 20;
        const y = e.clientY || el.getBoundingClientRect().top + 10;
        place(x, y);
        document.querySelectorAll('.katex.is-tip-active').forEach((n) => n.classList.remove('is-tip-active'));
        el.classList.add('is-tip-active');
      });
    });
  }

  /* ---------- Eventos globales ---------- */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') unpin();
  });
  document.addEventListener('pres:slide', unpin);
  window.addEventListener('resize', () => { if (tip.classList.contains('is-visible')) place(lastX, lastY); });
  document.addEventListener('scroll', () => { if (tip.classList.contains('is-visible')) unpin(); }, true);
  document.addEventListener('pointerdown', (e) => {
    if (!e.target.closest('.katex.has-math-tip')) unpin();
  });

  window.PRES_TOOLTIPS = { scan, explain };

  // Cobertura para la portada y por si el render se completa después
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      scan();
      setTimeout(scan, 350);
      setTimeout(scan, 1200);
    });
  } else {
    scan();
    setTimeout(scan, 350);
    setTimeout(scan, 1200);
  }
})();
