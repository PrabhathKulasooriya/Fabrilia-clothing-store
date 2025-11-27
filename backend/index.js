import express from "express";
import "dotenv/config";
import connectDB from "./configs/db.js";
import multer from "multer";
import path from "path";
import cors from "cors";
import userRouter from "./Routes/userRoutes.js";
import productRouter from "./Routes/productRoutes.js";
import fetchUser from "./middlewares/fetchUser.js";
import roleAuthentication from "./middlewares/roleAuthentication.js";


const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());

await connectDB();

app.get("/", (req, res) => {res.send("Backend is running");});


//Product Routes
app.use("/products", productRouter);

//User Routes
app.use("/user", userRouter);



app.listen(port, (error) => {
  if (!error) {
    console.log(`Server is running on port ${port}`);
  } else {
    console.log(error);
  }
});
