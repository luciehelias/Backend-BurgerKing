// Importation d'Express et création d'un routeur express
const express = require("express");
const router = express.Router();

// Importation des données des produits
const products = require("../data/products.json");

// Route pour récupérer tous les produits
router.get("/products", (req, res) => {
  return res.json(products); // Retourne les données des produits au format JSON
});

module.exports = router;
