import mongoose from "mongoose";
import "dotenv/config";
import path from "path";
import fs from "fs";
import Product from "./models/Product.js";
import { uploadToCloudinary } from "./middlewares/upload.js"; // <-- update this path

// 1. Connect to MongoDB
await mongoose.connect(process.env.MONGODB_URI);
console.log("Connected to DB");

// 2. Find products still using local image URL
const products = await Product.find({
  image: { $regex: /^http:\/\/localhost/ }, // matches old images
});

console.log(`Found ${products.length} products with local images`);

for (const product of products) {
  try {
    // Example old URL:
    // http://localhost:5000/images/product_1732663471.png
    const fileName = product.image.split("/").pop(); // product_1732663471.png
    const localPath = path.join(process.cwd(), "upload/images", fileName);

    if (!fs.existsSync(localPath)) {
      console.log("❌ File missing:", localPath);
      continue;
    }

    // Read file into buffer
    const fileBuffer = fs.readFileSync(localPath);

    // Upload to Cloudinary
    const result = await uploadToCloudinary(
      fileBuffer,
      "ecommerce-products" // folder name in Cloudinary
    );

    // Update MongoDB
    product.image = result.secure_url;
    product.cloudinary_id = result.public_id; // optional
    await product.save();

    console.log("✔ Migrated:", fileName);
  } catch (err) {
    console.log("⚠️ Error migrating product:", product.id, err.message);
  }
}

// Done
console.log("Migration complete!");
mongoose.connection.close();
