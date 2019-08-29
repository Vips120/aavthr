let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/aavdemo',{useNewUrlParser:true})
.then(() => console.log('connected to database'))
.catch(err => console.log('something went wrong', err))

let userSchema = new mongoose.Schema({
    username:{type:String},
    courses:[String],
    date:{type:Date, default:Date.now()},
    isPublished:{type:Boolean}
});

const User = mongoose.model('aavuser', userSchema);

async function StoreUserData(){
    let data = new User({
        username:'harish',
        courses: ['reactjs','sql'],
        isPublished:true
    });
    
    let result = await data.save();
    console.log(result);
}
 async function GetAllUserDetails(){
     let data = await User
                     .find({'price': {
                         $in:[10,30,40]
                     }})
                     .sort('username')
                     .select(['username', 'isPublished', 'price'])
                     ;
     console.log(data);
 }
 GetAllUserDetails();

// StoreUserData();
