const {db} = require('../db');

const getOrderData = (req, res, next) => {
  let query = `
    SELECT c.id as cart_item_id, c.product_id, c.quantity, p.price as price_per_unit, p.inventory as inventoryOfProduct
    FROM cart_item c INNER JOIN product p ON c.product_id = p.id
    WHERE c.cart_id = ${req.body.userId}
  `;

  db.query(query)
    .then(([rows]) => {
      if(rows.length == 0){
        return res.status(400).send("Something went wrong");
      }

      let total = 0;

      for(let i of rows){
        if(i.quantity > i.inventoryOfProduct){
          return res.status(400).send("Sorry, we don't have enough stock");
        }

        total += i.quantity * i.price_per_unit;
      }

      req.body.total = total;
      req.body.items = rows;
      next();
    })
    .catch((err) => {
      res.status(400).send("Something went wrong");
    });
};

const verifyOrderBelongsToUser = (req, res, next) => {
  let query = `
     SELECT user_id
     FROM \`order\`
     WHERE id = ${req.params.orderId}
  `;

  db.query(query)
    .then(([row]) => {
      if(row[0].user_id != req.body.userId){
        return res.status(400).send("Something went wrong");
      }
      next();
    })
    .catch((err) => {
      console.log(2);
      return res.status(400).send("Something went wrong")
    });
};

module.exports = {
  getOrderData,
  verifyOrderBelongsToUser
};