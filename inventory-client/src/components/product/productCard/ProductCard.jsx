import './ProductCard.css';

export function ProductCard({ product, isAddedToCart, addToCart }) {
  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p>{`TK ${product.price}`}</p>
      <p>{`Quantity: ${product.quantity}`}</p>
      <button onClick={handleAddToCart} className="product-card-cart-btn">
        Add to Cart
      </button>
      {isAddedToCart && (
        <button className="product-card-cart-btn danger">
          Remove from Cart
        </button>
      )}
    </div>
  );
}
