const appError = require('../utils/appError');
const conn = require('../service/db');

//get user routers
/**GET ALL USERS**/
exports.getAllUsers = (req, res, next) => {
	conn.query("SELECT * FROM user", function (err, data, fields) {
		if(err) return next(new appError(err))
		res.status(200).json({
			status: "success",
			length: data?.length,
			data:data,
		});
	});
};


/**ADD USERS**/
exports.createUser = (req, res, next) =>{
	if(!req.body) return next(new appError("No Form Data Found", 404));
	const values = [req.body.name, "pending"];
	conn.query(
		"INSERT INTO user(username, passwordHash, email, position, role) VALUES(?)",
		[values],
		function(err, data, fields){
			if(err) return next(new appError(err, 500));
			res.status(201).json({
				status: "success",
				message: "User Created!",
			});
		}
	);
};


/**GET USER PER ID**/
exports.getUser = (req, res, next) => {
	if(!req.params.id){
		return next(new appError("No User Details Found", 404));
	}
	conn.query(
		"SELECT * FROM user WHERE id=?",
		[req.params.id],
		function(err, data, fields){
			if(err) return next(new appError(err, 500));
			res.status(200).json({
				status: "success",
				length: data?.length,
				data: data,
			});
		}
	);
};

/**UPDATE USER PER ID**/
exports.updateUser = (req, res, next) =>{
	if(!req.params.id){
		return next(new appError("NO User Details Found", 400))
	}
	conn.query(
		"UPDATE user SET username='Connn' WHERE id=?",
		[req.params.id],
		function(err, data, fields){
			if(err) return next(new appError(err, 500));
			res.status(201).json({
				status: "success",
				message: "User Details Updated",
			});
		}
	);
};


/**DELETE USER PER ID**/
exports.deleteUser = (req, res, next) =>{
	if(!req.params.id){
		return next(new appError("NO User Details Found", 404));
	}
	conn.query(
		"DELETE FROM user WHERE id=?",
		[req.params.id],
		function(err, fields){
			if(err) return next(new appError(err, 500));
			res.status(201).json({
				status: "success",
				message: "User Deleted!",
			});
		}
	);
};