import React from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom'
import add_product_icon from "../../../assets/Product_Cart.svg";
import list_product_icon from "../../../assets/Product_list_icon.svg";

const Sidebar = ({setActiveComponent}) => {
  return (
    <div className="sidebar">
      
        <div className="sidebar-item"
          onClick={() => setActiveComponent("addproduct")}
          >
          <img src={add_product_icon} alt="" />
          <p>Add Product</p>
        </div>
      
        <div className="sidebar-item" onClick={()=>setActiveComponent("listproduct")}>
          <img src={list_product_icon} alt="" />
          <p>Product List</p>
        </div>
      
    </div>
  );
}

export default Sidebar
