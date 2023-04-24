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
  totalValue: number;
  setTotalValue: React.Dispatch<React.SetStateAction<number>>;
  addToCart: (item: iCartProduct) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
}

interface iCartProviderProps {
  children: React.ReactNode;
}

export const CartContext = createContext({} as iCartContext);

export const CartProvider = ({ children }: iCartProviderProps) => {
  const [cart, setCart] = useState<iCartProduct[]>([]);
  const [totalValue, setTotalValue] = useState<number>(0)

  const addToCart = (item: iCartProduct) => {
    const checkProduct = cart.find((element) => element.id === item.id);
    if (!checkProduct) {
      setCart([...cart, item]);
      toast.success("Item adicionado ao carrinho", {
        autoClose: 2000,
      });
    } else {
      toast.warn("Item já adicionado");
    }
  };

  const removeFromCart = (itemId: string) => {
    const newCart = cart.filter((element) => element.id !== itemId);
    setCart(newCart);
    toast.warn("Item removido do carrinho", {
      autoClose: 2000,
    });
  };

  const clearCart = () => {
    toast.warn("Todos os itens foram removidos", {
      autoClose: 2000,
    });
    setTotalValue(0)
    setCart([]);
  };


  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, removeFromCart, clearCart, totalValue, setTotalValue}}>
      {children}
    </CartContext.Provider>
  );
};
