import React from 'react';
import { Link } from 'react-router-dom'; 
import CartWidget from './CartWidget';

const NavBar = () => {
  return (
    <nav className="navbar" style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#1a1a1a',
      borderBottom: '1px solid #333'
    }}>

      
      <Link className="nav-logo" to="/" style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#fff', textDecoration: 'none' }}>
        <span style={{ color: '#00ff88' }}>Eco</span>Tech
      </Link>

      <ul className="nav-links" style={{
        display: 'flex',
        listStyle: 'none',
        gap: '2rem',
        margin: 0,
        padding: 0
      }}>
        
        <li>
          <Link to="/category/biotecnologia" style={{ color: '#aaa', fontSize: '1rem', textDecoration: 'none' }}>
            Biotecnología
          </Link>
        </li>
        <li>
          <Link to="/category/automatizacion" style={{ color: '#aaa', fontSize: '1rem', textDecoration: 'none' }}>
            Automatización
          </Link>
        </li>
        <li>
          <Link to="/category/hardware-eficiente" style={{ color: '#aaa', fontSize: '1rem', textDecoration: 'none' }}>
            Hardware Eficiente
          </Link>
        </li>
      </ul>

      <CartWidget />
    </nav>
  );
};

export default NavBar;