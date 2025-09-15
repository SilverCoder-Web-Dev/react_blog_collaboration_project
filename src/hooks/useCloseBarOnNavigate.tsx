// src/hooks/useCloseSidebarOnNavigate.tsx
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useSidebar } from '../contexts/SidebarContext';

export const useCloseSidebarOnNavigate = () => {
  const { closeSidebar, isOpen } = useSidebar();
  const location = useLocation();
  const prevPathname = useRef(location.pathname);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
        // Only close if:
    // 1. We're on mobile
    // 2. Sidebar is currently open
    // 3. Pathname actually changed (user navigated to new page)
    if (isMobile && isOpen && location.pathname !== prevPathname.current) {
      closeSidebar();
    }
    // Update ref to current pathname
    prevPathname.current = location.pathname;
  }, [location, closeSidebar, isOpen]);
};