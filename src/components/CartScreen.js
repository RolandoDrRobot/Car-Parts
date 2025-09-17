import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';

const CartScreen = () => {
  const navigate = useNavigate();
  const { items, total, itemCount, removeItem, updateQuantity } = useCart();

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeItem(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container">
        <motion.div 
          className="card card-centered"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🛒</div>
            <h2>Tu Carrito está Vacío</h2>
            <p style={{ color: '#a0aec0', marginBottom: '30px' }}>
              ¡Agrega algunas piezas de auto para comenzar!
            </p>
            <motion.button 
              className="btn"
              onClick={handleContinueShopping}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              Continuar Comprando
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container">
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div style={{ marginBottom: '30px' }}>
          <h2>Carrito de Compras ({itemCount} {itemCount === 1 ? 'artículo' : 'artículos'})</h2>
        </div>

        {/* Cart Items */}
        <div style={{ marginBottom: '30px' }}>
          {items.map((item, index) => (
            <motion.div 
              key={item.id}
              className="cart-item"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '20px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                marginBottom: '15px',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)'
              }}
            >
              {/* Top Row: Image and Quantity Controls */}
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', gap: '20px' }}>
                {/* Item Image - More prominent */}
                <div style={{ flex: '0 0 200px', height: '150px' }}>
                  <img 
                    src={item.imageUrl} 
                    alt={item.name}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      borderRadius: '12px',
                      border: '2px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div style={{
                    display: 'none',
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '12px',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    color: '#a0aec0',
                    fontSize: '3rem'
                  }}>
                    🔧
                  </div>
                </div>

                {/* Quantity Controls - Larger and more prominent */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', margin: 'auto', flexDirection: 'column' }}>
                  <motion.button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: '#fff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.4rem',
                      fontWeight: 'bold',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    -
                  </motion.button>
                  <span style={{ 
                    fontSize: '1.3rem', 
                    fontWeight: 'bold',
                    minWidth: '40px',
                    textAlign: 'center',
                    color: '#fff',
                    background: 'rgba(255, 255, 255, 0.1)',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}>
                    {item.quantity}
                  </span>
                  <motion.button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: '#fff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.4rem',
                      fontWeight: 'bold',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    +
                  </motion.button>
                </div>
              </div>

              {/* Item Details - Enhanced styling */}
              <div style={{ 
                width: '100%',
                padding: '16px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }}>
                <h4 style={{ 
                  margin: '0 0 12px 0', 
                  color: '#fff',
                  fontSize: '1.2rem',
                  fontWeight: '600'
                }}>
                  {item.name}
                </h4>
                <p style={{ 
                  margin: '0 0 12px 0', 
                  color: '#a0aec0', 
                  fontSize: '1rem',
                  fontWeight: '500'
                }}>
                  Número de Pieza: <span style={{ color: '#fff' }}>{item.partNumber}</span>
                </p>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginTop: '8px'
                }}>
                  <p style={{ 
                    margin: '0', 
                    color: '#4ade80', 
                    fontSize: '1.3rem', 
                    fontWeight: 'bold'
                  }}>
                    ${item.price}
                  </p>
                  <p style={{ 
                    margin: '0', 
                    color: '#a0aec0', 
                    fontSize: '0.9rem'
                  }}>
                    Subtotal: <span style={{ color: '#4ade80', fontWeight: 'bold' }}>${(item.price * item.quantity).toFixed(2)}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cart Summary */}
        <motion.div 
          className="cart-summary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            borderTop: '2px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '20px',
            marginTop: '20px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, color: '#fff' }}>Total:</h3>
            <h3 style={{ margin: 0, color: '#4ade80' }}>${total.toFixed(2)}</h3>
          </div>
          
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <motion.button 
              className="btn btn-secondary"
              onClick={handleContinueShopping}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              style={{ flex: 1, minWidth: '200px' }}
            >
              Continuar Comprando
            </motion.button>
            <motion.button 
              className="btn"
              onClick={handleCheckout}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              style={{ flex: 1, minWidth: '200px' }}
            >
              Proceder al Checkout
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CartScreen;
