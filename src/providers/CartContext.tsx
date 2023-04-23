import { createContext, useState } from "react";

export interface iCartProduct {
  id: string;
  name: string;
  category: string;
  price: string;
  img: string;
}

interface iCartContext {
  cart: iCartProduct[];
  setCart: React.Dispatch<React.SetStateAction<iCartProduct[]>>;
  addToCart: (item: iCartProduct) => void;
  removeFromCart: (itemId: string) => void;
}

interface iCartProviderProps {
  children: React.ReactNode;
}

export const CartContext = createContext({} as iCartContext);

export const CartProvider = ({ children }: iCartProviderProps) => {
  const [cart, setCart] = useState<iCartProduct[]>([]);

  const addToCart = (item: iCartProduct) => {
    setCart([...cart, item])
  }

  const removeFromCart = (itemId: string) => {
    const newCart = cart.filter((element) => element.id !== itemId);
    setCart(newCart)
  }

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
