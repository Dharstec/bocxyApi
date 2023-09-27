const router = require('express').Router();

const Admin = require('../controllers/adminControllers');

router.get('/', async (req, res, next) => {
    return res.status(200).json({
        title: "admin controller",
        message: "the admin is working properl!!"
    })
})
/**
 * @api {POST} /Customer/createCustomer
 * @desc  Add Customer API
 * @access public
 * **/
router.post("/createStoreAdmin", Admin.createStoreAdmin);

/**
 * @api {POST} /Customer/loginCustomer
 * @desc  Login Customer API
 * @access public
 * **/
router.post("/login", Admin.adminLogin);

/**
 * @api {POST} /Customer/verifyCustomerOtp
 * @desc  verifyCustomerOtp  API
 * @access public
 * **/
router.get('/verifyCustomerOtp/:otp', Admin.verifyUserOtp);

/**
 * @api {POST} /Customer/forgetPassword
 * @desc  Post Customer API
 * @access public
 * **/
router.post('/forgetPassword',Admin.forgetPassword);
/**
 * @api {POST} /Customer/resetPassword
 * @desc  Post Customer API
 * @access public
 * **/
router.post('/resetPassword',Admin.resetPassword);
/**
 * @api {GET} /Customer/getCustomer
 * @desc  Get Customer API
 * @access public
 * **/
router.get("/getAllStores", Admin.getAllStoreAdmin);

/**
 * @api {GET ONE Customer} /Customer/getOneCustomer
 * @desc  Get One Customer API
 * @access public
 * **/
router.post("/getOneCustomer", Admin.getOneCustomer);

/**
 * @api {UPDATE} /Customer/updateCustomer
 * @desc  Update Customer API
 * @access public
 * **/

router.put("/updateCustomer", Admin.updateCustomer);

/**
 * @api {DELETE} /Customer/deleteCustomer
 * @desc  Delete Customer API
 * @access public
 * **/
router.delete("/deleteCustomer/:_id", Admin.deleteCustomer);

router.get("/findCustomer/:_id", Admin.findCustomer);


/**
 * @api {POST} /Customer/resendOtp
 * @desc  Resend OTP API To Customer
 * @access public
 * **/
router.post("/resendOtp", Admin.resendOtp);


router.put('/addCardUpdateCustomer', Admin.addCardUpdateCustomer)
router.post('/whatapp',Admin.whatApp);
router.post('/removecart',Admin.removeCart)
router.get('/sendEmailtoCustomer',Admin.sendEmailtoCustomer)

module.exports = router;