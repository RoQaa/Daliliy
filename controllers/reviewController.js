const Review = require('../models/reviewModel')
//const User = require('../models/userModel')
const { catchAsync } = require('../utils/catchAsync');
const AppError = require('../utils/appError');



exports.getReviews=(catchAsync(async (req, res, next) => {
    const data = await Review.find();

    if (!data) {
        return new next(new AppError(`data n't found`, 404))
    }

    res.status(200).json({
        status: true,
        message: "data returned",
        data
    })



}))

exports.addReviews=(catchAsync(async(req,res,next)=>{
    const user = req.user._id;
    if(!req.body){
        return next(new AppError(`data n't found`,404))
    }
        req.body.user=user
        
        await Review.create(req.body)
        res.status(200).json({
            status:true,
            message:"your review submitted"
        })
}))

