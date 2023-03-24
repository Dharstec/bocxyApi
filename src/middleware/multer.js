// const multer = require("multer");
// const path = require("path");
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

// url/filepath
  
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


// exports.uploadSingleImage = (destination) => {
//   console.log("multer");
//     const upload = multer({
//       storage: multer.diskStorage({
//         destination,
//         filename: (req, file, cb) => {
//           console.log("file",file);
//           const fileName = "filename" + path.extname(file.originalname);
//           console.log("filename",fileName);
//           console.log("cb",cb);
//           return cb(null, fileName);
//         },
//       }),
//     });
//     console.log("upload",upload);
//     return upload;
//   };
// const storage = multer.diskStorage({
//   destination:'upload',
//   filename:(req,file,cb)=>{
//     console.log("file",file);
//     // return cb(null, new Date().toISOString()+ "-" + file.originalname)
//     return cb(null, `${file.filename}_${Date.now()}${path.extname(file.originalname)}`)
//   }
// })

// const Fileupload = multer({
//   storage:storage
// })

// module.exports = Fileupload



// const fileStorage = multer.diskStorage({
//   destination:(req,file,cb)=>{
//     console.log("cb",cb);
//     cb(null, './img');
//   },
//   filename:(req,file,cb)=>{
//     console.log("file ****" ,file);
// cb(null,file.filename + '-' + file.originalname)
//   }
// })


// const Fileupload = multer({
//   storage:fileStorage
// })

// module.exports = Fileupload




//   url/filepath
// http://localhost:8000/filename.jpg
// http://localhost:8000/filename.mp4
// {
//     fieldname: 'image',
//     originalname: 'video-1.mp4',
//     encoding: '7bit',
//     mimetype: 'video/mp4',
//     destination: './public',
//     filename: 'filename.mp4',
//     path: 'public\\filename.mp4',
//     size: 2920548
//   }
  
// photos :1mb
// videos: 5mb less than  30sec




const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});
const multerFilter = (req, file, cb) => {
  // if (file.mimetype) {
  //   cb(null, true);
  // } else {
  //   cb(new Error("Not a PDF File!!"), false);
  // }

  const fileSize = parseInt(req.headers["content-length"])

  if ((file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "application/octet-stream") && fileSize <= 1000000) {
      cb(null, true)
  } else if (file.mimetype === "video/mp4" && fileSize <= 5e+6) {
      cb(null, true)
  } else {
    cb(new Error("file size img 1mb & vi 5mb only!!"), false);
      // cb(null, false)
  }
};
const uploadData = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
