const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();
const cors = require("cors")
const morgan = require("morgan");
const helmet = require("helmet");


const authRouter = require("./router/auth");
const productRouter = require("./router/product");

dotenv.config();

//add middleware
app.use(express.json());
app.use(morgan("common"));
app.use(helmet());
app.use(cors());

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Mongo Db connected..")
    })
    .catch((err) => {
        console.log(err)
    });

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.listen(8001, () => {
    console.log("app is running on port ", 8001)
});

//JWT- json web token 