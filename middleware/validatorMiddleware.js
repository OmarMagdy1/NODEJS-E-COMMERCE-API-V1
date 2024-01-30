const { validationResult } = require("express-validator");

// 2- middleware => catch errors from rules if exist
const validatorMiddleware = (req, res, next) => {
    const errors = validationResult(req);
   /* if (result.isEmpty()) {
    return res.send(`Hello, ${req.query.person}!`);
    } */
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    next();
    //res.send({ errors: result.array() });
};

module.exports = validatorMiddleware;