const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyTokenUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader || authHeader === 'null'){
    return res.status(403).send('User UnAuthorized');
  }
  if(!authHeader.toLowerCase().includes("bearer ")){
    return res.status(400).send('Invalid Token');
  }

  let token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if(err){
      return res.status(403).send('User UnAuthorized');
    }

    req = Object.assign(req.body, { userId : user.userId}); //guarda el usuario en req.body

    next();
  });
}

module.exports = {
  verifyTokenUser
};