import { MdDelete } from "react-icons/md";

import { StyledCartProductCard } from "./style";
import { StyledTitle } from "../../../../styles/typography";
import { CartContext, iCartProduct } from "../../../../providers/CartContext";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const CartProductCard = ({ id, name, price, img }: iCartProduct) => {
  const { removeFromCart, setTotalValue, totalValue } = useContext(CartContext);
  const [count, setCount] = useState(1);

  const addItem = () => {
    setCount(count + 1);
    setTotalValue(totalValue + Number(price))
  }
  const subItem = () => {
    if(count-1 !== 0) {
      setCount(count - 1);
      setTotalValue(totalValue - Number(price))
    }else {
      toast.warn("Quantia mínima atingida")
    }
  }

  return (
    <StyledCartProductCard id={id}>
      <div className="imageBox">
        <img src={img} alt={name} />
      </div>
      <div className="contentBox">
        <StyledTitle tag="h3" $fontSize="three">
          {name}
          <div className="productCount">
            <button onClick={subItem}>-</button>
            <p>{count}</p>
            <button onClick={addItem}>+</button>
          </div>
        </StyledTitle>
        <button
          type="button"
          aria-label="Remover"
          onClick={() => removeFromCart(id)}
        >
          <MdDelete size={24} />
        </button>
      </div>
    </StyledCartProductCard>
  );
};

export default CartProductCard;
