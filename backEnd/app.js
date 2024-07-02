const express = require("express");
const connectDB = require("./config/db");
const methodOverride = require("method-override");
const fileUpload = require("express-fileupload");
const userRoute = require("./routes/userRoute");
const categoryRoute = require("./routes/categoryRoute");
const productRoute = require("./routes/productRoute");
const ProductReviewRoute = require("./routes/productReviewRoute");
const dashboardRoute = require("./routes/dashboardRoute");
const cartRoute = require("./routes/cartRoute");
const favoriteRoute = require("./routes/favoriteRoute");
const productDetailsRoute = require("./routes/productDetailsRoute");
const sellerRoute = require("./routes/sellerRoute");
const orderRoute = require("./routes/orderRoute");
const addressRoute = require("./routes/addressRoute");
const paymentRoute = require("./routes/paymentRoute");
const variantRoute = require("./routes/variantRoute");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");

const app = express();
app.use(express.static("public"));

app.use(cors({ origin: "*" }));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const port = 3000;
try {
  connectDB();
  app.listen(port, () => {
    console.log(`App started on port ${port}`);
  });
} catch (error) {
  process.exit(1);
}
//Middlewares
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

app.use(fileUpload({ useTempFiles: true }));

//Routes

app.use("/users", userRoute);
app.use("/userprofile", dashboardRoute);
app.use("/categories", categoryRoute);
app.use("/products", productRoute);
app.use("/reviews", ProductReviewRoute);
app.use("/cart", cartRoute);
app.use("/favorite", favoriteRoute);
app.use("/product", productDetailsRoute);
app.use("/seller", sellerRoute);
app.use("/orders", orderRoute);
app.use("/addresses", addressRoute);
app.use("/payments", paymentRoute);
app.use("/variants", variantRoute);
