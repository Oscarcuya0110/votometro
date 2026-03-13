// =============================================================
// data.js — Todos los datos del Votómetro
// Versión v2 — Preguntas v2 (22 preguntas con pesos diferenciados)
//
// CAMBIOS RESPECTO A v1:
//   - 4 preguntas eliminadas por varianza cero o muy baja:
//       P4  (penas más duras, var=0.027)
//       P7  (educación pública gratuita, var=0.000)
//       P13 (inhabilitación por corrupción, var=0.027)
//       P22 (autonomía presupuestaria regional, var=0.027)
//   - 2 preguntas nuevas incorporadas:
//       P-N1 ★ AFP / sistema público de pensiones   (eje Economía, índice 3)
//       P-N2 ★ Legalización de marihuana            (eje Seguridad, índice 6)
//   - Sistema de pesos: cada pregunta tiene un peso distinto basado en
//       varianza × multiplicador de eje. results.js usa Q_WEIGHTS.
//   - Total de preguntas: 22 (antes 24)
//
// ★ NOTA: Las posiciones para P-N1 y P-N2 están en 0 (pendiente).
//   Verificar con planes de gobierno JNE antes del lanzamiento.
// =============================================================

// ------------------------------------------------------------------
// Q_WEIGHTS — Peso de cada pregunta en el cálculo de coincidencia
// Fórmula: varianza(pregunta) × multiplicador(eje), escala 1.0–3.0
// ------------------------------------------------------------------
const Q_WEIGHTS = [
  // EJE ECONOMÍA (×2)
  3.0,  // P1   Control estatal minería/petróleo/energía
  2.9,  // P2   Reducir impuestos a empresas
  3.0,  // P3   Priorizar crecimiento vs normas
  2.4,  // P-N1 ★ AFP y sistema público de pensiones
  // EJE SEGURIDAD (×2)
  1.8,  // P5   FFAA en zonas urbanas
  2.8,  // P6   Prevención social vs encarcelamiento
  2.5,  // P-N2 ★ Legalización de marihuana
  // EJE EDUCACIÓN Y SALUD (×1)
  1.9,  // P8   Gestión privada hospitales/colegios
  1.0,  // P9   Sistema de salud universal
  // EJE MEDIO AMBIENTE (×1)
  2.0,  // P10  Proyectos mineros vs comunidades
  1.3,  // P11  Metas climáticas internacionales
  1.8,  // P12  Veto indígena sobre extractivas
  // EJE CORRUPCIÓN (×1)
  1.3,  // P14  Menos poder del Congreso sobre Ejecutivo
  1.9,  // P15  Nueva Constitución
  // EJE POLÍTICA EXTERIOR (×1)
  1.8,  // P16  Endurecer controles migratorios
  1.9,  // P17  Romper con Venezuela/Nicaragua
  1.6,  // P18  Priorizar TLC
  // EJE GÉNERO Y DDHH (×1)
  1.7,  // P19  Matrimonio igualitario
  1.8,  // P20  Aborto en casos de violación
  1.5,  // P21  Cuotas de género
  // EJE DESCENTRALIZACIÓN (×2)
  1.1,  // P23  Canon íntegro en regiones
  2.1,  // P24  Modelo federal
];

// ------------------------------------------------------------------
// AXES — Nombre del eje para cada pregunta (22 entradas)
// ------------------------------------------------------------------
const AXES = {
  es: [
    '💰 Economía','💰 Economía','💰 Economía','💰 Economía',
    '🛡️ Seguridad','🛡️ Seguridad','🛡️ Seguridad',
    '📚 Educación y Salud','📚 Educación y Salud',
    '🌿 Medio Ambiente','🌿 Medio Ambiente','🌿 Medio Ambiente',
    '⚖️ Corrupción','⚖️ Corrupción',
    '🌎 Política Exterior','🌎 Política Exterior','🌎 Política Exterior',
    '👥 Género y DDHH','👥 Género y DDHH','👥 Género y DDHH',
    '🗺️ Descentralización','🗺️ Descentralización'
  ],
  qu: [
    '💰 Qullqi','💰 Qullqi','💰 Qullqi','💰 Qullqi',
    '🛡️ Seguridad','🛡️ Seguridad','🛡️ Seguridad',
    '📚 Yachay','📚 Yachay',
    '🌿 Pachamama','🌿 Pachamama','🌿 Pachamama',
    '⚖️ Qhichuwakuy','⚖️ Qhichuwakuy',
    '🌎 Hawa Suyukuna','🌎 Hawa Suyukuna','🌎 Hawa Suyukuna',
    '👥 Warmi-Qari','👥 Warmi-Qari','👥 Warmi-Qari',
    '🗺️ Suyu Kamachiynin','🗺️ Suyu Kamachiynin'
  ],
  ay: [
    '💰 Qullqi','💰 Qullqi','💰 Qullqi','💰 Qullqi',
    '🛡️ Seguridada','🛡️ Seguridada','🛡️ Seguridada',
    '📚 Yatiqaña','📚 Yatiqaña',
    '🌿 Pachamama','🌿 Pachamama','🌿 Pachamama',
    '⚖️ Laqhachawi','⚖️ Laqhachawi',
    '🌎 Hawa Suyunaka','🌎 Hawa Suyunaka','🌎 Hawa Suyunaka',
    '👥 Warmi-Chacha','👥 Warmi-Chacha','👥 Warmi-Chacha',
    '🗺️ Suyu Kamana','🗺️ Suyu Kamana'
  ]
};

// ------------------------------------------------------------------
// AXIS_RANGES — Rangos de índice para cada eje (8 ejes, 22 preguntas)
// Usado por results.js → getAxisScore() para el desglose por eje
// ------------------------------------------------------------------
const AXIS_RANGES = [
  [0, 4],   // Economía          → índices 0–3  (4 preguntas)
  [4, 7],   // Seguridad         → índices 4–6  (3 preguntas)
  [7, 9],   // Educación/Salud   → índices 7–8  (2 preguntas)
  [9, 12],  // Medio Ambiente    → índices 9–11 (3 preguntas)
  [12, 14], // Corrupción        → índices 12–13 (2 preguntas)
  [14, 17], // Política Exterior → índices 14–16 (3 preguntas)
  [17, 20], // Género/DDHH       → índices 17–19 (3 preguntas)
  [20, 22], // Descentralización → índices 20–21 (2 preguntas)
];

// ------------------------------------------------------------------
// QUESTIONS — Las 22 preguntas del quiz en 3 idiomas
// ★ = pregunta nueva; traducción QU y AY es aproximada
// ------------------------------------------------------------------
const QUESTIONS = {
  es: [
    // EJE 1: Economía (4 preguntas)
    "¿El Estado debe controlar directamente los sectores de minería, petróleo y energía?",
    "¿El Estado debe reducir significativamente los impuestos a las empresas para atraer inversión?",
    "¿El crecimiento económico debe priorizarse aunque implique flexibilizar normas ambientales y laborales?",
    "★ ¿El Estado debe eliminar las AFP y crear un sistema público de pensiones administrado por el Estado?",
    // EJE 2: Seguridad (3 preguntas)
    "¿Las Fuerzas Armadas deben intervenir en zonas urbanas para combatir la delincuencia?",
    "¿La prevención social debe priorizarse sobre el encarcelamiento para reducir la criminalidad?",
    "★ ¿El Estado debe legalizar o regular la marihuana para consumo personal?",
    // EJE 3: Educación y Salud (2 preguntas)
    "¿Los hospitales y colegios pueden ser gestionados por el sector privado con supervisión del Estado?",
    "¿El Perú debe implementar un sistema de salud universal financiado por el Estado?",
    // EJE 4: Medio Ambiente (3 preguntas)
    "¿Los proyectos mineros deben poder avanzar aunque comunidades locales se opongan?",
    "¿El Perú debe comprometerse con metas climáticas internacionales aunque limiten la inversión?",
    "¿Las comunidades indígenas deben tener derecho a veto sobre proyectos extractivos en sus territorios?",
    // EJE 5: Corrupción (2 preguntas)
    "¿El Congreso debe tener menos facultades de control sobre el Ejecutivo y el sistema judicial?",
    "¿El Perú necesita una nueva Constitución para refundar el Estado?",
    // EJE 6: Política Exterior (3 preguntas)
    "¿El Estado debe endurecer los controles migratorios y acelerar las deportaciones?",
    "¿El Perú debe romper relaciones diplomáticas con Venezuela y Nicaragua?",
    "¿El Perú debe priorizar la firma de nuevos Tratados de Libre Comercio?",
    // EJE 7: Género y DDHH (3 preguntas)
    "¿El Estado debe reconocer legalmente el matrimonio entre personas del mismo sexo?",
    "¿El aborto debe ser legal en casos de violación sexual?",
    "¿Deben existir cuotas obligatorias de género en cargos de representación política?",
    // EJE 8: Descentralización (2 preguntas)
    "¿El canon minero y gasífero debe quedarse íntegramente en las regiones donde se extrae?",
    "¿El Perú debe avanzar hacia un modelo de Estado federal con regiones autónomas?"
  ],

  qu: [
    "¿Estadom directamente controlanan minería, petróleo, energía suyukuna?",
    "¿Gobiernom empresakunap impuestonta pisiyachinman, inversión privadatam maskhanankupaq?",
    "¿Perúm wiñayninta munanan, chaypim medio ambiente leykunata fleciblichinman?",
    "★ ¿AFP sistema tukukuyninman, Estadom pensiones sistema publico ruranman?",
    "¿Fuerzas Armadasmi llaqtakunapi yanapanman policiatam, crimen organizadota atipanankupaq?",
    "¿Yachay, trabajo, rehabilitaciónmi aswanmi allin kausayta churayta atinman?",
    "★ ¿Estadom marihuanata legalizananman, personal usopaq?",
    "¿Estadom permitinanmi privadokunam hospitalkuna, escuelakunata manejananpaq?",
    "¿Perúm huk salud universalman rishanman, tukuykunam huk coberturaya kashanankupaq?",
    "¿Minas extractivas proyectokuna ñannin kananpaq atinanmi, comunidadkuna chiqnichinapipis?",
    "¿Perúm comprometisqa kananmi metas climáticaswan, extractivas limitakuspapis?",
    "¿Comunidades indígenasmi vetoyta atinman territorio proyectos extractivospi?",
    "¿Congresomi pisipuni atiyniyuq kananman ministrokunata censuranankupaq?",
    "¿Perúm musan Constituciónta maskhanman, Estado llimpu reformanankupaq?",
    "¿Perúm migracionta controlananmi, huchayuq extranjerokuna deportasqa kananankupaq?",
    "¿Perúm Venezuela, Nicaraguawan diplomacia cortananman?",
    "¿Perúm libre comercio tratadokunata maskhanman, exportacionesta wiñachinanpaq?",
    "¿Matrimonio civilmi igualitario kananman, mismo sexo parejaskunapaq?",
    "¿Aborto legalmi kananman violación casokunapaq?",
    "¿Estadom cuotas de género obligatoriosta churananman cargos públicospi?",
    "¿Canon minero y gaserosomi regiones propiospi qhedananman?",
    "¿Perúm modelo federal evaluananman, sapa región propio gobierno kananpaq?"
  ],

  ay: [
    "¿Estadowa directamente controlarapxañani minería, petróleo, energía suyunaka?",
    "¿Gobiernoxa empresa impuestonaka pisiyañani, inversión privada maskhawinakampi?",
    "¿Perúxa wiñañataki munañani, ukhamata medio ambiente leynaka kamachañani?",
    "★ ¿AFP sistema tukuyasiñataki, Estadoxa pensiones sistema público lurañani?",
    "¿Fuerzas Armadasxa markanakanxa yanapt'añani policiata, crimen organizado atipañataki?",
    "¿Yatiqaña, trabaju, rehabilitaciónxa aski suma kawsayta churañataki?",
    "★ ¿Estadoxa marihuanxa legalizarañani, personal uñt'añataki?",
    "¿Estadoxa permitiñani privadunaka hospitalnaka, escuelanaka manejañataki?",
    "¿Perúxa huk salud universal lurañataki, tukuri salud cobertura ukhamata?",
    "¿Minas extractivas proyectonaka sartañataki atiñani, comunidadnaka inayankapuna?",
    "¿Perúxa comprometisqarakiwa metas climáticas, extractivas limitañatakipuni?",
    "¿Comunidades indígenasxa vetoxa utjañani territoriona extractivos proyectonakataki?",
    "¿Congresoxa pisipuni atiyata katjañani ministros censurarañataki?",
    "¿Perúxa musan Constituciónxa maskhasqarakiwa, Estado reforma lurañataki?",
    "¿Perúxa migración kontrolarañani, huchatata extranjem deportarañataki?",
    "¿Perúxa Venezuela, Nicaragua diplomacia cortarañani?",
    "¿Perúxa libre comercio tratado maskharañani, exportaciones wiñayañataki?",
    "¿Matrimonio civilxa igualitario kañani, mismo sexo parejanakataki?",
    "¿Aborto legalxa kañani violación kasunakataki?",
    "¿Estadoxa cuotas de género obligatorios churañani cargos públicosnakana?",
    "¿Canon minero y gasíferoxa regiones propionakanxa qhiparakiwa?",
    "¿Perúxa modelo federal yatxatañani, sapa región propio gobierno ukhamata?"
  ]
};

// ------------------------------------------------------------------
// CANDIDATES — Los 36 candidatos (22 posiciones cada uno)
//
// Índices del array pos:
//   0  P1   Economía: control estatal
//   1  P2   Economía: reducir impuestos
//   2  P3   Economía: crecimiento vs normas
//   3  P-N1 Economía: eliminar AFP ★ (0 = pendiente verificación)
//   4  P5   Seguridad: FFAA urbanas
//   5  P6   Seguridad: prevención social
//   6  P-N2 Seguridad: legalizar marihuana ★ (0 = pendiente verificación)
//   7  P8   Educación/Salud: gestión privada
//   8  P9   Educación/Salud: salud universal
//   9  P10  Medio Ambiente: minería vs comunidades
//  10  P11  Medio Ambiente: metas climáticas
//  11  P12  Medio Ambiente: veto indígena
//  12  P14  Corrupción: menos poder Congreso
//  13  P15  Corrupción: nueva Constitución
//  14  P16  Política Exterior: migraciones
//  15  P17  Política Exterior: Venezuela/Nicaragua
//  16  P18  Política Exterior: TLC
//  17  P19  Género/DDHH: matrimonio igualitario
//  18  P20  Género/DDHH: aborto en violación
//  19  P21  Género/DDHH: cuotas de género
//  20  P23  Descentralización: canon íntegro
//  21  P24  Descentralización: modelo federal
// ------------------------------------------------------------------
const CANDIDATES = [
  { name: "Keiko Fujimori",        party: "Fuerza Popular",               initials: "KF",
    photo: "https://mpesije.jne.gob.pe/apidocs/251cd1c0-acc7-4338-bd8a-439ccb9238d0.jpeg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/1366",
    pos: [-1, 1, 1, 0,   1, 0, 0,   -1, 0,   1, 0,-1,   1,-1,   1, 1, 1,   -1,-1, 0,   0,-1] },

  { name: "Rafael López Aliaga",   party: "Renovación Popular",           initials: "RL",
    photo: "https://mpesije.jne.gob.pe/apidocs/b2e00ae2-1e50-4ad3-a103-71fc7e4e8255.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/22",
    pos: [-1, 1, 0, 0,   1,-1, 0,    1, 0,   1, 0,-1,   0,-1,   1, 1, 1,   -1,-1,-1,   1,-1] },

  { name: "César Acuña",           party: "Alianza para el Progreso",     initials: "CA",
    photo: "https://mpesije.jne.gob.pe/apidocs/d6fe3cac-7061-474b-8551-0aa686a54bad.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/1257",
    pos: [-1, 1, 1, 0,   1, 0, 0,    1, 1,   1, 1, 0,   1,-1,   1, 1, 1,   -1,-1, 0,   1,-1] },

  { name: "José Williams",         party: "Avanza País",                  initials: "JW",
    photo: "https://mpesije.jne.gob.pe/apidocs/b60c471f-a6bb-4b42-a4b2-02ea38acbb0d.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2173",
    pos: [-1, 1, 1, 0,   1, 0, 0,    1, 1,   1, 1, 0,   0,-1,   1, 1, 1,    0, 0, 1,   1, 0] },

  { name: "George Forsyth",        party: "Somos Perú",                   initials: "GF",
    photo: "https://mpesije.jne.gob.pe/apidocs/b1d60238-c797-4cba-936e-f13de6a34cc7.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/14",
    pos: [ 0, 0,-1, 0,   0, 1, 0,    0, 1,   0, 1, 1,   1, 0,   1, 0, 1,    0, 0, 1,   1, 0] },

  { name: "Yonhy Lescano",         party: "Cooperación Popular",          initials: "YL",
    photo: "https://mpesije.jne.gob.pe/apidocs/b9db2b5c-02ff-4265-ae51-db9b1001ad70.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2995",
    pos: [ 1,-1,-1, 0,   1, 1, 0,   -1, 1,  -1, 1, 1,   0, 0,   0,-1, 0,    0, 1, 1,   1, 0] },

  { name: "Vladimir Cerrón",       party: "Perú Libre",                   initials: "VC",
    photo: "https://mpesije.jne.gob.pe/apidocs/82ee0ff2-2336-4aba-9590-e576f7564315.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2218",
    pos: [ 1,-1,-1, 1,   0, 1, 1,   -1, 1,  -1, 0, 1,   1, 1,  -1,-1,-1,    0, 1, 1,   1, 0] },

  { name: "Mario Vizcarra",        party: "Perú Primero",                 initials: "MV",
    photo: "https://mpesije.jne.gob.pe/apidocs/ee7a080e-bc81-4c81-9e5e-9fd95ff459ab.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2925",
    pos: [ 0, 0,-1, 0,   1, 1, 0,    0, 1,   0, 1, 0,   1, 0,   1, 0, 1,    0, 0, 1,   1, 0] },

  { name: "José Luna Gálvez",      party: "Podemos Perú",                 initials: "JL",
    photo: "https://mpesije.jne.gob.pe/apidocs/a669a883-bf8a-417c-9296-c14b943c3943.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2731",
    pos: [ 0, 1, 0, 0,   1, 0, 0,    1, 1,   1, 1, 0,   1, 0,   1, 0, 1,    0, 0, 1,   1,-1] },

  { name: "Mesías Guevara",        party: "Partido Morado",               initials: "MG",
    photo: "https://mpesije.jne.gob.pe/apidocs/1b861ca7-3a5e-48b4-9024-08a92371e33b.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2840",
    pos: [-1, 0,-1, 0,   0, 1, 0,    0, 1,  -1, 1, 1,   1, 0,   0, 0, 1,    1, 1, 1,   0, 0] },

  { name: "Rafael Belaunde",       party: "Libertad Popular",             initials: "RB",
    photo: "https://mpesije.jne.gob.pe/apidocs/3302e45b-55c8-4979-a60b-2b11097abf1d.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2933",
    pos: [-1, 1, 0, 0,   1, 0, 0,    1, 1,   1, 1, 0,   1,-1,   1, 1, 1,    1, 1, 1,   1,-1] },

  { name: "Pitter Valderrama",     party: "Partido Aprista",              initials: "PV",
    photo: "https://mpesije.jne.gob.pe/apidocs/d72c4b29-e173-42b8-b40d-bdb6d01a526a.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2930",
    pos: [ 0, 0,-1, 0,   1, 1, 0,    0, 1,   0, 1, 0,   1, 1,   0,-1, 0,    0, 0, 1,   1, 0] },

  { name: "Roberto Sánchez",       party: "Juntos por el Perú",           initials: "RS",
    photo: "https://mpesije.jne.gob.pe/apidocs/bb7c7465-9c6e-44eb-ac7d-e6cc7f872a1a.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/1264",
    pos: [ 1,-1,-1, 1,   0, 1, 1,   -1, 1,  -1, 1, 1,   1, 1,  -1,-1,-1,    1, 1, 1,   1, 0] },

  { name: "Roberto Chiabra",       party: "Unidad Nacional",              initials: "RC",
    photo: "https://mpesije.jne.gob.pe/apidocs/5c703ce9-ba1e-4490-90bf-61006740166f.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/3023",
    pos: [-1, 1, 1, 0,   1,-1, 0,    1, 1,   1, 0,-1,   1,-1,   1, 1, 1,   -1,-1, 0,   1,-1] },

  { name: "Fiorella Molinelli",    party: "Fuerza y Libertad",            initials: "FM",
    photo: "https://mpesije.jne.gob.pe/apidocs/1de656b5-7593-4c60-ab7a-83d618a3d80d.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/3024",
    pos: [-1, 1, 1, 0,   1,-1, 0,    1, 1,   1, 1,-1,   0,-1,   1, 1, 1,   -1,-1, 0,   1,-1] },

  { name: "Carlos Álvarez",        party: "País para Todos",              initials: "CÁ",
    photo: "https://mpesije.jne.gob.pe/apidocs/2bd18177-d665-413d-9694-747d729d3e39.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2956",
    pos: [-1, 1, 1, 0,   1,-1, 0,    1, 1,   1, 1, 0,   1,-1,   1, 1, 1,    0, 0, 1,   1, 0] },

  { name: "Rosario Fernández",     party: "Un Camino Diferente",          initials: "RF",
    photo: "https://mpesije.jne.gob.pe/apidocs/ac0b0a59-ead5-4ef1-8ef8-8967e322d6ca.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2998",
    pos: [-1, 0,-1, 0,   1, 0, 0,    0, 1,   0, 1, 0,   0, 0,   1, 0, 0,    0, 0, 0,   1, 1] },

  { name: "Jorge Nieto",           party: "Partido del Buen Gobierno",    initials: "JN",
    photo: "https://mpesije.jne.gob.pe/apidocs/9ae56ed5-3d0f-49ff-8bb9-0390bad71816.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2961",
    pos: [ 0, 0,-1, 0,   0, 1, 0,    0, 1,   0, 1, 1,   1, 0,   0, 0, 0,    1, 1, 1,   1, 0] },

  { name: "F. Diez-Canseco",       party: "Perú Acción",                  initials: "FD",
    photo: "https://mpesije.jne.gob.pe/apidocs/2d1bf7f2-6e88-4ea9-8ed2-975c1ae5fb92.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2932",
    pos: [-1, 1, 1, 0,   1,-1, 0,    1, 1,   1, 0,-1,   1,-1,   1, 1, 1,   -1,-1, 0,   1,-1] },

  { name: "Napoleón Becerra",      party: "PTE-Perú",                     initials: "NB",
    photo: "https://mpesije.jne.gob.pe/apidocs/bab206cb-b2d5-41ec-bde8-ef8cf3e0a2df.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2939",
    pos: [ 1,-1,-1, 1,   0, 1, 0,   -1, 1,  -1, 0, 1,   0, 1,   0,-1, 0,    0, 0, 0,   1, 0] },

  { name: "Wolfgang Grozo",        party: "Integridad Democrática",       initials: "WG",
    photo: "https://mpesije.jne.gob.pe/apidocs/064360d1-ce49-4abe-939c-f4de8b0130a2.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2985",
    pos: [-1, 1, 0, 0,   1, 1, 0,    1, 1,   0, 1, 0,   1,-1,   1, 0, 0,   -1, 1, 1,   1,-1] },

  { name: "Antonio Ortiz",         party: "Salvemos al Perú",             initials: "AO",
    photo: "https://mpesije.jne.gob.pe/apidocs/8e6b9124-2883-4143-8768-105f2ce780eb.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2927",
    pos: [-1, 1, 0, 0,   0, 0, 0,    1, 1,   1, 1, 0,   1,-1,   1, 1, 1,   -1,-1, 0,   1,-1] },

  { name: "Paul Jaimes",           party: "Progresemos",                  initials: "PJ",
    photo: "https://mpesije.jne.gob.pe/apidocs/929e1a63-335d-4f3a-ba26-f3c7ff136213.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2967",
    pos: [ 0, 0,-1, 0,   1, 1, 0,    0, 1,   0, 1, 1,   1, 0,   1, 0, 0,    0, 0, 1,   1, 0] },

  { name: "Alfonso López Chau",    party: "Ahora Nación",                 initials: "AL",
    photo: "https://mpesije.jne.gob.pe/apidocs/ddfa74eb-cae3-401c-a34c-35543ae83c57.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2980",
    pos: [ 0, 0, 0, 0,   0, 0, 0,    0, 1,   0, 0, 0,   0, 0,   0, 0, 0,    0, 0, 0,   1, 0] },

  { name: "Ronald Atencio",        party: "Alianza Venceremos",           initials: "RA",
    photo: "https://mpesije.jne.gob.pe/apidocs/bac0288d-3b21-45ac-8849-39f9177fb020.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/3025",
    pos: [ 1,-1,-1, 0,   0, 1, 0,   -1, 1,  -1, 1, 1,   1, 1,  -1,-1, 0,    0, 0, 1,   1, 0] },

  { name: "Ricardo Belmont",       party: "Partido Cívico Obras",         initials: "RBe",
    photo: "https://mpesije.jne.gob.pe/apidocs/78647f15-d5d1-4ed6-8ac6-d599e83eeea3.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2941",
    pos: [-1, 1, 0, 0,   1, 0, 0,    1, 1,   1, 0, 0,   1,-1,   1, 1, 1,    0, 0, 0,   1,-1] },

  { name: "Charlie Carrasco",      party: "Demócrata Unido",              initials: "CC",
    photo: "https://mpesije.jne.gob.pe/apidocs/12fa17db-f28f-4330-9123-88549539b538.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2867",
    pos: [ 0, 0, 0, 0,   0, 0, 0,    0, 1,   0, 1, 0,   1, 0,   0, 0, 0,    0, 0, 0,   1, 0] },

  { name: "Alex González",         party: "Demócrata Verde",              initials: "AG",
    photo: "https://mpesije.jne.gob.pe/apidocs/c0ae56bf-21c1-4810-890a-b25c8465bdd9.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2895",
    pos: [-1, 0,-1, 0,   0, 1, 1,    0, 1,  -1, 1, 1,   1, 0,   0, 0, 1,    1, 1, 1,   1, 0] },

  { name: "Armando Masse",         party: "Democrático Federal",          initials: "AM",
    photo: "https://mpesije.jne.gob.pe/apidocs/cb1adeb7-7d2f-430c-ae87-519137d8edfa.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2986",
    pos: [ 0, 0, 0, 0,   0, 0, 0,    0, 1,   0, 0, 0,   0, 0,   0, 0, 0,    0, 0, 0,   1, 1] },

  { name: "Fernando Olivera",      party: "Frente de la Esperanza 2021",  initials: "FO",
    photo: "https://mpesije.jne.gob.pe/apidocs/3e2312e1-af79-4954-abfa-a36669c1a9e9.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2857",
    pos: [ 1,-1,-1, 0,   1, 1, 0,   -1, 1,  -1, 1, 1,   0, 1,  -1,-1, 0,    0, 0, 1,   1, 0] },

  { name: "Carlos Espá",           party: "Partido SíCreo",               initials: "CE",
    photo: "https://mpesije.jne.gob.pe/apidocs/85935f77-6c46-4eab-8c7e-2494ffbcece0.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2935",
    pos: [-1, 1, 0, 0,   1, 0, 0,    1, 1,   1, 0, 0,   1,-1,   1, 1, 1,   -1,-1, 0,   1,-1] },

  { name: "Carlos Jaico",          party: "Perú Moderno",                 initials: "CJ",
    photo: "https://mpesije.jne.gob.pe/apidocs/7d91e14f-4417-4d61-89ba-3e686dafaa95.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2924",
    pos: [-1, 1, 0, 0,   1, 0, 0,    0, 1,   0, 1, 0,   1,-1,   1, 0, 0,    0, 0, 1,   1, 0] },

  { name: "Marisol Pérez Tello",   party: "Primero la Gente",             initials: "MP",
    photo: "https://mpesije.jne.gob.pe/apidocs/073703ca-c427-44f0-94b1-a782223a5e10.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2931",
    pos: [ 0, 0,-1, 0,   0, 1, 0,    0, 1,   0, 1, 1,   1, 0,   1, 0, 1,    0, 0, 1,   1, 0] },

  { name: "Álvaro Paz de la Barra",party: "Fe en el Perú",                initials: "AP",
    photo: "https://votoinformado.jne.gob.pe/assets/images/candidatos/ALVARO%20PAZ%20DE%20LA%20BARRA.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2898",
    pos: [-1, 1, 0, 0,   1,-1, 0,    1, 1,   1, 0,-1,   0,-1,   1, 1, 1,   -1,-1, 0,   1,-1] },

  { name: "Herbert Caller",        party: "Partido Patriótico del Perú",  initials: "HC",
    photo: "https://mpesije.jne.gob.pe/apidocs/6ad6c5ff-0411-4ddd-9cf7-b0623f373fcf.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2869",
    pos: [-1, 1, 0, 0,   1, 0, 0,    1, 1,   1, 0, 0,   1,-1,   1, 1, 1,   -1,-1, 0,   1,-1] },

  { name: "Walter Chirinos",       party: "PRIN",                         initials: "WC",
    photo: "https://mpesije.jne.gob.pe/apidocs/a2d0f631-fe47-4c41-92ba-7ed9f4095520.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2921",
    pos: [ 0, 0, 0, 0,   1, 0, 0,    0, 1,   0, 0, 0,   0, 0,   1, 0, 0,    0, 0, 0,   1, 0] }
];
