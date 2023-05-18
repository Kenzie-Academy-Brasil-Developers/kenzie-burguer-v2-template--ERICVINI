import { createContext, useState, ReactNode, useEffect } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { iCartProduct } from "./CartContext";

export interface iUser {
  id?: string;
  name?: string;
  email: string;
  password: string;
}

type tUser = null | iUser;

interface iUserContext {
  user: iUser | null;
  setUser: React.Dispatch<React.SetStateAction<iUser | null>>;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  products: iCartProduct[];
  setProducts: React.Dispatch<React.SetStateAction<iCartProduct[]>>;
  loginUser: (data: iUser) => Promise<void>;
  registerUser: (data: iUser) => Promise<any>;
  handleModal: () => void;
  getProducts: () => Promise<unknown>;
  navigate: (string: string) => void;
  logout: () => void;
  searchProduct: (search: string) => void;
}

interface iUserProviderProps {
  children: React.ReactNode;
}
interface iResponseBody {
  accessToken: string;
  user: iUser;
}

export const UserContext = createContext({} as iUserContext);

export const UserProvider = ({ children }: iUserProviderProps) => {
  const [user, setUser] = useState<tUser>(null);
  const [modal, setModal] = useState<boolean>(false);
  const [products, setProducts] = useState<iCartProduct[]>([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("@ACESSTOKEN");
  
  useEffect(() => {
    const checkUser = () => {
      const acessToken = localStorage.getItem("@ACESSTOKEN");
      if (acessToken && window.location.pathname !== "/shop") {
        navigate("/shop");
        return true;
      } else if(acessToken && window.location.pathname === "/shop") {
        navigate("/shop")
        return false
      }else {
        navigate('/')
      }
    };
    checkUser();
  }, []);

  const handleModal = () => {
    setModal(!modal);
  };
  const logout = () => {
    localStorage.clear();
    toast.warn("Logout feito", {
      autoClose: 3000
    })
    setTimeout(() => navigate("/"),3000);
  };

  const loginUser = async (data: iUser) => {
    try {
      const response = await api.post<iResponseBody>("/login", data);
      const { accessToken, user: currentUser } = response.data;
      toast.success("Login realizado com sucesso");
      localStorage.setItem("@ACESSTOKEN", accessToken);
      setUser(currentUser);
      setTimeout(() => navigate("/shop"), 3000);
    } catch (error: any) {
      toast.error(error.response.data);
      return error;
    }
  };

  const registerUser = async (data: iUser) => {
    try {
      const response = await api.post<iResponseBody>("/users", data);
      const { accessToken, user: currentUser } = response.data;
      localStorage.setItem("@ACESSTOKEN", accessToken);
      setUser(currentUser);
      toast.success("Cadastro realizado com sucesso");
      setTimeout(() => navigate("/"), 3000);
    } catch (error: any) {
      toast.error(error.response.data);
      return error;
    }
  };

  const getProducts = async () => {
    try {
      const response = await api.get("/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return setProducts(response.data);
    } catch (error) {
      return error;
    }
  };

  const searchProduct = (search: string) => {
    if(search !== ""){
      const newList = products.filter(element => element.name.toLowerCase().includes(search.toLowerCase()) || element.category.toLowerCase().includes(search.toLowerCase()));
      setProducts(newList);
    }else {
      getProducts();
    }
  }

  return (
    <UserContext.Provider
      value={{
        navigate,
        user,
        setUser,
        loginUser,
        registerUser,
        modal,
        setModal,
        handleModal,
        products,
        setProducts,
        getProducts,
        logout,
        searchProduct
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
