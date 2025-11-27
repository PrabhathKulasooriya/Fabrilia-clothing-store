import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo/logo_3.png";
import cart_icon from "../../assets/Frontend_Assets/cart_icon.png";
import { ShopContext } from "../../Contex/ShopContext";
import { getUserFromToken } from "../../Utilities/auth";
import navProfile from "../../assets/nav-profile.png";
import logout_icon from "../../assets/logout_icon.svg"; 

const Navbar = () => {
  const user = getUserFromToken();
  const path = useLocation().pathname;

  const getMenuActive = () => {
    if (path === "/") return "shop";
    if (path.startsWith("/mens")) return "mens";
    if (path.startsWith("/womens")) return "womens";
    if (path.startsWith("/kids")) return "kids";
    return "";
  };

  const { getTotalCartItems } = useContext(ShopContext);

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    window.location.replace("/");
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
      </div>

      <ul className="nav-menu">
        <li data-active={getMenuActive() === "shop"}>
          <Link to="/">Shop</Link>
        </li>
        <li data-active={getMenuActive() === "mens"}>
          <Link to="/mens">Mens</Link>
        </li>
        <li data-active={getMenuActive() === "womens"}>
          <Link to="/womens">Womens</Link>
        </li>
        <li data-active={getMenuActive() === "kids"}>
          <Link to="/kids">Kids</Link>
        </li>
      </ul>

      <div className="nav-login-cart">
        <Link to="/cart">
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>

        {user ? (
          user.role === "admin" ? (
            <Link to="/admin">
              <button>Dashboard</button>
            </Link>
          ) : (
            <div className="nav-profile-group">
              <img src={navProfile} alt="" className="nav-profile" />
              <div className="nav-logout-icon nav-logout-icon-div"  onClick={handleLogout}>
                LogOut
                <img src={logout_icon} className="nav-logout-icon"/>
              </div>
            </div>
          )
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
