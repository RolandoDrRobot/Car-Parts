import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
      <div className="card">
        <p className="subtitle">
          Upload a photo of the vehicle part you need to identify
        </p>

        <div className="car-info">
          <h3>🚗 Selected Vehicle</h3>
          
          {/* Desktop Grid Layout */}
          <div className="info-grid">
            <div className="info-card">
              <div className="info-card-header">
                <span className="info-card-icon">🚗</span>
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
            
            <div className="info-card">
              <div className="info-card-header">
                <span className="info-card-icon">⚙️</span>
                <h4 className="info-card-title">Technical Specs</h4>
              </div>
              <div className="info-row">
                <span className="info-label">Engine:</span>
                <span className="info-value">{carData.engine}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Transmission:</span>
                <span className="info-value">{carData.transmission}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Fuel Type:</span>
                <span className="info-value">{carData.fuelType}</span>
              </div>
            </div>
          </div>
          
          {/* Mobile Compact Layout */}
          <div className="info-compact">
            <div className="info-item">
              <div className="info-item-label">Vehicle</div>
              <div className="info-item-value">{carData.brand} {carData.model}</div>
            </div>
            <div className="info-item">
              <div className="info-item-label">Year</div>
              <div className="info-item-value">{carData.year}</div>
            </div>
            <div className="info-item">
              <div className="info-item-label">License Plate</div>
              <div className="info-item-value">{carData.plate}</div>
            </div>
            <div className="info-item">
              <div className="info-item-label">Color</div>
              <div className="info-item-value">{carData.color}</div>
            </div>
            <div className="info-item">
              <div className="info-item-label">Engine</div>
              <div className="info-item-value">{carData.engine}</div>
            </div>
            <div className="info-item">
              <div className="info-item-label">Transmission</div>
              <div className="info-item-value">{carData.transmission}</div>
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
            ✅ File selected: {selectedFile.name} ({formatFileSize(selectedFile.size)})
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
              Analyzing with AI...
            </>
          ) : (
            'Analyze Image'
          )}
        </button>

        {analysisResult && (
          <div className="part-result">
            <h3>🤖 Analysis Result</h3>
            
            {/* Desktop Grid Layout */}
            <div className="info-grid">
              <div className="info-card">
                <div className="info-card-header">
                  <span className="info-card-icon">🔍</span>
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
                  <span className="info-card-icon">💰</span>
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
                      ? `✅ Available (${analysisResult.identifiedPart.stock} units)`
                      : '❌ Out of Stock'
                    }
                  </span>
                </div>
              </div>
            </div>
            
            {/* Mobile Compact Layout */}
            <div className="info-compact">
              <div className="info-item">
                <div className="info-item-label">Part Name</div>
                <div className="info-item-value">{analysisResult.identifiedPart.name}</div>
              </div>
              <div className="info-item">
                <div className="info-item-label">Part Number</div>
                <div className="info-item-value">{analysisResult.identifiedPart.partNumber}</div>
              </div>
              <div className="info-item">
                <div className="info-item-label">Price</div>
                <div className="info-item-value">${analysisResult.identifiedPart.price}</div>
              </div>
              <div className="info-item">
                <div className="info-item-label">AI Confidence</div>
                <div className="info-item-value">{analysisResult.confidence}%</div>
              </div>
              <div className="info-item">
                <div className="info-item-label">Location</div>
                <div className="info-item-value">{analysisResult.identifiedPart.location}</div>
              </div>
              <div className="info-item">
                <div className="info-item-label">Stock</div>
                <div className="info-item-value">
                  {analysisResult.identifiedPart.stock > 0 
                    ? `${analysisResult.identifiedPart.stock} units`
                    : 'Out of Stock'
                  }
                </div>
              </div>
            </div>

            <div style={{ marginTop: '20px' }}>
              <h4>💡 Recommendations:</h4>
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
          Search Another Vehicle
        </button>

        <div style={{ marginTop: '30px', fontSize: '0.9rem', color: '#a0aec0' }}>
          <p><strong>💡 Tips for better results:</strong></p>
          <p>• Take the photo with good lighting</p>
          <p>• Focus well on the specific part</p>
          <p>• Avoid shadows and reflections</p>
        </div>
      </div>
    </div>
  );
};

export default PhotoUploadScreen;
