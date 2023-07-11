import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import logo from '../../assets/packmateLogo3.png'

const Header = () => {
  return (
    <div className='header'>
      <Link to='/' className='header-link'>
        <img src={logo} alt='Packmate Logo of a suitcase' className='logo' />
      </Link>
      <h1 className='app-name'>PackMate</h1>
    </div>
  );
};

export default Header;