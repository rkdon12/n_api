/*jshint esversion: 6*/
var express = require("express");
const { route } = require("express/lib/application");
var controller = require("../controllers");
var router = express.Router();
var verifyToken = require("../middleware/authToken");

/**START ROLES ROUTERS**/
router.route("/roles", verifyToken).get(controller.getAllRoles);
router.route("/createrole", verifyToken).post(controller.createRoles);
router.route("/role/:id", verifyToken).get(controller.getRole);
router.route("/updaterole/:id", verifyToken).put(controller.updateRole);
router.route("/deleterole/:id", verifyToken).delete(controller.deleteRole);
/**END ROLES ROUTERS**/
/**START USERS ROUTERS**/
router.route("/users", verifyToken).get(controller.getAllUsers);
router.route("/createuser", verifyToken).post(controller.createUser);
router.route("/user/:id", verifyToken).get(controller.getUser);
router.route("/updateuser/:id", verifyToken).put(controller.updateUser);
router.route("/deleteuser/:id", verifyToken).delete(controller.deleteUser);
/**END USERS ROUTERS**/
/**START BIO ROUTERS**/
router.route("/bio", verifyToken).get(controller.getAllBio);
router.route("/createbio", verifyToken).post(controller.createBio);
router.route("/getbio/:id", verifyToken).get(controller.getBio);
router.route("/updatebio/:id", verifyToken).put(controller.updateBio);
router.route("/deletebio/:id", verifyToken).delete(controller.deleteBio);
/**END BIO ROUTERS**/
/**START CORE VALUES ROUTERS**/
router.route("/cores", verifyToken).get(controller.getAllValues);
router.route("/createcore", verifyToken).post(controller.createCore);
router.route("/getcore/:id", verifyToken).get(controller.getCore);
router.route("/updatecore/:id", verifyToken).put(controller.updateCore);
router.route("/deletecore/:id", verifyToken).delete(controller.deleteCore);
/**END CORE VALUES ROUTERS**/
/**START SERVICES ROUTERS**/
router.route("/services", verifyToken).get(controller.getALLServices);
router.route("/createservice", verifyToken).post(controller.createService);
router.route("/getservice/:id", verifyToken).get(controller.getService);
router.route("/updateservice/:id", verifyToken).put(controller.updateService);
router.route("/deleteservice/:id", verifyToken).delete(controller.deleteService);
/**END SERVICES ROUTERS**/
/**START SOCIAL LINK ROUTERS**/
router.route("/socials", verifyToken).get(controller.getAllSocial);
router.route("/createsocial", verifyToken).post(controller.createSocial);
router.route("/getsocial/:id", verifyToken).get(controller.getSocial);
router.route("/updatesocial/:id", verifyToken).put(controller.updateSocial);
router.route("/deletesocial/:id", verifyToken).delete(controller.deleteSocial);
/**END SOCIAL LINK ROUTERS**/
/**START SLIDES ROUTERS**/
router.route("/slides", verifyToken).get(controller.getAllSlide);
router.route("/createslide", verifyToken).post(controller.createSlide);
router.route("/getslide/:id", verifyToken).get(controller.getSlide);
router.route("/updateslide/:id", verifyToken).put(controller.updateSlide);
router.route("/deleteslide/:id", verifyToken).delete(controller.deleteSlide);
/**END SLIDES ROUTERS**/
/**START NEWS ROUTERS**/
router.route("/news", verifyToken).get(controller.getAllNews);
router.route("/createnews", verifyToken).post(controller.createNews);
router.route("/getnews/:id", verifyToken).get(controller.getNews);
router.route("/updatenews/:id", verifyToken).put(controller.updateNews);
router.route("/deletenews/:id", verifyToken).delete(controller.deleteNews);
/**END NEWS ROUTERS**/
/**START CONTACT ROUTERS**/
router.route("/contacts", verifyToken).get(controller.getAllContacts);
router.route("/createcontact", verifyToken).post(controller.createContact);
router.route("/getcontact/:id", verifyToken).get(controller.getContact);
router.route("/updatecontact/:id", verifyToken).put(controller.updateContact);
router.route("/deletecontact/:id", verifyToken).delete(controller.deleteContact);
/**END CONTACT ROUTERS**/
/**START TESTIMONY ROUTERS**/
router.route("/testimonies", verifyToken).get(controller.getAllTestimony);
router.route("/createtestimony", verifyToken).post(controller.createTestimony);
router.route("/gettestimony/:id", verifyToken).get(controller.getTestimony);
router.route("/updatetestimony/:id", verifyToken).put(controller.updateTestimony);
router.route("/deletetestimony/:id", verifyToken).delete(controller.deleteTestimony);
/**END TESTIMONY ROUTERS**/
/**START USER LOGIN ROUTERS**/
router.route("/login").post(controller.login);
router.route("/logout", verifyToken).post(controller.logout);
/**END USER LOGIN ROUTERS**/
/**START USER LOGOUT ROUTERS**/
/**END USER LOGOUT ROUTERS**/
module.exports = router;