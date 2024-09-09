const express = require("express");
const router = express.Router();
const mongoose=require('mongoose');
// const user = mongoose.model("User");
const language= require('../Models/Languages');
const user = require('../Models/User');
const approved= require('../Models/ApprovedSessions');
const previous=require('../Models/PreviousSessions');
const request= require('../Models/RequestedSessions');
const jwt= require('jsonwebtoken');
const bcrypt= require('bcrypt');
const asyncHandler= require('express-async-handler');
const nodemailer = require("nodemailer");
const {protect,protectTranslator}= require('../MiddleWare/Authentication')

require('dotenv').config();

// 1=Client,2=Translator,3=Admin

async function mailer(recieveremail, report,sub) {


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
        subject: `${sub}`, // Subject line
        text: `${report}`, // plain text body
        html: `<b>${report}</b>`, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
  
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  
  }
   
 
  router.get('/getLanguagesT',protectTranslator, asyncHandler(async(req,res)=>{
    //const users= await user.findOne({Username: req.body.Username})
     const languages= await language.find()
     var lang=[]

     languages.forEach(lan=>{
      lang.push(lan.Language)
     })
     res.send({lang});
 }))

     router.get('/myRequestsT',protectTranslator, asyncHandler(async(req,res)=>{
       //const users= await user.findOne({Username: req.body.Username})
        const requests= await request.find({TranslatorEmail:req.user.Email})
        res.send({requests});
    }))

    router.get('/myApprovedRequestsT',protectTranslator, asyncHandler(async(req,res)=>{
        //const users= await user.findOne({Username: req.body.Username})
         const requests= await approved.find({TranslatorEmail:req.user.Email})
         res.send({requests});
     }))

     router.get('/myPreviousRequestsT',protectTranslator, asyncHandler(async(req,res)=>{
        //const users= await user.findOne({Username: req.body.Username})
         const requests= await previous.find({TranslatorEmail:req.user.Email})
         res.send({requests});
     }))

    router.post("/acceptSession", protectTranslator, asyncHandler(async(req, res) => {
        const requests= await request.findOneAndDelete({_id:req.body._id})

        const cor= await approved.create({
            LanguageFrom: req.body.LanguageFrom,
            LanguageTo: req.body.LanguageTo,
            Date: req.body.Date,
            TimeFrom: req.body.TimeFrom,
            Duration: req.body.Duration,
            ClientEmail: req.body.ClientEmail,
            ClientName:requests.ClientName,
            TranslatorName:req.user.Name,
            TranslatorPhoneNumber:req.user.PhoneNumber,
            TranslatorEmail: req.body.TranslatorEmail,
            CancelledBy:requests.CancelledBy,
            Started:false,
            Type:requests.Type,
            UserPhoneNumber:requests.UserPhoneNumber,
            Payment:requests.Payment,
            Amount:requests.Amount,
            pid:requests.pid
          })

       
          const Subject="Session Assigned!!"
 
          const body=`Dear ${requests.ClientEmail}, Your session for ${requests.LanguageFrom} to ${requests.LanguageTo} on ${requests.Date} at ${requests.TimeFrom} has been assigned to ${req.user.Name}, we look forward to seeing you then. Thank you, TranslateCo.`

            await mailer(requests.ClientEmail, body,Subject);

     
            res.send({ message: "Request Accepted, please check approved section for details on this session", cor});
      
        }));

        // router.put("/startSession", protectTranslator, asyncHandler(async(req, res) => {
        //     const requests= await approved.findOneAndUpdate({_id:req.body._id},{started:true})     
        //         res.send({ message: "Request Accepted, please check approved section for details on this session", requests});
          
        //     }));

        router.post('/declineRequest',protectTranslator, asyncHandler(async(req,res)=>{
            //const users= await user.findOne({Username: req.body.Username})
            const requestsTemp= await request.findOne({_id:req.body._id})
            var rCancelled=requestsTemp.CancelledBy
            rCancelled.push(req.user.Email)

             const requests= await request.findOneAndUpdate({_id:req.body._id},{TranslatorEmail:"", TranslatorName:"", TranslatorPhoneNumber:"",CancelledBy:rCancelled})
             res.send({message:"Request has been declined", requests});
         }))

         router.post('/cancelApprovedRequestsT',protectTranslator, asyncHandler(async(req,res)=>{
            //const users= await user.findOne({Username: req.body.Username})
             const requests= await approved.findOneAndDelete({_id:req.body._id})
             var rCancelled=requests.CancelledBy
             rCancelled.push(req.user.Email)

             const cor= await request.create({
                LanguageFrom: requests.LanguageFrom,
                LanguageTo: requests.LanguageTo,
                Date: requests.Date,
                TimeFrom: requests.TimeFrom,
                Duration: requests.Duration,
                ClientEmail: requests.ClientEmail,
                ClientName:requests.ClientName,
                TranslatorName:"",
                TranslatorPhoneNumber:"",
                TranslatorEmail: "",
                CancelledBy:rCancelled,
                Type:requests.Type,
                UserPhoneNumber:requests.UserPhoneNumber,
                Payment:requests.Payment,
                Amount:requests.Amount,
                pid:requests.pid
              })


              const Subject="Reassinging Translator:"
 
              const body=`Dear ${requests.ClientEmail}, The translator assigned to your session for ${requests.LanguageFrom} to ${requests.LanguageTo} on ${requests.Date} at ${requests.TimeFrom} has cancelled as they will not be available for the session. However, we are currently assigning you a new translator and will assign them as soon as we possibly can so please be patient. We would like to apologize for this inconvenience and hope the session will be to you utmost liking. Thank you, TranslateCo.`
 
                await mailer(requests.ClientEmail, body,Subject);
             res.send({message:"Approved Request has been cancelled", requests});
         }))

         router.put('/addLanguages',protectTranslator, asyncHandler(async(req,res)=>{
            //const users= await user.findOne({Username: req.body.Username})
             const users= await user.findOne({_id:req.user._id})
             const languages=[]
             var upTranslator=null;
             if(users.Languages==null){
              
                languages.push(req.body)
                users.Languages=languages;
               upTranslator= await user.findOneAndUpdate({_id:req.user._id},{Languages:users.Languages})
             }
             else{
                users.Languages.push(req.body);
               upTranslator= await user.findOneAndUpdate({_id:req.user._id},{Languages:users.Languages})

             }
             res.send({message:"Language Added", upTranslator});
         })) 

         router.post('/deleteLanguage',protectTranslator, asyncHandler(async(req,res)=>{
            //const users= await user.findOne({Username: req.body.Username})
             const users= await user.findOne({_id:req.user._id})
             var languages=[]
            const userLang=users.Languages
             userLang.forEach(language=>{
                if(language.language!=req.body.language){
                    console.log(language.language)
                    languages.push(language);
                }
             })

             const upTranslator= await user.findOneAndUpdate({_id:req.user._id},{Languages:languages})
             
             res.send({message:"Language Removed", upTranslator});
         })) 

         router.get('/myLanguages',protectTranslator, asyncHandler(async(req,res)=>{
             const users= await user.findOne({_id:req.user._id})
             const languages1= await language.find()
             var lang=[]
        
             languages1.forEach(lan=>{
              lang.push(lan.Language)
             })
             const languages=users.Languages             
             res.send({message:"Here are your Languages", languages, lang});
         })) 

         router.post('/startSession',protectTranslator, asyncHandler(async(req,res)=>{

            if(req.body.Type=="OverThePhone"){
                const approve= await approved.findOneAndDelete({_id:req.body._id})
                const cor= await previous.create({
                    LanguageFrom: approve.LanguageFrom,
                    LanguageTo: approve.LanguageTo,
                    Date: approve.Date,
                    TimeFrom: approve.TimeFrom,
                    Duration: approve.Duration,
                    ClientEmail: approve.ClientEmail,
                    ClientName:approve.ClientName,
                    TranslatorName:approve.TranslatorName,
                    TranslatorPhoneNumber:approve.TranslatorPhoneNumber,
                    TranslatorEmail: approve.TranslatorEmail,
                    CancelledBy:approve.CancelledBy,
                    Type:approve.Type,
                    UserPhoneNumber:approve.UserPhoneNumber,
                    Reported:false,
                    Payment:approve.Payment,
                    Amount:approve.Amount,
                    pid:approve.pid
                    // started:false
                  })
                  res.send({ message: "Session Started. Goodluck!! You will now be redirected to make the call", cor});

            }
            else{
                const approve= await approved.findOneAndUpdate({_id:req.body._id},{Started:true})
                res.send({ message: "Session Started. Goodluck !!", approve});
            }             
         })) 


module.exports= router;