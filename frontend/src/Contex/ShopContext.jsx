import React,{ useState, useEffect} from "react";


export const ShopContext = React.createContext(null);
const getDefaultCart=() =>{
        let cart = {};
        for(let i=0; i<300+1; i++){
            cart[i] = 0;
        }
        return cart;
     }

const ShopContextProvider = (props)=>{

    const [all_product, setAllProduct] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(()=>{
      fetch("http://localhost:4000/products/allproducts").then((res)=>res.json()).then((data)=>{
        setAllProduct(data);
      });

      if(localStorage.getItem("auth-token")){
        fetch("http://localhost:4000/products/getcart", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "auth-token": `${localStorage.getItem("auth-token")}`,
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setCartItems(data);
          });
      }
    },[]);
    
    const addToCart =(itemId)=>{
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        if(localStorage.getItem("auth-token")){
          fetch("http://localhost:4000/products/addtocart", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "auth-token": `${localStorage.getItem("auth-token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: itemId }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
            });

          console.log("Product added to cart!");
        }else{
          alert("You are not logged in");
          window.location.replace("/login");
        }
    }

    const removeFromCart = (itemId) => {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
      if(localStorage.getItem("auth-token")){
        fetch("http://localhost:4000/products/removefromcart", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "auth-token": `${localStorage.getItem("auth-token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: itemId }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
  
        console.log("Product removed from cart!");
      }else{
        alert("You are not logged in");
        window.location.replace("/login");
      }
    };

    const getTotalCartAmount = () => {
      let totalAmount = 0;
      for (const item in cartItems) {
        if (cartItems[item] > 0) {
          let itemInfo = all_product.find((product) => product.id === Number(item));
          totalAmount += cartItems[item] * itemInfo.new_price;
        }
      }
      return totalAmount;

    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
          if (cartItems[item] > 0) {
            totalItem += cartItems[item];
          }
        }
        return totalItem;
    }

    const contextValue = { all_product, cartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalCartItems };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider 