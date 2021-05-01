const fetch = require("node-fetch");
const Redis = require("ioredis");
("redis://:pc31259a3130264fe60d7bcec7fec92bb4ed1795f8717a166f1febfd612a0c6f6@ec2-54-198-16-203.compute-1.amazonaws.com:11840");
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

exports.items = async (req, res) => {
  try {
    const response = await fetch(
      `https://my-json-server.typicode.com/jirann/FAKEJSON/items`
    );
    const data = await response.json();
    console.log(data);
    client.setex("items", 120, JSON.stringify(data));
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

exports.oneItem = async (req, res) => {
  let itemId = req.params.id;
  // Random error
  // 15% de probabilidad
  const randomNumber = Math.random() * 100;
  randomNumber > 85 ? (itemId = undefined) : itemId;
  try {
    const response = await fetch(
      `https://my-json-server.typicode.com/jirann/FAKEJSON/items/${itemId}`
    );

    if (!response.ok) {
      console.log({
        message: `Error simulado`,
      });
      res.status(500);
      return this.oneItem(req, res);
    }
    const data = await response.json();
    client.setex(`items_${itemId}`, 120, JSON.stringify(data));
    console.log(data);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
};
