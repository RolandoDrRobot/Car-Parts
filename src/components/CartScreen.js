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
            <h2>Your Cart is Empty</h2>
            <p style={{ color: '#a0aec0', marginBottom: '30px' }}>
              Add some car parts to get started!
            </p>
            <motion.button 
              className="btn"
              onClick={handleContinueShopping}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              Continue Shopping
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
          <h2>Shopping Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})</h2>
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
              {/* Top Row: Image, Quantity Controls, Remove Button */}
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                {/* Item Image */}
                <div style={{ marginRight: '20px', flex: 1, minWidth: '200px' }}>
                  <img 
                    src={item.imageUrl} 
                    alt={item.name}
                    style={{ 
                      width: '100%', 
                      height: '120px', 
                      objectFit: 'cover',
                      borderRadius: '8px',
                      border: '2px solid rgba(255, 255, 255, 0.1)'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div style={{
                    display: 'none',
                    width: '100%',
                    height: '120px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '8px',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    color: '#a0aec0',
                    fontSize: '2rem'
                  }}>
                    🔧
                  </div>
                </div>

                {/* Quantity Controls */}
                <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
                  <motion.button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: '#fff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem'
                    }}
                  >
                    -
                  </motion.button>
                  <span style={{ 
                    margin: '0 15px', 
                    fontSize: '1.1rem', 
                    fontWeight: 'bold',
                    minWidth: '30px',
                    textAlign: 'center'
                  }}>
                    {item.quantity}
                  </span>
                  <motion.button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: '#fff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem'
                    }}
                  >
                    +
                  </motion.button>
                </div>

                {/* Remove Button */}
                <motion.button 
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    background: 'rgba(239, 68, 68, 0.1)',
                    color: '#ef4444',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem'
                  }}
                >
                  ×
                </motion.button>
              </div>

              {/* Item Details - Full Width */}
              <div style={{ width: '100%' }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#fff' }}>{item.name}</h4>
                <p style={{ margin: '0 0 8px 0', color: '#a0aec0', fontSize: '0.9rem' }}>
                  Part Number: {item.partNumber}
                </p>
                <p style={{ margin: '0', color: '#4ade80', fontSize: '1.1rem', fontWeight: 'bold' }}>
                  ${item.price}
                </p>
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
              Continue Shopping
            </motion.button>
            <motion.button 
              className="btn"
              onClick={handleCheckout}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              style={{ flex: 1, minWidth: '200px' }}
            >
              Proceed to Checkout
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CartScreen;
