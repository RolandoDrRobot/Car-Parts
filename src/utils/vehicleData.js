// ── Marcas más comunes por país (curado a mano — no existe API gratuita de "market share") ──
export const BRANDS_BY_COUNTRY = {
  CR: [
    'Toyota', 'Hyundai', 'Kia', 'Suzuki', 'Nissan', 'Chevrolet', 'Honda',
    'Mazda', 'Mitsubishi', 'Ford', 'Volkswagen', 'BYD', 'MG', 'Isuzu',
    'Subaru', 'Jeep', 'BMW', 'Mercedes-Benz', 'Great Wall', 'JAC',
  ],
  MX: [
    'Nissan', 'Chevrolet', 'Volkswagen', 'Kia', 'Toyota', 'Ford', 'Honda',
    'Mazda', 'Hyundai', 'Chrysler', 'RAM', 'GMC', 'Jeep', 'Suzuki',
    'Mitsubishi', 'BMW', 'Mercedes-Benz', 'Audi', 'Renault', 'MG',
  ],
  CO: [
    'Chevrolet', 'Renault', 'Kia', 'Nissan', 'Mazda', 'Toyota', 'Ford',
    'Suzuki', 'Hyundai', 'Volkswagen', 'Honda', 'Mitsubishi', 'BYD', 'JAC',
    'Great Wall', 'Peugeot', 'Chery', 'Subaru', 'BMW', 'Mercedes-Benz',
  ],
  AR: [
    'Volkswagen', 'Chevrolet', 'Ford', 'Toyota', 'Fiat', 'Renault',
    'Peugeot', 'Citroën', 'Honda', 'Nissan', 'Jeep', 'Chery', 'Kia',
    'Hyundai', 'Suzuki', 'Mitsubishi', 'RAM', 'BMW', 'Mercedes-Benz', 'Audi',
  ],
  CL: [
    'Chevrolet', 'Toyota', 'Hyundai', 'Kia', 'Suzuki', 'Nissan', 'Mazda',
    'Peugeot', 'Ford', 'Volkswagen', 'Great Wall', 'MG', 'Chery', 'JAC',
    'BYD', 'Subaru', 'Mitsubishi', 'RAM', 'BMW', 'Mercedes-Benz',
  ],
  US: [
    'Ford', 'Chevrolet', 'Toyota', 'Honda', 'RAM', 'GMC', 'Nissan', 'Jeep',
    'Hyundai', 'Kia', 'Subaru', 'Volkswagen', 'Tesla', 'Mazda',
    'Chrysler', 'Dodge', 'BMW', 'Mercedes-Benz', 'Audi', 'Lexus',
  ],
};

// ── Opciones genéricas de motor — NO hay API gratuita de specs por modelo, es curado ──
export const ENGINE_OPTIONS = [
  '1.0L', '1.2L', '1.3L', '1.4L', '1.5L', '1.6L', '1.8L',
  '2.0L', '2.0L Turbo', '2.4L', '2.5L', '3.0L', '3.5L V6',
  'V6', 'V8', 'Diésel', 'Híbrido', 'Eléctrico',
];

// ── Modelos por marca — API gratuita NHTSA vPIC (sin key, CORS abierto) ──
//
// vPIC es una base de datos de EE.UU. — probado a mano con curl marca por
// marca: para fabricantes con presencia real en el mercado de EE.UU. los
// datos son limpios y completos (Toyota, Chevrolet, Kia, Hyundai, BMW...).
// Para marcas sin presencia relevante en EE.UU. la respuesta no solo viene
// vacía o corta — a veces "matchea" una empresa completamente distinta que
// comparte el nombre (ej. "JAC" devuelve fabricantes de remolques, "BYD"
// devuelve buses/camiones, "MG" devuelve una empresa de trailers) o modelos
// descontinuados hace 40 años (Renault, Peugeot). Por eso NO alcanza con
// mirar cuántos resultados hay — se usa una lista blanca de marcas
// verificadas; todo lo demás cae directo a texto libre sin llamar la API.
const NHTSA_MODELS_URL = 'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake';

const RELIABLE_BRANDS = new Set([
  'toyota', 'honda', 'ford', 'chevrolet', 'nissan', 'hyundai', 'kia',
  'mazda', 'subaru', 'volkswagen', 'bmw', 'mercedes-benz', 'audi', 'jeep',
  'ram', 'gmc', 'tesla', 'volvo', 'mitsubishi', 'isuzu', 'suzuki', 'mini',
  'land rover', 'lexus', 'chrysler', 'dodge', 'fiat', 'alfa romeo',
  'acura', 'infiniti', 'buick', 'cadillac', 'lincoln', 'porsche', 'jaguar',
]);

const modelsCache = new Map();

export const fetchModelsForBrand = async (brand) => {
  if (!brand) return [];
  const key = brand.trim().toLowerCase();
  if (!RELIABLE_BRANDS.has(key)) return [];
  if (modelsCache.has(key)) return modelsCache.get(key);

  try {
    const res = await fetch(`${NHTSA_MODELS_URL}/${encodeURIComponent(key)}?format=json`);
    if (!res.ok) throw new Error('NHTSA request failed');
    const data = await res.json();
    const names = [...new Set((data.Results || []).map(r => r.Model_Name).filter(Boolean))]
      .sort((a, b) => a.localeCompare(b));
    modelsCache.set(key, names);
    return names;
  } catch {
    modelsCache.set(key, []);
    return [];
  }
};
