import Product from "../models/Product.js";
import User from "../models/User.js";
import { uploadToCloudinary } from "../middlewares/upload.js";
import {cloudinary} from "../middlewares/upload.js";



// API for adding product
export const addProduct = async (req, res) => {
  try {
    // Validate that image was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "Product image is required",
      });
    }

    // Validate required fields
    if (
      !req.body.name ||
      !req.body.category ||
      !req.body.new_price ||
      !req.body.old_price
    ) {
      return res.status(400).json({
        success: false,
        error: "All fields are required",
      });
    }

    // Upload image to Cloudinary
    const cloudinaryResult = await uploadToCloudinary(req.file.buffer);
    const imageUrl = cloudinaryResult.secure_url;
    const cloudinary_id = cloudinaryResult.public_id;

    // Generate product ID
    let products = await Product.find({});
    let id;

    if (products.length > 0) {
      let last_product = products[products.length - 1];
      id = last_product.id + 1;
    } else {
      id = 1;
    }

    // Create new product
    const product = new Product({
      id: id,
      name: req.body.name,
      image: imageUrl, 
      cloudinary_id: cloudinary_id,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });

    console.log("Saving product:", product);
    await product.save();
    console.log("Product saved successfully!");

    res.json({
      success: true,
      message: "Product added successfully",
      product: {
        id: product.id,
        name: product.name,
        image: imageUrl,
        cloudinary_id: cloudinary_id,
        category: product.category,
        new_price: product.new_price,
        old_price: product.old_price,
      },
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to add product",
    });
  }
};

// API for delete product
export const removeProduct = async (req, res) => {
  try {
    // Find product first (so we can delete image)
    const product = await Product.findOne({ id: req.body.id });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Delete image from Cloudinary
    if (product.cloudinary_id) {
      await cloudinary.uploader.destroy(product.cloudinary_id);
      console.log("Cloudinary image removed!");
    }

    await Product.deleteOne({ id: req.body.id });

    console.log("Product Removed!");
    res.json({
      success: true,
      message: "Product and image removed successfully!",
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

    res.status(200).json({
      success: true,
      products: products,
    });
    
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
