
const orderModel = require("../models/orderModels");
const inventoryModel = require("../models/inventoryModels");

module.exports = {
    orderQuantityValidation(data) {
        return new Promise(async (resolve, reject) => {
            try {
              let temp =[]
              let i =0
              data.orders.forEach(async e=>{
                let getData= await inventoryModel.findOne({productId: e.productId, storeId:data.storeId})
                .exec(async function (err, result) {
                  if (err) {
                    console.log("Error in getting data in inventory model", err);
                }else{
                    // console.log("result",result)
                    if(result){
                      if(result.quantity<e.quantity){
                        temp.push(result)
                      }
                      i++
                    //   console.log(i,"length",data.orders.length)
                      if(data.orders.length==i){
                        // console.log("result",temp)
                        resolve(temp)
                      }
                    }else{
                      resolve('Product_is_not_found')
                    }
                
                }})
               })
              
            } catch (error) {
                reject(error.message || error);
            }
        });
    
    },
   
}
