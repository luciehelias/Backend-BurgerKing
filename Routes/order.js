const express = require("express");
const Order = require("../Models/Order");
const router = express.Router();

router.post("/order", async (req, res) => {
  try {
    const { products, totalAmount, status } = req.body;

    if (!products || !totalAmount || !status) {
      return res
        .status(400)
        .json({ message: "Des informations sont manquantes" });
    }

    const newOrder = new Order({
      products: products,
      totalAmount: totalAmount,
      status: status,
    });

    await newOrder.save();

    return res.status(201).json({
      message: "Commande créée avec succès",
      order: newOrder,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/orders", async (req, res) => {});

router.put("/orders", async (req, res) => {});

module.exports = router;
