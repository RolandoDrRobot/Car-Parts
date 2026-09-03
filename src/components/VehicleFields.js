import React, { useState, useEffect } from 'react';
import { BRANDS_BY_COUNTRY, ENGINE_OPTIONS, fetchModelsForBrand } from '../utils/vehicleData';

const OTHER = '__other__';
const inputStyle = { padding: '10px 12px', fontSize: '1rem' };

const FieldLabel = ({ children }) => (
  <label style={{
    display: 'block', color: '#6b7280', fontSize: '0.7rem', fontWeight: 700,
    textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px',
    fontFamily: 'Saira Condensed, sans-serif',
  }}>
    {children}
  </label>
);

const BackToList = ({ onClick }) => (
  <button type="button" onClick={onClick}
    style={{
      background: 'none', border: 'none', color: '#ef4444', fontSize: '0.72rem',
      padding: '4px 0 0', cursor: 'pointer', fontFamily: 'Saira Condensed, sans-serif', fontWeight: 600,
    }}>
    Elegir de la lista
  </button>
);

// ── Marca — dropdown curado por país + "Otra marca" con fallback a texto libre ──
export const BrandSelect = ({ label, country, value, onChange }) => {
  const [custom, setCustom] = useState(false);
  const brands = BRANDS_BY_COUNTRY[country] || [];

  if (custom) {
    return (
      <div>
        <FieldLabel>{label}</FieldLabel>
        <input className="input" placeholder="Nombre de la marca" value={value} autoFocus
          onChange={e => onChange(e.target.value)} style={inputStyle} />
        <BackToList onClick={() => { setCustom(false); onChange(''); }} />
      </div>
    );
  }

  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <select className="input" value={value} style={inputStyle}
        onChange={e => {
          if (e.target.value === OTHER) { setCustom(true); onChange(''); }
          else onChange(e.target.value);
        }}>
        <option value="">Selecciona</option>
        {brands.map(b => <option key={b} value={b}>{b}</option>)}
        <option value={OTHER}>Otra marca...</option>
      </select>
    </div>
  );
};

// ── Modelo — se llena en vivo desde NHTSA vPIC según la marca; cae a texto libre si no hay datos ──
export const ModelSelect = ({ label, brand, value, onChange }) => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [custom, setCustom] = useState(false);

  useEffect(() => {
    setCustom(false);
    setModels([]);
    if (!brand) return;
    let cancelled = false;
    setLoading(true);
    fetchModelsForBrand(brand).then(list => {
      if (cancelled) return;
      setModels(list);
      setLoading(false);
      if (list.length === 0) setCustom(true);
    });
    return () => { cancelled = true; };
  }, [brand]);

  if (!brand) {
    return (
      <div>
        <FieldLabel>{label}</FieldLabel>
        <select className="input" disabled value="" style={{ ...inputStyle, opacity: 0.5 }}>
          <option value="">Selecciona marca primero</option>
        </select>
      </div>
    );
  }

  if (custom) {
    return (
      <div>
        <FieldLabel>{label}</FieldLabel>
        <input className="input" placeholder="Nombre del modelo" value={value}
          onChange={e => onChange(e.target.value)} style={inputStyle} />
        {models.length > 0 && <BackToList onClick={() => { setCustom(false); onChange(''); }} />}
      </div>
    );
  }

  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <select className="input" value={value} disabled={loading} style={inputStyle}
        onChange={e => {
          if (e.target.value === OTHER) { setCustom(true); onChange(''); }
          else onChange(e.target.value);
        }}>
        <option value="">{loading ? 'Cargando modelos...' : 'Selecciona'}</option>
        {models.map(m => <option key={m} value={m}>{m}</option>)}
        <option value={OTHER}>Otro modelo...</option>
      </select>
    </div>
  );
};

// ── Motor — opciones genéricas curadas (no hay API gratuita de specs por modelo) ──
export const EngineSelect = ({ label, value, onChange }) => {
  const [custom, setCustom] = useState(false);

  if (custom) {
    return (
      <div>
        <FieldLabel>{label}</FieldLabel>
        <input className="input" placeholder="ej. 1.5L Turbo" value={value} autoFocus
          onChange={e => onChange(e.target.value)} style={inputStyle} />
        <BackToList onClick={() => { setCustom(false); onChange(''); }} />
      </div>
    );
  }

  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <select className="input" value={value} style={inputStyle}
        onChange={e => {
          if (e.target.value === OTHER) { setCustom(true); onChange(''); }
          else onChange(e.target.value);
        }}>
        <option value="">Selecciona (opcional)</option>
        {ENGINE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
        <option value={OTHER}>Otro...</option>
      </select>
    </div>
  );
};
