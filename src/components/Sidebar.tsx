import React from 'react';
import {
  MdDashboard,
  MdArticle,
  MdPeople,
  MdSettings,
  MdClose,
  MdMenu
} from 'react-icons/md';
import '../styles.css';
import { useSidebar } from '../contexts/SidebarContext';

const Sidebar: React.FC = () => {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`} aria-label="Main navigation">
      <div className="sidebar-header">
        <div className="logo-section">
          <h2 className={isOpen ? 'visible' : 'hidden'}>Admin Panel</h2>
        </div>

        {/* 👇 Show toggle button ONLY on desktop */}
       <button
          className="toggle-btn"
          onClick={toggleSidebar}
          aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {isOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
        </button>
      </div>

      <nav className="sidebar-nav" aria-label="Sidebar menu">
        <ul>
          <li>
            <a href="/" className="nav-link">
              <MdDashboard size={20} />
              <span className={isOpen ? 'visible' : 'hidden'}>Dashboard</span>
            </a>
          </li>
          <li>
            <a href="/posts" className="nav-link">
              <MdArticle size={20} />
              <span className={isOpen ? 'visible' : 'hidden'}>Posts</span>
            </a>
          </li>
          <li>
            <a href="/users" className="nav-link">
              <MdPeople size={20} />
              <span className={isOpen ? 'visible' : 'hidden'}>Users</span>
            </a>
          </li>
          <li>
            <a href="/settings" className="nav-link">
              <MdSettings size={20} />
              <span className={isOpen ? 'visible' : 'hidden'}>Settings</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;