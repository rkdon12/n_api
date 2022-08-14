const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3003;
const userRouter = require('./route/users');

app.use(bodyParser.json());
//app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true}));

//defualt route
app.get('/', function (req, res){
	return res.send({ message:'404 Page Not Found'})
});

//Users Routes
app.use("/user", userRouter);

//Error Handler Middleware
app.use((err, req, res, next) =>{
	const statusCode = err.statusCode || 500;
	console.error(err.message, err.stack);
	res.status(statusCode).json({ message: err.message });
	return;
});

//set App Port
app.listen(port,() => console.log("App runs on Port 3003"));

module.exports = { app }
