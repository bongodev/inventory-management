import { Footer, Navbar, Products } from './components';

import { CartProvider } from './contexts';

import './App.css';

function App() {
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
}

export default App;
