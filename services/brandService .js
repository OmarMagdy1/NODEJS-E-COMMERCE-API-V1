const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

const Brand = require("../models/brandModel ");

// @desc    Get list of brand
// @route   Get /api/v1/brands
// @access  Public
exports.getBrands = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * limit;
  const brands = await Brand.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: brands.length, page, data: brands });
});

// @desc    Get spacific brand by id
// @route   Get /api/v1/brands/:id
// @access  Public

exports.getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findById(id);
  if (!brand) {
    return next(new ApiError(`No category for this id${id}`, 404));
  }
  res.status(200).json({ data: brand });
});

// @desc    Create brand
// @route   Post /api/v1/brands
// @access  Private
exports.createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const brand = await Brand.create({ name, slug: slugify(name) });
  res.status(201).json({ data: brand });
});

// @desc    Update spacific category by id
// @route   Put /api/v1/categories/:id
// @access  Private
exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const brand = await Brand.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!brand) {
    //res.status(404).json({msg: "No category for this id"});
    return next(new ApiError("No category for this id", 404));
  }
  res.status(200).json({ data: brand });
});

// @desc    Delete specific category by id
// @route   Delete /api/v1/categories/:id
// @access  Preivate
exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findByIdAndDelete(id);
  if (!brand) {
    return next("No category for this id", 404);
  }
  res.status(204).json();
});
