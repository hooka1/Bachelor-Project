const express = require("express");
const router = express.Router();
const mongoose=require('mongoose');
// const user = mongoose.model("User");
const user = require('../Models/User');
const report=require('../Models/Reports')
const approved= require('../Models/ApprovedSessions');
const previous=require('../Models/PreviousSessions');
const request= require('../Models/RequestedSessions');
const jwt= require('jsonwebtoken');
const bcrypt= require('bcrypt');
const asyncHandler= require('express-async-handler');
const nodemailer = require("nodemailer");
const {protect,protectClient}= require('../MiddleWare/Authentication')

require('dotenv').config();

// 1=Client,2=Translator,3=Admin

// nodemailer
async function mailer(recieveremail, code) {


    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,

        secure: false, // true for 465, false for other ports
        requireTLS: true,
        auth: {
            user: "translateco2023@gmail.com", // generated ethereal user
            pass: "eketdrgrrsrnqynz", // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: {
            name:"TranslateCo, Inc.",
            address:'translateco2023@gmail.com',
          }, // sender address
        to: `${recieveremail}`, // list of receivers
        subject: "Signup Verification", // Subject line
        text: `Your Verification Code is ${code}`, // plain text body
        html: `<b>Your Verification Code is ${code}</b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}

router.post('/verify', async(req, res) => {
    console.log('sent by client - ', req.body);
    const newClient={
        Name: req.body.Name,
        Username:req.body.Username,
        Email:req.body.Email,
        Password:req.body.Password,
        DOB: req.body.dob,
        PhoneNumber:req.body.PhoneNumber,
        role:1,
    };
    if(!req.body.Name||!req.body.Username||!req.body.Email||!req.body.Password||!req.body.dob||!req.body.PhoneNumber){
        return res.status(422).json({ error: "Please add all the fields" });
    }

    const findUsername= await user.findOne({Username: req.body.Username});
    const findEmail= await user.findOne({Email:req.body.Email});   
    if(findEmail!=null){
        return res.json({error:'This email is already registered for an account'})
      }
     else  if(findUsername!=null){
        res.json({error:'Username is already taken, please choose another'})
      }
    else{
        let VerificationCode = Math.floor(100000 + Math.random() * 900000);
                    let user = [
                        {
                            Name: req.body.Name,
                            Username:req.body.Username,
                            Email:req.body.Email,
                            Password:req.body.Password,
                            DOB: req.body.dob,
                            PhoneNumber:req.body.PhoneNumber,
                            role:1,
                            VerificationCode
                        }
                    ]
                    await mailer(req.body.Email, VerificationCode);
                    res.send({ message: "Verification Code Sent to your Email", udata: user });
  }

})


router.post("/Login",asyncHandler( async(req, res) => {
   const logUser= {
    Email: req.body.Email,
    Password: req.body.Password
   }
   
   const users1= await user.findOne({Email:req.body.Email})
   const users2= await user.findOne({Username:req.body.Email})
try{
   if(users1 && (await bcrypt.compare(req.body.Password,users1.Password))){
    const tokenout={
        token:generateToken(users1._id)
    }
   
   res.status(201).json({tokenout:tokenout, user:users1});
   console.log("nice")
   }
   else if(users2 && (await bcrypt.compare(req.body.Password,users2.Password))){
    const tokenout={
        token:generateToken(users2._id)
    }
   
   res.status(201).json({tokenout:tokenout, user:users2});
   console.log("nice")
   }
   else{
    console.log("nah man")
    // return res.status(422).json({ error: "Invalid Credentials" });
     return res.json({ error: "Invalid Credentials" });
    // throw new Error('Invalid Username or Password')
   }
}
catch (err) {
    console.log(err);
}
  }));

router.post("/Signup", asyncHandler(async(req, res) => {
    const newClient={
        Name: req.body.Name,
        Username:req.body.Username,
        Email:req.body.Email,
        Password:req.body.Password,
        DOB: req.body.dob,
        role:1,
        FirstTimeUser:true
    };
    console.log(req.body.Name)
    if(!req.body.Name||!req.body.Username||!req.body.Email||!req.body.Password||!req.body.dob){
        res.status(400);
        throw new Error('Please Fill in All Fields');
    }

    const findUsername= await user.findOne({Username: req.body.Username});
    const findEmail= await user.findOne({Email:req.body.Email});   
    if(findUsername!=null){
      res.status(400).send('Username is already taken, please choose another')
    }
    else if(findEmail!=null){
        res.status(400).send('This email is already registered for an account')
      }
    else{
        const Salt= await bcrypt.genSalt(10);
        const hashedPass= await bcrypt.hash(req.body.Password,Salt);

    const cor= await user.create({
      Username: newClient.Username,
      Password: hashedPass,
      role: 1,
      Name: newClient.Name,
     Email: newClient.Email,
    DOB: newClient.DOB,
    PhoneNumber:req.body.PhoneNumber,
    FirstTimeUser:newClient.FirstTimeUser
    })

    const tokenout={
        token:generateToken(cor._id)
    }

   res.status(201).json({tokenout:tokenout,user:cor});
  }
    }));

    const generateToken=(_id)=>{
        return jwt.sign({_id},""+process.env.JWT_SECRET,{ expiresIn:'3h'})
    }
 
    router.get('/spec',protectClient, asyncHandler(async(req,res)=>{
       //const users= await user.findOne({Username: req.body.Username})
        const users= await user.findById(req.user._id)
        res.send(users);
    }))

    router.put('/updateProfile',protect, asyncHandler(async(req,res)=>{
        const users= await user.findOneAndUpdate({_id:req.user._id},{Name:req.body.Name, Email:req.body.Email, DOB: req.body.dob, PhoneNumber:req.body.PhoneNumber});
       const users2=await user.findById({_id:req.user._id})

        if(users2.role==1){
            const requests= await request.find({ClientEmail:req.user.Email})
            requests.forEach(async(req)=>{
               await request.findOneAndUpdate({_id:req._id}, {ClientEmail:users2.Email, ClientName:users2.Name,UserPhoneNumber:users2.PhoneNumber})
               })

               const approve= await approved.find({ClientEmail:req.user.Email})
               approve.forEach(async(req)=>{
                  await approved.findOneAndUpdate({_id:req._id}, {ClientEmail:users2.Email, ClientName:users2.Name,UserPhoneNumber:users2.PhoneNumber})
                  })

                  const prev= await previous.find({ClientEmail:req.user.Email})
                  prev.forEach(async(req)=>{
                     await previous.findOneAndUpdate({_id:req._id},{ClientEmail:users2.Email, ClientName:users2.Name,UserPhoneNumber:users2.PhoneNumber})
                     })

                     const reports= await report.find({ClientEmail:req.user.Email})
                     reports.forEach(async(req)=>{
                        await report.findOneAndUpdate({_id:req._id},{ClientEmail:users2.Email, ClientName:users2.Name})
                        })
   
        }
       else  if(users2.role==2){
            const requests= await request.find({TranslatorEmail:req.user.Email})
            requests.forEach(async(req)=>{
               await request.findOneAndUpdate({_id:req._id}, {TranslatorEmail:users2.Email, TranslatorName:users2.Name,TranslatorPhoneNumber:users2.PhoneNumber})
               })

               const approve= await approved.find({TranslatorEmail:req.user.Email})
               approve.forEach(async(req)=>{
                  await approved.findOneAndUpdate({_id:req._id}, {TranslatorEmail:users2.Email, TranslatorName:users2.Name,TranslatorPhoneNumber:users2.PhoneNumber})
                  })

                  const prev= await previous.find({TranslatorEmail:req.user.Email})
                  prev.forEach(async(req)=>{
                     await previous.findOneAndUpdate({_id:req._id},{TranslatorEmail:users2.Email, TranslatorName:users2.Name,TranslatorPhoneNumber:users2.PhoneNumber})
                     })

                     const reports= await report.find({TranslatorEmail:req.user.Email})
                     reports.forEach(async(req)=>{
                        await report.findOneAndUpdate({_id:req._id},{TranslatorEmail:users2.Email, TranslatorName:users2.Name})
                        })
   
        }

        res.status(201).json({user:users2});
        console.log(users2);
    }));

    router.post("/verifyEmail", asyncHandler(async(req, res) => {
        const findEmail= await user.findOne({Email:req.body.Email});   
     if(findEmail==null){
        return res.json({error:'This email not registered for an account'})
          }
        else{
            let VerificationCode = Math.floor(100000 + Math.random() * 900000);
            let user = [
                {
                    Email:req.body.Email,
                    VerificationCode
                }
            ]
            await mailer(req.body.Email, VerificationCode);
            res.send({ message: "Verification Code Sent to your Email", udata:user });
      }
        }));

        router.put('/FirstTime',protect, asyncHandler(async(req,res)=>{
            console.log("hey")
            const users= await user.findOneAndUpdate({_id:req.user._id},{FirstTimeUser:false});
           const users2=await user.findById({_id:req.user._id})
            res.status(201).json({user:users2});
            console.log(users2);
        }));

    router.put("/changepass", async(req, res) => {
        const Salt= await bcrypt.genSalt(10);
        const hashedPass= await bcrypt.hash(req.body.Password,Salt);
        const findEmail= await user.findOneAndUpdate({Email:req.body.Email},{Password:hashedPass}); 
            res.send({ message: "Password Successfully Changed" }); 
            });
module.exports= router;