import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSettings } from '../contexts/SettingsContext';
import { useVehicles } from '../contexts/VehiclesContext';
import { useHistory } from '../contexts/HistoryContext';
import SettingsDrawer from './SettingsDrawer';
import { screen, section, sectionStagger, item, btn, scanBtn, gearBtn, selectable } from '../utils/animations';

const COUNTRY_NAMES = {
  CR: 'Costa Rica', MX: 'México', CO: 'Colombia',
  AR: 'Argentina',  CL: 'Chile',  US: 'Estados Unidos',
};

const SEVERITY_COLORS = { ok: '#22c55e', warning: '#f59e0b', critical: '#ef4444' };

const CATEGORY_ICONS = {
  frenos: '🔴', motor: '⚙️', 'suspensión': '🔩', eléctrico: '⚡',
  filtros: '🔘', carrocería: '🚗', enfriamiento: '🌡️', escape: '💨',
  'transmisión': '⚙️', otro: '🔧',
};

const HomeScreen = () => {
  const navigate = useNavigate();
  const { settings } = useSettings();
  const { vehicles } = useVehicles();
  const { history } = useHistory();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);

  const selectedVehicle = vehicles.find(v => v.id === selectedVehicleId) || null;

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });

  return (
    <motion.div className="container"
      variants={screen} initial="initial" animate="animate">

      {/* ── HEADER ── */}
      <motion.div variants={section} style={{ padding: '20px 20px 0', flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className="title" style={{ marginBottom: 0, fontSize: '2.8rem', lineHeight: 1 }}>
              CarParts
            </h1>
            <p style={{ color: '#a0aec0', margin: '4px 0 0', fontSize: '1rem', fontFamily: 'Saira Condensed, sans-serif' }}>
              {COUNTRY_NAMES[settings.country] || 'Sin país'}
            </p>
          </div>
          <motion.button
            onClick={() => setDrawerOpen(true)}
            {...gearBtn}
            style={{
              background: 'rgba(255,255,255,0.07)', border: 'none', borderRadius: '50%',
              width: '44px', height: '44px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.2rem', flexShrink: 0,
            }}
          >
            ⚙️
          </motion.button>
        </div>
      </motion.div>

      {/* ── VEHICLES ── */}
      {vehicles.length > 0 && (
        <motion.div variants={section} style={{ padding: '16px 20px 0', flexShrink: 0 }}>
          <p style={{ color: '#a0aec0', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 10px', fontFamily: 'Saira Condensed, sans-serif' }}>
            Mi Vehículo
          </p>
          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
            {vehicles.map(v => (
              <motion.button
                key={v.id}
                onClick={() => setSelectedVehicleId(selectedVehicleId === v.id ? null : v.id)}
                {...selectable}
                style={{
                  background: selectedVehicleId === v.id ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.04)',
                  border: selectedVehicleId === v.id ? '2px solid #ef4444' : '2px solid rgba(255,255,255,0.07)',
                  borderRadius: '10px', padding: '10px 14px',
                  cursor: 'pointer', minWidth: '130px', flexShrink: 0, textAlign: 'left', color: 'white',
                }}
              >
                <div style={{ fontSize: '1.2rem', marginBottom: '4px' }}>🚗</div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', fontFamily: 'Saira Condensed, sans-serif' }}>
                  {v.brand} {v.model}
                </div>
                <div style={{ color: '#a0aec0', fontSize: '0.75rem' }}>
                  {v.year}{v.color ? ` · ${v.color}` : ''}
                </div>
              </motion.button>
            ))}
            <motion.button
              onClick={() => setDrawerOpen(true)}
              {...selectable}
              style={{
                background: 'rgba(255,255,255,0.02)', border: '2px dashed rgba(255,255,255,0.1)',
                borderRadius: '10px', padding: '10px 14px', cursor: 'pointer',
                minWidth: '70px', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: '4px', color: '#a0aec0',
              }}
            >
              <span style={{ fontSize: '1.2rem', color: '#ef4444' }}>+</span>
              <span style={{ fontSize: '0.7rem', fontFamily: 'Saira Condensed, sans-serif', fontWeight: 600 }}>Agregar</span>
            </motion.button>
          </div>
          {selectedVehicle && (
            <p style={{ color: '#a0aec0', fontSize: '0.75rem', margin: '8px 0 0' }}>
              Contexto: <strong style={{ color: '#e2e8f0' }}>{selectedVehicle.brand} {selectedVehicle.model} {selectedVehicle.year}</strong>
            </p>
          )}
        </motion.div>
      )}

      {/* ── SCAN CTA ── */}
      <motion.div variants={section} style={{ padding: '16px 20px 0', flexShrink: 0 }}>
        <motion.button
          className="btn"
          onClick={() => navigate('/scan', { state: { vehicle: selectedVehicle } })}
          {...scanBtn}
          style={{ marginTop: 0, padding: '20px', fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
        >
          <span>��</span> Escanear Pieza
        </motion.button>

        {vehicles.length === 0 && (
          <motion.button
            className="btn btn-secondary"
            onClick={() => setDrawerOpen(true)}
            {...btn}
            style={{ marginTop: '10px' }}
          >
            + Agregar Vehículo
          </motion.button>
        )}
      </motion.div>

      {/* ── HISTORY (scrollable, staggered) ── */}
      <motion.div
        variants={sectionStagger}
        style={{ flex: 1, overflowY: 'auto', padding: '20px', minHeight: 0 }}
      >
        {history.length > 0 ? (
          <>
            <p style={{ color: '#a0aec0', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 10px', fontFamily: 'Saira Condensed, sans-serif' }}>
              Escaneos Recientes
            </p>
            {history.map(scan => (
              <motion.div
                key={scan.id}
                variants={item}
                style={{
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '10px', padding: '12px 14px',
                  display: 'flex', alignItems: 'center', gap: '10px',
                  marginBottom: '8px',
                }}
              >
                <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>
                  {CATEGORY_ICONS[scan.partCategory] || '🔧'}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem', fontFamily: 'Saira Condensed, sans-serif', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {scan.partName}
                  </div>
                  <div style={{ color: '#4a5568', fontSize: '0.75rem' }}>
                    {formatDate(scan.date)}{scan.vehicle ? ` · ${scan.vehicle.brand} ${scan.vehicle.model}` : ''}
                  </div>
                </div>
                <span style={{
                  width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0,
                  background: SEVERITY_COLORS[scan.conditionSeverity] || '#a0aec0',
                }} />
              </motion.div>
            ))}
          </>
        ) : (
          <motion.div
            variants={item}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#2d3748', textAlign: 'center', gap: '8px' }}
          >
            <span style={{ fontSize: '2.5rem' }}>📷</span>
            <p style={{ fontFamily: 'Saira Condensed, sans-serif', fontSize: '1rem', margin: 0 }}>
              Tus escaneos aparecerán aquí
            </p>
          </motion.div>
        )}
      </motion.div>

      <SettingsDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </motion.div>
  );
};

export default HomeScreen;
