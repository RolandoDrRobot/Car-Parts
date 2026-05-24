import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, CheckCircle2, AlertCircle, AlertTriangle } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { useVehicles } from '../contexts/VehiclesContext';
import { useHistory } from '../contexts/HistoryContext';
import { btn, selectable } from '../utils/animations';

const drawerContent = {
  animate: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const drawerSection = {
  initial: { opacity: 0, x: 12 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.24, ease: [0.25, 0.1, 0.25, 1] } },
};

const COUNTRIES = [
  { code: 'CR', name: 'Costa Rica', flag: '🇨🇷' },
  { code: 'MX', name: 'México', flag: '🇲🇽' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱' },
  { code: 'US', name: 'EE.UU.', flag: '🇺🇸' },
];

const emptyVehicle = { brand: '', model: '', year: '', color: '' };

const SectionTitle = ({ children }) => (
  <p style={{
    color: '#a0aec0', fontSize: '1rem', fontWeight: 700,
    textTransform: 'uppercase', letterSpacing: '0.08em',
    marginBottom: '12px', marginTop: '28px',
    fontFamily: 'Saira Condensed, sans-serif',
  }}>
    {children}
  </p>
);

const SettingsDrawer = ({ isOpen, onClose }) => {
  const { settings, updateSettings } = useSettings();
  const { vehicles, addVehicle, removeVehicle } = useVehicles();
  const { history, clearHistory } = useHistory();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newVehicle, setNewVehicle] = useState(emptyVehicle);
  const [confirmClear, setConfirmClear] = useState(false);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const handleAddVehicle = () => {
    if (!newVehicle.brand || !newVehicle.model || !newVehicle.year) return;
    addVehicle(newVehicle);
    setNewVehicle(emptyVehicle);
    setShowAddForm(false);
  };

  const handleClearHistory = () => {
    if (confirmClear) {
      clearHistory();
      setConfirmClear(false);
    } else {
      setConfirmClear(true);
    }
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.65)',
              zIndex: 100,
            }}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0,
              width: '340px', maxWidth: '95vw',
              background: '#111',
              borderLeft: '1px solid rgba(255,255,255,0.08)',
              zIndex: 101,
              overflowY: 'auto',
              padding: '24px 20px 40px',
            }}
          >
            {/* Header */}
            <motion.div
              variants={drawerContent}
              initial="initial"
              animate="animate"
            >
            <motion.div variants={drawerSection} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h2 style={{ color: 'white', fontSize: '1.8rem', fontFamily: 'Saira Condensed, sans-serif', fontWeight: 700, margin: 0 }}>
                Ajustes
              </h2>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                style={{ background: 'none', border: 'none', color: '#a0aec0', cursor: 'pointer', padding: '4px 8px', display: 'flex' }}
              >
                <X size={20} />
              </motion.button>
            </motion.div>

            {/* Country */}
            <motion.div variants={drawerSection}>
            <SectionTitle>País</SectionTitle>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
              {COUNTRIES.map(c => (
                <motion.button
                  key={c.code}
                  onClick={() => updateSettings({ country: c.code })}
                  {...selectable}
                  style={{
                    background: settings.country === c.code ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.04)',
                    border: settings.country === c.code ? '2px solid #ef4444' : '2px solid rgba(255,255,255,0.07)',
                    borderRadius: '8px',
                    padding: '10px 6px',
                    cursor: 'pointer',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span style={{ fontSize: '1.4rem' }}>{c.flag}</span>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'Saira Condensed, sans-serif', fontWeight: 600 }}>{c.name}</span>
                </motion.button>
              ))}
            </div>
            </motion.div>

            {/* Language */}
            <motion.div variants={drawerSection}>
            <SectionTitle>Idioma</SectionTitle>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[{ code: 'es', label: 'Español' }, { code: 'en', label: 'English' }].map(lang => (
                <motion.button
                  key={lang.code}
                  onClick={() => updateSettings({ language: lang.code })}
                  {...selectable}
                  style={{
                    flex: 1,
                    background: settings.language === lang.code ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.04)',
                    border: settings.language === lang.code ? '2px solid #ef4444' : '2px solid rgba(255,255,255,0.07)',
                    borderRadius: '8px',
                    padding: '10px',
                    cursor: 'pointer',
                    color: 'white',
                    fontSize: '1.1rem',
                    fontFamily: 'Saira Condensed, sans-serif',
                    fontWeight: 600,
                  }}
                >
                  {lang.label}
                </motion.button>
              ))}
            </div>
            </motion.div>

            {/* Vehicles */}
            <motion.div variants={drawerSection}>
            <SectionTitle>Mis Vehículos</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {vehicles.map(v => (
                <div key={v.id} style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '8px',
                  padding: '12px 14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <div>
                    <div style={{ color: 'white', fontWeight: 600, fontSize: '1.1rem', fontFamily: 'Saira Condensed, sans-serif' }}>
                      {v.brand} {v.model}
                    </div>
                    <div style={{ color: '#a0aec0', fontSize: '0.85rem' }}>
                      {v.year}{v.color ? ` · ${v.color}` : ''}
                    </div>
                  </div>
                  <motion.button
                    onClick={() => removeVehicle(v.id)}
                    whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.85 }}
                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px', display: 'flex' }}
                  >
                    <Trash2 size={16} />
                  </motion.button>
                </div>
              ))}

              {!showAddForm ? (
                <button
                  onClick={() => setShowAddForm(true)}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '2px dashed rgba(255,255,255,0.12)',
                    borderRadius: '8px',
                    padding: '12px',
                    cursor: 'pointer',
                    color: '#a0aec0',
                    fontSize: '1rem',
                    fontFamily: 'Saira Condensed, sans-serif',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <Plus size={16} /> Agregar vehículo
                </button>
              ) : (
                <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '8px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <input
                      className="input" placeholder="Marca *" value={newVehicle.brand}
                      onChange={e => setNewVehicle(p => ({ ...p, brand: e.target.value }))}
                      style={{ padding: '10px 12px', fontSize: '1rem' }}
                    />
                    <input
                      className="input" placeholder="Modelo *" value={newVehicle.model}
                      onChange={e => setNewVehicle(p => ({ ...p, model: e.target.value }))}
                      style={{ padding: '10px 12px', fontSize: '1rem' }}
                    />
                    <input
                      className="input" placeholder="Año *" type="number" min="1990" max={currentYear + 1}
                      value={newVehicle.year}
                      onChange={e => setNewVehicle(p => ({ ...p, year: e.target.value }))}
                      style={{ padding: '10px 12px', fontSize: '1rem' }}
                    />
                    <input
                      className="input" placeholder="Color" value={newVehicle.color}
                      onChange={e => setNewVehicle(p => ({ ...p, color: e.target.value }))}
                      style={{ padding: '10px 12px', fontSize: '1rem' }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <motion.button
                      onClick={handleAddVehicle}
                      disabled={!newVehicle.brand || !newVehicle.model || !newVehicle.year}
                      className="btn"
                      {...btn}
                      style={{ marginTop: 0, padding: '10px', fontSize: '1rem' }}
                    >
                      Guardar
                    </motion.button>
                    <motion.button
                      onClick={() => { setShowAddForm(false); setNewVehicle(emptyVehicle); }}
                      className="btn btn-secondary"
                      {...btn}
                      style={{ marginTop: 0, padding: '10px', fontSize: '1rem' }}
                    >
                      Cancelar
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
            </motion.div>

            {/* History */}
            <motion.div variants={drawerSection}>
            <SectionTitle>Historial de Escaneos</SectionTitle>
            {history.length === 0 ? (
              <p style={{ color: '#4a5568', fontSize: '0.9rem' }}>Sin escaneos aún.</p>
            ) : (
              <>
                <motion.button
                  onClick={handleClearHistory}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: confirmClear ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.04)',
                    border: confirmClear ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '6px',
                    padding: '8px 14px',
                    cursor: 'pointer',
                    color: confirmClear ? '#ef4444' : '#a0aec0',
                    fontSize: '0.9rem',
                    fontFamily: 'Saira Condensed, sans-serif',
                    fontWeight: 600,
                    marginBottom: '12px',
                    width: '100%',
                  }}
                >
                  {confirmClear ? '¿Confirmar? Toca de nuevo' : 'Limpiar historial'}
                </motion.button>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '260px', overflowY: 'auto' }}>
                  {history.map(s => (
                    <div key={s.id} style={{
                      background: 'rgba(255,255,255,0.03)',
                      borderRadius: '6px',
                      padding: '10px 12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                      <div>
                        <div style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.9rem', fontFamily: 'Saira Condensed, sans-serif' }}>
                          {s.partName}
                        </div>
                        <div style={{ color: '#4a5568', fontSize: '0.75rem' }}>
                          {formatDate(s.date)}{s.vehicle ? ` · ${s.vehicle.brand} ${s.vehicle.model}` : ''}
                        </div>
                      </div>
                      <span style={{ flexShrink: 0, display: 'flex' }}>
                        {s.conditionSeverity === 'ok'
                          ? <CheckCircle2 size={12} color="#22c55e" />
                          : s.conditionSeverity === 'warning'
                          ? <AlertCircle size={12} color="#f59e0b" />
                          : <AlertTriangle size={12} color="#ef4444" />}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
            </motion.div>

            </motion.div>{/* end drawerContent */}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SettingsDrawer;
