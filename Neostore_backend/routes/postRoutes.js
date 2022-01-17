const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

//dbconnection 
const connectDB = require('../config/db');
connectDB;
//end

const login = require('../controller/usersController');
const register = require('../controller/usersController');
const socialuser = require('../controller/usersController');
const emailSend = require('../controller/usersController');
const changePassword = require('../controller/usersController');

router.post('/login',login.login);
router.post('/register',register.register);
router.post('/socialuser',socialuser.socialuser);
router.post('/email-send',emailSend.emailSend);
router.post('/change-password',changePassword.changePassword);

/* function autenticateToken(req,res,next){
    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1];
    console.log(token)
    if(token==null){
        res.json({"err":1,"msg":"Token not match"})
    }
    else {
        jwt.verify(token,jwtSecret,(err,data)=>{
            if(err){
                res.json({"err":1,"msg":"Token incorrect"})
            }
            else {
                console.log("Match")
                next();
            }
        })
    }
}  */
const ordersmodel = require('../models/OrdersSchema');
const productsmodel = require('../models/ProductSchema');
//const userdata = require('../models/user.model');

router.get("/products", (req, res) => {
    productsmodel.find({}, (err, data) => {
        if (err) throw err;
        res.json({ 'data': data })
    })

}) 

router.get("/fetchproduct", async (req, res) => {
    const PAGE_SIZE = 6;
    const page = parseInt(req.query.page || "0");
    const total = await productsmodel.countDocuments({});
    const products = await productsmodel.find({})
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);
    res.json({
      totalPages: Math.ceil(total / PAGE_SIZE),
      products,
    });
  });


  router.get("/filter",(req,res)=>{
    productsmodel.find()
    .populate(["category_id","color_id"])
    .then(product=>{
        console.log(product);
        res.send(product)
    })
})

  router.get("/singleproduct/:id", (req, res) => {
    let id = req.params.id;
  
    productsmodel
      .findOne({ _id: id })
      .populate("color_id")
      .then((product) => {
        console.log(product);
  
        res.json({
          product: product,
          err: "0",
          image: product.product_image,
        });
      });
  });

  router.get("/singleorder/:id", (req, res) => {
    let id = req.params.id;
  
    ordersmodel.findOne({ _id: id })
      .then((order) => {
        console.log(order);
  
        res.json({
          order: order,
          err: "0",
        });
      });
  });

const registermodel = require('../models/user.model');

router.get('/profile/:email',(req,res)=>{
    let email = req.params.email;
    registermodel.findOne({ email:email },(err,data)=>{
        if(err) res.json({ err : err })
        res.json({ email:data })
    })
})

router.get('/order/:email',(req,res)=>{
    let email = req.params.email;
    ordersmodel.find({ user : email },(err,data)=>{
        if(err){
         res.json({ err : err })
        }
        else{
         res.json({ user : data })
       /*   console.log(user) */
        }
    })
})

router.get("/fetchorders",auth,(req, res) => {
    ordersmodel.find({}, (err, data) => {
        if (err) throw err;
        res.json({ "err":0,'data': data })
    })

})

const credential = require('../cred/env');
const nodemailer = require ("nodemailer");

let mailTransporter = nodemailer.createTransport({
    service : 'gmail',
    port: 587,
    secure: false,
    auth: {
        user: credential.email,
        pass: credential.password,
    }
}); 

router.post("/addorder",(req, res) => {
    
    console.log(req.body.cart)
    let name = [];
    let price=0;
    for (let i = 0; i < req.body.cart.length; i++) 
    {
             price=price+req.body.cart[i].price;
        if (i != (req.body.cart.length - 1)) {
            name.push(req.body.cart[i].name)           
        }
        else if (i = (req.body.cart.length - 1)) {
            name.push(req.body.cart[i].name)
        }
    }
    let ins = new ordersmodel({ name: name, card: req.body.card,price:price,user:req.body.user });
    ins.save((err) => {
        if (err) {
            console.log(err)
            res.send("Already Added")
        }
        else {
            res.send("ok")
        }
    })
    
  let mailDetails = {
        from: 'khurudapurva@gmail.com',
        to: 'khurudapurva@gmail.com',
        subject: 'Your Order Placed!',
        text:'Your Order Placed Successfully. Visit again:)',
        html: `<!DOCTYPE html>
<html>
<head>
<style>
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;

}
</style>
</head>
<body>
<img src="https://cdn.dribbble.com/users/335541/screenshots/7102045/media/5b7237fe7bbfa31531d6e765576f1bc4.jpg"/>
<h1 className="text-success">Your Order Placed Successfully. Please Visit again:)</h1>

<table style="width:60%">
<tr>
<th>Ordered Items</th>
<th>Total Price</th>
</tr>
  <tr>
  <td>${name}</td>
  <td>Rs. ${price}</td>
</tr>
  
</table>
</body>
</html> `
    };

    mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log('Error Occurs');
        } else {
            console.log('Email sent successfully');
        }
    });

}) 

module.exports = router;