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
        <h1 className="title">📋 Información del Vehículo</h1>
        <p className="subtitle">
          Verifica que esta es la información correcta de tu vehículo
        </p>

        <div className="car-info">
          <h3>🚗 Datos del Vehículo</h3>
          <div className="info-row">
            <span className="info-label">Placa:</span>
            <span className="info-value">{carData.plate}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Marca:</span>
            <span className="info-value">{carData.brand}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Modelo:</span>
            <span className="info-value">{carData.model}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Año:</span>
            <span className="info-value">{carData.year}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Color:</span>
            <span className="info-value">{carData.color}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Motor:</span>
            <span className="info-value">{carData.engine}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Transmisión:</span>
            <span className="info-value">{carData.transmission}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Combustible:</span>
            <span className="info-value">{carData.fuelType}</span>
          </div>
        </div>

        <div className="car-info">
          <h3>👤 Información del Propietario</h3>
          <div className="info-row">
            <span className="info-label">Propietario:</span>
            <span className="info-value">{carData.owner}</span>
          </div>
          <div className="info-row">
            <span className="info-label">VIN:</span>
            <span className="info-value">{carData.vin}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Último Servicio:</span>
            <span className="info-value">{carData.lastService}</span>
          </div>
        </div>

        <div className="success">
          ✅ Información verificada correctamente
        </div>

        <button 
          className="btn"
          onClick={handleConfirm}
        >
          Confirmar y Continuar
        </button>

        <button 
          className="btn btn-secondary"
          onClick={handleGoBack}
        >
          Volver a Buscar
        </button>
      </div>
    </div>
  );
};

export default CarInfoScreen;
