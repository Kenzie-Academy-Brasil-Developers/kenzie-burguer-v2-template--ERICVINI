import { createContext, useState } from "react";
import { toast } from "react-toastify";

export interface iCartProduct {
  id: string;
  name: string;
  category: string;
  price: string;
  img: string;
  element?: iCartProduct;
}

interface iCartContext {
  cart: iCartProduct[];
  setCart: React.Dispatch<React.SetStateAction<iCartProduct[]>>;
  addToCart: (item: iCartProduct, index: string) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
}

interface iCartProviderProps {
  children: React.ReactNode;
}

export const CartContext = createContext({} as iCartContext);

export const CartProvider = ({ children }: iCartProviderProps) => {
  const [cart, setCart] = useState<iCartProduct[]>([]);

  const addToCart = (item: iCartProduct, index: string) => {
    const newItem = {...item, id: index}
    setCart([...cart, newItem]);
    toast.success("Item adicionado ao carrinho", {
      autoClose: 2000,
    })
  }
  
  const removeFromCart = (itemId: number) => {
    const newCart = cart.filter((_, index) => index !== itemId);
    setCart(newCart)
    toast.warn("Item removido do carrinho", {
      autoClose: 2000,
    })
  }

  const clearCart = () => {
    toast.warn("Todos os itens foram removidos", {
      autoClose: 2000,
    })
    setCart([])
  }

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, clearCart}}>
      {children}
    </CartContext.Provider>
  );
};
