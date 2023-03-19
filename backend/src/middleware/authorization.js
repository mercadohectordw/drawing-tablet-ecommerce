const jwt = require('jsonwebtoken');
require('dotenv').config();
const {db} = require('../db');

const verifyTokenUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader || authHeader === 'null'){
    return res.status(403).send({message:'Invalid Token'});
  }
  if(!authHeader.toLowerCase().includes("bearer ")){
    return res.status(403).send({message:'Invalid Token'});
  }

  let token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if(err){
      return res.status(403).send({message:'Invalid Token'});
    }

    req = Object.assign(req.body, { userId : user.userId}); //guarda el usuario en req.body

    next();
  });
}

const verifyTokenAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader || authHeader === 'null'){
    return res.status(403).send({message:'Invalid Token'});
  }
  if(!authHeader.toLowerCase().includes("bearer ")){
    return res.status(403).send({message:'Invalid Token'});
  }

  let token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if(err){
      return res.status(403).send({message:'Invalid Token'});
    }

    let query = `
      SELECT user_id
      FROM admin
      WHERE user_id = ${user.userId}
    `;

    db.query(query)
      .then(([row]) => {
        let result = JSON.parse(JSON.stringify(row));

        if(result.length <= 0) {
          return res.status(403).send({message:'User UnAuthorized'});
        }

        req = Object.assign(req.body, { userId : user.userId}); //guarda el usuario en req.body
        next();
      })
      .catch((err) => {
        return res.status(403).send({message:'User UnAuthorized'});
      });
  });
}

module.exports = {
  verifyTokenUser,
  verifyTokenAdmin
};