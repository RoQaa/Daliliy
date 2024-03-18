const multer=require('multer')
const sharp=require('sharp')
const Category=require('../models/categoryModel')
const Item =require('../models/itemModel')
const { catchAsync } = require('../utils/catchAsync');
const AppError = require('../utils/appError');

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
  
  exports.uploadCatPhoto = upload.single('image');
  
  //resize midlleWare
  exports.resizeCatPhoto = catchAsync(async (req, res, next) => {
    if (!req.file) return next();
  
    req.file.filename = `cat-${req.params.id}-${Date.now()}.jpeg`;
  
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/cats/${req.file.filename}`);
  
    next();
  });
  



exports.getCategories=catchAsync(async(req,res,next)=>{

    const cats= await Category.find();
    if(!cats){
        return next(new AppError("Data n't found",404));
    }
    res.status(200).json({
        status:true,
        data:cats
    })
})


exports.addCategory=catchAsync(async(req,res,next)=>{
    
    const data = await Category.create(req.body);
        res.status(201).json({
            status:true,
            message:"Category Created Successfully",
            data
        })

})


exports.updateCategory=catchAsync(async(req,res,next)=>{
if(req.file) req.body.image=req.file.filename
const data = await Category.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
if(!data){
    return next(new AppError(`Category not found`,404))
  }
  res.status(200).json({
    status:true,
    message:"Category Updated Successfully",
    data
  })
})


exports.deleteCategory=catchAsync(async(req,res,next)=>{
  const catId=req.params.id;
  await Item.deleteMany({category:catId})
  
 const cat= await Category.findByIdAndDelete(catId)
  if(!cat){
    return next(new AppError(`Category not found`,404))

  }
  res.status(200).json({
    status:true,
    message:"Category and her Items deleted Successfully"
  })
})