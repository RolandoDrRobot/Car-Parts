import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import Modal from './Modal';

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
            Start Over
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
          AI-powered part identification results
        </motion.p>

        {/* Vehicle Information */}
        <motion.div 
          className="car-info"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3>Vehicle Information</h3>
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
        </motion.div>

        {/* Analysis Results */}
        <motion.div 
          className="part-result"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3>Analysis Results</h3>
          
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

          {/* Part Image */}
          <motion.div 
            style={{ marginTop: '20px' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <h4>Part Image:</h4>
            <div style={{ marginTop: '10px', textAlign: 'center' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '8px',
                padding: '10px',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                minHeight: '200px'
              }}>
                <img 
                  src={analysisResult.identifiedPart.imageUrl} 
                  alt={analysisResult.identifiedPart.name}
                  style={{ 
                    maxWidth: '100%', 
                    height: 'auto',
                    maxHeight: '200px', 
                    objectFit: 'cover',
                    borderRadius: '5px',
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
                  fontSize: '0.9rem'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🔧</div>
                  <div>Image not available</div>
                  <div style={{ fontSize: '0.8rem', marginTop: '5px' }}>
                    {analysisResult.identifiedPart.name}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recommendations */}
          <motion.div 
            style={{ marginTop: '20px' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <h4>Recommendations:</h4>
            <ul style={{ textAlign: 'left', marginTop: '10px' }}>
              {analysisResult.recommendations.map((rec, index) => (
                <li key={index} style={{ marginBottom: '5px' }}>{rec}</li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Add to Cart Section */}
        {analysisResult.identifiedPart.stock > 0 && (
          <motion.div
            style={{ marginTop: '30px', textAlign: 'center' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
          >
            <div style={{ 
              background: 'rgba(34, 197, 94, 0.1)', 
              border: '2px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '20px'
            }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#22c55e' }}>Ready to Purchase?</h4>
              <p style={{ margin: '0', color: '#a0aec0' }}>
                Add this part to your cart and continue shopping or proceed to checkout.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <motion.button 
                className="btn"
                onClick={handleAddToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                style={{ background: '#22c55e', borderColor: '#22c55e' }}
              >
                🛒 Add to Cart
              </motion.button>
              <motion.button 
                className="btn btn-secondary"
                onClick={handleViewCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                View Cart
              </motion.button>
            </div>
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
            Analyze Another Part
          </motion.button>
          <motion.button 
            className="btn btn-secondary"
            onClick={handleStartOver}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            Search Another Vehicle
          </motion.button>
        </motion.div>

        {/* Additional Information */}
        <motion.div 
          style={{ marginTop: '30px', fontSize: '0.9rem', color: '#a0aec0' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.6 }}
        >
          <p><strong>Analysis completed on:</strong> {new Date().toLocaleString()}</p>
          <p><strong>AI Model:</strong> CarFix Part Identifier v2.1</p>
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
