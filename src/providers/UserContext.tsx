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

type tUser = null | iUser

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
  const token = localStorage.getItem("@ACESSTOKEN");
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      if(token) {
        navigate("/shop");
        return true
      }else {
        console.log(window.location)
        return false
      }
    }
    checkUser()
  },[])

  const handleModal = () => {
    setModal(!modal)
  }

  const loginUser = async (data: iUser) => {
    try {
      const response = await api.post<iResponseBody>("/login", data);
      const { accessToken, user: currentUser } = response.data;
      localStorage.setItem("@ACESSTOKEN", accessToken);
      setUser(currentUser);
      toast.success("Login realizado com sucesso");
      return setTimeout(() => navigate("/shop"), 5000);
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
      return setTimeout(() => navigate("/"), 5000)
    } catch (error: any) {
      toast.error(error.response.data);
      return error;
    }
  };

  const getProducts = async () => {
    try {
      const response = await api.get("/products", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return setProducts(response.data)
    } catch (error) {
      return error
    }
  }

  return (
    <UserContext.Provider value={{ navigate, user, setUser, loginUser, registerUser, modal, setModal, handleModal, products, setProducts, getProducts }}>
      {children}
    </UserContext.Provider>
  );
};
