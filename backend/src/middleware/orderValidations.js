const {db} = require('../db');

const getOrderData = (req, res, next) => {
  let query = `
    SELECT c.id as cart_item_id, c.product_id, c.quantity, p.name, p.price as price_per_unit, p.inventory as inventoryOfProduct
    FROM cart_item c INNER JOIN product p ON c.product_id = p.id
    WHERE c.cart_id = ${req.body.userId}
  `;

  db.query(query)
    .then(([rows]) => {
      if(rows.length == 0){
        return res.status(400).send({message:"Something went wrong"});
      }

      let total = 0;

      for(let i of rows){
        if(i.quantity > i.inventoryOfProduct){
          return res.status(400).send({message:`Sorry, we don't have enough stock of ${i.name}`});
        }

        total += i.quantity * i.price_per_unit;
      }

      req.body.total = total;
      req.body.items = rows;
      next();
    })
    .catch((err) => {
      res.status(400).send({message:"Something went wrong"});
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
        return res.status(400).send({message:"Something went wrong"});
      }
      next();
    })
    .catch((err) => {
      return res.status(400).send({message:"Something went wrong"})
    });
};

const verifyThatTheProductHasNoSales = (req, res, next) => {
  let product_id = req.params.productId;

  let query = `
    SELECT COUNT(*) AS q
    FROM order_item
    WHERE product_id = ${product_id}
  `;

  db.query(query)
    .then(([row]) => {
      if(row[0].q != 0){
        return res.status(400).send({message:"The product has sales"});
      } else {
        next();
      }
    })
    .catch((err) => {
      return res.status(400).send({message:"Something went wrong"})
    });
};

module.exports = {
  getOrderData,
  verifyOrderBelongsToUser,
  verifyThatTheProductHasNoSales
};