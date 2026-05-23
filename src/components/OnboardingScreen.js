import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSettings } from '../contexts/SettingsContext';
import { useVehicles } from '../contexts/VehiclesContext';

const COUNTRIES = [
  { code: 'CR', name: 'Costa Rica', flag: '🇨🇷' },
  { code: 'MX', name: 'México',     flag: '🇲🇽' },
  { code: 'CO', name: 'Colombia',   flag: '🇨🇴' },
  { code: 'AR', name: 'Argentina',  flag: '🇦🇷' },
  { code: 'CL', name: 'Chile',      flag: '🇨🇱' },
  { code: 'US', name: 'EE.UU.',     flag: '🇺🇸' },
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
      <div className="container" style={{ padding: '0 20px' }}>

        {/* Logo */}
        <div style={{ paddingTop: '32px', textAlign: 'center', flexShrink: 0 }}>
          <h1 className="title" style={{ marginBottom: '4px' }}>CarParts</h1>
          <p style={{ color: '#a0aec0', fontSize: '1.1rem', margin: '0 0 20px', fontFamily: 'Saira Condensed, sans-serif' }}>
            Identifica piezas con IA y encuentra dónde comprarlas
          </p>
          <p style={{ color: '#718096', fontSize: '0.9rem', margin: 0 }}>Selecciona tu país:</p>
        </div>

        {/* Country grid (fills remaining space) */}
        <div style={{
          flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
          gridTemplateRows: '1fr 1fr', gap: '10px',
          padding: '16px 0', minHeight: 0,
        }}>
          {COUNTRIES.map(c => (
            <motion.button
              key={c.code}
              onClick={() => setCountry(c.code)}
              whileTap={{ scale: 0.96 }}
              style={{
                background: country === c.code ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.04)',
                border: country === c.code ? '2px solid #ef4444' : '2px solid rgba(255,255,255,0.07)',
                borderRadius: '10px', cursor: 'pointer', color: 'white',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px',
              }}
            >
              <span style={{ fontSize: '1.8rem' }}>{c.flag}</span>
              <span style={{ fontSize: '0.85rem', fontFamily: 'Saira Condensed, sans-serif', fontWeight: 600 }}>
                {c.name}
              </span>
            </motion.button>
          ))}
        </div>

        {/* CTA */}
        <div style={{ paddingBottom: '28px', flexShrink: 0 }}>
          <motion.button
            className="btn"
            onClick={() => setStep(2)}
            disabled={!country}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            style={{ marginTop: 0 }}
          >
            Continuar
          </motion.button>
        </div>

      </div>
    );
  }

  // Step 2: Add vehicle
  return (
    <div className="container" style={{ justifyContent: 'center', padding: '20px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ width: '100%' }}
      >
        <h2 style={{ color: 'white', margin: '0 0 6px', fontSize: '2rem', fontFamily: 'Saira Condensed, sans-serif', fontWeight: 700 }}>
          Agrega tu vehículo
        </h2>
        <p style={{ color: '#a0aec0', margin: '0 0 24px', fontSize: '1rem' }}>
          Opcional — mejora la precisión de la IA
        </p>

        <div className="input-row">
          <div className="input-group" style={{ margin: 0 }}>
            <label className="label" style={{ fontSize: '1.2rem' }}>Marca *</label>
            <input className="input" placeholder="Toyota" value={vehicle.brand}
              onChange={e => setVehicle(p => ({ ...p, brand: e.target.value }))} />
          </div>
          <div className="input-group" style={{ margin: 0 }}>
            <label className="label" style={{ fontSize: '1.2rem' }}>Modelo *</label>
            <input className="input" placeholder="Corolla" value={vehicle.model}
              onChange={e => setVehicle(p => ({ ...p, model: e.target.value }))} />
          </div>
        </div>
        <div className="input-row" style={{ marginTop: '12px' }}>
          <div className="input-group" style={{ margin: 0 }}>
            <label className="label" style={{ fontSize: '1.2rem' }}>Año *</label>
            <input className="input" type="number" placeholder="2020" min="1990" max="2026"
              value={vehicle.year}
              onChange={e => setVehicle(p => ({ ...p, year: e.target.value }))} />
          </div>
          <div className="input-group" style={{ margin: 0 }}>
            <label className="label" style={{ fontSize: '1.2rem' }}>Color</label>
            <input className="input" placeholder="Blanco" value={vehicle.color}
              onChange={e => setVehicle(p => ({ ...p, color: e.target.value }))} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <motion.button className="btn" style={{ marginTop: 0 }}
            onClick={() => finalize(true)}
            disabled={!vehicle.brand || !vehicle.model || !vehicle.year}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            Guardar y Empezar
          </motion.button>
          <motion.button className="btn btn-secondary" style={{ marginTop: 0 }}
            onClick={() => finalize(false)}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            Omitir
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default OnboardingScreen;
