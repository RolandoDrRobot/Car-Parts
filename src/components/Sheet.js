import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Sheet = ({ isOpen, onClose, children }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.65)',
            zIndex: 150,
          }}
        />
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 280 }}
          style={{
            position: 'fixed', left: 0, right: 0, bottom: 0,
            top: 'calc(env(safe-area-inset-top) + 28px)',
            maxWidth: '560px', margin: '0 auto',
            background: '#0a0a0a',
            borderRadius: '20px 20px 0 0',
            boxShadow: '0 -8px 40px rgba(0,0,0,0.5)',
            zIndex: 151,
            display: 'flex', flexDirection: 'column', overflow: 'hidden',
          }}
        >
          <div style={{
            width: '36px', height: '4px', borderRadius: '2px',
            background: 'rgba(255,255,255,0.25)', margin: '10px auto 0', flexShrink: 0,
          }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            {children}
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

export default Sheet;
