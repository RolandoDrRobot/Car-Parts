const SOURCES = {
  CR: [
    { name: 'MercadoLibre CR', url: q => `https://www.mercadolibre.co.cr/buscar?as_word=${encodeURIComponent(q)}` },
    { name: 'Google Shopping', url: q => `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(q)}` },
  ],
  MX: [
    { name: 'MercadoLibre MX', url: q => `https://www.mercadolibre.com.mx/buscar?as_word=${encodeURIComponent(q)}` },
    { name: 'AutoZone MX', url: q => `https://www.autozone.com.mx/buscar?q=${encodeURIComponent(q)}` },
    { name: 'Google Shopping', url: q => `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(q)}` },
  ],
  CO: [
    { name: 'MercadoLibre CO', url: q => `https://www.mercadolibre.com.co/buscar?as_word=${encodeURIComponent(q)}` },
    { name: 'Google Shopping', url: q => `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(q)}` },
  ],
  AR: [
    { name: 'MercadoLibre AR', url: q => `https://www.mercadolibre.com.ar/buscar?as_word=${encodeURIComponent(q)}` },
    { name: 'Google Shopping', url: q => `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(q)}` },
  ],
  CL: [
    { name: 'MercadoLibre CL', url: q => `https://www.mercadolibre.cl/buscar?as_word=${encodeURIComponent(q)}` },
    { name: 'Google Shopping', url: q => `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(q)}` },
  ],
  US: [
    { name: 'Amazon', url: q => `https://www.amazon.com/s?k=${encodeURIComponent(q)}` },
    { name: 'AutoZone', url: q => `https://www.autozone.com/searchresult?searchText=${encodeURIComponent(q)}` },
    { name: 'RockAuto', url: q => `https://www.rockauto.com/en/partsearch/?query=${encodeURIComponent(q)}` },
    { name: 'Google Shopping', url: q => `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(q)}` },
  ],
};

export const getSearchLinks = (query, country) => {
  const sources = SOURCES[country] || SOURCES.CR;
  return sources.map(s => ({ name: s.name, url: s.url(query) }));
};
