const ProductModel = require("../schema/productSchema");


exports.upload = async (data) => {
  const product = await new ProductModel(data);
  return product.save();
};

exports.GetAllProducts = async () => {
  const products = await ProductModel.find()
  return products
}

exports.getProductById = async (productId) => {
  const product = await ProductModel.findById(productId).exec()
  return product
}