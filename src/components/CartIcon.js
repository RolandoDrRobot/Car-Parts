import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';

const CartIcon = () => {
  const navigate = useNavigate();
  const { itemCount } = useCart();

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <motion.button
      className="cart-icon"
      onClick={handleCartClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.8)',
        border: '2px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '50px',
        padding: '12px 20px',
        color: '#fff',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '1rem',
        fontWeight: 'bold',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
      }}
    >
      <span style={{ fontSize: '1.2rem' }}>🛒</span>
      <span>Carrito</span>
      {itemCount > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          style={{
            background: '#ef4444',
            color: '#fff',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.8rem',
            fontWeight: 'bold'
          }}
        >
          {itemCount}
        </motion.span>
      )}
    </motion.button>
  );
};

export default CartIcon;

