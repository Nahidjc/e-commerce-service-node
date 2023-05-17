const { signup, login, logout } = require("../controllers/userController");
const Auth = require("../middleware/auth");

const router = require("express").Router();


router.post("/register", signup);
router.post("/login", login);
router.post("/logout", Auth, logout);
// router.get("/refresh_token", userController.refreshToken);


module.exports = router;