const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user.controller");
const checkAuth = require("../middlewares/check-auth.middleware");

router.post("/signup", UserController.createUser);
router.post("/login", UserController.userLogin);
router.post("/changepassword", checkAuth, UserController.changePassword);

module.exports = router;
