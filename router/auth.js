const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs")

router.post("/register", async (req, res) => {
    try {
        const userCheck = await User.findOne({ email: req.body.email })
        if (!userCheck) {
            hashedPass = await bcrypt.hash(req.body.password, 10)
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPass
            })
            const data = await user.save();
            res.status(200).json(data);
        }
        else {
            res.status(400).json({
                message: "User already registered",
                status: false,
            })
        }

    } catch (e) {
        res.status(500).json(e);
    }
})


router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            res.status(400).json({
                message: "Uer not found",
                status: false,
            })
        } else {
            // comparing given password with hashed password
            bcrypt.compare(req.body.password, user.password).then(function (result) {
                result
                    ? res.status(200).json({
                        message: "Login successful",
                        status: true,
                        user,
                    })
                    : res.status(400).json({
                        message: "Login not succesful",
                        status: false,
                    })
            })
        }
    } catch (error) {
        res.status(400).json({
            message: error,
            status: false
        })
    }
})

module.exports = router;

//https://www.loginradius.com/blog/engineering/guest-post/nodejs-authentication-guide/