
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addItem = (product) => {
    setCartItems((previousItems) => [
      ...previousItems,
      { ...product, cartId: `${product.id}-${Date.now()}-${Math.random()}` },
    ]);
  };

  const removeItem = (cartId) => {
    setCartItems((previousItems) =>
      previousItems.filter((item) => item.cartId !== cartId)
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}
