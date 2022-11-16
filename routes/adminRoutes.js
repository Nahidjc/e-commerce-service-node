const { signup, login } = require("../controllers/adminController");

const router = require("express").Router();


router.post("/register", signup);
router.post("/login", login);



module.exports = router;