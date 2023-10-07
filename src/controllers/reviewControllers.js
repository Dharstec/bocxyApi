const reviewModels = require('../models/reviewModels');
var moment = require('moment');

// var validDateTill= moment().add(10, 'days').calendar(); 
var createdDate = moment().format()
module.exports = {
    createReview: async (req, res) => {
        try {
            let newReview = new reviewModels({
                reviewTitle: req.body.reviewTitle,
                reviewDescription: req.body.reviewDescription,
                storeId: req.body.storeId,
                orderId: req.body.orderId,
                productId: req.body.productId,
                customerId: req.body.customerId,
                ratings: req.body.ratings,
            });
            let createReview = await newReview.save();
            return res.status(200).send({
                message: "Review Created Successfully",
                status: true,
                data: createReview
            })
        } catch (error) {
            console.log("errror", error)
            return res.status(400).send({
                message: "Please Enter All Review Details",
                status: false
            })
        }
    },
    getReviewsByProduct: async (req, res) => {
        try {
            let productId=req.params.productId
            let getReview = await reviewModels.find({ productId:productId });
            if (!getReview) {
                return res.status(400).send({
                    message: "No Record Found",
                    status: false,
                });
            } else {
                let ratings=0
                getReview.forEach(e=>{
                   ratings+=e.ratings
                })
                let overallRatings = (ratings)/ getReview.length
                let overallpercentage = (overallRatings * 100)/ 5
                return res.status(200).send({
                    message: "Get All Reviews based on product",
                    status: true,
                    data: {
                        "allReviews":getReview,
                        "overallRatings":overallRatings,
                        "overallpercentage":overallpercentage
                    },
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
    getReviewsByOrder: async (req, res) => {
        try {
            let orderId=req.params.orderId
            let getReview = await reviewModels.find({ orderId:orderId  });
            if (!getReview) {
                return res.status(400).send({
                    message: "No Record Found",
                    status: false,
                });
            } else {
                return res.status(200).send({
                    message: "Get All Reviews based on order",
                    status: true,
                    data: getReview,
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
    deleteReview: async (req, res) => {
        console.log(req.params._id)
        try {
            let deleteReview = await ReviewModels.findByIdAndRemove(
                {
                    _id: req.params._id,
                },
            );
            console.log("deleteReview", deleteReview)

            if (!deleteReview) {
                return res.status(400).send({
                    message: "No Record Found",
                    status: false,
                });
            } else {
                console.log("deleteReview", deleteReview);
                console.log("data", deleteReview);
                return res.status(200).send({
                    message: "Delete Review Successfully",
                    status: true,
                    data: deleteReview,
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
    updateReview: async (req, res) => {
        try {
            let updateReview = await ReviewModels.findOneAndUpdate(
                {
                    _id: req.body._id,
                },
                {
                    $set: req.body,
                },
                { new: true }
            );

            if (!updateReview) {
                return res.status(400).send({
                    message: "No Record Found",
                    status: false,
                });
            } else {
                return res.status(200).send({
                    message: "Updated Marketing Successfully",
                    status: true,
                    data: updateReview,
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

    findReview: async (req, res) => {
        console.log(req.params)
        try {
            let findId = await ReviewModels.findOne({ _id: req.params._id })

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

}