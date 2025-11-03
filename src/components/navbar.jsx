import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './navbar.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <nav className="navbar navbar-expand-lg sticky-top shadow-sm custom-navbar">
      <div className="container-fluid px-3 px-lg-4 py-3">
        <a className="navbar-brand" href="#">Navbar</a>
        
        <button 
          className="navbar-toggler btn navbar-toggler-custom" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNavAltMarkup" 
          aria-controls="navbarNavAltMarkup" 
          aria-expanded={isMenuOpen} 
          aria-label="Toggle navigation"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="navbar-toggler-icon">
            <svg className="menu-icon" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
          </span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="flex-grow-1 search-container-full me-3 my-3 my-lg-0">
            <div className="input-group search-input-group">
              <span className="input-group-text search-icon-wrapper">
                <svg className="search-icon" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 2a8 8 0 105.293 14.707l4.5 4.5a1 1 0 001.414-1.414l-4.5-4.5A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z"/>
                </svg>
              </span>
              <input 
                type="text" 
                className="form-control search-input"
                placeholder="Cari peserta..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search"
              />
            </div>
          </div>

          <div className="navbar-nav">
            <Link className="nav-link btn btn-navbar-right" aria-current="page" to="/">
              Peserta
            </Link>
            <Link className="nav-link btn btn-navbar-right" to="/tentang-kami">
              Tentang Kami
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}