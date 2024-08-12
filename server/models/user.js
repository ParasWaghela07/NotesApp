const mongoose=require('mongoose');

const userschema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    notes:[
        {
            title:String,
            body:String,
            time:String,
            day:String
        }
    ]
})

module.exports=mongoose.model('userschema',userschema);

