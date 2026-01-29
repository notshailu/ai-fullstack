const mongoose = require('mongoose')


const userschema = new mongoose.Schema
({
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:{
           type:String
    }
})

const userModel = mongoose.model("user",userschema)
module.exports = userModel;