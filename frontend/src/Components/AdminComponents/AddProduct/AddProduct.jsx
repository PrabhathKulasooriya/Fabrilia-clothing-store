import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../../../assets/upload_area.svg";

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    old_price: "",
    new_price: "",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changehandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  //Send Prodct to Backend
  const addProduct = async () => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append("product", image);

    await fetch("http://localhost:4000/upload", {
      method: "POST",
      headers: {
        accept: "application/json",
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        responseData = data;
      });

    if (responseData.success) {
      product.image = responseData.image_url;
      console.log(product);
      await fetch("http://localhost:4000/products/addproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        .then((data) => {
          data.success ? alert("Product Added") : alert("Error");
        });
    }
  };

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p className="title">Product Title</p>
        <input
          value={productDetails.name}
          onChange={changehandler}
          type="text"
          name="name"
          id="name"
          placeholder="Type Here"
        />
      </div>

      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changehandler}
            type="text"
            name="old_price"
            id="old_price"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changehandler}
            type="text"
            name="new_price"
            id="new_price"
          />
        </div>
      </div>

      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changehandler}
          name="category"
          id="category"
          className="addproduct-selector"
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>

      <div className="addproduct-itemfield">
        <label htmlFor="image-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            alt=""
            className="addproduct-thumbnail-img"
          />
        </label>
        <input
          type="file"
          name="image"
          id="image-input"
          onChange={imageHandler}
          hidden
        />
      </div>

      <div className="button_container">
        <button
          onClick={() => {
            addProduct();
          }}
          className="addproduct-btn"
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
