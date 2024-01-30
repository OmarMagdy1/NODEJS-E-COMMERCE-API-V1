const {check} = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");

exports.getCategoryValidator = [    
    // 1- rules
    check("id").isMongoId().withMessage("Invalid query id"),
    validatorMiddleware,
]; 

exports.createCategoryValidator = [
    check("name")
    .notEmpty()
    .withMessage("Category required")
    .isLength({min: 3})
    .withMessage("Too short category name")
    .isLength({max: 32})
    .withMessage("Too long category name"),
    validatorMiddleware,
];

exports.updateCategoryValidator = [    
    // 1- rules
    check("id").isMongoId().withMessage("Invalid query id"),
    validatorMiddleware,
];

exports.deleteCategoryValidator = [    
    // 1- rules
    check("id").isMongoId().withMessage("Invalid query id"),
    validatorMiddleware,
];

