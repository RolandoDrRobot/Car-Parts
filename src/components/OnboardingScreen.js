import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSettings } from '../contexts/SettingsContext';
import { useVehicles } from '../contexts/VehiclesContext';

const COUNTRIES = [
  { code: 'CR', name: 'Costa Rica', flag: '🇨🇷' },
  { code: 'MX', name: 'México', flag: '🇲🇽' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱' },
  { code: 'US', name: 'Estados Unidos', flag: '🇺🇸' },
];

const emptyVehicle = { brand: '', model: '', year: '', color: '' };

const OnboardingScreen = () => {
  const [step, setStep] = useState(1);
  const [country, setCountry] = useState(null);
  const [vehicle, setVehicle] = useState(emptyVehicle);
  const { updateSettings } = useSettings();
  const { addVehicle } = useVehicles();
  const navigate = useNavigate();

  const finalize = (withVehicle) => {
    updateSettings({ country, setupComplete: true });
    if (withVehicle && vehicle.brand && vehicle.model && vehicle.year) {
      addVehicle(vehicle);
    }
    navigate('/');
  };

  if (step === 1) {
    return (
      <div className="container">
        <motion.div
          className="card card-centered"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="title">CarParts</h1>
          <p className="subtitle">Identifica piezas con IA y encuentra dónde comprarlas</p>
          <p style={{ color: '#a0aec0', marginBottom: '24px', fontSize: '1.4rem' }}>
            Selecciona tu país para ver precios locales:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '28px' }}>
            {COUNTRIES.map(c => (
              <motion.button
                key={c.code}
                onClick={() => setCountry(c.code)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: country === c.code ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.04)',
                  border: country === c.code ? '2px solid #ef4444' : '2px solid rgba(255,255,255,0.08)',
                  borderRadius: '10px',
                  padding: '18px 12px',
                  cursor: 'pointer',
                  color: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span style={{ fontSize: '2rem' }}>{c.flag}</span>
                <span style={{ fontSize: '1.1rem', fontFamily: 'Saira Condensed, sans-serif', fontWeight: 600 }}>
                  {c.name}
                </span>
              </motion.button>
            ))}
          </div>

          <motion.button
            className="btn"
            onClick={() => setStep(2)}
            disabled={!country}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Continuar
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container">
      <motion.div
        className="card card-centered"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 style={{ color: 'white', marginBottom: '8px', fontSize: '2rem', fontFamily: 'Saira Condensed, sans-serif', fontWeight: 700 }}>
          Agrega tu vehículo
        </h2>
        <p style={{ color: '#a0aec0', marginBottom: '28px', fontSize: '1.3rem' }}>
          Opcional — ayuda a la IA a identificar piezas con más precisión
        </p>

        <div className="input-row">
          <div className="input-group">
            <label className="label">Marca *</label>
            <input className="input" placeholder="Toyota"
              value={vehicle.brand}
              onChange={e => setVehicle(p => ({ ...p, brand: e.target.value }))} />
          </div>
          <div className="input-group">
            <label className="label">Modelo *</label>
            <input className="input" placeholder="Corolla"
              value={vehicle.model}
              onChange={e => setVehicle(p => ({ ...p, model: e.target.value }))} />
          </div>
        </div>
        <div className="input-row">
          <div className="input-group">
            <label className="label">Año *</label>
            <input className="input" type="number" placeholder="2020" min="1990" max="2026"
              value={vehicle.year}
              onChange={e => setVehicle(p => ({ ...p, year: e.target.value }))} />
          </div>
          <div className="input-group">
            <label className="label">Color</label>
            <input className="input" placeholder="Blanco"
              value={vehicle.color}
              onChange={e => setVehicle(p => ({ ...p, color: e.target.value }))} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          <motion.button
            className="btn"
            onClick={() => finalize(true)}
            disabled={!vehicle.brand || !vehicle.model || !vehicle.year}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          >
            Guardar y Empezar
          </motion.button>
          <motion.button
            className="btn btn-secondary"
            onClick={() => finalize(false)}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          >
            Omitir
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default OnboardingScreen;
