import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Stethoscope } from 'lucide-react';
import { useVehicles } from '../contexts/VehiclesContext';
import { analyzeSymptomsText } from '../data/fakeData';
import { screen, section, item, btn, backBtn } from '../utils/animations';

const EXAMPLES = [
  'Hace un ruido metálico al frenar',
  'El motor tiembla al arrancar en frío',
  'Se prende la luz de batería',
  'Vibra el volante a alta velocidad',
  'Huele a quemado cuando enciendo el A/C',
];

const SymptomsScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { vehicles } = useVehicles();

  const passedVehicle      = location.state?.vehicle || null;
  const [selectedVehicleId, setSelectedVehicleId] = useState(passedVehicle?.id || '');
  const [text, setText]     = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError]   = useState('');

  const selectedVehicle = vehicles.find(v => v.id === selectedVehicleId) || null;

  const handleAnalyze = async () => {
    if (!text.trim()) { setError('Describe el problema primero'); return; }
    setAnalyzing(true);
    setError('');
    try {
      const result = await analyzeSymptomsText(text.trim(), selectedVehicle);
      navigate('/results', { state: { result, vehicle: selectedVehicle } });
    } catch (err) {
      setError('Error al analizar. Verifica tu conexión e intenta de nuevo.');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <motion.div className="container" variants={screen} initial="initial" animate="animate">

      {/* ── HEADER ── */}
      <motion.div variants={section} style={{ padding: '20px 20px 0', flexShrink: 0 }}>
        <motion.button onClick={() => navigate('/')} {...backBtn}
          style={{ background: 'none', border: 'none', color: '#a0aec0', cursor: 'pointer', fontSize: '1rem', padding: 0, display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Saira Condensed, sans-serif', marginBottom: '14px' }}>
          <ArrowLeft size={16} /> Volver
        </motion.button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <Stethoscope size={24} color="#ef4444" />
          <h2 style={{ color: 'white', fontSize: '2rem', fontFamily: 'Saira Condensed, sans-serif', fontWeight: 700, margin: 0 }}>
            Describe el Problema
          </h2>
        </div>
        <p style={{ color: '#a0aec0', fontSize: '1rem', margin: 0 }}>
          Cuéntale al mecánico qué está pasando
        </p>
      </motion.div>

      {/* ── VEHICLE PICKER ── */}
      {vehicles.length > 0 && (
        <motion.div variants={section} style={{ padding: '14px 20px 0', flexShrink: 0 }}>
          <select className="input" value={selectedVehicleId}
            onChange={e => setSelectedVehicleId(e.target.value)}
            style={{ padding: '12px 16px', fontSize: '1rem' }}>
            <option value="">Sin contexto de vehículo</option>
            {vehicles.map(v => (
              <option key={v.id} value={v.id}>
                {v.brand} {v.model} {v.year}
              </option>
            ))}
          </select>
        </motion.div>
      )}

      {/* ── TEXT INPUT ── */}
      <motion.div variants={section}
        style={{ flex: 1, padding: '14px 20px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <textarea
          value={text}
          onChange={e => { setText(e.target.value); setError(''); }}
          placeholder="Ej: Cuando freno a alta velocidad hay un ruido metálico y el carro jala hacia un lado..."
          style={{
            flex: 1, width: '100%', background: 'rgba(255,255,255,0.05)',
            border: text ? '2px solid rgba(239,68,68,0.5)' : '2px solid rgba(255,255,255,0.1)',
            borderRadius: '12px', color: '#e2e8f0', fontSize: '1rem',
            fontFamily: 'Saira Condensed, sans-serif', padding: '16px',
            resize: 'none', outline: 'none', lineHeight: 1.6,
            transition: 'border-color 0.2s',
          }}
        />

        {/* Quick examples */}
        {!text && (
          <motion.div variants={item} style={{ marginTop: '10px' }}>
            <p style={{ color: '#4a5568', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 6px', fontFamily: 'Saira Condensed, sans-serif' }}>
              Ejemplos rápidos
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {EXAMPLES.map(ex => (
                <button key={ex} onClick={() => setText(ex)}
                  style={{
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '20px', padding: '5px 12px', color: '#a0aec0',
                    fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'Saira Condensed, sans-serif',
                    fontWeight: 600,
                  }}>
                  {ex}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* ── FOOTER ── */}
      <motion.div variants={section} style={{ padding: '0 20px 24px', flexShrink: 0 }}>
        {error && <div className="error" style={{ marginBottom: '8px', fontSize: '0.9rem' }}>{error}</div>}
        <motion.button className="btn" onClick={handleAnalyze} disabled={analyzing || !text.trim()} {...btn}
          style={{ marginTop: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          {analyzing
            ? <><span className="loading" />Diagnosticando...</>
            : <><Stethoscope size={18} /> Diagnosticar</>}
        </motion.button>
      </motion.div>

    </motion.div>
  );
};

export default SymptomsScreen;
