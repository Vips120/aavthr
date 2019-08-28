const express = require('express');
// console.log(express);
const app = express();
app.use(express.json());
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


app.get('/api/user',(req,res) => {
    // res.send('hello user');
    res.send(users);
});


app.post('/api/user/newuser', (req,res) => {
    let newData = {
        id:users.length + 1,
        name:req.body.name
    };
    users.push(newData);
    res.send({message:'created new user data',
       data:users
})
});

app.put('/api/user/updateuser/:id' ,(req,res) => {
    let u = users.find(data => data.id === parseInt(req.params.id));
    if(!u) {return res.status(403).send('invalid id')}
    u.name = req.body.name;
    res.send(u);
});

app.delete('/api/user/removeuser/:id' ,(req,res) => {
    let u = users.find(data => data.id === parseInt(req.params.id));
    if(!u) {return res.status(403).send('invalid id')};
    let index = users.indexOf(u);
    let removeid = users.splice(index,1);
    res.send('rip the user id! see you next time :(');
})


// console.log(name);
// console.log(password);