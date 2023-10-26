const productModel = require("../models/productModels");
const inventoryModel = require("../models/inventoryModels");
const orderModel = require("../models/orderModels");
const customerModel = require("../models/customerModels");
const adminModel = require("../models/adminModels");
const filterModel = require("../models/filterModels");
const _ = require("lodash"); 

module.exports = {
  getfiltersList: async (req, res) => {
    try {
      let getAllFilterList = await filterModel.find();
      if (!getAllFilterList) {
        return res.status(400).send({
          message: "No Record Found",
          status: false,
        });
      } else {
        return res.status(200).send({
          message: "Get all filter list",
          status: true,
          data: getAllFilterList[0],
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