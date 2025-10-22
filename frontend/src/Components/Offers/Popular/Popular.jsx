import React, {useState,useEffect} from "react";
import "./Popular.css";
import Item from "../../Item/Item.jsx";

const Popular = () => {

  const [products, setProducts] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:4000/products/popularwomen").then((res)=>res.json()).then((data)=>{setProducts(data)});
  },[]);


  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {products.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
