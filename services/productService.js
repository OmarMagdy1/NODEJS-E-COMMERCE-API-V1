const Product = require("../models/productModel");
const factory = require("./factoryHandler");

// @desc    Get list of products
// @route   Get /api/v1/products
// @access  Public
exports.getProducts = factory.getAll(Product);

// @desc    Get spacific product by id
// @route   Get /api/v1/products/:id
// @access  Public
exports.getProduct = factory.getOne(Product);

// @desc    Create product
// @route   Post /api/v1/products
// @access  Private
exports.createProduct = factory.createOne(Product);

// @desc    Update spacific product by id
// @route   Put /api/v1/products/:id
// @access  Private
exports.updateProduct = factory.updateOne(Product);

// @desc    Delete specific product by id
// @route   Delete /api/v1/products/:id
// @access  Preivate
exports.deleteProduct = factory.deleteOne(Product);
