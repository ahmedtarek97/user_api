const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');
const uuidv4 =require('uuid/v4');

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg'||file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Wrong file type'), false);
    }
  };


const storage = multer.diskStorage({
    destination:function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null,file.originalname);
    }
  });

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 300
    },
    fileFilter: fileFilter
  });
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

router.post("/",upload.single('avatar'),(req,res,next)=>{
console.log(req.file)

const pass = req.body.password;
if(pass.length<6)
{
    return res.status(409).json({


        message:'short password'

    })

}


    //check if email already exist
User.find({email:req.body.email}).exec()
.then(user =>{


    if(user.length>=1)
    {
    return res.status(409).json({

        message:'Email already exists in database'

    })

    }
    else{

        bcrypt.hash(req.body.password,10,(err,hash)=>{

            if(err){        
                return res.status(500).json({  
                    error:err    
                })     
   
            }else{
        
            const user = new User({        
                _id:uuidv4() ,
                username:req.body.username,
                email:req.body.email,
                password: hash,
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                avatar:req.file.path           
           });
        
            user.save().then(result =>
                {        
                    console.log(result);        
                    res.status(201).json({           
            
                message:'Added a user successfully',
                createdUser:user          
             });          
                })
                   .catch(err => {console.log(err)
                
                res.status(500).json({
        
                    error:err       
        
        
                })                
                               
                
                } );      
            }
       })
        
     }

}

);         
    
    
    } 
     
    );

//to handle the get requests with a specific id
router.get("/:username",(req,res,next)=>{
    const UN = req.params.username;

    User.find({username:UN})
    .exec()
    .then(doc=>{

        console.log(doc);
        if(doc){

            res.status(200).json(doc);


        }
        else
        {
            res.status(404).json({ message: "No valid entry found for provided username" });

        }
     


    })
    .catch(err =>{
        console.log(err);
    
    res.status(500).json({error:err});
    
    
    }); 
    
    
    }
    
    
    
    );
    
    
    router.delete("/:username", (req, res, next) => {
        const UN = req.params.username;
        User.remove({ username:UN })
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

      router.patch("/:username",checkAuth, (req, res, next) => {
        const UN = req.params.username;
        const updateOps = {}; //will contain the updated data
        for (const ops of req.body) {
          updateOps[ops.propName] = ops.value;
        }
        User.update({ username:UN }, { $set: updateOps })
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



      router.post("/login", (req, res, next) => {
        User.find({ email:req.body.email })
          .exec()
          .then(user => {
            if (user.length < 1) {
              return res.status(401).json({
                message: "Authntication failed: no matching email"
              });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
              if (err) {
                return res.status(401).json({
                  message: "Authntication failed: wrong password"
                });
              }
              if (result) {
                const token = jwt.sign(
                  {
                    email: user[0].email,
                    userId: user[0]._id
                  },
                  process.env.JWT_KEY,
                  {
                      expiresIn: "3h"
                  }
                );
                return res.status(200).json({
                  message: "Authntication successful",
                  token: token
                });
              }
              res.status(401).json({
                message: "Authntication failed"
              });
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });
      });




    module.exports=router;
