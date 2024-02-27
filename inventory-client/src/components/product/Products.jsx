import { useEffect, useState } from 'react';
import { useProducts } from '../../hooks';

import { ProductCard } from './productCard/ProductCard';

import './Products.css';

export const Products = () => {
  const { products } = useProducts();
  const [count, setCount] = useState(0);

  const increaseCount = () => setCount(count + 1);

  useEffect(() => {
    if (count > 4) {
      alert('Reached maximum');
    }
    console.log('inside useEffect 1');
  }, [count]);

  useEffect(() => {
    console.log('inside useEffect 2');
  }, []);

  console.log('rendering....');

  return (
    <div className="products">
      <button onClick={increaseCount}>+</button>
      <p>{count}</p>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
