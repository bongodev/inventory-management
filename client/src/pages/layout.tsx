import { Outlet } from 'react-router';

import { QueryProvider } from '@/providers';

const Layout = () => {
  return (
    <div className="App">
      <QueryProvider>
        <Outlet />
      </QueryProvider>
    </div>
  );
};

export default Layout;
