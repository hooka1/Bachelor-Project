const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const Credit = require('./Credit');

const creditSchema = new Schema({
  Cardholder:{
    type: String,
    required: true
  },

 CardNumber:{
  type: String,
  required:true
 },

 CVV:{
  type:Number,
  required:true
},
  ExpiryDate:{
   type:String,
   required:true
}
}
, { timestamps: true });

const Credit = mongoose.model('Credit', creditSchema );

const userSchema = new Schema({

    Name: {
    type: String,
    required:true,
    },

    Address: {
    type: String,
    },

    PhoneNumber:{
        type:String,
        required:true
    },

    Email: {
    type: String,
    required:true,
    unique:true
    },

    Password: {
    type: String,
    required:true,
    },

    role: {
    type: Number,
    required:true,
    },

    Username: {
    type: String,
    required:true,
    },

    DOB:{
        type:String,
        required:true
    },

    Languages:{
      type:Array,
      required:false
    },
    FirstTimeUser:{
      type:Boolean,
    },

    WarnStatus:{
      type:Number,
      required:false
    }

//     gender:{
//     type: String
//   },
//   Credit:{
//     type: creditSchema,
//   }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;