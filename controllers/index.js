const appError = require('../utils/appError');
const conn = require('../service/db');

/**START ROLES**/
/**GET ALL ROLES**/
exports.getAllRoles = (req, res, next) => {
	conn.query("SELECT * FROM roles", function(err, data, fields) {
		if(err) return next(new appError(err));
		res.status(200).json({
			status: "success",
			length: data?.length,
			data:data,
		});
	});
};

/**CREATE ROLES**/
exports.createRoles = (req, res, next) =>{
	if(!req.body) return next(new appError("No Form Data Found", 404));
	const role_name = req.body.role_name;
	const entry_date = req.body.entry_date;
	conn.query("INSERT INTO roles(role_name,entry_date) VALUES(?,?)",
		[role_name, entry_date],
		function(err, data, fields){
			if(err) return next(new appError(err, 500));
			res.status(201).json({
				status: "success",
				message: "Role Created!"
			});
		}
	);
};

/**GET ROLE PER ID**/
exports.getRole = (req, res, next) => {
	if(!req.params.id){
		return next(new appError("NO Role Details Found", 404));
	}
	conn.query("SELECT * FROM roles WHERE role_id=?", [req.params.id],
		function(err, data, fields){
			if(err) return next(new appError(err, 500));
			res.status(200).json({
				status: "success",
				length: data?.length,
				data:data,
			});
		}
	);
};

/**UPDATE ROLE PER ID**/
exports.updateRole = (req, res, next) => {
	if(!req.params.id){
		return next(new appError("No Role Details Found", 404));
	}
	const role_name = req.body.role_name;
	const last_updated = req.body.last_updated;
	conn.query("UPDATE roles SET role_name=?, last_updated=? WHERE role_id=?", [role_name, last_updated, req.params.id],
		function(err, data, fields){
			if(err) return next(new appError(err, 500));
			res.status(201).json({
				status: "success",
				message: "Role Details Updated!"
			});
		}
	);

};

/**DELETE ROLE PER ID**/
exports.deleteRole = (req, res, next) => {
	if(!req.params.id){
		return next(new appError("No Role Details Found", 404));
	}
	conn.query("DELETE FROM roles WHERE role_id=?", [req.params.id],
		function(err, data, fields){
			if(err) return next(new appError(err, 500));
			res.status(201).json({
				status: "success",
				message: "Role Details Deleted!"
			});
		}
	);

};


/**END ROLES TABLE**/

/**START ROLES-USERS TABLE**/
/**GET ALL USERROLES**/
/**END ROLES-USERS TABLE**/

/**START USERS TABLE**/
/**GET ALL USERS**/
exports.getAllUsers = (req, res, next) => {
	conn.query("SELECT * FROM users", function (err, data, fields) {
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
	const username = req.body.username;
	const full_name = req.body.full_name;
	const passwordHash = req.body.passwordHash;
	const email = req.body.email;
	const role_id = req.body.role_id;
	const active_status = req.body.active_status;
	const activation_code = req.body.activation_code;
	const password_expiry = req.body.password_expiry;
	const entry_date = req.body.entry_date;
	conn.query(
		"INSERT INTO users(username,full_name,passwordHash,email,role_id,active_status,activation_code,password_expiry,entry_date) VALUES(?,?,?,?,?,?,?,?,?)",
		[username,full_name,passwordHash,email,role_id,active_status,activation_code,password_expiry,entry_date],
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
		"SELECT * FROM users WHERE id=?",
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
	const username = req.body.username;
	const full_name = req.body.full_name;
	const passwordHash = req.body.passwordHash;
	const email = req.body.email;
	const role_id = req.body.role_id;
	const active_status = req.body.active_status;
	const password_expiry = req.body.password_expiry;
	const last_updated = req.body.last_updated;
	conn.query(
		"UPDATE users SET username=?,full_name=?,passwordHash=?,email=?,role_id=?,active_status=?,password_expiry=?,last_updated=? WHERE id=?",
		[username,full_name,passwordHash,email,role_id,active_status,password_expiry,last_updated,req.params.id],
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
	conn.query("DELETE FROM users WHERE id=?", [req.params.id],
		function(err, fields){
			if(err) return next(new appError(err, 500));
			res.status(201).json({
				status: "success",
				message: "User Deleted!",
			});
		}
	);
};
/**END USERS TABLE**/

/**START BIO TABLE**/
/**GET ALL BIOs**/
exports.getAllBio = (req, res, next) =>{
	conn.query("SELECT * FROM bio", function(err, data, fields){
		if(err) return next(new appError(err));
		res.status(200).json({
			status: "success",
			length: data?.length,
			data:data,
		});
	});
};

/**ADD DATA TO BIO**/
exports.createBio = (req, res, next) => {
	if(!req.body) return next(new appError("No Form Data Found", 404));
	const title = req.body.title;
	const details = req.body.details;
	const entry_date = req.body.entry_date;
	conn.query("INSERT INTO bio(title,details,entry_date) VALUES(?,?,?)",
		[title,details,entry_date], 
		function(err, data, fields){
			if(err) return next(new appError(err, 500));
			res.status(201).json({
				status: "success",
				message: "Bio Created!"
			});
		}
	);
};

/**GET BIO PER ID**/
exports.getBio = (req, res, next) => {
	if(!req.params.id){
		return next(new appError("No Bio Details Found", 404));
	}
	conn.query("SELECT * FROM bio WHERE id=?",[req.params.id],
		function(err, data, fields){
			if(err) return next(new appError(err, 500));
			res.status(200).json({
				status: "success",
				length: data?.length,
				data:data
			});
		}
	);
};

/**UPDATE BIO PER ID**/
exports.updateBio = (req, res, next) => {
	if(!req.params.id){
		return next(new appError("No Bio Details Found", 404));
	}
	const title = req.body.title;
	const details = req.body.details;
	const last_updated = req.body.last_updated;
	conn.query("UPDATE bio SET title=?,details=?,last_updated=? WHERE id=?",[title,details,last_updated,req.params.id],
		function(err, data, fields){
			if (err) return next(new appError(err, 500));
			res.status(201).json({
				status: "success",
				message: "Bio Details Updated!"
			});
		}
	);
};

/**DELETE BIO PER ID**/
exports.deleteBio = (req, res, next) =>{
	if(!req.params.id){
		return next(new appError("No Bio Details Found", 404));
	}
	conn.query("DELETE FROM bio WHERE id=?",[req.params.id],
		function(err, data, fields) {
			if (err) return next(new appError(err, 500));
			res.status(201).json({
				status: "success",
				message: "Bio Details Deleted!"
			});
		}
	);
};

/**END BIO TABLE**/

/**START VALUES TABLE**/

/**END VALUES TABLE**/

/**START SERVICES TABLE**/

/**END SERVICES TABLE**/


/**START SOCIAL TABLE**/

/**END SOCIAL TABLE**/


/**START SLIDES TABLE**/

/**END SLIDES TABLE**/

/**START SLIDES TABLE**/

/**END SLIDES TABLE**/

