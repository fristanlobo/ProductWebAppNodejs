const router = require("express").Router();
const Product = require("../models/Product");

router.post("/addProduct", async (req, res) => {
    try {
        const product = new Product({
            ProductName: req.body.ProductName,
            ProductPrice: req.body.ProductPrice,
            productCategory: req.body.productCategory,
            productCompany: req.body.productCompany,
            userId: req.body.userId,
        })
        const data = await product.save();
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json(e);
    }
})

module.exports = router;