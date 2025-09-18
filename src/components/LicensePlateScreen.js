import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LicensePlateScreen = ({ onSubmit, carData }) => {
  const [plate, setPlate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchType, setSearchType] = useState('plate'); // 'plate' or 'manual'
  const [manualSearch, setManualSearch] = useState({
    brand: '',
    model: '',
    year: '',
    color: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (searchType === 'plate') {
      if (!plate.trim()) {
        setError('Please enter a valid license plate');
        return;
      }
    } else {
      if (!manualSearch.brand.trim() || !manualSearch.model.trim() || !manualSearch.year.trim()) {
        setError('Please fill in at least Brand, Model, and Year');
        return;
      }
    }

    setLoading(true);
    setError('');

    // Simulate API delay
    setTimeout(() => {
      let found = false;
      
      if (searchType === 'plate') {
        found = onSubmit(plate);
      } else {
        // For manual search, we'll create a mock car data based on the input
        const mockCarData = {
          id: Date.now(),
          plate: 'MANUAL',
          brand: manualSearch.brand,
          model: manualSearch.model,
          year: parseInt(manualSearch.year),
          color: manualSearch.color || 'Unknown',
          engine: 'Manual Entry',
          transmission: 'Manual Entry',
          fuelType: 'Manual Entry',
          vin: 'MANUAL-ENTRY',
          owner: 'Manual Entry',
          lastService: 'Manual Entry',
          imageUrl: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop&auto=format"
        };
        
        // Set the car data directly and mark as found
        onSubmit('MANUAL', mockCarData);
        found = true;
      }
      
      setLoading(false);
      
      if (found) {
        navigate('/car-info');
      } else {
        setError(searchType === 'plate' 
          ? 'No information found for this license plate. Please verify it is correct.'
          : 'No matching vehicles found. Please check your information.'
        );
      }
    }, 1500);
  };

  const handleManualSearchChange = (field, value) => {
    setManualSearch(prev => ({
      ...prev,
      [field]: value
    }));
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
          CarParts
        </motion.h1>
        <motion.p 
          className="subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Identifica las piezas de tu vehículo con inteligencia artificial
        </motion.p>

        {/* Search Type Tabs */}
        <motion.div 
          className="search-tabs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <button
            type="button"
            className={`tab-button ${searchType === 'plate' ? 'active' : ''}`}
            onClick={() => setSearchType('plate')}
          >
            Placa de Matrícula
          </button>
          <button
            type="button"
            className={`tab-button ${searchType === 'manual' ? 'active' : ''}`}
            onClick={() => setSearchType('manual')}
          >
            Búsqueda Manual
          </button>
        </motion.div>
        
        <motion.form 
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {searchType === 'plate' ? (
            <div className="input-group">
              <label htmlFor="plate" className="label">
                Placa de Matrícula del Vehículo
              </label>
              <input
                type="text"
                id="plate"
                className="input"
                placeholder="Ej: ABC123"
                value={plate}
                onChange={(e) => setPlate(e.target.value.toUpperCase())}
                maxLength="8"
                disabled={loading}
              />
            </div>
          ) : (
            <div className="manual-search-form">
              <div className="input-row">
                <div className="input-group">
                  <label htmlFor="brand" className="label">
                    Marca *
                  </label>
                  <input
                    type="text"
                    id="brand"
                    className="input"
                    placeholder="Ej: Toyota"
                    value={manualSearch.brand}
                    onChange={(e) => handleManualSearchChange('brand', e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="model" className="label">
                    Modelo *
                  </label>
                  <input
                    type="text"
                    id="model"
                    className="input"
                    placeholder="Ej: Corolla"
                    value={manualSearch.model}
                    onChange={(e) => handleManualSearchChange('model', e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="input-row">
                <div className="input-group">
                  <label htmlFor="year" className="label">
                    Año *
                  </label>
                  <input
                    type="number"
                    id="year"
                    className="input"
                    placeholder="Ej: 2020"
                    value={manualSearch.year}
                    onChange={(e) => handleManualSearchChange('year', e.target.value)}
                    min="1990"
                    max="2024"
                    disabled={loading}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="color" className="label">
                    Color
                  </label>
                  <input
                    type="text"
                    id="color"
                    className="input"
                    placeholder="Ej: Blanco"
                    value={manualSearch.color}
                    onChange={(e) => handleManualSearchChange('color', e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>
            </div>
          )}

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
                {searchType === 'plate' ? 'Buscando vehículo...' : 'Creando perfil del vehículo...'}
              </>
            ) : (
              searchType === 'plate' ? 'Buscar Vehículo' : 'Crear Perfil del Vehículo'
            )}
          </motion.button>
        </motion.form>

        <div style={{ marginTop: '30px', fontSize: '0.9rem', color: '#a0aec0' }}>
          {searchType === 'plate' ? (
            <>
              <p><strong>Placas de Prueba:</strong></p>
              <p>ABC123 - Toyota Corolla 2020</p>
              <p>XYZ789 - Honda Civic 2019</p>
              <p>DEF456 - Ford Focus 2021</p>
            </>
          ) : (
            <>
              <p><strong>Consejos de Búsqueda Manual:</strong></p>
              <p>• Completa al menos Marca, Modelo y Año</p>
              <p>• El color es opcional pero recomendado</p>
              <p>• Puedes buscar cualquier marca y modelo de vehículo</p>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default LicensePlateScreen;
