import React,{ useState, useEffect} from 'react'
import './ListProduct.css'
import cross_icon from '../../../assets/cross_icon.png';

const ListProduct = () => {

  const [products, setProducts] = useState([]);

  const fetchInfo = async ()=>{
     await fetch("http://localhost:4000/products/allproducts")
     .then((res)=>res.json())
     .then((data)=>{setProducts(data)});
  }

  useEffect(()=>{
    fetchInfo();
  },[]);

  const removeProduct = async (id)=>{
    await fetch ("http://localhost:4000/products/removeproduct",{
      method:"POST",
      headers:{
        Accept :"application/json",
        "Content-Type":"application/json"},
      body:JSON.stringify({id:id})
    })
    .then((res)=>res.json())
    .then((data)=>{
      data.success?alert("Product Removed!"):alert("Product Not Removed!");
    })

    fetchInfo();
  }

  return (
    <div className='list-product'>
      <h1>All Products</h1>
      <div className="listproducts-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>

      <div className="listproducts-allproducts">
        <hr />
        {products.map((product,index)=>{
          return (
            <>
              <div
                className="listproducts-format-main listproducts-format"
                key={index}
              >
                <img
                  src={product.image}
                  alt=""
                  className="listproducts-format-img"
                />
                <p>{product.name}</p>
                <p>{product.old_price} $</p>
                <p>{product.new_price} $</p>
                <p>{product.category}</p>
                <img
                  src={cross_icon}
                  alt=""
                  className="listproducts-removeitem"
                  onClick={() => {removeProduct(product.id)}}
                />
              </div>
              <hr />
            </>
          );
        })}
       
      </div>
    </div>
  )
}

export default ListProduct
