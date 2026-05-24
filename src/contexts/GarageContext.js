import React, { createContext, useContext, useState } from 'react';
import { getItem, setItem, KEYS } from '../utils/localStorage';

const GarageContext = createContext();

export const GarageProvider = ({ children }) => {
  const [garage, setGarage] = useState(() => getItem(KEYS.GARAGE) || {});

  const save = (next) => { setGarage(next); setItem(KEYS.GARAGE, next); };

  const updateMileage = (vehicleId, mileage) =>
    save({ ...garage, [vehicleId]: { ...garage[vehicleId], currentMileage: Number(mileage) } });

  const logMaintenance = (vehicleId, itemId, record) =>
    save({
      ...garage,
      [vehicleId]: {
        ...garage[vehicleId],
        maintenance: { ...(garage[vehicleId]?.maintenance || {}), [itemId]: record },
      },
    });

  const clearRecord = (vehicleId, itemId) => {
    const m = { ...(garage[vehicleId]?.maintenance || {}) };
    delete m[itemId];
    save({ ...garage, [vehicleId]: { ...garage[vehicleId], maintenance: m } });
  };

  const getVehicleData = (vehicleId) => garage[vehicleId] || {};

  return (
    <GarageContext.Provider value={{ updateMileage, logMaintenance, clearRecord, getVehicleData }}>
      {children}
    </GarageContext.Provider>
  );
};

export const useGarage = () => {
  const ctx = useContext(GarageContext);
  if (!ctx) throw new Error('useGarage must be used within GarageProvider');
  return ctx;
};
