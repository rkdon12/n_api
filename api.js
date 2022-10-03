/*jshint esversion: 6*/
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var router = require('./routes/routers');
var appError = require("./utils/appError");
var errorHandler = require('./utils/errorHandler');


var port = process.env.PORT || 8080;

app = express();
app.use(express.json());
app.use("/api", router);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.all("**", (req, res, next) => {
	next(new appError(`The URL ${req.originalUrl} does not exists`, 404));
});

app.listen(port, () => {
	console.log(`Api Server on port ${ port }`);
});


module.exports = app;
