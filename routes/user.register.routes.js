const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
let U = require('../mongo/users');
let jwt = require('jsonwebtoken');

router.post('/newuser', async(req,res) => {
    let {error} = U.ValidationError(req.body);
    if(error) {return res.status(402).send(error.details[0].message)}
    let user = await U.User.findOne({"UserLogin.email" : req.body.UserLogin.email})
    if(user) {return res.status(402).send({message:'already email exists'})}
    let data = new U.User({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        userId:req.body.userId,
        UserLogin:req.body.UserLogin
    });

    let salt = await bcrypt.genSalt(10);
    data.UserLogin.password = await bcrypt.hash(data.UserLogin.password, salt);
    let items = await data.save();
    //information expert principle
let token = items.UserValidToken();
    // console.log(token);
    res.header('x-auth-token', token).send({message:'registration succesful', data:items, token: token})

});

module.exports = router;