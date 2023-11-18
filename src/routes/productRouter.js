const router = require("express").Router();
const multer = require("multer");
const Product = require("../controllers/productControllers");

router.get('/', async (req, res, next) => {
  return res.status(200).json({
    title: "Express Testing",
    message: "the app is working properl!!"
  })
})
/**
 * @api {POST} /Product/createProduct
 * @desc  Add Product API
 * @access public
 * **/



const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});
const multerFilter = (req, file, cb) => {
  if (file.mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Not a img File!!"), false);
  }
};
const uploadData = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

router.post(
  "/createProductImages",
  uploadData.array('files'),
  Product.createProductImage
);


router.post(
  "/createProduct",
  Product.createProduct
);

/**
 * @api {GET} /Product/getProduct
 * @desc  Get Product API
 * @access public
 * **/
router.get("/getProduct/:superAdminId", Product.getProduct);
router.get("/getProductsByCoordinates/:latitude/:longitude", Product.getProductsByCoordinates);
router.get("/getAllProduct/", Product.getCustomersProduct);
router.get("/getDashboard", Product.getDashboard);


/**
 * @api {GET} /Product/getProductFilters/:superAdminId
 * @desc  Get unique values of category, brand, and formulation for a given superAdminId
 * @access public
 **/
router.get('/getProductFilters/:superAdminId', Product.getProductDetails);



/**
 * @api {GET ONE Product} /Product/getOneProduct
 * @desc  Get One Product API
 * @access public
 * **/
router.get("/getOneProduct/:_id", Product.getOneProduct);
router.get("/gettypeProduct", Product.gettypeProduct);

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