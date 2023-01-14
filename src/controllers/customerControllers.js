const customerModel = require("../models/customerModels");

module.exports = {
    createCustomer: async (req, res) => {
        try {
            let newCustomer = new customerModel(req.body)
            console.log("newCustomer", newCustomer);
            let createCustomer = await newCustomer.save();
            console.log("createCustomer", createCustomer);
            return res.status(200).send({
                message: "Customer Created Successfully",
                status: true,
                data: createCustomer,
            });

        } catch (error) {
            console.log("error", error);
            return res.status(400).send({
                message: "Please Enter  All Customer Details",
                status: false,
            });
        }
    },
    getAllCustomer: async (req, res) => {
        try {
            let getCustomer = await customerModel.find({}).populate('wishlistProductDetails')

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
            let getOneCustomer = await customerModel.findOne({ customerId: req.body.customerId });
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
                    customerId: req.body.customerId,
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
                    customerId: req.body.customerId,
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