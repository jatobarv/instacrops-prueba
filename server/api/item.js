const fetch = require("node-fetch");
const redis = require("redis");
const redis_port = 6379;
const client = redis.createClient(redis_port);

exports.items = async (req, res) => {
  try {
    const response = await fetch(
      `https://my-json-server.typicode.com/jirann/FAKEJSON/items`
    );
    const data = await response.json();
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
      res.status(404);
      return this.oneItem(req, res);
    }

    const data = await response.json();
    client.setex(`items_${itemId}`, 120, JSON.stringify(data));
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
};
