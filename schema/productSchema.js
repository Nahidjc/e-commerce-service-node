const mongoose = require("mongoose"); 

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    name: {
      type: String,
      require: true,
      trim: true,
    },
    image: {
      type: String,
      require: true,
      trim: true,
    },
    category: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    brand: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    countInStock: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
