const { check } = require("express-validator");

const validationMiddleware = require("../../middleware/validatorMiddleware");

const Category = require("../../models/categoryModel");

const SubCategory = require("../../models/subCategoryModel");

exports.createProductValidation = [
  check("title")
    .isLength({ min: 3 })
    .withMessage("Must be at least 3 characters")
    .notEmpty()
    .withMessage("Product required"),
  check("description")
    .isLength({ max: 2000 })
    .withMessage("")
    .notEmpty()
    .withMessage("Product description is required"),
  check("quantity")
    .notEmpty()
    .withMessage("Product quantity is required")
    .isNumeric()
    .withMessage("Product quantity must be number"),
  check("sold")
    .optional()
    .isNumeric()
    .withMessage("Product quantity must be number"),
  check("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isNumeric()
    .withMessage("Product price must be number")
    .isLength({ max: 32 })
    .withMessage("Too long price"),
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("Product priceAfterDiscount must be number")
    .toFloat()
    .custom((value, { req }) => {
      if (req.body.price < value) {
        throw new Error("priceAfterDiscount must be lower than price");
      }
      return true;
    }),
  check("colors")
    .optional()
    .isArray()
    .withMessage("colors should be array of colors"),
  check("imageCover").notEmpty().withMessage("Product imageCover is required"),
  check("images")
    .optional()
    .isArray()
    .withMessage("images should be array of strings"),
  check("category")
    .notEmpty()
    .withMessage("Product must be belong to category")
    .isMongoId()
    .withMessage("Invalid ID format")
    .custom((categoryId) =>
      Category.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(
            new Error(`No category for this id: ${categoryId}`)
          );
        }
      })
    ),
  check("subcategories")
    .optional()
    .isMongoId()
    .withMessage("Invalid ID format")
    .custom((subCategoriesIds) =>
      SubCategory.find({ _id: { $exists: true, $in: subCategoriesIds } }).then(
        (result) => {
          if (result.length < 1 || result.length !== subCategoriesIds.length) {
            return Promise.reject(new Error(`invalid subCategories Ids`));
          }
        }
      )
    )
    .custom((val, { req }) =>
      SubCategory.find({ category: req.body.category }).then(
        (subcategories) => {
          const subCategoriesInDB = [];
          subcategories.forEach((subCategory) => {
            subCategoriesInDB.push(subCategory._id.toString());
          });
          if (!val.every((v) => subCategoriesInDB.includes(v))) {
            return Promise.reject(
              new Error(`SubCategories don't belong to category`)
            );
          }
        }
      )
    ),
  check("brand").optional().isMongoId().withMessage("Invalid ID format"),
  check("ratingsAverage")
    .optional()
    .isNumeric()
    .withMessage("Product priceAfterDiscount must be number")
    .isLength({ min: 1 })
    .withMessage("Rating must be above or equal to 1.0")
    .isLength({ max: 5 })
    .withMessage("Rating must be below or equal to 5.0"),
  check("ratingsQuantity")
    .optional()
    .isNumeric()
    .withMessage("Product ratingsQuantity must be number"),
  validationMiddleware,
];

exports.getProductValidation = [
  check("id").isMongoId().withMessage("Invalid product id format"),
  validationMiddleware,
];

exports.updateProductValidation = [
  check("id").isMongoId().withMessage("Invalid product id format"),
  validationMiddleware,
];

exports.deleteProductValidation = [
  check("id").isMongoId().withMessage("Invalid product id format"),
  validationMiddleware,
];
