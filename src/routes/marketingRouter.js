const router = require('express').Router();

const Marketing = require('../controllers/marketingControllers');

router.get('/', async (req, res, next) => {
    return res.status(200).json({
        title: "marketing Controller",
        message: "the marketing is working proper!!!"
    })
})

/**
 * @api {POST} /Marketing/createMarketing
 * @desc  Add Marketing API
 * @access public
 * **/
router.post("/createMarketing", Marketing.createMarketing);
/**
 * @api {GET} /Marketing/getMarketing
 * @desc  Get Marketing API
 * @access public
 * **/
router.get("/getAllMarketing", Marketing.getMarketing);

/**
 * @api {GET} /Marketing/getMarketing
 * @desc  GetOne Marketing API
 * @access public
 * **/
router.post("/getOneMarketing", Marketing.getOneMarketing);


/**
 * @api {PUT} /Marketing/updateMarketing
 * @desc  Put Marketing API
 * @access public
 * **/
router.put("/updateMarketing", Marketing.updateMarketing);

/**
 * @api {DELETE} /Marketing/deleteMarketing
 * @desc  Delete Marketing API
 * @access public
 * **/
router.delete("/deleteMarketing", Marketing.deleteMarketing);


module.exports = router;