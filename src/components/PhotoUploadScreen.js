import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ScanLine, Camera, AlertTriangle } from 'lucide-react';
import { useVehicles } from '../contexts/VehiclesContext';
import { analyzeCarPart, analyzeWarningLight } from '../data/fakeData';
import { screen, section, item, btn, backBtn } from '../utils/animations';

const MODES = {
  scan: {
    title: 'Escanear Pieza',
    subtitle: 'Foto de cualquier pieza del vehículo',
    hint: 'o arrastra y suelta',
    label: 'Toca para seleccionar',
    analyze: analyzeCarPart,
  },
  lights: {
    title: 'Luz de Tablero',
    subtitle: 'Fotografía la luz de advertencia encendida',
    hint: 'Acerca la cámara al tablero',
    label: 'Foto del tablero',
    analyze: analyzeWarningLight,
  },
};

const PhotoUploadScreen = ({ vehicle: passedVehicle = null, mode: modeProp, onClose, onAnalyzed }) => {
  const { vehicles } = useVehicles();

  const mode = MODES[modeProp] ? modeProp : 'scan';
  const cfg  = MODES[mode];

  const [selectedVehicleId, setSelectedVehicleId] = useState(passedVehicle?.id || '');
  const [file, setFile]         = useState(null);
  const [preview, setPreview]   = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError]       = useState('');
  const [dragging, setDragging] = useState(false);

  const selectedVehicle = vehicles.find(v => v.id === selectedVehicleId) || null;

  const handleFile = (f) => {
    if (!f) return;
    setFile(f);
    setError('');
    const reader = new FileReader();
    reader.onload = e => setPreview(e.target.result);
    reader.readAsDataURL(f);
  };

  const handleAnalyze = async () => {
    if (!file) { setError('Selecciona una imagen primero'); return; }
    setAnalyzing(true);
    setError('');
    try {
      const result = await cfg.analyze(file, selectedVehicle);
      onAnalyzed(result, selectedVehicle);
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
        <motion.button onClick={onClose} {...backBtn}
          style={{ background: 'none', border: 'none', color: '#a0aec0', cursor: 'pointer', fontSize: '1rem', padding: 0, display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Saira Condensed, sans-serif', marginBottom: '14px' }}>
          <ArrowLeft size={16} /> Volver
        </motion.button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          {mode === 'lights' ? <AlertTriangle size={24} color="#f59e0b" /> : <ScanLine size={24} color="#ef4444" />}
          <h2 style={{ color: 'white', fontSize: '2rem', fontFamily: 'Saira Condensed, sans-serif', fontWeight: 700, margin: 0 }}>
            {cfg.title}
          </h2>
        </div>
        <p style={{ color: '#a0aec0', fontSize: '1rem', margin: 0 }}>
          {cfg.subtitle}
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

      {/* ── UPLOAD / PREVIEW ── */}
      <motion.div variants={section}
        style={{ flex: 1, padding: '14px 20px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        {!preview ? (
          <label htmlFor="photo-input"
            style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', cursor: 'pointer',
              border: dragging
                ? `2px dashed ${mode === 'lights' ? '#f59e0b' : '#ef4444'}`
                : `2px dashed ${mode === 'lights' ? 'rgba(245,158,11,0.4)' : 'rgba(239,68,68,0.4)'}`,
              borderRadius: '12px',
              background: dragging
                ? `${mode === 'lights' ? 'rgba(245,158,11,0.1)' : 'rgba(239,68,68,0.1)'}`
                : `${mode === 'lights' ? 'rgba(245,158,11,0.03)' : 'rgba(239,68,68,0.03)'}`,
              transition: 'border-color 0.15s, background 0.15s',
            }}
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
          >
            <motion.span animate={{ y: [0, -6, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ marginBottom: '12px', display: 'flex', color: mode === 'lights' ? 'rgba(245,158,11,0.7)' : 'rgba(239,68,68,0.7)' }}>
              {mode === 'lights' ? <AlertTriangle size={56} /> : <ScanLine size={56} />}
            </motion.span>
            <p style={{ color: '#e2e8f0', fontSize: '1.4rem', fontFamily: 'Saira Condensed, sans-serif', fontWeight: 600, margin: '0 0 6px' }}>
              {dragging ? 'Suelta la imagen' : cfg.label}
            </p>
            <p style={{ color: '#4a5568', fontSize: '0.9rem', margin: 0 }}>{cfg.hint}</p>
            <input id="photo-input" type="file" accept="image/*" style={{ display: 'none' }}
              onChange={e => handleFile(e.target.files[0])} />
          </label>
        ) : (
          <motion.div variants={item}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 0 }}>
            <img src={preview} alt="Foto"
              style={{ flex: 1, minHeight: 0, maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', borderRadius: '10px', border: '2px solid rgba(255,255,255,0.1)' }} />
            <button onClick={() => { setFile(null); setPreview(null); setError(''); }}
              style={{ background: 'none', border: 'none', color: '#a0aec0', cursor: 'pointer', fontSize: '0.85rem', marginTop: '8px', fontFamily: 'Saira Condensed, sans-serif' }}>
              Cambiar imagen
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* ── FOOTER ── */}
      <motion.div variants={section} style={{ padding: '0 20px 24px', flexShrink: 0 }}>
        {error && <div className="error" style={{ marginBottom: '8px' }}>{error}</div>}
        <input id="camera-input" type="file" accept="image/*" capture="environment"
          style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
        {!preview ? (
          <motion.button className="btn btn-secondary"
            onClick={() => document.getElementById('camera-input').click()} {...btn}
            style={{ marginTop: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Camera size={18} /> Tomar Foto con Cámara
          </motion.button>
        ) : (
          <motion.button className="btn" onClick={handleAnalyze} disabled={analyzing} {...btn}
            style={{ marginTop: 0 }}>
            {analyzing ? <><span className="loading" />Analizando con IA...</> : 'Analizar Imagen'}
          </motion.button>
        )}
      </motion.div>

    </motion.div>
  );
};

export default PhotoUploadScreen;
