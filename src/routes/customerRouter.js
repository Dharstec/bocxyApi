const router = require("express").Router();

const Customer = require("../controllers/customerControllers");

router.get('/', async (req, res, next) => {
    return res.status(200).json({
        title: "customer controller",
        message: "the customer is working properl!!"
    })
})
/**
 * @api {POST} /Customer/createCustomer
 * @desc  Add Customer API
 * @access public
 * **/
router.post("/customerSignup", Customer.createCustomer);

/**
 * @api {POST} /Customer/loginCustomer
 * @desc  Login Customer API
 * @access public
 * **/
router.post("/loginCustomer", Customer.loginCustomer);

/**
 * @api {POST} /Customer/verifyCustomerOtp
 * @desc  verifyCustomerOtp  API
 * @access public
 * **/
router.get('/verifyCustomerOtp/:otp', Customer.verifyUserOtp);

/**
 * @api {POST} /Customer/forgetPassword
 * @desc  Post Customer API
 * @access public
 * **/
router.post('/forgetPassword',Customer.forgetPassword);
/**
 * @api {POST} /Customer/resetPassword
 * @desc  Post Customer API
 * @access public
 * **/
router.post('/resetPassword',Customer.resetPassword);
/**
 * @api {GET} /Customer/getCustomer
 * @desc  Get Customer API
 * @access public
 * **/
router.get("/getAllCustomer", Customer.getAllCustomer);

/**
 * @api {GET ONE Customer} /Customer/getOneCustomer
 * @desc  Get One Customer API
 * @access public
 * **/
router.get("/getOneCustomer", Customer.getOneCustomer);

/**
 * @api {UPDATE} /Customer/updateCustomer
 * @desc  Update Customer API
 * @access public
 * **/

router.put("/updateCustomer", Customer.updateCustomer);

/**
 * @api {DELETE} /Customer/deleteCustomer
 * @desc  Delete Customer API
 * @access public
 * **/
router.delete("/deleteCustomer", Customer.deleteCustomer);

module.exports = router;