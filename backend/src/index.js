const express = require('express');
const cors = require('cors');
require("dotenv").config();
const usersRouter = require('./routers/users.router');
const productsRouter = require('./routers/products.router');
const cartsRouter = require('./routers/carts.router');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
  origin: '*'
}));

app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/cart", cartsRouter);

app.listen(port, () => {
  console.log(`Api loaded on port ${port}`);
})