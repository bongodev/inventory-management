import { Link } from 'react-router-dom';

import { useProducts } from '../../hooks';
import { Box } from '../../ui';

import { ProductCard } from './productCard/ProductCard';

import './Products.css';

export const Products = () => {
  const { products } = useProducts();

  return (
    <div className="products">
      <Box>
        <Link to="/product-form">Add Product</Link>
      </Box>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
