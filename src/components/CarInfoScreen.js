import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

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
          Verify that this is the correct information for your vehicle
        </motion.p>

        <motion.div 
          className="car-info"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3>Vehicle Information</h3>
          
          {/* Desktop Grid Layout */}
          <motion.div 
            className="info-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
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
          </motion.div>
          
        </motion.div>



        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {isEditing ? (
            <>
              <motion.button 
                className="btn"
                onClick={handleSave}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                Save Changes
              </motion.button>
              <motion.button 
                className="btn btn-secondary"
                onClick={handleCancel}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                Cancel
              </motion.button>
            </>
          ) : (
            <>
              <motion.button 
                className="btn"
                onClick={handleEdit}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                Edit Information
              </motion.button>
              <motion.button 
                className="btn"
                onClick={handleConfirm}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                Confirm and Continue
              </motion.button>
              <motion.button 
                className="btn btn-secondary"
                onClick={handleGoBack}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                Back to Search
              </motion.button>
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CarInfoScreen;
