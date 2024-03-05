import React from 'react';
import { Outlet } from 'react-router-dom';

import { CartProvider } from '../contexts';
import { Footer, Navbar } from '../components';

export const Layout = () => {
  return (
    <div className="App">
      <CartProvider>
        <Navbar />
        <main>
          <Outlet />
        </main>
      </CartProvider>
      {/* <Footer /> */}
    </div>
  );
};
