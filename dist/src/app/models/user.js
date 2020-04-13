"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var bcryptjs_1 = require("bcryptjs");
var salt_Round = process.env.SALT_ROUND;
var userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        maxlength: 16
    },
    mobile: {
        type: String,
        trim: true,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    DOB: {
        type: Date,
        required: true
    },
    role: {
        type: String,
        required: true,
        trim: true,
        default: 'User'
    }
});
userSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified("password")) {
        var saltRound = salt_Round;
        bcryptjs_1.genSalt(saltRound, function (err, salt) {
            bcryptjs_1.hash(user.password, salt, function (err, hash) {
                if (err) {
                    throw err;
                }
                else {
                    user.password = hash;
                    next();
                }
            });
        });
    }
    else {
        next();
    }
});
exports.User = mongoose_1.model('User', userSchema);
