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
      setError('Error al analizar la imagen. Verifica tu conexión e intenta de nuevo.');
    } finally {
      setAnalyzing(false);
    }
  };

  const formatSize = (bytes) => {
    const k = 1024;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(1)} ${['B','KB','MB'][i]}`;
  };

  return (
    <div className="container">
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.button
          onClick={() => navigate('/')}
          style={{ background: 'none', border: 'none', color: '#a0aec0', cursor: 'pointer', fontSize: '1.2rem', marginBottom: '16px', padding: 0, display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Saira Condensed, sans-serif' }}
          whileHover={{ x: -3 }}
        >
          ← Volver
        </motion.button>

        <h2 style={{ color: 'white', fontSize: '2rem', fontFamily: 'Saira Condensed, sans-serif', fontWeight: 700, marginBottom: '6px' }}>
          Escanear Pieza
        </h2>
        <p style={{ color: '#a0aec0', fontSize: '1.2rem', marginBottom: '24px' }}>
          Sube o toma una foto de la pieza que quieres identificar
        </p>

        {/* Vehicle Picker */}
        {vehicles.length > 0 && (
          <div className="input-group" style={{ marginTop: 0, marginBottom: '20px' }}>
            <label className="label">Vehículo (opcional)</label>
            <select
              className="input"
              value={selectedVehicleId}
              onChange={e => setSelectedVehicleId(e.target.value)}
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

        {/* Upload Area */}
        <label
          htmlFor="photo-input"
          className="upload-area"
          style={{ display: 'block', cursor: 'pointer' }}
          onDragOver={e => e.preventDefault()}
          onDrop={e => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
        >
          <div className="upload-icon">📷</div>
          <p className="upload-text">Toca para seleccionar imagen</p>
          <p className="upload-hint">o arrastra y suelta aquí</p>
          <input
            id="photo-input"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={e => handleFile(e.target.files[0])}
          />
        </label>

        {/* Camera Button */}
        <input
          id="camera-input"
          type="file"
          accept="image/*"
          capture="environment"
          style={{ display: 'none' }}
          onChange={e => handleFile(e.target.files[0])}
        />
        <motion.button
          className="btn btn-secondary"
          onClick={() => document.getElementById('camera-input').click()}
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        >
          📸 Tomar Foto con Cámara
        </motion.button>

        {/* Preview */}
        {preview && (
          <motion.div
            className="image-preview"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h4>Vista previa</h4>
            <div className="preview-container">
              <img src={preview} alt="Pieza seleccionada" className="preview-image" />
              <div style={{ color: '#a0aec0', fontSize: '0.85rem', marginTop: '8px' }}>
                {file?.name} · {formatSize(file?.size || 0)}
              </div>
              <button
                className="btn btn-secondary clear-button"
                onClick={() => { setFile(null); setPreview(null); }}
                style={{ marginTop: '10px' }}
              >
                Cambiar imagen
              </button>
            </div>
          </motion.div>
        )}

        {error && <div className="error">{error}</div>}

        <motion.button
          className="btn"
          onClick={handleAnalyze}
          disabled={!file || analyzing}
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        >
          {analyzing ? (
            <><span className="loading" />Analizando con IA...</>
          ) : (
            'Analizar Imagen'
          )}
        </motion.button>

        <div style={{ marginTop: '24px', color: '#4a5568', fontSize: '0.9rem', lineHeight: 1.7 }}>
          <strong style={{ color: '#a0aec0' }}>Consejos:</strong>
          <br />• Buena iluminación y enfoque claro
          <br />• Encuadra bien la pieza, sin sombras
          <br />• Funciona con cualquier pieza del vehículo
        </div>
      </motion.div>
    </div>
  );
};

export default PhotoUploadScreen;
