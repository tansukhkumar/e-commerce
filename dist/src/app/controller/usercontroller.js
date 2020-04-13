"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../models/user");
// for checking password as password is encrypted
var bcryptjs_1 = require("bcryptjs");
// JWT method sign
var jsonwebtoken_1 = require("jsonwebtoken");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    // user login controller
    UserController.login = function (req, res, next) {
        // JWT private key 
        var private_key = process.env.PRIVATE_KEY || '';
        // find one email whare 
        user_1.User.findOne({ email: req.body.email }, function (err, result) {
            if (err) {
                res.status(500).json({ status: 'failed', message: err });
            }
            else {
                //  checking user have any value or not  like null value avoid
                if (result != undefined) {
                    //  compareing encrypted password return boolean value
                    if (bcryptjs_1.compareSync(req.body.password, result.password)) {
                        var token = jsonwebtoken_1.sign({ id: result._id }, private_key, { expiresIn: '1h' });
                        res.json({ status: 'success', message: 'Login success!', data: token });
                    }
                    else {
                        res.json({ status: 'failed', message: 'Username Or Password is Incorrect!' });
                    }
                }
                else {
                    res.json({ status: 'failed', message: 'Username Or Password is Incorrect!' });
                }
            }
        });
        //  we are getting one record from user collection where user email is send by the user 
        // in our case it will be a angular from. then we compareing hash password with syn password
    };
    UserController.registration = function (req, res, next) {
        var user = new user_1.User(req.body);
        user_1.User.create(user, function (err, result) {
            if (err) {
                res.status(500).json({ status: 'failed', message: err });
            }
            else {
                res.json({ status: 'success', message: 'Registation Successfull', data: result });
            }
        });
    };
    UserController.updateProfile = function (req, res, next) {
        // we called a Find By Id Update Method where we send the 1st perameter as userId
        // which we are going to get from the middle ware (validateUser (auth.ts)) after that 
        // if it is successfull we are seting the values (updateing properties like firstName,
        // lastName & address) if success status is fine if not err genrated  
        user_1.User.findByIdAndUpdate(req.body.userId, {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                address: req.body.address
            }
        }, function (err, result) {
            if (err) {
                res.status(500).json({
                    status: 'failed',
                    message: err
                });
            }
            else {
                res.json({
                    status: 'success',
                    message: 'profile updated successfully !',
                    data: result
                });
            }
        });
    };
    UserController.getProfile = function (req, res, next) {
        var userId = req.body.userId;
        user_1.User.findById(userId, function (err, result) {
            if (err) {
                res.status(500).json({ status: 'failed', message: err });
            }
            else {
                res.json({ status: 'success', message: 'user profile', data: result });
            }
        });
    };
    return UserController;
}());
exports.UserController = UserController;
