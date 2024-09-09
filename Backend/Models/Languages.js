const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const languagesSchema = new Schema({

    Language: {
    type: String,
    required:true,
    },


}, { timestamps: true });

const Languages = mongoose.model('Languages', languagesSchema);
module.exports = Languages;