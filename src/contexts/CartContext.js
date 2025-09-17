import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  items: [],
  total: 0,
  itemCount: 0
};

// Action types
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART'
};

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM:
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        // If item already exists, increase quantity
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          ...state,
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
          itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0)
        };
      } else {
        // Add new item
        const newItems = [...state.items, { ...action.payload, quantity: 1 }];
        return {
          ...state,
          items: newItems,
          total: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
          itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0)
        };
      }

    case CART_ACTIONS.REMOVE_ITEM:
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: filteredItems,
        total: filteredItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        itemCount: filteredItems.reduce((sum, item) => sum + item.quantity, 0)
      };

    case CART_ACTIONS.UPDATE_QUANTITY:
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0); // Remove items with 0 quantity
      
      return {
        ...state,
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0)
      };

    case CART_ACTIONS.CLEAR_CART:
      return initialState;

    default:
      return state;
  }
};

// Create context
const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (item) => {
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: item });
  };

  const removeItem = (itemId) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: itemId });
  };

  const updateQuantity = (itemId, quantity) => {
    dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id: itemId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  const value = {
    ...state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;

