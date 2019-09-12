let jwt = require('jsonwebtoken');
let config = require('config');
function UserAuthmiddleware(req,res,next) {
  let token = req.header('x-auth-token');
  if(!token) {return res.status(400).send('can not get any user token!please try again')}

  try {
    let decoded = jwt.verify(token,config.get('usertoken'));
    req.users = decoded;
    next();
  }
  catch(ex) {
    //   console.log('invalid token');
    res.send('invalid token');
  }
}
module.exports = UserAuthmiddleware;