const express = require("express");
const router = express.Router();
const mongoose=require('mongoose');
// const user = mongoose.model("User");
const language= require('../Models/Languages');
const user = require('../Models/User');
const report=require('../Models/Reports');
const approved= require('../Models/ApprovedSessions');
const request= require('../Models/RequestedSessions');
const previous=require('../Models/PreviousSessions');
const jwt= require('jsonwebtoken');
const bcrypt= require('bcrypt');
const asyncHandler= require('express-async-handler');
const nodemailer = require("nodemailer");
const {protect,protectClient,protectAdmin}= require('../MiddleWare/Authentication')
const stripe = require('stripe')('sk_test_51NBMhUHrbbS6btj2HV4lXbB5iP62EmkFfZR7GpCFXGeNzJsM8ToA8RADGawXSfeHuDdPDXohFj0fhduRcjDj04sj006bF0ooJX');

require('dotenv').config();

// 1=Client,2=Translator,3=Admin

//nodemailer
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
 
router.post('/addLanguage',protectAdmin, asyncHandler(async(req,res)=>{
  //const users= await user.findOne({Username: req.body.Username})
  const l1= await language.findOne({Language:req.body.Language})
  if(l1==null){
   const languages= await language.create({Language:req.body.Language})

   res.send({message:"Language Added"});
  }
  else{
    res.send({message:"Language Already Exists"});
  }
}))

router.post('/removeLanguage',protectAdmin, asyncHandler(async(req,res)=>{
  //const users= await user.findOne({Username: req.body.Username})
  const l1= await language.findOneAndDelete({Language:req.body.Language})


   res.send({message:"Language Removed"});
 
}))


     router.get('/Requests',protectAdmin, asyncHandler(async(req,res)=>{
       //const users= await user.findOne({Username: req.body.Username})
        const requests= await request.find({TranslatorEmail:""});
        res.send({requests});
    }))

    router.get('/AssignedRequests',protectAdmin, asyncHandler(async(req,res)=>{
      //const users= await user.findOne({Username: req.body.Username})
       const requests= await request.find({TranslatorEmail:{$ne : ""}});
       res.send({requests});
   }))

    router.get('/ApprovedRequests',protectAdmin, asyncHandler(async(req,res)=>{
        //const users= await user.findOne({Username: req.body.Username})
         const requests= await approved.find()
         res.send({requests});
     }))

     router.get('/PreviousRequests',protectAdmin, asyncHandler(async(req,res)=>{
      //const users= await user.findOne({Username: req.body.Username})
       const requests= await previous.find()
       res.send({requests});
   }))

     router.post('/getUsers',protectAdmin, asyncHandler(async(req,res)=>{
      //const users= await user.findOne({Username: req.body.Username})
       const users= await user.find({role:req.body.role});
       console.log(users)
       res.send({users});
   }))

    router.put("/assignTranslator", protectAdmin, asyncHandler(async(req, res) => {
        const cor= await request.findOneAndUpdate({_id:req.body._id},{TranslatorEmail:req.body.TranslatorEmail, TranslatorName:"",TranslatorPhoneNumber:""})
        const Subject="Session Assigned!!"

        const body=`Dear ${req.body.TranslatorEmail}, we would like to inform you that you have been assigned a session for ${cor.LanguageFrom} to ${cor.LanguageTo} on ${cor.Date} at ${cor.TimeFrom}. Please make sure to view the Request on the application as soon as possible and either approve it or decline it so we could assign another translator as soon as possible. Thank you, TranslateCo.`

          await mailer(req.body.TranslatorEmail, body,Subject);
         res.send({ message: "Request sent has been sent to translator, check approved list later to see if they accepted it", cor});
      
        }));

        router.post('/cancelRequestsA',protectAdmin, asyncHandler(async(req,res)=>{
            //const users= await user.findOne({Username: req.body.Username})
             const requests= await request.findOneAndDelete({_id:req.body._id})

             if(requests.Payment=="Card"){
              const refund = await stripe.refunds.create({
                payment_intent: requests.pid,
              });
  
             }

          
             const Subject="We Apologize for the Inconvenience:"

             const body=`Dear ${requests.ClientName}, we would like to formally apologize for this inconvenience as the session you requested for ${requests.LanguageFrom} to ${requests.LanguageTo} on ${requests.Date} at ${requests.TimeFrom} was cancelled as there were no translators available at that time. Please book for the session at another time and for sure there will be translators available then. Again we would like to very much apologize for thise inconvenience. Thank you, TranslateCo.`

               await mailer(requests.ClientEmail, body,Subject);
             res.send({message:"Request has been cancelled", requests});
         }))

         router.post('/SearchUser',protectAdmin, asyncHandler(async(req,res)=>{

          const users1= await user.find({role:req.body.role,Email:req.body.Email})
          const users2= await user.find({role:req.body.role,Username:req.body.Email})

          if(req.body.role==1){
            if(users1[0]==undefined){
              if(users2[0]==undefined){
              res.send({message:"No Client can be Found with this Email"});
              }
              else{
                var users=users2
                res.send({message:"Found", users});
              }
            }
            else{
              var users=users1
              res.send({message:"Found", users});
            }
          }
          else if(req.body.role==2){
            if(users1[0]==undefined){
              if(users2[0]==undefined){
              res.send({message:"No Translator can be Found with this Email"});
              }
              else{
                var users=users2
                res.send({message:"Found", users});
              }
            }
            else{
              var users=users1
              res.send({message:"Found", users});
            }
          }
          else{
            if(users1[0]==undefined){
              if(users2[0]==undefined){
              res.send({message:"No Admin can be Found with this Email"});
              }
              else{
                var users=users2
                res.send({message:"Found", users});
              }
            }
            else{
              var users=users1
              res.send({message:"Found", users});
            }
          }
          
       }))

       router.get('/getLanguagesA',protectAdmin, asyncHandler(async(req,res)=>{
        //const users= await user.findOne({Username: req.body.Username})
         const languages= await language.find()
         var lang=[]
    
         languages.forEach(lan=>{
          lang.push(lan.Language)
         })
         res.send({lang});
     }))

         router.post('/removeUser',protectAdmin, asyncHandler(async(req,res)=>{
          //const users= await user.findOne({Username: req.body.Username})
           const users= await user.findOneAndDelete({_id:req.body._id})
           res.send({message:"User has been removed", users});
       }))

         router.post('/cancelApprovedRequestsA',protectAdmin, asyncHandler(async(req,res)=>{
            //const users= await user.findOne({Username: req.body.Username})
             const requests= await approved.findOneAndDelete({_id:req.body._id})

             const cor= await request.create({
              LanguageFrom: requests.LanguageFrom,
              LanguageTo: requests.LanguageTo,
              Date: requests.Date,
              TimeFrom: requests.TimeFrom,
              Duration: requests.Duration,
              ClientEmail: requests.ClientEmail,
              TranslatorEmail: "",
              CancelledBy:requests.CancelledBy,
              Type:requests.Type,
              UserPhoneNumber:requests.UserPhoneNumber,
              Payment:requests.Payment,
              Amount:requests.Amount 
            })
  
             res.send({message:"Approved Request has been cancelled", requests});
         }))

         router.post('/Reassign',protectAdmin, asyncHandler(async(req,res)=>{
          //const users= await user.findOne({Username: req.body.Username})
           const requests= await request.findOne({_id:req.body._id})
           var rCancelled=requests.CancelledBy
           rCancelled.push(requests.TranslatorEmail)
           const requests1= await request.findOneAndUpdate({_id:req.body._id},{TranslatorName:"",TranslatorPhoneNumber:"",CancelledBy:rCancelled})

           

           res.send({message:"Request will be Reassigned", rCancelled});
       }))

         router.post("/addAdmin",protectAdmin, asyncHandler(async(req, res) => {
            const newAdmin={
                Name: req.body.Name,
                Username:req.body.Username,
                Email:req.body.Email,
                Password:req.body.Password,
                DOB: req.body.dob,
                role:3,
                PhoneNumber:req.body.PhoneNumber,
                FirstTimeUser:true,
            };
            console.log(req.body.Name)
            if(!req.body.Name||!req.body.Username||!req.body.Email||!req.body.Password||!req.body.dob){
                res.status(400);
                throw new Error('Please Fill in All Fields');
            }
        
            const findUsername= await user.findOne({Username: req.body.Username});
            const findEmail= await user.findOne({Email:req.body.Email});   
            if(findUsername!=null){
              return res.json({error:'This Username is already registered for an account'})            }
            else if(findEmail!=null){
              return res.json({error:'This email is already registered for an account'})              }
            else{
                const Salt= await bcrypt.genSalt(10);
                const hashedPass= await bcrypt.hash(req.body.Password,Salt);
        
            const cor= await user.create({
              Username: newAdmin.Username,
              Password: hashedPass,
              role: 3,
              Name: newAdmin.Name,
             Email: newAdmin.Email,
            DOB: newAdmin.DOB,
            PhoneNumber:newAdmin.PhoneNumber,
            FirstTimeUser:newAdmin.FirstTimeUser
            
            })
     res.status(201).json({user:cor});
          }
            }));

            router.post("/addClient",protectAdmin, asyncHandler(async(req, res) => {
                const newClient={
                    Name: req.body.Name,
                    Username:req.body.Username,
                    Email:req.body.Email,
                    Password:req.body.Password,
                    DOB: req.body.dob,
                    role:1,
                    PhoneNumber:req.body.PhoneNumber,
                    FirstTimeUser:true,
                };
                console.log(req.body.Name)
                if(!req.body.Name||!req.body.Username||!req.body.Email||!req.body.Password||!req.body.dob){
                    res.status(400);
                    throw new Error('Please Fill in All Fields');
                }
            
                const findUsername= await user.findOne({Username: req.body.Username});
                const findEmail= await user.findOne({Email:req.body.Email});   
                if(findUsername!=null){
                  return res.json({error:'This Username is already registered for an account'})
                }
                else if(findEmail!=null){
                  return res.json({error:'This email is already registered for an account'})
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
                PhoneNumber:newClient.PhoneNumber,
                FirstTimeUser:newClient.FirstTimeUser

                
                })
         res.status(201).json({user:cor});
              }
                }));
    
                router.post("/addTranslator",protectAdmin, asyncHandler(async(req, res) => {
                    const newTranslator={
                        Name: req.body.Name,
                        Username:req.body.Username,
                        Email:req.body.Email,
                        Password:req.body.Password,
                        DOB: req.body.dob,
                        role:2,
                        PhoneNumber:req.body.PhoneNumber,
                        Languages:[],
                        FirstTimeUser:true,
                        WarnStatus:0,
                    };
                    console.log(req.body.Name)
                    if(!req.body.Name||!req.body.Username||!req.body.Email||!req.body.Password||!req.body.dob){
                        res.status(400);
                        throw new Error('Please Fill in All Fields');
                    }
                
                    const findUsername= await user.findOne({Username: req.body.Username});
                    const findEmail= await user.findOne({Email:req.body.Email});   
                    if(findUsername!=null){
                      return res.json({error:'This Username is already registered for an account'})
                    }
                    else if(findEmail!=null){
                      return res.json({error:'This email is already registered for an account'})
                      }
                    else{
                        const Salt= await bcrypt.genSalt(10);
                        const hashedPass= await bcrypt.hash(req.body.Password,Salt);
                
                    const cor= await user.create({
                      Username: newTranslator.Username,
                      Password: hashedPass,
                      role: 2,
                      Name: newTranslator.Name,
                     Email: newTranslator.Email,
                    DOB: newTranslator.DOB,
                    PhoneNumber:newTranslator.PhoneNumber,
                    FirstTimeUser:newTranslator.FirstTimeUser,
                    WarnStatus:newTranslator.WarnStatus
                    
                    })
             res.status(201).json({user:cor});
                  }
                    }));

                    router.post('/listTranslators',protectAdmin, asyncHandler(async(req,res)=>{
                      //const users= await user.findOne({Username: req.body.Username})
                       const users= await user.find({role:2})
                       console.log(users)
                       var translators=[]
                       var set=true
                       var Cancelled=req.body.CB
                      console.log(users)
                      users.forEach(user=>{
                        set=true
                        console.log(user.Email)
                      const userLang=user.Languages
                      var total=0;
                      if(userLang!=null){
                      userLang.forEach(language=>{
                        console.log(language.language)
                        if(language.language==req.body.LanguageFrom){
                           total=total+1;
                        }
                        if(language.language==req.body.LanguageTo){
                          total=total+1;
                       }
                       if(total==2){
                        return;
                       }
                     })}
                     if (total==2){
                      Cancelled.forEach(cancelled=>{
                        if(cancelled==user.Email){
                          set=false
                        }
                      })
                   if(set==true){
                    translators.push(user);
                   }
                     }
                    })
                       
                       res.send({message:"Here is the list of Translators:", translators});
                   })) 

            router.get('/ResolvedReports',protectAdmin, asyncHandler(async(req,res)=>{
                    //const users= await user.findOne({Username: req.body.Username})
                     const reports= await report.find({Resolved:true})
                     res.send({reports});
                 }))

         

               router.get('/SystemUnresolved',protectAdmin, asyncHandler(async(req,res)=>{
                //const users= await user.findOne({Username: req.body.Username})
                 const reports= await report.find({Resolved:false,ReportType:"System"})
                 res.send({reports});
             }))

             router.get('/SessionUnresolved',protectAdmin, asyncHandler(async(req,res)=>{
              //const users= await user.findOne({Username: req.body.Username})
               const reports= await report.find({Resolved:false,ReportType:"Session"})
               res.send({reports});
           }))
            
                 router.put('/RespondToReport',protectAdmin, asyncHandler(async(req,res)=>{
                  if(req.body.ReportType=="System"){
                    const rep= await report.findOneAndUpdate({_id:req.body._id,
                    },{
                        Resolved:true,
                        ResolveAnswer:req.body.ResolveAnswer,
                      })
                      
                    const Subject="Thank you for your Response!!"

                    const body="Thank you for reporting a system issue to us. The TranslateCo development Team will get to resolving this issue as soon as possible. It will take 1-2 days before the issue is resolved so please be patient, and if there any more inquiries regarding system issues please report to us again, as any report will help us evolve our system and make it as best for you as possible. To report system issues you can either report through the report button in the Settings or by sending and Email to us on translateco2023@gmail.com with the subject 'System Report'. Thank you again for using TranslateCo translation services and we hope to be of use to you again soon."

                      await mailer(req.body.ClientEmail, body,Subject);

                      res.send({message:"Report Responded To", rep});
                }
                else if(req.body.ReportType=="Session"){
                  if(req.body.updateWS==true){
                    const upWS= req.body.TranslatorWarnStatus+1

                    const users= await user.findOneAndUpdate({Email:req.body.TranslatorEmail,
                    },{
                      WarnStatus:upWS,
                      })

                    const rep= await report.findOneAndUpdate({_id:req.body._id,
                    },{
                        Resolved:true,
                        ResolveAnswer:req.body.ResolveAnswer,
                      })
                      
                    const Subject="Thank you for your Response!!"
  
                    const body="Thank you for reporting a session issue to us. The TranslateCo Management Team will handle this issue appropriately as soon as possible. Thank you for reporting to us as any response from you will always help our services be as neat and as efficient as possible, with the right people and team. Thank you again for using TranslateCo translation services and we hope to be of use to you again soon."
  
                      await mailer(req.body.ClientEmail, body,Subject);

                      const Subject2="WARNING: You have received a Report!!"
  
                      const body2="It has been made clear to us regarding one of your previous sessions that you have not been providing the highest quality services as you should. Note that any further warnings could result in serious repercussions depending on you warning status. Try to avoid getting any more Warning. Thank you."
    
                        await mailer(req.body.TranslatorEmail, body2, Subject2);
  
                      res.send({message:"Report Responded To", rep});
                  }
                  else{

                    const rep= await report.findOneAndUpdate({_id:req.body._id,
                    },{
                        Resolved:true,
                        ResolveAnswer:req.body.ResolveAnswer,
                      })
                      
                    const Subject="Thank you for your Response!!"
  
                    const body="Thank you for reporting a session issue to us. The TranslateCo Management Team will handle this issue appropriately as soon as possible. Thank you for reporting to us as any response from you will always help our services be as neat and as efficient as possible, with the right people and team. Thank you again for using TranslateCo translation services and we hope to be of use to you again soon."
  
                      await mailer(req.body.ClientEmail, body, Subject);
  
                      res.send({message:"Report Responded To", rep});
                  }
                }
               }))
        

module.exports= router;