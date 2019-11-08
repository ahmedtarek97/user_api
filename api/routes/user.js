const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
//to handle the get requests
router.get("/",(req,res,next)=>{


res.status(200).json({


    message:'handling get requsts to /user'




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
        res.status(200).json(doc);


    })
    .catch(err =>{
        console.log(err);
    
    res.status(500).json({error:err});
    
    
    });

   
    
    
    
    
    }
    
    
    
    
    
    
    );
    
    











    module.exports=router;