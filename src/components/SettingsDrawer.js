import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { useVehicles } from '../contexts/VehiclesContext';
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

const emptyVehicle = { brand: '', model: '', year: '', color: '', engine: '', fuel: '', transmission: '' };

const SectionTitle = ({ children }) => (
  <p style={{
    color: '#a0aec0', fontSize: '0.72rem', fontWeight: 700,
    textTransform: 'uppercase', letterSpacing: '0.08em',
    marginBottom: '8px', marginTop: '20px',
    fontFamily: 'Saira Condensed, sans-serif',
  }}>
    {children}
  </p>
);

const SettingsDrawer = ({ isOpen, onClose }) => {
  const { settings, updateSettings } = useSettings();
  const { vehicles, addVehicle, removeVehicle } = useVehicles();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newVehicle, setNewVehicle] = useState(emptyVehicle);

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
              padding: '16px 16px 32px',
            }}
          >
            {/* Header */}
            <motion.div
              variants={drawerContent}
              initial="initial"
              animate="animate"
            >
            <motion.div variants={drawerSection} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <h2 style={{ color: 'white', fontSize: '1.4rem', fontFamily: 'Saira Condensed, sans-serif', fontWeight: 700, margin: 0 }}>
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
                    padding: '7px 4px',
                    cursor: 'pointer',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '3px',
                  }}
                >
                  <span style={{ fontSize: '1.1rem' }}>{c.flag}</span>
                  <span style={{ fontSize: '0.68rem', fontFamily: 'Saira Condensed, sans-serif', fontWeight: 600 }}>{c.name}</span>
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
                    padding: '8px',
                    cursor: 'pointer',
                    color: 'white',
                    fontSize: '0.9rem',
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
                      {v.year}{v.color ? ` · ${v.color}` : ''}{v.engine ? ` · ${v.engine}` : ''}{v.fuel ? ` · ${v.fuel}` : ''}
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
                    <input className="input" placeholder="Marca *" value={newVehicle.brand}
                      onChange={e => setNewVehicle(p => ({ ...p, brand: e.target.value }))}
                      style={{ padding: '10px 12px', fontSize: '1rem' }} />
                    <input className="input" placeholder="Modelo *" value={newVehicle.model}
                      onChange={e => setNewVehicle(p => ({ ...p, model: e.target.value }))}
                      style={{ padding: '10px 12px', fontSize: '1rem' }} />
                    <input className="input" placeholder="Año *" type="number" min="1990" max={currentYear + 1}
                      value={newVehicle.year}
                      onChange={e => setNewVehicle(p => ({ ...p, year: e.target.value }))}
                      style={{ padding: '10px 12px', fontSize: '1rem' }} />
                    <input className="input" placeholder="Color" value={newVehicle.color}
                      onChange={e => setNewVehicle(p => ({ ...p, color: e.target.value }))}
                      style={{ padding: '10px 12px', fontSize: '1rem' }} />
                    <input className="input" placeholder="Motor (ej. 1.5L, 2.0T)" value={newVehicle.engine}
                      onChange={e => setNewVehicle(p => ({ ...p, engine: e.target.value }))}
                      style={{ padding: '10px 12px', fontSize: '1rem' }} />
                    <select className="input" value={newVehicle.fuel}
                      onChange={e => setNewVehicle(p => ({ ...p, fuel: e.target.value }))}
                      style={{ padding: '10px 12px', fontSize: '1rem' }}>
                      <option value="">Combustible</option>
                      <option value="gasolina">Gasolina</option>
                      <option value="diésel">Diésel</option>
                      <option value="híbrido">Híbrido</option>
                      <option value="eléctrico">Eléctrico</option>
                    </select>
                    <select className="input" value={newVehicle.transmission}
                      onChange={e => setNewVehicle(p => ({ ...p, transmission: e.target.value }))}
                      style={{ padding: '10px 12px', fontSize: '1rem', gridColumn: '1 / -1' }}>
                      <option value="">Transmisión</option>
                      <option value="manual">Manual</option>
                      <option value="automática">Automática</option>
                      <option value="CVT">CVT</option>
                    </select>
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


            </motion.div>{/* end drawerContent */}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SettingsDrawer;
