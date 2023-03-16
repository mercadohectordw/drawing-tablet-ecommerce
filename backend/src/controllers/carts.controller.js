const {db} = require('../db');

const getCart = (req, res) => {
  let query = `
    SELECT c.user_id as id, c.created_at, ci.id as cart_item_id, p.id as product_id, p.name as product_name, p.price as product_price, p.main_image, ci.quantity
    FROM cart c
    LEFT JOIN cart_item ci ON c.user_id = ci.cart_id
    INNER JOIN product p ON ci.product_id = p.id
    WHERE cart_id = ${req.body.userId}
  `;

  db.query(query)
    .then(([row]) => {
      if(row.length == 0){
        return res.status(400).send({message:"There are no products in your cart"});
      }

      let cart = {
        id: row[0].id,
        created_at: row[0].created_at,
        cart_items: []
      };
      for(let ci of row){
        cart.cart_items.push({
          cart_item_id: ci.cart_item_id,
          product_id: ci.product_id,
          product_name: ci.product_name,
          product_price: Number(ci.product_price),
          main_image: ci.main_image,
          quantity: ci.quantity
        });
      }

      res.status(200).send(cart);
    })
    .catch((err) => {
      res.status(400).send({message:"Something went wrong"});
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
      res.status(200).send({message:"The product was added"});
    })
    .catch((err) => {
      res.status(400).send({message:"Something went wrong"});
    });
};

const updateItem = (req, res) => {
  let query = `
    UPDATE cart_item
    SET quantity = ${req.body.quantity}
    WHERE id = ${req.params.cartItemId};
  `;

  db.query(query)
    .then(([row]) => {
      res.status(200).send({message:"The product was updated"});
    })
    .catch((err) => {
      res.status(400).send({message:"Something went wrong"});
    });
};

const deleteItem = (req, res) => {
  let query = `
    DELETE FROM cart_item
    WHERE id = ${req.params.cartItemId}
  `;

  db.query(query)
    .then(([row]) => {
      res.status(200).send({message:"The product was removed"});
    })
    .catch((err) => {
      res.status(400).send({message:"Something went wrong"});
    });
};


module.exports = {
  getCart,
  addItem,
  deleteItem,
  updateItem
};