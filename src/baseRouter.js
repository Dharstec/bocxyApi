const Product = require("./routes/productRouter");
const Customer = require('./routes/customerRouter');
const Order = require('./routes/orderRouter')
const Coupon = require('./routes/couponRouter');
const Marketing =require('./routes/marketingRouter')
const Admin =require('./routes/adminRouter')
module.exports = function (app) {
    app.use("/product", Product);
    app.use("/inventory", Product);
    app.use('/customer', Customer);
    app.use('/admin', Admin);
    app.use('/order', Order);
    app.use('/coupon', Coupon);
    app.use('/marketing',Marketing)
};