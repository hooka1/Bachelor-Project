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

const stripe = require('stripe')('sk_test_51NBMhUHrbbS6btj2HV4lXbB5iP62EmkFfZR7GpCFXGeNzJsM8ToA8RADGawXSfeHuDdPDXohFj0fhduRcjDj04sj006bF0ooJX');

router.post('/intent', protectClient,  asyncHandler(async (req, res) => {
  try {
    console.log(req.body.amount)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: 'egp',
      automatic_payment_methods: {
        enabled: true,
      },
    }); 

    res.send({ paymentIntent: paymentIntent.client_secret, pid:paymentIntent.id });
    console.log(paymentIntent.id)
  } catch (e) {
    res.send({
      error: e.message,
    });
  }
}));

module.exports= router;