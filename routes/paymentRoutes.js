const {
    SSLCommerz_payment_init,
    SSLCommerz_payment_success,
    SSLCommerz_payment_ipn
} = require("../controllers/paymentController");

const router = require("express").Router();

router.get("/init", SSLCommerz_payment_init);
router.post("/success", SSLCommerz_payment_success);
router.post("/ipn", SSLCommerz_payment_ipn);

module.exports = router;
