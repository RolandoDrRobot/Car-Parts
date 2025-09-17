import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LicensePlateScreen from './components/LicensePlateScreen';
import CarInfoScreen from './components/CarInfoScreen';
import PhotoUploadScreen from './components/PhotoUploadScreen';
import AnalysisReportScreen from './components/AnalysisReportScreen';
import CartScreen from './components/CartScreen';
import CheckoutScreen from './components/CheckoutScreen';
import CartIcon from './components/CartIcon';
import { CartProvider } from './contexts/CartContext';
import useScrollToTop from './hooks/useScrollToTop';
import { fakeCarData } from './data/fakeData';

function App() {
  const [carData, setCarData] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);

  const handleLicensePlateSubmit = (plate, manualCarData = null) => {
    if (manualCarData) {
      // Handle manual search - use the provided car data
      setCarData(manualCarData);
      return true;
    } else {
      // Simular búsqueda en API por placa
      const foundCar = fakeCarData.find(car => 
        car.plate.toLowerCase() === plate.toLowerCase()
      );
      
      if (foundCar) {
        setCarData(foundCar);
        return true;
      }
      return false;
    }
  };

  const handleCarConfirm = (car) => {
    setSelectedCar(car);
  };

  // Componente interno que usa el hook dentro del Router
  const AppContent = () => {
    useScrollToTop();
    
    return (
      <div className="App">
        <CartIcon />
        <Routes>
            <Route 
              path="/" 
              element={
                <LicensePlateScreen 
                  onSubmit={handleLicensePlateSubmit}
                  carData={carData}
                />
              } 
            />
            <Route 
              path="/car-info" 
              element={
                carData ? 
                  <CarInfoScreen 
                    carData={carData}
                    onConfirm={handleCarConfirm}
                  /> : 
                  <Navigate to="/" />
              } 
            />
            <Route 
              path="/photo-upload" 
              element={
                selectedCar ? 
                  <PhotoUploadScreen 
                    carData={selectedCar}
                  /> : 
                  <Navigate to="/" />
              } 
            />
            <Route 
              path="/analysis-report" 
              element={<AnalysisReportScreen />} 
            />
            <Route 
              path="/cart" 
              element={<CartScreen />} 
            />
            <Route 
              path="/checkout" 
              element={<CheckoutScreen />} 
            />
        </Routes>
      </div>
    );
  };

  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}

export default App;
