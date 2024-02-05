const slugify = require("slugify");
const { check } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");

//    // 1- rules
//    check("id").isMongoId().withMessage("Invalid query id"),
//    validatorMiddleware,
//];

exports.getCategoryValidator = [
  // 1- rules
  check("id").isMongoId().withMessage("Invalid query id"),
  validatorMiddleware,
];

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("SubCategory required")
    .isLength({ min: 2 })
    .withMessage("Too short Subcategory name")
    .isLength({ max: 32 })
    .withMessage("Too long Subcategory name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("category")
    .notEmpty()
    .withMessage("subCategory must be belong to category")
    .isMongoId()
    .withMessage("Invalid Category id"),
  validatorMiddleware,
];

exports.updateSubCategoryValidator = [
  // 1- rules
  check("id").isMongoId().withMessage("Invalid query id"),
  check("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddleware,
];

exports.deleteSubCategoryValidator = [
  // 1- rules
  check("id").isMongoId().withMessage("Invalid query id"),
  validatorMiddleware,
];
