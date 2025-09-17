import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { simulateAIIdentification } from '../data/fakeData';

const PhotoUploadScreen = ({ carData }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setError('');
      
      // Create image preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    // Trigger the hidden camera input
    const cameraInput = document.getElementById('camera-input');
    if (cameraInput) {
      cameraInput.click();
    }
  };


  const handleClearImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setError('');
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError('Por favor selecciona una imagen primero');
      return;
    }

    setIsAnalyzing(true);
    setError('');

    try {
      // Enviar imagen a ChatGPT para análisis
      const result = await simulateAIIdentification(selectedFile, carData);
      
      // Navigate to analysis report screen with the results
      navigate('/analysis-report', { 
        state: { 
          carData, 
          analysisResult: result 
        } 
      });
    } catch (err) {
      console.error('Error en análisis:', err);
      setError('Error al analizar la imagen con ChatGPT. Por favor intenta de nuevo.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleStartOver = () => {
    navigate('/');
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="container">
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.p 
          className="subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Sube una foto de la pieza del vehículo que necesitas identificar
        </motion.p>

        <div className="car-info">
          <h3>Vehículo Seleccionado</h3>
          
          {/* Desktop Grid Layout */}
          <div className="info-grid">
            <div className="info-card">
              <div className="info-card-header">
                <h4 className="info-card-title">Detalles del Vehículo</h4>
              </div>
              <div className="info-row">
                <span className="info-label">Vehículo:</span>
                <span className="info-value">{carData.brand} {carData.model} {carData.year}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Placa de Matrícula:</span>
                <span className="info-value">{carData.plate}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Color:</span>
                <span className="info-value">{carData.color}</span>
              </div>
            </div>
            
          </div>
          
        </div>

        <div className="input-group">
          <label htmlFor="photo" className="label">
            Select Image
          </label>
          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={handleFileSelect}
            className="input"
            style={{ padding: '10px' }}
          />
        </div>

        <div className="camera-section">
          <motion.button 
            type="button"
            className="btn btn-secondary"
            onClick={handleCameraCapture}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            style={{ marginTop: '10px' }}
          >
            Tomar Foto con Cámara
          </motion.button>
          
          {/* Hidden camera input */}
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
            id="camera-input"
          />
        </div>

        {selectedFile && (
          <motion.div 
            className="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Archivo seleccionado: {selectedFile.name} ({formatFileSize(selectedFile.size)})
          </motion.div>
        )}

        {imagePreview && (
          <motion.div 
            className="image-preview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h4>Imagen Seleccionada:</h4>
            <div className="preview-container">
              <img 
                src={imagePreview} 
                alt="Selected part"
                className="preview-image"
              />
              <button 
                className="btn btn-secondary clear-button"
                onClick={handleClearImage}
                style={{ marginTop: '10px' }}
              >
                Limpiar Imagen
              </button>
            </div>
          </motion.div>
        )}

        {error && <div className="error">{error}</div>}

        <motion.button 
          className="btn"
          onClick={handleAnalyze}
          disabled={!selectedFile || isAnalyzing}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {isAnalyzing ? (
            <>
              <span className="loading"></span>
              Analizando con IA...
            </>
          ) : (
            'Analizar Imagen'
          )}
        </motion.button>


        <button 
          className="btn btn-secondary"
          onClick={handleStartOver}
          style={{ marginTop: '20px' }}
        >
          Buscar Otro Vehículo
        </button>

        <div style={{ marginTop: '30px', fontSize: '0.9rem', color: '#a0aec0' }}>
          <p><strong>Consejos para mejores resultados:</strong></p>
          <p>• Toma la foto con buena iluminación</p>
          <p>• Enfoca bien en la pieza específica</p>
          <p>• Evita sombras y reflejos</p>
        </div>
      </motion.div>
    </div>
  );
};

export default PhotoUploadScreen;
