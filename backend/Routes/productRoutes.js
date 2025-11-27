import express from "express";
import fetchUser from "../middlewares/fetchUser.js";
import { addToCart, getCart, removeFromCart, getAllProducts, getPopularWomen, getNewCollections , addProduct, removeProduct } from "../controllers/productController.js";
import roleAuthentication from "../middlewares/roleAuthentication.js";

const productRouter = express.Router();

productRouter.post("/addproduct", fetchUser, roleAuthentication("admin"), addProduct);
productRouter.post("/removeproduct", fetchUser,roleAuthentication("admin"), removeProduct);
productRouter.get("/allproducts", getAllProducts);
productRouter.get("/newcollections", getNewCollections);
productRouter.get("/popularwomen", getPopularWomen);
productRouter.post("/addtocart", fetchUser, addToCart);
productRouter.post("/removefromcart", fetchUser, removeFromCart);
productRouter.get("/getcart", fetchUser, getCart);

export default productRouter;
