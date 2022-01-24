const bcrypt = require('bcryptjs');
const jwt=require("jsonwebtoken");
const jwtSecret="apurvakhurudavrupaduruhk";
const credential = require('../cred/env');
const auth = require('../middleware/auth');
const registermodel = require('../models/user.model');
const Otp = require('../models/otpSchema');

 async function login(req,res,next){
    let uname = req.body.uname;
    let email = req.body.email;
    let password = req.body.password;
    const user =  await registermodel.findOne({uname:uname, email:email });
    if (user && (await user.matchPassword(password))) {
        let payload={
            uid:uname,
            email:email,
            fname:user.fname,
            lname:user.lname,
            uname:user.uname,
            mobile:user.mobile,
            email:user.mobile,
            address:user.address
        }
        const token=jwt.sign(payload,jwtSecret,{expiresIn:360000})
        res.json({"err":0,"msg":"Login Success","payload":payload,"token":token})
    }
    else {
        res.status(401);
        throw new Error("Invalid Email or Password");
      }
}  

async function register(req,res,next){
    let ins = new registermodel({ fname: req.body.fname, lname: req.body.lname, uname: req.body.uname, mobile: req.body.mobile, address:req.body.address ,/* pic: req.body.pic, */email:req.body.email,password:req.body.password });
    await ins.save((err) => {
        if (err) {
            console.log(err)
            res.send("Already Added")
        }
        else {
            res.send("ok")
        }
    })
    
}

async function socialuser(req,res,next){
    let ins = new registermodel({ fname: req.body.fname,lname: req.body.lname,uname: req.body.uname, mobile: req.body.mobile, address:"Sinhagad rd,Pune,Maharashtra,India" ,/*  pic: req.body.pic , */email:req.body.email,password:"SocialLogin123#" });
    await ins.save((err) => {
        if (err) {
            console.log(err)
            res.send("Already Added")
        }
        else {
            res.send("ok")
        }
    })
    
} 

const nodemailer = require ("nodemailer");

var transporter = nodemailer.createTransport({
    service : 'gmail',
    port: 587,
    secure: false,
    auth: {
        user: credential.email,
        pass: credential.password,
    }
});

async function emailSend(req,res,next){
    console.log(req.body.email)
    let data = await registermodel.findOne({email:req.body.email});
    const responseType = {};
    if(data){
        let otpcode = Math.floor((Math.random()*10000)+1);
        let otpData = new Otp({
            email:req.body.email,
            code:otpcode,
            expireIn: new Date().getTime() + 300*1000
        })
        let otpResponse = await otpData.save();
        var emailGene = otpResponse.email;
        var codeGene = otpResponse.code;
      /*   console.log(codeGene); */
      

        var mailOptions = {
            from: 'khurudapurva@gmail.com',
            to: `${emailGene}`,
            subject: 'One-time-password for setting up NeoSTORE password.',
            text:`${codeGene}`,
            html:`
            <head>
        
            <style>
        
            div {
                border: 1px solid black;
                border-collapse: collapse;
                background-color: pink;
                width: auto;
            }
        
            </style>
        
            </head>
        
            <body>
               <div>
               <span><h1><b>Generated Otp : </b> ${codeGene} </h1></span>
               <p> OTP is valid for next 30 sec. </p>
               <div>
            </body>`,
        };
        
        transporter.sendMail(mailOptions, function(error,info){
            if(error){
                console.log(error);
            }else{
               console.log('Email Sent :'+ info.response);
            }
        });

        responseType.statusText = 'Success'
        responseType.message = 'Please Check Your Email Id';

    }else{
        responseType.statusText = 'error'
        responseType.message = "Email Id not Exist";
    }
    res.status(200).json(responseType);

   
} 
async function changePassword(req,res,next){
    let data = await Otp.findOne({email:req.body.email,code:req.body.otpCode})
    const response = {};
    if(data){
        let currentTime = new Date().getTime();
        let diff = (data.expireIn - currentTime)/1000;
        if(diff < 0){
            response.message = 'Token Expire';
            response.statusText = 'error';
        }else{
            let user = await registermodel.findOne({email:req.body.email});
            user.password = req.body.password;
            user.save();
            response.message = 'Password Changed Successfully';
            response.statusText = 'Success';
        }
    }else{
        response.message = 'Invalid Otp'
        response.statusText = 'error';
    }
    res.status(200).json(response);
} 
 
module.exports = {login, register,socialuser,emailSend,changePassword};




