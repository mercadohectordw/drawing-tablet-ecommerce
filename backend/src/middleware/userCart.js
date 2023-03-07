const {db} = require('../db');

const verifyUserCart = (req, res, next) => {
  let query = `
    SELECT *
    FROM cart
    WHERE user_id = ${req.body.userId}
  `;

  db.query(query)
    .then(async([row]) => {
      if(row.length == 0){
        await createCart(req.body.userId);
      }

      next();
    })
    .catch((err) => {
      return res.status(400).send("Something went wrong");
    });
};

const createCart = (userId) => {
  let query = `
    INSERT INTO cart VALUES
    (${userId} , CURRENT_TIMESTAMP)
  `;

  db.query(query)
    .then(([row]) => {
      return;
    });
};

module.exports = {
  verifyUserCart
};