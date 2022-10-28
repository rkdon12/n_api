/*jshint esversion: 6*/
var express = require('express');
var cors = require('cors');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var router = require('./routes/routers');
var appError = require("./utils/appError");
var errorHandler = require('./utils/errorHandler');

var port = process.env.PORT || 8080;

app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({name: 'Epanel', secret: 'session_secert', proxy: true, resave: false, saveUninitialized: true, cookie: {secure:true} }));
app.use("/api", router, function(req, res, next){
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4300');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});


app.all("**", (req, res, next) => {
	next(new appError(`The URL ${req.originalUrl} does not exists`, 404));
});

app.listen(port, () => {
	console.log(`Api Server on port ${ port }`);
});


module.exports = app;
