// =============================================================
// quiz.js — Navegación entre pantallas y lógica del quiz
//
// Este archivo maneja dos responsabilidades relacionadas:
//
//   1. NAVEGACIÓN entre pantallas (home → perfil → quiz → resultados)
//      El sistema de pantallas usa clases CSS para animar las transiciones.
//      showScreen() es la función central: fade out → fade in.
//
//   2. LÓGICA DEL QUIZ: renderizar preguntas, registrar respuestas,
//      navegar hacia adelante y atrás, y disparar el cálculo final.
//
// Variables de estado (compartidas con results.js via window global):
//   userProfile   → datos del formulario de perfil
//   answers       → array de 24 respuestas (null hasta que el usuario elija)
//   currentQ      → índice de la pregunta actual (0-23)
//   quizDirection → 1 si avanza, -1 si retrocede (controla animación)
// =============================================================

// ------------------------------------------------------------------
// ESTADO GLOBAL DEL QUIZ
// Estas variables se inicializan aquí y se resetean en goHome()
// ------------------------------------------------------------------
let userProfile   = {};
let answers       = new Array(24).fill(null);
let currentQ      = 0;
let quizDirection = 1; // 1 = forward, -1 = backward

// ------------------------------------------------------------------
// SISTEMA DE NAVEGACIÓN ENTRE PANTALLAS
// ------------------------------------------------------------------

/**
 * showScreen(id) — muestra una pantalla haciendo fade out de la actual
 * y fade in de la nueva. La duración del fade out (180ms) está coordinada
 * con la animación CSS .screen.leaving en styles.css.
 */
function showScreen(id) {
  const current = document.querySelector('.screen.active');
  const next    = document.getElementById(id);

  if (current && current !== next) {
    // Fase 1: agrega .leaving para disparar el fade out CSS
    current.classList.add('leaving');
    setTimeout(() => {
      // Fase 2: tras 180ms, oculta la pantalla anterior y muestra la nueva
      current.classList.remove('active', 'leaving');
      next.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'instant' }); // siempre al tope
    }, 180);
  } else {
    // Caso inicial (ninguna pantalla activa aún)
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active', 'leaving'));
    next.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}

/**
 * goHome() — regresa a la pantalla de inicio y resetea TODO el estado.
 * Se llama desde el logo del nav y desde el botón "Volver a hacer el test".
 */
function goHome() {
  answers     = new Array(24).fill(null);
  currentQ    = 0;
  userProfile = {};
  showScreen('screen-home');
  applyTranslations(); // recarga textos por si el idioma cambió
}

/** startQuiz() — va al formulario de perfil desde el hero */
function startQuiz() {
  showScreen('screen-perfil');
  applyTranslations();
}

/** scrollInfo() — scroll suave al footer (botón "¿Cómo funciona?") */
function scrollInfo() {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

// ------------------------------------------------------------------
// FORMULARIO DE PERFIL
// ------------------------------------------------------------------

/**
 * beginQuiz() — valida el formulario de perfil y, si está completo,
 * guarda los datos en userProfile y arranca el quiz desde la pregunta 0.
 */
function beginQuiz() {
  const edad   = document.getElementById('inp-edad').value;
  const genero = document.querySelector('input[name="genero"]:checked');
  const region = document.getElementById('inp-region').value;
  const educ   = document.querySelector('input[name="educ"]:checked');

  if (!edad || !genero || !region || !educ) {
    // Mensaje de error en el idioma activo
    alert(
      currentLang === 'es' ? 'Por favor completa todos los campos.' :
      currentLang === 'qu' ? 'Ama hukta qonkaychu.' :
                             'Tukuri jikxataña.'
    );
    return;
  }

  userProfile = {
    edad:      parseInt(edad),
    genero:    genero.value,
    region:    region,
    educacion: educ.value,
    idioma:    currentLang
  };

  currentQ = 0;
  answers  = new Array(24).fill(null);
  showScreen('screen-quiz');
  renderQuestion(0);
}

// ------------------------------------------------------------------
// RENDERIZADO DE PREGUNTAS
// ------------------------------------------------------------------

/**
 * renderQuestion(idx) — dibuja la pregunta número idx en el quiz.
 *
 * Esta función hace varias cosas:
 *   - Actualiza la barra de progreso y el contador "X / 24"
 *   - Muestra el tag del eje temático (ej: "💰 Economía")
 *   - Construye los tres botones de respuesta (De acuerdo / Neutral / En desacuerdo)
 *   - Marca la respuesta ya elegida (si el usuario regresó a una pregunta)
 *   - Controla el texto del botón final (Siguiente vs Ver resultados)
 *   - Anima el card con slide derecha/izquierda según la dirección
 *
 * La animación SOLO se dispara cuando el usuario navega entre preguntas,
 * NO cuando selecciona una respuesta (eso se controla con _selecting).
 */
function renderQuestion(idx) {
  const questions = QUESTIONS[currentLang] || QUESTIONS.es;
  const axes      = AXES[currentLang]      || AXES.es;
  const total     = questions.length;
  const pct       = ((idx) / total * 100).toFixed(0);

  // Actualiza la barra de progreso y el contador
  document.getElementById('quiz-bar').style.width   = pct + '%';
  document.getElementById('quiz-counter').textContent = (idx + 1) + ' / ' + total;

  // Muestra el eje temático y la pregunta
  document.getElementById('quiz-tag').textContent      = axes[idx];
  document.getElementById('quiz-question').textContent = questions[idx];

  // Construye las tres opciones de respuesta
  const opts   = document.getElementById('quiz-options');
  const icons  = ['✅', '🤔', '❌'];
  const vals   = [1, 0, -1]; // De acuerdo, Neutral, En desacuerdo
  const labels = [t('agree'), t('neutral'), t('disagree')];

  opts.innerHTML = '';
  vals.forEach((v, i) => {
    const div       = document.createElement('div');
    const isSelected = answers[idx] === v;
    div.className   = 'quiz-opt' + (isSelected ? ' selected' : '');

    // El checkmark SVG aparece solo en la opción seleccionada
    const checkSVG = `<svg width="10" height="8" viewBox="0 0 10 8">
      <path d="M1 4l3 3 5-6" stroke="white" stroke-width="2.5" fill="none"
            stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

    div.innerHTML = `
      <span class="quiz-opt-icon">${icons[i]}</span>
      <span>${labels[i]}</span>
      <div class="quiz-dot">${isSelected ? checkSVG : ''}</div>`;

    div.onclick = () => selectAnswer(idx, v);
    opts.appendChild(div);
  });

  // Ajusta el botón de avance
  const isLast = idx === total - 1;
  const advBtn = document.getElementById('btn-advance');
  advBtn.textContent = isLast ? t('finishBtn') : t('nextBtn');
  advBtn.disabled    = answers[idx] === null; // bloqueado hasta que elija

  // El botón "Anterior" está oculto en la primera pregunta
  document.getElementById('btn-back').style.visibility = idx === 0 ? 'hidden' : 'visible';

  // Animación de entrada del card (solo cuando navega, no cuando selecciona)
  if (!renderQuestion._selecting) {
    const card = document.getElementById('quiz-card');
    card.style.animation = 'none';
    void card.offsetHeight; // fuerza reflow para que la animación se reinicie
    const anim = quizDirection >= 0 ? 'slideInRight' : 'slideInLeft';
    card.style.animation = anim + ' 0.35s cubic-bezier(.4,0,.2,1) both';
  }
}

// ------------------------------------------------------------------
// SELECCIÓN DE RESPUESTAS
// ------------------------------------------------------------------

/**
 * selectAnswer(idx, val) — registra la respuesta del usuario sin animar
 * la tarjeta. Usa el flag _selecting para que renderQuestion() sepa
 * que no debe disparar la animación de slide.
 */
function selectAnswer(idx, val) {
  answers[idx] = val;
  renderQuestion._selecting = true;
  renderQuestion(idx);
  renderQuestion._selecting = false;
}

// ------------------------------------------------------------------
// AVANCE Y RETROCESO
// ------------------------------------------------------------------

/**
 * nextQuestion() — avanza a la siguiente pregunta o calcula resultados
 * si estamos en la última. Requiere que haya una respuesta seleccionada.
 */
function nextQuestion() {
  if (answers[currentQ] === null) return; // no avanza sin respuesta
  if (currentQ < 23) {
    quizDirection = 1; // slide hacia la derecha
    currentQ++;
    renderQuestion(currentQ);
  } else {
    calculateResults(); // última pregunta → calcular
  }
}

/**
 * prevQuestion() — retrocede a la pregunta anterior.
 * No requiere respuesta (el usuario puede retroceder libremente).
 */
function prevQuestion() {
  if (currentQ > 0) {
    quizDirection = -1; // slide hacia la izquierda
    currentQ--;
    renderQuestion(currentQ);
  }
}

// ------------------------------------------------------------------
// ESTILO VISUAL DE LOS RADIO BUTTONS EN EL FORMULARIO DE PERFIL
// ------------------------------------------------------------------
// Este listener agrega la clase .checked al radio seleccionado para
// que el borde y fondo del elemento cambien (ver .radio-opt.checked en CSS)
document.addEventListener('change', function(e) {
  if (e.target.type === 'radio') {
    const group = e.target.closest('.radio-group');
    if (group) {
      group.querySelectorAll('.radio-opt').forEach(o => o.classList.remove('checked'));
      e.target.closest('.radio-opt').classList.add('checked');
    }
  }
});
