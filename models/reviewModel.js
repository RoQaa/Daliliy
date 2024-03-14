const mongoose =require('mongoose')
const reviewSchema = mongoose.Schema({
    description:{
        type:String,
        required:[true,'Enter your review']
    },
    user:{
        type: mongoose.Schema.ObjectId, //population data
        ref: 'User',
        required: [true, 'need token'],
    },
    item:{
        type: mongoose.Schema.ObjectId, //population data
        ref: 'Item',
        required: [true, "Item n't found"],
    }
   
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  })



  reviewSchema.pre(/^find/, function (next) {
    this.find().populate({
        path: 'user',
        select: 'name ',
        
       
      }).populate({
        path: 'item',
        select: 'name',
      })

    next();

  })

  const Review=mongoose.model('Review',reviewSchema)
  module.exports=Review;
  