const router = require('express').Router();

const Review = require('../controllers/reviewControllers');

router.get('/',async(req,res,next)=>{
    return res.status(200).json({
        title:"review Controller",
        message:"the review is working proper!!!"
    })
})


/**
 * @api {POST} /review/createReview
 * @desc  Add Review API
 * @access public
 * **/
router.post("/createReview", Review.createReview);
/**
 * @api {GET} /Review/getReviewsByProduct
 * @desc  Get Review API
 * @access public
 * **/
router.get("/getReviewsByProduct/:productId", Review.getReviewsByProduct);

/**
 * @api {GET} /Review/getReview
 * @desc  Get Review API
 * @access public
 * **/
router.get("/getReviewsByOrder/:orderId", Review.getReviewsByOrder);


module.exports = router;