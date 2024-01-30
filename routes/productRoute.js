const express = require("express");
const {
  getProductValidation,
  createProductValidation,
  updateProductValidation,
  deleteProductValidation,
} = require("../utils/validators/productValidators");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../services/productService");

const router = express.Router();

router.route("/").get(getProducts).post(createProductValidation, createProduct);
router
  .route("/:id")
  .get(getProductValidation, getProduct)
  .put(updateProductValidation, updateProduct)
  .delete(deleteProductValidation, deleteProduct);

module.exports = router;
