const GEMINI_API_KEY = process.env.REACT_APP_AI;
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

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

export const analyzeCarPart = async (imageFile, vehicle = null) => {
  if (!GEMINI_API_KEY) throw new Error('API key not configured (REACT_APP_AI)');

  const base64Image = await toBase64(imageFile);
  const mediaType = getMediaType(imageFile);

  const vehicleContext = vehicle
    ? `El vehículo es un ${vehicle.brand} ${vehicle.model} ${vehicle.year}.`
    : '';

  const prompt = `Eres un experto en mecánica automotriz. Analiza la imagen de esta pieza de vehículo.
${vehicleContext}

Identifica la pieza visible. Si la imagen NO muestra una pieza de vehículo, indícalo.

Responde ÚNICAMENTE con JSON válido, sin bloques markdown, sin explicaciones adicionales:

{
  "isCarPart": true,
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
{ "isCarPart": false, "message": "descripción de lo que muestra la imagen en su lugar" }`;

  const res = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [
          { inline_data: { mime_type: mediaType, data: base64Image } },
          { text: prompt },
        ],
      }],
      generationConfig: { temperature: 0.1, maxOutputTokens: 800 },
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`Gemini API ${res.status}: ${err?.error?.message || 'unknown error'}`);
  }

  const data = await res.json();
  const text = data.candidates[0].content.parts[0].text.trim();
  const jsonStr = text.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();
  return JSON.parse(jsonStr);
};
