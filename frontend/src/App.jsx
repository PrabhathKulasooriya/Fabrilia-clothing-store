import {useState} from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Routes, Route, useLocation } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import men_banner from '../src/assets/Frontend_Assets/banner_mens.png';
import women_banner from '../src/assets/Frontend_Assets/banner_womens.png';
import kid_banner from '../src/assets/Frontend_Assets/banner_kids.png';
import Admin from './Pages/Admin';
import AdminNavbar from './Components/AdminComponents/AdminNavbar/AdminNavbar';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import Loading from './Pages/Loading';
import { useLoading } from './Contex/LoadingContext';


const App = () => {

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
 const { loading } = useLoading();

  if(loading) return <Loading />

  return (
    <div>
      {isAdminRoute ? <AdminNavbar /> :<Navbar />}

      <Routes>
        <Route path="/" element={<Shop />} />
        <Route
          path="/mens"
          element={<ShopCategory banner={men_banner} category="men" />}
        />
        <Route
          path="/womens"
          element={<ShopCategory banner={women_banner} category="women" />}
        />
        <Route
          path="/kids"
          element={<ShopCategory banner={kid_banner} category="kid" />}
        />
        <Route path="/product" element={<Product />}>
          <Route path=":productId" element={<Product />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginSignup />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute role="admin"> <Admin/> </ProtectedRoute>}/>
        {/* <Route path="/admin" element={<Admin />} /> */}
      </Routes>

      <Footer />
    </div>
  );
}

export default App
