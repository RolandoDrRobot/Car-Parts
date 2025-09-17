import React from 'react';
import { useNavigate } from 'react-router-dom';

const CarInfoScreen = ({ carData, onConfirm }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    onConfirm(carData);
    navigate('/photo-upload');
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <div className="card">
        <p className="subtitle">
          Verify that this is the correct information for your vehicle
        </p>

        <div className="car-info">
          <h3>🚗 Vehicle Information</h3>
          
          {/* Desktop Grid Layout */}
          <div className="info-grid">
            <div className="info-card">
              <div className="info-card-header">
                <span className="info-card-icon">🏷️</span>
                <h4 className="info-card-title">Basic Info</h4>
              </div>
              <div className="info-row">
                <span className="info-label">License Plate:</span>
                <span className="info-value">{carData.plate}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Brand:</span>
                <span className="info-value">{carData.brand}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Model:</span>
                <span className="info-value">{carData.model}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Year:</span>
                <span className="info-value">{carData.year}</span>
              </div>
            </div>
            
            <div className="info-card">
              <div className="info-card-header">
                <span className="info-card-icon">🎨</span>
                <h4 className="info-card-title">Appearance</h4>
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
              <div className="info-item-label">License Plate</div>
              <div className="info-item-value">{carData.plate}</div>
            </div>
            <div className="info-item">
              <div className="info-item-label">Brand</div>
              <div className="info-item-value">{carData.brand}</div>
            </div>
            <div className="info-item">
              <div className="info-item-label">Model</div>
              <div className="info-item-value">{carData.model}</div>
            </div>
            <div className="info-item">
              <div className="info-item-label">Year</div>
              <div className="info-item-value">{carData.year}</div>
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
            <div className="info-item">
              <div className="info-item-label">Fuel Type</div>
              <div className="info-item-value">{carData.fuelType}</div>
            </div>
          </div>
        </div>


        <div className="success">
          ✅ Information verified successfully
        </div>

        <button 
          className="btn"
          onClick={handleConfirm}
        >
          Confirm and Continue
        </button>

        <button 
          className="btn btn-secondary"
          onClick={handleGoBack}
        >
          Back to Search
        </button>
      </div>
    </div>
  );
};

export default CarInfoScreen;
