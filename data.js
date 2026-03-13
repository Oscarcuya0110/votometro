// =============================================================
// data.js — Todos los datos del Votómetro
//
// Este archivo contiene tres bloques de datos:
//
//   AXES      → Nombres de los 8 ejes temáticos en 3 idiomas
//   QUESTIONS → Las 24 preguntas del quiz en 3 idiomas
//   CANDIDATES → Los 36 candidatos con foto, logo y posiciones
//
// Cómo agregar o editar un candidato:
//   Busca su entrada en el array CANDIDATES y modifica los campos.
//   El campo "pos" es un array de 24 valores:
//     1  = candidato está de acuerdo con la afirmación
//     0  = posición neutral o no declarada
//    -1  = candidato en desacuerdo con la afirmación
//   Cada posición corresponde a una de las 24 preguntas en orden.
//
// Cómo agregar una nueva pregunta:
//   1. Agrégala al final de QUESTIONS.es, QUESTIONS.qu y QUESTIONS.ay
//   2. Actualiza el array "pos" de CADA candidato con un valor nuevo
//   3. Actualiza AXES para cubrir el eje temático correspondiente
//   4. Ajusta el total en el HTML (actualmente dice "24 Preguntas")
// =============================================================

// ------------------------------------------------------------------
// AXES — Nombres de ejes temáticos (uno por cada pregunta)
// Cada pregunta pertenece a un eje; 3 preguntas × 8 ejes = 24 total
// ------------------------------------------------------------------
const AXES = {
  es: [
    '💰 Economía','💰 Economía','💰 Economía',
    '🛡️ Seguridad','🛡️ Seguridad','🛡️ Seguridad',
    '📚 Educación y Salud','📚 Educación y Salud','📚 Educación y Salud',
    '🌿 Medio Ambiente','🌿 Medio Ambiente','🌿 Medio Ambiente',
    '⚖️ Corrupción','⚖️ Corrupción','⚖️ Corrupción',
    '🌎 Política Exterior','🌎 Política Exterior','🌎 Política Exterior',
    '👥 Género y DDHH','👥 Género y DDHH','👥 Género y DDHH',
    '🗺️ Descentralización','🗺️ Descentralización','🗺️ Descentralización'
  ],
  qu: [
    '💰 Qullqi','💰 Qullqi','💰 Qullqi',
    '🛡️ Seguridad','🛡️ Seguridad','🛡️ Seguridad',
    '📚 Yachay','📚 Yachay','📚 Yachay',
    '🌿 Pachamama','🌿 Pachamama','🌿 Pachamama',
    '⚖️ Qhichuwakuy','⚖️ Qhichuwakuy','⚖️ Qhichuwakuy',
    '🌎 Hawa Suyukuna','🌎 Hawa Suyukuna','🌎 Hawa Suyukuna',
    '👥 Warmi-Qari','👥 Warmi-Qari','👥 Warmi-Qari',
    '🗺️ Suyu Kamachiynin','🗺️ Suyu Kamachiynin','🗺️ Suyu Kamachiynin'
  ],
  ay: [
    '💰 Qullqi','💰 Qullqi','💰 Qullqi',
    '🛡️ Seguridada','🛡️ Seguridada','🛡️ Seguridada',
    '📚 Yatiqaña','📚 Yatiqaña','📚 Yatiqaña',
    '🌿 Pachamama','🌿 Pachamama','🌿 Pachamama',
    '⚖️ Laqhachawi','⚖️ Laqhachawi','⚖️ Laqhachawi',
    '🌎 Hawa Suyunaka','🌎 Hawa Suyunaka','🌎 Hawa Suyunaka',
    '👥 Warmi-Chacha','👥 Warmi-Chacha','👥 Warmi-Chacha',
    '🗺️ Suyu Kamana','🗺️ Suyu Kamana','🗺️ Suyu Kamana'
  ]
};

// ------------------------------------------------------------------
// QUESTIONS — Las 24 preguntas del quiz en cada idioma
// El orden de las preguntas debe ser idéntico en los tres idiomas
// ------------------------------------------------------------------
const QUESTIONS = {
  es: [
    // EJE 1: Economía y modelo de desarrollo (preguntas 1-3)
    "El Estado debe controlar directamente sectores estratégicos como minería, petróleo y energía, en lugar de dejarlos en manos privadas.",
    "El gobierno debe reducir impuestos a las empresas para atraer más inversión privada y generar empleo.",
    "El Perú debe priorizar el crecimiento económico aunque eso implique flexibilizar normas ambientales y laborales.",
    // EJE 2: Seguridad ciudadana (preguntas 4-6)
    "El Estado debe aplicar penas más duras y reducir beneficios penitenciarios para combatir la delincuencia.",
    "Las Fuerzas Armadas deben poder intervenir en zonas urbanas para apoyar a la Policía en el control del crimen organizado.",
    "La prevención social (educación, empleo, rehabilitación) es más efectiva que el encarcelamiento para reducir la delincuencia.",
    // EJE 3: Educación y salud (preguntas 7-9)
    "El Estado debe garantizar educación pública gratuita y de calidad en todos los niveles, incluyendo la universidad.",
    "El Estado debe permitir y fomentar la participación privada en la gestión de hospitales y colegios públicos.",
    "El Perú debe avanzar hacia un sistema de salud universal donde todos los ciudadanos tengan la misma cobertura.",
    // EJE 4: Medio ambiente y minería (preguntas 10-12)
    "Los proyectos mineros y de extracción deben poder avanzar aunque comunidades locales se opongan, si generan beneficios económicos.",
    "El Perú debe comprometerse con metas climáticas internacionales aunque eso limite el desarrollo de industrias extractivas.",
    "Las comunidades indígenas deben tener derecho a veto sobre proyectos extractivos en sus territorios.",
    // EJE 5: Corrupción e instituciones (preguntas 13-15)
    "Los funcionarios públicos condenados por corrupción deben quedar inhabilitados de por vida para ejercer cargos públicos.",
    "El Congreso debe tener menos poder para censurar ministros y vacar presidentes, para darle más estabilidad al gobierno.",
    "El Perú necesita una nueva Constitución para reformar el Estado desde sus bases.",
    // EJE 6: Política exterior (preguntas 16-18)
    "El Perú debe endurecer los controles migratorios y deportar a extranjeros que cometan delitos en el país.",
    "El Perú debe romper relaciones diplomáticas con Venezuela y Nicaragua por ser regímenes autoritarios.",
    "El Perú debe priorizar tratados de libre comercio con más países para impulsar las exportaciones.",
    // EJE 7: Derechos humanos y género (preguntas 19-21)
    "El matrimonio civil debe estar disponible para parejas del mismo sexo.",
    "El aborto debe ser legal en casos de violación, no solo cuando la vida de la madre está en riesgo.",
    "El Estado debe implementar cuotas de género obligatorias en cargos públicos y empresas privadas.",
    // EJE 8: Descentralización y regiones (preguntas 22-24)
    "Las regiones deben tener mayor autonomía para decidir cómo gastar sus presupuestos sin depender del gobierno central.",
    "El canon minero y gasífero debe quedarse íntegramente en las regiones donde se extrae el recurso.",
    "El Perú debería evaluar un modelo federal donde cada región tenga su propio gobierno con poderes legislativos."
  ],

  qu: [
    "Estadom directamente controlanan minería, petróleo, energía suyukuna, mana privadokunaman qunankupaq.",
    "Gobiernom empresakunap impuestonta pisiyachinman, inversión privadatam maskhanankupaq.",
    "Perúm wiñayninta munanan, chaypim medio ambiente leykunata fleciblichinman.",
    "Estadom sinchita castiganqa suwakuqkunata, prisiónpi beneficiokunata pisiyachinankupaq.",
    "Fuerzas Armadasmi llaqtakunapi yanapanman policiatam, crimen organizadota atipanankupaq.",
    "Yachay, trabajo, rehabilitaciónmi aswanmi allin kausayta churayta atinman, prisiónmanta aswanpis.",
    "Estadom garantizananmi gratuito allin yachayta tukuy nivelpi, universidadtapis.",
    "Estadom permitinanmi privadokunam hospitalkuna, escuelakunata manejananpaq.",
    "Perúm huk salud universalman rishanman, tukuykunam huk coberturaya kashanankupaq.",
    "Minas extractivas proyectokuna ñannin kananpaq atinanmi, comunidadkuna chiqnichinapipis, beneficio kaqtin.",
    "Perúm comprometisqa kananmi metas climáticaswan, extractivas limitakuspapis.",
    "Comunidades indígenasmi vetoyta atinman territorio proyectos extractivospi.",
    "Corrupciónmanta huchayuq funcionariokunam wiñaytan inhabilitasqa kananku.",
    "Congresomi pisipuni atiyniyuq kananman ministrokunata censuranankupaq.",
    "Perúm musan Constituciónta maskhanman, Estado llimpu reformanankupaq.",
    "Perúm migracionta controlananmi, huchayuq extranjerokuna deportasqa kananankupaq.",
    "Perúm Venezuela, Nicaraguawan diplomacia cortananman, autoritarismo kasqanrayku.",
    "Perúm libre comercio tratadokunata maskhanman, exportacionesta wiñachinanpaq.",
    "Matrimonio civilmi igualitario kananman, mismo sexo parejaskunapaq.",
    "Aborto legalmi kananman violación casokunapaq.",
    "Estadom cuotas de género obligatoriosta churananman cargos públicospi.",
    "Regionesmi mayor autonomíayuq kananman presupuestonta manejanankupaq.",
    "Canon minero y gaserosomi regiones propiospi qhedananman.",
    "Perúm modelo federal evaluananman, sapa región propio gobierno kananpaq."
  ],

  ay: [
    "Estadowa directamente controlarapxañani minería, petróleo, energía suyunaka, janiwa privadunakamaki.",
    "Gobiernoxa empresa impuestonaka pisiyañani, inversión privada maskhawinakampi.",
    "Perúxa wiñañataki munañani, ukhamata medio ambiente leynaka kamachañani.",
    "Estadoxa sinchita castigarapxañani suwanaka, prisión beneficionaka pisiyañataki.",
    "Fuerzas Armadasxa markanakanxa yanapt'añani policiata, crimen organizado atipañataki.",
    "Yatiqaña, trabaju, rehabilitaciónxa aski suma kawsayta churañataki, prisiónmanta askata.",
    "Estadoxa garantizañani gratuito yatiqaña tukuri nivelana, universidadampi.",
    "Estadoxa permitiñani privadunaka hospitalnaka, escuelanaka manejañataki.",
    "Perúxa huk salud universal lurañataki, tukuri salud cobertura ukhamata.",
    "Minas extractivas proyectonaka sartañataki atiñani, comunidadnaka inayankapuna, beneficio kañataki.",
    "Perúxa comprometisqarakiwa metas climáticas, extractivas limitañatakipuni.",
    "Comunidades indígenasxa vetoxa utjañani territoriona extractivos proyectonakataki.",
    "Corrupción huchata katxatata funcionarionaka wiñayata inhabilitasqarakiwa.",
    "Congresoxa pisipuni atiyata katjañani ministros censurarañataki.",
    "Perúxa musan Constituciónxa maskhasqarakiwa, Estado reforma lurañataki.",
    "Perúxa migración kontrolarañani, huchatata extranjem deportarañataki.",
    "Perúxa Venezuela, Nicaragua diplomacia cortarañani, autoritarismo ukhamata.",
    "Perúxa libre comercio tratado maskharañani, exportaciones wiñayañataki.",
    "Matrimonio civilxa igualitario kañani, mismo sexo parejanakataki.",
    "Aborto legalxa kañani violación kasunakataki.",
    "Estadoxa cuotas de género obligatorios churañani cargos públicosnakana.",
    "Regionesxa mayor autonomía katjañani presupuesto manejañataki.",
    "Canon minero y gasíferoxa regiones propionakanxa qhiparakiwa.",
    "Perúxa modelo federal yatxatañani, sapa región propio gobierno ukhamata."
  ]
};

// ------------------------------------------------------------------
// CANDIDATES — Los 36 candidatos presidenciales
//
// Campos de cada candidato:
//   name     → Nombre completo
//   party    → Nombre del partido
//   initials → Iniciales para el avatar de respaldo cuando la foto no carga
//   photo    → URL de la foto oficial del JNE
//   logo     → URL del logo del partido del JNE
//   pos      → Array de 24 posiciones (1=a favor, 0=neutral, -1=en contra)
//              El orden sigue exactamente el orden de QUESTIONS.es
// ------------------------------------------------------------------
const CANDIDATES = [
  { name: "Keiko Fujimori",        party: "Fuerza Popular",               initials: "KF",
    photo: "https://mpesije.jne.gob.pe/apidocs/251cd1c0-acc7-4338-bd8a-439ccb9238d0.jpeg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/1366",
    pos: [-1,1,1,1,1,0,1,-1,0,1,0,-1,1,1,-1,1,1,1,-1,-1,0,0,0,-1] },

  { name: "Rafael López Aliaga",   party: "Renovación Popular",           initials: "RL",
    photo: "https://mpesije.jne.gob.pe/apidocs/b2e00ae2-1e50-4ad3-a103-71fc7e4e8255.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/22",
    pos: [-1,1,0,1,1,-1,1,1,0,1,0,-1,1,0,-1,1,1,1,-1,-1,-1,1,1,-1] },

  { name: "César Acuña",           party: "Alianza para el Progreso",     initials: "CA",
    photo: "https://mpesije.jne.gob.pe/apidocs/d6fe3cac-7061-474b-8551-0aa686a54bad.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/1257",
    pos: [-1,1,1,1,1,0,1,1,1,1,1,0,1,1,-1,1,1,1,-1,-1,0,1,1,-1] },

  { name: "José Williams",         party: "Avanza País",                  initials: "JW",
    photo: "https://mpesije.jne.gob.pe/apidocs/b60c471f-a6bb-4b42-a4b2-02ea38acbb0d.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2173",
    pos: [-1,1,1,1,1,0,1,1,1,1,1,0,1,0,-1,1,1,1,0,0,1,1,1,0] },

  { name: "George Forsyth",        party: "Somos Perú",                   initials: "GF",
    photo: "https://mpesije.jne.gob.pe/apidocs/b1d60238-c797-4cba-936e-f13de6a34cc7.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/14",
    pos: [0,0,-1,1,0,1,1,0,1,0,1,1,1,1,0,1,0,1,0,0,1,1,1,0] },

  { name: "Yonhy Lescano",         party: "Cooperación Popular",          initials: "YL",
    photo: "https://mpesije.jne.gob.pe/apidocs/b9db2b5c-02ff-4265-ae51-db9b1001ad70.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2995",
    pos: [1,-1,-1,1,1,1,1,-1,1,-1,1,1,1,0,0,0,-1,0,0,1,1,1,1,0] },

  { name: "Vladimir Cerrón",       party: "Perú Libre",                   initials: "VC",
    photo: "https://mpesije.jne.gob.pe/apidocs/82ee0ff2-2336-4aba-9590-e576f7564315.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2218",
    pos: [1,-1,-1,0,0,1,1,-1,1,-1,0,1,0,1,1,-1,-1,-1,0,1,1,1,1,0] },

  { name: "Mario Vizcarra",        party: "Perú Primero",                 initials: "MV",
    photo: "https://mpesije.jne.gob.pe/apidocs/ee7a080e-bc81-4c81-9e5e-9fd95ff459ab.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2925",
    pos: [0,0,-1,1,1,1,1,0,1,0,1,0,1,1,0,1,0,1,0,0,1,1,1,0] },

  { name: "José Luna Gálvez",      party: "Podemos Perú",                 initials: "JL",
    photo: "https://mpesije.jne.gob.pe/apidocs/a669a883-bf8a-417c-9296-c14b943c3943.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2731",
    pos: [0,1,0,1,1,0,1,1,1,1,1,0,1,1,0,1,0,1,0,0,1,1,1,-1] },

  { name: "Mesías Guevara",        party: "Partido Morado",               initials: "MG",
    photo: "https://mpesije.jne.gob.pe/apidocs/1b861ca7-3a5e-48b4-9024-08a92371e33b.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2840",
    pos: [-1,0,-1,1,0,1,1,0,1,-1,1,1,1,1,0,0,0,1,1,1,1,1,0,0] },

  { name: "Rafael Belaunde",       party: "Libertad Popular",             initials: "RB",
    photo: "https://mpesije.jne.gob.pe/apidocs/3302e45b-55c8-4979-a60b-2b11097abf1d.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2933",
    pos: [-1,1,0,1,1,0,1,1,1,1,1,0,1,1,-1,1,1,1,1,1,1,1,1,-1] },

  { name: "Pitter Valderrama",     party: "Partido Aprista",              initials: "PV",
    photo: "https://mpesije.jne.gob.pe/apidocs/d72c4b29-e173-42b8-b40d-bdb6d01a526a.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2930",
    pos: [0,0,-1,1,1,1,1,0,1,0,1,0,1,1,1,0,-1,0,0,0,1,1,1,0] },

  { name: "Roberto Sánchez",       party: "Juntos por el Perú",           initials: "RS",
    photo: "https://mpesije.jne.gob.pe/apidocs/bb7c7465-9c6e-44eb-ac7d-e6cc7f872a1a.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/1264",
    pos: [1,-1,-1,1,0,1,1,-1,1,-1,1,1,1,1,1,-1,-1,-1,1,1,1,1,1,0] },

  { name: "Roberto Chiabra",       party: "Unidad Nacional",              initials: "RC",
    photo: "https://mpesije.jne.gob.pe/apidocs/5c703ce9-ba1e-4490-90bf-61006740166f.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/3023",
    pos: [-1,1,1,1,1,-1,1,1,1,1,0,-1,1,1,-1,1,1,1,-1,-1,0,1,1,-1] },

  { name: "Fiorella Molinelli",    party: "Fuerza y Libertad",            initials: "FM",
    photo: "https://mpesije.jne.gob.pe/apidocs/1de656b5-7593-4c60-ab7a-83d618a3d80d.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/3024",
    pos: [-1,1,1,1,1,-1,1,1,1,1,1,-1,1,0,-1,1,1,1,-1,-1,0,1,1,-1] },

  { name: "Carlos Álvarez",        party: "País para Todos",              initials: "CÁ",
    photo: "https://mpesije.jne.gob.pe/apidocs/2bd18177-d665-413d-9694-747d729d3e39.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2956",
    pos: [-1,1,1,1,1,-1,1,1,1,1,1,0,1,1,-1,1,1,1,0,0,1,1,1,0] },

  { name: "Rosario Fernández",     party: "Un Camino Diferente",          initials: "RF",
    photo: "https://mpesije.jne.gob.pe/apidocs/ac0b0a59-ead5-4ef1-8ef8-8967e322d6ca.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2998",
    pos: [-1,0,-1,1,1,0,1,0,1,0,1,0,1,0,0,1,0,0,0,0,0,1,1,1] },

  { name: "Jorge Nieto",           party: "Partido del Buen Gobierno",    initials: "JN",
    photo: "https://mpesije.jne.gob.pe/apidocs/9ae56ed5-3d0f-49ff-8bb9-0390bad71816.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2961",
    pos: [0,0,-1,1,0,1,1,0,1,0,1,1,1,1,0,0,0,0,1,1,1,1,1,0] },

  { name: "F. Diez-Canseco",       party: "Perú Acción",                  initials: "FD",
    photo: "https://mpesije.jne.gob.pe/apidocs/2d1bf7f2-6e88-4ea9-8ed2-975c1ae5fb92.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2932",
    pos: [-1,1,1,1,1,-1,1,1,1,1,0,-1,1,1,-1,1,1,1,-1,-1,0,1,1,-1] },

  { name: "Napoleón Becerra",      party: "PTE-Perú",                     initials: "NB",
    photo: "https://mpesije.jne.gob.pe/apidocs/bab206cb-b2d5-41ec-bde8-ef8cf3e0a2df.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2939",
    pos: [1,-1,-1,1,0,1,1,-1,1,-1,0,1,1,0,1,0,-1,0,0,0,0,1,1,0] },

  { name: "Wolfgang Grozo",        party: "Integridad Democrática",       initials: "WG",
    photo: "https://mpesije.jne.gob.pe/apidocs/064360d1-ce49-4abe-939c-f4de8b0130a2.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2985",
    pos: [-1,1,0,1,1,1,1,1,1,0,1,0,1,1,-1,1,0,0,-1,1,1,1,1,-1] },

  { name: "Antonio Ortiz",         party: "Salvemos al Perú",             initials: "AO",
    photo: "https://mpesije.jne.gob.pe/apidocs/8e6b9124-2883-4143-8768-105f2ce780eb.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2927",
    pos: [-1,1,0,1,0,0,1,1,1,1,1,0,1,1,-1,1,1,1,-1,-1,0,1,1,-1] },

  { name: "Paul Jaimes",           party: "Progresemos",                  initials: "PJ",
    photo: "https://mpesije.jne.gob.pe/apidocs/929e1a63-335d-4f3a-ba26-f3c7ff136213.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2967",
    pos: [0,0,-1,1,1,1,1,0,1,0,1,1,1,1,0,1,0,0,0,0,1,1,1,0] },

  { name: "Alfonso López Chau",    party: "Ahora Nación",                 initials: "AL",
    photo: "https://mpesije.jne.gob.pe/apidocs/ddfa74eb-cae3-401c-a34c-35543ae83c57.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2980",
    pos: [0,0,0,1,0,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,1,1,0] },

  { name: "Ronald Atencio",        party: "Alianza Venceremos",           initials: "RA",
    photo: "https://mpesije.jne.gob.pe/apidocs/bac0288d-3b21-45ac-8849-39f9177fb020.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/3025",
    pos: [1,-1,-1,1,0,1,1,-1,1,-1,1,1,1,1,1,-1,-1,0,0,0,1,1,1,0] },

  { name: "Ricardo Belmont",       party: "Partido Cívico Obras",         initials: "RBe",
    photo: "https://mpesije.jne.gob.pe/apidocs/78647f15-d5d1-4ed6-8ac6-d599e83eeea3.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2941",
    pos: [-1,1,0,1,1,0,1,1,1,1,0,0,1,1,-1,1,1,1,0,0,0,1,1,-1] },

  { name: "Charlie Carrasco",      party: "Demócrata Unido",              initials: "CC",
    photo: "https://mpesije.jne.gob.pe/apidocs/12fa17db-f28f-4330-9123-88549539b538.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2867",
    pos: [0,0,0,1,0,0,1,0,1,0,1,0,1,1,0,0,0,0,0,0,0,1,1,0] },

  { name: "Alex González",         party: "Demócrata Verde",              initials: "AG",
    photo: "https://mpesije.jne.gob.pe/apidocs/c0ae56bf-21c1-4810-890a-b25c8465bdd9.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2895",
    pos: [-1,0,-1,1,0,1,1,0,1,-1,1,1,1,1,0,0,0,1,1,1,1,1,1,0] },

  { name: "Armando Masse",         party: "Democrático Federal",          initials: "AM",
    photo: "https://mpesije.jne.gob.pe/apidocs/cb1adeb7-7d2f-430c-ae87-519137d8edfa.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2986",
    pos: [0,0,0,1,0,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,1,1,1] },

  { name: "Fernando Olivera",      party: "Frente de la Esperanza 2021",  initials: "FO",
    photo: "https://mpesije.jne.gob.pe/apidocs/3e2312e1-af79-4954-abfa-a36669c1a9e9.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2857",
    pos: [1,-1,-1,1,1,1,1,-1,1,-1,1,1,1,0,1,-1,-1,0,0,0,1,1,1,0] },

  { name: "Carlos Espá",           party: "Partido SíCreo",               initials: "CE",
    photo: "https://mpesije.jne.gob.pe/apidocs/85935f77-6c46-4eab-8c7e-2494ffbcece0.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2935",
    pos: [-1,1,0,1,1,0,1,1,1,1,0,0,1,1,-1,1,1,1,-1,-1,0,1,1,-1] },

  { name: "Carlos Jaico",          party: "Perú Moderno",                 initials: "CJ",
    photo: "https://mpesije.jne.gob.pe/apidocs/7d91e14f-4417-4d61-89ba-3e686dafaa95.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2924",
    pos: [-1,1,0,1,1,0,1,0,1,0,1,0,1,1,-1,1,0,0,0,0,1,1,1,0] },

  { name: "Marisol Pérez Tello",   party: "Primero la Gente",             initials: "MP",
    photo: "https://mpesije.jne.gob.pe/apidocs/073703ca-c427-44f0-94b1-a782223a5e10.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2931",
    pos: [0,0,-1,1,0,1,1,0,1,0,1,1,1,1,0,1,0,1,0,0,1,1,1,0] },

  { name: "Álvaro Paz de la Barra",party: "Fe en el Perú",                initials: "AP",
    photo: "https://votoinformado.jne.gob.pe/assets/images/candidatos/ALVARO%20PAZ%20DE%20LA%20BARRA.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2898",
    pos: [-1,1,0,1,1,-1,1,1,1,1,0,-1,1,0,-1,1,1,1,-1,-1,0,1,1,-1] },

  { name: "Herbert Caller",        party: "Partido Patriótico del Perú",  initials: "HC",
    photo: "https://mpesije.jne.gob.pe/apidocs/6ad6c5ff-0411-4ddd-9cf7-b0623f373fcf.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2869",
    pos: [-1,1,0,1,1,0,1,1,1,1,0,0,1,1,-1,1,1,1,-1,-1,0,1,1,-1] },

  { name: "Walter Chirinos",       party: "PRIN",                         initials: "WC",
    photo: "https://mpesije.jne.gob.pe/apidocs/a2d0f631-fe47-4c41-92ba-7ed9f4095520.jpg",
    logo:  "https://sroppublico.jne.gob.pe/Consulta/Simbolo/GetSimbolo/2921",
    pos: [0,0,0,1,1,0,1,0,1,0,0,0,1,0,0,1,0,0,0,0,0,1,1,0] }
];
