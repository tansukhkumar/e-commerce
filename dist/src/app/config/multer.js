"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/product');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
exports.upload = multer({ storage: storage });
