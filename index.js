const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
// const Joi = require('@hapi/joi');
// console.log(express);
const app = express();
let morgan = require('morgan');
let midmen = require('./middleware/firstmiddleware');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
let user = require('./routes/users');
let registration = require('./routes/user.register.routes');
let port = process.env.Port || 4000;
app.use(midmen);
if(config.get('host.mail') === 'development mode'){
    app.use(morgan('tiny'))
}

console.log(`production mode: ${process.env.Node_Env}`);
console.log(`development mode : ${app.set('env')}`);

console.log(`name : ${config.get('name')}`);
console.log(` mail : ${config.get('host.mail')}`);
console.log(`password: ${config.get('Password')}`);
mongoose.connect('mongodb://localhost/aavdemo',{useNewUrlParser:true})
.then(() => console.log('connected to database'))
.catch(err => console.log('something went wrong', err))


app.use('/api/user', user);
app.use('/api/customer', registration);
app.listen(port,() => {
    console.log(`server working on port number  ${port}`);
});


// let userdetails = {
//     name: 'vipul',
//     password:'vs@123'
// };

// let {name,password} = userdetails;

// console.log(name);
// console.log(password);