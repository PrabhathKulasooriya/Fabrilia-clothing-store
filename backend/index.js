require("dotenv").config();
const port = process.env.PORT;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");

app.use(express.json());
app.use(cors());

const ProductRoutes = require("./Routes/products");
const UserRoutes = require("./Routes/user");

//Database Connection with MongoDB
mongoose.connect(
  "mongodb+srv://prabhathkulasooriya:Ip123456@cluster0.ldmgbal.mongodb.net/fabrilia"
);

//API Creation

app.get("/", (req, res) => {
  res.send("Backend is running");
});

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
