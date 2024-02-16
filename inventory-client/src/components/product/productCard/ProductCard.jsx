import './ProductCard.css';

export function ProductCard({
  product,
  isAddedToCart,
  addToCart,
  removeFromCart,
}) {
  const handleAddToCart = () => addToCart(product);

  const handleRemoveFromCart = () => removeFromCart(product.id);

  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p>{`TK ${product.price}`}</p>
      <p>{`Quantity: ${product.quantity}`}</p>
      <button onClick={handleAddToCart} className="product-card-cart-btn">
        Add to Cart
      </button>
      {isAddedToCart && (
        <button
          className="product-card-cart-btn danger"
          onClick={handleRemoveFromCart}
        >
          Remove from Cart
        </button>
      )}
    </div>
  );
}
