const express = require("express");
const controller = require("../controllers");
const router = express.Router();

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


module.exports = router;