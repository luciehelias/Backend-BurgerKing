const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/BurgerKing");

const app = express();
app.use(express.json());
app.use(cors());

const userRoutes = require("./Routes/user");
const orderRoutes = require("./Routes/order");

app.use(userRoutes);
app.use(orderRoutes);

app.all("*", (req, res) => {
  return res.status(404).json("La page n'existe pas !");
});

app.listen(3000, () => {
  // Mon serveur va écouter le port 3000
  console.log("Server has started"); // Quand je vais lancer ce serveur, la callback va être appelée
});
