import { Outlet } from 'react-router-dom';

import { AppRouterProvider } from './routes/AppRouter';

import './App.css';

function App() {
  return (
    <AppRouterProvider>
      <Outlet />
    </AppRouterProvider>
  );
}

export default App;
