const router = require('express').Router();

const Coupon = require('../controllers/couponControllers');

router.get('/',async(req,res,next)=>{
    return res.status(200).json({
        title:"coupon Controller",
        message:"the coupon is working proper!!!"
    })
})


/**
 * @api {POST} /Coupon/createOrder
 * @desc  Add Coupon API
 * @access public
 * **/
router.post("/createCoupon", Coupon.createCoupon);
/**
 * @api {GET} /Coupon/getCoupon
 * @desc  Get Coupon API
 * @access public
 * **/
router.get("/getCoupon", Coupon.getCoupon);


module.exports = router;