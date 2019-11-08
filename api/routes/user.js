const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
//to handle the get requests
router.get("/",(req,res,next)=>{

User.find()
.exec()
.then(docs=>
    {
        console.log(docs);
        if(docs.length >=0)
        { 
             res.status(200).json(docs);
        
        }
        else{
// if the database is empty
            res.status(404).json({
                
                message:'No users found'
            });


        }
      



    })
.catch(err=>{


    console.log(err);

res.status(500).json({

error:err



});


});





}






)

















//to handle post requsts


router.post("/",(req,res,next)=>{

    
    const user = new User({

        _id:new mongoose.Types.ObjectId(),
        username:req.body.userName,
        email:req.body.email,
        password:req.body.password,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        avatar:req.body.avatar
    


    });

    user.save().then(result =>
        {

            console.log(result);

            res.status(201).json({
    
    
        message:'handling post requsts to /user',
        createdUser:user
    
    
    
    
    });
    




        })
           .catch(err => {console.log(err)
        
        res.status(500).json({

            error:err



        })
        
        
        
        
        } );


    
    
    
    
    
    
    }
    
    
    
    
    
    
    );

























//to handle the get requests with a specific id
router.get("/:userId",(req,res,next)=>{
    const id = req.params.userId;

    User.findById(id)
    .exec()
    .then(doc=>{

        console.log(doc);
        if(doc){

            res.status(200).json(doc);



        }
        else
        {
            res.status(404).json({ message: "No valid entry found for provided ID" });

        }
     


    })
    .catch(err =>{
        console.log(err);
    
    res.status(500).json({error:err});
    
    
    });

   
    
    
    
    
    }
    
    
    
    
    
    
    );
    
    










    router.delete("/:userId", (req, res, next) => {
        const id = req.params.userId;
        User.remove({ _id:id })
          .exec()
          .then(result => {
            res.status(200).json(result);
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });
      });










// to make updates in the users that are in the database

      router.patch("/:userId", (req, res, next) => {
        const id = req.params.userId;
        const updateOps = {}; //will contain the updated data
        for (const ops of req.body) {
          updateOps[ops.propName] = ops.value;
        }
        User.update({ _id:id }, { $set: updateOps })
          .exec()
          .then(result => {
            console.log(result);
            res.status(200).json(result);
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });
      });











    module.exports=router;