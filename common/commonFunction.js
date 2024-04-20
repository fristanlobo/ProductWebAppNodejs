const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();


const verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];
  
    if (token) {
        token = token.split(" ")[1];
        JWT.verify(token, process.env.JWT_KEY, (err, valid) => {
            if (err) {
                res.status(400).json({
                    message: "Error in Token",
                    message: false
                })
            }
            else {
                next();
            }
        })
    } else {
        res.status(403).json({
            message: "Please add token in header",
            status: false
        })
    }
    
}

module.exports = verifyToken;