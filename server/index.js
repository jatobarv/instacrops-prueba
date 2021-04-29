const express = require("express");
const app = express();
const port = 8080;
const fbAuth = require("./fbAuth");
const cors = require("cors");
app.use(cors());
app.use(express.json());

const { login, logout, isAuth } = require("./api/auth/user");

app.post("/login", login);
app.get("/logout", logout);
app.get("/isAuth", isAuth);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
