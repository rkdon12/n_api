const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/user');
const appError = require("./utils/appError");
const errorHandler = require('./utils/errorHandler');


const port = process.env.PORT || 8080;

app = express();
app.use(router);
app.use(cors());
app.use(bodyParser.json());

app.all("**", (req, res, next) => {
	next(new appError(`The URL ${req.originalUrl} does not exists`, 404));

});

app.listen(port, () =>{
	console.log(`Api Server on port ${ port }`)
})


module.exports = app;
