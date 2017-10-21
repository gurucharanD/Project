const express = require('express');
const mongoose  =require('mongoose');
const User = require('../models/User');
const Faculty=require('../models/Faculty');
const Question = require('../models/Question');
var HackerEarthAPI = require('node-hackerearth');

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

router.post('/getQuestions',function(req,res){
console.log('get request for all videos');
console.log(req.body.year);
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
        console.log('post a question');
        var newQuestion = new Question();
        newQuestion.name=req.body.name;
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
 

    router.post('/compile',function(req,res){

        var clientSecretKey = '5738edf2630fdac6283a93bd0d6202b97863ba2c';
        
       var api = new HackerEarthAPI(clientSecretKey);
        
    //    var data =`
    //    #include<stdio.h>
    //    int main()
    //    {
    //        int a=22;
    //        int b=3;
    //        printf("%d",a+b);
    //    }
    //    `
        var datas=req.body.code;
        var lang=req.body.lang;

       console.log(datas+" "+lang);
       
       api.compile({ source: datas, lang: lang }, function (err, data) {
         if (err) {
           console.log(err.message);
         } else {
           console.log(JSON.stringify(data)); 
         }
       });
        
       api.run({ source: datas, lang: lang, time_limit: 1 }, function (err, data) {
         if (err) {
           console.log(err.message);
         } else {
             console.log("hi there");
           console.log(JSON.stringify(data.run_status.output)); // Do something with your data 
         }
       });

    });

    
    router.get('/submit',function(req,res){

    });



module.exports = router;