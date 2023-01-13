const Product = require("./routes/productRouter");
const Customer = require('./routes/customerRouter');
const Order = require('./routes/orderRouter')

module.exports = function (app) {
    app.use("/Product", Product);
    app.use('/Customer',Customer)
    app.use('/Order',Order)
};