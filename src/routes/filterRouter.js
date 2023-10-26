const router = require('express').Router();

const Filter = require('../controllers/filterControllers');

router.get('/',async(req,res,next)=>{
    return res.status(200).json({
        title:"filter Controller",
        message:"the filter is working proper!!!"
    })
})

/**
 * @api {GET} /filter/getAllfilterList
 * @desc  Get Filter list API
 * @access public
 * **/
router.get("/getAllfilterList", Filter.getfiltersList);


module.exports = router;