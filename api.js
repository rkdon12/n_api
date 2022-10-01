const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser =require('cookie-parser');
const router = require('./routes/routers');
const appError = require("./utils/appError");
const errorHandler = require('./utils/errorHandler');


const port = process.env.PORT || 8080;

app = express();
app.use(express.json());
app.use("/api", router);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.all("**", (req, res, next) => {
	next(new appError(`The URL ${req.originalUrl} does not exists`, 404));

});

app.listen(port, () =>{
	console.log(`Api Server on port ${ port }`);
});


module.exports = app;
