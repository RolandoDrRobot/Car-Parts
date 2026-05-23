import React, { createContext, useContext, useState } from 'react';
import { getItem, setItem, KEYS } from '../utils/localStorage';

const VehiclesContext = createContext();

export const VehiclesProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState(() => getItem(KEYS.VEHICLES) || []);

  const addVehicle = (vehicle) => {
    const newVehicle = { ...vehicle, id: Date.now().toString() };
    const updated = [...vehicles, newVehicle];
    setVehicles(updated);
    setItem(KEYS.VEHICLES, updated);
    return newVehicle;
  };

  const removeVehicle = (id) => {
    const updated = vehicles.filter(v => v.id !== id);
    setVehicles(updated);
    setItem(KEYS.VEHICLES, updated);
  };

  return (
    <VehiclesContext.Provider value={{ vehicles, addVehicle, removeVehicle }}>
      {children}
    </VehiclesContext.Provider>
  );
};

export const useVehicles = () => {
  const ctx = useContext(VehiclesContext);
  if (!ctx) throw new Error('useVehicles must be used within VehiclesProvider');
  return ctx;
};
