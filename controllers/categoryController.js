const Category=require('../models/categoryModel')
const { catchAsync } = require('../utils/catchAsync');
const AppError = require('../utils/appError');



exports.getCategories=catchAsync(async(req,res,next)=>{

    const cats= await Category.find();
    if(!cats||cats.length===0){
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