const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const questionSchema= new Schema({
    name:String,
    week:Number,
    year:Number,
    question:String,
    testCases:Array
});

module.exports  =  mongoose.model('question',questionSchema,'questions');