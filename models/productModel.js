const ProductModel  = require("../schema/productSchema");


exports.upload = data => {
    const product = new ProductModel(data);
    return product.save();
  };