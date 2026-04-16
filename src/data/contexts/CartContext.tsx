import { createContext, useContext, useState } from "react";
import type { Part } from "../../types/types";

type CartItem = Part & { quantity: number };

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Part) => void;
  removeFromCart: (partNumber: number) => void;
  updateQuantity: (partNumber: number, delta: number) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: Part) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.partNumber === item.partNumber);
      if (existing) {
        return prev.map((p) =>
          p.partNumber === item.partNumber
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (partNumber: number) => {
    setCart((prev) => prev.filter((p) => p.partNumber !== partNumber));
  };

  const updateQuantity = (partNumber: number, delta: number) => {
  setCart((prev) =>
    prev.map((item) =>
      item.partNumber === partNumber
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    )
  );
};


  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
