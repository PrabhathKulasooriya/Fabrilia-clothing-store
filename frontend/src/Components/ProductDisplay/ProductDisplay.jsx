import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from '../../assets/Frontend_Assets/star_icon.png'
import star_dull_icon from '../../assets/Frontend_Assets/star_dull_icon.png'
import { ShopContext } from '../../Contex/ShopContext';

const ProductDisplay = (props) => {
    const {product}=props;
    const {addToCart} = useContext(ShopContext);

  return (
    <div className="productDisplay">
      <div className="productDisplay-left">
        <div className="productDisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productDisplay-img">
          <img className="productDisplay-main-img" src={product.image} alt="" />
        </div>
      </div>

      <div className="productDisplay-right">
        <h1>{product.name}</h1>
        <div className="productDisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productDisplay-right-prices">
          <div className="productDisplay-right-price-old">
            ${product.old_price}
          </div>
          <div className="productDisplay-right-price-new">
            ${product.new_price}
          </div>
        </div>
        <div className="productDisplay-right-description">
          A lightweight, usually knitted, pullover shirt, close-fitting and
          typically with three-quarter length sleeves. It is a basic item of
          clothing in the fashion industry and is often worn with a pair of
          trousers, shorts, or a skirt.
        </div>

        <div className="productDisplay-right-size">
          <h1>Select Size</h1>
          <div className="productDisplay-right-sizes">
            <div className="">S</div>
            <div className="">M</div>
            <div className="">L</div>
            <div className="">XL</div>
            <div className="">XXL</div>
          </div>
        </div>

        <button type="button" onClick={(e)=>{e.preventDefault(); addToCart(product.id);}}>ADD TO CART</button>
        <p className="productDisplay-right-category">
          <span>Categoty : </span> Women, T-shirt ,Crop Top
        </p>
        <p className="productDisplay-right-category">
          <span>Tags : </span> Modern, Latest
        </p>
      </div>
    </div>
  );
}

export default ProductDisplay;
