// MercadoLibre uses listado.{domain}/{query-with-dashes} as its search URL
const ml = (domain, q) =>
  `https://listado.${domain}/${q.trim().replace(/\s+/g, '-')}`;

const gShopping = (q, extra = '') =>
  `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(q + (extra ? ' ' + extra : ''))}`;

const SOURCES = {
  CR: [
    { name: 'MercadoLibre CR',  url: q => ml('mercadolibre.co.cr', q) },
    { name: 'Google Shopping',  url: q => gShopping(q, 'Costa Rica') },
    { name: 'Google',           url: q => `https://www.google.com/search?q=${encodeURIComponent(q + ' repuesto Costa Rica')}` },
  ],
  MX: [
    { name: 'MercadoLibre MX',  url: q => ml('mercadolibre.com.mx', q) },
    { name: 'Amazon MX',        url: q => `https://www.amazon.com.mx/s?k=${encodeURIComponent(q)}` },
    { name: 'AutoZone MX',      url: q => `https://www.autozone.com.mx/refaccionessearch?searchText=${encodeURIComponent(q)}` },
    { name: 'Google Shopping',  url: q => gShopping(q, 'Mexico') },
  ],
  CO: [
    { name: 'MercadoLibre CO',  url: q => ml('mercadolibre.com.co', q) },
    { name: 'Linio CO',         url: q => `https://www.linio.com.co/search#q=${encodeURIComponent(q)}` },
    { name: 'Google Shopping',  url: q => gShopping(q, 'Colombia') },
    { name: 'Google',           url: q => `https://www.google.com/search?q=${encodeURIComponent(q + ' repuesto Colombia')}` },
  ],
  AR: [
    { name: 'MercadoLibre AR',  url: q => ml('mercadolibre.com.ar', q) },
    { name: 'Google Shopping',  url: q => gShopping(q, 'Argentina') },
    { name: 'Google',           url: q => `https://www.google.com/search?q=${encodeURIComponent(q + ' repuesto Argentina')}` },
  ],
  CL: [
    { name: 'MercadoLibre CL',  url: q => ml('mercadolibre.cl', q) },
    { name: 'Falabella CL',     url: q => `https://www.falabella.com.cl/falabella-cl/search?Ntt=${encodeURIComponent(q)}` },
    { name: 'Google Shopping',  url: q => gShopping(q, 'Chile') },
  ],
  US: [
    { name: 'Amazon',           url: q => `https://www.amazon.com/s?k=${encodeURIComponent(q)}` },
    { name: 'AutoZone',         url: q => `https://www.autozone.com/searchresult?searchText=${encodeURIComponent(q)}` },
    { name: 'eBay Motors',      url: q => `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(q)}&_sacat=6000` },
    { name: "O'Reilly Auto",    url: q => `https://www.oreillyauto.com/searchresult?q=${encodeURIComponent(q)}` },
    { name: 'Google Shopping',  url: q => gShopping(q) },
  ],
};

export const getSearchLinks = (query, country) => {
  const sources = SOURCES[country] || SOURCES.CR;
  return sources.map(s => ({ name: s.name, url: s.url(query) }));
};
