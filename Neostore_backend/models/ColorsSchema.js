const mongoose=require('mongoose');
const ColorsSchema=new mongoose.Schema({
    color_name:{
        type:String,
        required:true,
        unique:true
    },
    color_code:{
      type:String,
      required:true,
      unique:true
    },
})
module.exports=mongoose.model('colors',ColorsSchema);