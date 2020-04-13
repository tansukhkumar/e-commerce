"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var MongoConnect = /** @class */ (function () {
    function MongoConnect() {
    }
    MongoConnect.connect = function () {
        var mongoDB = process.env.MONGODB_URL || '';
        return mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true });
    };
    return MongoConnect;
}());
exports.MongoConnect = MongoConnect;
