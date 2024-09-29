const express = require("express");
const Order = require("../Models/Order");
const router = express.Router();

router.post("/orders", async (req, res) => {
  try {
    const products = req.body.products;
    const newOrder = new Order({
      products: products,
      status: status,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
