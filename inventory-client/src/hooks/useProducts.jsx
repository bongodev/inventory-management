import { useEffect, useState } from 'react';
import { ProductServices } from '../services';

export function useProducts() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    ProductServices.getProducts()
      .then((data) => setProducts(data))
      .catch((e) => {
        console.error(e);
        alert('Failed to fetch products');
      })
      .finally(() => setIsLoading(false));
  }, []);

  return {
    isLoading,
    products,
  };
}
