const mongoose=require('mongoose');

var otpSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    code:{
        type:String,
        required:true
    },
    expireIn:{
        type:Number,
    }
},{
     timestamps:true
})
module.exports=mongoose.model("otp",otpSchema); 