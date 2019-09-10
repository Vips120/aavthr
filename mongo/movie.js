let mongoose = require('mongoose');
let Joi = require('@hapi/joi');
let G = require('./genre');
let Schema = new mongoose.Schema({
    name:{type:String,min:5,max:50,required:true},
    genre:{type:G.GenreSchema,required:true},
    price:{type:Number,required:true},
    rating:{type:Number,required:true}
});

let Movie = mongoose.model('movies', Schema);

function ValidationError(message){
    let Schema = Joi.object().keys({
        name: Joi.string().required().min(5).max(50),
        genreId:Joi.required(),
        price:Joi.number().required(),
        rating:Joi.number().required()
    });
    return Joi.validate(message,Schema);
}

module.exports = {Schema,Movie,ValidationError};