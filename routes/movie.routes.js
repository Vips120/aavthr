let express = require('express');
let router = express.Router();
let M = require('../mongo/movie');
let g = require('../mongo/genre');
router.post('/', async (req,res) => {
 let {error} = M.ValidationError(req.body);
 if(error) {return res.status(402).send(error.details[0].message)}
 let genre = await g.Genre.findById(req.body.genreId);
//  console.log(genre);
 if(!genre) {return res.status(402).send('invalid genre id')}
 let movie = new M.Movie({
     name: req.body.name,
     genre:{
         _id:genre._id,
         name: genre.name
     },
     price: req.body.price,
     rating:req.body.rating
 });

let data = await movie.save();
res.send({item:data});
});

module.exports = router;