const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "public/files" });

const Product = require("../controllers/productControllers");
// const Fileupload = require("../middleware/multer");

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
//file size code 

//   const fileSize = parseInt(req.headers["content-length"])
// console.log("fileSize",fileSize);
//   if ((file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "application/octet-stream") && fileSize <= 1000000) {
//     console.log("file.mimetype",file.mimetype,"fileSize",fileSize);
//       cb(null, true)
//   } else if (file.mimetype === "video/mp4" ) {
//     // && fileSize <= 5e+6
//       cb(null, true)
//   } else {
//     cb(new Error("file size img 1mb & vi 5mb only!!"), false);
//       cb(null, false)
//   }
};
const uploadData = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

router.post(
    "/createProduct", 
    // uploadSingleImage.array('files'),
    // upload.array('files'),
    uploadData.array('myFile'),
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