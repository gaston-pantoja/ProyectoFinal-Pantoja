
import React, { createContext, useState, useContext } from 'react';


const CartContext = createContext();


export const useCart = () => {
  return useContext(CartContext);
};


export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  
  const addItem = (item, quantity) => {
    if (isInCart(item.id)) {
      setCart(prevCart => 
        prevCart.map(prod => 
          prod.id === item.id 
            ? { ...prod, quantity: prod.quantity + quantity } 
            : prod
        )
      );
    } else {
      setCart(prevCart => [...prevCart, { ...item, quantity }]);
    }
  };

  
  const removeItem = (itemId) => {
    setCart(prevCart => prevCart.filter(prod => prod.id !== itemId));
  };

 
  const clearCart = () => {
    setCart([]);
  };

 
  const isInCart = (itemId) => {
    return cart.some(prod => prod.id === itemId);
  };

  
  const totalQuantity = cart.reduce((total, prod) => total + prod.quantity, 0);

  
  const totalCost = cart.reduce((total, prod) => total + (prod.price * prod.quantity), 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addItem, 
      removeItem, 
      clearCart, 
      isInCart, 
      totalQuantity, 
      totalCost 
    }}>
      {children}
    </CartContext.Provider>
  );
};