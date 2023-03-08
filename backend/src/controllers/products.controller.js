const {db} = require('../db');

const getAllProducts = (req, res) => {
  let query = `
    SELECT id, name, price, main_image, category_id, inventory
    FROM product
  `;

  db.query(query)
    .then(([rows]) => {
      res.status(200).send(rows);
    })
    .catch((err) => {
      res.status(400).send("Something went wrong");
    });
};

const getProduct = (req, res) => {
  let query = `
    SELECT p.id, p.name, p.description, p.price, p.main_image, p.inventory, c.name as category
    FROM product p LEFT JOIN category c ON p.category_id = c.id
    WHERE p.id = ${req.params.productId}
  `;

  db.query(query)
    .then(([row]) => {

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
          res.status(400).send("Something went wrong");
        });

    })
    .catch((err) => {
      res.status(400).send("Something went wrong");
    });
};

const getProductsByCategory = (req, res) => {
  let query = `
  SELECT p.id, p.name, p.description, p.price, p.main_image, p.inventory, c.name as category
  FROM product p LEFT JOIN category c ON p.category_id = c.id
  WHERE c.id = ${req.params.categoryId}
  `;
  
  db.query(query)
  .then(([rows]) => {
    res.status(200).send(rows);
  })
  .catch((err) => {
    res.status(400).send("Something went wrong");
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
      res.status(200).send("Product created");
    })
    .catch((err) => {
      res.status(400).send("Something went wrong");
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
        return res.status(400).send("Product not found");
      }

      res.status(200).send("Product updated");
    })
    .catch((err) => {
      res.status(400).send("Something went wrong");
    });
};

const deleteProduct = async(req, res) => {
  let query = `
    DELETE FROM product
    WHERE id = ${req.params.productId}
  `;

  await deleteAllProductImages(req.params.productId);
  
  db.query(query)
    .then(([row]) => {
      if(row.affectedRows == 0){
        return res.status(400).send("Product not found");
      }

      res.status(200).send("Product deleted");
    })
    .catch((err) => {
      res.status(400).send("Something went wrong");
    });
};

const postNewProductImage = (req, res) => {
  let query = `
    INSERT INTO product_image (url, product_id) VALUES
    ("${req.body.url}", ${req.params.productId});
  `;

  db.query(query)
    .then(([row]) => {
      res.status(200).send("Product image registered");
    })
    .catch((err) => {
      res.status(400).send("Something went wrong")
    });
};

const deleteOldProductImage = (req, res) => {
  let query = `
    DELETE FROM product_image
    WHERE id = ${req.params.imageId}
  `;

  db.query(query)
    .then(([row]) => {
      res.status(200).send("Product image deleted");
    })
    .catch((err) => {
      res.status(400).send("Something went wrong")
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

const deleteAllProductImages = (product_id) => {
  let query = `
    DELETE FROM product_image
    WHERE product_id = ${product_id}
  `;

  db.query(query)
    .then(([row]) => {
      return;
    });
};



module.exports = {
  getAllProducts,
  getProduct,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
  postNewProductImage,
  deleteOldProductImage
};