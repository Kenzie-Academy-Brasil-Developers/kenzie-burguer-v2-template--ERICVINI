import { StyledProductCard } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph, StyledTitle } from '../../../styles/typography';
import { CartContext, iCartProduct } from '../../../providers/CartContext';
import { useContext } from 'react';

interface iElement{
  element: iCartProduct
}

const ProductCard = ({element}: iElement) => {

  const {addToCart} = useContext(CartContext);
  
  return (
  <StyledProductCard id={element.id} >
    <div className='imageBox'>
      <img src={element.img} alt={element.name} />
    </div>
    <div className='content'>
      <StyledTitle tag='h3' $fontSize='three'>
        {element.name}
      </StyledTitle>
      <StyledParagraph className='category'>{element.category}</StyledParagraph>
      <StyledParagraph className='price'>{Number(element.price).toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</StyledParagraph>
      <StyledButton $buttonSize='medium' $buttonStyle='green' onClick={() => addToCart(element, element.id)}>
        Adicionar
      </StyledButton>
    </div>
  </StyledProductCard>
)};

export default ProductCard;
