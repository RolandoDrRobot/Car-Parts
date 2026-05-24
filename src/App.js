import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SettingsProvider, useSettings } from './contexts/SettingsContext';
import { VehiclesProvider } from './contexts/VehiclesContext';
import { HistoryProvider } from './contexts/HistoryContext';
import { GarageProvider } from './contexts/GarageContext';
import ErrorBoundary from './components/ErrorBoundary';
import OnboardingScreen from './components/OnboardingScreen';
import HomeScreen from './components/HomeScreen';
import PhotoUploadScreen from './components/PhotoUploadScreen';
import AnalysisReportScreen from './components/AnalysisReportScreen';
import GarageScreen from './components/GarageScreen';
import SymptomsScreen from './components/SymptomsScreen';
import useScrollToTop from './hooks/useScrollToTop';
import useServiceWorker from './hooks/useServiceWorker';

const CAR_BG = 'https://images.unsplash.com/photo-1719906238408-1b70b0115195?fm=jpg&q=85&w=1080&auto=format&fit=crop';

const AppContent = () => {
  useScrollToTop();
  useServiceWorker();
  const { settings } = useSettings();

  return (
    <Routes>
      <Route path="/"        element={settings.setupComplete ? <HomeScreen />           : <OnboardingScreen />} />
      <Route path="/scan"    element={settings.setupComplete ? <PhotoUploadScreen />    : <Navigate to="/" />} />
      <Route path="/results" element={settings.setupComplete ? <AnalysisReportScreen /> : <Navigate to="/" />} />
      <Route path="/garage"    element={settings.setupComplete ? <GarageScreen />         : <Navigate to="/" />} />
      <Route path="/symptoms" element={settings.setupComplete ? <SymptomsScreen />       : <Navigate to="/" />} />
      <Route path="*"        element={<Navigate to="/" />} />
    </Routes>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <SettingsProvider>
        <VehiclesProvider>
          <HistoryProvider>
            <GarageProvider>
              {/* Background layers */}
              <div style={{ position: 'fixed', inset: 0, zIndex: 0, backgroundImage: `url(${CAR_BG})`, backgroundSize: 'cover', backgroundPosition: 'center 40%' }} />
              <div style={{ position: 'fixed', inset: 0, zIndex: 1, background: 'linear-gradient(180deg,rgba(10,10,10,0.95) 0%,rgba(10,10,10,0.68) 38%,rgba(10,10,10,0.50) 58%,rgba(10,10,10,0.82) 78%,rgba(10,10,10,0.97) 100%)' }} />
              <div style={{ position: 'fixed', inset: 0, zIndex: 2, background: 'radial-gradient(ellipse at center,transparent 35%,rgba(10,10,10,0.72) 100%)' }} />
              <div style={{ position: 'fixed', inset: 0, zIndex: 3, pointerEvents: 'none', backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.07) 3px,rgba(0,0,0,0.07) 4px)' }} />

              {/* App — paddingTop accounts for iOS notch/status bar in PWA mode */}
              <div style={{
                position: 'relative', zIndex: 10,
                height: '100dvh', display: 'flex', flexDirection: 'column',
                paddingTop: 'env(safe-area-inset-top)',
                paddingBottom: 'env(safe-area-inset-bottom)',
              }}>
                <Router>
                  <AppContent />
                </Router>
              </div>
            </GarageProvider>
          </HistoryProvider>
        </VehiclesProvider>
      </SettingsProvider>
    </ErrorBoundary>
  );
}

export default App;
