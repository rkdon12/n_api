/*jshint esversion: 6*/
/*jshint esversion: 11*/
var appError = require('../utils/appError');
var conn = require('../service/db');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

function verifyToken(req, res, next){
    var authHeader = req.headers['x-access-token'];
    var token = authHeader && authHeader.startWith('Bearer') && authHeader.split(" ")[1];
    if(token == null) return next(new appError(403));
    jwt.verify(token, "eyJhbGci0k8ygr3LoZlpVB7T", (err, user) => {
        if(err) return next(new appError(err,404));
        req.user = user;
        next();
    });
}