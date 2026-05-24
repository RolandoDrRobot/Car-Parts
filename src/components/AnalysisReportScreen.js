import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, AlertTriangle, Car, ExternalLink, Share2, CheckCircle2, XCircle, Stethoscope, ScanLine } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { useHistory } from '../contexts/HistoryContext';
import { searchParts } from '../utils/mercadolibreAPI';
import { getSearchLinks } from '../utils/searchLinks';
import { screen, section, sectionStagger, item, badge, btn, backBtn } from '../utils/animations';

const SEVERITY = {
  ok:       { label: 'Buen estado', color: '#22c55e', bg: 'rgba(34,197,94,0.12)'  },
  warning:  { label: 'Revisar',     color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
  critical: { label: 'Crítico',     color: '#ef4444', bg: 'rgba(239,68,68,0.12)'  },
};

const TYPE_META = {
  scan:     { icon: <ScanLine size={14} />,       label: 'Escaneo de pieza'   },
  symptoms: { icon: <Stethoscope size={14} />,    label: 'Diagnóstico'        },
  lights:   { icon: <AlertTriangle size={14} />,  label: 'Luz de tablero'     },
};

const CURRENCY_SYMBOLS = { CRC: '₡', MXN: '$', COP: '$', ARS: '$', CLP: '$', USD: '$' };

const formatPrice = (price, currency) =>
  `${CURRENCY_SYMBOLS[currency] || '$'}${price?.toLocaleString('es-ES') ?? '—'}`;

const AnalysisReportScreen = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { result, vehicle, fromHistory } = location.state || {};
  const { settings } = useSettings();
  const { addScan }  = useHistory();

  const [listings, setListings]   = useState([]);
  const [mlLoading, setMlLoading] = useState(true);
  const savedRef = useRef(false);

  useEffect(() => {
    if (result?.isCarPart && !savedRef.current && !fromHistory) {
      savedRef.current = true;
      addScan({
        partName:          result.partName,
        partCategory:      result.partCategory,
        conditionSeverity: result.conditionSeverity,
        vehicle:           vehicle || null,
        searchQuery:       result.searchQuery,
        description:       result.description    || null,
        recommendedAction: result.recommendedAction || null,
        causes:            result.causes          || null,
        canDrive:          result.canDrive        ?? null,
        type:              result.type            || 'scan',
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!result?.isCarPart || !result?.searchQuery) { setMlLoading(false); return; }
    searchParts(result.searchQuery, settings.country)
      .then(items => setListings(items))
      .catch(() => setListings([]))
      .finally(() => setMlLoading(false));
  }, [result?.isCarPart, result?.searchQuery, settings.country]);

  const handleShare = () => {
    if (!navigator.share) return;
    navigator.share({
      title: result.partName,
      text: `${result.partName}\n\n${result.description || ''}\n\n${result.recommendedAction || ''}`.trim(),
    }).catch(() => {});
  };

  // ── No state ──
  if (!result) {
    return (
      <motion.div className="container" style={{ justifyContent: 'center', alignItems: 'center' }}
        variants={screen} initial="initial" animate="animate">
        <motion.div variants={section} style={{ textAlign: 'center', padding: '20px' }}>
          <p style={{ color: '#a0aec0', fontSize: '1.2rem', marginBottom: '16px' }}>Sin datos de análisis.</p>
          <motion.button className="btn" style={{ marginTop: 0 }} {...btn} onClick={() => navigate('/')}>
            Volver al Inicio
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  // ── Not a car part ──
  if (!result.isCarPart) {
    return (
      <motion.div className="container" style={{ justifyContent: 'center', alignItems: 'center', padding: '20px' }}
        variants={screen} initial="initial" animate="animate">
        <motion.div variants={section} style={{ textAlign: 'center', maxWidth: '400px' }}>
          <motion.div variants={badge} style={{ marginBottom: '12px', display: 'flex', justifyContent: 'center', color: '#f59e0b' }}>
            <AlertTriangle size={48} />
          </motion.div>
          <h2 style={{ color: '#f59e0b', fontFamily: 'Saira Condensed, sans-serif', fontSize: '1.8rem', marginBottom: '10px' }}>
            Imagen no válida
          </h2>
          <p style={{ color: '#a0aec0', lineHeight: 1.6, marginBottom: '20px' }}>
            {result.message || 'La imagen no parece ser de una pieza de vehículo.'}
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <motion.button className="btn" style={{ marginTop: 0 }} {...btn}
              onClick={() => navigate('/scan', { state: { vehicle } })}>
              Intentar Nuevamente
            </motion.button>
            <motion.button className="btn btn-secondary" style={{ marginTop: 0 }} {...btn}
              onClick={() => navigate('/')}>
              Inicio
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  const severity    = SEVERITY[result.conditionSeverity] || SEVERITY.warning;
  const searchLinks = getSearchLinks(result.searchQuery, settings.country);
  const typeMeta    = TYPE_META[result.type] || TYPE_META.scan;

  return (
    <motion.div className="container" variants={screen} initial="initial" animate="animate">

      {/* ── HEADER ── */}
      <motion.div variants={section}
        style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)', flexShrink: 0 }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <motion.button
            onClick={() => fromHistory ? navigate('/') : navigate(-1)}
            {...backBtn}
            style={{ background: 'none', border: 'none', color: '#a0aec0', cursor: 'pointer', fontSize: '0.9rem', padding: 0, display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Saira Condensed, sans-serif' }}>
            <ArrowLeft size={14} /> {fromHistory ? 'Volver' : 'Atrás'}
          </motion.button>
          {navigator.share && (
            <motion.button onClick={handleShare} {...backBtn}
              style={{ background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: '8px', color: '#a0aec0', cursor: 'pointer', padding: '6px 10px', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', fontFamily: 'Saira Condensed, sans-serif', fontWeight: 600 }}>
              <Share2 size={14} /> Compartir
            </motion.button>
          )}
        </div>

        {/* Type badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '3px 10px', color: '#a0aec0', fontSize: '0.72rem', fontWeight: 700, fontFamily: 'Saira Condensed, sans-serif', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {typeMeta.icon} {typeMeta.label}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
          <h2 style={{ color: 'white', fontFamily: 'Saira Condensed, sans-serif', fontSize: '1.8rem', fontWeight: 700, margin: 0, flex: 1, lineHeight: 1.2 }}>
            {result.partName}
          </h2>
          <motion.span variants={badge} style={{
            background: severity.bg, color: severity.color,
            border: `1px solid ${severity.color}`,
            borderRadius: '20px', padding: '4px 10px',
            fontSize: '0.8rem', fontWeight: 700,
            fontFamily: 'Saira Condensed, sans-serif', flexShrink: 0,
          }}>
            {severity.label}
          </motion.span>
        </div>

        {vehicle && (
          <p style={{ color: '#4a5568', fontSize: '0.8rem', margin: '6px 0 0', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Car size={13} /> {vehicle.brand} {vehicle.model} {vehicle.year}
          </p>
        )}

        {/* canDrive badge */}
        {result.canDrive !== null && result.canDrive !== undefined && (
          <motion.div variants={item} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '10px',
            background: result.canDrive ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
            border: `1px solid ${result.canDrive ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
            borderRadius: '8px', padding: '8px 12px',
            color: result.canDrive ? '#22c55e' : '#ef4444',
            fontSize: '0.85rem', fontFamily: 'Saira Condensed, sans-serif', fontWeight: 700,
          }}>
            {result.canDrive
              ? <><CheckCircle2 size={16} /> Puede seguir manejando</>
              : <><XCircle size={16} /> No manejar hasta revisar</>}
          </motion.div>
        )}

        {/* Urgency or recommended action banner */}
        {(result.urgencyNote || (result.conditionSeverity !== 'ok' && result.recommendedAction)) && (
          <motion.div variants={item} style={{
            background: severity.bg, border: `1px solid ${severity.color}`,
            borderRadius: '6px', padding: '8px 12px', marginTop: '8px',
            color: severity.color, fontSize: '0.9rem',
            fontFamily: 'Saira Condensed, sans-serif', fontWeight: 600,
          }}>
            {result.urgencyNote || result.recommendedAction}
          </motion.div>
        )}
      </motion.div>

      {/* ── CONTENT (scrollable) ── */}
      <motion.div variants={sectionStagger}
        style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', minHeight: 0 }}>

        {/* Causes (symptoms / lights) */}
        {result.causes?.length > 0 && (
          <motion.div variants={item} style={{ marginBottom: '20px' }}>
            <p style={{ color: '#a0aec0', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 10px', fontFamily: 'Saira Condensed, sans-serif' }}>
              Causas Probables
            </p>
            {result.causes.map((cause, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '6px' }}>
                <span style={{ color: severity.color, fontWeight: 700, fontSize: '0.85rem', flexShrink: 0, marginTop: '1px' }}>
                  {i + 1}.
                </span>
                <span style={{ color: '#e2e8f0', fontSize: '0.9rem', fontFamily: 'Saira Condensed, sans-serif' }}>
                  {cause}
                </span>
              </div>
            ))}
          </motion.div>
        )}

        {/* Where to buy */}
        <p style={{ color: '#a0aec0', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 12px', fontFamily: 'Saira Condensed, sans-serif' }}>
          Dónde Comprar
        </p>

        {mlLoading ? (
          <motion.div variants={item}
            style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '16px 0', color: '#a0aec0', fontSize: '0.9rem' }}>
            <span className="loading" /> Buscando en MercadoLibre...
          </motion.div>
        ) : listings.length > 0 ? (
          <div style={{ marginBottom: '20px' }}>
            {listings.map(listing => (
              <motion.a key={listing.id} variants={item}
                href={listing.url} target="_blank" rel="noopener noreferrer"
                style={{
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '10px', padding: '10px', display: 'flex', gap: '10px',
                  alignItems: 'center', textDecoration: 'none', marginBottom: '8px',
                }}>
                {listing.thumbnail && (
                  <img src={listing.thumbnail} alt=""
                    style={{ width: '56px', height: '56px', objectFit: 'contain', borderRadius: '6px', background: '#fff', flexShrink: 0 }}
                    onError={e => { e.target.style.display = 'none'; }} />
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.9rem', lineHeight: 1.3, marginBottom: '4px', fontFamily: 'Saira Condensed, sans-serif', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {listing.title}
                  </div>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ color: '#22c55e', fontWeight: 700, fontSize: '1rem', fontFamily: 'Saira Condensed, sans-serif' }}>
                      {formatPrice(listing.price, listing.currency)}
                    </span>
                    {listing.freeShipping && (
                      <span style={{ background: 'rgba(34,197,94,0.12)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '4px', padding: '1px 5px', fontSize: '0.7rem', fontWeight: 600 }}>
                        Envío gratis
                      </span>
                    )}
                  </div>
                  {listing.seller && (
                    <div style={{ color: '#4a5568', fontSize: '0.72rem', marginTop: '2px' }}>{listing.seller}</div>
                  )}
                </div>
                <ExternalLink size={14} color="#a0aec0" style={{ flexShrink: 0 }} />
              </motion.a>
            ))}
          </div>
        ) : (
          <motion.div variants={item}
            style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '14px', marginBottom: '16px', color: '#4a5568', fontSize: '0.85rem' }}>
            Sin resultados en MercadoLibre para este país. Usa los links:
          </motion.div>
        )}

        {/* Search links */}
        {searchLinks.map(link => (
          <motion.a key={link.name} variants={item}
            href={link.url} target="_blank" rel="noopener noreferrer"
            style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '8px', padding: '11px 14px', color: '#a0aec0',
              textDecoration: 'none', display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', fontSize: '1rem',
              fontFamily: 'Saira Condensed, sans-serif', fontWeight: 600,
              marginBottom: '6px',
            }}>
            <span>Buscar en {link.name}</span>
            <ExternalLink size={14} color="#ef4444" />
          </motion.a>
        ))}

        {/* Diagnosis */}
        <motion.div variants={item}
          style={{ marginTop: '20px', padding: '14px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
          <p style={{ color: '#4a5568', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 6px', fontFamily: 'Saira Condensed, sans-serif' }}>
            Diagnóstico IA
          </p>
          <p style={{ color: result.description ? '#a0aec0' : '#4a5568', fontSize: '0.85rem', lineHeight: 1.6, margin: 0, fontStyle: result.description ? 'normal' : 'italic' }}>
            {result.description || 'Diagnóstico no disponible para este escaneo anterior.'}
          </p>
          {result.recommendedAction && result.conditionSeverity === 'ok' && (
            <p style={{ color: '#22c55e', fontSize: '0.85rem', margin: '8px 0 0', fontFamily: 'Saira Condensed, sans-serif', fontWeight: 600 }}>
              ✓ {result.recommendedAction}
            </p>
          )}
        </motion.div>
      </motion.div>

      {/* ── FOOTER ── */}
      <motion.div variants={section}
        style={{ padding: '10px 20px 24px', borderTop: '1px solid rgba(255,255,255,0.07)', flexShrink: 0, display: 'flex', gap: '10px' }}>
        {fromHistory ? (
          <motion.button className="btn" style={{ marginTop: 0, flex: 1 }} {...btn} onClick={() => navigate('/')}>
            Inicio
          </motion.button>
        ) : (
          <>
            <motion.button className="btn" style={{ marginTop: 0, flex: 1 }} {...btn}
              onClick={() => navigate(-1)}>
              Otra Pieza
            </motion.button>
            <motion.button className="btn btn-secondary" style={{ marginTop: 0, flex: 1 }} {...btn}
              onClick={() => navigate('/')}>
              Inicio
            </motion.button>
          </>
        )}
      </motion.div>

    </motion.div>
  );
};

export default AnalysisReportScreen;
