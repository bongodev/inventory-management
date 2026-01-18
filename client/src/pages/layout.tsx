import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';

import { QueryProvider } from '@/providers';

const Layout = () => {
  const navigate = useNavigate();

  // check auth here from the cookies
  useEffect(() => {
    const checkAuthFromCookies = (): boolean => {
      // read the user info from local storage
      const user = localStorage.getItem('inv-user');
      return !!user;
    };

    const isAuthenticated = checkAuthFromCookies(); // implement this function
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, []);

  return (
    <div className="App">
      <QueryProvider>
        <Outlet />
      </QueryProvider>
    </div>
  );
};

export default Layout;
