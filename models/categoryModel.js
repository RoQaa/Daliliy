const mongoose= require('mongoose');
const categorySchema=mongoose.Schema({
    title:{
        type:String,
        required:[true,'Please Enter Category title'],
        trim:true,
        unique:[true,'You already have Category with the same name']
    },
    image:{
        type:String,
        required:[true,'Please Enter Image'],
       
    }
})


const Category=mongoose.model('Category',categorySchema);

module.exports=Category