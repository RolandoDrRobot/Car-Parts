import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { simulateAIIdentification, fakePartsDatabase } from '../data/fakeData';

const PhotoUploadScreen = ({ carData }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setError('');
      setAnalysisResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError('Por favor selecciona una imagen primero');
      return;
    }

    setIsAnalyzing(true);
    setError('');

    try {
      const result = await simulateAIIdentification(selectedFile);
      setAnalysisResult(result);
    } catch (err) {
      setError('Error al analizar la imagen. Intenta de nuevo.');
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
      <div className="card">
        <h1 className="title">📸 Análisis con IA</h1>
        <p className="subtitle">
          Sube una foto de la parte del vehículo que necesitas identificar
        </p>

        <div className="car-info">
          <h3>🚗 Vehículo Seleccionado</h3>
          <div className="info-row">
            <span className="info-label">Vehículo:</span>
            <span className="info-value">{carData.brand} {carData.model} {carData.year}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Placa:</span>
            <span className="info-value">{carData.plate}</span>
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="photo" className="label">
            Seleccionar Imagen
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

        {selectedFile && (
          <div className="success">
            ✅ Archivo seleccionado: {selectedFile.name} ({formatFileSize(selectedFile.size)})
          </div>
        )}

        {error && <div className="error">{error}</div>}

        <button 
          className="btn"
          onClick={handleAnalyze}
          disabled={!selectedFile || isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <span className="loading"></span>
              Analizando con IA...
            </>
          ) : (
            'Analizar Imagen'
          )}
        </button>

        {analysisResult && (
          <div className="part-result">
            <h3>🤖 Resultado del Análisis</h3>
            <div className="info-row">
              <span className="info-label">Parte Identificada:</span>
              <span className="info-value">{analysisResult.identifiedPart.name}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Número de Parte:</span>
              <span className="info-value">{analysisResult.identifiedPart.partNumber}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Precio:</span>
              <span className="info-value">${analysisResult.identifiedPart.price}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Confianza IA:</span>
              <span className="info-value">{analysisResult.confidence}%</span>
            </div>
            <div className="info-row">
              <span className="info-label">Ubicación:</span>
              <span className="info-value">{analysisResult.identifiedPart.location}</span>
            </div>

            <div style={{ marginTop: '15px' }}>
              <span className={`stock-status ${
                analysisResult.identifiedPart.stock > 0 ? 'stock-available' : 'stock-unavailable'
              }`}>
                {analysisResult.identifiedPart.stock > 0 
                  ? `✅ Disponible (${analysisResult.identifiedPart.stock} unidades)`
                  : '❌ Agotado'
                }
              </span>
            </div>

            <div style={{ marginTop: '20px' }}>
              <h4>💡 Recomendaciones:</h4>
              <ul style={{ textAlign: 'left', marginTop: '10px' }}>
                {analysisResult.recommendations.map((rec, index) => (
                  <li key={index} style={{ marginBottom: '5px' }}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <button 
          className="btn btn-secondary"
          onClick={handleStartOver}
          style={{ marginTop: '20px' }}
        >
          Buscar Otro Vehículo
        </button>

        <div style={{ marginTop: '30px', fontSize: '0.9rem', color: '#666' }}>
          <p><strong>💡 Consejos para mejores resultados:</strong></p>
          <p>• Toma la foto con buena iluminación</p>
          <p>• Enfoca bien la parte específica</p>
          <p>• Evita sombras y reflejos</p>
        </div>
      </div>
    </div>
  );
};

export default PhotoUploadScreen;
