const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const authRouter = require("./router/auth");
// const noteRouter = require("./router/notes");

dotenv.config();

//add middleware
app.use(express.json());
app.use(morgan("common"));
app.use(helmet());

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Mongo Db connected..")
    })
    .catch((err) => {
        console.log(err)
    });

app.use("/api/auth", authRouter);
app.listen(8001, () => {
    console.log("app is running on port ", 8001)
});