/*jshint esversion: 6*/
/*jshint esversion: 11*/
var appError = require('../utils/appError');
var conn = require('../service/db');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var JWT_SECRET = 'eyJhbGci0k8ygr3LoZlpVB7TBzl!uJL1S*breWLdu@2abRAsiDi';
//Default Date Format Setup
/*var date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();*/


/**START ROLES**/
/**GET ALL ROLES**/
exports.getAllRoles = (req, res, next) => {
	conn.query("SELECT * FROM roles", function(err, data, fields) {
		if(err) return next(new appError(err,500));
		res.status(200).json({
			status: "success",
			length: data?.length,
			data:data
		});
	});
};

/**CREATE ROLES**/
exports.createRoles = (req, res, next) => {
	if(!req.body) return next(new appError("No Form Data Found", 404));
	var role_name = req.body.role_name;
	var entry_date = new Date().toJSON().slice(0,10);
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
	var role_name = req.body.role_name;
	var last_updated = new Date().toJSON().slice(0,10);
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
/**GET ALL USER-ROLES**/
/**END ROLES-USERS TABLE**/

/**START USERS TABLE**/
/**GET ALL USERS**/
exports.getAllUsers = (req, res, next) => {
	conn.query("SELECT * FROM users", function (err, data, fields) {
		if(err) return next(new appError(err, 500));
		res.status(200).json({
			status: "success",
			length: data?.length,
			data:data,
		});
	});
};


/**ADD USERS**/
exports.createUser = async (req, res, next) =>{
	if(!req.body) return next(new appError("No Form Data Found", 404));
	var username = req.body.username;
	var full_name = req.body.full_name;
	var salt = await bcrypt.genSalt(10);
	var passwordHash = await bcrypt.hash(req.body.passwordHash, salt);
	var email = req.body.email;
	var role_id = req.body.role_id;
	var active_status = req.body.active_status;
	//Default Serial Number Setup
    var chars = '123456789QBCDEFGHIJKLMNOPQRSTUVWXYZ';
    var serialLength = 6;
    var i;
    var randomSerial="";
    var randomNumber; 
    for(i = 0; i < serialLength; i = i + 1){
	  randomNumber= Math.floor(Math.random() * chars.length);
      randomSerial += chars.substring(randomNumber, randomNumber + 1);
    } 
	var activation_code = randomSerial;
	//Default Future Date Setup
	var date= new Date();
    date.setMonth(date.getMonth() +6)
	var password_expiry = date;
	var entry_date = new Date().toJSON().slice(0,10);
	conn.query(
		"INSERT INTO users(username,full_name,passwordHash,email,role_id,active_status,activation_code,password_expiry,entry_date) VALUES(?,?,?,?,?,?,?,?,?)",
		[username,full_name,passwordHash,email,role_id,active_status,activation_code,password_expiry,entry_date],
		function(err, data, fields, user){
			if(err) return next(new appError(err, 500));
			res.status(201).json({
				status: "success",
				message: "User Created!",
				token: jwt.sign({user:username, password:passwordHash, email:email, name:full_name}, JWT_SECRET, {expiresIn: "60days"})	
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
		return next(new appError("NO User Details Found", 400));
	}
	var username = req.body.username;
	var full_name = req.body.full_name;
	var passwordHash = bcrypt.hash(req.body.passwordHash);
	var email = req.body.email;
	var role_id = req.body.role_id;
	var active_status = req.body.active_status;
	var password_expiry = req.body.password_expiry;
	var last_updated = new Date().toJSON().slice(0,10);
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
		if(err) return next(new appError(err, 500));
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
	var title = req.body.title;
	var details = req.body.details;
	var entry_date = new Date().toJSON().slice(0,10);
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
	var title = req.body.title;
	var details = req.body.details;
	var last_updated = new Date().toJSON().slice(0,10);
	conn.query("UPDATE bio SET title=?,details=?,last_updated=? WHERE id=?",
	[title,details,last_updated,req.params.id],
		function(err, data, fields){
			if(err) return next(new appError(err, 500));
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
			if(err) return next(new appError(err, 500));
			res.status(201).json({
				status: "success",
				message: "Bio Details Deleted!"
			});
		}
	);
};

/**END BIO TABLE**/

/**START VALUES TABLE**/
/**GET ALL CORE VALUES**/
exports.getAllValues = (req, res, next) => {
	conn.query("SELECT * FROM cores", 
		function(err, data, fields){
			if(err) return next(new appError(err, 500));
			res.status(200).json({
				status: "success",
				length: data?.length,
				data: data
			});
		}
	);
};

/**ADD DATA TO CORE VALUES**/
exports.createCore = (req, res, next) => {
	if(!req.body) return next(new appError("No Form Data Found", 404));
	var title = req.body.title;
	var details = req.body.details;
	var entry_date = new Date().toJSON().slice(0,10);
	conn.query("INSERT INTO cores(title,details,entry_date) VALUES(?,?,?)", 
	[title,details,entry_date], 
	function(err, data, fields){
		if(err) return next(new appError(err, 500));
		res.status(201).json({
			status: "success",
			message: "Core Value Created!"
		});

	});
};

/**GET CORE VALUE PER ID**/
exports.getCore = (req, res, next) => {
	if(!req.params.id){
		return next(new appError("No Core Value Details Found", 404));
	}
	conn.query("SELECT * FROM cores where id=?", [req.params.id],
	function(err, data, fields){
		if(err) return next(new appError(err,500));
		res.status(201).json({
			status: "success",
			length: data?.length,
			data: data
		});
	});
};

/**UPDATE CORE VALUE PER ID**/
exports.updateCore = (req, res, next) =>{
	if(!req.params.id){ 
		return next(new appError("No Core Value Details Found", 404));
	}
	var title = req.body.title;
	var details = req.body.details;
	var last_updated = new Date().toJSON().slice(0,10);
	conn.query("UPDATE cores SET title=?,details=?,last_updated=? WHERE id=?",
	[title,details,last_updated,req.params.id],
	function(err, data, fields){
		if(err) return next(new appError(err, 500));
		res.status(201).json({
			status: "success",
			message: "Core Value Details Updated!"
		});
	});
};

/**DELETE CORE VALUE PER ID**/
exports.deleteCore = (req, res, next) => {
	if(!req.params.id){
		return next(new appError("No Core Value Details Found", 404));
	}
	conn.query("DELETE FROM cores WHERE id=?",[req.params.id],
	function(err, data, fields){
		if(err) return next(new appError(err, 500));
		res.status(201).json({
			status: "success",
			message: "Core Value Details Deleted!"
		});
	});
};
/**END VALUES TABLE**/

/**START SERVICES TABLE**/
/**GET ALL SERVICES**/
exports.getALLServices = (req, res, next) => {
	conn.query("SELECT * FROM services", function(err, data, fields){
		if(err) return next(new appError(err, 500));
		res.status(200).json({
			status: "success",
			length: data?.length,
			data:data
		});

	});
};

/**INSERT DATA TO SERVICE TABLE**/
exports.createService = (req, res, next) => {
	if(!req.body) return next(new appError("No Form Data Found", 404));
	var service_type = req.body.service_type;
	var content = req.body.content;
	var entry_date = new Date().toJSON().slice(0,10);
	conn.query("INSERT INTO services(service_type,content,entry_date) VALUES(?,?,?)",
	[service_type,content,entry_date],
	function(err, data, fields){
		if(err) return next(new appError(err, 500));
		res.status(201).json({
			status: "success",
			message: "Service Details Created!"
		});

	});
};

/**GET SERVICE DETAILS PER ID**/
exports.getService = (req, res, next) => {
	if(!req.params.id){
		return next(new appError("No Service Details Found!"));
	}
	conn.query("SELECT * FROM services WHERE id=?", [req.params.id],
	function(err, data, fields){
		if(err) return next(new appError(err, 500));
		res.status(201).json({
			status: "success",
			length: data?.length,
			data:data
		});

	});
};

/**UPDATE SERVICE DETAILS PER ID**/
exports.updateService = (req, res, next) => {
	if(!req.params.id){
		return next(new appError("No Service Details Found!", 404));
	}
	var service_type =req.body.service_type;
	var content = req.body.content;
	var last_updated = new Date().toJSON().slice(0,10);
	conn.query("UPDATE services SET service_type=?,content=?,last_updated=? WHERE id=?",
	[service_type,content,last_updated,req.params.id],
	function(err, data, fields){
		if(err) return next(new appError(err, 500));
		res.status(201).json({
			status: "success",
			message: "Service Details Updated!"
		});
	});
};

/**DELETE SERVICE DETAILS PER ID**/
exports.deleteService = (req, res, next) => {
	if(!res.params.id){
		return next(new appError("No Service Details Found", 404));
	}
	conn.query("DELETE FROM services WHERE id=?",[req.params.id], 
	function(err, data, fields){
		if(err) return next(new appError(err, 500));
		res.status(201).json({
			status: "success",
			message: "Service Details Deleted!"
		});

	});
};
/**END SERVICES TABLE**/

/**START SOCIAL TABLE**/
/**GET ALL SOCIAL LINKS DATA**/
exports.getAllSocial = (req, res, next) => {
	conn.query("SELECT * FROM social", 
	function(err, data, fields){
		if(err) return next(new appError(err, 500));
		res.status(200).json({
			status: "success",
			length: data?.length,
			data:data
		});
	});
};

/**INSERT SOCIAL LINK**/
exports.createSocial = (req, res, next) => {
	if(!req.body) return next(new appError("No Form Data Found", 404));
	var social_type = req.body.social_type;
	var slink = req.body.slink;
	var social_icon = req.body.social_icon;
	var entry_date = new Date().toJSON().slice(0,10);
	conn.query("INSERT INTO social(social_type,slink,social_icon,entry_date) VALUES(?,?,?,?)",
	[social_type,slink,social_icon,entry_date],
	function(err, data, fields){
		if(err) return next(new appError(err, 500));
		res.status(201).json({
			status: "success",
			message: "Social Links Created!"
		});
	});
};

/**GET SOCIAL LINK PER ID**/
exports.getSocial = (req, res, next) => {
	if(!req.params.id){
		return next(new appError("No Social Details Found!", 404));
	}
	conn.query("SELECT * FROM social WHERE id=?", [req.params.id],
	function(err, data, fields){
		if(err) return next(new appError(err, 500));
		res.status(201).json({
			status: "success",
			length:data?.length,
			data:data
		});
	});
};

/**UPDATE SOCIAL LINK PER ID**/
exports.updateSocial = (req, res, next) => {
	if(!req.params.id){
		return next(new appError("No Social Details Found!", 404));
	}
	var social_type = req.body.social_type;
	var slink = req.body.slink;
	var social_icon = req.body.social_icon;
	var last_updated = new Date().toJSON().slice(0,10);
	conn.query("UPDATE social SET social_type=?,slink=?,social_icon=?,last_updated=? WHERE id=?",
	[social_type,slink,social_icon,last_updated,req.params.id],
	function(err, data, fields){
		if(err) return next(new appError(err, 500));
		res.status(201).json({
			status: "success",
			message: "Social Details Updated!"
		});
	});
};

/**DELETE SOCIAL LINK PER ID**/
exports.deleteSocial = (req, res, next) => {
	if(!req.params.id){
		return next(new appError("No Social Details Found!", 500));
	}
	conn.query("DELETE FROM social WHERE id=?",[req.params.id],
	function(err, data, fields){
		if(err) return next(new appError(err, 500));
		res.status(201).json({
			status: "success",
			message: "Social Link Deleted!"
		});
	});
};
/**END SOCIAL TABLE**/

/**START SLIDES TABLE**/
/**GET ALL SLIDES**/
exports.getAllSlide = (req, res, next) => {
	conn.query("SELECT * FROM slides",
	function(err, data, fields){
		if(err) return next(new appError(err, 500));
		res.status(200).json({
			status: "success",
			length:data?.length,
			data:data
		});
	});
};

/**INSERT SLIDE DATA**/
exports.createSlide = (req, res, next) => {
	if(!req.body) return next(new appError("No Form Data Found!", 404));
	var slides_title = req.body.slides_title;
	var slides_img =req.body.slides_img;
	var slides_content =req.body.slides_content;
	var entry_date = new Date().toJSON().slice(0,10);
	conn.query("INSERT INTO slides(slides_title,slides_img,slides_content,entry_date)",
	[slides_title,slides_img,slides_content,entry_date], 
	function(err, data, fields){
		if(err) return next(new appError(err, 500));
		res.status(201).json({
			status: "success",
			message: "Slide Created!"
		});
	});
};
/**GET SLIDE PER ID**/
exports.getSlide = (req, res, next) => {
	if(!req.params.id){
		return next(new appError("No Slide Details Found!",404));
	}
	conn.query("SELECT * FROM slides WHERE id=?",[req.params.id],
	function(err, data, fields){
		if(err) return next(new appError(err, 500));
		res.status(201).json({
			status: "success",
			length:data?.length,
			data:data
		});
	});
};

/**UPDATE SLIDE PER ID**/
exports.updateSlide = (req, res, next) => {
	if(!req.params.id){ 
		return next(new appError("No Slide Details Found!", 404));
	}
	var slides_title = req.body.slides_title;
	var slides_img = req.body.slides_img;
	var slides_content = req.body.slides_content;
	var last_updated = new Date().toJSON().slice(0,10);
	conn.query("UPDATE slides SET slides_title=?,slides_img=?,slides_content=?,last_updated=? WHERE id=?",
	[slides_title,slides_img,slides_content,last_updated,req.params.id],
	function(err, data, fields){
		if(err) return next(new appError(err, 500));
		res.status(201).json({
			status: "success",
			message: "Slide Details Updated!"
		});
	});
};

/**DELETE SLIDE PER ID**/
exports.deleteSlide = (req, res, next) => {
	if(!req.params.id){ 
		return next(new appError("No Slide Details Found!", 404));
	}
	conn.query("DELETE FROM slides WHERE id=?", [req.params.id],
	function(err, data, fields){
		if(err) return next(new appError(err, 500));
		res.status(201).json({
			status: "success",
			message: "Slide Details Deleted!"
		});
	});
};
/**END SLIDES TABLE**/

/**START NEWS TABLE**/
/**GET ALL NEWS**/
exports.getAllNews = (req, res, next) => {
	conn.query("SELECT * FROM news", function(err, data, fields){
		if(err) return next(new appError(err, 500));
		res.status(200).json({
			status: "success",
			length:data?.length,
			data:data
		});
	});
};

/**INSERT NEWS**/
exports.createNews = (req, res, next) => {
	if(!req.body) return next(new appError("No Form Data Found!", 404));
	var news_type = req.body.news_type;
	var content = req.body.content;
	var entry_date = new Date().toJSON().slice(0,10);
	conn.query("INSERT INTO news(news_type,content,entry_date) VALUES(?,?,?)",
	[news_type,content,entry_date],
	function(err, data, fields){
		if(err) return next(new appError(err, 500));
		res.status(201).json({
			status: "success",
			message: "News Details Created!"
		});
	});
};

/**UPDATE NEWS PER ID**/
exports.updateNews = (req, res, next) => {
	if(!req.params.id){ 
		return next(new appError("No News Details Found!", 404));
	}
	var news_type = req.body.news_type;
	var content = req.body.content;
	var last_updated = new Date().toJSON().slice(0,10);
	conn.query("UPDATE news SET news_type=?,content=?,last_updated=? WHERE id=?",
	[news_type,content,last_updated,req.params.id],
	function(err, data, fields){
		if(err) return next(new appError(err, 500));
		res.status(201).json({
			status: "success",
			message: "News Details Updated"
		});

	});
};

/**GET NEWS PER ID**/
exports.getNews = (req, res, next) => {
	if(!req.params.id){
		return next(new appError("No News Details Found!", 404));
	}
	conn.query("SELECT * FROM news WHERE id=?",[req.params.id],
	function(err, data, fields){
		if(err) return next(new appError(err, 500));
		res.status(201).json({
			status: "success",
			length:data?.length,
			data:data
		});
	});
};

/**DELETE NEWS PER ID**/
exports.deleteNews = (req, res, next) => {
	if(!req.params.id){
		return next(new appError("No News Details Found!", 404));
	}
	conn.query("DELETE FROM news WHERE id=?",[req.params.id],
	function(err, data, fields){
		if(err) return next(new appError(err, 500));
		res.status(201).json({
			status: "success",
			message: "News Details Deleted!"
		});
	});
};

/**END NEWS TABLE**/

/**START CONTACT TABLE**/
/**GET ALL CONTACT DETAILS**/
exports.getAllContacts = (req, res, next) => {
	conn.query("SELECT * FROM contact",
	function(err, data, fields){
		if(err) return next(new appError(err, 500));
		res.status(200).json({
			status: "success",
			length:data?.length,
			data:data
		});
	});
};

/**INSERT CONTACT DETAILS**/
exports.createContact = (req, res, next) => {
	if(!req.body) return next(new appError("NO Form Data Found!", 404));
	var contact_type = req.body.contact_type;
	var contact_icon = req.body.contact_icon;
	var contact_details = req.body.contact_details;
	var entry_date = new Date().toJSON().slice(0,10);
	conn.query("INSERT INTO contact(contact_type,contact_icon,contact_details,entry_Date) VALUES(?,?,?,?)",
	[contact_type,contact_icon,contact_details,entry_date],
	function(err, data, fields){
		if(err) return next(new appError(err,500));
		res.status(201).json({
			status: "success",
			message: "Contact Details Created!"
		});
	});
};

/**GET CONTACT PER ID**/
exports.getContact = (req, res, next) => {
	if(!req.params.id){
		return next(new appError("No Contact Details Found!", 404));
	}
	conn.query("SELECT * FROM contact WHERE id=?",[req.params.id],
	function(err, data, fields){
		if(err) return next(new appError(err, 500));
		res.status(201).json({
			status: "success",
			length:data?.length,
			data:data
		});
	});
};

/**UPDATE CONTACT DETAILS PER ID**/
exports.updateContact = (req, res, next) => {
	if(!req.params.id){
		return next(new appError("No Contact Details Found!", 404));
	}
	var contact_type = req.body.contact_type;
	var contact_icon = req.body.contact_icon;
	var contact_details = req.body.contact_details;
	var last_updated = new Date().toJSON().slice(0,10);
	conn.query("UPDATE contact SET contact_type=?,contact_icon=?,contact_details=?,last_updated=? WHERE id=?",
	[contact_type,contact_icon,contact_details,last_updated,req.params.id],
	function(err, data, fields){
		if(err) return next(new appError(err, 500));
		res.status(201).json({
			status: "success",
			message: "Contact Details Updated!"
		});
	});
};

/**DELETE CONTACT DETAILS PER ID**/
exports.deleteContact = (req, res, next) => {
	if(!req.params.id){
		return next(new appError("No Contact Details Found!", 404));
	}
	conn.query("DELETE FROM contact WHERE id=?",[req.params.id],
	function(err, data, fields){
		if(err) return next(new appError(err, 500));
		res.status(201).json({
			status: "success",
			message: "Contact Details Deleted!"
		});
	});
};
/**END CONTACT TABLE**/

/**START TESTIMONY TABLE**/
/**GET ALL TESTIMONY**/
exports.getAllTestimony = (req, res, next) => {
	conn.query("SELECT * FROM testimony",
	function(err, data, fields){
		if(err) return next(new appError(err, 500));
		res.status(200).json({
			status: "success",
			length:data?.length,
			data:data
		});
	});
};

/**INSERT TESTIMONY DETAILS**/
exports.createTestimony = (req, res, next) => {
	if(!req.body) return next(new appError("No Form Data Found!", 404));
	var company = req.body.company;
	var name = req.body.name;
	var position = req.body.position;
	var content = req.body.content;
	var entry_date = new Date().toJSON().slice(0,10);
	conn.query("INSERT INTO testimony(company,name,position,content,entry_date) VALUES(?,?,?,?)",
	[company,name,position,content,entry_date],
	function(err, data, fields){
		if(err) return next(new appError(err, 500));
		res.status(201).json({
			status: "success",
			message: "Testimony Created!"
		});
	});
};

/**GET TESTIMONY PER ID**/
exports.getTestimony = (req, res, next) => {
	if(!req.params.id){
		return next(new appError("No Testimony Details Found!", 404));
	}
	conn.query("SELECT * FROM testimony WHERE id=?",[req.params.id],
	function(err, data, fields){
		if(err) return next(new appError(err, 500));
		res.status(201).json({
			status: "success",
			length: data?.length,
			data:data
		});
	});
};

/**UPDATE TESTIMONY PER ID**/
exports.updateTestimony = (req, res, next) => {
	if(!req.params.id){
		return next(new appError("No Testimony Details Found!", 404));
	}
	var company = req.body.company;
	var name = req.body.name;
	var position = req.body.position;
	var content = req.body.content;
	var last_updated = new Date().toJSON().slice(0,10);
	conn.query("UPDATE testimony SET company=?,name=?,position=?,content=?,last_updated=?",
	[company,name,position,content,last_updated,req.params.id],
	function(err, data, fields){
		if(err) return next(new appError(err, 500));
		res.status(201).json({
			status: "success",
			message: "Testimony Details Updated!"
		});
	});

};

/**DELETE TESTIMONY DETAILS PER ID**/
exports.deleteTestimony = (req, res, next) => {
	if(!req.params.id){
		return next(new appError("No Testimony Details Found!",404));
	}
	conn.query("DELETE FROM testimony WHERE id=?",[req.params.id],
	function(err, data, fields){
		if(err) return next(new appError(err, 500));
		res.status(201).json({
			status: "success",
			message: "Testimony Detail Deleted!"
		});
	});
};
/**END TESTIMONY TABLE**/

/**START USER LOGIN**/
exports.login = async (req, res, next) => {
	if(!req.body) return next(new appError("No Form Data Found!",404));
	var username = req.body.username;
	var passwordHash = req.body.passwordHash;
	conn.query("SELECT *,role_name FROM users,roles WHERE users.role_id=roles.role_id and username=? and passwordHash=?",
	[username,passwordHash],
	function(err, result, data, fields, user){
		res.cookie('Epanel',JWT_SECRET, {maxAge:90000, httpOnly: true });
		req.session.jwt = JWT_SECRET;
		if(err) return next(new appError(err,500));
		if(!result.length) return next(new appError("Username or Password incorrect",404));
		res.status(201).json({
			status: "success",
			message: "User Logged in!",
			token: jwt.sign({user:username}, JWT_SECRET)
			///data:data			
		});
		
	});

};
/**END USER LOGIN**/

/**START USER LOG OUT**/
exports.logout = async  (req, res, next) => {
   var sess = req.session;
   if(sess){
   	  res.session = null;
	  res.clearCookie('Epanel');
	  res.status(200).json({
		status: 'success',
		message: 'User Logged Out!',
		token: null
	  });
    }
};
/**END USER LOG OUT**/

