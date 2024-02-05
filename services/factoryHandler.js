const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");

exports.createOne = (model) =>
  asyncHandler(async (req, res) => {
    //req.body.slug = slugify(req.body.title);
    const document = await model.create(req.body);
    res.status(201).json({ data: document });
  });

exports.getAll = (model) =>
  asyncHandler(async (req, res) => {
    let filter = {};
    if (req.filterObject) {
      filter = req.filterObject;
    }
    // Build query
    const documentsCounts = await model.countDocuments();
    const apiFeatures = new ApiFeatures(model.find(filter), req.query)
      .filter()
      .paginate(documentsCounts)
      .sort()
      .limitFields()
      .search();
    // Execute query
    const { mongooseQuery, paginationResult } = apiFeatures;
    const documents = await mongooseQuery;
    res
      .status(200)
      .json({ results: documents.length, paginationResult, data: documents });
  });

exports.getOne = (model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await model.findById(id);
    if (!document) {
      return next(new ApiError(`No category for this id${id}`, 404));
    }
    res.status(200).json({ data: document });
  });

exports.updateOne = (model) =>
  asyncHandler(async (req, res, next) => {
    const document = await model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!document) {
      return next(
        new ApiError(`No category for this id ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ data: document });
  });

exports.deleteOne = (model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await model.findByIdAndDelete(id);
    if (!document) {
      return next("No category for this id", 404);
    }
    res.status(204).json();
  });
