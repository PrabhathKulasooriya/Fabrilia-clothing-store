import React from 'react'
import './Navbar.css'
import logo from '../../../assets/logo/logo_3.png'
import navProfile from "../../../assets/nav-profile.svg";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className='nav-child-1'>
        <img src={logo} alt="" className="nav-logo" />
      </div>
      <div className='nav-child-2'>
        <h2>Admin Panel</h2>
      </div>
      <div className='nav-child-3'>
        <img src={navProfile} alt="" className="nav-profile" />
      </div>
    </div>
  );
}

export default Navbar
