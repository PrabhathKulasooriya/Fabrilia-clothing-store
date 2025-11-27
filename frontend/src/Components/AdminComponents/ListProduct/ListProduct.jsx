import React, { useState, useEffect } from "react";
import "./ListProduct.css";
import cross_icon from "../../../assets/cross_icon.png";

const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const fetchInfo = async (page = 1) => {
    try {
      const res = await fetch(
        `http://localhost:4000/products/allproducts?page=${page}`
      );
      const data = await res.json();

      setProducts(data.products);
      setCurrentPage(data.page);
      setTotalPages(data.totalPages);
      setTotalProducts(data.totalProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchInfo(currentPage);
  }, []);

  const removeProduct = async (id) => {
    try {
      const res = await fetch("http://localhost:4000/products/removeproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Product Removed!");
        // If current page becomes empty after deletion, go to previous page
        if (products.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
          fetchInfo(currentPage - 1);
        } else {
          fetchInfo(currentPage);
        }
      } else {
        alert("Product Not Removed!");
      }
    } catch (error) {
      console.error("Error removing product:", error);
      alert("Error removing product!");
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchInfo(newPage);
  };

  return (
    <div className="list-product">
      <h1>All Products ({totalProducts})</h1>
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
        {products.map((product, index) => {
          return (
            <React.Fragment key={product.id}>
              <div className="listproducts-format-main listproducts-format">
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
                  onClick={() => {
                    removeProduct(product.id);
                  }}
                />
              </div>
              <hr />
            </React.Fragment>
          );
        })}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          Previous
        </button>

        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ListProduct;
