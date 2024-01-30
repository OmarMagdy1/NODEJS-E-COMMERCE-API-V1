const express = require("express");
const {
  createSubCategory,
  getSubCategory,
  getSubCategories,
  updateSubCategory,
  deleteSubCategory,
  setCategoryIdToBody,
  createFilterObject,
} = require("../services/subCategoryService");
const {
  createSubCategoryValidator,
  getCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require("../utils/validators/subCategoryValidators");

// mergeParams: Allows us to access parameters on other routes
// ex: we need to access categoryId from category router
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(setCategoryIdToBody, createSubCategoryValidator, createSubCategory)
  .get(createFilterObject, getSubCategories);

router
  .route("/:id")
  .get(getCategoryValidator, getSubCategory)
  .put(updateSubCategoryValidator, updateSubCategory)
  .delete(deleteSubCategoryValidator, deleteSubCategory);

module.exports = router;
