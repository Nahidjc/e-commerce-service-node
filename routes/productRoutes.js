const { productUpload, getAllProducts, getProductById } = require("../controllers/productController");
const multer = require('multer');
const authAdmin = require("../middleware/adminAuth");
const upload = multer({ dest: 'uploads/' })

const router = require("express").Router();


router.post("/upload", authAdmin, upload.single('image'), productUpload);
router.get("/all", getAllProducts);
router.get("/:id", getProductById);



module.exports = router;