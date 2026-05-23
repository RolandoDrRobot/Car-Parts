import React, { createContext, useContext, useState } from 'react';
import { getItem, setItem, KEYS } from '../utils/localStorage';

const HistoryContext = createContext();

const MAX_HISTORY = 50;

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState(() => getItem(KEYS.HISTORY) || []);

  const addScan = (scan) => {
    const entry = { ...scan, id: Date.now().toString(), date: new Date().toISOString() };
    const updated = [entry, ...history].slice(0, MAX_HISTORY);
    setHistory(updated);
    setItem(KEYS.HISTORY, updated);
    return entry;
  };

  const removeScan = (id) => {
    const updated = history.filter(s => s.id !== id);
    setHistory(updated);
    setItem(KEYS.HISTORY, updated);
  };

  const clearHistory = () => {
    setHistory([]);
    setItem(KEYS.HISTORY, []);
  };

  return (
    <HistoryContext.Provider value={{ history, addScan, removeScan, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const ctx = useContext(HistoryContext);
  if (!ctx) throw new Error('useHistory must be used within HistoryProvider');
  return ctx;
};
