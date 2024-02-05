const factory = require("./factoryHandler");
const Brand = require("../models/brandModel ");

// @desc    Get list of brand
// @route   Get /api/v1/brands
// @access  Public
exports.getBrands = factory.getAll(Brand);

// @desc    Get spacific brand by id
// @route   Get /api/v1/brands/:id
// @access  Public
exports.getBrand = factory.getOne(Brand);

// @desc    Create brand
// @route   Post /api/v1/brands
// @access  Private
exports.createBrand = factory.createOne(Brand);

// @desc    Update spacific category by id
// @route   Put /api/v1/categories/:id
// @access  Private
exports.updateBrand = factory.updateOne(Brand);
// @desc    Delete specific category by id
// @route   Delete /api/v1/categories/:id
// @access  Preivate
exports.deleteBrand = factory.deleteOne(Brand);
