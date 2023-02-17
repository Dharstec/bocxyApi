const router = require("express").Router();

const Product = require("../controllers/productControllers");

router.get('/', async (req,res,next)=>{
return res.status(200).json({
    title:"Express Testing",
    message:"the app is working properl!!"
})
})
/**
 * @api {POST} /Product/createProduct
 * @desc  Add Product API
 * @access public
 * **/
router.post("/createProduct", Product.createProduct);
/**
 * @api {GET} /Product/getProduct
 * @desc  Get Product API
 * @access public
 * **/
router.get("/getProduct", Product.getProduct);

/**
 * @api {GET ONE Product} /Product/getOneProduct
 * @desc  Get One Product API
 * @access public
 * **/
router.get("/getOneProduct", Product.getOneProduct);

/**
 * @api {UPDATE} /Product/updateProduct
 * @desc  Update Product API
 * @access public
 * **/

router.put("/updateProduct", Product.updateProduct);

/**
 * @api {DELETE} /Product/deleteProduct
 * @desc  Delete Product API
 * @access public
 * **/
router.delete("/deleteProduct/:_id", Product.deleteProduct);

module.exports = router;