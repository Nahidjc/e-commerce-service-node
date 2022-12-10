const productModel = require("../models/productModel");
var cloudinary = require("cloudinary").v2;
const fs = require("fs");
cloudinary.config({
  cloud_name: "dptowkzy5",
  api_key: "748767756259122",
  api_secret: "v995w2mgWdkClaBUwK9vqG9Cm2k",
});

exports.productUpload = async (req, res) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };
  try {
    const { name, brand, user, category, description, price, countInStock } =
      req.body;;
    const file = await req.file;
    const result = await cloudinary.uploader.upload(file.path, options);

    const data = {
      name,
      brand,
      user,
      category,
      description,
      price,
      countInStock,
      image: result.url,
    };
    const product = await productModel.upload(data);
    fs.unlink(file.path, function (err) {
      if (err) throw err;
    });
    res.send({
      product: product,
      message: "Product Upload Successfully",
    });
  } catch (e) {
    return res.status(500).json({
      error: e.response,
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productModel.getProductById(productId)
    res.send({
      product: product,
      message: "Product fetched Successfully",
    });

  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
}

exports.getAllProducts = async (req, res) => {
  try {
    const products = await productModel.GetAllProducts()
    res.send({
      products: products,
      message: "Products fetched Successfully",
    });

  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
}