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

/**
 * @api {DELETE} /Review/deleteReview/1234
 * @desc  Delete Review API
 * @access public
 * **/

router.delete("/deleteReview/:_id", Review.deleteReview);


/**
 * @api {PUT} /Review/updateReview
 * @desc  PUT Review API
 * @access public
 * **/


router.put("/updateReview", Review.updateReview);

/**
 * @api {GET} /Review/createReview/23456
 * @desc  Add Review API
 * @access public
 * **/
router.get("/findReview/:_id", Review.findReview);

module.exports = router;