import React, { type ReactNode } from 'react';
import Sidebar from '../components/Sidebar';
import '../styles.css';
import { useCloseSidebarOnNavigate } from '../hooks/useCloseBarOnNavigate';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  useCloseSidebarOnNavigate();
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;