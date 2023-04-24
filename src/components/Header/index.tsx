import { MdShoppingCart, MdLogout } from "react-icons/md";

import SearchForm from "./SearchForm";
import { StyledHeader } from "./style";
import LogoKenzieBurguer from "../../assets/LogoKenzieBurguer.svg";

import { StyledContainer } from "../../styles/grid";
import { useContext } from "react";
import { UserContext } from "../../providers/UserContext";
import { CartContext } from "../../providers/CartContext";

const Header = () => {
  const { handleModal, logout } = useContext(UserContext);
  const {cart} = useContext(CartContext)

  return (
    <StyledHeader>
      <StyledContainer containerWidth={1300}>
        <div className="flexGrid">
          <img
            src={LogoKenzieBurguer}
            alt="Kenzie Burguer Logo"
            className="logo"
          />
          <nav className="nav" role="navigation">
            <SearchForm />
            <div className="buttons">
              <button type="button" onClick={handleModal}>
                <MdShoppingCart size={28} />
                <div className="cartCount">
                  <span>{cart.length}</span>
                </div>
              </button>
              <button type="button" onClick={logout}>
                <MdLogout size={28} />
              </button>
            </div>
          </nav>
        </div>
      </StyledContainer>
    </StyledHeader>
  );
};

export default Header;
