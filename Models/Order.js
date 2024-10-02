const mongoose = require("mongoose");

const Order = mongoose.model("Order", {
  products: [
    {
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
  totalAmount: Number,
  status: String,
  orderNumber: {
    type: Number,
  },
});

module.exports = Order;
