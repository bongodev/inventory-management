import { useState } from 'react';

import { ProductCard } from './productCard/ProductCard';

import { ProductServices } from '../../services';

import './Products.css';

export const Products = () => {
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

  return (
    <div className="products">
      <div>
        <h3>{`In cart: ${cart.length}`}</h3>
      </div>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isAddedToCart={isProductExistsInCart(product.id)}
            addToCart={addProductToCart}
            removeFromCart={removeProductFromCart}
          />
        ))}
      </div>
    </div>
  );
};
