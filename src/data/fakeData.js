// ── Vehicle photo (Wikipedia) ─────────────────────────────────────────────────
export const fetchVehiclePhoto = async (brand, model) => {
  const attempts = [`${brand} ${model}`, brand];
  for (const title of attempts) {
    try {
      const url = 'https://en.wikipedia.org/w/api.php?' + new URLSearchParams({
        action: 'query', titles: title, prop: 'pageimages',
        format: 'json', pithumbsize: '800', origin: '*',
      });
      const res = await fetch(url);
      if (!res.ok) continue;
      const data = await res.json();
      const page = Object.values(data.query?.pages || {})[0];
      const src = page?.thumbnail?.source;
      if (src && !src.endsWith('.svg') && !src.endsWith('.SVG')) return src;
    } catch { /* silent — photo is optional */ }
  }
  return null;
};

const GEMINI_API_KEY = process.env.REACT_APP_AI;
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
const TIMEOUT_MS = 30000;

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
  });

const getMediaType = (file) => {
  const t = file.type;
  return ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(t) ? t : 'image/jpeg';
};

const vehicleCtx = (vehicle) => {
  if (!vehicle) return '';
  const parts = [`${vehicle.brand} ${vehicle.model} ${vehicle.year}`];
  if (vehicle.engine)       parts.push(`motor ${vehicle.engine}`);
  if (vehicle.fuel)         parts.push(vehicle.fuel);
  if (vehicle.transmission) parts.push(`transmisión ${vehicle.transmission}`);
  return `El vehículo es un ${parts.join(', ')}.`;
};

const gemini = async (body) => {
  if (!GEMINI_API_KEY) throw new Error('API key not configured (REACT_APP_AI)');
  const controller = new AbortController();
  const timeoutId  = setTimeout(() => controller.abort(), TIMEOUT_MS);
  let res;
  try {
    res = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({ ...body, generationConfig: { temperature: 0.1, maxOutputTokens: 1000 } }),
    });
  } catch (err) {
    if (err.name === 'AbortError') throw new Error('La solicitud tardó demasiado. Intenta de nuevo.');
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`Error al analizar (${res.status}): ${err?.error?.message || 'intenta de nuevo'}`);
  }
  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  if (!text) throw new Error('La IA no devolvió respuesta. Intenta con otra imagen.');
  const jsonStr = text.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();
  try { return JSON.parse(jsonStr); }
  catch { throw new Error('No se pudo interpretar la respuesta. Intenta de nuevo.'); }
};

// ── Scan de pieza ─────────────────────────────────────────────────────────────
export const analyzeCarPart = async (imageFile, vehicle = null) => {
  const base64Image = await toBase64(imageFile);
  const mediaType   = getMediaType(imageFile);
  const ctx         = vehicleCtx(vehicle);

  const prompt = `Eres un experto en mecánica automotriz. Analiza la imagen de esta pieza de vehículo.
${ctx}

Identifica la pieza visible. Si la imagen NO muestra una pieza de vehículo, indícalo.

Responde ÚNICAMENTE con JSON válido, sin bloques markdown:

{
  "isCarPart": true,
  "type": "scan",
  "partName": "nombre de la pieza en español",
  "partNameEn": "part name in English",
  "partCategory": "frenos|motor|suspensión|eléctrico|filtros|carrocería|enfriamiento|escape|transmisión|otro",
  "condition": "descripción breve del estado",
  "conditionSeverity": "ok|warning|critical",
  "description": "descripción detallada de lo que se ve y su estado",
  "recommendedAction": "acción recomendada",
  "searchQuery": "consulta de búsqueda optimizada en español para encontrar esta pieza${vehicle ? ` para ${vehicle.brand} ${vehicle.model} ${vehicle.year}` : ''}"
}

Si NO es una pieza de vehículo:
{ "isCarPart": false, "message": "descripción de lo que muestra la imagen" }`;

  return gemini({
    contents: [{ parts: [
      { inline_data: { mime_type: mediaType, data: base64Image } },
      { text: prompt },
    ]}],
  });
};

// ── Diagnóstico por síntomas ──────────────────────────────────────────────────
export const analyzeSymptomsText = async (symptomsText, vehicle = null) => {
  const ctx = vehicleCtx(vehicle);

  const prompt = `Eres un mecánico automotriz experto con 20 años de experiencia. Un usuario describe un problema con su vehículo.
${ctx}

Síntomas: "${symptomsText}"

Analiza los síntomas y responde ÚNICAMENTE con JSON válido, sin bloques markdown:

{
  "isCarPart": true,
  "type": "symptoms",
  "partName": "título del diagnóstico (ej: Ruido metálico al frenar)",
  "partCategory": "frenos|motor|suspensión|eléctrico|filtros|carrocería|enfriamiento|escape|transmisión|otro",
  "conditionSeverity": "ok|warning|critical",
  "description": "diagnóstico detallado explicando los síntomas y qué los causa",
  "recommendedAction": "acción inmediata recomendada",
  "searchQuery": "repuesto o pieza más probable a buscar${vehicle ? ` ${vehicle.brand} ${vehicle.model} ${vehicle.year}` : ''}",
  "causes": ["causa más probable", "segunda causa posible", "tercera causa posible"],
  "canDrive": true,
  "urgencyNote": "una línea: qué tan urgente es atenderlo"
}`;

  return gemini({ contents: [{ parts: [{ text: prompt }] }] });
};

// ── Lector de luces de tablero ────────────────────────────────────────────────
export const analyzeWarningLight = async (imageFile, vehicle = null) => {
  const base64Image = await toBase64(imageFile);
  const mediaType   = getMediaType(imageFile);
  const ctx         = vehicleCtx(vehicle);

  const prompt = `Eres un experto en diagnóstico automotriz. Analiza la foto del tablero de instrumentos.
${ctx}

Identifica la luz de advertencia encendida y explica qué significa.

Responde ÚNICAMENTE con JSON válido, sin bloques markdown:

{
  "isCarPart": true,
  "type": "lights",
  "partName": "nombre de la luz en español (ej: Luz de motor - Check Engine)",
  "lightName": "nombre técnico oficial",
  "partCategory": "motor|eléctrico|frenos|otro",
  "conditionSeverity": "ok|warning|critical",
  "description": "qué significa esta luz, por qué se enciende y qué sistema indica",
  "recommendedAction": "acción recomendada inmediata",
  "searchQuery": "componente relacionado a buscar${vehicle ? ` ${vehicle.brand} ${vehicle.model} ${vehicle.year}` : ''}",
  "causes": ["causa más probable", "segunda causa posible", "tercera causa posible"],
  "canDrive": true,
  "urgencyNote": "una línea indicando la urgencia"
}

Si no se ve ninguna luz encendida claramente:
{ "isCarPart": false, "message": "No se detectó ninguna luz de advertencia encendida en la imagen." }`;

  return gemini({
    contents: [{ parts: [
      { inline_data: { mime_type: mediaType, data: base64Image } },
      { text: prompt },
    ]}],
  });
};
