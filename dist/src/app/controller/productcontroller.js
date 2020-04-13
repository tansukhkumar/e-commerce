"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var product_1 = require("./../models/product");
var productController = /** @class */ (function () {
    function productController() {
    }
    productController.getProducts = function (req, res, next) {
        product_1.Product.find({}, function (err, result) {
            if (err) {
                res.status(500).json({ ststus: 'failed', message: err });
            }
            else {
                res.json({ status: 'Suceess', message: 'Product Found !', data: result });
            }
        });
    };
    productController.saveProduct = function (req, res, next) {
        req.body.imageUrl = process.env.IMAGE_BASE_PATH + req.file.originalname;
        var product = new product_1.Product(req.body);
        product_1.Product.create(product, function (err, result) {
            if (err) {
                res.status(500).json({ status: 'failed', message: err });
            }
            else {
                res.json({ status: 'sucess', message: 'Product Added !', data: result });
            }
        });
    };
    productController.getProductById = function (req, res, next) {
        var productId = req.params.id;
        product_1.Product.findById(productId, function (err, result) {
            if (err) {
                res.status(500).json({ status: 'failed', message: err });
            }
            else {
                res.json({ status: 'success', message: 'Product Found!', data: result });
            }
        });
    };
    productController.getProductByCategory = function (req, res, next) {
        var category = req.body.category;
        var productCount = 0;
        product_1.Product.find().estimatedDocumentCount().exec(function (err, result) {
            productCount = result;
            product_1.Product.find({ category: category }, function (err, result) {
                if (err) {
                    res.status(500).json({ status: 'failed', message: err });
                }
                else {
                    res.json({ status: 'success',
                        message: 'products found !',
                        data: result, count: productCount });
                }
            });
        });
    };
    productController.updateProduct = function (req, res, next) {
        product_1.Product.findByIdAndUpdate(req.body._id, {
            $set: {
                description: req.body.description,
                price: req.body.price,
                outOfStock: req.body.outOfStock
            }
        }, function (err, result) {
            if (err) {
                res.status(500).json({ status: 'failed', message: err });
            }
            else {
                res.json({ status: 'success', message: 'Product Updated !', data: result });
            }
        });
    };
    productController.searchProduct = function (req, res, next) {
        var productName = req.body.productName;
        var productCount = 0;
        product_1.Product.find().estimatedDocumentCount().exec(function (err, result) {
            productCount = result;
            product_1.Product.find({ productName: { $regex: productName, $options: 'i' } }, function (err, result) {
                if (err) {
                    res.status(500).json({ status: 'failed', message: err });
                }
                else {
                    res.json({ status: 'success',
                        message: 'Product availble',
                        data: result, count: productCount });
                }
            });
        });
    };
    return productController;
}());
exports.productController = productController;
