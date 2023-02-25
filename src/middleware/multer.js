const multer = require("multer");
// var async = require('async');
// // const path = require("path");
// // // const uploadimg= require('../files')
// // //image upload
// // const storage = multer.diskStorage({
// //     destination: (req, res, cb) => {
// //          cb(null, '../uploads/');
// //     },
// //     filename: (req, file, cb) => {
// //         console.log("file",file);
// //         console.log("cb",cb);
// //         let ext = path.extname(file.originalname);
// //         cb(null,Date.now() + ext);
// //         console.log("ext",ext);
// //         // cb(null,Date.now() + path.extname(file.originalname))
// //         // cb(null, new Date().toISOString() + file.originalname);
// //     }
// // });
// // var upload = multer({
// //     storage:storage,
// //     fileFilter:function(req,file,callback){
// //         if( file.mimetype == "image/png"||file.mimetype == "image/jpg") {
// //             console.log(file);
// //             callback(null,true)
// //         }
// //         else{
// //             console.log("only jpg & pgn file");
// //             callback(null,false)
// //         }
// //     },
// //     limits:{
// //         fileSize:1024 * 1024 *2
// //     }
// // });
// // console.log("fileFilter",upload.fileFilter);

// // module.exports = upload
// // checking file type
// // const fileFilter = (req, file, cb) => {
// //     if (file.mimetype.startsWith('image')) {
// //         cb(null, true);
// //     } else {
// //         cb(new Error('Not an image! Please upload an image.', 400), false);
// //     }
// // };
// // exports.upload = multer({
// //     storage: storage,
// //     limits: {
// //         fileSize: 1024 * 1024 * 6
// //     },
// //     fileFilter: fileFilter
// // });

// // const upload = require('../../uploads/')
// // const storage = multer.diskStorage({
// //     destination:function(req,file,cb){
// //       cb(null,'../uploads/');
// //     },
// //     filename:function(req,file,cb){
// //     //   cb(null, new Date().toISOString().replace(/:/g, '-')+ file.originalname)
// //     cb(null,Date.now() + path.extname(file.originalname))
// //     }
// //   })
// //   const fileFilter = (req, file, cb) => {
// //     // reject a file
// //     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
// //       cb(null, true);
// //     } else {
// //       cb(null, false);
// //     }
// //   };
  
// //   const upload = multer({
// //     storage: storage,
// //     limits: {
// //       fileSize: 1024 * 1024 * 5
// //     },
// //     fileFilter: fileFilter
// //   });


// //   module.exports = upload

// // const multerStorage = multer.memoryStorage()

// // const multerFilter = (req, file, cb) => {
// //   if (file.mimetype.startsWith('image')) {
// //     cb(null, true)
// //   } else {
// //     cb(new AppError('Not an image! Please upload only images', 400), false)
// //   }
// // }

// // const upload = multer({
// //   storage: multerStorage,
// //   fileFilter: multerFilter,
// // })
// const upload = multer({
//     storage: multer.diskStorage({
//       destination:function(req,file,cb){
//               cb(null,'public/img/users/');
//             },
//       filename: (req, file, cb) => {
//         const fileName = _id + path.extname(file.originalname);
//         return cb(null, fileName);
//       },
//     }),
//   });
// exports.uploadPhoto = upload.single('photo')

// exports.resizeUserPhoto = (async (req, res, next) => {
//   if (!req.file) return next()
//   req.file.filename = `user-${req.user._id}-${Date.now()}.jpeg`
//   console.log(req.file.filename);

//   await sharp(req.file.buffer)
//     .resize(500, 500)
//     .toFormat('jpeg')
//     .jpeg({ quality: 90 })
//     .toFile(`public/img/users/${req.file.filename}`)

//   next()
// })


exports.uploadSingleImage = (destination) => {
    const upload = multer({
      storage: multer.diskStorage({
        destination,
        filename: (req, file, cb) => {
          const fileName = "filename" + path.extname(file.originalname);
          return cb(null, fileName);
        },
      }),
    });
  
    return upload;
  };
  