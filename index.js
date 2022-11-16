require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const {  appPort } = require("./variables");


const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

mongoose
    .connect(`mongodb+srv://nahid:nahidhasan@cluster0.5nvzpqp.mongodb.net/e-commerce?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("connected");
    })
    .catch((e) => {
        console.log("Something went wrong", e);
    });



function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }
    res.status(500)
    res.render('error', { error: err })
}



app.use("/user", require("./routes/userRoutes"));
app.use("/admin", require("./routes/adminRoutes"));
app.use("/product", require("./routes/productRoutes"));


app.listen(appPort, () => {
    console.log(`SERVER IS CONNECTED TO PORT ${appPort}`);
});