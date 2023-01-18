const customerModel = require("../models/customerModels");
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var handlebars = require('handlebars');
var fs = require('fs');
const { template } = require('handlebars');
const jwt = require("jsonwebtoken");
const salt = bcrypt.genSaltSync(10);
require("dotenv").config();
module.exports = {
    createCustomer(req, res) {
        customerModel.find({ email: req.body.email })
            .exec(function (err, reuslt) {
                if (err) {
                    console.log("Error", err);
                }
                else {
                    if (reuslt.length > 0) {
                        res.send("Allerdy Use These Email");
                    }
                    else {
                        let user = new customerModel(req.body)

                        bcrypt.genSalt(10, (err, salt) => {
                            if (err) {
                                console.log("Error", err);
                            }
                            else {
                                bcrypt.hash(user.password, salt, (err, hash) => {
                                    if (err) {
                                        console.log("Error", err);
                                    }
                                    else {
                                        user.password = hash

                                        user.save((err, result) => {
                                            if (err) {
                                                console.log("Error", err);
                                            }
                                            else {
                                                console.log("User Data As Inserted Successfully", result);
                                                // res.send(result)
                                                var num
                                                num = Math.floor((Math.random() * 1000000) + 54);

                                                console.log("The OTP As Sended");

                                                customerModel.updateMany({ email: req.body.email },
                                                    { otp: num }, { customerName: req.body.customerName }, (err, result) => {
                                                        if (err) {
                                                            console.log("Error", err);
                                                        }
                                                        else {
                                                            console.log("OTP As Update");
                                                            sendEmail(num, req.body.email, req.body.customerName)
                                                            return res.send({
                                                                message: "Customer Created Successfully",
                                                                status: 1,
                                                                // Result: result
                                                            })
                                                        }
                                                    })
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                }
            })
    },

    verifyUserOtp: async (req, res) => {
        try {
            let findUser = await customerModel.findOneAndUpdate({
                otp: req.params.otp
            },
                { $set: { isOtpVerified: "1" } }, { new: true })
            if (!findUser) {
                return message = "please enter a valid OTP"
            }
            return res.send({
                message: "OTP verifed successfully",
                status: 1,
                data: findUser
            })
        } catch (error) {
            console.log("please enter all the mandatory fields otpverify errors", error);
            return error
        }
    },

    loginCustomer: async (req, res) => {
        try {
            customerModel.findOne({ email: req.body.email }, { status: 0 }, (err, user) => {
                if (err)
                    return res.status(400).send({
                        status: false,
                        message: "Please try after some time",
                    });
                if (!user)
                    return res.status(400).send({
                        status: false,
                        message: "You are not registered!",
                    });
                if (user.isOtpVerified == "0")
                    return res.status(400).send({
                        status: false,
                        message: "Please Verify Otp First!",
                    });

                bcrypt.compare(req.body.password, user.password, (err, data) => {
                    if (!data)
                        return res.status(400).send({
                            status: false,
                            message: "Wrong password!",
                        });
                    else
                        return res.status(200).send({
                            status: true,
                            token: jwt.sign(
                                { email: user.email, _id: user._id },
                                "secret",
                                // { expiresIn: '1h' }
                            ),
                            data: user,
                        });
                });
            });
        } catch (error) {
            return res.status(500).send({
                message: "Internal server error",
                status: false,
            });
        }
    },
    forgetPassword: async (req, res) => {
        console.log("forget user password", req.body);
        try {
            let findUser = await customerModel.findOne({ email: req.body.email });
            if (!findUser) {
                return message = "please enter the valid email";
            }
            var num
            num = Math.floor((Math.random() * 1000000));

            findUser = await customerModel.findOneAndUpdate({ _id: findUser._id },
                { $set: { otp: num, isOtpVerified: '0' } }, { new: true });
            sendEmail(num, req.body.email)
            return res.send({
                message: "reset your password",
                status: 1,
                data: {
                    _id: findUser._id
                }
            })
        } catch (error) {
            console.log('forgetuserpassword', error);
            return error
        }
    },
    resetPassword: async (req, res) => {
        console.log("reset userpassword", req.body);
        try {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            req.body.password = hashedPassword

            let resetpassword = await customerModel.findOneAndUpdate({ _id: req.body._id },
                { $set: { password: req.body.password } }, { new: true })
            if (!resetpassword) {
                return message = "please enter a customer details"
            }
            console.log("password changed", resetpassword);
            return res.send({
                message: "Password Changed Successfully",
                status: 1
            })

        } catch (error) {
            console.log('reset userpassword', error);
            return error

        }
    },
    getAllCustomer: async (req, res) => {
        try {
            let getCustomer = await customerModel.find({}).populate('wishlistProductDetails').populate('orderHistory')

            if (!getCustomer) {
                return res.status(400).send({
                    message: "No Record Found",
                    status: false,
                });
            } else {
                return res.status(200).send({
                    message: "Get All Customer",
                    status: true,
                    data: getCustomer,
                });
            }
        } catch (error) {
            return res.status(400).send({
                message: "Something Went Wrong",
                status: false,
                error: error,
            });
        }
    },
    getOneCustomer: async (req, res) => {
        try {
            let getOneCustomer = await customerModel.findOne({ _id: req.body._id })
                .populate('wishlistProductDetails').populate('orderHistory');
            if (!getOneCustomer) {
                return res.status(400).send({
                    message: "No Record Found",
                    status: false,
                });
            } else {
                return res.status(200).send({
                    message: "Get One Customer",
                    status: true,
                    data: getOneCustomer,
                });
            }
        } catch (error) {
            return res.status(400).send({
                message: "Something Went Wrong",
                status: false,
                error: error,
            });
        }
    },
    updateCustomer: async (req, res) => {
        try {
            let updateCustomer = await customerModel.findOneAndUpdate(
                {
                    _id: req.body._id,
                },
                {
                    $set: req.body,

                },
                { new: true }
            );

            if (!updateCustomer) {
                return res.status(400).send({
                    message: "No Record Found",
                    status: false,
                });
            } else {
                return res.status(200).send({
                    message: "Update Customer Successfully",
                    status: true,
                    data: updateCustomer,
                });
            }
        } catch (error) {
            return res.status(400).send({
                message: "Something Went Wrong",
                status: false,
                error: error,
            });
        }
    },
    deleteCustomer: async (req, res) => {
        try {
            let deleteCustomer = await customerModel.findOneAndDelete(
                {
                    _id: req.body._id
                },
            );

            if (!deleteCustomer) {
                return res.status(400).send({
                    message: "No Record Found",
                    status: false,
                });
            } else {
                return res.status(200).send({
                    message: "Delete Customer Successfully",
                    status: true,
                    data: deleteCustomer,
                });
            }
        } catch (error) {
            return res.status(400).send({
                message: "Something Went Wrong",
                status: false,
                error: error,
            });
        }
    }
}

function sendEmail(num, email, customerName) {
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
        host: "smtp.gmail.com",
        // service: 'gmail',
        secure: true,
        port: 465,

        auth: {
            user:process.env.USEREMAIL,
            pass:process.env.USERPASS
            // user: 'kumari@dharstec.com',
            // pass: 'yyhqtosivbdgjmqv'
        },
    });
    // smtpTransport = nodemailer.createTransport(smtpTransport({
    //     host: "smtp.gmail.com",
    //     secure: true,
    //     port: 465,
    //     auth: {
    //         user: 'kumari@dharstec.com',
    //         pass: 'rmeutkgghwlojbui'
    //     }
    // }));
    readHTMLFile(__dirname + '/views/layouts/first.html', function (err, html) {
        var template = handlebars.compile(html);
        var replacements = {
            otp: `${num}`,
            customerName: `${customerName}`

        };
        var htmlToSend = template(replacements);
        var mailOptions = {
            from: process.env.USEREMAIL,
            to: email,
            subject: "Dharstec ✔",
            html: htmlToSend
        };
        transporter.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent");
            }
        });
    });
}