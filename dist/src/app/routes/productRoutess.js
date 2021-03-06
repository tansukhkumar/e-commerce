"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var productcontroller_1 = require("../controller/productcontroller");
var multer_1 = require("../config/multer");
var express = require("express");
exports.productRoutes = express.Router();
exports.productRoutes.get('/', productcontroller_1.productController.getProducts);
exports.productRoutes.post('/addProduct', multer_1.upload.single('file'), productcontroller_1.productController.saveProduct);
exports.productRoutes.get('/:id', productcontroller_1.productController.getProductById);
exports.productRoutes.post('/getProductCategory', productcontroller_1.productController.getProductByCategory);
exports.productRoutes.put('/UpdateProduct', productcontroller_1.productController.updateProduct);
exports.productRoutes.post('/findProduct', productcontroller_1.productController.searchProduct);
