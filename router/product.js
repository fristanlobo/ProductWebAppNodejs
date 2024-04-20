const router = require("express").Router();
const Product = require("../models/Product");
const verifyToken = require("../common/commonFunction");

router.post("/addProduct", verifyToken, async (req, res) => {
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

router.get("/getProduct", verifyToken, async (req, res) => {
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

router.delete("/deleteProduct/:id", verifyToken, async (req, res) => {
    try {
        const productId = await Product.findOne({
            _id: req.params.id
        })
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

router.get("/getProduct/:id", verifyToken, async (req, res) => {
    try {
        const products = await Product.findOne({
            _id: req.params.id
        });
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

router.put("/updateProduct/:id", verifyToken, async (req, res) => {
    try {
        const findProduct = await Product.findOne({
            _id: req.params.id
        })
        if (findProduct) {
            const updateProduct = await Product.updateOne(
                {
                    _id: req.params.id
                },
                {
                    ProductName: req.body.ProductName,
                    ProductPrice: req.body.ProductPrice,
                    ProductCategory: req.body.ProductCategory,
                    ProductCompany: req.body.ProductCompany,
                }
            )
            res.status(200).json(updateProduct);
        }
        else {
            res.status(400).json({
                message: "Product not found",
                status: false
            })
        }

    }
    catch (e) {
        res.status(400).json(e);
    }
})

router.get("/search/:key", async (req, res) => {
    try {
        if (req.params.key) {
            let result = await Product.find(
                {
                    $or: [
                        {
                            ProductName: { $regex: req.params.key, $options: 'i' }
                        }
                    ]
                }
            )
            res.status(200).json(result)
        }
        else {
            res.status(400).json({
                message: "No Paramter found",
                status: false
            })
        }
    }
    catch (e) {
        res.status(500).json(e)
    }
})


module.exports = router;