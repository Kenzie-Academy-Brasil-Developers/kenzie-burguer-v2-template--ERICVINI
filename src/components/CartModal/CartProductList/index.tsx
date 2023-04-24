import CartProductCard from "./CartProductCard";

import { StyledCartProductList } from "./style";
import { StyledButton } from "../../../styles/button";
import { StyledParagraph } from "../../../styles/typography";
import { useContext, useEffect } from "react";
import { CartContext } from "../../../providers/CartContext";

const CartProductList = () => {
  const { cart, clearCart, totalValue, setTotalValue } = useContext(CartContext);

  useEffect(() => {
    const values = cart.map((element) => element.price);
    const total = values.reduce((acc, curr) => acc + curr);
    setTotalValue(Number(total))
  }, []);
  return (
    <StyledCartProductList>
      <ul>
        {cart &&
          cart.map((element, index) => (
            <CartProductCard
              key={index}
              id={element.id}
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
        <StyledParagraph className="total">
          {totalValue.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </StyledParagraph>
      </div>
      <StyledButton
        $buttonSize="default"
        $buttonStyle="gray"
        onClick={clearCart}
      >
        Remover todos
      </StyledButton>
    </StyledCartProductList>
  );
};

export default CartProductList;
