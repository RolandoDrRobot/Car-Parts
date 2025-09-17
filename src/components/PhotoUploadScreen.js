import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { simulateAIIdentification } from '../data/fakeData';

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
      setError('Please select an image first');
      return;
    }

    setIsAnalyzing(true);
    setError('');

    try {
      const result = await simulateAIIdentification(selectedFile);
      setAnalysisResult(result);
    } catch (err) {
      setError('Error analyzing the image. Please try again.');
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
          Upload a photo of the vehicle part you need to identify
        </motion.p>

        <div className="car-info">
          <h3>Selected Vehicle</h3>
          
          {/* Desktop Grid Layout */}
          <div className="info-grid">
            <div className="info-card">
              <div className="info-card-header">
                <h4 className="info-card-title">Vehicle Details</h4>
              </div>
              <div className="info-row">
                <span className="info-label">Vehicle:</span>
                <span className="info-value">{carData.brand} {carData.model} {carData.year}</span>
              </div>
              <div className="info-row">
                <span className="info-label">License Plate:</span>
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

        {selectedFile && (
          <div className="success">
            File selected: {selectedFile.name} ({formatFileSize(selectedFile.size)})
          </div>
        )}

        {error && <div className="error">{error}</div>}

        <motion.button 
          className="btn"
          onClick={handleAnalyze}
          disabled={!selectedFile || isAnalyzing}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {isAnalyzing ? (
            <>
              <span className="loading"></span>
              Analyzing with AI...
            </>
          ) : (
            'Analyze Image'
          )}
        </motion.button>

        {analysisResult && (
          <motion.div 
            className="part-result"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h3>Analysis Result</h3>
            
            {/* Desktop Grid Layout */}
            <div className="info-grid">
              <div className="info-card">
                <div className="info-card-header">
                  <h4 className="info-card-title">Part Identification</h4>
                </div>
                <div className="info-row">
                  <span className="info-label">Identified Part:</span>
                  <span className="info-value">{analysisResult.identifiedPart.name}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Part Number:</span>
                  <span className="info-value">{analysisResult.identifiedPart.partNumber}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">AI Confidence:</span>
                  <span className="info-value">{analysisResult.confidence}%</span>
                </div>
              </div>
              
              <div className="info-card">
                <div className="info-card-header">
                  <h4 className="info-card-title">Pricing & Availability</h4>
                </div>
                <div className="info-row">
                  <span className="info-label">Price:</span>
                  <span className="info-value">${analysisResult.identifiedPart.price}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Location:</span>
                  <span className="info-value">{analysisResult.identifiedPart.location}</span>
                </div>
                <div style={{ marginTop: '15px' }}>
                  <span className={`stock-status ${
                    analysisResult.identifiedPart.stock > 0 ? 'stock-available' : 'stock-unavailable'
                  }`}>
                    {analysisResult.identifiedPart.stock > 0 
                      ? `Available (${analysisResult.identifiedPart.stock} units)`
                      : 'Out of Stock'
                    }
                  </span>
                </div>
              </div>
            </div>
            

            <div style={{ marginTop: '20px' }}>
              <h4>Recommendations:</h4>
              <ul style={{ textAlign: 'left', marginTop: '10px' }}>
                {analysisResult.recommendations.map((rec, index) => (
                  <li key={index} style={{ marginBottom: '5px' }}>{rec}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        <button 
          className="btn btn-secondary"
          onClick={handleStartOver}
          style={{ marginTop: '20px' }}
        >
          Search Another Vehicle
        </button>

        <div style={{ marginTop: '30px', fontSize: '0.9rem', color: '#a0aec0' }}>
          <p><strong>Tips for better results:</strong></p>
          <p>• Take the photo with good lighting</p>
          <p>• Focus well on the specific part</p>
          <p>• Avoid shadows and reflections</p>
        </div>
      </motion.div>
    </div>
  );
};

export default PhotoUploadScreen;
