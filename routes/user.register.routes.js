const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
let U = require('../mongo/users');
let jwt = require('jsonwebtoken');
let auth = require('../middleware/auth');
let Admin = require('../middleware/admin');
//LoggedIn user

router.get('/me', auth, async(req,res) => {
    let data = await U.User
                      .findById(req.users._id)
                      .select("-UserLogin.password")
                      ;
    res.send(data);
} )



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

router.delete('/:id', [auth,Admin],async(req,res) => {
    let user = await U.User.findByIdAndRemove(req.params.id);
      res.send('romoved the user');
});

//pagination

router.post('/:id', async(req,res) => {
    let perPage = 10;
    let page = req.params.id || 1;
    let pageData = await U.User
                           .find({})
                            .skip((perPage * page) - perPage)
                             .limit(perPage);
    let dataCount = await U.User.find({}).count();
    let pageSize = Math.ceil(dataCount/perPage);
    res.send({
        perPage: perPage,
        currentPage:page,
        dataLimit: pageData,
        dataCount: dataCount,
        pageSize: pageSize
    });
})

module.exports = router;