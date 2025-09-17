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
          Verifica que esta sea la información correcta de tu vehículo
        </motion.p>

        <motion.div 
          className="car-info"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3>Información del Vehículo</h3>
          
          {/* Vehicle Image */}
          {editedData.imageUrl && (
            <motion.div 
              className="vehicle-image-container"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h4>Vehicle Photo:</h4>
              <div className="vehicle-image-wrapper">
                <img 
                  src={editedData.imageUrl} 
                  alt={`${editedData.brand} ${editedData.model} ${editedData.year}`}
                  className="vehicle-image"
                />
              </div>
            </motion.div>
          )}
          
          {/* Desktop Grid Layout */}
          <motion.div 
            className="info-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="info-card">
              <div className="info-card-header">
                <h4 className="info-card-title">Información Básica</h4>
              </div>
              <div className="info-row">
                <span className="info-label">Placa de Matrícula:</span>
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
                <span className="info-label">Marca:</span>
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
                <span className="info-label">Modelo:</span>
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
                <span className="info-label">Año:</span>
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
                <h4 className="info-card-title">Apariencia</h4>
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
                <h4 className="info-card-title">Especificaciones Técnicas</h4>
              </div>
              <div className="info-row">
                <span className="info-label">Motor:</span>
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
                <span className="info-label">Transmisión:</span>
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
                <span className="info-label">Tipo de Combustible:</span>
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
                Guardar Cambios
              </motion.button>
              <motion.button 
                className="btn btn-secondary"
                onClick={handleCancel}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                Cancelar
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
                Editar Información
              </motion.button>
              <motion.button 
                className="btn"
                onClick={handleConfirm}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                Confirmar y Continuar
              </motion.button>
              <motion.button 
                className="btn btn-secondary"
                onClick={handleGoBack}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                Volver a Buscar
              </motion.button>
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CarInfoScreen;
