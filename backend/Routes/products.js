const express = require("express");
const Product = require("../models/Product");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// API for adding product 
router.post("/addproduct", async (req, res) => {
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
});

// API for delete product 
router.post("/removeproduct", async (req, res) => {
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
});

// API for getting all products 
router.get("/allproducts", async (req, res) => {
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
});

//API for new collection data

router.get("/newcollections", async (req, res)=>{
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("New Collection Fetched!");
  res.send(newcollection);
});

//popular in women

router.get("/popularwomen", async (req, res)=>{
  let products = await Product.find({category:"women"});
  let popularwomen = products.slice(0,4);
  console.log("Popular Women Fetched!");
  res.send(popularwomen);
});


//fetch middlware
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");

  if(!token){
    res.status(401).send({error: "Please authenticate using a valid token"});
  }
  try{
    const data = jwt.verify(token, 'secret_ecom');
    req.user = data.user;
    next();
  }catch(error){
    res.status(401).send({error: "Please authenticate using a valid token"});
  }
}

//API for adding cart data to databse
router.post("/addtocart", fetchUser, async (req, res)=>{
      let user = await User.findOne({_id: req.user.id});
      user.cartData[req.body.id] += 1;
      await User.findOneAndUpdate({_id: req.user.id}, {cartData: user.cartData});
      res.send("Product added to cart!");
});

//Remove product from cart data

router.post("/removefromcart", fetchUser, async (req, res)=>{
  let user = await User.findOne({_id: req.user.id});
  if (user.cartData[req.body.id]>0){
      user.cartData[req.body.id] -= 1;
      await User.findOneAndUpdate({ _id: req.user.id }, { cartData: user.cartData });
      res.send("Product removed from cart!");
  } 
})

//get cart data
router.get("/getcart", fetchUser, async (req, res)=>{
    const user = await User.findOne({ _id: req.user.id });
    res.json(user.cartData);
})

module.exports = router;
