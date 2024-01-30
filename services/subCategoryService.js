const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const SubCategory = require("../models/subCategoryModel");

exports.setCategoryIdToBody = (req, res, next) => {
  //Nested route
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

// @desc    Create subCategory
// @route   Post /api/v1/subcategories
// @access  Private
exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const subCategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subCategory });
});

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
exports.getSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * limit;

  const subCategories = await SubCategory.find(req.filterObject)
    .skip(skip)
    .limit(limit);
  //.populate({ path: "category", select: "name -_id" });
  res
    .status(200)
    .json({ results: subCategories.length, page, data: subCategories });
});

// @desc    Get spacific subCategories by id
// @route   Get /api/v1/subCategories/:id
// @access  Public
exports.getSubCategory = asyncHandler(async (req, res, next) => {
  // 1- then() catch(err)
  // 2- try() catch(err)
  // 3- asyncHandler(async) => express error handler
  const { id } = req.params;
  const subCategory = await SubCategory.findById(id);
  /*.populate({
    path: "category",
    select: "name -_id",
  })*/ if (!subCategory) {
    //res.status(404).json({msg: "No category for this id" + id});
    return next(new ApiError(`No category for this id${id}`, 404));
  }
  res.status(200).json({ data: subCategory });
});

// @desc    Update spacific category by id
// @route   Put /api/v1/categories/:id
// @access  Private
exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;
  const subCategory = await SubCategory.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
    { new: true }
  );
  if (!subCategory) {
    //res.status(404).json({msg: "No category for this id"});
    return next(new ApiError("No category for this id", 404));
  }
  res.status(200).json({ data: subCategory });
});

// @desc    Delete specific category by id
// @route   Delete /api/v1/categories/:id
// @access  Preivate
exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findByIdAndDelete(id);
  if (!subCategory) {
    //res.status(404).json({msg: "No category for this id"});
    return next("No category for this id", 404);
  }
  res.status(204).json();
});
