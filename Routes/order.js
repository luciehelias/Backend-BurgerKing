// Importation des modules nécessaires
const express = require("express");
const Order = require("../Models/Order");
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");

const cors = require("cors");
app.use(cors());

// Route pour créer une nouvelle commande
router.post("/order", async (req, res) => {
  try {
    const { products, totalAmount, status } = req.body;

    // Vérification des informations manquantes
    if (!products || !totalAmount || !status) {
      return res
        .status(400)
        .json({ message: "Des informations sont manquantes" });
    }

    // Récupération du dernier numéro de commande
    const lastOrder = await Order.findOne().sort({ orderNumber: -1 });
    const newOrderNumber = lastOrder ? lastOrder.orderNumber + 1 : 1;

    // Création de la nouvelle commande
    const newOrder = new Order({
      products: products,
      totalAmount: totalAmount,
      status: status,
      orderNumber: newOrderNumber,
    });

    await newOrder.save(); // Sauvegarde de la commande

    return res.status(201).json({
      message: "Commande créée avec succès",
      order: newOrder,
    });
  } catch (error) {
    console.error("Erreur lors de la création de la commande :", error);
    return res.status(500).json({ message: error.message });
  }
});

// Route pour récupérer toutes les commandes
router.get("/orders", isAuthenticated, async (req, res) => {
  try {
    const orders = await Order.find({}); // Récupération des commandes

    if (orders.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucune commande n'a été trouvée" });
    }

    return res.status(200).json({
      message: "Toutes les commandes ont été trouvées",
      orders: orders,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Route pour récupérer une commande par ID
router.get("/order/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id); // Recherche de la commande par ID

    if (!order) {
      return res
        .status(400)
        .json({ message: "Aucune commande ne correspond à cet id" });
    }

    return res.status(200).json({
      message: "La commande a été trouvée",
      order: order,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Route pour mettre à jour le statut d'une commande
router.put("/order/:id", isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Vérification du statut requis
    if (!status) {
      return res.status(400).json({ message: "Le nouveau statut est requis" });
    }

    // Mise à jour de la commande
    const order = await Order.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );

    if (!order) {
      return res
        .status(404)
        .json({ message: "Aucune commande ne correspond à cet id" });
    }

    return res.status(200).json({
      message: "Le statut de la commande a été mis à jour avec succès",
      order: order,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Route pour supprimer toutes les commandes terminées
router.delete("/orders/completed", isAuthenticated, async (req, res) => {
  try {
    // Suppression des commandes terminées
    const result = await Order.deleteMany({ status: "Terminée" });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "Aucune commande terminée à supprimer." });
    }

    return res.status(200).json({
      message: `${result.deletedCount} commande(s) terminée(s) supprimée(s) avec succès`,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erreur du serveur", error: error.message });
  }
});

// Exportation du routeur
module.exports = router;
