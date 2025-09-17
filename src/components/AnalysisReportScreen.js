import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import Modal from './Modal';
import PartCard from './PartCard';

const AnalysisReportScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { carData, analysisResult } = location.state || {};
  const { addItem } = useCart();
  const [showCartModal, setShowCartModal] = useState(false);

  const handleStartOver = () => {
    navigate('/');
  };

  const handleNewAnalysis = () => {
    navigate('/photo-upload', { state: { carData } });
  };

  const handleAddToCart = () => {
    if (analysisResult && analysisResult.identifiedPart) {
      addItem(analysisResult.identifiedPart);
      setShowCartModal(true);
    }
  };

  const handleViewCart = () => {
    navigate('/cart');
  };

  const handleCloseCartModal = () => {
    setShowCartModal(false);
  };

  if (!analysisResult || !carData) {
    return (
      <div className="container">
        <motion.div 
          className="card card-centered"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2>No Analysis Data Found</h2>
          <p>Please go back and perform an analysis first.</p>
          <motion.button 
            className="btn"
            onClick={handleStartOver}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            Empezar de Nuevo
          </motion.button>
        </motion.div>
      </div>
    );
  }

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
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Resultados de identificación de piezas con IA
        </motion.p>

        {/* Vehicle Information */}
        <motion.div 
          className="car-info"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="info-grid">
            <div className="info-card">
              <div className="info-card-header">
                <h4 className="info-card-title">Detalles del Vehículo</h4>
              </div>
              
              {/* Imagen del vehículo */}
              <div style={{ 
                textAlign: 'center', 
                marginBottom: '15px',
                background: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '8px',
                padding: '10px'
              }}>
                <img 
                  src={carData.imageUrl} 
                  alt={`${carData.brand} ${carData.model}`}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    maxHeight: '200px',
                    borderRadius: '6px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div style={{
                  display: 'none',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#a0aec0',
                  fontSize: '0.9rem',
                  minHeight: '120px'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🚗</div>
                  <div style={{ fontSize: '0.8rem' }}>Imagen del vehículo no disponible</div>
                </div>
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
        </motion.div>




          {/* Análisis Técnico Detallado - Estilo Card Info */}
        <motion.div 
            className="car-info"
            initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
        >

            <div className="info-grid">
          
              {/* Información del Sistema y Especificaciones Técnicas */}
              <div className="info-card">
                <div className="info-card-header">
                  <h4 className="info-card-title">Información del Sistema</h4>
                </div>
                <div className="info-row">
                  <span className="info-label">Sistema:</span>
                  <span className="info-value">{analysisResult.technicalDetails?.systemType}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Tipo de Freno:</span>
                  <span className="info-value">{analysisResult.technicalDetails?.brakeType}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Desgaste:</span>
                  <span className="info-value" style={{ color: '#f59e0b' }}>{analysisResult.technicalDetails?.wearLevel}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Corrosión:</span>
                  <span className="info-value" style={{ color: '#f59e0b' }}>{analysisResult.technicalDetails?.corrosionStatus}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Prioridad:</span>
                  <span className="info-value" style={{ color: '#ef4444', fontWeight: '600' }}>{analysisResult.technicalDetails?.maintenancePriority}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Diámetro Tambor:</span>
                  <span className="info-value">{analysisResult.technicalDetails?.technicalSpecs?.drumDiameter}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Grosor Zapatas:</span>
                  <span className="info-value">{analysisResult.technicalDetails?.technicalSpecs?.shoeThickness}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Tensión Resortes:</span>
                  <span className="info-value" style={{ color: '#22c55e' }}>{analysisResult.technicalDetails?.technicalSpecs?.springTension}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Diámetro Cilindro:</span>
                  <span className="info-value">{analysisResult.technicalDetails?.technicalSpecs?.wheelCylinderBore}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Nivel Líquido:</span>
                  <span className="info-value" style={{ color: '#f59e0b' }}>{analysisResult.technicalDetails?.technicalSpecs?.brakeFluidLevel}</span>
                </div>
              </div>



              {/* Notas de Inspección */}
              <div className="info-card">
                <div className="info-card-header">
                  <h4 className="info-card-title">Notas de Inspección</h4>
                </div>
                {analysisResult.technicalDetails?.inspectionNotes?.map((note, index) => (
                  <div key={index} className="info-row" style={{ alignItems: 'flex-start' }}>
                    <span className="info-label" style={{ color: '#22c55e', marginRight: '8px' }}>•</span>
                    <span className="info-value" style={{ flex: 1 }}>{note}</span>
                  </div>
                ))}
            </div>

              {/* Problemas Identificados */}
              <div className="info-card">
                <div className="info-card-header">
                  <h4 className="info-card-title">Problemas Identificados</h4>
                </div>
                {analysisResult.technicalDetails?.commonIssues?.map((issue, index) => (
                  <div key={index} className="info-row" style={{ alignItems: 'flex-start' }}>
                    <span className="info-label" style={{ color: '#ef4444', marginRight: '8px' }}>•</span>
                    <span className="info-value" style={{ flex: 1 }}>{issue}</span>
                  </div>
                ))}
              </div>

            </div>
          </motion.div>

          {/* Repuestos Disponibles en Stock */}
          {analysisResult.partsAnalysis && analysisResult.partsAnalysis.length > 0 && (
            <motion.div 
              style={{ marginTop: '20px' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.3 }}
            >
              {analysisResult.partsAnalysis.filter(part => part.inStock).length > 0 ? (
                <>
                  <h4 className="info-card-title">Repuestos en stock</h4>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                    gap: '12px',
                    marginTop: '15px'
                  }}>
                  {analysisResult.partsAnalysis.filter(part => part.inStock).map((part, index) => (
                    <PartCard
                      key={index}
                      part={part}
                      index={index}
                      onAddToCart={(availablePart) => {
                        addItem(availablePart);
                                setShowCartModal(true);
                              }}
                      showAddButton={true}
                    />
                  ))}
                  </div>
                </>
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: '30px 20px',
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '2px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '10px',
                  marginTop: '15px'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '10px' }}>⚠️</div>
                  <h6 style={{ color: '#ef4444', margin: '0 0 8px 0', fontSize: '1.1rem', fontWeight: '600' }}>
                    No hay repuestos disponibles
                  </h6>
                  <p style={{ color: '#a0aec0', margin: 0, fontSize: '0.9rem' }}>
                    Ninguno de los repuestos identificados está disponible en stock actualmente.
                  </p>
                </div>
              )}
            </motion.div>
          )}



        {/* Action Buttons */}
        <motion.div
          style={{ marginTop: '30px', display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          <motion.button 
            className="btn"
            onClick={handleNewAnalysis}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            Analizar Otra Pieza
          </motion.button>
          <motion.button 
            className="btn btn-secondary"
            onClick={handleStartOver}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            Buscar Otro Vehículo
          </motion.button>
        </motion.div>

        {/* Additional Information */}
        <motion.div 
          style={{ marginTop: '30px', fontSize: '0.9rem', color: '#a0aec0' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.6 }}
        >
          <p><strong>Análisis completado el:</strong> {new Date().toLocaleString()}</p>
          <p><strong>Modelo de IA:</strong> CarFix Part Identifier v2.1</p>
        </motion.div>

        {/* Cart Success Modal */}
        <Modal
          isOpen={showCartModal}
          onClose={handleCloseCartModal}
          title="¡Agregado al Carrito!"
          type="success"
          autoClose={true}
          autoCloseDelay={3000}
        >
          <p style={{ marginBottom: '15px' }}>
            <strong>{analysisResult?.identifiedPart?.name}</strong> ha sido agregado a tu carrito.
          </p>
          <p style={{ marginBottom: '15px' }}>
            Precio: <span style={{ color: '#22c55e', fontWeight: 'bold' }}>${analysisResult?.identifiedPart?.price}</span>
          </p>
          <p style={{ fontSize: '0.9rem', color: '#a0aec0' }}>
            Puedes continuar agregando más piezas o proceder al checkout.
          </p>
        </Modal>
      </motion.div>
    </div>
  );
};

export default AnalysisReportScreen;
