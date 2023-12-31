const router = require("express").Router();

const Order = require("../controllers/orderControllers");

router.get('/', async (req, res, next) => {
    return res.status(200).json({
        title: "order controller",
        message: "the order is working properl!!"
    })
})
/**
 * @api {POST} /Order/createOrder
 * @desc  Add Order API
 * @access public
 * **/
router.post("/createOrder", Order.createOrder);
router.post("/paymentIntegration", Order.paymentIntegration);
/**
 * @api {GET} /Order/getAllOrder/:id
 * @desc  Get all Order for stores API
 * @access public
 * **/
router.get("/getAllOrder/:storeId", Order.getAllOrder);
/**
 * @api {GET} /Order/getAllOrderByCustomer
 * @desc  Get getAllOrderByCustomer API
 * @access public
 * **/
router.get("/getAllOrderByCustomer/:customerId", Order.getAllOrderByCustomer);
/**
 * @api {GET ONE Order} /Order/getOneOrder
 * @desc  Get One Order API
 * @access public
 * **/
router.post("/getOneOrder", Order.getOneOrder);

/**
 * @api {UPDATE} /Order/updateOrder
 * @desc  Update Order API
 * @access public
 * **/

router.put("/updateOrder", Order.updateOrder);

/**
 * @api {DELETE} /Order/deleteOrder
 * @desc  Delete Order API
 * @access public
 * **/
router.delete("/deleteOrder", Order.deleteOrder);

/**
 * @api {updateOrderStatus} /Order/updateOrderStatus
 * @desc  updateOrderStatus Order API
 * @access public
 * **/
router.post("/updatePaymentStatus", Order.updateOrderStatus);

router.post('/sendOrderConfirmationEmail',Order.sendOrderConfirmationEmail)

module.exports = router;