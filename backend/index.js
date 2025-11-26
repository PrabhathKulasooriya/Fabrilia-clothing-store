import express from "express";
import "dotenv/config";
import connectDB from "./configs/db.js";
import multer from "multer";
import path from "path";
import cors from "cors";


const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());

await connectDB();

const ProductRoutes = require("./Routes/products");
const UserRoutes = require("./Routes/user");


app.get("/", (req, res) => {res.send("Backend is running");});



//Image Storage
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

//Upload endpoint for images
app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

//Product Routes
app.use("/products", ProductRoutes);

//User Routes
app.use("/user", UserRoutes);


app.listen(port, (error) => {
  if (!error) {
    console.log(`Server is running on port ${port}`);
  } else {
    console.log(error);
  }
});
