import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSettings } from '../contexts/SettingsContext';
import { useHistory } from '../contexts/HistoryContext';
import { searchParts } from '../utils/mercadolibreAPI';
import { getSearchLinks } from '../utils/searchLinks';

const SEVERITY = {
  ok:       { label: 'Buen estado', color: '#22c55e', bg: 'rgba(34,197,94,0.12)'  },
  warning:  { label: 'Revisar',     color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
  critical: { label: 'Crítico',     color: '#ef4444', bg: 'rgba(239,68,68,0.12)'  },
};

const CURRENCY_SYMBOLS = {
  CRC: '₡', MXN: '$', COP: '$', ARS: '$', CLP: '$', USD: '$',
};

const formatPrice = (price, currency) =>
  `${CURRENCY_SYMBOLS[currency] || '$'}${price?.toLocaleString('es-ES') ?? '—'}`;

const AnalysisReportScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { result, vehicle } = location.state || {};
  const { settings } = useSettings();
  const { addScan } = useHistory();

  const [listings, setListings] = useState([]);
  const [mlLoading, setMlLoading] = useState(true);
  const savedRef = useRef(false);

  // Save to history once on mount
  useEffect(() => {
    if (result?.isCarPart && !savedRef.current) {
      savedRef.current = true;
      addScan({
        partName: result.partName,
        partCategory: result.partCategory,
        conditionSeverity: result.conditionSeverity,
        vehicle: vehicle || null,
        searchQuery: result.searchQuery,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch ML listings
  useEffect(() => {
    if (!result?.isCarPart || !result?.searchQuery) {
      setMlLoading(false);
      return;
    }
    searchParts(result.searchQuery, settings.country)
      .then(items => setListings(items))
      .catch(() => setListings([]))
      .finally(() => setMlLoading(false));
  }, [result?.isCarPart, result?.searchQuery, settings.country]);

  // ── No state ──
  if (!result) {
    return (
      <div className="container" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p style={{ color: '#a0aec0', fontSize: '1.2rem', marginBottom: '16px' }}>Sin datos de análisis.</p>
          <button className="btn" style={{ marginTop: 0 }} onClick={() => navigate('/')}>Volver al Inicio</button>
        </div>
      </div>
    );
  }

  // ── Not a car part ──
  if (!result.isCarPart) {
    return (
      <div className="container" style={{ justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', maxWidth: '400px' }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '12px' }}>⚠️</div>
          <h2 style={{ color: '#f59e0b', fontFamily: 'Saira Condensed, sans-serif', fontSize: '1.8rem', marginBottom: '10px' }}>
            Imagen no válida
          </h2>
          <p style={{ color: '#a0aec0', lineHeight: 1.6, marginBottom: '20px' }}>
            {result.message || 'La imagen no parece ser de una pieza de vehículo.'}
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button className="btn" style={{ marginTop: 0 }}
              onClick={() => navigate('/scan', { state: { vehicle } })}>
              Intentar Nuevamente
            </button>
            <button className="btn btn-secondary" style={{ marginTop: 0 }}
              onClick={() => navigate('/')}>
              Inicio
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const severity = SEVERITY[result.conditionSeverity] || SEVERITY.warning;
  const searchLinks = getSearchLinks(result.searchQuery, settings.country);

  return (
    <div className="container">

      {/* ── HEADER: Part ID ── */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)', flexShrink: 0 }}>
        <motion.button
          onClick={() => navigate('/scan', { state: { vehicle } })}
          whileHover={{ x: -3 }}
          style={{ background: 'none', border: 'none', color: '#a0aec0', cursor: 'pointer', fontSize: '0.9rem', padding: 0, display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Saira Condensed, sans-serif', marginBottom: '10px' }}
        >
          ← Otro escaneo
        </motion.button>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
          <h2 style={{ color: 'white', fontFamily: 'Saira Condensed, sans-serif', fontSize: '1.8rem', fontWeight: 700, margin: 0, flex: 1, lineHeight: 1.2 }}>
            {result.partName}
          </h2>
          <span style={{
            background: severity.bg, color: severity.color,
            border: `1px solid ${severity.color}`,
            borderRadius: '20px', padding: '4px 10px',
            fontSize: '0.8rem', fontWeight: 700,
            fontFamily: 'Saira Condensed, sans-serif', flexShrink: 0,
          }}>
            {severity.label}
          </span>
        </div>

        {vehicle && (
          <p style={{ color: '#4a5568', fontSize: '0.8rem', margin: '6px 0 0' }}>
            🚗 {vehicle.brand} {vehicle.model} {vehicle.year}
          </p>
        )}

        {result.conditionSeverity !== 'ok' && (
          <div style={{
            background: severity.bg, border: `1px solid ${severity.color}`,
            borderRadius: '6px', padding: '8px 12px', marginTop: '10px',
            color: severity.color, fontSize: '0.9rem',
            fontFamily: 'Saira Condensed, sans-serif', fontWeight: 600,
          }}>
            {result.recommendedAction}
          </div>
        )}
      </div>

      {/* ── LISTINGS (scrollable) ── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', minHeight: 0 }}>

        <p style={{ color: '#a0aec0', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 12px', fontFamily: 'Saira Condensed, sans-serif' }}>
          Dónde Comprar
        </p>

        {mlLoading ? (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '16px 0', color: '#a0aec0', fontSize: '0.9rem' }}>
            <span className="loading" />
            Buscando en MercadoLibre...
          </div>
        ) : listings.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
            {listings.map((item, i) => (
              <motion.a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                style={{
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '10px', padding: '10px', display: 'flex', gap: '10px',
                  alignItems: 'center', textDecoration: 'none',
                }}
              >
                {item.thumbnail && (
                  <img src={item.thumbnail} alt=""
                    style={{ width: '56px', height: '56px', objectFit: 'contain', borderRadius: '6px', background: '#fff', flexShrink: 0 }}
                    onError={e => { e.target.style.display = 'none'; }} />
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.9rem', lineHeight: 1.3, marginBottom: '4px', fontFamily: 'Saira Condensed, sans-serif', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {item.title}
                  </div>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ color: '#22c55e', fontWeight: 700, fontSize: '1rem', fontFamily: 'Saira Condensed, sans-serif' }}>
                      {formatPrice(item.price, item.currency)}
                    </span>
                    {item.freeShipping && (
                      <span style={{ background: 'rgba(34,197,94,0.12)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '4px', padding: '1px 5px', fontSize: '0.7rem', fontWeight: 600 }}>
                        Envío gratis
                      </span>
                    )}
                  </div>
                  {item.seller && (
                    <div style={{ color: '#4a5568', fontSize: '0.72rem', marginTop: '2px' }}>{item.seller}</div>
                  )}
                </div>
                <span style={{ color: '#a0aec0', flexShrink: 0 }}>→</span>
              </motion.a>
            ))}
          </div>
        ) : (
          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '14px', marginBottom: '16px', color: '#4a5568', fontSize: '0.85rem' }}>
            Sin resultados en MercadoLibre para este país. Usa los links:
          </div>
        )}

        {/* Search links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {searchLinks.map(link => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '8px', padding: '11px 14px', color: '#a0aec0',
                textDecoration: 'none', display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', fontSize: '1rem',
                fontFamily: 'Saira Condensed, sans-serif', fontWeight: 600,
              }}
            >
              <span>Buscar en {link.name}</span>
              <span style={{ color: '#ef4444' }}>→</span>
            </a>
          ))}
        </div>

        {/* Description (collapsed at bottom) */}
        <div style={{ marginTop: '20px', padding: '14px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
          <p style={{ color: '#4a5568', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 6px', fontFamily: 'Saira Condensed, sans-serif' }}>
            Diagnóstico IA
          </p>
          <p style={{ color: '#a0aec0', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
            {result.description}
          </p>
        </div>
      </div>

      {/* ── FOOTER: actions ── */}
      <div style={{ padding: '10px 20px 24px', borderTop: '1px solid rgba(255,255,255,0.07)', flexShrink: 0, display: 'flex', gap: '10px' }}>
        <motion.button
          className="btn"
          onClick={() => navigate('/scan', { state: { vehicle } })}
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          style={{ marginTop: 0, flex: 1 }}
        >
          Otra Pieza
        </motion.button>
        <motion.button
          className="btn btn-secondary"
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          style={{ marginTop: 0, flex: 1 }}
        >
          Inicio
        </motion.button>
      </div>

    </div>
  );
};

export default AnalysisReportScreen;
