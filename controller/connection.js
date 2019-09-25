module.exports = function(mongoose){
    mongoose.connect('mongodb://localhost/aavdemo',{useNewUrlParser:true})
.then(() => console.log('connected to database'))
.catch(err => console.log('something went wrong', err))
}