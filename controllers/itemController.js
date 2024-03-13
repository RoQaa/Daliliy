const Item = require('../models/itemModel')
const Category = require('../models/categoryModel')
const { catchAsync } = require('../utils/catchAsync');
const AppError = require('../utils/appError');


exports.getItems = catchAsync(async (req, res, next) => {

    const data = await Item.aggregate([



        {
            $lookup: {
                from: Category.collection.name,
                localField: 'category',
                foreignField: '_id',
                pipeline: [
                    {
                        $project: {
                            title: 1
                        },
                    },
                    {
                        $match:{
                            title:req.body.title
                        }
                    }
               
                ],
                as: 'category',
            },
        },
     

        {
            $project: {
                __v: 0,
            },
        },
    ]);
     if(!data||data.length===0){
         return next(new AppError(`data n't found`,404));
     }
    res.status(200).json({
        status: true,
        data
    })

})



exports.addItem = catchAsync(async (req, res, next) => {

    const data = await Item.create(req.body);

    res.status(200).json({
        status: true,
        data
    })

})



