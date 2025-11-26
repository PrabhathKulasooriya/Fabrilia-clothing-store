import Product from "../models/Product.js";
import User from "../models/User.js";

// API for adding product
export const addProduct = async (req, res) => {
  try {
    let products = await Product.find({});
    let id;

    if (products.length > 0) {
      let last_product_array = products.slice(-1);
      let last_product = last_product_array[0];
      id = last_product.id + 1;
    } else {
      id = 1;
    }

    const product = new Product({
      id: id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });

    console.log(product);
    await product.save();
    console.log("Product Saved!");

    res.json({
      success: true,
      name: req.body.name,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// API for delete product
export const removeProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndDelete({ id: req.body.id });

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    console.log("Product Removed!");
    res.json({
      success: true,
      name: req.body.name,
    });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// API for getting all products
export const getAllProducts = async (req, res) => {
  try {
    let products = await Product.find({});
    console.log("Products Fetched!");
    res.send(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// API for new collection data
export const getNewCollections = async (req, res) => {
  try {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("New Collection Fetched!");
    res.send(newcollection);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Popular in women
export const getPopularWomen = async (req, res) => {
  try {
    let products = await Product.find({ category: "women" });
    let popularwomen = products.slice(0, 4);
    console.log("Popular Women Fetched!");
    res.send(popularwomen);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// API for adding cart data to database
export const addToCart = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.userId }); 
    user.cartData[req.body.id] += 1;
    await User.findOneAndUpdate(
      { _id: req.userId },
      { cartData: user.cartData }
    ); 
    res.send("Product added to cart!");
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Remove product from cart data
export const removeFromCart = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.userId }); 
    if (user.cartData[req.body.id] > 0) {
      user.cartData[req.body.id] -= 1;
      await User.findOneAndUpdate(
        { _id: req.userId },
        { cartData: user.cartData }
      ); 
      res.send("Product removed from cart!");
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get cart data
export const getCart = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId }); 
    res.json(user.cartData);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
