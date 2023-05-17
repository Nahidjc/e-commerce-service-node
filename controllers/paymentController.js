const SSLCommerzPayment = require('sslcommerz-lts');
const store_id = 'nahid6464e0744c59c';
const store_passwd = 'nahid6464e0744c59c@ssl'
const is_live = false;
const shortid = require("shortid");
// const Order = require("../models/Order");
require("dotenv").config();

// For live payment set first parameter `false` and for sandbox set it `true`

exports.SSLCommerz_payment_init = async (req, res) => {
    const transactionId = `transaction_${shortid.generate()}`;
    // let paymentDone = false;
    const data = {
        total_amount: 100,
        currency: 'BDT',
        tran_id: transactionId, // use unique tran_id for each api call
        success_url: `${process.env.SERVER_URL}/payment/success`,
        fail_url: 'http://localhost:3030/fail',
        cancel_url: 'http://localhost:3030/cancel',
        ipn_url: `http://192.168.0.110:8000/payment/ipn`,
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
        // // res.send({ GatewayPageURL })
        return res.status(200).redirect(GatewayPageURL);
        // if (data?.GatewayPageURL) {
        //     return res.send({ GatewayPageURL })
        // }
        // else {
        //     return res.status(400).json({
        //         message: "Session was not successful"
        //     });
        // }
    });


};


exports.SSLCommerz_payment_success = async (req, res, next) => {
    console.log('Payment success', req.body);
    return res.status(200).json(
        {
            data: req.body,
            message: 'Payment success'
        }
    );
};

exports.SSLCommerz_payment_ipn = async (req, res, next) => {


    /** 
    * If payment notification
    */
    console.log("=====================If payment notification===========", req.body);
    return res.status(200).json(
        {
            data: req.body,
            message: 'Payment notification'
        }
    );

};
// exports.SSLCommerz_payment_fail = (req, res) => {
//     res.redirect(`${process.env.CLIENT_URL}/checkout/fail`);
// };

// exports.SSLCommerz_payment_cancel = (req, res) => {
//     res.redirect(`${process.env.CLIENT_URL}/checkout/cancel`);
// };

// -------------------------------- After Success

// console.log(response['sessionkey']);
//     D37CD2C0A0D322991531D217E194F981

// console.log(response['GatewayPageURL']);
//     https://sandbox.sslcommerz.com/EasyCheckOut/testcded37cd2c0a0d322991531d217e194f981

// -------------------------------- After Failure (Wrong Store ID)

// console.log(response['status']);
//     FAILED

// console.log(response['failedreason']);
//     Store Credential Error Or Store is De-active