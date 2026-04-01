const router = require("express").Router();
const AuthController = require("../controllers/authController");
const { isAuthenticated } = require("../helpers/auth");

//Register page
router.get("/register", AuthController.registerPage);
router.post("/register", AuthController.register);

//Login page
router.get("/login", AuthController.loginPage);
router.post("/login", AuthController.login);

//Logout
router.get("/logout", isAuthenticated, AuthController.logout);

module.exports = router;
