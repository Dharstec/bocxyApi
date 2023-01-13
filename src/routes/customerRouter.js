const router = require("express").Router();

const Customer = require("../controllers/customerControllers");

router.get('/', async (req,res,next)=>{
return res.status(200).json({
    title:"customer controller",
    message:"the customer is working properl!!"
})
})
/**
 * @api {POST} /Order/createOrder
 * @desc  Add Order API
 * @access public
 * **/
router.post("/createCustomer", Customer.createCustomer);
/**
 * @api {GET} /Customer/getCustomer
 * @desc  Get Product API
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
 * @desc  Update Product API
 * @access public
 * **/

router.put("/updateCustomer", Customer.updateCustomer);

/**
 * @api {DELETE} /Customer/deleteCustomer
 * @desc  Delete Product API
 * @access public
 * **/
router.delete("/deleteCustomer", Customer.deleteCustomer);

module.exports = router;