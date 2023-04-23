const marketingModel = require('../models/marketingModels');
const fs = require('fs')
const path = require("path");
const base64 = require('base-64');
module.exports = {
    createMarketing: async (req, res) => {
        console.log("reqest", req.file);
        // imageArray = []
        // const fileName = req.files.map((img => {



        // if (!img.originalname.match(/\.(jpg|jpeg|png)$/)) {
        //     console.log('Please upload a valid image file');
        //         // return cb(new Error('Please upload a valid image file'))
        //     }


        //     console.log("img.originalname",img.originalname);
        //     if(img.originalname.includes('.jpg','.png','.jpeg')){ // cap JPG
        //       imageArray.push(img.filename)
        //     }
        //   }
        //     ));
        const fileName = req?.file?.filename
        console.log("fileName", fileName);
        try {
            // let newMarketing = new marketingModel(req.body)
            let newMarketing = new marketingModel({
                campanignTitle: req.body.campanignTitle,
                yourContent: req.body.yourContent,
                targetCustomer: req.body.targetCustomer,
                sendVia: req.body.sendVia,
                addMedia: fileName,
            })
            console.log("newMarketing", newMarketing);

            let createMarketing = await newMarketing.save();
            console.log("createMarketing", createMarketing);
            return res.status(200).send({
                message: "New Marketing Created Successfully",
                status: true,
                data: newMarketing
            })
        } catch (error) {
            console.log("errror", error)
            return res.status(400).send({
                message: "Please Enter All Marketing Details",
                status: false
            })
        }
    },
    getMarketing: async (req, res) => {
        try {
            let getMarketing = await marketingModel.find({});
            if (!getMarketing) {
                return res.status(400).send({
                    message: "No Record Found",
                    status: false,
                });
            } else {
                return res.status(200).send({
                    message: "Get All Marketing",
                    status: true,
                    data: getMarketing,
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
    getOneMarketing: async (req, res) => {
        try {
            let getOneMarketing = await marketingModel.findOne({ _id: req.body._id, });
            if (!getOneMarketing) {
                return res.status(400).send({
                    message: "No Record Found",
                    status: false,
                });
            } else {
                return res.status(200).send({
                    message: "Get One Marketing",
                    status: true,
                    data: getOneMarketing,
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
    updateMarketing: async (req, res) => {
        try {
            let updateMarketing = await marketingModel.findOneAndUpdate(
                {
                    _id: req.body._id,
                },
                {
                    $set: req.body,
                },
                { new: true }
            );

            if (!updateMarketing) {
                return res.status(400).send({
                    message: "No Record Found",
                    status: false,
                });
            } else {
                return res.status(200).send({
                    message: "Updated Marketing Successfully",
                    status: true,
                    data: updateMarketing,
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
    deleteMarketing: async (req, res) => {
        try {
            let deleteMarketing = await marketingModel.findByIdAndRemove(
                {
                    _id: req.params._id,
                },
            );
            if (!deleteMarketing) {
                return res.status(400).send({
                    message: "No Record Found",
                    status: false,
                });
            } else {
                console.log("deleteMarketing", deleteMarketing);
                console.log("data", deleteMarketing);
                return res.status(200).send({
                    message: "Delete Marketing Successfully",
                    status: true,
                    data: deleteMarketing,
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
    }
}