const ANTHROPIC_API_KEY = process.env.REACT_APP_AI;
const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
  });

const getMediaType = (file) => {
  const type = file.type;
  if (['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(type)) return type;
  return 'image/jpeg';
};

export const analyzeCarPart = async (imageFile, vehicle = null) => {
  if (!ANTHROPIC_API_KEY) throw new Error('API key not configured (REACT_APP_AI)');

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

  const res = await fetch(ANTHROPIC_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-opus-4-5',
      max_tokens: 800,
      messages: [{
        role: 'user',
        content: [
          {
            type: 'image',
            source: {
              type: 'base64',
              media_type: mediaType,
              data: base64Image,
            },
          },
          { type: 'text', text: prompt },
        ],
      }],
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`Claude API ${res.status}: ${err?.error?.message || 'unknown error'}`);
  }

  const data = await res.json();
  const text = data.content[0].text.trim();

  const jsonStr = text.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();
  return JSON.parse(jsonStr);
};
