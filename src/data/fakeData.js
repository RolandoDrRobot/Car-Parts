const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY || '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';
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
  });

export const analyzeCarPart = async (imageFile, vehicle = null) => {
  const base64Image = await toBase64(imageFile);

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

  const res = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [{
        role: 'user',
        content: [
          { type: 'text', text: prompt },
          { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${base64Image}` } },
        ],
      }],
      max_tokens: 800,
      temperature: 0.1,
    }),
  });

  if (!res.ok) throw new Error(`OpenAI API ${res.status}`);

  const data = await res.json();
  const text = data.choices[0].message.content.trim();

  // Strip markdown code fences if present
  const jsonStr = text.replace(/^```json\n?/, '').replace(/\n?```$/, '');
  return JSON.parse(jsonStr);
};
