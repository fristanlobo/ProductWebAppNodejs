const router = require("express").Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
    try {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        const data = await user.save();
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json(e);
    }
})


router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email,
        })
        !user && res.status(400).json({
            message: "Email is not registered",
            status: false,
        })

        const validatepass = req.body.password == user.password
        !validatepass && res.status(400).json({
            message: "Password is wrong",
            status: false
        })

        res.status(200).json(user);
    }
    catch (e) {
        res.status(500).json(e);
    }
})

module.exports = router;