import React from 'react'
import './AdminNavbar.css'
import logo from '../../../assets/logo/logo_3.png'
import navProfile from "../../../assets/nav-profile.svg";
import { Link } from 'react-router-dom';
import logout_icon from "../../../assets/logout_icon.svg";

const AdminNavbar = () => {

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    window.location.replace("/");
  };

  return (
    <div className="navbar">
      <div className="nav-child-1">
        <Link to="/">
          <img src={logo} alt="" className="nav-logo" />
        </Link>
      </div>

      <div className="nav-child-2">
        <h2>Admin Panel</h2>
      </div>
      <div className="nav-child-3 ">
        <div className="nav-profile-group">
          <img src={navProfile} alt="" className="nav-profile" />
          <div
            className="nav-logout-icon nav-logout-icon-div"
            onClick={handleLogout}
          >
            LogOut
            <img src={logout_icon} className="nav-logout-icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminNavbar
