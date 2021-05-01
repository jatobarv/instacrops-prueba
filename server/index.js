const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const cors = require("cors");
const redis = require("redis");
const Redis = require("ioredis");
const client = new Redis(
  {
    host: "ec2-54-198-16-203.compute-1.amazonaws.com",
    port: 11840,
    password:
      "pc31259a3130264fe60d7bcec7fec92bb4ed1795f8717a166f1febfd612a0c6f6",
  },
  {
    tls: {
      rejectUnauthorized: false,
    },
  }
);

app.use(cors());
app.use(express.json());
app.use(express.static(process.cwd() + "/public"));

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
app.get("/", (req, res) => {
  console.log(process.cwd() + "\\public\\index.html");
  res.sendFile(process.cwd() + "\\public\\index.html");
});
app.post("/login", login);
app.get("/logout", logout);
app.get("/isAuth", isAuth);
app.get("/items", cache, items);
app.get("/items/:id", cache, oneItem);

app.listen(port, () => console.log(`Port ${port}!`));
