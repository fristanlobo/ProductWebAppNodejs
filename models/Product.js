const mongoose = require("mongoose");
const Product = mongoose.Schema({
    ProductName: {
        type: String,
        min: 5,
        max: 15,
        require: true,
    },
    ProductPrice: {
        type: String,
        min: 1,
        max: 10,
        require: true
    },
    productCategory: {
        type: String,
        min: 5,
        max: 25,
    },
    productCompany: {
        type: String,
        min: 5,
        max: 50,
    },
    userId: {
        type: String,
    }
})

module.exports = mongoose.model("product", Product);
