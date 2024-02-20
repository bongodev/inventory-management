import { useState } from 'react';

export const useProductCart = () => {
  const [cart, setCart] = useState([]);

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
    addProductToCart,
    removeProductFromCart,
    isProductExistsInCart,
  };
};
