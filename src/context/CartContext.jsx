import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart_v1');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart_v1', JSON.stringify(cart));
  }, [cart]);

  // Agregar producto al carrito
  const addToCart = (product, weightKg = 0, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? {
                ...item,
                weightKg: item.weightKg + weightKg,
                quantity: item.quantity + quantity
              }
            : item
        );
      }
      return [...prev, { ...product, weightKg, quantity }];
    });
  };

  // Actualizar peso
  const updateWeight = (id, newWeightKg) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, weightKg: newWeightKg } : item
      )
    );
  };

  // Eliminar producto
  const removeFromCart = id => setCart(prev => prev.filter(item => item.id !== id));

  // Vaciar carrito
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateWeight, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
