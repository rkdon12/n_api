const express = require("express");
const controller = require("../controllers");
const router = express.Router();

router.route("/roles").get(controller.getAllRoles);
router.route("/createrole").post(controller.createRoles);
router.route("/role/:id").get(controller.getRole);
router.route("/updaterole/:id").put(controller.updateRole);
router.route("/deleterole/:id").delete(controller.deleteRole);
router.route("/users").get(controller.getAllUsers);
router.route("/createuser").post(controller.createUser);
router.route("/user/:id").get(controller.getUser);
router.route("/updateuser/:id").put(controller.updateUser);
router.route("/deleteuser/:id").delete(controller.deleteUser);

module.exports = router;