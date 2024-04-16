const router = require("express").Router();
const Product = require("../models/Product");

router.post("/addProduct", async (req, res) => {
    try {
        const product = new Product({
            ProductName: req.body.ProductName,
            ProductPrice: req.body.ProductPrice,
            ProductCategory: req.body.ProductCategory,
            ProductCompany: req.body.ProductCompany,
            userId: req.body.userId,
        })
        const data = await product.save();
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json(e);
    }
})

router.get("/getProduct", async (req, res) => {
    try {
        const products = await Product.find();
        if (products.length > 0) {
            res.status(200).json(products)
        } else {
            res.status(400).json({
                message: "No Products found",
            })
        }
    }
    catch (e) {
        res.status(500).json(e);
    }
})

router.delete("/deleteProduct/:id", async (req, res) => {
    try {
        const productId = await Product.findOne({
            _id: req.params.id
        })
        console.log("product ", productId)
        if (!productId) {
            res.status(400).json({
                message: "Product not found",
                status: false,
            })
        }
        else {
            const product = await Product.deleteOne({
                _id: req.params.id
            })
            res.status(200).json({
                message: "Delete successfully",
                status: true,
                product: productId,
            });
        }
    }
    catch (e) {
        res.status(500).json(e);
    }
})

router.get("/getProduct/:id", async (req, res) => {
    try {
        const products = await Product.findOne({
            _id: req.params.id
        });
        console.log(products)
        if (products) {
            res.status(200).json(products)
        } else {
            res.status(400).json({
                message: "No Products found",
            })
        }
    }
    catch (e) {
        res.status(500).json(e);
    }
})


module.exports = router;