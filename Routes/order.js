const express = require("express");
const Order = require("../Models/Order");
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");
// const { v4: uuidv4 } = require("uuid");

router.post("/order", async (req, res) => {
  try {
    const { products, totalAmount, status } = req.body;

    // Vérifiez si toutes les informations nécessaires sont fournies
    if (!products || !totalAmount || !status) {
      return res
        .status(400)
        .json({ message: "Des informations sont manquantes" });
    }

    const lastOrder = await Order.findOne().sort({ orderNumber: -1 });

    const newOrderNumber = lastOrder ? lastOrder.orderNumber + 1 : 1;

    const newOrder = new Order({
      products: products,
      totalAmount: totalAmount,
      status: status,
      orderNumber: newOrderNumber,
    });

    await newOrder.save();

    return res.status(201).json({
      message: "Commande créée avec succès",
      order: newOrder,
    });
  } catch (error) {
    console.error("Erreur lors de la création de la commande :", error);
    return res.status(500).json({ message: error.message });
  }
});

router.get("/orders", isAuthenticated, async (req, res) => {
  try {
    const orders = await Order.find({});
    console.log(orders);

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

router.get("/order/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

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

router.put("/order/:id", isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Le nouveau statut est requis" });
    }

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

module.exports = router;
