const mongoose = require("mongoose");

const Order = mongoose.model("Order", {
  products: [
    {
      name: {
        type: String,
      },
      quantity: {
        type: Number,
      },
    },
  ],
  status: {
    type: String,
  },
});

module.exports = Order;
