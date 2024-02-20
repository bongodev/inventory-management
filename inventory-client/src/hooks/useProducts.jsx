
import { ProductServices } from '../services';

export function useProducts() {
  const products = ProductServices.getProducts();

  return {
    products,
  };
}
