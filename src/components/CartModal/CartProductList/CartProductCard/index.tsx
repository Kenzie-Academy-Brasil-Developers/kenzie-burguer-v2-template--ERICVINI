import { MdDelete } from "react-icons/md";

import { StyledCartProductCard } from "./style";
import { StyledTitle } from "../../../../styles/typography";
import { CartContext, iCartProduct } from "../../../../providers/CartContext";
import { useContext } from "react";

const CartProductCard = ({ id, name, img }: iCartProduct) => {
  const {removeFromCart} = useContext(CartContext);
  return (
  <StyledCartProductCard id={id}>
    <div className="imageBox">
      <img src={img} alt={name} />
    </div>
    <div className="contentBox">
      <StyledTitle tag="h3" $fontSize="three">
        {name}
      </StyledTitle>
      <button type="button" aria-label="Remover" onClick={() => removeFromCart(Number(id))}>
        <MdDelete size={24} />
      </button>
    </div>
  </StyledCartProductCard>
)};

export default CartProductCard;
