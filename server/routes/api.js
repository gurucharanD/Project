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
      //  console.log(questions);
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
                console.log("posted successfully");
               res.json({'msg':'Question Posted Successfully'}); 
               
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
                     res.json({'msg':'User already exists'});
            }
            else{
                newUser.save(function(err,insertedUser){
                    if(err){
                        console.log("error Saving user "+err);
                        res.json({'msg':'Registration unsuccessful'});
                    }
                    else{
                        console.log("Registration successful");
                        res.json({'msg':'Registration Successful'});
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
        var result=[];
        switch(lang){
            case 1:

            calculate(code,input)
            .then(result => {
                // use results here
                console.log("Reslutv "+result)
                res.json(result);
            })
            .catch(err => console.log("Error : "+err))
          
               
        } 
        
     });

     function calculate(code,input){
        var promiseArray = input.map(inp => {
            return new Promise((resolve, reject) => {
                compile_run.runPython(code, inp, function (stdout, stderr, err) {
                    if(!err){
                        console.log("STDOUT "+stdout);
                        console.log("stderr "+stderr);
                        if(stderr)
                        resolve(stderr);
                        else
                        resolve(stdout);
                    }
                    else{
                       
                        reject(err)
                    }
                })
            })
        })
        return Promise.all(promiseArray)
    }

     

    
    router.get('/submit',function(req,res){

    });



module.exports = router;