require('dotenv').config()
const express = require("express");
const app = express()
const port = process.env.PORT || 3000;
const path = require("path");
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const connectDB = require('./utils/db');
const cookieParser = require("cookie-parser");


connectDB()
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")))

app.use('/',userRoutes)
app.use('/',postRoutes)

app.listen(port, () => {
    console.log(`Server is up baby on port ${port}`)
})