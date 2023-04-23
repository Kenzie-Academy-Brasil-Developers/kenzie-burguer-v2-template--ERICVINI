import { useContext, useEffect } from 'react';
import ProductCard from './ProductCard';
import { StyledProductList } from './style';
import { UserContext } from '../../providers/UserContext';

const ProductList = () => {
  const {getProducts, products} = useContext(UserContext);

  useEffect(() => {
    getProducts();
  }, [])
  return (
  <StyledProductList>
    {products && products.map(element => <ProductCard key={element.id} element={element} />)}
  </StyledProductList>
)};

export default ProductList;
