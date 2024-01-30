const mongoose = require("mongoose");

//create schema
const categorySchema = mongoose.Schema(
    {
        name: {
                type: String,
                required: [true, "Category required"],
                unique: [true, "Category must be unique"],
                minlength: [3, "Too short category name"],
                maxlength: [32, "Too long category name"]
        },
        //A and D => shopping.com/a-and-b
        slug : {
            type: String,
            lowercase: true
        },
        image: String,
    },
    {timestamps: true}
);

//create model
const categoryModel = mongoose.model("Category",categorySchema);

module.exports = categoryModel;