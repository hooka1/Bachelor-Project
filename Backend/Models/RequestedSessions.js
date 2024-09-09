const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestedSessionsSchema = new Schema({

    LanguageFrom: {
    type: String,
    required:true,
    },

    LanguageTo: {
    type: String,
    },

    Date:{
        type:String,
        required:true
    },

    TimeFrom: {
    type: Number,
    required:true,
    },

    Duration: {
    type: Number,
    required:true,
    },

    ClientEmail:{
        type:String,
        required:true,
    },
    TranslatorEmail:{
        type:String,
        required:false,
    },
    ClientName:{
        type:String,
        required:true
    },
    TranslatorName:{
        type:String,
        required:false
    },
    CancelledBy:{
        type:Array,
        required:false
      },
    Type:{
        type:String,
        required:false
    },
    UserPhoneNumber:{
        type:String,
        required:false
    },
    TranslatorPhoneNumber:{
        type:String,
        required:false
    },
    Payment:{
        type:String,
        required:true
    },
    Amount:{
        type:Number,
        required:true
    },
    pid:{
        type:String,
        required:false 
    }
  

}, { timestamps: true });

const RequestedSessions = mongoose.model('RequestedSessions', requestedSessionsSchema);
module.exports = RequestedSessions;