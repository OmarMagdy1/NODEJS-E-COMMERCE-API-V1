const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apiFeatures");

// @desc    Get list of products
// @route   Get /api/v1/products
// @access  Public
exports.getProducts = asyncHandler(async (req, res) => {
  // 1) Filtration
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  //const queryStringObject = { ...req.query };
  //const excludeFields = ["page", "limit", "fields", "skip", "sort", "keyword"];
  //excludeFields.forEach((field) => delete queryStringObject[field]);

  //let queryStr = JSON.stringify(queryStringObject);
  //queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  // 2) Pagination
  //const page = req.query.page || 1;
  //const limit = req.query.limit || 50;
  //const skip = (page - 1) * limit;

  // Build query
  const documentsCounts = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .filter()
    .paginate(documentsCounts)
    .sort()
    .limitFields()
    .search();

  // Execute query
  const { mongooseQuery, paginationResult } = apiFeatures;
  const products = await mongooseQuery;

  res
    .status(200)
    .json({ results: products.length, paginationResult, data: products });
});
//let mongooseQuery = Product.find(JSON.parse(queryStr)).populate({ path: "category", select: "name -_id" });

// 3) Sorting
//if (req.query.sort) {
// price ,-sold => {price, -solid} price -sold
//  const sortBy = req.query.sort.split(",").join(" ");
//  mongooseQuery = mongooseQuery.sort(sortBy);
//} else {
//  mongooseQuery = mongooseQuery.sort("-createdAt");
//}

// 4) Fields limiting
//if (req.query.fields) {
//  const fields = req.query.fields.split(",").join(" ");
//  mongooseQuery = mongooseQuery.select(fields);
//} else {
//  mongooseQuery = mongooseQuery.select("-__v");
//}

// 5) Search
//if (req.query.keyword) {
//const query = {};
//query.$or = [
//  { title: { $regex: req.query.keyword, $options: "i" } },
//  { description: { $regex: req.query.keyword, $options: "i" } },
//];
//mongooseQuery = mongooseQuery.find(query);
//}

// @desc    Get spacific product by id
// @route   Get /api/v1/products/:id
// @access  Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate({
    path: "category",
    select: "name -_id",
  });
  if (!product) {
    return next(new ApiError(`No category for this id${id}`, 404));
  }
  res.status(200).json({ data: product });
});

// @desc    Create product
// @route   Post /api/v1/products
// @access  Private
exports.createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const product = await Product.create(req.body);
  res.status(201).json({ data: product });
});

// @desc    Update spacific product by id
// @route   Put /api/v1/products/:id
// @access  Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }
  const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!product) {
    return next(new ApiError("No category for this id", 404));
  }
  res.status(200).json({ data: product });
});

// @desc    Delete specific product by id
// @route   Delete /api/v1/products/:id
// @access  Preivate
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    return next("No category for this id", 404);
  }
  res.status(204).json();
});
