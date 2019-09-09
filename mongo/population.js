let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/aavdemo',{useNewUrlParser:true})
.then(() => console.log('connected to database'))
.catch(err => console.log('something went wrong', err))

let authorSchema = new mongoose.Schema({
    name:{type:String, required:true, min:5, max:50},
    website:{type:String,required:true},
    email: {type:String,required:true}
});

let courseSchema = new mongoose.Schema({
    name:{type:String, required:true, min:5, max:50},
    authorId:{type:mongoose.Schema.Types.ObjectId, ref:'authors'}
});

let Author = mongoose.model('authors', authorSchema);
let Course = mongoose.model('courses', courseSchema);

async function Authors() {
    let data =  new Author({
        name: 'MAk DOe',
        website:'www.mak.com',
        email:'mak@gmail.com'
    });
let items = await data.save();
console.log(items);

}

async function Courses() {
    let data =  new Course({
        name: 'Angular',
        authorId:'5d75fc7af4ec8e1c24d02685'
    });
let items = await data.save();
console.log(items);

}
Courses();
// Authors();
async function AllCourses() {
    let data = await Course
    .find()
    .populate('authorId')
    ;
console.log(data);
}

AllCourses();