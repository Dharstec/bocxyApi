const router = require('express').Router();

const Admin = require('../controllers/adminControllers');

router.get('/', async (req, res, next) => {
    return res.status(200).json({
        title: "admin controller",
        message: "the admin is working properl!!"
    })
})
/**
 * @api {POST} /admin/createStoreAdmin
 * @desc  Add store admin API
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
 * @api {GET} /admin/getAllStores
 * @desc  Get all Store API
 * @access public
 * **/
router.get("/getAllStores/:superAdminId", Admin.getAllStoreAdmin);

/**
 * @api {GET} /admin/getAllMainStore
 * @desc  Get all main Store API
 * @access public
 * **/
router.get("/getAllMainStore", Admin.getAllMainStore);

/**
 * @api {GET ONE Store} /Customer/getOneStore/
 * @desc  Get One store API
 * @access public
 * **/
router.get("/getOneStore/:id", Admin.getOneStore);

/**
 * @api {UPDATE} /admin/updateStoreAdmin
 * @desc  Update Store Admin API
 * @access public
 * **/

router.put("/updateStoreAdmin", Admin.updateStoreAdmin);

/**
 * @api {DELETE} /admin/deleteStoreAdmin
 * @desc  Delete Store Admin API
 * @access public
 * **/
router.delete("/deleteStoreAdmin/:_id", Admin.deleteStoreAdmin);

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