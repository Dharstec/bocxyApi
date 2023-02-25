const router = require("express").Router();

const Product = require("../controllers/productControllers");
// const { uploadPhoto, resizeUserPhoto } = require("../middleware/multer");
const {
    uploadPhoto,
    resizeUserPhoto,
    uploadSingleImage,
  } = require("../middleware/multer");
// require('../middleware/multer');
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

// multerInstance.upload.single('image'),
// upload.resizeUserPhoto("productImage"),upload.uploadPhoto('productImage'),
// router.post("/createProduct",  uploadPhoto,resizeUserPhoto, Product.createProduct);

router.post(
    "/createProduct",

// uploadSingleImage("./public").single('image'),
// .fields([{name:"image",maxCount:1},{name:"videos",maxCount:1}])
// ({name:"image"},{name:"videos"}),
    // .single('image'),
    // fields([{name:"image",maxCount:1},{name:"videos",maxCount:1}])
    Product.createProduct
  );



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