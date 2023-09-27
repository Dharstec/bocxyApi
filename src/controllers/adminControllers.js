const customerModel = require("../models/customerModels");
const adminModel = require("../models/adminModels");
const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var handlebars = require('handlebars');
var fs = require('fs');
const { template } = require('handlebars');
const jwt = require("jsonwebtoken");
const salt = bcrypt.genSaltSync(10);
// var SibApiV3Sdk = require('sib-api-v3-sdk');
// var defaultClient = SibApiV3Sdk.ApiClient.instance;
const ultramsg = require('ultramsg-whatsapp-api');
const instance_id = process.env.instance_id // Ultramsg.com instance id
const ultramsg_token = process.env.ultramsg_token  // Ultramsg.com token
const api = new ultramsg(instance_id, ultramsg_token);
var moment = require('moment');
require("dotenv").config();


module.exports = {
    createStoreAdmin(req, res) {
        adminModel.find({ email: req.body.email})
            .exec(function (err, reuslt) {
                if (err) {
                    console.log("Error in getting data in admin model", err);
                }
                else {
                    if (reuslt.length > 0) {
                        res.send({
                            message: "Already Use These Email",
                            status: false,
                        })
                    }
                    else {
                        let user = new adminModel(req.body)

                        bcrypt.genSalt(10, (err, salt) => {
                            if (err) {
                                console.log("genSalt Error", err);
                            }
                            else {
                                bcrypt.hash(user.password, salt, (err, hash) => {
                                    if (err) {
                                        console.log("bcrypt Error", err);
                                    }
                                    else {
                                        user.password = hash

                                        user.save((err, result) => {
                                            if (err) {
                                                console.log("Error in creating new admin", err);
                                            }
                                            else {
                                                console.log("Admin Data As Inserted Successfully", result);
                                                return res.send({
                                                    message: "Admin Created Successfully",
                                                    status: 1,
                                                    // Result: result
                                                })
                                                // res.send(result)
                                                // var num
                                                // num = Math.floor((Math.random() * 1000000) + 54);

                                                // console.log("The OTP As Sended", num);

                                                // adminModel.updateMany({ email: req.body.email },
                                                //      { firstName: req.body.firstName }, (err, result) => {
                                                //         if (err) {
                                                //             console.log("Error in update in admin model", err);
                                                //         }
                                                //         else {
                                                //             sendEmail(num, req.body.email, req.body.firstName)
                                                //             return res.send({
                                                //                 message: "Customer Created Successfully",
                                                //                 status: 1,
                                                //                 // Result: result
                                                //             })
                                                //         }
                                                //     })
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
                console.log("please enter valid OTP");
                return res.send({
                    message: "please enter a valid OTP",
                    status: false
                })
            }
            else {
                return res.send({
                    message: "OTP verifed successfully",
                    status: 1,
                    // data: findUser
                })
            }

        } catch (error) {
            console.log("please enter all the mandatory fields otpverify errors", error);
            return error
        }
    },

    adminLogin: async (req, res) => {
        console.log("body",req.body)
        try {
            adminModel.findOne({ email: req.body.email }, { status: 0 }, (err, adminData) => {
                console.log("adminData",adminData)
                if (err){
                    return res.status(400).send({
                        status: false,
                        message: "Please try after some time",
                    });
                }else{
                    if (!adminData){
                        return res.status(400).send({
                            status: false,
                            message: "You are not registered!",
                        });
                    }else{
                        bcrypt.compare(req.body.password, adminData.password, (err, data) => {
                            if (!data){
                                return res.status(400).send({
                                    status: false,
                                    message: "Wrong password!",
                                });
                            }   
                            else{
                                let response={
                                    "_id": adminData._id,
                                    "store_name": adminData.store_name,
                                    "address": adminData.address,
                                    "phone_no": adminData.phone_no,
                                    "co_ordinates": adminData.co_ordinates,
                                    "role_flag": adminData.role_flag,
                                    "email": adminData.email
                                   
                                }
                                return res.status(200).send({
                                    status: true,
                                    token: jwt.sign(
                                        { email: adminData.email, _id: adminData._id },
                                        "secret",
                                        // { expiresIn: '1h' }
                                    ),
                                    data: adminData,
                                });
                            }
                        });
                    }
                }
                  
            });
        } catch (error) {
            return res.status(500).send({
                message: "Internal server error",
                status: false,
            });
        }
    },
    findCustomer: async (req, res) => {
        try {
            let findId = await customerModel.findOne({ _id: req.params._id })

            if (!findId) {
                return res.status(400).send({
                    message: "No Record Found",
                    status: false,
                });
            } else {
                return res.status(200).send({
                    message: "Success",
                    status: true,
                    data: findId,
                });
            }
        } catch (error) {
            console.log("errrrrr", error);
            return res.status(400).send({
                message: "Something Went Wrong",
                status: false,
                error: error,
            });
        }
    },
    forgetPassword: async (req, res) => {
        console.log("forget user password", req.body);
        try {
            let findUser = await adminModel.findOne({ email: req.body.email });
            if (!findUser) {
                return message = "please enter the valid email";
            }
            var num
            num = Math.floor((Math.random() * 1000000));

            findUser = await adminModel.findOneAndUpdate({ email: req.body.email },
                { $set: { otp: num, isOtpVerified: '0' } }, { new: true });
            sendEmail(num, req.body.email, findUser.firstName)
            return res.send({
                message: "reset your password",
                status: 1,
                // data:findUser
                // data: forgetPassword
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

            let resetpassword = await adminModel.findOneAndUpdate({ email: req.body.email },
                { $set: { password: req.body.password } }, { new: true })
            if (!resetpassword) {
                return message = "please enter a admin details"
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
    getAllStoreAdmin: async (req, res) => {
        try {
            let getCustomer = await adminModel.find({ role_flag: "STORE_ADMIN" })

            if (!getCustomer) {
                return res.status(400).send({
                    message: "No Record Found",
                    status: false,
                });
            } else {
                return res.status(200).send({
                    message: "Get All Stores",
                    status: true,
                    data: getCustomer,
                });
            }
        } catch (error) {
            console.log("errrror********", error);
            return res.status(400).send({
                message: "Something Went Wrong",
                status: false,
                error: error,
            });
        }
    },
    getOneCustomer: async (req, res) => {
        try {
            let getOneCustomer = await customerModel.findOne({ email: req.body.email })
          
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
            console.log("err**********", error)
            return res.status(400).send({
                message: "Something Went Wrong",
                status: false,
                error: error,
            });
        }
    },
    updateStoreAdmin: async (req, res) => {
        try {
        //    let email_exist = adminModel.find({ email: req.body.email})
            let updateStoreAdmin = await adminModel.findOneAndUpdate(
                {
                    email: req.body.email,
                    // _id: req.body._id,
                },
                {
                    $set: req.body,

                },
                { new: true }
            );

            if (!updateStoreAdmin) {
                return res.status(400).send({
                    message: "No Record Found",
                    status: false,
                });
            } else {
                return res.status(200).send({
                    message: "Update Store Admin Successfully",
                    status: true,
                    data: updateStoreAdmin,
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
    deleteStoreAdmin: async (req, res) => {
        try {
            let deleteStoreAdmin = await customerModel.findByIdAndRemove(
                {
                    _id: req.params._id,
                },
            );

            if (!deleteStoreAdmin) {
                return res.status(400).send({
                    message: "No Record Found",
                    status: false,
                });
            } else {
                return res.status(200).send({
                    message: "Delete Store Admin Successfully",
                    status: true,
                    data: deleteStoreAdmin,
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

    resendOtp: async (req, res) => {
        try {
            var num;
            num = Math.floor(100000 + Math.random() * 900000);
            let resendOtp = await customerModel.findOneAndUpdate({
                email: req.body.email
            },
                { $set: { otp: num, isOtpVerified: "0" } }, { new: true })
            sendEmail(num, req.body.email, resendOtp.firstName)
            return res.send({
                message: 'Resend OTP to Customer',
                status: true,
                // data: resendOtp
            })

        } catch (error) {
            return res.status(400).send({
                message: "Something Went Wrong",
                status: false,
                error: error
            })
        }
    },
    whatApp: async (req, res) => {
        try {
            customerModel.findOne({ email: req.body.email }, async (err, user) => {
                if (user.isCartProductDetails == "0") {
                    return res.status(400).send({
                        status: false,
                        message: "Please Update Your Cart!",
                    });

                } else {
                    whatApp(req.body.email)
                    return res.status(200).send({
                        message: "Whatapp Msg Send and email",
                        status: true,
                        // data: response
                    })
                }
            })

        } catch (error) {
            console.log("errrrrr", error);

            return res.status(400).send({
                message: "Something Went Wrong",
                status: false,
                error: error
            })
        }
    },
    addCardUpdateCustomer: async (req, res) => {
        try {
            let addCardUpdateCustomer = await customerModel.findOneAndUpdate(
                {
                    email: req.body.email,
                },
                {
                    $set: {
                        isCartProductDetails: "1",
                        wishlistProductIdDetails: req.body.wishlistProductIdDetails,
                        cartProductDetails: req.body.cartProductDetails,

                    },

                },
                { new: true }
            );

            if (!addCardUpdateCustomer) {
                return res.status(400).send({
                    message: "No Record Found",
                    status: false,
                });
            } else {
                return res.status(200).send({
                    message: "addCardUpdate Successfully",
                    status: true,
                    data: addCardUpdateCustomer,
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

    sendEmailtoCustomer: async (req, result) => {
        try {
            let emailsending = await customerModel.find({ isCartProductDetails: '1', sendEmailtoCustomer: false })
            // console.log("emailsending", emailsending);

            let res = emailsending.length > 0 ? emailsending : []
            // console.log("res", res);
            console.log("res.length", res.length);

            if (res.length > 0) {
                for (let i of res) {
                    // console.log(i, "update timer");

                    let updateMin = moment(Date.now()).subtract(1, 'days');
                    // console.log(updateMin, 'updateMin');
                    var a = moment(i.updatedAt);
                    var b = moment(updateMin);
                    let resultAB = a.diff(b, 'hours')
                    console.log(resultAB)
                    if (resultAB >= 20) {
                        whatApp(i.email)
                        let addCardUpdateCustomer = await customerModel.findOneAndUpdate(
                            {
                                email: i.email,
                            },
                            {
                                $set: {
                                    sendEmailtoCustomer: true

                                },

                            },
                            { new: true }
                        );
                    }

                }

            }
            if (res.length == 0) {
                return result.status(400).send({
                    message: "No Record Found ",
                    status: false,
                });
            }
            else {
                return result.status(200).send({

                    message: "email send success ",
                    status: true,

                    data: res,
                });
            }
        } catch (error) {
            console.log("error", error);
            return res.status(400).send({
                message: "Something Went Wrong",
                status: false,
                error: error,
            });
        }

    },


    removeCart: async (req, res) => {
        try {
            let removeCart = await customerModel.findOneAndUpdate(
                {
                    email: req.body.email,
                },
                {
                    $unset: {

                        cartProductDetails: req.body.cartProductDetails

                    },
                    $set: {
                        isCartProductDetails: "0",

                    },
                },
                { new: true }
            )

            if (!removeCart) {
                return res.status(400).send({
                    message: "No Record Found ",
                    status: false,
                });
            } else {
                return res.status(200).send({
                    message: "Product Remove from your Cart",
                    status: true,
                    data: removeCart,
                });
            }

        } catch (error) {
            console.log("error", error);
            return res.status(400).send({
                message: "Something Went Wrong",
                status: false,
                error: error,
            });
        }
    }
}


try {
    function sendEmail(num, email, firstName) {
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

        readHTMLFile(process.env.template_path_verfication, function (err, html) {
            var template = handlebars.compile(html);
            var replacements = {
                otp: `${num}`,
                firstName: `${firstName}`
            };
            var htmlToSend = template(replacements);
            var mailOptions = {
                from: process.env.USEREMAIL,
                to: email,
                subject: "Dharstec ✔",
                html: htmlToSend
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
                }
            });
        });
    }
} catch (error) {
    console.log('errrrr', error)
}


async function whatApp(email) {
    // var to = phoneNumber
    // var body = "buying your product in your cart list"
    // const response = await api.sendChatMessage(to, body);
    // console.log(response)
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
    var mailOptions = {
        from: process.env.USEREMAIL,
        to: email,
        subject: "Product in your cart !!!!!!!",
        text: "your Product add into cart go to purachase the product"
        // html: htmlToSend
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
        }
    });
}


// var SibApiV3Sdk = require('sib-api-v3-sdk');
// var defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
// var apiKey = defaultClient.authentications['api-key'];
// apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

// Uncomment below two lines to configure authorization using: partner-key
// var partnerKey = defaultClient.authentications['partner-key'];
// partnerKey.apiKey = 'YOUR API KEY';

// var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email

// sendSmtpEmail = {
//     from: process.env.USEREMAIL,
//     to: email,
//     subject: "Dharstec ✔",
//     html: htmlToSend
// };

// apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
//   console.log('API called successfully. Returned data: ' + data);
// }, function(error) {
//   console.error(error);
// });


// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
// const accountSid = "ACe5fdb2752c9eb06f028263a1b2431d9c";
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require("twilio")(accountSid, authToken);

// client.messages
//   .create({ body: "Hello from Twilio", from: "", to: "+919940537528" })
//   .then(message => console.log(message.sid));