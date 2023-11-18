const productModel = require("../models/productModels");
const inventoryModel = require("../models/inventoryModels");
const orderModel = require("../models/orderModels");
const customerModel = require("../models/customerModels");
const adminModel = require("../models/adminModels");
const _ = require("lodash");
const geolib = require('geolib');

module.exports = {
  createProduct: async (req, res) => {
    // imageArray = []
    // videoArray = []
    // req?.files && req.files.map((img => {
    //   console.log("img.originalname", img.originalname);
    //   if (`'${img.originalname}'`.includes('.jpg', '.png', '.jpeg')) { // cap JPG
    //     console.log("img.originalname", img.originalname, `'${img.originalname}'`.includes('.jpg', '.png', '.jpeg', '.webp'));
    //     imageArray.push(`${process.env.URLLIVE}/${img.filename}`)
    //   } else if (`'${img.originalname}'`.includes('.mp4')) {
    //     videoArray.push(`${process.env.URLLIVE}/${img.filename}`)
    //   }
    // }
    // ));
    try {
      let newproduct = new productModel({
        superAdminId:req.body.superAdminId,
        storeId:req.body.storeId,
        productImages: req.body.imageArray,
        productVideos: req.body.videoArray,
        productName: req.body.productName,
        discountPrice: req.body.discountPrice,
        actualPrice: req.body.actualPrice,
        description: req.body.description,
        category: req.body.category,
        gender: req.body.gender,
        brand: req.body.brand,
        formulation: req.body.formulation,
        avgCustomerRating: req.body.avgCustomerRating,
        collections: req.body.collections,
        subCategory:req.body.subCategory,
        type:req.body.type,
        comparedPrice:req.body.comparedPrice,
        productDetails:req.body.productDetails,
        gift: req.body.gift,
        personalised: req.body.personalised,
        latest: req.body.latest,
        viewedBy: req?.body?.viewedBy,
        noOfViews: req?.body?.noOfViews,
        noOfSales: req?.body?.noOfSales,
        productAge: req?.body?.productAge,
        referenceId: req.body.referenceId,
        barcode: req.body.barcode,
      })
      console.log("newproduct", newproduct);
      let createProduct = await newproduct.save();
      console.log("createProduct", createProduct);
      return res.status(200).send({
        message: "Product Created Successfully",
        status: true,
        data: createProduct,
      });

    } catch (err) {
      console.log("error", err);
      return res.status(400).send({
        message: "Please Enter All Details",
        status: false,
      });
    }
  },
  createProductImage: async (req, res) => {
    imageArray = []
    videoArray = []
    req.files.map((img) => {
      console.log("img.originalname", img.originalname);
      const fileExtension = img.originalname.split('.').pop().toLowerCase();
      if (['jpg', 'png', 'jpeg', 'webp'].includes(fileExtension)) {
        console.log("Image", `${process.env.URLLIVE}/${img.filename}`);
        imageArray.push(`${process.env.URLLIVE}/${img.filename}`);
      } else if (fileExtension === 'mp4') {
        console.log("Video", `${process.env.URLLIVE}/${img.filename}`);
        videoArray.push(`${process.env.URLLIVE}/${img.filename}`);
      } else {
        console.log("Unsupported file type:", img.originalname);
      }
    });
    try {
      return res.status(200).send({
        message: "Image Added Successfully",
        status: true,
        data: {
          imageArray: imageArray,
          videoArray: videoArray
        },
      });

    } catch (err) {
      console.log("error", err);
      return res.status(400).send({
        message: "Please Check Admin",
        status: false,
      });
    }
  },
  getProduct: async (req, res) => {
    try {
      let getProduct = await productModel.find({ superAdminId: req.params.superAdminId});
       console.log(getProduct)
      if (!getProduct) {
        return res.status(400).send({
          message: "No Record Found",
          status: false,
        });
      } else {
        return res.status(200).send({
          message: "Get All product",
          status: true,
          data: getProduct,
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
  getProductsByCoordinates: async (req, res) => {
    try {
      const { latitude, longitude } = req.params;

      const co_ordinates  = [parseFloat(longitude), parseFloat(latitude)];
      console.log(co_ordinates)
     const admins= await adminModel.find({
           co_ordinates: {
             $near: {
               $geometry: {
                 type: "Point",
                 coordinates: co_ordinates
               },
               $maxDistance: 1000 // Optional: Adjust the max distance in meters
             }
        }
         })

      console.log(admins)

      // const test = await adminModel.find({
      //      co_ordinates: {
      //        $near: {
      //          $geometry: {
      //            type: "Point",
      //            coordinates: [88.569, 55.6525]
      //          // coordinates: [80.2452305, 13.0582997]
      //          },
      //          $maxDistance: 1000
      //        }
      //      }
      //    })

      //    console.log(test)

      if (admins.length === 0) {
        return res.status(400).send({
          message: 'No Admins Found for the given coordinates',
          status: false,
        });
      }

      const superAdminIds = admins.map((admin) => admin.super_admin_id);


      let products = await productModel.find({ superAdminId: { $in: superAdminIds } });

      if (products.length === 0) {
        return res.status(400).send({
          message: 'No Products Found for the given coordinates',
          status: false,
        });
      } else {
        return res.status(200).send({
          message: 'Get Products by Coordinates',
          status: true,
          data: products,
        });
      }
    } catch (error) {
      return res.status(400).send({
        message: 'Something Went Wrong',
        status: false,
        error: error,
      });
    }
  },
  getProductDetails: async (req, res) => {
    const { superAdminId } = req.params;

    try {
      // Find products based on superAdminId
      const products = await productModel.find({ superAdminId });


      // Extract unique values for category, brand, and formulation
      const categories = [...new Set(products.map(product => product.category).flat())].filter(Boolean);
      const brands = [...new Set(products.map(product => product.brand).flat())].filter(Boolean);
      const formulations = [...new Set(products.map(product => product.formulation).flat())].filter(Boolean);


      // Return the result
      res.status(200).json({
        categories,
        brands,
        formulations,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  getCustomersProduct: async (req, res) => {
    try {
      let getProduct = await productModel.find({});
      let getInventoryProduct = await inventoryModel.find({});
      let getAllStore = await adminModel.find({ role_flag: "STORE_ADMIN" })
      let availableProduct=[]

      getProduct.map(e=>{
        let storeData=[]
        getInventoryProduct.map(x=>{
          if(e._id==x.productId ){
           let store =getAllStore.filter(exp=>exp._id == x.storeId)
            storeData.push({
              quantity:x.quantity,
              storeId:x.storeId,
              co_ordinates:store.length >0 ? store[0].co_ordinates : ''
            })
            let obj={
              viewedBy: e.viewedBy,
              _id:  e._id,
              superAdminId:  e.superAdminId,
              productName: e.productName,
              productImages:  e.productImages,
              productVideos:  e.productVideos,
              discountPrice:  e.discountPrice,
              actualPrice:  e.actualPrice,
              description:  e.description,
              category:  e.category,
              brand:  e.brand,
              formulation:  e.formulation,
              avgCustomerRating:  e.avgCustomerRating,
              referenceId:  e.referenceId,
              gift: e.gift,
              personalised:  e.personalised,
              latest:  e.latest,
              collections:  e.collections,
              noOfViews:  e.noOfViews,
              noOfSales:  e.noOfSales,
              productAge:  e.productAge,
              barcode:  e.barcode,
              storeData:storeData
            }
            availableProduct.push(obj)
          }
        })
      })

      if (!availableProduct.length) {
        return res.status(400).send({
          message: "No Record Found",
          status: false,
        });
      } else {
        let finalRes = _.uniqBy(availableProduct, '_id');
        let getAllStore = await adminModel.find({ role_flag: "STORE_ADMIN" })
        console.log('ssss')
        if(getAllStore.length){
          finalRes.map((e,i)=>{
            e['storeData'].map(y=>{
              getAllStore.forEach(x=>{
                if(y.storeId==x._id){
                  finalRes[i]['storeData']["co_ordinates"]=x.co_ordinates
                  console.log('ssssssssssssss')
                }
            })

            })
            if(finalRes.length-1 == i){
              return res.status(200).send({
                message: "Get All product",
                status: true,
                data: finalRes,
              });
            }
          })

        }else{
          return res.status(200).send({
            message: "Get All product",
            status: true,
            data: [],
          });
        }

      }
    } catch (error) {
      return res.status(400).send({
        message: "Something Went Wrong",
        status: false,
        error: error,
      });
    }
  },
  getDashboard: async (req, res) => {
    try {

      let customer = await customerModel.find({});
      let order = await orderModel.find({});
      let datas = await Promise.all([customer, order]).then((values) => {
        return values
      });
      if (!datas) {
        return res.status(400).send({
          message: "No Record Found",
          status: false,
        });
      } else {
        return res.status(200).send({
          message: "Get All product",
          status: true,
          data: [{ totalRecords: 0, title: 'Sales', icon: 'point_of_sale', rate: 0, ratio: 0 },
          { totalRecords: datas[1].length, title: 'Orders', icon: 'local_mall', rate: 0, ratio: 0 },
          { totalRecords: 0, title: 'Visitor', icon: 'person', rate: 0, ratio: 0 },
          { totalRecords: datas[0].length, title: 'Customers', icon: 'groups', rate: 0, ratio: 0 }]
        });
      }
    } catch (error) {
      console.log(error)
      return res.status(400).send({
        message: "Something Went Wrong",
        status: false,
        error: error,
      });
    }
  },
  getOneProduct: async (req, res) => {
    try {
      let getOneProduct = await productModel.findOne({ _id: req.params._id });
      if (!getOneProduct) {
        return res.status(400).send({
          message: "No Record Found",
          status: false,
        });
      } else {
        return res.status(200).send({
          message: "Get One product",
          status: true,
          data: getOneProduct,
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
  gettypeProduct: async (req, res) => {
    try {
      let getOneProduct = await productModel.findOne({
        type: req.body.type,
      });
      if (!getOneProduct) {
        return res.status(400).send({
          message: "No Record Found",
          status: false,
        });
      } else {
        return res.status(200).send({
          message: "Get One product",
          status: true,
          data: getOneProduct,
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
  updateProduct: async (req, res) => {
    try {
      let updateProduct = await productModel.findOneAndUpdate(
        {
          _id: req.body._id,
        },
        {
          $set: req.body,
        },
        { new: true }
      ).exec(function (err, reuslt) {
        if (err) {
            console.log("Error in updating data in product model", err);
        }
        else {
            if (reuslt) {
              let updateInventory = inventoryModel.updateMany(
                {
                  productId: req.body._id,
                },
                {
                  $set: {
                          "productImages":  req.body.productImages,
                          "productVideos":  req.body.productVideos,
                          "productName":  req.body.productName,
                          "discountPrice":  req.body.discountPrice,
                          "actualPrice":  req.body.actualPrice,
                          "description":   req.body.description,
                          "category":   req.body.category,
                          "brand":  req.body.brand,
                          "formulation":  req.body.formulation,
                          "avgCustomerRating":  req.body.avgCustomerRating ,
                          "collections":  req.body.collections,
                          "gift":  req.body.gift,
                          "personalised":   req.body.personalised,
                          "latest":   req.body.latest,
                          "viewedBy":   req.body.viewedBy,
                          "noOfViews":   req.body.noOfViews,
                          "noOfSales":   req.body.noOfSales,
                          "productAge":   req.body.productAge,
                          "referenceId":  req.body.referenceId,
                          "barcode":   req.body.barcode,
                          "subCategory":req.body.subCategory,
                          "type":req.body.type,
                          "comparedPrice":req.body.comparedPrice,
                          "productDetails":req.body.productDetails,
                  },
                },
                { new: true }
              )
              if(!updateInventory){
                return res.status(400).send({
                  message: "No Record Found in inventory",
                  status: false,
                });
              }else{
                return res.status(200).send({
                  message: "Update Product Successfully",
                  status: true,
                  data: updateProduct,
                });
              }

            }else{
              return res.status(400).send({
                message: "No Record Found",
                status: false,
              });
            }
          }
        })


    } catch (error) {
      return res.status(400).send({
        message: "Something Went Wrong",
        status: false,
        error: error,
      });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      let deleteProduct = await productModel.findOneAndDelete(
        {
          _id: req.params._id  // _id:req.body._id is not working in frontend
        },
      );
      console.log("deleteProduct-1", deleteProduct._id)

      if (!deleteProduct) {
        return res.status(400).send({
          message: "No Record Found",
          status: false,
        });
      } else {
        // console.log("deleteProduct", deleteProduct);
        // console.log("data", deleteProduct);
        let deleteInventoryProduct =  false
        // await inventoryModel.remove(
        //   {
        //     productId: req.params._id  // _id:req.body._id is not working in frontend
        //   },
        // );
        if(!deleteInventoryProduct){
          return res.status(200).send({
            message: "Deleted in product Successfully.",
            status: true,
          });
        }else{
          return res.status(200).send({
            message: "Deleted in Product and inventory Successfully",
            status: true,
          });
        }


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