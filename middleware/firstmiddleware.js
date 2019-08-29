function Heman(req,res,next) {
    console.log('loading middleware');
    next();
   }

   module.exports = Heman;