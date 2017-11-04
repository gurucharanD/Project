const express = require('express');
const mongoose  = require('mongoose');
const User = require('../models/User');
const Faculty= require('../models/Faculty');
const Question = require('../models/Question');
var compile_run=require('compile-run');


const router = express.Router();

const db = "mongodb://localhost"; 

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




router.post('/getQuestions',function(req,res){

   Question.find({week:req.body.week,year:req.body.year})
   .exec(function(err,questions){
    if(err)
    console.log("error retrieving questions "+err);
    else{
        console.log(questions);
        return res.json(questions);
    }
   });
});


    router.post('/postQuestion',function(req,res){
        console.log('posting a question');
        var newQuestion = new Question();
        newQuestion.name=req.body.name;
        newQuestion.question=req.body.question;
        newQuestion.week = req.body.week;
        newQuestion.year=req.body.year;
        newQuestion.input=req.body.input;
        newQuestion.output=req.body.output;
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
       var response={}
     User.findOne({rollNumber:req.body.rollNumber,password:req.body.password,year:req.body.year},function(err,user){
            if(err) 
            { 
                console.log(err);
                return {msg:"error"};
            }
            if(!user){
                console.log("invalid user");
                res.json({msg:"Invalid User",result:0});
          }
          else{
          console.log("Valid User");
          res.json({msg:'Login successful',result:1});
          }
            
        });
    });


    router.post('/facultyLogin',function(req,res){
        console.log("Faculty login......");
        var newFaculty=new Faculty();
        newFaculty.userName="1";
        newFaculty.password="1";
        newFaculty.save(function(err,insertedFaculty){
            if(err)
            throw err;
            else
            console.log(insertedFaculty);
        })
        
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
 

  
    router.post('/run',function(req,res){
     

        var code=req.body.code;
        var lang=req.body.lang;
        var input=req.body.input;
        switch(lang){
            case 1: var result=python(code,input);
                console.log(result);
                res.json(result);
                break;
        } 
        
     });

      function python(code,input){
         var result=[];
         for(let i=0;i<input.length;i++){
        compile_run.runPython(code, input, function (stdout, stderr, err) {
            if(!err){
                    console.log(stdout);
                    result.push(stdout);
             }
             else{
                console.log(err);
                return err;
             }
           

         });
        }
       return result;
        
     }

    
    router.get('/submit',function(req,res){

    });



module.exports = router;