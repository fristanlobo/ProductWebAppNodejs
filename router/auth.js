const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");



dotenv.config();


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
                    ?
                    JWT.sign({ user }, process.env.JWT_KEY, { expiresIn: '2h' }, (err, token) => {
                        if (err) {
                            res.status(400).json({
                                message: 'Error in generating the Token',
                                status: false
                            })
                        }
                        res.status(200).json({
                            message: "Login successful",
                            status: true,
                            user,
                            token: token
                        })
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

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname)
    }
})
const upload = multer({ storage: storage })
router.post('/profileUpload', upload.single('image'), async (req, res) => {
    try {
        console.log('=',req.body);
        res.status(200).json("Uploaded");
    }
    catch (e) {
        res.status(500).json(e);
    }
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
})

module.exports = router;

//https://www.loginradius.com/blog/engineering/guest-post/nodejs-authentication-guide/