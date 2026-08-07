import React, { useState } from 'react';
import { Sun, Moon, Bell, ChevronDown } from 'lucide-react';
import './Navbar.css';

function Navbar() {
    const [activeTab, setActiveTab] = useState('Home');
    const [isDarkMode, setIsDarkMode] = useState(false);



  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'My Trips', href: '#' },
    { name: 'Budget', href: '#' },
    { name: 'Explore', href: '#' },
  ];

  return (
    <nav className="navigo-navbar">
      {/* Brand Logo */}
      <div className="navigo-logo">
        Navigo
      </div>

      {/* Navigation Links */}
      <div className="navigo-links">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setActiveTab(link.name)}
            className={`navigo-link ${activeTab === link.name ? 'active' : ''}`}
          >
            {link.name}
          </a>
        ))}
      </div>

      {/* Action Buttons & Avatar */}
      <div className="navigo-actions">
    {/* Theme Toggle Button */}
    <button 
      className="icon-btn" 
      aria-label="Toggle Theme"
      onClick={() => setIsDarkMode(!isDarkMode)}
    >
      {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>

    {/* Notification Button */}
    <button className="icon-btn" aria-label="Notifications">
      <Bell size={20} />
      <span className="notification-indicator"></span>
    </button>

    {/* Profile Dropdown Trigger */}
    <button className="profile-dropdown-btn" aria-label="User profile menu">
      <div className="avatar-wrapper">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuwgkNEyprSqgCSZqPXy8SYM-M0pF1UULCQQuSUlc8SgR7BtWzayWAS2eF7VKviMtCFZgQv-hPz5TJfaexJmvHryF7XCP0LrGFQv9aGw_zTr6rEWKN-ge04-OtvNoreljtgawPl_wdaeEf8q93sn2fHG0g5DYwCprPFVB8lPpo2gkKzh_GdXNHtRfydtDyH-soCf26GpatJBuqBU-ZPW2GjqGdgWqyKPG5nmHxclOGZdexwZIh8juAqQ"
          alt="User profile"
          className="avatar-img"
        />
      </div>
      <ChevronDown size={16} className="text-slate-500" />
    </button>
  </div>
    </nav>
  );
}

export default Navbar;