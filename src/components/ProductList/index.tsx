import { useContext, useEffect } from 'react';
import ProductCard from './ProductCard';
import { StyledProductList } from './style';
import { UserContext } from '../../providers/UserContext';

const ProductList = () => {
  const {getProducts, products} = useContext(UserContext);

  useEffect(() => {
    getProducts();
  })
  return (
  <StyledProductList>
    {products && products.map(element => <ProductCard key={element.id} id={element.id} category={element.category} img={element.img} name={element.name} price={element.price} />)}
  </StyledProductList>
)};

export default ProductList;
