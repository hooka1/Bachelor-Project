const express = require("express");
const router = express.Router();
const mongoose=require('mongoose');
const language= require('../Models/Languages');
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
const stripe = require('stripe')('sk_test_51NBMhUHrbbS6btj2HV4lXbB5iP62EmkFfZR7GpCFXGeNzJsM8ToA8RADGawXSfeHuDdPDXohFj0fhduRcjDj04sj006bF0ooJX');

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
 

     router.get('/myRequests',protectClient, asyncHandler(async(req,res)=>{
       //const users= await user.findOne({Username: req.body.Username})
        const requests= await request.find({ClientEmail:req.user.Email})
        res.send({requests});
    }))

    router.get('/myApprovedRequests',protectClient, asyncHandler(async(req,res)=>{
        //const users= await user.findOne({Username: req.body.Username})
         const requests= await approved.find({ClientEmail:req.user.Email})
         res.send({requests});
     }))

     router.get('/myPreviousRequests',protectClient, asyncHandler(async(req,res)=>{
        //const users= await user.findOne({Username: req.body.Username})
         const requests= await previous.find({ClientEmail:req.user.Email})
         res.send({requests});
     }))

     router.get('/myUnreportedPreviousRequests',protectClient, asyncHandler(async(req,res)=>{
        //const users= await user.findOne({Username: req.body.Username})
         const requests= await previous.find({ClientEmail:req.user.Email, Reported:false})
         res.send({requests});
     }))

     router.get('/getLanguages',protectClient, asyncHandler(async(req,res)=>{
      //const users= await user.findOne({Username: req.body.Username})
       const languages= await language.find()
       var lang=[]

       languages.forEach(lan=>{
        lang.push(lan.Language)
       })
       res.send({lang});
   }))

    // router.post("/requestSession", protectClient, asyncHandler(async(req, res) => {
    //     const cor= await request.create({
    //         LanguageFrom: req.body.LanguageFrom,
    //         LanguageTo: req.body.LanguageTo,
    //         Date: req.body.Date,
    //         TimeFrom: req.body.TimeFrom,
    //         Duration: req.body.Duration,
    //         ClientEmail: req.body.ClientEmail,
    //         TranslatorEmail: "",
    //         CancelledBy:[]
    //       })

     
    //         res.send({ message: "Request sent, please check later for confirmation", cor});
      
    //     }));

    router.post("/requestSession", protectClient, asyncHandler(async(req, res) => {

        console.log(req.body.Type)
        if(req.body.Type=="OverThePhone"){
            const cor= await request.create({
                LanguageFrom: req.body.LanguageFrom,
                LanguageTo: req.body.LanguageTo,
                Date: req.body.Date,
                TimeFrom: req.body.TimeFrom,
                Duration: req.body.Duration,
                ClientEmail: req.body.ClientEmail,
                TranslatorEmail: "",
                TranslatorName: "",
                TranslatorPhoneNumber:"",
                CancelledBy:[],
                Type:req.body.Type,
                UserPhoneNumber:req.body.UserPhoneNumber,
                ClientName:req.body.ClientName,
                Payment:req.body.Payment,
                Amount:req.body.Amount,
                pid:req.body.pid
              })
              const Subject="You have requested a Session:"

              const body=`Dear ${req.body.ClientName}, we would like to inform you have cancelled your session requested for ${req.body.LanguageFrom} to ${req.body.LanguageTo}. If the amount paid was with card, then a full refund will be refunded to you in the next 24 hours. Thank you, TranslateCo.`
    
               const mail= await mailer(req.body.ClientEmail, body,Subject);
              res.send({ message: "Request sent, please check later for confirmation", cor});
        }
       else{
        
        const cor= await request.create({
            LanguageFrom: req.body.LanguageFrom,
            LanguageTo: req.body.LanguageTo,
            Date: req.body.Date,
            TimeFrom: req.body.TimeFrom,
            Duration: req.body.Duration,
            ClientEmail: req.body.ClientEmail,
            TranslatorEmail: "",
            TranslatorName: "",
            TranslatorPhoneNumber:"",
            CancelledBy:[],
            Type:req.body.Type,
            UserPhoneNumber:req.body.UserPhoneNumber,
            ClientName:req.body.ClientName,
            Payment:req.body.Payment,
            Amount:req.body.Amount,
            pid:req.body.pid
          })
          const Subject="You have requested a Session:"

          const body=`Dear ${req.body.ClientName}, we would like to inform you have cancelled your session requested for ${req.body.LanguageFrom} to ${req.body.LanguageTo}. If the amount paid was with card, then a full refund will be refunded to you in the next 24 hours. Thank you, TranslateCo.`

           const mail= await mailer(req.body.ClientEmail, body,Subject);
          res.send({ message: "Request sent, please check later for confirmation", cor});

       }
      
        }));

        router.post('/Report',protectClient, asyncHandler(async(req,res)=>{

            if(req.body.ReportType=="System"){
                const rep= await report.create({
                    ClientEmail:req.body.Email,
                    ClientName:req.body.ClientName,
                    ReportDescription:req.body.ReportDescription,
                    ReportType:"System",
                    Resolved:false,
                  }) 

                  res.send({message:"Report Submitted", rep});
            }
            else if(req.body.ReportType=="Session"){
                const translator= await user.findOne({Email:req.body.TranslatorEmail})
                const WS=translator.WarnStatus
                const rep= await report.create({
                    SessionId:req.body.SessionId,
                    TranslatorEmail:req.body.TranslatorEmail,
                    TranslatorName:req.body.TranslatorName,
                    TranslatorWarnStatus:WS,
                    ClientEmail:req.body.Email,
                    ClientName:req.body.ClientName,
                    ReportDescription:req.body.ReportDescription,
                    ReportType:"Session",
                    Resolved:false,
                  })
                const upPrev= await previous.findOneAndUpdate({_id:req.body.SessionId}, {Reported:true}) 

                  res.send({message:"Report Submitted", rep});
            }
         }));


         router.get('/myResolvedReports',protectClient, asyncHandler(async(req,res)=>{
            //const users= await user.findOne({Username: req.body.Username})
             const reports= await report.find({ClientEmail:req.user.Email,Resolved:true})
             res.send({reports});
         }))

         router.get('/myNonResolvedReports',protectClient, asyncHandler(async(req,res)=>{
          //const users= await user.findOne({Username: req.body.Username})
           const reports= await report.find({ClientEmail:req.user.Email,Resolved:false})
           res.send({reports});
       }))

        router.post('/cancelRequests',protectClient, asyncHandler(async(req,res)=>{
            //const users= await user.findOne({Username: req.body.Username})
             const requests= await request.findOneAndDelete({_id:req.body.objid})
             if(requests.Payment=="Card"){
                const refund = await stripe.refunds.create({
                  payment_intent: requests.pid,
                });
    
               }

               const Subject="You have cancelled your Session:"

               const body=`Dear ${requests.ClientName}, we would like to inform you have cancelled your session requested for ${requests.LanguageFrom} to ${requests.LanguageTo} on ${requests.Date} at ${requests.TimeFrom}. If the amount paid was with card, then a full refund will be refunded to you in the next 24 hours. Thank you, TranslateCo.`
  
                 await mailer(requests.ClientEmail, body,Subject);

             res.send({message:"Request has been cancelled", requests});
         }));

         router.post('/cancelApprovedRequests',protectClient, asyncHandler(async(req,res)=>{
            //const users= await user.findOne({Username: req.body.Username})
             const requests= await approved.findOneAndDelete({_id:req.body._id})
             if(requests.Payment=="Card"){
                const refund = await stripe.refunds.create({
                  payment_intent: requests.pid,
                });
    
               }

               const Subject="You have cancelled your Session:"

               const body=`Dear ${requests.ClientName}, we would like to inform you have cancelled your session requested for ${requests.LanguageFrom} to ${requests.LanguageTo} on ${requests.Date} at ${requests.TimeFrom}. If the amount paid was with card, then a full refund will be refunded to you in the next 24 hours. Thank you, TranslateCo.`
  
                 await mailer(requests.ClientEmail, body,Subject);

             res.send({message:"Approved Request has been cancelled", requests});
         }))

         router.post('/AcceptStartSession',protectClient, asyncHandler(async(req,res)=>{
            const approve= await approved.findOneAndDelete({_id:req.body._id})

            const cor= await previous.create({
                LanguageFrom: approve.LanguageFrom,
                LanguageTo: approve.LanguageTo,
                Date: approve.Date,
                TimeFrom:approve.TimeFrom,
                Duration: approve.Duration,
                ClientEmail: approve.ClientEmail,
                TranslatorEmail: approve.TranslatorEmail,
                TranslatorName:approve.TranslatorName,
                TranslatorPhoneNumber:approve.TranslatorPhoneNumber,
                CancelledBy:approve.CancelledBy,
                Type:approve.Type,
                ClientName:approve.ClientName,
                UserPhoneNumber:approve.UserPhoneNumber,
                Reported:false,
                Payment:approve.Payment,
                Amount:approve.Amount,
                pid:approve.pid
                // started:false
              })
    
           
    
    
         
                res.send({ message: "Session Started. Goodluck !!", cor});
             
         })) 


module.exports= router;