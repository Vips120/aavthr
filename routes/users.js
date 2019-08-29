let express = require('express');
let router = express.Router();
const Joi = require('@hapi/joi');

let users = [{
    id:1,
    name:'asrar bhai'
},
{
   id:2,
   name:'adil bhai'
},
{
   id:3,
   name:'Teja bhai'
},
{
   id:4,
   name:'vishal dada'
}
];


router.get('/',(req,res) => {
  // res.send('hello user');
  res.send(users);
});

router.get('/:id',(req,res) => {
  debugger;
  // let id = req.params.id;
  let u = users.find(data => data.id === parseInt(req.params.id));
  if(!u) {return res.status(403).send('invalid id')}
  res.send(u);
});

router.post('/newuser', (req,res) => {
  let {error} =  ValidationError(req.body);
if(error) {return res.status(402).send(error.details[0].message)}

  let newData = {
      id:users.length + 1,
      name:req.body.name
  };
 
  users.push(newData);
  res.send({message:'created new user data',
     data:users
})
});

router.put('/updateuser/:id' ,(req,res) => {
  let u = users.find(data => data.id === parseInt(req.params.id));
  if(!u) {return res.status(403).send('invalid id')}

  let {error} =  ValidationError(req.body); //result.error
 //  console.log(result);
  if(error) {return res.status(402).send(error.details[0].message)}
 
  u.name = req.body.name;
  res.send(u);
});

router.delete('/removeuser/:id' ,(req,res) => {
  let u = users.find(data => data.id === parseInt(req.params.id));
  if(!u) {return res.status(403).send('invalid id')};
  let index = users.indexOf(u);
  let removeid = users.splice(index,1);
  res.send('rip the user id! see you next time :(');
});


function ValidationError(message) {
  const userSchema = Joi.object().keys({
      name:Joi.string().required().alphanum().min(3).max(50)
  });
 return Joi.validate(message, userSchema);
};

module.exports = router;
