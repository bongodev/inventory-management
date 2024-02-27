import { useEffect, useState } from 'react';
import { ProductServices } from '../services';

export function useProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    ProductServices.getProducts()
      .then((data) => setProducts(data))
      .catch((e) => {
        console.error(e);
        alert('Failed to fetch products');
      });
  }, []);

  return {
    products,
  };
}
