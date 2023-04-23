import { StyledShopPage } from "./style";
import CartModal from "../../components/CartModal";
import Header from "../../components/Header";
import ProductList from "../../components/ProductList";
import { StyledContainer } from "../../styles/grid";
import { useContext, useEffect } from "react";
import { UserContext } from "../../providers/UserContext";
import { ToastContainer } from 'react-toastify';

const ShopPage = () => {
  const { modal } = useContext(UserContext);

  return (
    <StyledShopPage>
      {modal && <CartModal />}
      <Header />
      <main>
        <StyledContainer containerWidth={1300}>
          <ProductList />
        </StyledContainer>
      </main>
      <ToastContainer position='bottom-right'/>
    </StyledShopPage>
  );
};

export default ShopPage;
