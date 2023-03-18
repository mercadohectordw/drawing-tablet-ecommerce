const {db} = require('../db');
const { updateProductInventoryAndSales } = require('./products.controller');

const getUserOrders = (req, res) => {
  let query = `
    SELECT *
    FROM \`order\`
    WHERE user_id = ${req.body.userId}
  `;

  db.query(query)
    .then(([row]) => {
      res.status(200).send(row);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({message:"Something went wrong"});
    });
}

const createOrderFromUser = (req, res) => {
  let query = `
    INSERT INTO \`order\` (user_id, total, created_at, shipped) VALUES
    (${req.body.userId}, ${req.body.total}, CURRENT_TIMESTAMP, 0)
  `;

  db.query(query)
    .then(async ([row]) => {
      await postOrderItems(req.body.items, row.insertId);
      await deleteCart(req.body.userId);
      await saveShippingAddress(req.body.shipping_address, row.insertId);

      res.status(200).send({message:"The order was saved"});
    })
    .catch((err) => {
      res.status(400).send({message:"Something went wrong"});
    });
};

const getAllOrders = (req, res) => {
  let itemsByPage = 10;
  let query = `
    SELECT o.*, u.first_name, u.last_name, u.email
    FROM \`order\` o LEFT JOIN users u ON o.user_id = u.id
    ORDER BY o.created_at DESC
    LIMIT ${(req.params.page-1) * itemsByPage}, ${itemsByPage}
  `;

  db.query(query)
    .then(([rows]) => {
      let query = `
        SELECT COUNT(*) AS q
        FROM \`order\`
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
        });
    })
    .catch((err) => {
      res.status(400).send({message:"Something went wrong"});
    });
};

const getOrder = (req, res) => {
  let query = `
    SELECT o.id, o.total, o.created_at, o.shipped, u.id as user_id, u.first_name, u.last_name, u.email,
      oi.id as order_item_id, oi.quantity, oi.price_per_unit, p.id as product_id, p.name, p.main_image, sa.*
    FROM \`order\` o
      INNER JOIN users u ON o.user_id = u.id
      RIGHT JOIN order_item oi ON o.id = oi.order_id
      LEFT JOIN product p ON oi.product_id = p.id
      LEFT JOIN shipping_address sa ON o.id = sa.order_id
    WHERE o.id = ${req.params.orderId}
  `;

  db.query(query)
    .then(([rows]) => {
      let result = {
        id: rows[0].id,
        total: Number(rows[0].total),
        created_at: rows[0].created_at,
        shipped: rows[0].shipped,
        user: {
          id: rows[0].user_id,
          first_name: rows[0].first_name,
          last_name: rows[0].last_name,
          email: rows[0].email
        },
        shipping_address: {
          address_line: rows[0].address_line,
          city: rows[0].city,
          province: rows[0].province,
          country: rows[0].country,
          postal_code: rows[0].postal_code,
          mobile: rows[0].mobile
        },
        items: []
      }

      for(let i of rows){
        result.items.push({
          order_item_id: i.order_item_id,
          quantity: i.quantity,
          price_per_unit: Number(i.price_per_unit),
          product_id: i.product_id,
          product_name: i.name,
          product_img: i.main_image
        });
      }

      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send({message:"Something went wrong"});
    });
};

const markOrderAsShipped = (req, res) => {
  let query = `
    UPDATE \`order\`
    SET shipped = 1
    WHERE id = ${req.params.orderId}
  `;

  db.query(query)
    .then(([rows]) => {
      res.status(200).send({message:"The order was updated"});
    })
    .catch((err) => {
      res.status(400).send({message:"Something went wrong"});
    });
};

const deleteOrder = (req, res) => {
  let query1 = `
    DELETE FROM order_item
    WHERE order_id = ${req.params.orderId}
  `;

  db.query(query1)
    .then(([rows]) => {
      let query2 = `
        DELETE FROM \`order\`
        WHERE id = ${req.params.orderId}
      `;

      db.query(query2)
        .then(([rows]) => {
          res.status(200).send({message:"The order was deleted"});
        });
    })
    .catch((err) => {
      res.status(400).send({message:"Something went wrong"});
    });
}

//metodos auxiliares
const postOrderItems = async(items, order_id) => {
  let query = `
    INSERT INTO order_item (order_id, product_id, quantity, price_per_unit) VALUES
  `;

  for(let i of items) {
    query = query + `(${order_id}, ${i.product_id}, ${i.quantity}, ${i.price_per_unit}),`;
    await updateProductInventoryAndSales(i.product_id, i.quantity);
  }
  query = query.slice(0,-1);

  db.query(query)
    .then(([row]) => {
      return;
    })
};

const deleteCart = (cart_id) => {
  let query1= `
    DELETE FROM cart_item
    WHERE cart_id = ${cart_id} 
  `;

  db.query(query1)
    .then(() => {
      let query2 = `
        DELETE FROM cart
        WHERE user_id = ${cart_id}
      `;
    
      db.query(query2)
        .then(([row]) => {
          return;
        });
    });
};

const saveShippingAddress = (ad, order_id) => {
  let query = `
    INSERT INTO shipping_address VALUES
    (${order_id}, "${ad.address_line}", "${ad.city}", "${ad.province}", "${ad.country}", "${ad.postal_code}", "${ad.mobile}")
  `;
  
  db.query(query)
    .then(([row]) => {
      return;
    });
};

module.exports = {
  getUserOrders, 
  createOrderFromUser,
  getAllOrders,
  getOrder,
  markOrderAsShipped,
  deleteOrder
};