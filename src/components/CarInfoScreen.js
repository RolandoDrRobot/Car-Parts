import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CarInfoScreen = ({ carData, onConfirm }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(carData);

  const handleConfirm = () => {
    onConfirm(editedData);
    navigate('/photo-upload');
  };

  const handleGoBack = () => {
    navigate('/');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    setEditedData(editedData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(carData);
  };

  const handleInputChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="container">
      <div className="card">
        <p className="subtitle">
          Verify that this is the correct information for your vehicle
        </p>

        <div className="car-info">
          <h3>Vehicle Information</h3>
          
          {/* Desktop Grid Layout */}
          <div className="info-grid">
            <div className="info-card">
              <div className="info-card-header">
                <h4 className="info-card-title">Basic Info</h4>
              </div>
              <div className="info-row">
                <span className="info-label">License Plate:</span>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={editedData.plate} 
                    onChange={(e) => handleInputChange('plate', e.target.value)}
                    className="edit-input"
                  />
                ) : (
                  <span className="info-value">{editedData.plate}</span>
                )}
              </div>
              <div className="info-row">
                <span className="info-label">Brand:</span>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={editedData.brand} 
                    onChange={(e) => handleInputChange('brand', e.target.value)}
                    className="edit-input"
                  />
                ) : (
                  <span className="info-value">{editedData.brand}</span>
                )}
              </div>
              <div className="info-row">
                <span className="info-label">Model:</span>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={editedData.model} 
                    onChange={(e) => handleInputChange('model', e.target.value)}
                    className="edit-input"
                  />
                ) : (
                  <span className="info-value">{editedData.model}</span>
                )}
              </div>
              <div className="info-row">
                <span className="info-label">Year:</span>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={editedData.year} 
                    onChange={(e) => handleInputChange('year', e.target.value)}
                    className="edit-input"
                  />
                ) : (
                  <span className="info-value">{editedData.year}</span>
                )}
              </div>
            </div>
            
            <div className="info-card">
              <div className="info-card-header">
                <h4 className="info-card-title">Appearance</h4>
              </div>
              <div className="info-row">
                <span className="info-label">Color:</span>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={editedData.color} 
                    onChange={(e) => handleInputChange('color', e.target.value)}
                    className="edit-input"
                  />
                ) : (
                  <span className="info-value">{editedData.color}</span>
                )}
              </div>
            </div>
            
            <div className="info-card">
              <div className="info-card-header">
                <h4 className="info-card-title">Technical Specs</h4>
              </div>
              <div className="info-row">
                <span className="info-label">Engine:</span>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={editedData.engine} 
                    onChange={(e) => handleInputChange('engine', e.target.value)}
                    className="edit-input"
                  />
                ) : (
                  <span className="info-value">{editedData.engine}</span>
                )}
              </div>
              <div className="info-row">
                <span className="info-label">Transmission:</span>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={editedData.transmission} 
                    onChange={(e) => handleInputChange('transmission', e.target.value)}
                    className="edit-input"
                  />
                ) : (
                  <span className="info-value">{editedData.transmission}</span>
                )}
              </div>
              <div className="info-row">
                <span className="info-label">Fuel Type:</span>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={editedData.fuelType} 
                    onChange={(e) => handleInputChange('fuelType', e.target.value)}
                    className="edit-input"
                  />
                ) : (
                  <span className="info-value">{editedData.fuelType}</span>
                )}
              </div>
            </div>
          </div>
          
        </div>



        {isEditing ? (
          <>
            <button 
              className="btn"
              onClick={handleSave}
            >
              Save Changes
            </button>
            <button 
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button 
              className="btn"
              onClick={handleEdit}
            >
              Edit Information
            </button>
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
          </>
        )}
      </div>
    </div>
  );
};

export default CarInfoScreen;
