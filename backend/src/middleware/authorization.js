const jwt = require('jsonwebtoken');
require('dotenv').config();
const {db} = require('../db');

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

const verifyTokenAdmin = (req, res, next) => {
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
      console.log("1");
      return res.status(403).send('User UnAuthorized');
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
          console.log("2");
          return res.status(403).send('User UnAuthorized');
        }

        req = Object.assign(req.body, { userId : user.userId}); //guarda el usuario en req.body
        next();
      })
      .catch((err) => {
        console.log(err);
        return res.status(403).send('User UnAuthorized');
      });
  });
}

module.exports = {
  verifyTokenUser,
  verifyTokenAdmin
};