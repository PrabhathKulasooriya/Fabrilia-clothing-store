import React,{useState} from "react";
import "./CSS/Admin.css";
import Sidebar from "../Components/AdminComponents/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import AddProduct from "../Components/AdminComponents/AddProduct/AddProduct";
import ListProduct from "../Components/AdminComponents/ListProduct/ListProduct";
import Navbar from "../Components/AdminComponents/AdminNavbar/AdminNavbar";

const Admin = () => {
  const [activeComponent, setActiveComponent] = useState("addproduct");
  return (
    <div className="admin">
      
      <Sidebar setActiveComponent={setActiveComponent}/>
      {activeComponent === "addproduct" && <AddProduct />}
      {activeComponent === "listproduct" && <ListProduct />}
    </div>
  );
};

export default Admin;
