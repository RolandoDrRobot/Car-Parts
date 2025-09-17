import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LicensePlateScreen = ({ onSubmit, carData }) => {
  const [plate, setPlate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!plate.trim()) {
      setError('Please enter a valid license plate');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate API delay
    setTimeout(() => {
      const found = onSubmit(plate);
      setLoading(false);
      
      if (found) {
        navigate('/car-info');
      } else {
        setError('No information found for this license plate. Please verify it is correct.');
      }
    }, 1500);
  };

  return (
    <div className="container">
      <motion.div 
        className="card card-centered"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h1 
          className="title"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          CarFix
        </motion.h1>
        <motion.p 
          className="subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Identify your vehicle's parts with artificial intelligence
        </motion.p>
        
        <motion.form 
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="input-group">
            <label htmlFor="plate" className="label">
              Vehicle License Plate
            </label>
            <input
              type="text"
              id="plate"
              className="input"
              placeholder="Ex: ABC123"
              value={plate}
              onChange={(e) => setPlate(e.target.value.toUpperCase())}
              maxLength="8"
              disabled={loading}
            />
          </div>

          {error && (
            <motion.div 
              className="error"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.div>
          )}

          <motion.button 
            type="submit" 
            className="btn"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            {loading ? (
              <>
                <span className="loading"></span>
                Searching vehicle...
              </>
            ) : (
              'Search Vehicle'
            )}
          </motion.button>
        </motion.form>

        <div style={{ marginTop: '30px', fontSize: '0.9rem', color: '#a0aec0' }}>
          <p><strong>Test License Plates:</strong></p>
          <p>ABC123 - Toyota Corolla 2020</p>
          <p>XYZ789 - Honda Civic 2019</p>
          <p>DEF456 - Ford Focus 2021</p>
        </div>
      </motion.div>
    </div>
  );
};

export default LicensePlateScreen;
