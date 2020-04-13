"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var categorycontroller_1 = require("./../controller/categorycontroller");
var express = require("express");
exports.categoryRoutes = express.Router();
exports.categoryRoutes.get('/allCategory', categorycontroller_1.CategoryController.getCategories);
exports.categoryRoutes.post('/addCategory', categorycontroller_1.CategoryController.saveCategories);
