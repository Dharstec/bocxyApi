const router = require('express').Router();
const multer = require("multer");
const upload = multer({ dest: "public/files" });

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
  //   if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
  //     return cb(new Error('Please upload a valid image file'))
  // }
  // cb("errror",undefined, true)

}

const uploadData = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
  });

router.post("/createMarketing", uploadData.single('myFile'), Marketing.createMarketing);
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
router.delete("/deleteMarketing/:_id", Marketing.deleteMarketing);


module.exports = router;