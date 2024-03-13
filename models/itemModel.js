const mongoose=require('mongoose');
const itemSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Item must have a name'],
        unique:[true,'You already have item with the same name']
    },
    description:{
        type:String,
    },
    image:{
        type:String,
        required:[true,'Please Enter  an Image'],
       
    },
    category:{
        type: mongoose.Schema.ObjectId, //population data
        ref: 'Category',
        required: [true, 'Choose Your Category'],
    }
},
{
    //timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  })

  itemSchema.pre(/^find/, function (next) {
    this.find().populate({
        path: 'category',
        select: 'title ',
       
      })

    next();
  })

  const Item=mongoose.model('Item',itemSchema)

  module.exports=Item;