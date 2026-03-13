// =============================================================
// results.js — Cálculo de coincidencias y renderizado de resultados
//
// Este archivo tiene cuatro responsabilidades:
//
//   1. CÁLCULO: comparar las respuestas del usuario con las posiciones
//      de cada candidato y calcular un porcentaje de coincidencia.
//
//   2. RENDERIZADO: construir el HTML de los resultados —
//      la tarjeta del candidato top con barras por eje, y el grid
//      con todos los candidatos en orden de mayor a menor coincidencia.
//
//   3. MODAL: mostrar el detalle de coincidencia por eje para
//      cualquier candidato al hacer clic en "Ver coincidencias".
//
//   4. COMPARTIR: funciones de Twitter, WhatsApp y copiar enlace.
//      También la función que envía los datos a Google Sheets.
// =============================================================

// ------------------------------------------------------------------
// CÁLCULO DE COINCIDENCIAS
// ------------------------------------------------------------------

/**
 * calculateResults() — punto de entrada del cálculo.
 * Muestra la pantalla de carga (spinner), espera 2.2 segundos para
 * dar la sensación de cálculo, y luego muestra los resultados.
 *
 * El algoritmo de puntuación es por distancia:
 *   - Misma posición (ambos 1, ambos 0, ambos -1) → 2 puntos
 *   - Diferencia de 1 (ej: usuario=1, candidato=0) → 1 punto
 *   - Diferencia de 2 (ej: usuario=1, candidato=-1) → 0 puntos
 * El porcentaje es: (puntos obtenidos) / (puntos máximos) × 100
 */
function calculateResults() {
  showScreen('screen-sending');

  setTimeout(() => {
    // Puntúa a cada candidato contra las respuestas del usuario
    // Cada pregunta tiene un peso diferente (Q_WEIGHTS) basado en su varianza
    // y el multiplicador de su eje temático.
    const scored = CANDIDATES.map(c => {
      let match = 0, totalWeight = 0;
      answers.forEach((a, i) => {
        if (a !== null) {
          const w = Q_WEIGHTS[i] || 1; // peso de la pregunta i
          totalWeight += w;
          if (a === c.pos[i]) match += w * 2;           // coincidencia total
          else if (Math.abs(a - c.pos[i]) === 1) match += w; // coincidencia parcial
          // diferencia de 2 → 0 puntos
        }
      });
      const pct = totalWeight > 0 ? Math.round((match / (totalWeight * 2)) * 100) : 0;
      return { ...c, pct };
    }).sort((a, b) => b.pct - a.pct);

    // Envía datos a Google Sheets (sin bloquear la UI)
    sendToGoogleSheets(scored[0].name, scored[0].pct);

    // Renderiza y muestra
    renderResults(scored);
    showScreen('screen-results');
  }, 2200);
}

/**
 * getAxisScore(candPos, axis) — calcula el porcentaje de coincidencia
 * en un eje temático específico entre el usuario y un candidato.
 * Usa AXIS_RANGES (definido en data.js) y Q_WEIGHTS para ponderar.
 */
function getAxisScore(candPos, axis) {
  const [start, end] = AXIS_RANGES[axis];
  let match = 0, totalWeight = 0;
  for (let i = start; i < end; i++) {
    if (answers[i] !== null) {
      const w = Q_WEIGHTS[i] || 1;
      totalWeight += w;
      if (answers[i] === candPos[i]) match += w * 2;
      else if (Math.abs(answers[i] - candPos[i]) === 1) match += w;
    }
  }
  return totalWeight > 0 ? Math.round((match / (totalWeight * 2)) * 100) : 0;
}

// ------------------------------------------------------------------
// RENDERIZADO DE RESULTADOS
// ------------------------------------------------------------------

/**
 * renderResults(scored) — construye toda la pantalla de resultados.
 *
 * Hace dos cosas principales:
 *   A) Llena la "tarjeta top" con foto, nombre, partido y barras por eje
 *      del candidato #1. Las barras se animan con un delay escalonado.
 *   B) Construye el grid con los 36 candidatos ordenados por coincidencia.
 *      Cada tarjeta tiene animación de entrada escalonada (cardIn con delay).
 *      Las barras de progreso superiores se animan después de que
 *      las tarjetas aparecen (doble requestAnimationFrame).
 *
 * Los resultados quedan guardados en window._scoredCandidates y
 * window._axisNames para que el modal los pueda acceder después.
 */
function renderResults(scored) {
  const top = scored[0];

  // Nombres de los 8 ejes en el idioma activo
  const axisNames = {
    es: ['Economía','Seguridad','Educación/Salud','Medio Ambiente',
         'Corrupción','Política Exterior','Género/DDHH','Descentralización'],
    qu: ['Qullqi','Seguridad','Yachay','Pachamama',
         'Qhichuwakuy','Hawa Suyu','Warmi-Qari','Suyu'],
    ay: ['Qullqi','Seguridada','Yatiqaña','Pachamama',
         'Laqhachawi','Hawa Suyu','Warmi-Chacha','Suyu Kamana']
  };
  const anames = axisNames[currentLang] || axisNames.es;

  // ----- A) TARJETA TOP -----
  const axisScores = [0,1,2,3,4,5,6,7].map(i => ({
    name: anames[i],
    pct:  getAxisScore(top.pos, i)
  }));

  document.getElementById('top-candidate-card').innerHTML = `
    <div class="top-label">${t('topLabel')}</div>
    <div class="top-row">
      <div class="top-avatar-wrap">
        <img class="top-avatar-img" src="${top.photo}" alt="${top.name}"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <div class="top-avatar-fallback" style="display:none">${top.initials}</div>
      </div>
      <div class="top-info">
        <div class="top-name">${top.name}</div>
        <div class="top-party-row">
          <img class="party-logo-sm" src="${top.logo}" alt="${top.party}"
            onerror="this.style.display='none'">
          <span class="top-party">${top.party}</span>
        </div>
      </div>
      <div>
        <div class="top-pct">${top.pct}%</div>
        <div class="top-pct-label">${t('matchLabel')}</div>
      </div>
    </div>
    <div class="axis-bars">
      ${axisScores.map((ax, ai) => `
        <div class="axis-row">
          <div class="axis-label">${ax.name}</div>
          <div class="axis-bg">
            <div class="axis-fill ${ax.pct >= 60 ? 'high' : ax.pct >= 35 ? 'mid' : 'low'}"
              style="width:0%; transition:width 0.8s cubic-bezier(.4,0,.2,1) ${400 + ai*80}ms;"
              data-pct="${ax.pct}"></div>
          </div>
          <div class="axis-pct">${ax.pct}%</div>
        </div>`).join('')}
    </div>`;

  // Anima las barras del candidato top después de que el DOM esté pintado
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.querySelectorAll('.axis-fill[data-pct]').forEach(bar => {
      bar.style.width = bar.dataset.pct + '%';
    });
  }));

  // ----- B) GRID DE TODOS LOS CANDIDATOS -----
  // Guardamos en window para que openModal() los acceda sin re-calcular
  window._scoredCandidates = scored;
  window._axisNames        = anames;

  const rankClass = ['rank-1','rank-2','rank-3'];
  const grid = document.getElementById('results-grid');

  grid.innerHTML = scored.map((c, i) => `
    <div class="result-card ${rankClass[i] || ''}"
      style="opacity:0; animation:cardIn 0.4s cubic-bezier(.4,0,.2,1) ${i * 60}ms both;">
      <div class="card-bar-top">
        <div class="card-bar-fill"
          style="width:0%; transition:width 0.9s cubic-bezier(.4,0,.2,1) ${300 + i*50}ms;"></div>
      </div>
      <div class="card-photo-wrap">
        <img class="card-photo" src="${c.photo}" alt="${c.name}"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <div class="card-photo-fallback" style="display:none">${c.initials}</div>
        <div class="card-rank-badge">${
          i === 0 ? '🏆 #1' : i === 1 ? '🥈 #2' : i === 2 ? '🥉 #3' : '#' + (i + 1)
        }</div>
      </div>
      <div class="card-body">
        <div class="card-top-info">
          <div class="card-pct">${c.pct}%</div>
          <img class="card-logo" src="${c.logo}" alt="${c.party}"
            onerror="this.style.display='none'">
        </div>
        <div class="card-name">${c.name}</div>
        <div class="card-party">${c.party}</div>
        <button class="btn-coincidencias" onclick="openModal(${i})">
          Ver coincidencias →
        </button>
      </div>
    </div>`).join('');

  // Anima las barras superiores de todas las tarjetas
  // El doble requestAnimationFrame asegura que el DOM esté completamente pintado
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.querySelectorAll('.card-bar-fill').forEach((bar, i) => {
      bar.style.width = scored[i].pct + '%';
    });
  }));
}

// ------------------------------------------------------------------
// MODAL DE COINCIDENCIAS POR EJE
// ------------------------------------------------------------------

/**
 * openModal(idx) — muestra el modal con el desglose por eje temático
 * del candidato en la posición idx del ranking.
 *
 * Lee los datos desde window._scoredCandidates para no recalcular.
 * El color de cada barra (high/mid/low) depende del porcentaje:
 *   ≥ 60% → azul (alta coincidencia)
 *   35-59% → amarillo (coincidencia media)
 *   < 35%  → rojo (baja coincidencia)
 */
function openModal(idx) {
  const scored = window._scoredCandidates;
  const anames = window._axisNames;
  if (!scored) return;

  const c = scored[idx];
  const axisScores = [0,1,2,3,4,5,6,7].map(i => ({
    name: anames[i],
    pct:  getAxisScore(c.pos, i)
  }));

  document.getElementById('modal-header').innerHTML = `
    <img class="modal-photo" src="${c.photo}" alt="${c.name}"
      onerror="this.style.display='none'">
    <div style="flex:1;min-width:0">
      <div class="modal-name">${c.name}</div>
      <div class="modal-party-row">
        <img class="modal-logo" src="${c.logo}" alt="${c.party}"
          onerror="this.style.display='none'">
        <span class="modal-party">${c.party}</span>
      </div>
    </div>
    <div class="modal-pct-big">${c.pct}%</div>`;

  document.getElementById('modal-axes').innerHTML = axisScores.map(ax => `
    <div class="modal-axis-row">
      <div class="modal-axis-label">${ax.name}</div>
      <div class="modal-axis-bg">
        <div class="modal-axis-fill ${ax.pct >= 60 ? 'high' : ax.pct >= 35 ? 'mid' : 'low'}"
          style="width:${ax.pct}%"></div>
      </div>
      <div class="modal-axis-pct">${ax.pct}%</div>
    </div>`).join('');

  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden'; // evita scroll del fondo
}

/** closeModal(e) — cierra el modal solo si el clic fue en el overlay (fondo oscuro) */
function closeModal(e) {
  if (e.target === document.getElementById('modal-overlay')) closeModalDirect();
}

/** closeModalDirect() — cierra el modal incondicionalmente (botón ✕) */
function closeModalDirect() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = ''; // restaura el scroll
}

// ------------------------------------------------------------------
// GOOGLE SHEETS — RECOLECCIÓN DE DATOS ANÓNIMOS
// ------------------------------------------------------------------

/**
 * sendToGoogleSheets(topCandidate, topPct) — envía los datos del usuario
 * de forma anónima a una Google Sheet vía Apps Script.
 *
 * Usa mode: 'no-cors' porque Apps Script no devuelve CORS headers.
 * Esto significa que no podemos leer la respuesta, pero los datos
 * sí llegan al servidor. Los errores se silencian con .catch(() => {}).
 *
 * Para cambiar el destino: reemplaza SCRIPT_URL con la URL de tu
 * nuevo deployment en Apps Script (Implementar → Nueva implementación).
 */
function sendToGoogleSheets(topCandidate, topPct) {
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzaZwQQlT6f3hbtBLxMuv9zb6NjEvg4rG3gp1_Xz-vy8rNYcs_BXe7Jo0QOkf1YSunZSg/exec';

  // Codifica las respuestas como "P1:A,P2:N,P3:D,..." para la hoja
  const respuestasData = answers
    .map((a, i) => `P${i+1}:${a === 1 ? 'A' : a === 0 ? 'N' : 'D'}`)
    .join(',');

  const payload = {
    edad:       userProfile.edad,
    genero:     userProfile.genero,
    region:     userProfile.region,
    educacion:  userProfile.educacion,
    idioma:     userProfile.idioma === 'es' ? 'Español'
                : userProfile.idioma === 'qu' ? 'Quechua' : 'Aymara',
    candidato:  `${topCandidate} (${topPct}%)`,
    respuestas: respuestasData
  };

  fetch(SCRIPT_URL, {
    method:  'POST',
    mode:    'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(payload)
  }).catch(() => {}); // falla silenciosamente para no interrumpir la UX
}

// ------------------------------------------------------------------
// COMPARTIR EN REDES
// ------------------------------------------------------------------

function shareTwitter() {
  const text = currentLang === 'es'
    ? '¡Hice el Votómetro y descubrí con qué candidato coincido! Pruébalo tú también 🗳️'
    : 'Hice el Votómetro 🗳️';
  window.open(
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`
  );
}

function shareWhatsapp() {
  const text = currentLang === 'es'
    ? '¡Hice el Votómetro y descubrí con qué candidato coincido! Pruébalo: '
    : 'Hice el Votómetro: ';
  window.open(`https://wa.me/?text=${encodeURIComponent(text + window.location.href)}`);
}

function copyLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    alert(currentLang === 'es' ? '¡Enlace copiado!' : 'Copiado!');
  });
}
