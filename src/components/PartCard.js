import React from 'react';
import { motion } from 'framer-motion';

const PartCard = ({ part, onAddToCart, showAddButton = true, index = 0 }) => {
  const handleAddToCart = () => {
    if (onAddToCart && part.availablePart) {
      onAddToCart(part.availablePart);
    }
  };

  return (
    <motion.div 
      key={part.identifiedPart?.name || part.name}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      style={{
        background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.9) 0%, rgba(30, 30, 30, 0.9) 100%)',
        borderRadius: '10px',
        padding: '12px',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: 'fit-content'
      }}
    >

      {/* Layout principal: Imagen a la izquierda, info a la derecha */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
        {/* Imagen del repuesto */}
        <div style={{
          flex: '0 0 140px',
          height: '110px',
          background: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '5px',
          padding: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '110px'
        }}>
          <img
            src={part.availablePart?.imageUrl || part.imageUrl || "https://autorecambiosltda.com/wp-content/uploads/2022/10/Lo-que-debes-saber-sobre-los-repuestos-homologados.png"}
            alt={part.identifiedPart?.name || part.name}
            style={{
              height: '100%',
              width: '140px',
              objectFit: 'cover',
              borderRadius: '6px'
            }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div style={{
            display: 'none',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#a0aec0',
            fontSize: '0.7rem'
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '2px' }}>🔧</div>
            <div style={{ fontSize: '0.6rem' }}>Sin imagen</div>
          </div>
        </div>

        {/* Información del repuesto */}
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {part.availablePart ? (
            <>
              {/* Nombre y código */}
              <div>
                <h4 style={{ 
                  margin: '0 0 4px 0', 
                  color: '#f7fafc', 
                  fontSize: '0.9rem', 
                  fontWeight: '600',
                  lineHeight: '1.2'
                }}>
                  {part.availablePart.name}
                </h4>
                <p style={{ 
                  margin: '0', 
                  color: '#a0aec0', 
                  fontSize: '0.75rem',
                  fontFamily: 'monospace'
                }}>
                  {part.availablePart.partNumber}
                </p>
              </div>

            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
              <div style={{ fontSize: '1.2rem', marginBottom: '4px' }}>❌</div>
              <p style={{ color: '#ef4444', margin: 0, fontSize: '0.8rem' }}>
                Repuesto no disponible
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Precio/Stock y Ubicación en el mismo row */}
      {part.availablePart && (
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          {/* Precio y Stock */}
          <div style={{
            flex: '1',
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '8px',
            borderRadius: '5px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <div style={{ color: '#a0aec0', fontSize: '0.7rem', marginBottom: '2px' }}>PRECIO</div>
            <div style={{ 
              color: '#22c55e', 
              fontSize: '1rem', 
              fontWeight: 'bold',
              marginBottom: '2px'
            }}>
              ${part.price || part.availablePart.price}
            </div>
            <div style={{ 
              color: part.inStock ? '#22c55e' : '#ef4444', 
              fontSize: '0.7rem',
              fontWeight: '500'
            }}>
              {part.inStock ? `${part.stockQuantity || part.availablePart.stock} en stock` : 'Sin stock'}
            </div>
          </div>

          {/* Ubicación */}
          <div style={{
            flex: '1',
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '8px',
            borderRadius: '5px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <div style={{ color: '#a0aec0', fontSize: '0.7rem', marginBottom: '2px' }}>UBICACIÓN</div>
            <div style={{ color: '#f7fafc', fontWeight: '500', fontSize: '0.8rem' }}>
              {part.location || part.availablePart.location}
            </div>
          </div>
        </div>
      )}


      {/* Botón de agregar al carrito */}
      {showAddButton && part.inStock && part.availablePart && (
        <motion.button
          onClick={handleAddToCart}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '12px 16px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 3px 10px rgba(34, 197, 94, 0.3)',
            marginTop: 'auto'
          }}
        >
          Agregar al Carrito
        </motion.button>
      )}

      {!part.inStock && part.availablePart && (
        <div style={{
          width: '100%',
          background: 'rgba(239, 68, 68, 0.1)',
          color: '#ef4444',
          border: '1px solid #ef4444',
          borderRadius: '5px',
          padding: '8px 12px',
          fontSize: '0.8rem',
          fontWeight: '600',
          textAlign: 'center',
          marginTop: 'auto'
        }}>
          Sin Stock
        </div>
      )}
    </motion.div>
  );
};

export default PartCard;
