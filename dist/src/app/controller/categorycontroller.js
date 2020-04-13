"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var category_1 = require("../models/category");
var CategoryController = /** @class */ (function () {
    function CategoryController() {
    }
    CategoryController.getCategories = function (req, res, next) {
        category_1.Category.find({}, function (err, result) {
            if (err) {
                res.status(500).json({ status: 'failed', message: err });
            }
            else {
                res.json({ status: 'success', message: 'Categories Found', data: result });
            }
        });
    };
    CategoryController.saveCategories = function (req, res, next) {
        var categories = req.body;
        category_1.Category.insertMany(categories, function (err, result) {
            if (err) {
                res.status(500).json({ status: 'failed', message: err });
            }
            else {
                res.json({ status: 'success', message: 'Categories Saved', data: result });
            }
        });
    };
    return CategoryController;
}());
exports.CategoryController = CategoryController;
