import { useEffect } from 'react';

const useServiceWorker = () => {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;
    const onLoad = () => navigator.serviceWorker.register('/sw.js').catch(() => {});
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);
};

export default useServiceWorker;
