import { useState } from 'react';

import { ProductServices } from '../../../services';

export function useProducts() {
  const [cart, setCart] = useState([]);

  const products = ProductServices.getProducts();

  const isProductExistsInCart = (productId) =>
    cart.some((product) => product.id === productId);

  const addProductToCart = (product) => {
    if (isProductExistsInCart(product.id)) {
      alert('Already added!!!');
      return;
    }
    setCart([...cart, product]);
  };

  const removeProductFromCart = (productId) => {
    setCart(cart.filter((cartItem) => cartItem.id !== productId));
  };

  return {
    cart,
    products,
    isProductExistsInCart,
    addProductToCart,
    removeProductFromCart,
  };
}
