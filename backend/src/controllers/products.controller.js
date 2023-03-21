const {db} = require('../db');

const getTheTopThreeBestSellers = (req, res) => {
  let query = `
    SELECT id, name, price, main_image, category_id, inventory, sales
    FROM product
    WHERE active = 1
    ORDER BY sales DESC
    LIMIT 3
  `;

  db.query(query)
    .then(([rows]) => {
      res.status(200).send(rows);
    })
    .catch((err) => {
      res.status(400).send({message:"Something went wrong"});
    });
};

const getAllProducts = (req, res) => {
  let query = `
    SELECT p.id, p.name, p.price, p.main_image, p.inventory, p.sales, c.name as category, p.active
    FROM product p LEFT JOIN category c ON p.category_id = c.id
  `;

  db.query(query)
    .then(([rows]) => {
      res.status(200).send(rows);
    })
    .catch((err) => {
      res.status(400).send({message:"Something went wrong"});
    });
};

const getProduct = (req, res) => {
  let active = req.body.userId == null  ? "AND active = 1" : "";
  let query = `
    SELECT p.id, p.name, p.description, p.price, p.main_image, p.inventory, p.sales , c.name as category, p.active
    FROM product p LEFT JOIN category c ON p.category_id = c.id
    WHERE p.id = ${req.params.productId} ${active}
  `;

  db.query(query)
    .then(([row]) => {
      if(row.length == 0){
        return res.status(400).send({message:"Product not found"});
      }

      //busca imagenes del producto
      let query2 = `
        SELECT id, url
        FROM product_image
        WHERE product_id = ${req.params.productId}
      `;
      db.query(query2)
        .then(([images]) => {
          row[0].images = images;
          res.status(200).send(row[0]);
        })
        .catch((err) => {
          res.status(400).send({message:"Something went wrong"});
        });
    })
    .catch((err) => {
      res.status(400).send({message:"Something went wrong"});
    });
};

const getProductsByCategory = (req, res) => {
  let query = `
    SELECT p.id, p.name, p.description, p.price, p.main_image, p.inventory, p.sales, c.name as category, p.active
    FROM product p LEFT JOIN category c ON p.category_id = c.id
    WHERE p.active = 1 AND c.id = ${req.params.categoryId}
  `;
  
  db.query(query)
  .then(([rows]) => {
    res.status(200).send(rows);
  })
  .catch((err) => {
    res.status(400).send({message:"Something went wrong"});
  });
};

const getProductsBySearch = (req, res) => {
  let query = `
    SELECT id, name, price, main_image, category_id, inventory, sales
    FROM product
    WHERE active = 1 AND 
    (name LIKE '%${req.params.q}%' OR
    description LIKE '%${req.params.q}%')
  `;

  db.query(query)
    .then(([rows]) => {
      res.status(200).send(rows);
    })
    .catch((err) => {
      res.status(400).send({message:"Something went wrong"});
    });
};

const createProduct = (req, res) => {
  let body = req.body;

  let query = `
    INSERT INTO product (name, description, price, main_image, category_id, inventory) VALUES
    ("${body.name}", "${body.description}", ${body.price}, "${body.main_image}", ${body.category_id}, ${body.inventory});
  `;

  db.query(query)
    .then(async([row]) => {
      await postProductImages(body.images, row.insertId);
      res.status(200).send({message:"Product created"});
    })
    .catch((err) => {
      res.status(400).send({message:"Something went wrong"});
    });
};

const updateProduct = (req, res) => {
  let body = req.body;

  let query = `
    UPDATE product
    SET name = "${body.name}", description = "${body.description}", price = ${body.price}, main_image = "${body.main_image}", category_id = ${body.category_id}, inventory = ${body.inventory}
    WHERE id = ${req.params.productId}
  `;

  db.query(query)
    .then(([row]) => {
      if(row.affectedRows == 0){
        return res.status(400).send({message:"Product not found"});
      }

      res.status(200).send({message:"Product updated"});
    })
    .catch((err) => {
      res.status(400).send({message:"Something went wrong"});
    });
};

const changeProductVisibility = async (req, res) => {
  let query = `
    UPDATE product
    SET active = ${req.body.active}
    WHERE id = ${req.params.productId}
  `;

  await deleteAllCartItemsOfProductDisable(req.params.productId);

  db.query(query)
  .then(([row]) => {
    res.status(200).send({message:"Product updated"});
  })
  .catch((err) => {
    res.status(400).send({message:"Something went wrong"})
  });
};

const deleteProduct = async(req, res) => {
  let query1 = `
    DELETE pi.*, ci.* 
    FROM product p
    LEFT JOIN product_image pi ON p.id = pi.product_id
    LEFT JOIN cart_item ci ON p.id = ci.product_id
    WHERE p.id = ${req.params.productId}
  `;
  
  db.query(query1)
    .then(([row]) => {
      let query2 = `
        DELETE FROM product
        WHERE id = ${req.params.productId}
      `;
      
      db.query(query2)
        .then(([row]) => {
          res.status(200).send({message:"Product deleted"});
        })
        .catch((err) => {
          res.status(400).send({message:"Something went wrong"});
        });
    })
    .catch((err) => {
      res.status(400).send({message:"Something went wrong"});
    });
};

const postNewProductImage = (req, res) => {
  let query = `
    INSERT INTO product_image (url, product_id) VALUES
    ("${req.body.url}", ${req.params.productId});
  `;

  db.query(query)
    .then(([row]) => {
      res.status(200).send({message:"Product image registered"});
    })
    .catch((err) => {
      res.status(400).send({message:"Something went wrong"})
    });
};

const deleteOldProductImage = (req, res) => {
  let query = `
    DELETE FROM product_image
    WHERE id = ${req.params.imageId}
  `;

  db.query(query)
    .then(([row]) => {
      res.status(200).send({message:"Product image deleted"});
    })
    .catch((err) => {
      res.status(400).send({message:"Something went wrong"})
    });
};

//metodos auxiliares
const postProductImages = (images, product_id) => {
  if(images.length == 0){
    return;
  }

  let query = `
    INSERT INTO product_image (url, product_id) VALUES
  `;

  for(let i of images) {
    query = query + `("${i}", ${product_id}),`;
  }
  query = query.slice(0,-1);

  db.query(query)
    .then(([row]) => {
      return;
    })
};

const deleteAllCartItemsOfProductDisable = (product_id) => {
  let query = `
    DELETE FROM cart_item
    WHERE product_id = ${product_id}
  `;

  db.query(query)
  .then(([row]) => {
    return;
  });
}

const updateProductInventoryAndSales = (product_id, sales) => {
  let query = `
    UPDATE product
    SET inventory = inventory - ${sales}, sales = sales + ${sales} 
    WHERE id = ${product_id}
  `;

  db.query(query)
    .then(([row]) => {
      return;
    });
};


module.exports = {
  getTheTopThreeBestSellers,
  getAllProducts,
  getProduct,
  getProductsByCategory,
  getProductsBySearch,
  createProduct,
  updateProduct,
  changeProductVisibility,
  deleteProduct,
  postNewProductImage,
  deleteOldProductImage,

  updateProductInventoryAndSales
};