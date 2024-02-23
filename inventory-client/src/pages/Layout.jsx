import React from 'react';
import { CartProvider } from '../contexts';
import { Footer, Navbar, Products } from '../components';

export const Layout = () => {
  return (
    <div className="App">
      <CartProvider>
        <Navbar />
        <main>
          <Products />
        </main>
      </CartProvider>
      <Footer />
    </div>
  );
};
