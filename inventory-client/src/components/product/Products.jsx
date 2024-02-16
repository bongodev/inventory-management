import { useProducts } from './hooks/useProducts';

import { ProductCard } from './productCard/ProductCard';

import './Products.css';

export const Products = () => {
  const {
    cart,
    products,
    isProductExistsInCart,
    addProductToCart,
    removeProductFromCart,
  } = useProducts();

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
