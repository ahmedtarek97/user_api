const mongoose = require('mongoose');


const userSchema = mongoose.Schema({


    _id:mongoose.Schema.Types.ObjectId,
    username:{type:String,unique : true, required : true},
    email:{type:String},
    password:{type:String},
    firstName:{type:String},
    lastName:{type:String},
    avatar:{type:String}







});

module.exports=mongoose.model('User',userSchema);