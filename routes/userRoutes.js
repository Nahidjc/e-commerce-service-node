const { signup, login } = require("../controllers/userController");

const router = require("express").Router();


router.post("/register", signup);
router.post("/login", login);
// router.get("/refresh_token", userController.refreshToken);


module.exports = router;