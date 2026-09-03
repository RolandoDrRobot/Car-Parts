import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const Toast = ({ message, onDone, duration = 1800 }) => {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onDone, duration);
    return () => clearTimeout(t);
  }, [message, duration, onDone]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.96 }}
          transition={{ type: 'spring', damping: 22, stiffness: 320 }}
          style={{
            position: 'fixed', top: 'calc(env(safe-area-inset-top) + 14px)',
            left: '50%', translateX: '-50%', x: '-50%',
            zIndex: 200,
            background: 'rgba(15,15,15,0.92)',
            border: '1px solid rgba(34,197,94,0.35)',
            boxShadow: '0 8px 28px rgba(0,0,0,0.45), 0 0 0 1px rgba(34,197,94,0.08)',
            backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
            borderRadius: '999px', padding: '10px 18px',
            display: 'flex', alignItems: 'center', gap: '8px',
            color: '#d1fae5', fontFamily: 'Saira Condensed, sans-serif',
            fontWeight: 700, fontSize: '0.9rem', whiteSpace: 'nowrap',
          }}>
          <CheckCircle2 size={16} color="#22c55e" />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
