import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSettings } from '../contexts/SettingsContext';
import { useVehicles } from '../contexts/VehiclesContext';
import { screen, section, sectionStagger, item, btn, selectable } from '../utils/animations';

const COUNTRIES = [
  { code: 'CR', name: 'Costa Rica', flag: '🇨🇷' },
  { code: 'MX', name: 'México',     flag: '🇲🇽' },
  { code: 'CO', name: 'Colombia',   flag: '🇨🇴' },
  { code: 'AR', name: 'Argentina',  flag: '🇦🇷' },
  { code: 'CL', name: 'Chile',      flag: '🇨🇱' },
  { code: 'US', name: 'EE.UU.',     flag: '🇺🇸' },
];

const emptyVehicle = { brand: '', model: '', year: '', color: '', engine: '', fuel: '', transmission: '' };

const inputStyle = { padding: '12px 14px', fontSize: '1rem' };

const OnboardingScreen = () => {
  const [step, setStep]       = useState(1);
  const [country, setCountry] = useState(null);
  const [vehicle, setVehicle] = useState(emptyVehicle);
  const { updateSettings } = useSettings();
  const { addVehicle }     = useVehicles();
  const navigate           = useNavigate();

  const finalize = (withVehicle) => {
    updateSettings({ country, setupComplete: true });
    if (withVehicle && vehicle.brand && vehicle.model && vehicle.year) {
      addVehicle(vehicle);
    }
    navigate('/');
  };

  // ── Step 1: Country ──────────────────────────────────────────────────────────
  if (step === 1) {
    return (
      <motion.div className="container" style={{ padding: '0 20px' }}
        variants={screen} initial="initial" animate="animate">

        <motion.div variants={section} style={{ paddingTop: '32px', textAlign: 'center', flexShrink: 0 }}>
          <h1 className="title" style={{ marginBottom: '4px' }}>CarParts</h1>
          <p style={{ color: '#a0aec0', fontSize: '1.1rem', margin: '0 0 6px', fontFamily: 'Saira Condensed, sans-serif' }}>
            Tu mecánico personal con IA
          </p>
          <p style={{ color: '#4a5568', fontSize: '0.9rem', margin: 0 }}>Selecciona tu país para empezar:</p>
        </motion.div>

        <motion.div variants={sectionStagger} style={{
          flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
          gridTemplateRows: '1fr 1fr', gap: '10px',
          padding: '16px 0', minHeight: 0,
        }}>
          {COUNTRIES.map(c => (
            <motion.button key={c.code} variants={item} {...selectable}
              onClick={() => setCountry(c.code)}
              style={{
                background: country === c.code ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.04)',
                border: country === c.code ? '2px solid #ef4444' : '2px solid rgba(255,255,255,0.07)',
                borderRadius: '10px', cursor: 'pointer', color: 'white',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px',
              }}>
              <span style={{ fontSize: '1.8rem' }}>{c.flag}</span>
              <span style={{ fontSize: '0.85rem', fontFamily: 'Saira Condensed, sans-serif', fontWeight: 600 }}>
                {c.name}
              </span>
            </motion.button>
          ))}
        </motion.div>

        <motion.div variants={section} style={{ paddingBottom: '28px', flexShrink: 0 }}>
          <motion.button className="btn" onClick={() => setStep(2)} disabled={!country} {...btn}
            style={{ marginTop: 0 }}>
            Continuar
          </motion.button>
        </motion.div>

      </motion.div>
    );
  }

  // ── Step 2: Add vehicle ──────────────────────────────────────────────────────
  const canSave = vehicle.brand && vehicle.model && vehicle.year;

  return (
    <motion.div className="container" style={{ padding: '24px 20px' }}
      variants={screen} initial="initial" animate="animate">

      <motion.div variants={section} style={{ flexShrink: 0, marginBottom: '6px' }}>
        <h2 style={{ color: 'white', margin: '0 0 4px', fontSize: '2rem', fontFamily: 'Saira Condensed, sans-serif', fontWeight: 700 }}>
          Agrega tu vehículo
        </h2>
        <p style={{ color: '#a0aec0', margin: 0, fontSize: '1rem' }}>
          Opcional — mejora la precisión de los diagnósticos
        </p>
      </motion.div>

      <motion.div variants={sectionStagger}
        style={{ flex: 1, overflowY: 'auto', minHeight: 0, paddingTop: '16px' }}>

        {/* Required fields */}
        <motion.div variants={item}>
          <p style={{ color: '#6b7280', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 8px', fontFamily: 'Saira Condensed, sans-serif' }}>
            Datos básicos *
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
            <input className="input" placeholder="Marca (Toyota)" value={vehicle.brand}
              onChange={e => setVehicle(p => ({ ...p, brand: e.target.value }))}
              style={inputStyle} />
            <input className="input" placeholder="Modelo (Corolla)" value={vehicle.model}
              onChange={e => setVehicle(p => ({ ...p, model: e.target.value }))}
              style={inputStyle} />
            <input className="input" type="number" placeholder="Año (2020)"
              min="1990" max={new Date().getFullYear() + 1}
              value={vehicle.year}
              onChange={e => setVehicle(p => ({ ...p, year: e.target.value }))}
              style={inputStyle} />
            <input className="input" placeholder="Color (opcional)" value={vehicle.color}
              onChange={e => setVehicle(p => ({ ...p, color: e.target.value }))}
              style={inputStyle} />
          </div>
        </motion.div>

        {/* Optional detail fields */}
        <motion.div variants={item}>
          <p style={{ color: '#6b7280', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', margin: '16px 0 8px', fontFamily: 'Saira Condensed, sans-serif' }}>
            Detalles del motor (opcional)
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <input className="input" placeholder="Motor (ej. 1.5L, 2.0T)" value={vehicle.engine}
              onChange={e => setVehicle(p => ({ ...p, engine: e.target.value }))}
              style={inputStyle} />
            <select className="input" value={vehicle.fuel}
              onChange={e => setVehicle(p => ({ ...p, fuel: e.target.value }))}
              style={inputStyle}>
              <option value="">Combustible</option>
              <option value="gasolina">Gasolina</option>
              <option value="diésel">Diésel</option>
              <option value="híbrido">Híbrido</option>
              <option value="eléctrico">Eléctrico</option>
            </select>
            <select className="input" value={vehicle.transmission}
              onChange={e => setVehicle(p => ({ ...p, transmission: e.target.value }))}
              style={{ ...inputStyle, gridColumn: '1 / -1' }}>
              <option value="">Transmisión</option>
              <option value="manual">Manual</option>
              <option value="automática">Automática</option>
              <option value="CVT">CVT</option>
            </select>
          </div>
        </motion.div>

      </motion.div>

      <motion.div variants={section} style={{ flexShrink: 0, paddingTop: '16px', display: 'flex', gap: '10px' }}>
        <motion.button className="btn" style={{ marginTop: 0, flex: 2 }}
          onClick={() => finalize(true)} disabled={!canSave} {...btn}>
          Guardar y Empezar
        </motion.button>
        <motion.button className="btn btn-secondary" style={{ marginTop: 0, flex: 1 }}
          onClick={() => finalize(false)} {...btn}>
          Omitir
        </motion.button>
      </motion.div>

    </motion.div>
  );
};

export default OnboardingScreen;
