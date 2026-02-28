const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      vendor: req.user.id
    });

    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getProducts = async (req, res) => {
  const products = await Product.find().populate("vendor", "name");
  res.json(products);
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};