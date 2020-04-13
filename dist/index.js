"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var userRoutes_1 = require("./src/app/routes/userRoutes");
var dotenv = require("dotenv");
var db_1 = require("./src/app/db/db");
var categoryRoutes_1 = require("./src/app/routes/categoryRoutes");
var productRoutess_1 = require("./src/app/routes/productRoutess");
// deploying code purpush
var helmet = require("helmet");
var compression = require("compression");
dotenv.config();
var app = express();
// app deployee on heroku 
app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.get("/", (req,res) => res.send('this is get API'));
app.use('/user', userRoutes_1.userRoute);
app.use('/categories', categoryRoutes_1.categoryRoutes);
app.use('/product', productRoutess_1.productRoutes);
app.listen(process.env.PORT || 3000, function () {
    db_1.MongoConnect.connect().then(function (res) { return console.log('database connection done'); });
    console.log('server running on port 3000');
});
