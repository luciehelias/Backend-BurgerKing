const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/BurgerKing");

const app = express();
app.use(express.json());
app.use(cors());

const userRoutes = require("./Routes/user");
const orderRoutes = require("./Routes/order");
const productsRoutes = require("./Routes/product");

app.use(userRoutes);
app.use(orderRoutes);
app.use(productsRoutes);

app.all("*", (req, res) => {
  return res.status(404).json("This page doesn't exist !");
});

app.listen(3000, () => {
  console.log("Server has started");
});
