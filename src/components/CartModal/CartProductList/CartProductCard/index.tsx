import { MdDelete } from "react-icons/md";

import { StyledCartProductCard } from "./style";
import { StyledTitle } from "../../../../styles/typography";
import { iCartProduct } from "../../../../providers/CartContext";

const CartProductCard = ({ id, name, img }: iCartProduct) => (
  <StyledCartProductCard id={id}>
    <div className="imageBox">
      <img src={img} alt={name} />
    </div>
    <div className="contentBox">
      <StyledTitle tag="h3" $fontSize="three">
        {name}
      </StyledTitle>
      <button type="button" aria-label="Remover">
        <MdDelete size={24} />
      </button>
    </div>
  </StyledCartProductCard>
);

export default CartProductCard;
