import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SettingsProvider, useSettings } from './contexts/SettingsContext';
import { VehiclesProvider } from './contexts/VehiclesContext';
import { HistoryProvider } from './contexts/HistoryContext';
import OnboardingScreen from './components/OnboardingScreen';
import HomeScreen from './components/HomeScreen';
import PhotoUploadScreen from './components/PhotoUploadScreen';
import AnalysisReportScreen from './components/AnalysisReportScreen';
import useScrollToTop from './hooks/useScrollToTop';
import useServiceWorker from './hooks/useServiceWorker';

const AppContent = () => {
  useScrollToTop();
  useServiceWorker();
  const { settings } = useSettings();

  return (
    <Routes>
      <Route
        path="/"
        element={settings.setupComplete ? <HomeScreen /> : <OnboardingScreen />}
      />
      <Route
        path="/scan"
        element={settings.setupComplete ? <PhotoUploadScreen /> : <Navigate to="/" />}
      />
      <Route
        path="/results"
        element={settings.setupComplete ? <AnalysisReportScreen /> : <Navigate to="/" />}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

function App() {
  return (
    <SettingsProvider>
      <VehiclesProvider>
        <HistoryProvider>
          <Router>
            <AppContent />
          </Router>
        </HistoryProvider>
      </VehiclesProvider>
    </SettingsProvider>
  );
}

export default App;
