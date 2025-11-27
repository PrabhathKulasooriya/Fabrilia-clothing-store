import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../../../assets/upload_area.svg";
import { useLoading } from "../../../Contex/LoadingContext";

const AddProduct = () => {
  const {setLoading} = useLoading();
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
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

  //Send Product to Backend
  const addProduct = async () => {
    if (!image) {
      alert("Please select an image");
      return;
    }

    let formData = new FormData();

    // Append the image
    formData.append("product", image);

    // Append all product details
    formData.append("name", productDetails.name);
    formData.append("category", productDetails.category);
    formData.append("old_price", productDetails.old_price);
    formData.append("new_price", productDetails.new_price);

    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:4000/products/addproduct",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "auth-token": `${localStorage.getItem("auth-token")}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Product Added");
        // Reset form
        setProductDetails({
          name: "",
          category: "women",
          old_price: "",
          new_price: "",
        });
        setImage(false);
      } else {
        alert("Error: " + (data.message || "Failed to add product"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add product");
    } finally {
      setLoading(false);
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
