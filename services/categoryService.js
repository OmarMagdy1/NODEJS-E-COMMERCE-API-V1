const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const categoryModel = require("../models/categoryModel");

// @desc    Get list of categories
// @route   Get /api/v1/categories
// @access  Public
exports.getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * limit;
  const categories = await categoryModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: categories.length, page, data: categories });
});

// @desc    Get spacific category by id
// @route   Get /api/v1/categories/:id
// @access  Public
/*
exports.getCategory = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const category = await categoryModel.findById(id);
    if(!category){
        res.status(404).json({msg: "No category for this id"});
    }
    res.status(200).json({data: category});
});
*/

exports.getCategory = asyncHandler(async (req, res, next) => {
  // 1- then() catch(err)
  // 2- try() catch(err)
  // 3- asyncHandler(async) => express error handler
  const { id } = req.params;
  const category = await categoryModel.findById(id);
  if (!category) {
    //res.status(404).json({msg: "No category for this id" + id});
    return next(new ApiError(`No category for this id${id}`, 404));
  }
  res.status(200).json({ data: category });
});

/*
exports.getCategory = async (req, res) => {
    const id = req.params.id;
    try {
        const category = await categoryModel.findById(id);
        res.status(200).json({data: category});
    } catch (error) {
        res.status(404).json({msg: "No category for this id" + id});
    }
};
*/
// @desc    Create category
// @route   Post /api/v1/categories
// @access  Private
exports.createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = await categoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

// @desc    Update spacific category by id
// @route   Put /api/v1/categories/:id
// @access  Private
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await categoryModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!category) {
    //res.status(404).json({msg: "No category for this id"});
    return next(new ApiError("No category for this id", 404));
  }
  res.status(200).json({ data: category });
});

/*
exports.updateCategory = async (req, res) => {
    const {id} = req.params;
    const name = req.body.name;
    try {
        const category = await categoryModel.findOneAndUpdate({_id: id}, {name, slug: slugify(name)}, {new: true});
        res.status(200).json({data: category});
    } catch (error) {
        res.status(404).json({msg: "No category for this id"});
    }
};
*/
// @desc    Delete specific category by id
// @route   Delete /api/v1/categories/:id
// @access  Preivate
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await categoryModel.findByIdAndDelete(id);
  if (!category) {
    //res.status(404).json({msg: "No category for this id"});
    return next("No category for this id", 404);
  }
  res.status(204).json();
});
/*
exports.deleteCategory = async (req, res) => {
    const {id} = req.params;
    try {
        const category = await categoryModel.findByIdAndDelete(id);
        res.status(204).json();
    } catch (error) {
        res.status(404).json({msg: "No category for this id"});
    }
};
*/

/*
exports.getCategories =  (req,res) => {
    res.send();
    const name = req.body.name;
    console.log(req.body);
    const newCategory = new categoryModel({name, slug: slugify(name)});
    newCategory.save()
    .then((doc) => {
        res.json(doc);
    })
    .catch((err)=>{
        res.json(err);
    }); 
};
exports.createCategory = asyncHandler(async (req,res) => {
    const name = req.body.name;
    const category = await categoryModel.create({name, slug: slugify(name)});
    res.status(201).json({data: category});
    try {

    } catch(err){
        res.status(400).send(err)
    }
    categoryModel.create({name, slug: slugify(name)})
    .then((category) => 
        res.status(201).json({data: category})
    ).catch((err) => res.status(400).send(err));
});
*/
