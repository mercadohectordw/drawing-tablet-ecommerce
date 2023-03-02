const md5 = require('md5');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {db} = require('../db');
const {registerValidation, loginValidation} = require('../middleware/validation');

const registerUser = (req, res) => {
  let userData = req.body;
  let validation = registerValidation(userData);
  
  if(validation.error){
    return res.status(400).send(validation.error);
  }

  let query = `
    SELECT first_name, last_name, email, created_at 
    FROM users 
    WHERE email = "${userData.email}";
  `;

  db.query(query)
    .then(([row]) => {
      let result = JSON.parse(JSON.stringify(row));

      if(result.length == 0){//email no usado => registro de cuenta

        let hadhedPassword = md5(userData.password);

        let query = `
          INSERT INTO users (first_name, last_name, email, password, created_at) VALUES
          ("${userData.first_name}", "${userData.last_name}", "${userData.email}", "${hadhedPassword}", CURRENT_TIMESTAMP)
        `;
      
        db.query(query)
          .then(([row]) => {
            let result = JSON.parse(JSON.stringify(row));
            
            res.status(200).send("Usuario Registrado");
          })
          .catch((err) => {
            console.log("Error en la creación de un nuevo usuario: \n" + err);
            res.status(400).send("Ocurrió un problema, intente más tarde.");
          });

      } else { //email usado => respuesta de email en uso
        res.status(400).send("El email ya está en uso.");
      }
    })
    .catch((err) => {
      console.log("Error en la creación de un nuevo usuario: \n" + err);
      res.status(400).send("Ocurrió un problema, intente más tarde.");
    });
}

const loginUser = (req, res) => {
  let logData = req.body;
  let validation = loginValidation(logData);

  if(validation.error){
    return res.status(400).send(validation.error);
  }

  let hadhedPassword = md5(logData.password);

  let query = `
    SELECT * FROM users
    WHERE email = "${logData.email}"
    AND password = "${hadhedPassword}"
  `;

  db.query(query)
    .then(([row]) => {
      let result = JSON.parse(JSON.stringify(row));

      if(result.length <= 0){
        res.status(400).send("Usuario no encontrado");
      } else {
        let token = jwt.sign({userId: result[0].id, userEmail: result[0].email}, process.env.JWT_KEY);
        res.status(200).send({token: token});
      }
    })
    .catch((err) => {
      res.status(400).send(err);
      console.log(err);
    });
};

module.exports = {
  registerUser,
  loginUser
}