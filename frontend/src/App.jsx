import Navbar from './Components/Navbar/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import AddProduct from './Components/AdminComponents/AddProduct/AddProduct';
import ListProduct from './Components/AdminComponents/ListProduct/ListProduct';



const App = () => {

  return (
    <div>
      <BrowserRouter>

        <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/mens" element={<ShopCategory banner={men_banner} category="men" />} />
            <Route path="/womens" element={<ShopCategory banner={women_banner} category="women" />} />
            <Route path="/kids" element={<ShopCategory banner={kid_banner} category="kid" />} />
            <Route path="/product" element={<Product />}>
              <Route path=":productId" element={<Product />}/>
              </Route>
            <Route path="/cart" element={<Cart />}/>
            <Route path="/login" element={<LoginSignup />}/>
            <Route path="/admin" element={<Admin/>}/>
          </Routes>

        <Footer />
        
      </BrowserRouter>
    </div>
  );
}

export default App
