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
      <div className="card card-centered">
        <h1 className="title">CarFix</h1>
        <p className="subtitle">
          Enter your vehicle's license plate to identify parts with artificial intelligence
        </p>
        
        <form onSubmit={handleSubmit}>
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

          {error && <div className="error">{error}</div>}

          <button 
            type="submit" 
            className="btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading"></span>
                Searching vehicle...
              </>
            ) : (
              'Search Vehicle'
            )}
          </button>
        </form>

        <div style={{ marginTop: '30px', fontSize: '0.9rem', color: '#a0aec0' }}>
          <p><strong>Test License Plates:</strong></p>
          <p>ABC123 - Toyota Corolla 2020</p>
          <p>XYZ789 - Honda Civic 2019</p>
          <p>DEF456 - Ford Focus 2021</p>
        </div>
      </div>
    </div>
  );
};

export default LicensePlateScreen;
