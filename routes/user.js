const express = require("express");
const controller = require("../controllers");
const router = express.Router();

router.route("/users").get(controller.getAllUsers);
router.route("/user").post(controller.createUser);
router.route("/user/:id").get(controller.getUser).put(controller.updateUser).delete(controller.deleteUser);

module.exports = router;