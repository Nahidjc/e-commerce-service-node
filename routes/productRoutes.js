const { productUpload, getAllProducts } = require("../controllers/productController");
const multer = require('multer');
const authAdmin = require("../middleware/adminAuth");
const upload = multer({ dest: 'uploads/' })

const router = require("express").Router();


router.post("/upload", authAdmin, upload.single('image'), productUpload);
router.get("/all", getAllProducts);



module.exports = router;