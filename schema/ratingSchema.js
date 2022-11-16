const mongoose = require("mongoose");

const productRatingSchema = mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  product:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
  },
  rating: {
    type: Number,
    require: true,
  },
  comment: {
    type: String,
  },
});

module.exports = mongoose.model("rating", productRatingSchema);