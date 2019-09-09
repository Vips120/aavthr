let mongoose = require('mongoose');
let Joi = require('@hapi/joi');
let userSchema = new mongoose.Schema({
    firstname:{type:String,required:true,min:5,max:50},
    lastname: {type:String,required:true, min:5,max:50},
    userId:{type:String,required:true},
    UserLogin:{
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true}
    }
});

let User = mongoose.model('users', userSchema);

function ValidationError(message){
    let Schema = Joi.object().keys({
        firstname:Joi.string().required().min(5).max(250),
        lastname: Joi.string().required().min(5).max(250),
        userId:Joi.string().required(),
        UserLogin:{
            email:Joi.string().required(),
            password:Joi.string().required()
        }
    })
    return Joi.validate(message,Schema);
}

module.exports = {User,ValidationError};