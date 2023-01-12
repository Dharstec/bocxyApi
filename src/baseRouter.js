const Product = require("./routes/productRouter");


module.exports = function (app) {
    app.use("/Product", Product);
};