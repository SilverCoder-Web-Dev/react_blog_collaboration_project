import React from 'react';
import {
  MdDashboard,
  MdManageSearch,
  MdPostAdd,
  MdClose,
  MdMenu
} from 'react-icons/md';
import '../styles.css';
import { useSidebar } from '../contexts/SidebarContext';
import { Link } from 'react-router-dom';

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
            <Link to="/dashboard" className="nav-link">
              <MdDashboard size={20} />
              <span className={isOpen ? 'visible' : 'hidden'}>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/manage-posts" className="nav-link">
              <MdManageSearch size={20} />
              <span className={isOpen ? 'visible' : 'hidden'}>Manage Posts</span>
            </Link>
          </li>
          <li>
            <Link to="/create-post" className="nav-link">
              <MdPostAdd size={20} />
              <span className={isOpen ? 'visible' : 'hidden'}>Create Posts</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;