const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const userSchema= new Schema({
    rollNumber:String,
    password:String,
    secretKey:String,
    year:Number,
    section:String
});

module.exports  =  mongoose.model('user',userSchema,'users');