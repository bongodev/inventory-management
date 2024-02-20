import { useProductCart } from '../hooks';

const { createContext } = require('react');

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const {
    cart,
    addProductToCart,
    removeProductFromCart,
    isProductExistsInCart,
  } = useProductCart();

  return (
    <CartContext.Provider
      value={{
        cart,
        isProductExistsInCart,
        addProductToCart,
        removeProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
