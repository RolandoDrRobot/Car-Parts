import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import Modal from './Modal';

const CheckoutScreen = () => {
  const navigate = useNavigate();
  const { items, total, itemCount, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simular envío de orden a servicio externo
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Aquí iría la integración real con el servicio externo
      const orderData = {
        customer: formData,
        items: items,
        total: total,
        orderNumber: `ORD-${Date.now()}`,
        timestamp: new Date().toISOString()
      };

      console.log('Order data to be sent to external service:', orderData);
      
      // Guardar número de orden y mostrar modal
      setOrderNumber(orderData.orderNumber);
      setShowSuccessModal(true);
      
      // Limpiar carrito
      clearCart();
      
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Error al crear la orden. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate('/');
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
            <h2>No Items to Checkout</h2>
            <p style={{ color: '#a0aec0', marginBottom: '30px' }}>
              Your cart is empty. Add some items before proceeding to checkout.
            </p>
            <motion.button 
              className="btn"
              onClick={() => navigate('/')}
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
          <h2>Checkout</h2>
        </div>

        <div style={{ gap: '40px', alignItems: 'start' }}>
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ marginBottom: '24px' }}
          >
            <h3 style={{ marginBottom: '20px', color: '#fff' }}>Order Summary</h3>
            
            {/* Items List */}
            <div style={{ marginBottom: '20px' }}>
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '15px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    marginBottom: '10px',
                    background: 'rgba(255, 255, 255, 0.05)'
                  }}
                >
                  <img 
                    src={item.imageUrl} 
                    alt={item.name}
                    style={{ 
                      width: '60px', 
                      height: '60px', 
                      objectFit: 'cover',
                      borderRadius: '6px',
                      marginRight: '15px'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div style={{
                    display: 'none',
                    width: '60px',
                    height: '60px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '6px',
                    marginRight: '15px',
                    color: '#a0aec0',
                    fontSize: '1.5rem'
                  }}>
                    🔧
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 5px 0', color: '#fff', fontSize: '1rem' }}>{item.name}</h4>
                    <p style={{ margin: '0', color: '#a0aec0', fontSize: '0.9rem' }}>
                      Qty: {item.quantity} × ${item.price}
                    </p>
                  </div>
                  <div style={{ color: '#4ade80', fontWeight: 'bold' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Total */}
            <div style={{
              borderTop: '2px solid rgba(255, 255, 255, 0.1)',
              paddingTop: '20px',
              textAlign: 'center'
            }}>
              <h3 style={{ margin: '0', color: '#4ade80' }}>
                Total: ${total.toFixed(2)}
              </h3>
              <p style={{ margin: '5px 0 0 0', color: '#a0aec0', fontSize: '0.9rem' }}>
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </p>
            </div>
          </motion.div>

          {/* Customer Information Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 style={{ marginBottom: '20px', color: '#fff' }}>Customer Information</h3>
            
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#a0aec0', fontSize: '0.9rem' }}>
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: '#fff',
                      fontSize: '1rem'
                    }}
                    placeholder="John"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#a0aec0', fontSize: '0.9rem' }}>
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: '#fff',
                      fontSize: '1rem'
                    }}
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#a0aec0', fontSize: '0.9rem' }}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    fontSize: '1rem'
                  }}
                  placeholder="john.doe@example.com"
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#a0aec0', fontSize: '0.9rem' }}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    fontSize: '1rem'
                  }}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#a0aec0', fontSize: '0.9rem' }}>
                  Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    fontSize: '1rem'
                  }}
                  placeholder="123 Main Street"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#a0aec0', fontSize: '0.9rem' }}>
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: '#fff',
                      fontSize: '1rem'
                    }}
                    placeholder="New York"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#a0aec0', fontSize: '0.9rem' }}>
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: '#fff',
                      fontSize: '1rem'
                    }}
                    placeholder="10001"
                  />
                </div>
              </div>

              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#a0aec0', fontSize: '0.9rem' }}>
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="3"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    fontSize: '1rem',
                    resize: 'vertical'
                  }}
                  placeholder="Any special instructions or notes..."
                />
              </div>

              <motion.button
                type="submit"
                className="btn"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                transition={{ duration: 0.2 }}
                style={{
                  width: '100%',
                  padding: '15px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  background: isSubmitting ? '#6b7280' : '#22c55e',
                  borderColor: isSubmitting ? '#6b7280' : '#22c55e',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
              >
                {isSubmitting ? (
                  <>
                    <span style={{ marginRight: '10px' }}>⏳</span>
                    Creating Order...
                  </>
                ) : (
                  <>
                    <span style={{ marginRight: '10px' }}>🚀</span>
                    Create Order
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Success Modal */}
        <Modal
          isOpen={showSuccessModal}
          onClose={handleCloseSuccessModal}
          title="¡Orden Creada Exitosamente!"
          type="success"
          autoClose={true}
          autoCloseDelay={3000}
        >
          <p style={{ marginBottom: '15px' }}>
            Tu orden ha sido procesada correctamente.
          </p>
          <p style={{ marginBottom: '15px', fontWeight: 'bold' }}>
            Número de orden: <span style={{ color: '#22c55e' }}>{orderNumber}</span>
          </p>
          <p style={{ marginBottom: '15px' }}>
            Total pagado: <span style={{ color: '#22c55e', fontWeight: 'bold' }}>${total.toFixed(2)}</span>
          </p>
          <p style={{ fontSize: '0.9rem', color: '#a0aec0' }}>
            Recibirás un email de confirmación con los detalles de tu pedido.
          </p>
        </Modal>
      </motion.div>
    </div>
  );
};

export default CheckoutScreen;
