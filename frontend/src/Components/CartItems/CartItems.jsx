import React,{useContext} from 'react'
import './CartItems.css'
import {ShopContext} from '../../Contex/ShopContext'
import remove_icon from '../../assets/Frontend_Assets/cart_cross_icon.png'

const CartItems = () => {
    
    const {all_product,cartItems, removeFromCart, getTotalCartAmount} = useContext(ShopContext);

  return (
    <div className="cartItems">
      <div className="cartItems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      <div className="card-items-format ">
        {all_product.map((e) => {
          if (cartItems[e.id] > 0) {
            return (
              <div className="cart-items-format cartItems-format-main">
                <img src={e.image} alt="" className="carticon-product-icon" />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className="cartitems-quantity">
                  {cartItems[e.id]}
                </button>
                <p>${cartItems[e.id] * e.new_price}</p>
                <img
                  className="carticon-remove-icon"
                  src={remove_icon}
                  alt=""
                  onClick={() => {
                    removeFromCart(e.id);
                  }}
                    />
              </div>
            );
          }
          return null;
        })}
        <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>Cart Total</h1>
                <div className="">
                    <div className="cartitems-total-items">
                        <p>subtotal</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-items">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-items">
                        <h3>Total</h3>
                        <h3>${getTotalCartAmount()}</h3>
                    </div>
                </div>
                <button>Proceed To Checkout</button>
            </div>
            <div className="cartitems-promocode">
                <p>If you have a promo code, Enter it here</p>
                <div className="cartitems-promobox">
                    <input type="text" placeholder='Promo Code' />
                    <button>Apply</button>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}

export default CartItems
