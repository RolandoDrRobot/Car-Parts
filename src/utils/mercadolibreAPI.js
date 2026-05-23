const ML_SITES = {
  CR: 'MCR',
  MX: 'MLM',
  CO: 'MCO',
  AR: 'MLA',
  CL: 'MLC',
  US: null,
};

export const searchParts = async (query, country) => {
  const siteId = ML_SITES[country];
  if (!siteId) return [];

  const res = await fetch(
    `https://api.mercadolibre.com/sites/${siteId}/search?q=${encodeURIComponent(query)}&limit=8`
  );
  if (!res.ok) throw new Error(`ML API ${res.status}`);
  const data = await res.json();

  return (data.results || []).map(item => ({
    id: item.id,
    title: item.title,
    price: item.price,
    currency: item.currency_id,
    condition: item.condition,
    thumbnail: item.thumbnail,
    url: item.permalink,
    freeShipping: item.shipping?.free_shipping || false,
    seller: item.seller?.nickname || '',
  }));
};
