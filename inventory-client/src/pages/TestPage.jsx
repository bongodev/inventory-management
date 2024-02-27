import React, { useEffect, useState } from 'react';

export const TestPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(
      'https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json'
    )
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((e) => console.error(e));
  }, []);

  return (
    <div>
      {products.map((product) => (
        <h1 key={product.name}>{product.name}</h1>
      ))}
    </div>
  );
};
