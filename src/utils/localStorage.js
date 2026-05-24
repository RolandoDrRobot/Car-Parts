export const KEYS = {
  SETTINGS: 'carparts_settings',
  VEHICLES: 'carparts_vehicles',
  HISTORY: 'carparts_history',
  GARAGE:   'carparts_garage',
};

export const getItem = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
};

export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('localStorage write failed:', e);
  }
};
