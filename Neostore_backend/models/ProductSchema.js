const mongoose=require('mongoose');
const ProductSchema=new mongoose.Schema({
    product_name:{
        type:String,
        required:true,
    },
    product_image:{
      type:String,
      required:true
    },
    product_descrip: { 
        type: String, 
       
    },
    product_rating: {
        type: Number, 
        
    },
    product_cost:{
        type:Number,
        
    },
    product_stock: {
        type: Number, 
        
    },
    product_material: {
        type: String, 
        
    },
    color_id:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"colors"
    },
    category_id:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"categories"
    }
})
module.exports=mongoose.model('products',ProductSchema);