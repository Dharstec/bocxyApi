
const orderModel = require("../models/orderModels");
const inventoryModel = require("../models/inventoryModels");
const Razorpay = require('razorpay');  
  
// This razorpayInstance will be used to 
// access any resource from razorpay 
const razorpayInstance = new Razorpay({ 
  
    // Replace with your key_id 
    key_id: "rzp_test_glYMxgnZfEKPlU", 
  
    // Replace with your key_secret 
    key_secret: "RJPbpjj7V3iJlweuvlVWl5BM" 
}); 

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

    paymentIntegration(data,receiptId) {
      return new Promise(async (resolve, reject) => {
          try {
             // STEP 1: 
             let totalAmount = 0
             let amount = data.amount
             let currency = data.currency
             let receipt = receiptId
            //  let notes = data.notes
            //  data.orders.map(e=>{

            //  })     
   
            // STEP 2:  
            // console.log("razorpayInstance",razorpayInstance)   
            razorpayInstance.orders.create({amount, currency, receipt},  
                (err, order)=>{ 
                  
                  //STEP 3 & 4:  
                  if(!err) {
                    console.log("order",order)
                    resolve(order)
                  }
                
                    // res.json(order) 
                  else{
                    console.log("errror   order",err)
                    resolve('PAYMENT_FAILED')
                  }
                 
                    // res.send(err); 
                } 
            ) 
            
          } catch (error) {
              reject(error.message || error);
          }
      });
  
  },
   
}
