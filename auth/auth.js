const express = require('express');
const router = express.Router();
let bcrypt = require('bcrypt');
const U = require('../mongo/users');
let Joi = require('@hapi/joi');

router.post('/', async (req,res) => {
  let {error} = LoginValidationError(req.body);
  if(error) {return res.status(402).send(error.details[0].message)}
  let user = await U.User.findOne({"UserLogin.email": req.body.UserLogin.email})
  if(!user) {return res.status(403).send('invalid email id')}
  let password = await bcrypt.compare(req.body.UserLogin.password, user.UserLogin.password);
  if(!password) {return res.status(403).send('invalid password')};
  res.send(true);
})
function LoginValidationError(message) {
    let Schema = Joi.object().keys({
        UserLogin:{
            email:Joi.string().required(),
            password:Joi.string().required()
        }
    });
    return Joi.validate(message,Schema);
}
module.exports = router;