const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();


const verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(" ")[1];
        
    }
    else {

    }
    JWT.verify(token, process.env.JWT_KEY,)
}