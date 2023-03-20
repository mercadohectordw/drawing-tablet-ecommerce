const md5 = require('md5');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {db} = require('../db');

const registerUser = (req, res) => {
  let userData = req.body;

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
            res.status(200).send({message:"The user was registered"});
          })
          .catch((err) => {
            console.log("Failed to create a new user: \n" + err);
            res.status(400).send({message:"Something went wrong"});
          });

      } else { //email usado => respuesta de email en uso
        res.status(400).send({message:"The email is already in use"});
      }
    })
    .catch((err) => {
      console.log("Failed to create a new user: \n" + err);
      res.status(400).send({message:"Something went wrong"});
    });
};

const loginUser = (req, res) => {
  let logData = req.body;

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
        res.status(400).send({message:"User not found"});
      } else {
        let token = jwt.sign({userId: result[0].id, userEmail: result[0].email}, process.env.JWT_KEY);
        res.status(200).send({token: token});
      }
    })
    .catch((err) => {
      res.status(400).send({message:"Something went wrong"});
    });
};

const getUser = (req, res) => {
  let user = req.body.userId;

  let query = `
    SELECT first_name, last_name, email, created_at, EXISTS(SELECT * FROM admin WHERE user_id = ${user}) as \`admin\`,
    (SELECT COUNT(*) FROM cart_item ci WHERE ci.cart_id = ${user}) AS items_in_cart
    FROM users
    WHERE id = ${user}
  `;

  db.query(query)
    .then(([row]) => {
      let result = JSON.parse(JSON.stringify(row));

      if(result.length <= 0) {
        res.status(404).send({message:"User not found"});
      } else {
        res.status(200).json(result[0]); 
      }
    })
    .catch((err) => {
      res.status(400).send({message:"Something went wrong"});
    });
};

const getUserForAdmin = (req, res) => {
  let user = req.params.userId;

  let query = `
    SELECT id, first_name, last_name, email, created_at, EXISTS(SELECT * FROM admin WHERE user_id = ${user}) as \`admin\`,
    (SELECT COUNT(*) FROM cart_item ci WHERE ci.cart_id = ${user}) AS items_in_cart
    FROM users
    WHERE id = ${user}
  `;

  db.query(query)
    .then(([row]) => {
      let result = JSON.parse(JSON.stringify(row));

      if(result.length <= 0) {
        res.status(404).send({message:"User not found"});
      } else {
        res.status(200).json(result[0]); 
      }
    })
    .catch((err) => {
      res.status(400).send({message:"Something went wrong"});
    });
};

const getAllUsers = (req, res) => {
  let itemsByPage = 20;
  let query = `
    SELECT u.id, u.first_name, u.last_name, u.email, u.created_at, 
    CASE WHEN a.user_id IS NULL THEN 0 ELSE 1 END AS \`admin\`
    FROM users u LEFT JOIN admin a ON u.id = a.user_id
    ORDER BY u.created_at DESC
    LIMIT ${(req.params.page-1) * itemsByPage}, ${itemsByPage}
  `;

  db.query(query)
    .then(([rows]) => {
      let query = `
        SELECT COUNT(*) AS q
        FROM users
      `;

      db.query(query)
        .then(([r]) => {
          let amount = r[0].q / itemsByPage;
          let result = {
            pages: Math.ceil(amount), 
            rows: rows
          };
          res.status(200).send(result);
        })
        .catch((err) => {
          res.status(400).send({message:"Something went wrong"});
        })
    })
    .catch((err) => {
      res.status(400).send({message:"Something went wrong"});
    });
};

const updateUserData = (req, res) => {
  let userData = req.body;

  let query = `
    UPDATE users
    SET first_name = "${userData.first_name}", last_name = "${userData.last_name}", email = "${userData.email}"
    WHERE id = ${userData.userId}
  `;

  db.query(query)
    .then(([row]) => {
      res.status(200).send({message:"Updated user"}); 
    })
    .catch((err) => {
      res.status(400).send({message:"Something went wrong"});
    });
};

const updateUserPassword = (req, res) => {
  let userData = req.body;

  let hadhedPassword = md5(userData.password);

  let query = `
    UPDATE users
    SET password = "${hadhedPassword}"
    WHERE id = ${userData.userId}
  `;

  db.query(query)
    .then(([row]) => {
      res.status(200).send({message:"Updated user password"}); 
    })
    .catch((err) => {
      res.status(400).send({message:"Something went wrong"});
    });
};

const assignNewAdmin = (req, res) => {
  if(req.body.userId == req.params.userId){
    return res.status(200).send({message:"That's your account!"});
  }

  let query = `
    INSERT INTO admin VALUES
    (${req.params.userId})
  `;

  db.query(query)
    .then(([row]) => {
      res.status(200).send({message:"Assigned admin"});
    })
    .catch((err) => {
      res.status(400).send({message:"Something went wrong"});
    });
};

const deleteAdmin = (req, res) => {
  if(req.body.userId == req.params.userId){
    return res.status(400).send({message:"Something went wrong. That's your account!"});
  }

  let query = `
    DELETE FROM admin
    WHERE user_id = ${req.params.userId}
  `;

  db.query(query)
    .then(([row]) => {
      res.status(200).send({message:"Unassigned admin"});
    })
    .catch((err) => {
      res.status(400).send({message:"Something went wrong"});
    });
};

const getDashboard = (req, res) => {
  let query = `
    SELECT
      (SELECT COUNT(*) FROM users) AS users,
      (SELECT COUNT(*) FROM product) AS products,
      (SELECT COUNT(*) FROM \`order\`) AS orders,
      (SELECT COUNT(*) FROM \`order\` WHERE created_at > NOW() - INTERVAL 7 DAY ) AS last_7_days_orders,
      (SELECT COUNT(*) FROM users WHERE MONTH(created_at) = MONTH(CURRENT_TIMESTAMP) AND YEAR(created_at) = YEAR(CURRENT_TIMESTAMP)) AS this_month_users,
      (SELECT COUNT(*) FROM \`order\` WHERE MONTH(created_at) = MONTH(CURRENT_TIMESTAMP) AND YEAR(created_at) = YEAR(CURRENT_TIMESTAMP)) AS this_month_orders
    FROM DUAL;
  `;

  db.query(query)
    .then(([row]) => {
      res.status(200).send(row[0]);
    })
    .catch((err) => {
      res.status(400).send({message:"Something went wrong"});
    });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  getUserForAdmin,
  getAllUsers,
  updateUserData,
  updateUserPassword,
  assignNewAdmin,
  deleteAdmin,

  getDashboard
};