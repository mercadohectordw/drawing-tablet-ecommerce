const {db} = require('../db');

const getCart = (req, res) => {
  let query = `
    SELECT *
    FROM cart_item
    WHERE cart_id = ${req.body.userId}
  `;

  db.query(query)
    .then(([results]) => {
      if(results.length == 0){
        res.status(400).send("There are no products in the cart");
      }
      let cart = {
        id: req.body.userId,
        items: results
      }
      res.status(200).send(cart);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("Something went wrong");
    });
}

const addItem = (req, res) => {
  let user = req.body.userId;
  let product = req.params.productId;

  let query = `
    INSERT INTO cart_item (cart_id, product_id, quantity) VALUES
    (${user}, ${product}, 1)
  `;  //*el id de los carritos es igual al del sus usuarios

  db.query(query)
    .then(([row]) => {
      res.status(200).send("The product was added");
    })
    .catch((err) => {
      res.status(400).send("Something went wrong");
    });
};

const updateItem = (req, res) => {
  let query = `
    UPDATE cart_item
    SET quantity = ${req.body.quantity}
    WHERE id = ${req.params.cardItemId};
  `;

  db.query(query)
    .then(([row]) => {
      res.status(200).send("The product was updated");
    })
    .catch((err) => {
      res.status(400).send("Something went wrong");
    });
};

const deleteItem = (req, res) => {
  let query = `
    DELETE FROM cart_item
    WHERE id = ${req.params.cardItemId}
  `;

  db.query(query)
    .then(([row]) => {
      res.status(200).send("The product was removed");
    })
    .catch((err) => {
      res.status(400).send("Something went wrong");
    });
};


module.exports = {
  getCart,
  addItem,
  deleteItem,
  updateItem
};