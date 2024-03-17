const multer=require('multer')
const sharp=require('sharp')
const { catchAsync } = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User=require('../models/userModel');
const { __awaiter } = require('tslib');

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
      if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
  };

 /*const multerStorage = multer.diskStorage({
   destination: (req, file, cb) => {
     cb(null, 'public/img/users');
   },
   filename: (req, file, cb) => {
     const ext = file.mimetype.split('/')[1];
     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
   }
 });


*/

 const multerFilter = (req, file, cb) => {
    
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const multerStorage = multer.memoryStorage();



const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('profileImage');

//resize midlleWare
exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

exports.updateUser=catchAsync(async(req,res,next)=>{
    let id;
    //Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(req.body, 'name');
    if (req.file) filteredBody.profileImage = req.file.filename;

      
      // 3) Update user document
      if(req.params.id){ id=req.params.id}
      else{
        id=req.user.id
      }
      
  const updatedUser = await User.findByIdAndUpdate(id, filteredBody, {
    new: true,
    runValidators: true
  });

   res.status(200).json({
    status:true,
    data:updatedUser
   })

})



exports.getUsers=catchAsync(async(req,res,next)=>{
  const data = await User.find();
  if(!data){
    return next(new AppError("Users not found",404))
  }
  res.status(200).json({
    status:true,
    length:data.length,
    data

  })
})
exports.deleteUser=catchAsync(async(req,res,next)=>{
  await User.findByIdAndDelete(req.params.id)
  res.status(200).json({
    status:true,
    message:"you Delete this User"
  })
})


exports.Active=catchAsync(async(req,res,next)=>{
  await User.findByIdAndUpdate(req.params.id,{isActive:req.body.active},{new:true,runValidators:true})
  res.status(200).json({
    status:true,
    message:"you updated this User"
  })
})