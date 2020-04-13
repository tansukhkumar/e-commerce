"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
function validateUser(req, res, next) {
    var token = req.headers['x-access-token'];
    var private_key = process.env.PRIVATE_KEY || '';
    jsonwebtoken_1.verify(token, private_key, function (err, decoded) {
        if (err) {
            res.status(401).json({
                status: 'failed',
                message: 'your session is expire',
                data: null
            });
        }
        else {
            req.body.userId = decoded.id;
            next();
        }
    });
}
exports.validateUser = validateUser;
// validateUser have request, response and in case user is valid we call next function
// to caal the validateUser is also require PRIVATE_KEY 
// when ever someone send s request they send a token to me in one of the header 
