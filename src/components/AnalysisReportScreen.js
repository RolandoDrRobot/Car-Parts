import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSettings } from '../contexts/SettingsContext';
import { useHistory } from '../contexts/HistoryContext';
import { searchParts } from '../utils/mercadolibreAPI';
import { getSearchLinks } from '../utils/searchLinks';

const SEVERITY = {
  ok:       { label: 'Buen estado',    color: '#22c55e', bg: 'rgba(34,197,94,0.12)'  },
  warning:  { label: 'Revisar',        color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
  critical: { label: 'Crítico',        color: '#ef4444', bg: 'rgba(239,68,68,0.12)'  },
};

const CURRENCY_SYMBOLS = {
  CRC: '₡', MXN: '$', COP: '$', ARS: '$', CLP: '$', USD: '$',
};

const formatPrice = (price, currency) => {
  const symbol = CURRENCY_SYMBOLS[currency] || '$';
  return `${symbol}${price?.toLocaleString('es-ES') ?? '—'}`;
};

const AnalysisReportScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { result, vehicle } = location.state || {};
  const { settings } = useSettings();
  const { addScan } = useHistory();

  const [listings, setListings] = useState([]);
  const [mlLoading, setMlLoading] = useState(true);
  const [mlError, setMlError] = useState(false);
  const savedRef = useRef(false);

  // Save to history once
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
    setMlLoading(true);
    searchParts(result.searchQuery, settings.country)
      .then(items => { setListings(items); setMlLoading(false); })
      .catch(() => { setMlError(true); setMlLoading(false); });
  }, [result?.isCarPart, result?.searchQuery, settings.country]);

  // No navigation state
  if (!result) {
    return (
      <div className="container">
        <div className="card card-centered">
          <p style={{ color: '#a0aec0', fontSize: '1.3rem' }}>Sin datos de análisis.</p>
          <button className="btn" onClick={() => navigate('/')}>Volver al Inicio</button>
        </div>
      </div>
    );
  }

  // Not a car part
  if (!result.isCarPart) {
    return (
      <div className="container">
        <motion.div className="card card-centered"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>⚠️</div>
          <h2 style={{ color: '#f59e0b', fontFamily: 'Saira Condensed, sans-serif', fontSize: '1.8rem', marginBottom: '12px' }}>
            Imagen no válida
          </h2>
          <p style={{ color: '#a0aec0', lineHeight: 1.6, marginBottom: '24px' }}>
            {result.message || 'La imagen no parece ser de una pieza de vehículo. Intenta con una foto más clara de la pieza.'}
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn" onClick={() => navigate('/scan', { state: { vehicle } })}>
              Intentar Nuevamente
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/')}>
              Volver al Inicio
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const severity = SEVERITY[result.conditionSeverity] || SEVERITY.warning;
  const searchLinks = getSearchLinks(result.searchQuery, settings.country);

  return (
    <div className="container" style={{ justifyContent: 'flex-start', alignItems: 'stretch', paddingTop: '24px' }}>
      <div style={{ width: '100%', maxWidth: '640px', margin: '0 auto' }}>

        {/* Back */}
        <motion.button
          onClick={() => navigate('/scan', { state: { vehicle } })}
          style={{ background: 'none', border: 'none', color: '#a0aec0', cursor: 'pointer', fontSize: '1.2rem', marginBottom: '16px', padding: 0, display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Saira Condensed, sans-serif' }}
          whileHover={{ x: -3 }}
        >
          ← Otro escaneo
        </motion.button>

        {/* Part Identification */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <h2 style={{ color: 'white', fontFamily: 'Saira Condensed, sans-serif', fontSize: '1.8rem', fontWeight: 700, margin: 0, flex: 1 }}>
              {result.partName}
            </h2>
            <span style={{
              background: severity.bg, color: severity.color,
              border: `1px solid ${severity.color}`,
              borderRadius: '20px', padding: '4px 12px',
              fontSize: '0.85rem', fontWeight: 700,
              fontFamily: 'Saira Condensed, sans-serif',
              flexShrink: 0, marginLeft: '12px',
            }}>
              {severity.label}
            </span>
          </div>

          {vehicle && (
            <p style={{ color: '#a0aec0', fontSize: '0.85rem', marginBottom: '12px' }}>
              🚗 {vehicle.brand} {vehicle.model} {vehicle.year}
            </p>
          )}

          <p style={{ color: '#a0aec0', lineHeight: 1.6, marginBottom: '12px', fontSize: '1.1rem' }}>
            {result.description}
          </p>

          {result.conditionSeverity !== 'ok' && (
            <div style={{
              background: severity.bg, border: `1px solid ${severity.color}`,
              borderRadius: '8px', padding: '12px 14px',
              color: severity.color, fontSize: '1rem',
              fontFamily: 'Saira Condensed, sans-serif', fontWeight: 600,
            }}>
              {result.recommendedAction}
            </div>
          )}
        </motion.div>

        {/* MercadoLibre Listings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <p style={{ color: '#a0aec0', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px', fontFamily: 'Saira Condensed, sans-serif' }}>
            Dónde Comprar
          </p>

          {mlLoading ? (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '20px', color: '#a0aec0' }}>
              <span className="loading" style={{ borderColor: 'rgba(255,255,255,0.1)', borderTopColor: '#ef4444' }} />
              Buscando en MercadoLibre...
            </div>
          ) : listings.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              {listings.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.01 }}
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '10px',
                    padding: '12px',
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'center',
                    textDecoration: 'none',
                  }}
                >
                  {item.thumbnail && (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      style={{ width: '64px', height: '64px', objectFit: 'contain', borderRadius: '6px', background: '#fff', flexShrink: 0 }}
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '1rem', lineHeight: 1.3, marginBottom: '6px', fontFamily: 'Saira Condensed, sans-serif', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {item.title}
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <span style={{ color: '#22c55e', fontWeight: 700, fontSize: '1.1rem', fontFamily: 'Saira Condensed, sans-serif' }}>
                        {formatPrice(item.price, item.currency)}
                      </span>
                      {item.freeShipping && (
                        <span style={{ background: 'rgba(34,197,94,0.12)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '4px', padding: '1px 6px', fontSize: '0.75rem', fontWeight: 600 }}>
                          Envío gratis
                        </span>
                      )}
                      {item.condition === 'new' && (
                        <span style={{ color: '#a0aec0', fontSize: '0.78rem' }}>Nuevo</span>
                      )}
                    </div>
                    {item.seller && (
                      <div style={{ color: '#4a5568', fontSize: '0.75rem', marginTop: '4px' }}>{item.seller}</div>
                    )}
                  </div>
                  <span style={{ color: '#a0aec0', fontSize: '1rem', flexShrink: 0 }}>→</span>
                </motion.a>
              ))}
            </div>
          ) : (
            !mlError && (
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '8px', padding: '16px', marginBottom: '16px', color: '#a0aec0', fontSize: '0.9rem' }}>
                No se encontraron resultados en MercadoLibre para este país. Prueba los siguientes links:
              </div>
            )
          )}

          {/* Search Links (always shown as fallback/complement) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {searchLinks.map(link => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  color: '#a0aec0',
                  textDecoration: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '1rem',
                  fontFamily: 'Saira Condensed, sans-serif',
                  fontWeight: 600,
                }}
              >
                <span>Buscar en {link.name}</span>
                <span style={{ color: '#ef4444' }}>→</span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <div style={{ marginTop: '28px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <motion.button
            className="btn"
            onClick={() => navigate('/scan', { state: { vehicle } })}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          >
            Escanear Otra Pieza
          </motion.button>
          <motion.button
            className="btn btn-secondary"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          >
            Inicio
          </motion.button>
        </div>

      </div>
    </div>
  );
};

export default AnalysisReportScreen;
