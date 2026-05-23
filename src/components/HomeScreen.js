import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSettings } from '../contexts/SettingsContext';
import { useVehicles } from '../contexts/VehiclesContext';
import { useHistory } from '../contexts/HistoryContext';
import SettingsDrawer from './SettingsDrawer';

const COUNTRY_NAMES = {
  CR: 'Costa Rica', MX: 'México', CO: 'Colombia',
  AR: 'Argentina', CL: 'Chile', US: 'Estados Unidos',
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

  const handleScan = () => {
    navigate('/scan', { state: { vehicle: selectedVehicle } });
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <div className="container" style={{ justifyContent: 'flex-start', alignItems: 'stretch', paddingTop: '24px' }}>
      <div style={{ width: '100%', maxWidth: '560px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '36px' }}>
          <div>
            <h1 className="title" style={{ marginBottom: '2px', fontSize: '3rem' }}>CarParts</h1>
            <p style={{ color: '#a0aec0', margin: 0, fontSize: '1.1rem', fontFamily: 'Saira Condensed, sans-serif' }}>
              {COUNTRY_NAMES[settings.country] || 'Configurar país'}
            </p>
          </div>
          <motion.button
            onClick={() => setDrawerOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              background: 'rgba(255,255,255,0.07)', border: 'none',
              borderRadius: '50%', width: '46px', height: '46px',
              cursor: 'pointer', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0,
            }}
          >
            ⚙️
          </motion.button>
        </div>

        {/* Vehicles */}
        {vehicles.length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <p style={{ color: '#a0aec0', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px', fontFamily: 'Saira Condensed, sans-serif' }}>
              Mi Vehículo
            </p>
            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
              {vehicles.map(v => (
                <motion.button
                  key={v.id}
                  onClick={() => setSelectedVehicleId(selectedVehicleId === v.id ? null : v.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: selectedVehicleId === v.id ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.04)',
                    border: selectedVehicleId === v.id ? '2px solid #ef4444' : '2px solid rgba(255,255,255,0.07)',
                    borderRadius: '12px',
                    padding: '14px 18px',
                    cursor: 'pointer',
                    minWidth: '150px',
                    flexShrink: 0,
                    textAlign: 'left',
                    color: 'white',
                  }}
                >
                  <div style={{ fontSize: '1.5rem', marginBottom: '6px' }}>🚗</div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', fontFamily: 'Saira Condensed, sans-serif' }}>
                    {v.brand} {v.model}
                  </div>
                  <div style={{ color: '#a0aec0', fontSize: '0.8rem' }}>
                    {v.year}{v.color ? ` · ${v.color}` : ''}
                  </div>
                </motion.button>
              ))}
              <motion.button
                onClick={() => setDrawerOpen(true)}
                whileHover={{ scale: 1.02 }}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '2px dashed rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '14px 18px',
                  cursor: 'pointer',
                  minWidth: '90px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  color: '#a0aec0',
                }}
              >
                <span style={{ fontSize: '1.4rem', color: '#ef4444' }}>+</span>
                <span style={{ fontSize: '0.75rem', fontFamily: 'Saira Condensed, sans-serif', fontWeight: 600 }}>Agregar</span>
              </motion.button>
            </div>
            {selectedVehicle && (
              <p style={{ color: '#a0aec0', fontSize: '0.8rem', marginTop: '8px' }}>
                Escaneo con contexto: <strong style={{ color: '#e2e8f0' }}>{selectedVehicle.brand} {selectedVehicle.model} {selectedVehicle.year}</strong>
              </p>
            )}
          </div>
        )}

        {/* Scan CTA */}
        <motion.button
          className="btn"
          onClick={handleScan}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{ padding: '22px', fontSize: '1.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
        >
          <span style={{ fontSize: '1.6rem' }}>📷</span>
          Escanear Pieza
        </motion.button>

        {vehicles.length === 0 && (
          <motion.button
            className="btn btn-secondary"
            onClick={() => setDrawerOpen(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            + Agregar Vehículo
          </motion.button>
        )}

        {/* History */}
        {history.length > 0 && (
          <div style={{ marginTop: '36px' }}>
            <p style={{ color: '#a0aec0', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px', fontFamily: 'Saira Condensed, sans-serif' }}>
              Escaneos Recientes
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {history.slice(0, 5).map(scan => (
                <motion.div
                  key={scan.id}
                  whileHover={{ scale: 1.01 }}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>
                    {CATEGORY_ICONS[scan.partCategory] || '🔧'}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: 'white', fontWeight: 700, fontSize: '1rem', fontFamily: 'Saira Condensed, sans-serif', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {scan.partName}
                    </div>
                    <div style={{ color: '#4a5568', fontSize: '0.78rem' }}>
                      {formatDate(scan.date)}{scan.vehicle ? ` · ${scan.vehicle.brand} ${scan.vehicle.model}` : ''}
                    </div>
                  </div>
                  <span style={{
                    width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0,
                    background: SEVERITY_COLORS[scan.conditionSeverity] || '#a0aec0',
                  }} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      <SettingsDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
};

export default HomeScreen;
