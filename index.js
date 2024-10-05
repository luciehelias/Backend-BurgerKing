const express = require("express");
const cors = require("cors");

require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);

const app = express();
app.use(express.json());
app.use(
  cors()
  //   {
  //   origin: "https://leroidubiggyburger.netlify.app/",
  //   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  // }
);

const userRoutes = require("./Routes/user");
const orderRoutes = require("./Routes/order");
const productsRoutes = require("./Routes/product");

app.use(userRoutes);
app.use(orderRoutes);
app.use(productsRoutes);

app.all("*", (req, res) => {
  return res.status(404).json("This page doesn't exist at all!");
});

app.listen(process.env.PORT, () => {
  console.log("Server has started");
});
