const Product = require("./routes/productRouter");
const Customer = require('./routes/customerRouter');
const Order = require('./routes/orderRouter')
const Coupon = require('./routes/couponRouter');
const Marketing =require('./routes/marketingRouter')
module.exports = function (app) {
    app.use("/Product", Product);
    app.use('/Customer', Customer);
    app.use('/Order', Order);
    app.use('/Coupon', Coupon);
    app.use('/Marketing',Marketing)
};