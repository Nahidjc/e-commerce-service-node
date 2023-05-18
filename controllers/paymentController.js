const SSLCommerzPayment = require('sslcommerz-lts');
const store_id = process.env.SSLCOMMERZ_STORE_ID;
const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWORD;
const is_live = false;
const shortid = require("shortid");
require("dotenv").config();


exports.SSLCommerz_payment_init = async (req, res) => {
    const transactionId = `transaction_${shortid.generate()}`;
    const data = {
        total_amount: 100,
        currency: 'BDT',
        tran_id: transactionId,
        success_url: `${process.env.CLIENT_URL}/payment/successful`,
        fail_url: `${process.env.CLIENT_URL}/payment/fail`,
        cancel_url: `${process.env.CLIENT_URL}/payment/cancel`,
        ipn_url: `https://ed75-27-147-128-18.ngrok-free.app/payment/ipn`,
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.init(data).then(data => {
        let GatewayPageURL = data.GatewayPageURL;
        res.send({ GatewayPageURL })
    });
};


exports.SSLCommerz_payment_success = async (req, res, next) => {
    return res.status(200).json(
        {
            data: req.body,
            message: 'Payment success'
        }
    );
};


exports.SSLCommerz_payment_ipn = async (req, res, next) => {
    return res.status(200).json(
        {
            data: req.body,
            message: 'Payment notification'
        }
    );

};
