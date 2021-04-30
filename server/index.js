const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
const redis = require("redis");
const redis_port = 6379;
const client = redis.createClient(redis_port);

app.use(cors());
app.use(express.json());

const { login, logout, isAuth } = require("./api/auth/user");
const { items, oneItem } = require("./api/item");

const cache = (req, res, next) => {
  const itemId = req.params.id;
  client.get(
    itemId !== undefined ? `items_${itemId}` : "items",
    (error, data) => {
      if (error) throw error;
      if (data !== null) {
        res.send(data);
      } else {
        next();
      }
    }
  );
};

app.post("/login", login);
app.get("/logout", logout);
app.get("/isAuth", isAuth);
app.get("/items", cache, items);
app.get("/items/:id", cache, oneItem);

app.listen(port, () => console.log(`Port ${port}!`));
