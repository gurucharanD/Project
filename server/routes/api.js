const express = require('express');
const mongoose  =require('mongoose');
const User = require('../models/User');
const Faculty=require('../models/Faculty');
const Question = require('../models/Question');

const router = express.Router();

const db = "mongodb://raman:raman@ds111885.mlab.com:11885/code_vardhaman"; 
mongoose.Promise = global.Promise;

    mongoose.connect(db,(err)=>{
            if(err){
                console.log("error "+err);
            }
                else{
                    console.log("connected to mongoose successfully at 3000");
                }

    });


const app = express();

router.get('/questions/:year',function(req,res){
console.log('get request for all videos');
   Video.find({year:req.params.year})
   .exec(function(err,questions){
    if(err)
    console.log("error retrieving videos "+err);
    else{
        res.json(questions);
    }
   });
});


    router.post('/postQuestion',function(req,res){
        console.log('post a question');
        var newQuestion = new Question();
        newQuestion.question=req.body.question;
        newQuestion.week = req.body.week;
        newQuestion.year=req.body.year;
        newQuestion.testCases=req.body.testCases;
        newQuestion.save(function(err,insertedQuestion){
            if(err){
                console.log('error saving Question');

            }
            else{
                
                return {'msg':'Question posted successfully','result':1}
            }
        })
    })

    router.post('/registerUser',function(req,res){
        console.log("Register a user");
      
        var newUser=new User();
        newUser.rollNumber=req.body.rollNumber;
        newUser.password=req.body.password;
        newUser.secretKey=req.body.secretKey;
        newUser.year = req.body.year;
        
        User.find({rollNumber:newUser.rollNumber},function(err,users){
            if(users.length){
                console.log("User already exists");
                    return {"msg":"User already exists","result":0};
            }
            else{
                newUser.save(function(err,insertedUser){
                    if(err){
                        console.log("error Saving user "+err);
                        return {msg:"Registration unsuccessful",result:0};
                    }
                    else{
                        console.log("Registration successful");
                        return {msg:"Registration Successful",result:1}
                    }
        
                })
            }
   
    });
})  

    router.post('/studentLogin',function(req,res){
       console.log("student login......");
       
     User.findOne({rollNumber:req.body.rollNumber,password:req.body.password,year:req.body.year},function(err,user){
            if(err) 
            { 
                console.log(err);
                return {msg:"error"};
            }
            if(!user){
                console.log("invalid user");
                res.json({'msg':'Invalid User','result':0});
              return null;
            
  
          }
          console.log("Valid User");
          res.json({'msg':'Login successful '+user.username,'result':1});
        
            
        });
    });


    router.post('/facultyLogin',function(req,res){
        console.log("Faculty login......");
        
      Faculty.findOne({userName:req.body.userName,password:req.body.password},function(err,user){
             if(err) 
             { 
                 console.log(err);
                 return {msg:"error"};
             }
             if(!user){
                 console.log("invalid user");
                 res.json({'msg':'Invalid User','result':0});
               return null;
             
   
           }
           console.log("Valid User");
           res.json({'msg':'Login successful '+user.username,'result':1});
         
             
         });
     });
 

    router.get('/compile',function(req,res){

    });

    
    router.get('/submit',function(req,res){

    });



module.exports = router;