var express = require("express");
const { route } = require("express/lib/application");
var controller = require("../controllers");
var router = express.Router();

/**START ROLES ROUTERS**/
router.route("/roles").get(controller.getAllRoles);
router.route("/createrole").post(controller.createRoles);
router.route("/role/:id").get(controller.getRole);
router.route("/updaterole/:id").put(controller.updateRole);
router.route("/deleterole/:id").delete(controller.deleteRole);
/**END ROLES ROUTERS**/
/**START USERS ROUTERS**/
router.route("/users").get(controller.getAllUsers);
router.route("/createuser").post(controller.createUser);
router.route("/user/:id").get(controller.getUser);
router.route("/updateuser/:id").put(controller.updateUser);
router.route("/deleteuser/:id").delete(controller.deleteUser);
/**END USERS ROUTERS**/
/**START BIO ROUTERS**/
router.route("/bio").get(controller.getAllBio);
router.route("/createbio").post(controller.createBio);
router.route("/getbio/:id").get(controller.getBio);
router.route("/updatebio/:id").put(controller.updateBio);
router.route("/deletebio/:id").delete(controller.deleteBio);
/**END BIO ROUTERS**/
/**START CORE VALUES ROUTERS**/
router.route("/cores").get(controller.getAllValues);
router.route("/createcore").post(controller.createCore);
router.route("/getcore/:id").get(controller.getCore);
router.route("/updatecore/:id").put(controller.updateCore);
router.route("/deletecore/:id").delete(controller.deleteCore);
/**END CORE VALUES ROUTERS**/
/**START SERVICES ROUTERS**/
router.route("/services").get(controller.getALLServices);
router.route("/createservice").post(controller.createService);
router.route("/getservice/:id").get(controller.getService);
router.route("/updateservice/:id").put(controller.updateService);
router.route("/deleteservice/:id").delete(controller.deleteService);
/**END SERVICES ROUTERS**/
/**START SOCIAL LINK ROUTERS**/
router.route("/socials").get(controller.getAllSocial);
router.route("/createsocial").post(controller.createSocial);
router.route("/getsocial/:id").get(controller.getSocial);
router.route("/updatesocial/:id").put(controller.updateSocial);
router.route("/deletesocial/:id").delete(controller.deleteSocial);
/**END SOCIAL LINK ROUTERS**/
/**START SLIDES ROUTERS**/
router.route("/slides").get(controller.getAllSlide);
router.route("/createslide").post(controller.createSlide);
router.route("/getslide/:id").get(controller.getSlide);
router.route("/updateslide/:id").put(controller.updateSlide);
router.route("/deleteslide/:id").delete(controller.deleteSlide);
/**END SLIDES ROUTERS**/
/**START NEWS ROUTERS**/
router.route("/news").get(controller.getAllNews);
router.route("/createnews").post(controller.createNews);
router.route("/getnews/:id").get(controller.getNews);
router.route("/updatenews/:id").put(controller.updateNews);
router.route("/deletenews/:id").delete(controller.deleteNews);
/**END NEWS ROUTERS**/
/**START CONTACT ROUTERS**/
router.route("/contacts").get(controller.getAllContacts);
router.route("/createcontact").post(controller.createContact);
router.route("/getcontact/:id").get(controller.getContact);
router.route("/updatecontact/:id").put(controller.updateContact);
router.route("/deletecontact/:id").delete(controller.deleteContact);
/**END CONTACT ROUTERS**/
/**START TESTIMONY ROUTERS**/
router.route("/testimonies").get(controller.getAllTestimony);
router.route("/createtestimony").post(controller.createTestimony);
router.route("/gettestimony/:id").get(controller.getTestimony);
router.route("/updatetestimony/:id").put(controller.updateTestimony);
router.route("/deletetestimony/:id").delete(controller.deleteTestimony);
/**END TESTIMONY ROUTERS**/
/**START USER LOGIN ROUTERS**/
/**END USER LOGIN ROUTERS**/
/**START USER LOGOUT ROUTERS**/
/**END USER LOGOUT ROUTERS**/
module.exports = router;