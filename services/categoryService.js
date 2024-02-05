const categoryModel = require("../models/categoryModel");
const factory = require("./factoryHandler");

// @desc    Get list of categories
// @route   Get /api/v1/categories
// @access  Public
exports.getCategories = factory.getAll(categoryModel);

// @desc    Get spacific category by id
// @route   Get /api/v1/categories/:id
// @access  Public
exports.getCategory = factory.getOne(categoryModel);

// @desc    Create category
// @route   Post /api/v1/categories
// @access  Private
exports.createCategory = factory.createOne(categoryModel);

// @desc    Update spacific category by id
// @route   Put /api/v1/categories/:id
// @access  Private
exports.updateCategory = factory.updateOne(categoryModel);

// @desc    Delete specific category by id
// @route   Delete /api/v1/categories/:id
// @access  Preivate
exports.deleteCategory = factory.deleteOne(categoryModel);
