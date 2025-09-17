import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ isOpen, onClose, title, children, type = 'default', autoClose = true, autoCloseDelay = 3000 }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Focus en el modal cuando aparece
      if (modalRef.current) {
        modalRef.current.focus();
      }
      
      // Auto-cerrar después del delay especificado
      if (autoClose) {
        const timer = setTimeout(() => {
          onClose();
        }, autoCloseDelay);
        
        return () => clearTimeout(timer);
      }
    }
  }, [isOpen, onClose, autoClose, autoCloseDelay]);

  if (!isOpen) return null;

  const getModalStyles = () => {
    return {
      background: 'rgba(0, 0, 0, 0.9)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      color: '#fff'
    };
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}
        onClick={onClose}
      >
        <motion.div
          ref={modalRef}
          tabIndex={-1}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{
            ...getModalStyles(),
            borderRadius: '8px',
            padding: '24px',
            maxWidth: '400px',
            width: '100%',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
            outline: 'none'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ textAlign: 'center' }}>
            {title && (
              <h3 style={{ 
                margin: '0 0 16px 0', 
                color: '#fff',
                fontSize: '1.25rem',
                fontWeight: '600'
              }}>
                {title}
              </h3>
            )}
            
            <div style={{ 
              marginBottom: '20px',
              color: '#a0aec0',
              lineHeight: '1.5',
              fontSize: '0.95rem'
            }}>
              {children}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
