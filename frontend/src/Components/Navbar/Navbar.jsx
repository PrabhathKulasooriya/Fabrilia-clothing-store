import React ,{useContext} from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'
import logo from '../../assets/logo/logo_3.png'
import cart_icon from '../../assets/Frontend_Assets/cart_icon.png'
import { ShopContext } from '../../Contex/ShopContext';



const Navbar = () => {

    const path = useLocation().pathname;

    const getMenuActive = () => {
      if (path === "/") return "shop";
      if (path.startsWith("/mens")) return "mens";
      if (path.startsWith("/womens")) return "womens";
      if (path.startsWith("/kids")) return "kids";
      return "";
    };

      const {getTotalCartItems} = useContext(ShopContext);


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
        {localStorage.getItem("auth-token") ?
        <button onClick={() => {localStorage.removeItem("auth-token"); window.location.replace("/");}}>Logout</button> 
        :<Link to="/login">
          <button>Login</button>
        </Link>}
        <Link to="/cart">
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
}

export default Navbar
