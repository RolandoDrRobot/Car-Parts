import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LicensePlateScreen = ({ onSubmit, carData }) => {
  const [plate, setPlate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!plate.trim()) {
      setError('Por favor ingresa una placa válida');
      return;
    }

    setLoading(true);
    setError('');

    // Simular delay de API
    setTimeout(() => {
      const found = onSubmit(plate);
      setLoading(false);
      
      if (found) {
        navigate('/car-info');
      } else {
        setError('No se encontró información para esta placa. Verifica que esté correcta.');
      }
    }, 1500);
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">🚗 CarFix</h1>
        <p className="subtitle">
          Ingresa la placa de tu vehículo para identificar repuestos con inteligencia artificial
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="plate" className="label">
              Placa del Vehículo
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

          {error && <div className="error">{error}</div>}

          <button 
            type="submit" 
            className="btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading"></span>
                Buscando vehículo...
              </>
            ) : (
              'Buscar Vehículo'
            )}
          </button>
        </form>

        <div style={{ marginTop: '30px', fontSize: '0.9rem', color: '#666' }}>
          <p><strong>Placas de prueba:</strong></p>
          <p>ABC123 - Toyota Corolla 2020</p>
          <p>XYZ789 - Honda Civic 2019</p>
          <p>DEF456 - Ford Focus 2021</p>
        </div>
      </div>
    </div>
  );
};

export default LicensePlateScreen;
