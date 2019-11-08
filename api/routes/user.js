const express = require('express');
const router = express.Router();

//to handle the get requests
router.get('/',(req,res,next)=>{


res.status(200).json({


    message:'handling get requsts to /user'




});






}






)



//to handle post requsts


router.post('/',(req,res,next)=>{

    const user ={

        userName:req.body.userName,
        email:req.body.email,
        password:req.body.password,
        firstName:req.body.firstName,
        lastName:req.body.lastName
        
    }


    res.status(200).json({
    
    
        message:'handling post requsts to /user',
        createdUser:user
    
    
    
    
    });
    
    
    
    
    
    
    }
    
    
    
    
    
    
    )


    module.exports=router;