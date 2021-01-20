const mongoose = require('mongoose');
const uuid =require('uuid');

const userSchema = mongoose.Schema({


    _id:{type:String,default:uuid.v4},
    username:{type:String,unique : true, required : true,trim:true},
    email:{type:String, required : true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password:{type:String, required : true,minlength:[6,"short password"]},
    firstName:{type:String, required : [true, "can't be blank"]},
    lastName:{type:String, required : [true, "can't be blank"]},
    avatar:{type:String}
});

module.exports=mongoose.model('User',userSchema);
