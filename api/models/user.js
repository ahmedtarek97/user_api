const mongoose = require('mongoose');


const userSchema = mongoose.Schema({


    _id:mongoose.Schema.Types.ObjectId,
    username:{type:String,unique : true, required : true},
    email:{type:String, required : true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password:{type:String, required : true},
    firstName:{type:String, required : true},
    lastName:{type:String, required : true},
    avatar:{type:String}







});

module.exports=mongoose.model('User',userSchema);