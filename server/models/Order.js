const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },

      vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },

      title: {
        type: String,
        required: true
      },

      price: {
        type: Number,
        required: true
      },

      quantity: {
        type: Number,
        default: 1
      },

      image: {
        type: String
      }
    }
  ],

  total: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Processing"
  },

  paymentStatus: {
    type: String,
    enum: ["Paid", "Pending", "Failed"],
    default: "Paid"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Order", orderSchema);