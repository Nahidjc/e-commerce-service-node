const { productUpload } = require("../controllers/productController");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const router = require("express").Router();


router.post("/upload",upload.single('image'), productUpload);




module.exports = router;