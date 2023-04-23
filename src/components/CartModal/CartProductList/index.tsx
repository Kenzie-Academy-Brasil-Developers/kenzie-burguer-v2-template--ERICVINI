import CartProductCard from "./CartProductCard";

import { StyledCartProductList } from "./style";
import { StyledButton } from "../../../styles/button";
import { StyledParagraph } from "../../../styles/typography";
import { useContext } from "react";
import { CartContext } from "../../../providers/CartContext";

const CartProductList = () => {
  const { cart, clearCart} = useContext(CartContext);
  const totalValue = () => {
    if (cart) {
      const total = cart
        .map((element) => element.price)
        .reduce((acc, curr) => acc + curr);
      return Number(total).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    } else {
      return Number(0).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    }
  };

  return (
    <StyledCartProductList>
      <ul>
        {cart &&
          cart.map((element, index) => (
            <CartProductCard
              key={index}
              id={index.toString()}
              name={element.name}
              img={element.img}
              price={element.price}
              category={element.category}
            />
          ))}
      </ul>

      <div className="totalBox">
        <StyledParagraph>
          <strong>Total</strong>
        </StyledParagraph>
        <StyledParagraph className="total">{totalValue()}</StyledParagraph>
      </div>
      <StyledButton $buttonSize="default" $buttonStyle="gray" onClick={clearCart}>
        Remover todos
      </StyledButton>
    </StyledCartProductList>
  );
};

export default CartProductList;
