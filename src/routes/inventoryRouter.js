const router = require("express").Router();
const multer = require("multer");
const inventory = require("../controllers/inventoryControllers");

router.get('/', async (req, res, next) => {
  return res.status(200).json({
    title: "Ineventory Testing",
    message: "the app is working properl!!"
  })
})

router.post(
  "/createInventoryProduct",
  inventory.createinventoryProduct
);

/**
 * @api {GET} /Product/getProduct
 * @desc  Get Product API
 * @access public
 * **/
router.get("/getInventoryProduct/:storeId", inventory.getinventoryProduct);




/**
 * @api {GET ONE Product} /Product/getOneProduct
 * @desc  Get One Product API
 * @access public
 * **/
router.get("/getOneInventoryProduct/:_id", inventory.getOneInventoryProduct);

/**
 * @api {UPDATE} /inventory/updateProduct
 * @desc  Update inventory Product API
 * @access public
 * **/

router.put("/updateInventoryProduct", inventory.updateProduct);

router.get("/gettypeProduct", inventory.gettypeProduct);

/**
 * @api {DELETE} /inventory/deleteProduct
 * @desc  Delete inventory Product API
 * @access public
 * **/
router.delete("/deleteInventoryProduct/:_id", inventory.deleteProduct);
module.exports = router;