const mongoose = require('mongoose')


const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{type:String},
    email:{type:String,
        required: [true, 'Please enter email'],},
    phone:{type:String},
    role:{type:String},
    status:{type:String},
    password:{type:String}
}, {timestamps:true})

const User =mongoose.model('User' , userSchema)
module.exports= User;











