const mongoose=require('mongoose');
const CategoriesSchema=new mongoose.Schema({
    category_name:{
        type:String,
        required:true,
        unique:true
    },
    created_at:{
      type:Date,
      default:Date.now
    }
})
module.exports=mongoose.model('categories',CategoriesSchema);