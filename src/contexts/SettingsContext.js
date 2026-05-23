import React, { createContext, useContext, useState } from 'react';
import { getItem, setItem, KEYS } from '../utils/localStorage';

const SettingsContext = createContext();

const DEFAULT_SETTINGS = {
  country: null,
  language: 'es',
  setupComplete: false,
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => getItem(KEYS.SETTINGS) || DEFAULT_SETTINGS);

  const updateSettings = (updates) => {
    const updated = { ...settings, ...updates };
    setSettings(updated);
    setItem(KEYS.SETTINGS, updated);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
};
