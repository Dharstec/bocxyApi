
const orderModel = require("../models/orderModels");
const PDFDocument = require('pdfkit');
const fs = require('fs');
var nodemailer = require('nodemailer');
var handlebars = require('handlebars');
const { template } = require('handlebars');
module.exports = {
    getOrderDetails(email) {
        return new Promise(async (resolve, reject) => {
            try {
                const order = await orderModel.findOne({ customerEmailId: email });
                resolve(order)
            } catch (error) {
                reject(error.message || error);
            }
        });

    },
    generatepdfOrder(order) {
        return new Promise(async (resolve, reject) => {
            try {

                const doc = new PDFDocument();
                const filename = `order_${order._id}.pdf`;
                // console.log(filename);
                doc.pipe(fs.createWriteStream(filename));

                doc.fontSize(20).text(`Order Confirmation # ${order._id}`,);
                doc.fontSize(14).text(`Customer Name ${order.customerName}`);
                doc.fontSize(14).text(`Customer Phone Number ${order.customerPhoneNumber}`);
                doc.fontSize(14).text(`Customer Emailid ${order.customerEmailId}`);
                doc.fontSize(14).text(`Customer Address${order.customerAddress.doorNoAndStreet}`);
                doc.fontSize(14).text(`${order.customerAddress.state}`);
                doc.fontSize(14).text(`${order.customerAddress.city}`);
                doc.fontSize(14).text(`${order.customerAddress.pincode}`);
                doc.fontSize(14).text(`${order.customerAddress.landmark}`);
                doc.fontSize(14).text(`${order.customerAddress.country}`);


                // add more content to the pdf here
                doc.end();
                // console.log("filename", filename);
                resolve(filename)
            } catch (error) {
                reject(error.message || error);
            }
        });


    },
    sendEmailForOrder(orderDetails, pdfFilename,customerDetails) {
        return new Promise(async (resolve, reject) => {
            try {
                var readHTMLFile = function (path, callback) {
                    fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
                        if (err) {
                            throw err;
                            callback(err);
                        }
                        else {
                            callback(null, html);
                        }
                    });
                };

                let transporter = nodemailer.createTransport({
                    host: process.env.host,
                    secure: false,
                    port: 587,
                    // port: 465,
                    auth: {
                        user: process.env.USEREMAIL,
                        pass: process.env.USERPASS
                    },
                    tls: {
                        rejectUnauthorized: false
                    },
                });
                  
                  var arrayItems = "";
                  var n;
                  for (n in customerDetails.orders) {
                    
                    arrayItems += customerDetails.orders[n].productId + ",";
                  }

                readHTMLFile(process.env.order_template_path, function (err, html) {
                    var template = handlebars.compile(html);
                    var replacements = {
                        customerName: `${orderDetails.customerName}`,
                        customerPhoneNumber: `${orderDetails.customerPhoneNumber}`,
                        customerEmailId: `${orderDetails.customerEmailId}`,
                        productids : arrayItems,
                        doorNoAndStreet:`${orderDetails.customerAddress.doorNoAndStreet}`,
                        city: `${orderDetails.customerAddress.state}`,
                        state: `${orderDetails.customerAddress.city}`,
                        pincode:`${orderDetails.customerAddress.pincode}`,
                        landmark:`${orderDetails.customerAddress.landmark}`,
                        country:`${orderDetails.customerAddress.country}`,


                    };
                    var htmlToSend = template(replacements);
                    var mailOptions = {
                        from: process.env.USEREMAIL,
                        to: orderDetails.customerEmailId,
                        subject: 'Order Confirmation',
                        text: 'Thank you for your order!',
                        html: htmlToSend,
                        attachments: [{
                            filename: pdfFilename,
                            path: `C:/KUMARI/Ecommerce-Project/Ecommerce-Backend/${pdfFilename}`,
                            contentType: 'application/pdf'
                        }],

                    };
                    transporter.verify((error, _success) => {
                        if (error) {
                            console.log({ error });
                        } else {
                            console.log("Server is ready to take our messages");
                        }
                    });
                    transporter.sendMail(mailOptions, function (error, response) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log("Email sent", response);
                            resolve(response)

                        }
                    });
                });

            } catch (error) {
                reject(error.message || error);
            }
        });


    }
}
