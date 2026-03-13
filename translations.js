// =============================================================
// translations.js — Sistema de idiomas del Votómetro
//
// Contiene todos los textos de la interfaz en tres idiomas:
//   ES = Español (idioma principal)
//   QU = Quechua
//   AY = Aymara
//
// Cómo agregar un nuevo idioma:
//   1. Agrega una nueva clave al objeto T (ej: T.pt para Portugués)
//   2. Traduce cada clave que existe en T.es
//   3. Agrega un botón en el nav de index.html:
//      <button class="lang-btn" onclick="setLang('pt')">PT</button>
//   4. Agrega el nuevo idioma al array en setLang() si es necesario
// =============================================================

const T = {
  es: {
    badge:          "Elecciones Perú 2026",
    heroTitle:      "Descubre con quién<br>coincides <em>de verdad</em>",
    heroSub:        "Responde 24 preguntas sobre los temas que más importan y encuentra tu candidato ideal entre los 36 participantes.",
    startBtn:       "Iniciar Votómetro →",
    howBtn:         "¿Cómo funciona?",
    stat1:          "Candidatos",
    stat2:          "Preguntas",
    stat3:          "Ejes temáticos",
    perfilTitle:    "Cuéntanos sobre ti",
    perfilSub:      "Tus datos son anónimos y se usan únicamente para investigación académica.",
    edadLabel:      "Edad",
    generoLabel:    "Género",
    regionLabel:    "Región / Departamento",
    educLabel:      "Nivel de educación",
    g1: "Masculino", g2: "Femenino", g3: "No binario / Otro", g4: "Prefiero no decir",
    e1: "Sin estudios", e2: "Primaria", e3: "Secundaria",
    e4: "Instituto / Técnico", e5: "Universidad", e6: "Posgrado (Maestría / Doctorado)",
    continueBtn:    "Continuar al test →",
    backBtn:        "← Anterior",
    nextBtn:        "Siguiente →",
    finishBtn:      "Ver mis resultados →",
    sendingTitle:   "Calculando resultados...",
    sendingSub:     "Comparando tus respuestas con los 36 planes de gobierno",
    resultsTitle:   "Tus resultados",
    resultsSub:     "Basado en tus respuestas a las 24 preguntas",
    topLabel:       "🏆 Tu candidato más afín",
    matchLabel:     "coincidencia",
    allResultsTitle:"Todos los candidatos",
    restartBtn:     "🔄 Volver a hacer el test",
    shareTwitter:   "🐦 Twitter",
    shareWhatsapp:  "💬 WhatsApp",
    shareCopy:      "🔗 Copiar",
    agree:          "De acuerdo",
    neutral:        "Neutral",
    disagree:       "En desacuerdo",
    regionPH:       "Selecciona tu región"
  },

  qu: {
    badge:          "Perú 2026 Akllay",
    heroTitle:      "Pitaq kanki <em>cheqaqtam</em> rikunki",
    heroSub:        "Iskay chunka tawayuq tapuykusman kutichiy, 36 akllakuqkunawan tupachiy.",
    startBtn:       "Qallariy →",
    howBtn:         "Imaynatan rurasqa?",
    stat1:          "Akllakuqkuna",
    stat2:          "Tapuykuna",
    stat3:          "Temakuna",
    perfilTitle:    "Willawayku qanmanta",
    perfilSub:      "Willayniyki mana sutiyki rikunanpaq, yachaqaypaqmi.",
    edadLabel:      "Watayuq",
    generoLabel:    "Kaynikipi",
    regionLabel:    "Suyu",
    educLabel:      "Yachay atin",
    g1: "Qari", g2: "Warmi", g3: "Hukkunan", g4: "Mana willakuyta munanichu",
    e1: "Mana yachaqasqa", e2: "Pisi yachay", e3: "Chunka yachay",
    e4: "Técnico", e5: "Universidad", e6: "Posgrado",
    continueBtn:    "Tapuyman riy →",
    backBtn:        "← Ñaupaq",
    nextBtn:        "Qatiq →",
    finishBtn:      "Resultadoyta qaway →",
    sendingTitle:   "Yuyaychakuchkani...",
    sendingSub:     "36 propuestakunawan tupachichkani",
    resultsTitle:   "Resultadoykikuna",
    resultsSub:     "24 kutichisqaykiwan",
    topLabel:       "🏆 Sinchi tupaq akllakuqniyki",
    matchLabel:     "tupaq",
    allResultsTitle:"Tukuy akllakuqkuna",
    restartBtn:     "🔄 Qallarimuy",
    shareTwitter:   "🐦 Twitter",
    shareWhatsapp:  "💬 WhatsApp",
    shareCopy:      "🔗 Copiy",
    agree:          "Ari niniy",
    neutral:        "Chaynillan",
    disagree:       "Mana niniy",
    regionPH:       "Suyuykita akllay"
  },

  ay: {
    badge:          "Perú 2026 Elijiña",
    heroTitle:      "Kimsa <em>cheqa</em> ukanxa yatita",
    heroSub:        "Tunka paqallquni tapuqaru kutichaña, 36 candidatukana ukana elijiña.",
    startBtn:       "Qalltaña →",
    howBtn:         "Kunamatsa rurata?",
    stat1:          "Candidatukuna",
    stat2:          "Tapuqkuna",
    stat3:          "Temakuna",
    perfilTitle:    "Jiwasatakiwa willaña",
    perfilSub:      "Willawipaxa sutima uñstayañatakiwa, yatxatawirakiwa.",
    edadLabel:      "Maranaka",
    generoLabel:    "Kaypacha",
    regionLabel:    "Suyu",
    educLabel:      "Yatiqaña",
    g1: "Chacha", g2: "Warmi", g3: "Janiwa", g4: "Amuyt'añasa janiwa munistu",
    e1: "Janiwa yatiqata", e2: "Nayriri yatiqaña", e3: "Qhispiri yatiqaña",
    e4: "Técnico", e5: "Universidad", e6: "Posgrado",
    continueBtn:    "Tapuqaruwa saraña →",
    backBtn:        "← Nayraqata",
    nextBtn:        "Qhiphaña →",
    finishBtn:      "Resultaduma uñjaña →",
    sendingTitle:   "Yatxatachkta...",
    sendingSub:     "36 propuestanakampi uñt'ayachkta",
    resultsTitle:   "Resultadunakama",
    resultsSub:     "Tunka paqallqunini tapuqanaka",
    topLabel:       "🏆 Aski candidatuma",
    matchLabel:     "uñt'ayawi",
    allResultsTitle:"Tukuri candidatunaka",
    restartBtn:     "🔄 Mayta qalltaña",
    shareTwitter:   "🐦 Twitter",
    shareWhatsapp:  "💬 WhatsApp",
    shareCopy:      "🔗 Copiaña",
    agree:          "Ukhamawa",
    neutral:        "Chiqpachawa",
    disagree:       "Janiwa ukhamakiti",
    regionPH:       "Suyuma akllaña"
  }
};

// ------------------------------------------------------------------
// Estado del idioma actual y función de acceso rápido
// ------------------------------------------------------------------

// currentLang es la variable global que todo el sistema lee.
// Se inicializa en 'es' y cambia cuando el usuario elige otro idioma.
let currentLang = 'es';

// t(key) es el helper que se usa en todo el código para obtener
// un texto traducido. Si la clave no existe en el idioma elegido,
// cae de vuelta al español como idioma de respaldo.
function t(key) {
  return T[currentLang][key] || T['es'][key] || key;
}

// ------------------------------------------------------------------
// Cambio de idioma
// ------------------------------------------------------------------
function setLang(lang) {
  currentLang = lang;

  // Marca el botón activo en el nav
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.lang-btn')[['es','qu','ay'].indexOf(lang)].classList.add('active');

  // Actualiza todos los elementos con [data-t] en la pantalla actual
  applyTranslations();

  // Si el quiz está activo, vuelve a renderizar la pregunta actual
  // para que el texto de la pregunta también cambie de idioma
  if (currentQ >= 0 && document.getElementById('screen-quiz').classList.contains('active')) {
    renderQuestion(currentQ);
  }
}

// ------------------------------------------------------------------
// Aplicar traducciones al DOM
// ------------------------------------------------------------------
// Esta función recorre todos los elementos que tienen el atributo
// [data-t] y reemplaza su contenido con el texto traducido.
// Es seguro llamarla en cualquier momento sin romper el estado.
function applyTranslations() {
  document.querySelectorAll('[data-t]').forEach(el => {
    const key = el.getAttribute('data-t');
    const val = t(key);
    if (val) el.innerHTML = val;
  });
}
