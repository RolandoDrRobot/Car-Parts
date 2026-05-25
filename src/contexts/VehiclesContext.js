import React, { createContext, useContext, useState } from 'react';
import { getItem, setItem, KEYS } from '../utils/localStorage';
import { fetchVehiclePhoto } from '../data/fakeData';

const VehiclesContext = createContext();

export const VehiclesProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState(() => getItem(KEYS.VEHICLES) || []);

  const addVehicle = (vehicle) => {
    const id = Date.now().toString();
    const newVehicle = { ...vehicle, id, photo: null };
    setVehicles(prev => {
      const updated = [...prev, newVehicle];
      setItem(KEYS.VEHICLES, updated);
      return updated;
    });

    fetchVehiclePhoto(vehicle.brand, vehicle.model, vehicle.year).then(photo => {
      if (!photo) return;
      setVehicles(prev => {
        const updated = prev.map(v => v.id === id ? { ...v, photo } : v);
        setItem(KEYS.VEHICLES, updated);
        return updated;
      });
    });

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
