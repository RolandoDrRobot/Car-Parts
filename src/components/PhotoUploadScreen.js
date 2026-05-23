import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useVehicles } from '../contexts/VehiclesContext';
import { analyzeCarPart } from '../data/fakeData';

const PhotoUploadScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { vehicles } = useVehicles();

  const passedVehicle = location.state?.vehicle || null;
  const [selectedVehicleId, setSelectedVehicleId] = useState(passedVehicle?.id || '');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState('');

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
      const result = await analyzeCarPart(file, selectedVehicle);
      navigate('/results', { state: { result, vehicle: selectedVehicle } });
    } catch (err) {
      console.error(err);
      setError('Error al analizar. Verifica tu conexión e intenta de nuevo.');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="container">

      {/* ── HEADER ── */}
      <div style={{ padding: '20px 20px 0', flexShrink: 0 }}>
        <motion.button
          onClick={() => navigate('/')}
          whileHover={{ x: -3 }}
          style={{ background: 'none', border: 'none', color: '#a0aec0', cursor: 'pointer', fontSize: '1rem', padding: 0, display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Saira Condensed, sans-serif', marginBottom: '14px' }}
        >
          ← Volver
        </motion.button>
        <h2 style={{ color: 'white', fontSize: '2rem', fontFamily: 'Saira Condensed, sans-serif', fontWeight: 700, margin: '0 0 4px' }}>
          Escanear Pieza
        </h2>
        <p style={{ color: '#a0aec0', fontSize: '1rem', margin: 0 }}>
          Foto de cualquier pieza del vehículo
        </p>
      </div>

      {/* ── VEHICLE PICKER ── */}
      {vehicles.length > 0 && (
        <div style={{ padding: '14px 20px 0', flexShrink: 0 }}>
          <select
            className="input"
            value={selectedVehicleId}
            onChange={e => setSelectedVehicleId(e.target.value)}
            style={{ padding: '12px 16px', fontSize: '1.1rem' }}
          >
            <option value="">Sin contexto de vehículo</option>
            {vehicles.map(v => (
              <option key={v.id} value={v.id}>
                {v.brand} {v.model} {v.year}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* ── UPLOAD / PREVIEW (fills remaining space) ── */}
      <div style={{ flex: 1, padding: '14px 20px', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        {!preview ? (
          /* Drop zone */
          <label
            htmlFor="photo-input"
            style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', cursor: 'pointer',
              border: '2px dashed rgba(239,68,68,0.5)', borderRadius: '12px',
              background: 'rgba(239,68,68,0.04)',
              transition: 'all 0.2s',
            }}
            onDragOver={e => e.preventDefault()}
            onDrop={e => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
          >
            <span style={{ fontSize: '3.5rem', marginBottom: '12px' }}>📷</span>
            <p style={{ color: '#e2e8f0', fontSize: '1.4rem', fontFamily: 'Saira Condensed, sans-serif', fontWeight: 600, margin: '0 0 6px' }}>
              Toca para seleccionar
            </p>
            <p style={{ color: '#4a5568', fontSize: '0.9rem', margin: 0 }}>
              o arrastra y suelta
            </p>
            <input id="photo-input" type="file" accept="image/*" style={{ display: 'none' }}
              onChange={e => handleFile(e.target.files[0])} />
          </label>
        ) : (
          /* Image preview */
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 0 }}>
            <img
              src={preview} alt="Pieza"
              style={{ flex: 1, minHeight: 0, maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', borderRadius: '10px', border: '2px solid rgba(255,255,255,0.1)' }}
            />
            <button
              onClick={() => { setFile(null); setPreview(null); setError(''); }}
              style={{ background: 'none', border: 'none', color: '#a0aec0', cursor: 'pointer', fontSize: '0.85rem', marginTop: '8px', fontFamily: 'Saira Condensed, sans-serif' }}
            >
              Cambiar imagen
            </button>
          </div>
        )}
      </div>

      {/* ── FOOTER: error + buttons ── */}
      <div style={{ padding: '0 20px 24px', flexShrink: 0 }}>
        {error && <div className="error" style={{ marginBottom: '8px' }}>{error}</div>}

        <input id="camera-input" type="file" accept="image/*" capture="environment"
          style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />

        {!preview ? (
          <motion.button
            className="btn btn-secondary"
            onClick={() => document.getElementById('camera-input').click()}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            style={{ marginTop: 0 }}
          >
            📸 Tomar Foto con Cámara
          </motion.button>
        ) : (
          <motion.button
            className="btn"
            onClick={handleAnalyze}
            disabled={analyzing}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            style={{ marginTop: 0 }}
          >
            {analyzing
              ? <><span className="loading" />Analizando con IA...</>
              : 'Analizar Imagen'}
          </motion.button>
        )}
      </div>

    </div>
  );
};

export default PhotoUploadScreen;
