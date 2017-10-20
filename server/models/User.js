const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const userSchema= new Schema({
    rollNumber:String,
    password:String,
    secretKey:String,
    year:Number
});

module.exports  =  mongoose.model('user',userSchema,'users');