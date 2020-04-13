"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var categorySchema = new mongoose_1.Schema({
    CategoryName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    isLive: {
        type: Boolean,
        default: true
    }
});
exports.Category = mongoose_1.model('Category', categorySchema);
