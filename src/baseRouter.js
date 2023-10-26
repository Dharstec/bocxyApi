const Product = require("./routes/productRouter");
const Customer = require('./routes/customerRouter');
const Order = require('./routes/orderRouter')
const Coupon = require('./routes/couponRouter');
const Marketing =require('./routes/marketingRouter')
const Admin =require('./routes/adminRouter')
const Filter =require('./routes/filterRouter')
const Inventory =require('./routes/inventoryRouter')
const Review =require('./routes/reviewRouter')
module.exports = function (app) {
    app.use("/product", Product);
    app.use("/filter", Filter);
    app.use("/inventory", Inventory);
    app.use('/customer', Customer);
    app.use('/admin', Admin);
    app.use('/order', Order);
    app.use('/review',Review)
    app.use('/coupon', Coupon);
    app.use('/marketing',Marketing)
};