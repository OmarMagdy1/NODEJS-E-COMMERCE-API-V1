const SubCategory = require("../models/subCategoryModel");
const factory = require("./factoryHandler");

exports.setCategoryIdToBody = (req, res, next) => {
  //Nested route
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

// @desc    Create subCategory
// @route   Post /api/v1/subcategories
// @access  Private
exports.createSubCategory = factory.createOne(SubCategory);

// Nested route
// Get  /api/v1//categories/:categoryId/subcategories
exports.createFilterObject = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObject = filterObject;
  next();
};
// @desc    Get list of subCategories
// @route   Get /api/v1/subCategories
// @access  Public
exports.getSubCategories = factory.getAll(SubCategory);

// @desc    Get spacific subCategories by id
// @route   Get /api/v1/subCategories/:id
// @access  Public
exports.getSubCategory = factory.getOne(SubCategory);
// @desc    Update spacific category by id
// @route   Put /api/v1/categories/:id
// @access  Private
exports.updateSubCategory = factory.updateOne(SubCategory);

// @desc    Delete specific category by id
// @route   Delete /api/v1/categories/:id
// @access  Preivate
exports.deleteSubCategory = factory.deleteOne(SubCategory);
