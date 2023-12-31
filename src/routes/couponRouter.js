const router = require('express').Router();

const Coupon = require('../controllers/couponControllers');

router.get('/',async(req,res,next)=>{
    return res.status(200).json({
        title:"coupon Controller",
        message:"the coupon is working proper!!!"
    })
})


/**
 * @api {POST} /Coupon/createCoupon
 * @desc  Add Coupon API
 * @access public
 * **/
router.post("/createCoupon", Coupon.createCoupon);
/**
 * @api {GET} /Coupon/getCoupon
 * @desc  Get Coupon API
 * @access public
 * **/
router.get("/getCoupon/:id", Coupon.getCoupon);
/**
 * @api {GET} /Coupon/getCouponByStoreId
 * @desc  Get Coupon API
 * @access public
 * **/
router.post("/getCouponByStoreId", Coupon.getCouponByStoreId);

/**
 * @api {DELETE} /Coupon/deleteCoupon/1234
 * @desc  Delete Coupon API
 * @access public
 * **/

router.delete("/deleteCoupon/:_id", Coupon.deleteCoupon);


/**
 * @api {PUT} /Coupon/updateCoupon
 * @desc  PUT Coupon API
 * @access public
 * **/


router.put("/updateCoupon", Coupon.updateCoupon);

/**
 * @api {GET} /Coupon/createCoupon/23456
 * @desc  Add Coupon API
 * @access public
 * **/
router.get("/findCoupon/:_id", Coupon.findCoupon);

module.exports = router;