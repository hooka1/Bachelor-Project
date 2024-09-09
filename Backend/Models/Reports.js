const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportsSchema = new Schema({

    SessionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'PreviousSessions',
        required:false
    },
    TranslatorEmail:{
        type:String,
        required:false
    },
    TranslatorName:{
        type:String,
        required:false
    },
    ClientName:{
        type:String,
        required:true
    },
    TranslatorWarnStatus:{
        type:Number,
        required:false
    },
    ClientEmail:{
        type:String,
        required:true
    },
    ReportDescription:{
        type:String,
        required:true
    },
    ReportType:{
        type:String,
        required:true
    },
    Resolved:{
        type:Boolean,
        required:true
    },
    ResolveAnswer:{
        type:String,
        required:false
    }
   
}, { timestamps: true });

const Reports = mongoose.model('Reports', reportsSchema);
module.exports = Reports;